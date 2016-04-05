/* global gb, gl */

"use strict";

gb.ces_render_system = function() {
    gb.ces_base_system.call(this);

    this.m_render_pipeline = new gb.render_pipeline();
    this.m_type = gb.ces_system_type.render;

    Object.defineProperty(this, 'render_pipeline', {
        get: function() {
            return this.m_render_pipeline;
        }
    });

    this.k_shadow_color_uniform = "u_shadow_color";
    this.k_light_mask_vs_flag_uniform = "u_mask_flag_vs";
    this.k_light_mask_fs_flag_uniform = "u_mask_flag_fs";
    this.k_shadow_color_for_casters = new gb.vec4(1.0);
    this.k_shadow_color_for_receivers = new gb.vec4(0.0, 0.0, 0.0, 0.75);
};

gb.ces_render_system.prototype = Object.create(gb.ces_base_system.prototype);
gb.ces_render_system.prototype.constructor = gb.ces_render_system;

gb.ces_render_system.prototype.on_feed_start = function() {
    this.m_render_pipeline.on_draw_begin();
};

gb.ces_render_system.prototype.on_feed = function(root) {


    var ws_render_techniques = this.m_render_pipeline.ws_render_techniques;
    for (var i = 0; i < ws_render_techniques.length; ++i) {
        var technique = ws_render_techniques[i];
        var technique_name = technique.name;
        technique.bind();
        for (var technique_pass = 0; technique_pass < technique.num_passes; ++technique_pass) {
            this.draw_recursively_lights(root, technique_name, technique_pass);
            this.draw_recursively(root, technique_name, technique_pass);
        }

        technique.unbind();
    }
};

gb.ces_render_system.prototype.on_feed_end = function() {
    this.m_render_pipeline.on_draw_end();
};

gb.ces_render_system.prototype.draw_recursively = function(entity, technique_name, technique_pass) {

    var scene_component = entity.get_component(gb.ces_component_type.scene);
    if (!scene_component) {
        return;
    }

    var light_component = entity.get_component(gb.ces_component_type.light);
    var transformation_component = entity.get_component(gb.ces_component_type.transformation);
    var material_component = entity.get_component(gb.ces_component_type.material);
    var geometry_component = entity.get_component(gb.ces_component_type.geometry);

    if (!light_component && material_component && geometry_component && transformation_component) {
        var material = material_component.get_material(technique_name, technique_pass);
        var mesh = geometry_component.mesh;
        if (material && material.shader && material.shader.get_status() === gb.resource_status.commited && mesh && entity.visible) {

            material.set_custom_shader_uniform(this.k_shadow_color_for_casters, this.k_shadow_color_uniform);

            material_component.bind(technique_name, technique_pass, material);
            material.shader.set_mat4(scene_component.camera.matrix_p, gb.shader_uniform_type.mat_p);
            material.shader.set_mat4(scene_component.camera.matrix_v, gb.shader_uniform_type.mat_v);

            var matrix_m = new gb.mat4().identity();
            var parent = entity.parent;

            while (parent) {
                var parent_transformation_component = parent.get_component(gb.ces_component_type.transformation);
                //mat_m = transformation_component - > add_parent_transformation(mat_m);
                parent = parent.parent;
            }

            matrix_m = gb.mat4.multiply(matrix_m, transformation_component.matrix_m);
            material.shader.set_mat4(matrix_m, gb.shader_uniform_type.mat_m);

            mesh.bind(material.shader.get_attributes());
            mesh.draw();
            mesh.unbind(material.shader.get_attributes());

            material_component.unbind(technique_name, technique_pass, material);
        }
    }

    var children = entity.children;
    for (var i = 0; i < children.length; ++i) {
        this.draw_recursively(children[i], technique_name, technique_pass);
    }
};

gb.ces_render_system.prototype.draw_recursively_lights = function(entity, technique_name, technique_pass) {

    var scene_component = entity.get_component(gb.ces_component_type.scene);
    if (!scene_component) {
        return;
    }

    var light_component = entity.get_component(gb.ces_component_type.light);
    var light_mask_component = entity.get_component(gb.ces_component_type.light_mask);
    var transformation_component = entity.get_component(gb.ces_component_type.transformation);
    var material_component = entity.get_component(gb.ces_component_type.material);
    var geometry_component = entity.get_component(gb.ces_component_type.geometry);

    if (light_component && material_component && geometry_component && transformation_component) {
        var material = material_component.get_material(technique_name, technique_pass);
        var light_main_mesh = geometry_component.mesh;
        var light_mask_mesh = light_mask_component.mesh;
        var screed_quad_mesh = gb.mesh_constructor.create_screen_quad();

        if (material && entity.visible && material.shader && material.shader.get_status() === gb.resource_status.commited && light_main_mesh && light_mask_mesh) {
            var draw_light_mask = function() {

                gl.colorMask(gl.FALSE, gl.FALSE, gl.FALSE, gl.FALSE);
                gl.depthMask(gl.FALSE);

                material.stencil_function = gl.ALWAYS;
                material.stencil_function_parameter_1 = 1;
                material.stencil_function_parameter_2 = 255;
                material.stencil_mask_parameter = 1;

                material.set_custom_shader_uniform(0, this.k_light_mask_vs_flag_uniform);
                material.set_custom_shader_uniform(1, this.k_light_mask_fs_flag_uniform);

                material_component.bind(technique_name, technique_pass, material);

                material.shader.set_mat4(scene_component.camera.matrix_p, gb.shader_uniform_type.mat_p);
                material.shader.set_mat4(scene_component.camera.matrix_v, gb.shader_uniform_type.mat_v);
                material.shader.set_mat4(new gb.mat4().identity(), gb.shader_uniform_type.mat_m);

                light_mask_mesh.bind(material.shader.get_attributes());
                light_mask_mesh.draw();
                light_mask_mesh.unbind(material.shader.get_attributes());

                var shadow_casters = light_component.shadow_casters;
                for (var i = 0; i < shadow_casters.length; ++i) {
                    var shadow_caster = shadow_casters[i];
                    var shadow_caster_transformation_component = shadow_caster.get_component(gb.ces_component_type.transformation);
                    var shadow_caster_geometry_component = shadow_caster.get_component(gb.ces_component_type.geometry);
                    var shadow_caster_material_component = shadow_caster.get_component(gb.ces_component_type.material);

                    if (shadow_caster_material_component.get_material(technique_name, technique_pass)) {
                        var shadow_caster_mesh = shadow_caster_geometry_component.mesh;

                        var shadow_caster_matrix_m = new gb.mat4().identity();
                        var shadow_caster_parent = shadow_caster.parent;
                        while (shadow_caster_parent) {
                            var shadow_caster_parent_transformation_component = shadow_caster_parent.get_component(gb.ces_component_type.transformation);
                            //mat_m = transformation_component - > add_parent_transformation(mat_m);
                            shadow_caster_parent = shadow_caster_parent.parent;
                        }
                        shadow_caster_matrix_m = gb.mat4.multiply(shadow_caster_matrix_m, shadow_caster_transformation_component.matrix_m);
                        material.shader.set_mat4(shadow_caster_matrix_m, gb.shader_uniform_type.mat_m);

                        shadow_caster_mesh.bind(material.shader.get_attributes());
                        shadow_caster_mesh.draw();
                        shadow_caster_mesh.unbind(material.shader.get_attributes());
                    }
                }

                gl.colorMask(gl.TRUE, gl.TRUE, gl.TRUE, gl.TRUE);
                gl.depthMask(gl.TRUE);
                material_component.unbind(technique_name, technique_pass, material);
            };

            var draw_light = function() {

                var light_caster_matrix_m = new gb.mat4().identity();
                var light_caster_parent = entity.parent;
                while (light_caster_parent) {
                    var light_caster_parent_transformation_component = light_caster_parent.get_component(gb.ces_component_type.transformation);
                    //mat_m = transformation_component - > add_parent_transformation(mat_m);
                    light_caster_parent = light_caster_parent.parent;
                }
                light_caster_matrix_m = gb.mat4.multiply(light_caster_matrix_m, transformation_component.matrix_m);

                material.stencil_function = gl.EQUAL;
                material.stencil_function_parameter_1 = 1;
                material.stencil_function_parameter_2 = 255;
                material.stencil_mask_parameter = 0;

                material.blending_function_source = gl.SRC_ALPHA;
                material.blending_function_destination = gl.ONE;

                material.custom_shader_uniform(0, this.k_light_mask_vs_flag_uniform);
                material.custom_shader_uniform(0, this.k_light_mask_fs_flag_uniform);

                material_component.bind(technique_name, technique_pass, material);

                material.shader.set_mat4(light_caster_matrix_m, gb.shader_uniform_type.mat_m);

                light_main_mesh.bind(material.shader.get_attributes());
                light_main_mesh.draw();
                light_main_mesh.unbind(material.shader.get_attributes());

                material_component.unbind(technique_name, technique_pass, material);
            };

            var clear_light_mask = function() {

                gl.colorMask(gl.FALSE, gl.FALSE, gl.FALSE, gl.FALSE);
                gl.depthMask(gl.FALSE);

                material.stencil_function = gl.ALWAYS;
                material.stencil_function_parameter_1 = 0;
                material.stencil_function_parameter_2 = 255;
                material.stencil_mask_parameter = 1;

                material.set_custom_shader_uniform(1, this.k_light_mask_vs_flag_uniform);
                material.set_custom_shader_uniform(1, this.k_light_mask_fs_flag_uniform);

                material_component.bind(technique_name, technique_pass, material);

                material.shader.set_mat4(new gb.mat4().identity(), gb.shader_uniform_type.mat_m);

                screed_quad_mesh.bind(material.shader.get_attributes());
                screed_quad_mesh.draw();
                screed_quad_mesh.unbind(material.shader.get_attributes());

                gl.colorMask(gl.TRUE, gl.TRUE, gl.TRUE, gl.TRUE);
                gl.depthMask(gl.TRUE);

                material_component.unbind(technique_name, technique_pass, material);
            };

            draw_light_mask();
            draw_light();
            clear_light_mask();
        }
        screed_quad_mesh.destroy();
    }

    var children = entity.children;
    for (var i = 0; i < children.length; ++i) {
        this.draw_recursively_lights(children[i], technique_name, technique_pass);
    }
};
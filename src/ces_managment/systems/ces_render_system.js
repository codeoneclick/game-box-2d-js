/* global oop, gb, gl */
"use strict";

oop.define_class({
    namespace: "gb",
    name: "ces_render_system",
    extend: gb.ces_base_system,
    constants: {
        shadow_color_uniform: "u_shadow_color",
        light_mask_vs_flag_uniform: "u_mask_flag_vs",
        light_mask_fs_flag_uniform: "u_mask_flag_fs",
        shadow_color_for_casters: new gb.vec4(1.0),
        shadow_color_for_receivers: new gb.vec4(0.0, 0.0, 0.0, 0.75)
    },

    init: function() {

        this.m_render_pipeline = new gb.render_pipeline();
        this.m_type = gb.ces_base_system.type.render;

        Object.defineProperty(this, 'render_pipeline', {
            get: function() {
                return this.m_render_pipeline;
            }
        });

        this.m_screed_quad_mesh = gb.mesh_constructor.create_screen_quad();
        Object.defineProperty(this, 'screed_quad_mesh', {
            get: function() {
                return this.m_screed_quad_mesh;
            }
        });
    },

    release: function() {

    },

    methods: {
        on_feed_start: function() {
            this.m_render_pipeline.on_draw_begin();
        },

        on_feed: function(root) {
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
        },

        on_feed_end: function() {
            this.m_render_pipeline.on_draw_end();
        },

        draw_recursively: function(entity, technique_name, technique_pass) {

            var scene_component = entity.get_component(gb.ces_base_component.type.scene);
            if (!scene_component) {
                return;
            }

            var self = this;
            var light_component = entity.get_component(gb.ces_base_component.type.light);
            var transformation_component = entity.get_component(gb.ces_base_component.type.transformation);
            var material_component = entity.get_component(gb.ces_base_component.type.material);
            var geometry_component = entity.get_component(gb.ces_base_component.type.geometry);

            if (!light_component && material_component && geometry_component && transformation_component) {
                var material = material_component.get_material(technique_name, technique_pass);
                var mesh = geometry_component.mesh;
                if (material && material.shader && material.shader.is_commited && mesh && entity.visible) {

                    material.set_custom_shader_uniform(gb.ces_render_system.shadow_color_for_casters, gb.ces_render_system.shadow_color_uniform);

                    material_component.bind(technique_name, technique_pass, material);
                    material.shader.set_mat4(scene_component.camera.matrix_p, gb.shader.uniform_type.mat_p);
                    material.shader.set_mat4(scene_component.camera.matrix_v, gb.shader.uniform_type.mat_v);

                    var matrix_m = gb.ces_transformation_component.get_absolute_transformation(entity, false);
                    material.shader.set_mat4(matrix_m, gb.shader.uniform_type.mat_m);

                    mesh.bind(material.shader.attributes);
                    mesh.draw();
                    mesh.unbind(material.shader.attributes);

                    material_component.unbind(technique_name, technique_pass, material);
                }
            }

            var children = entity.children;
            for (var i = 0; i < children.length; ++i) {
                this.draw_recursively(children[i], technique_name, technique_pass);
            }
        },

        draw_recursively_lights: function(entity, technique_name, technique_pass) {

            var scene_component = entity.get_component(gb.ces_base_component.type.scene);
            if (!scene_component) {
                return;
            }

            var self = this;
            var light_component = entity.get_component(gb.ces_base_component.type.light);
            var light_mask_component = entity.get_component(gb.ces_base_component.type.light_mask);
            var transformation_component = entity.get_component(gb.ces_base_component.type.transformation);
            var material_component = entity.get_component(gb.ces_base_component.type.material);
            var geometry_component = entity.get_component(gb.ces_base_component.type.geometry);

            if (light_component && material_component && geometry_component && transformation_component) {
                var material = material_component.get_material(technique_name, technique_pass);
                var light_main_mesh = geometry_component.mesh;
                var light_mask_mesh = light_mask_component.mesh;

                if (material && entity.visible && material.shader && material.shader.is_commited && light_main_mesh && light_mask_mesh) {
                    var draw_light_mask = function() {

                        gl.colorMask(false, false, false, false);
                        gl.depthMask(false);

                        material.stencil_function = gl.ALWAYS;
                        material.stencil_function_parameter_1 = 1;
                        material.stencil_function_parameter_2 = 255;
                        material.stencil_mask_parameter = 1;

                        material.set_custom_shader_uniform(0, gb.ces_render_system.light_mask_vs_flag_uniform);
                        material.set_custom_shader_uniform(1, gb.ces_render_system.light_mask_fs_flag_uniform);

                        material_component.bind(technique_name, technique_pass, material);

                        material.shader.set_mat4(scene_component.camera.matrix_p, gb.shader.uniform_type.mat_p);
                        material.shader.set_mat4(scene_component.camera.matrix_v, gb.shader.uniform_type.mat_v);
                        material.shader.set_mat4(new gb.mat4().identity(), gb.shader.uniform_type.mat_m);

                        light_mask_mesh.bind(material.shader.attributes);
                        light_mask_mesh.draw();
                        light_mask_mesh.unbind(material.shader.attributes);

                        var shadow_casters = light_component.shadow_casters;
                        for (var i = 0; i < shadow_casters.length; ++i) {
                            var shadow_caster = shadow_casters[i];
                            var shadow_caster_geometry_component = shadow_caster.get_component(gb.ces_base_component.type.geometry);
                            var shadow_caster_material_component = shadow_caster.get_component(gb.ces_base_component.type.material);

                            if (shadow_caster_material_component.get_material(technique_name, technique_pass)) {
                                var shadow_caster_mesh = shadow_caster_geometry_component.mesh;

                                var shadow_caster_matrix_m = gb.ces_transformation_component.get_absolute_transformation(shadow_caster, false);
                                material.shader.set_mat4(shadow_caster_matrix_m, gb.shader.uniform_type.mat_m);

                                shadow_caster_mesh.bind(material.shader.attributes);
                                shadow_caster_mesh.draw();
                                shadow_caster_mesh.unbind(material.shader.attributes);
                            }
                        }

                        gl.colorMask(true, true, true, true);
                        gl.depthMask(true);
                        material_component.unbind(technique_name, technique_pass, material);
                    };

                    var draw_light = function() {

                        var light_caster_matrix_m = gb.ces_transformation_component.get_absolute_transformation(entity, true);

                        material.stencil_function = gl.EQUAL;
                        material.stencil_function_parameter_1 = 1;
                        material.stencil_function_parameter_2 = 255;
                        material.stencil_mask_parameter = 0;

                        material.blending_function_source = gl.SRC_ALPHA;
                        material.blending_function_destination = gl.ONE;

                        material.set_custom_shader_uniform(0, gb.ces_render_system.light_mask_vs_flag_uniform);
                        material.set_custom_shader_uniform(0, gb.ces_render_system.light_mask_fs_flag_uniform);

                        material_component.bind(technique_name, technique_pass, material);

                        material.shader.set_mat4(light_caster_matrix_m, gb.shader.uniform_type.mat_m);

                        light_main_mesh.bind(material.shader.attributes);
                        light_main_mesh.draw();
                        light_main_mesh.unbind(material.shader.attributes);

                        material_component.unbind(technique_name, technique_pass, material);
                    };

                    var clear_light_mask = function() {

                        gl.colorMask(false, false, false, false);
                        gl.depthMask(false);

                        material.stencil_function = gl.ALWAYS;
                        material.stencil_function_parameter_1 = 0;
                        material.stencil_function_parameter_2 = 255;
                        material.stencil_mask_parameter = 1;

                        material.set_custom_shader_uniform(1, gb.ces_render_system.light_mask_vs_flag_uniform);
                        material.set_custom_shader_uniform(1, gb.ces_render_system.light_mask_fs_flag_uniform);

                        material_component.bind(technique_name, technique_pass, material);

                        material.shader.set_mat4(new gb.mat4().identity(), gb.shader.uniform_type.mat_m);

                        self.screed_quad_mesh.bind(material.shader.attributes);
                        self.screed_quad_mesh.draw();
                        self.screed_quad_mesh.unbind(material.shader.attributes);

                        gl.colorMask(true, true, true, true);
                        gl.depthMask(true);

                        material_component.unbind(technique_name, technique_pass, material);
                    };

                    draw_light_mask();
                    draw_light();
                    clear_light_mask();
                }
            }

            var children = entity.children;
            for (var i = 0; i < children.length; ++i) {
                this.draw_recursively_lights(children[i], technique_name, technique_pass);
            }
        }
    },

    static_methods: {

    }
});
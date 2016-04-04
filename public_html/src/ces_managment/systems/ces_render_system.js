/* global gb */

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

    var transformation_component = entity.get_component(gb.ces_component_type.transformation);
    var material_component = entity.get_component(gb.ces_component_type.material);
    var geometry_component = entity.get_component(gb.ces_component_type.geometry);

    if (material_component && geometry_component && transformation_component) {
        var material = material_component.get_material(technique_name, technique_pass);
        var mesh = geometry_component.mesh;
        if (material && material.shader && material.shader.get_status() === gb.resource_status.commited && mesh && entity.visible) {

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
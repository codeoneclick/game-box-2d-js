/* global gb */

"use strict";

gb.ces_deferred_lighting_system = function() {
    gb.ces_base_system.call(this);
    this.m_type = gb.ces_system_type.deferred_lighting;

    this.m_light_casters = [];
    this.m_shadow_casters = [];
};

gb.ces_deferred_lighting_system.prototype = Object.create(gb.ces_base_system.prototype);
gb.ces_deferred_lighting_system.prototype.constructor = gb.ces_deferred_lighting_system;

gb.ces_deferred_lighting_system.prototype.on_feed_start = function() {
    this.m_light_casters = [];
    this.m_shadow_casters = [];
};

gb.ces_deferred_lighting_system.prototype.on_feed = function(root) {

    this.update_recursively(root);
};

gb.ces_deferred_lighting_system.prototype.on_feed_end = function() {

    for (var i = 0; i < this.m_light_casters.length; ++i) {
        var light_component = this.m_light_casters[i].get_component(gb.ces_component_type.light);
        light_component.cleanup();

        var light_mask_component = this.m_light_casters[i].get_component(gb.ces_component_type.light_mask);
        light_mask_component.cleanup();

        var light_caster_transformation_component = this.m_light_casters[i].get_component(gb.ces_component_type.transformation);

        var light_caster_matrix_m = new gb.mat4().identity();
        var light_caster_parent = this.m_light_casters[i].parent;

        while (light_caster_parent) {
            var light_caster_parent_transformation_component = light_caster_parent.get_component(gb.ces_component_type.transformation);
            light_caster_matrix_m = gb.mat4.multiply(light_caster_matrix_m, light_caster_parent_transformation_component.matrix_m);
            light_caster_parent = light_caster_parent.parent;
        }

        var light_caster_position = gb.mat4.multiply_vec2(light_caster_transformation_component.position, light_caster_matrix_m);

        for (var j = 0; j < this.m_shadow_casters.length; ++j) {
            var convex_hull_component = this.m_shadow_casters[j].get_component(gb.ces_component_type.convex_hull);
            var shadow_caster_transformation_component = this.m_shadow_casters[j].get_component(gb.ces_component_type.transformation);

            var shadow_caster_matrix_m = new gb.mat4().identity();
            var shadow_caster_parent = this.m_shadow_casters[j].parent;

            while (shadow_caster_parent) {
                var shadow_caster_parent_transformation_component = shadow_caster_parent.get_component(gb.ces_component_type.transformation);
                shadow_caster_matrix_m = gb.mat4.multiply(shadow_caster_matrix_m, shadow_caster_parent_transformation_component.matrix_m);
                shadow_caster_parent = shadow_caster_parent.parent;
            }

            shadow_caster_matrix_m = gb.mat4.multiply(shadow_caster_matrix_m, shadow_caster_transformation_component.matrix_m);
            light_mask_component.update_mask_geometry(shadow_caster_matrix_m, convex_hull_component.oriented_vertices);
            light_component.add_shadow_caster(this.m_shadow_casters[j]);
        }
        light_mask_component.generate_mask_mesh(light_caster_position);
    }
};

gb.ces_deferred_lighting_system.prototype.update_recursively = function(entity) {
    var light_component = entity.get_component(gb.ces_component_type.light);
    if (light_component) {
        this.m_light_casters.push(entity);
    }

    var convex_hull_component = entity.get_component(gb.ces_component_type.convex_hull);
    if (convex_hull_component) {
        this.m_shadow_casters.push(entity);
    }

    var children = entity.children;
    for (var i = 0; i < children.length; ++i) {
        this.update_recursively(children[i]);
    }
};
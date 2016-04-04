/* global gb */

"use strict";

gb.ces_light_mask_component = function() {
    gb.ces_base_component.call(this);

    this.m_type = gb.ces_component_type.light_mask;
    this.m_mesh = null;
    this.m_shadow_casters_vertices = [];
    this.m_shadow_casters_edges = [];
    this.m_vertices = [];
    this.m_indices = [];

    Object.defineProperty(this, 'mesh', {
        get: function() {
            return this.m_mesh;
        }
    });
};
gb.ces_light_mask_component.prototype = Object.create(gb.ces_base_component.prototype);
gb.ces_light_mask_component.prototype.constructor = gb.ces_light_mask_component;

gb.ces_light_mask_component.prototype.update_mask_geometry = function(shadow_caster_matrix_m, convex_hull_oriented_vertices) {
    for (var i = 0; i < convex_hull_oriented_vertices.length; ++i) {
        var next_vertex_index = (i + 1) % convex_hull_oriented_vertices.length;
        this.m_shadow_casters_edges.push({
            "point_01": gb.mat4.multiply_vec2(convex_hull_oriented_vertices[i], shadow_caster_matrix_m),
            "point_02": gb.mat4.multiply_vec2(convex_hull_oriented_vertices[next_vertex_index], shadow_caster_matrix_m)
        });
        this.m_shadow_casters_vertices.push(gb.mat4.multiply_vec2(convex_hull_oriented_vertices[i], shadow_caster_matrix_m));
    }
};

gb.ces_light_mask_component.prototype.generate_mask_mesh = function(light_caster_position) {
    var angles = [];
    for(var i = 0; i < this.m_shadow_casters_vertices.length; ++i) {
        var point = this.m_shadow_casters_vertices[i];
        var angle = Math.atan2(point.y - light_caster_position.y, point.x - light_caster_position.x);

        angles.push(angle - 0.0001);
        angles.push(angle);
        angles.push(angle + 0.0001);
    }

    var intersections;
    for (var i = 0; i < angles.length; ++i) {
        var angle = angles[i];
        var direction = new gb.vec2(Math.cos(angle), Math.sin(angle));
        var ray = {"origin": light_caster_position, "direction": gb.vec2.add(light_caster_position, direction)};

        var closest_distance = INT16_MAX;
        var closest_intersection = new gb.vec2(INT16_MIN);

        for (var j = 0; j < this.m_shadow_casters_edges.length; ++j) {
            var distance = INT16_MAX;
            var intersection = gb.math.intersect(ray.origin, ray.direction, m_shadow_casters_edges[j].point_01, m_shadow_casters_edges[j].point_02);
            if (!intersection.intersected) {
                continue;
            }
            if (intersection.distance < closest_distance) {
                closest_distance = intersection.distance;
                closest_intersection = intersection.point;
            }
        }

        if (closest_intersection.equal(new gb.vec2(INT16_MIN))) {
            continue;
        }
        intersections.push({"point": closest_intersection, "angle": angle});
    }

    intersections.sort(function(a, b) {
        return a.angle - b.angle;
    });

    for (var i = 0; i < intersections.length; ++i) {
        this.m_vertices[i] = new gb.vertex_attribute();
    }
    this.m_vertices[0].m_position = light_caster_position;

    var index = 1;
    for (var i = 0; i < intersections.length; ++i) {
        var intersection = intersections[i];
        this.m_vertices[index++].m_position = intersection.point;
    }

    for (var i = 1; i < this.m_vertices.length; ++i) {
        var next_vertex_index = Math.max((i + 1) % m_vertices.length, 1);
        this.m_indices.push(0);
        this.m_indices.push(i);
        this.m_indices.push(next_vertex_index);
    }
};

gb.ces_light_mask_component.prototype.cleanup = function() {
	this.m_shadow_casters_vertices = [];
    this.m_shadow_casters_edges = [];
    this.m_vertices = [];
    this.m_indices = [];
};
/* global gb, gl */

"use strict";

gb.ces_shadow_component = function() {
    gb.ces_base_component.call(this);

    this.m_type = gb.ces_component_type.shadow;
    this.m_mesh = null;
    this.m_vertices = [];
    this.m_indices = [];

    Object.defineProperty(this, 'mesh', {
        get: function() {
            return this.m_shadow_casters;
        }
    });
};

gb.ces_shadow_component.prototype = Object.create(gb.ces_base_component.prototype);
gb.ces_shadow_component.prototype.constructor = gb.ces_shadow_component;
gb.ces_shadow_component.prototype.update_shadow_geometry = function(light_caster_position, shadow_caster_matrix_m, convex_hull_oriented_vertices) {

    var back_facing_flags = [];
    var back_facing_vertices = [];

    for (var i = 0; i < convex_hull_oriented_vertices.length; ++i) {
        var point_01 = gb.mat4.multiply_vec2(convex_hull_oriented_vertices[i], shadow_caster_matrix_m);

        var next_point_index = (i + 1) % convex_hull_oriented_vertices.length;

        var point_02 = gb.mat4.multiply_vec2(convex_hull_oriented_vertices[next_point_index], shadow_caster_matrix_m);

        var edge_normal = new gb.vec2((point_01.y - point_02.y) * -1.0, point_01.x - point_02.x);

        var edge_middle = (point_01 + point_02) * 0.5;
        var light_direction = gb.vec2.sub(light_caster_position, edge_middle);

        if (light_direction.dot(edge_normal) < 0.0) {
            var index = back_facing_vertices.findIndex(function(value) {
                return value === i;
            });
            if (index === -1) {
                back_facing_vertices.push_back(i);
            }
            index = back_facing_vertices.findIndex(function(value) {
                return value === next_point_index;
            });
            if (index === -1) {
                back_facing_vertices.push_back(next_point_index);
            }
            back_facing_flags[i] = true;
        }
    }

    var starting_index = 0;
    for (var i = 0; i < convex_hull_oriented_vertices.length; ++i) {
        var current_edge = i;
        var next_edge = (i + 1) % convex_hull_oriented_vertices.length;

        if (!back_facing_flags[current_edge] && back_facing_flags[next_edge]) {
            starting_index = next_edge;
        }
    }

    var index = 0;
    for (var i = 0; i < Math.max(back_facing_vertices.length - 1, 0); ++i) {
        this.m_indices.push(index + this.m_vertices.length);
        index += 2;
        this.m_indices.push(index + this.m_vertices.length);
        index -= 1;
        this.m_indices.push(index + this.m_vertices.length);
        index += 1;

        this.m_indices.push(index + this.m_vertices.length);
        index += 1;
        this.m_indices.push(index + this.m_vertices.length);
        index -= 2;
        this.m_indices.push(index + this.m_vertices.length);
        index += 1;
    }

    for (var i = 0; i < back_facing_vertices.length; ++i) {
        this.m_vertices[i] = new gb.vertex_attribute();
    }

    index = this.m_vertices.length;
    var current_index = starting_index;
    for (var i = 0; i < back_facing_vertices.length; ++i) {
        this.m_vertices[index++].position = gb.mat4.multiply_vec2(convex_hull_oriented_vertices[current_index], shadow_caster_matrix_m);
        var light_direction = gb.vec2.sub(gb.mat4.multiply_vec2(convex_hull_oriented_vertices[current_index], shadow_caster_matrix_m), light_caster_position);
        light_direction.normalize().multiply_scalar(1024);
        this.m_vertices[index++].position = gb.vec2.add(gb.mat4.multiply_vec2(convex_hull_oriented_vertices[current_index], shadow_caster_matrix_m), light_direction);
        current_index = (current_index + 1) % convex_hull_oriented_vertices.length;
    }
};


gb.ces_light_component.prototype.generate_shadow_mesh = function() {
    if (this.m_vertices.length === 0 || this.m_indices.length === 0) {
        this.m_mesh = null;
        return;
    }

    var vbo = new gb.vbo(this.m_vertices.length, gl.STATIC_DRAW);
    var vertices = vbo.lock();
    for (var i = 0; i < this.m_vertices.length; ++i) {
        vertices[i] = this.m_vertices[i];
    }
    vbo.unlock();

    var ibo = new gb.ibo(this.m_indices.length, gl.STATIC_DRAW);
    var indices = ibo.lock();
    for (var i = 0; i < this.m_indices.length; ++i) {
        indices[i] = this.m_indices[i];
    }
    ibo.unlock();

    this.m_mesh = new gb.mesh(vbo, ibo, gl.gl.TRIANGLES);
};

gb.ces_light_component.prototype.cleanup = function() {
    this.m_vertices = [];
    this.m_indices = [];
};
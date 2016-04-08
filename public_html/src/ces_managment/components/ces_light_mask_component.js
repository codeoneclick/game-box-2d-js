/* global oop, gb, gl */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "ces_light_mask_component",
    extend: gb.ces_base_component,

    init: function() {

        this.m_type = gb.ces_base_component.type.light_mask;
        this.m_shadow_casters_vertices = [];
        this.m_shadow_casters_edges = [];
        this.m_vertices = [];
        this.m_indices = [];

        var vbo = new gb.vbo(1024, gl.STATIC_DRAW);
        var ibo = new gb.ibo(4096, gl.STATIC_DRAW);
        this.m_mesh = new gb.mesh(vbo, ibo, gl.TRIANGLES);

        Object.defineProperty(this, 'mesh', {
            get: function() {

                if (this.m_vertices.length === 0 || this.m_indices.length === 0) {
                    this.m_mesh.vbo.unlock(1);
                    this.m_mesh.ibo.unlock(1);
                } else {
                    var vertices = this.m_mesh.vbo.lock();
                    for (var i = 0; i < this.m_vertices.length; ++i) {
                        vertices[i].m_position = this.m_vertices[i].m_position;
                    }
                    vbo.unlock(this.m_vertices.length);

                    var indices = this.m_mesh.ibo.lock();
                    for (var i = 0; i < this.m_indices.length; ++i) {
                        indices[i] = this.m_indices[i];
                    }
                    ibo.unlock(this.m_indices.length);
                }
                return this.m_mesh;
            }
        });
    },

    release: function() {

    },

    methods: {
        update_mask_geometry: function(shadow_caster_matrix_m, convex_hull_oriented_vertices) {
            for (var i = 0; i < convex_hull_oriented_vertices.length; ++i) {
                var next_vertex_index = (i + 1) % convex_hull_oriented_vertices.length;
                this.m_shadow_casters_edges.push({
                    point_01: gb.mat4.multiply_vec2(convex_hull_oriented_vertices[i], shadow_caster_matrix_m),
                    point_02: gb.mat4.multiply_vec2(convex_hull_oriented_vertices[next_vertex_index], shadow_caster_matrix_m)
                });
                this.m_shadow_casters_vertices.push(gb.mat4.multiply_vec2(convex_hull_oriented_vertices[i], shadow_caster_matrix_m));
            }
        },

        generate_mask_mesh: function(light_caster_position) {

            var angles = [];
            for (var i = 0; i < this.m_shadow_casters_vertices.length; ++i) {
                var point = this.m_shadow_casters_vertices[i];
                var angle = Math.atan2(point.y - light_caster_position.y, point.x - light_caster_position.x);

                angles.push(angle - 0.0001);
                angles.push(angle);
                angles.push(angle + 0.0001);
            }

            var intersections = [];
            for (var i = 0; i < angles.length; ++i) {
                var angle = angles[i];
                var direction = new gb.vec2(Math.cos(angle), Math.sin(angle));
                var ray = {
                    origin: light_caster_position,
                    direction: gb.vec2.add(light_caster_position, direction)
                };

                var closest_distance = gb.math.INT16_MAX;
                var closest_intersection = new gb.vec2(gb.math.INT16_MIN);

                for (var j = 0; j < this.m_shadow_casters_edges.length; ++j) {
                    var intersection = gb.math.intersect(ray.origin, ray.direction, this.m_shadow_casters_edges[j].point_01, this.m_shadow_casters_edges[j].point_02);
                    if (!intersection.intersected) {
                        continue;
                    }
                    if (intersection.distance < closest_distance) {
                        closest_distance = intersection.distance;
                        closest_intersection = intersection.point;
                    }
                }

                if (closest_intersection.equals(new gb.vec2(gb.math.INT16_MIN))) {
                    continue;
                }
                var is_contain = intersections.findIndex(function(value) {
                    return value.point.equals(closest_intersection);
                });
                if (is_contain === -1) {
                    intersections.push({
                        point: closest_intersection,
                        angle: angle
                    });
                }
            }

            intersections.sort(function(a, b) {
                return a.angle - b.angle;
            });

            for (var i = 0; i < intersections.length + 1; ++i) {
                this.m_vertices[i] = new gb.vertex_attribute();
            }
            this.m_vertices[0].m_position = light_caster_position;

            var index = 1;
            for (var i = 0; i < intersections.length; ++i) {
                var intersection = intersections[i];
                this.m_vertices[index++].m_position = intersection.point;
            }

            for (var i = 1; i < this.m_vertices.length; ++i) {
                var next_vertex_index = Math.max((i + 1) % this.m_vertices.length, 1);
                this.m_indices.push(0);
                this.m_indices.push(i);
                this.m_indices.push(next_vertex_index);
            }
        },

        cleanup: function() {
            this.m_shadow_casters_vertices = [];
            this.m_shadow_casters_edges = [];
            this.m_vertices = [];
            this.m_indices = [];
        }
    },

    static_methods: {

    }
});
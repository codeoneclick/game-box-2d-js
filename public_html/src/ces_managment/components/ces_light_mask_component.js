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

        var vbo = new gb.vbo(1024, gl.DYNAMIC_DRAW, gb.vbo.declaration.position_xy);
        var ibo = new gb.ibo(4096, gl.DYNAMIC_DRAW);
        this.m_mesh = new gb.mesh(vbo, ibo, gl.TRIANGLES);

        Object.defineProperty(this, 'mesh', {
            get: function() {
                if (this.m_vertices.length === 0 || this.m_indices.length === 0) {
                    this.m_mesh.vbo.submit(1);
                    this.m_mesh.ibo.submit(1);
                } else {

                    var vbo = this.m_mesh.vbo;
                    for (var i = 0; i < this.m_vertices.length; ++i) {
                        vbo.write_attribute(gb.vbo.attribute.position, i, this.m_vertices[i]);
                    }
                    vbo.submit();

                    var indices = this.m_mesh.ibo.data;
                    for (var i = 0; i < this.m_indices.length; ++i) {
                        indices[i] = this.m_indices[i];
                    }
                    ibo.submit(this.m_indices.length);
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
            var direction = new gb.vec2(0.0);
            var undefined_intersection = new gb.vec2(gb.math.INT16_MIN);
            var closest_intersection = new gb.vec2(undefined_intersection);
            var closest_distance = gb.math.INT16_MAX;

            for (var i = 0; i < angles.length; ++i) {
                var angle = angles[i];
                direction.x = Math.cos(angle); 
                direction.y = Math.sin(angle);
                var ray = {
                    origin: light_caster_position,
                    direction: direction.add(light_caster_position)
                };

                closest_distance = gb.math.INT16_MAX;
                closest_intersection.x = undefined_intersection.x;
                closest_intersection.y = undefined_intersection.y;

                for (var j = 0; j < this.m_shadow_casters_edges.length; ++j) {

                    var intersection = gb.math.intersect(ray.origin, ray.direction, this.m_shadow_casters_edges[j].point_01, this.m_shadow_casters_edges[j].point_02);
                    if (!intersection.intersected) {
                        continue;
                    }
                    if (intersection.distance < closest_distance) {
                        closest_distance = intersection.distance;
                        closest_intersection.x = intersection.point_x;
                        closest_intersection.y = intersection.point_y;
                    }
                }

                if (closest_intersection.equals(undefined_intersection)) {
                    continue;
                }
                var is_contain = intersections.findIndex(function(value) {
                    return value.point_x === closest_intersection.x && value.point_y === closest_intersection.y;
                });
                if (is_contain === -1) {
                    intersections.push({
                        point_x: closest_intersection.x,
                        point_y: closest_intersection.y,
                        angle: angle
                    });
                }
            }

            intersections.sort(function(a, b) {
                return a.angle - b.angle;
            });

            var delta_size = (intersections.length + 1) - this.m_vertices.length;
            if(delta_size > 0)
            {
                var old_size = this.m_vertices.length;
                this.m_vertices.length = (intersections.length + 1);
                for(var i = old_size; i < this.m_vertices.length; ++i)
                {
                    this.m_vertices[i] = new gb.vec2();
                }
            }
            else if(delta_size < 0)
            {
                this.m_vertices.length = intersections.length + 1;
            }
            this.m_vertices[0] = light_caster_position;

            var index = 1;
            for (var i = 0; i < intersections.length; ++i) {
                var intersection = intersections[i];
                this.m_vertices[index].x = intersection.point_x;
                this.m_vertices[index].y = intersection.point_y;
                index++;
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
            this.m_indices = [];
        }
    },

    static_methods: {

    }
});
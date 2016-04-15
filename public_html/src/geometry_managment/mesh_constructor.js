/* global oop, gl, gb */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "mesh_constructor",

    init: function() {

    },

    release: function() {

    },

    methods: {

    },

    static_methods: {
        create_screen_quad: function() {

            var vbo = new gb.vbo(4, gl.STATIC_DRAW, [gb.vbo.attributes.position, gb.vbo.attributes.texcoord, gb.vbo.attributes.color]);
            vbo.write_attribute(gb.vbo.attributes.position, 0, new gb.vec2(-1.0, -1.0));
            vbo.write_attribute(gb.vbo.attributes.position, 1, new gb.vec2(-1.0, 1.0));
            vbo.write_attribute(gb.vbo.attributes.position, 2, new gb.vec2(1.0, -1.0));
            vbo.write_attribute(gb.vbo.attributes.position, 3, new gb.vec2(1.0, 1.0));

            vbo.write_attribute(gb.vbo.attributes.texcoord, 0, new gb.vec2(0.0, 0.0));
            vbo.write_attribute(gb.vbo.attributes.texcoord, 1, new gb.vec2(0.0, 1.0));
            vbo.write_attribute(gb.vbo.attributes.texcoord, 2, new gb.vec2(1.0, 0.0));
            vbo.write_attribute(gb.vbo.attributes.texcoord, 3, new gb.vec2(1.0, 1.0));
            vbo.submit();

            var ibo = new gb.ibo(6, gl.STATIC_DRAW);
            var indices = ibo.lock();
            indices[0] = 0;
            indices[1] = 2;
            indices[2] = 1;
            indices[3] = 1;
            indices[4] = 2;
            indices[5] = 3;
            ibo.unlock();

            return new gb.mesh(vbo, ibo, gl.TRIANGLES);
        },

        create_shape_quad: function() {
            var vbo = new gb.vbo(4, gl.STATIC_DRAW, [gb.vbo.attributes.position, gb.vbo.attributes.texcoord, gb.vbo.attributes.color]);
            vbo.write_attribute(gb.vbo.attributes.position, 0, new gb.vec2(-0.5, -0.5));
            vbo.write_attribute(gb.vbo.attributes.position, 1, new gb.vec2(-0.5, 0.5));
            vbo.write_attribute(gb.vbo.attributes.position, 2, new gb.vec2(0.5, -0.5));
            vbo.write_attribute(gb.vbo.attributes.position, 3, new gb.vec2(0.5, 0.5));

            vbo.write_attribute(gb.vbo.attributes.texcoord, 0, new gb.vec2(0.0, 0.0));
            vbo.write_attribute(gb.vbo.attributes.texcoord, 1, new gb.vec2(0.0, 1.0));
            vbo.write_attribute(gb.vbo.attributes.texcoord, 2, new gb.vec2(1.0, 0.0));
            vbo.write_attribute(gb.vbo.attributes.texcoord, 3, new gb.vec2(1.0, 1.0));
            vbo.submit();

            var ibo = new gb.ibo(6, gl.STATIC_DRAW);
            var indices = ibo.lock();
            indices[0] = 0;
            indices[1] = 2;
            indices[2] = 1;
            indices[3] = 1;
            indices[4] = 2;
            indices[5] = 3;
            ibo.unlock();

            return new gb.mesh(vbo, ibo, gl.TRIANGLES);
        },

        create_circle: function() {
            var num_subdivisions = 32;
            var radius = 1.0;

            var num_vertices = num_subdivisions + 1;
            var vbo = new gb.vbo(num_vertices, gl.STATIC_DRAW, [gb.vbo.attributes.position, gb.vbo.attributes.texcoord, gb.vbo.attributes.color]);

            var index = 1;
            var vertex_position = new gb.vec2();
            vbo.write_attribute(gb.vbo.attributes.position, 0, vertex_position);
            for (var angle = 0; angle <= Math.PI * 2.0; angle += ((Math.PI * 2.0) / num_subdivisions)) {
                vertex_position.x = radius * Math.cos(angle);
                vertex_position.y = radius * Math.sin(angle);
                vbo.write_attribute(gb.vbo.attributes.position, index, vertex_position);
                index++;
            }
            vbo.submit();

            index = 1;
            var num_indices = (num_subdivisions + 1) * 3;
            var ibo = new gb.ibo(num_indices, gl.STATIC_DRAW);
            var indices = ibo.lock();
            for (var i = 0; i < num_subdivisions * 3; i += 3) {
                indices[i + 0] = 0;
                indices[i + 1] = Math.min(index++, num_vertices - 1);
                indices[i + 2] = Math.min(index, num_vertices - 1);
            }

            indices[num_indices - 3] = 0;
            indices[num_indices - 2] = Math.min(index - 1, num_vertices - 1);
            indices[num_indices - 1] = 1;
            ibo.unlock();

            return new gb.mesh(vbo, ibo, gl.TRIANGLES);
        },

        create_grid: function(num_rows, num_columns, rows_gap, columns_gap)
        {
            var num_vertices = (num_rows + 1) * (num_columns + 1) * 4;
            var num_indices = (num_rows + 1) * (num_columns + 1) * 4;
            
            var vbo = new gb.vbo(num_vertices, gl.STATIC_DRAW, [gb.vbo.attributes.position, gb.vbo.attributes.texcoord, gb.vbo.attributes.color]);
            var index = 0;
            var vertex_position = new gb.vec2();
            for(var i = 0; i <= num_rows; ++i)
            {
                vertex_position.x = i * rows_gap;
                vertex_position.y = 0.0;
                vbo.write_attribute(gb.vbo.attributes.position, index, vertex_position);
                index++;

                vertex_position.x = i * rows_gap;
                vertex_position.y = num_columns * columns_gap;
                vbo.write_attribute(gb.vbo.attributes.position, index, vertex_position);
                index++;
            }
            
            for(var i = 0; i <= num_columns; ++i)
            {
                vertex_position.x = 0.0;
                vertex_position.y = i * columns_gap;
                vbo.write_attribute(gb.vbo.attributes.position, index, vertex_position);
                index++;

                vertex_position.x = num_rows * rows_gap;
                vertex_position.y = i * columns_gap;
                vbo.write_attribute(gb.vbo.attributes.position, index, vertex_position);
                index++;
            }
            vbo.submit();
            
            var ibo = new gb.ibo(num_indices * 4, gl.STATIC_DRAW);
            var indices = ibo.lock();
            for(var i = 0; i < num_indices; ++i)
            {
                indices[i] = i;
            }
            ibo.unlock();

            return new gb.mesh(vbo, ibo, gl.LINES);
        }
    }
});
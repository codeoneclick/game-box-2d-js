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
            var vbo = new gb.vbo(4, gl.STATIC_DRAW);
            var vertices = vbo.lock();
            vertices[0].position = new gb.vec2(-1.0, -1.0);
            vertices[0].texcoord = new gb.vec2(0.0, 0.0);
            vertices[1].position = new gb.vec2(-1.0, 1.0);
            vertices[1].texcoord = new gb.vec2(0.0, 1.0);
            vertices[2].position = new gb.vec2(1.0, -1.0);
            vertices[2].texcoord = new gb.vec2(1.0, 0.0);
            vertices[3].position = new gb.vec2(1.0, 1.0);
            vertices[3].texcoord = new gb.vec2(1.0, 1.0);
            vbo.unlock();

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
            var vbo = new gb.vbo(4, gl.STATIC_DRAW);
            var vertices = vbo.lock();
            vertices[0].position = new gb.vec2(-0.5, -0.5);
            vertices[0].texcoord = new gb.vec2(0.0, 0.0);
            vertices[1].position = new gb.vec2(-0.5, 0.5);
            vertices[1].texcoord = new gb.vec2(0.0, 1.0);
            vertices[2].position = new gb.vec2(0.5, -0.5);
            vertices[2].texcoord = new gb.vec2(1.0, 0.0);
            vertices[3].position = new gb.vec2(0.5, 0.5);
            vertices[3].texcoord = new gb.vec2(1.0, 1.0);
            vbo.unlock();

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
            var vbo = new gb.vbo(num_vertices, gl.STATIC_DRAW);
            var vertices = vbo.lock();

            vertices[0].m_position = new gb.vec2(0.0, 0.0);

            var index = 1;
            for (var angle = 0; angle <= Math.PI * 2.0; angle += ((Math.PI * 2.0) / num_subdivisions)) {
                vertices[index++].m_position = new gb.vec2(radius * Math.cos(angle), radius * Math.sin(angle));
            }
            vbo.unlock();

            index = 1;
            var num_indices = (num_subdivisions + 1) * 3;
            var ibo = new gb.ibo(num_indices, gl.STATIC_DRAW);
            var indices = ibo.lock();
            for (var i = 0; i < num_subdivisions * 3; i += 3) {
                indices[i + 0] = 0;
                indices[i + 1] = Math.min(index++, vertices.length - 1);
                indices[i + 2] = Math.min(index, vertices.length - 1);
            }

            indices[num_indices - 3] = 0;
            indices[num_indices - 2] = Math.min(index - 1, vertices.length - 1);
            indices[num_indices - 1] = 1;
            ibo.unlock();

            return new gb.mesh(vbo, ibo, gl.TRIANGLES);
        },

        create_grid: function(num_rows, num_columns, rows_gap, columns_gap)
        {
            var num_vertices = (num_rows + 1) * (num_columns + 1) * 4;
            var num_indices = (num_rows + 1) * (num_columns + 1) * 4;
            
            var vbo = new gb.vbo(num_vertices, gl.STATIC_DRAW);
            var vertices = vbo.lock();
            
            var index = 0;
            for(var i = 0; i <= num_rows; ++i)
            {
                vertices[index++].position = new gb.vec2(i * rows_gap, 0.0);
                vertices[index++].position = new gb.vec2(i * rows_gap, num_columns * columns_gap);
            }
            
            for(var i = 0; i <= num_columns; ++i)
            {
                vertices[index++].m_position = new gb.vec2(0.0, i * columns_gap);
                vertices[index++].m_position = new gb.vec2(num_rows * rows_gap, i * columns_gap);
            }
            vbo.unlock();
            
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
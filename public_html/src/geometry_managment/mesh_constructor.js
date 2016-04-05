/* global gb, gl */

"use strict";

gb.mesh_constructor = function() {

};

gb.mesh_constructor.create_screen_quad = function() {
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
};

gb.mesh_constructor.create_shape_quad = function() {
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
};

gb.mesh_constructor.create_circle = function() {

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
        indices[i + 1] = index++;
        indices[i + 2] = index;
    }

    indices[num_indices - 3] = 0;
    indices[num_indices - 2] = index - 1;
    indices[num_indices - 1] = 1;
    ibo.unlock();

    return new gb.mesh(vbo, ibo, gl.TRIANGLES);
};
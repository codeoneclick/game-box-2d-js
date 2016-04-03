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

gb.mesh_constructor.create_sprite_quad = function() {
    return null;
};
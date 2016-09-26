/* global oop, gl, gb, console */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "shader_compiler_glsl",
    constants: {
        vs_shader_header: "precision highp float;\nattribute vec2 a_position;\nattribute vec2 a_texcoord;\nattribute vec4 a_color;\n",
        fs_shader_header: "precision highp float;\n"
    },

    init: function() {

    },

    release: function() {

    },

    methods: {
        compile: function(source_code, shader_type) {
            var handler = gl.createShader(shader_type);
            if (!handler) {
                console.error("can't create shader");
                return -1;
            }

            var full_source_code = shader_type === gl.VERTEX_SHADER ?
                (gb.shader_compiler_glsl.vs_shader_header + source_code).trim() :
                (gb.shader_compiler_glsl.fs_shader_header + source_code).trim();

            gl.shaderSource(handler, full_source_code);
            gl.compileShader(handler);

            var compile_message = gl.getShaderInfoLog(handler) || "";
            if (!gl.getShaderParameter(handler, gl.COMPILE_STATUS)) {
                console.error(full_source_code);
                console.error(compile_message);
            }
            return handler;
        },

        link: function(vs_handler, fs_handler) {
            var shader_handler = gl.createProgram();
            gl.attachShader(shader_handler, vs_handler);
            gl.attachShader(shader_handler, fs_handler);

            gl.linkProgram(shader_handler);

            var link_message = gl.getProgramInfoLog(shader_handler) || "";

            if (!gl.getProgramParameter(shader_handler, gl.LINK_STATUS)) {
                console.error(link_message);

                gl.detachShader(shader_handler, vs_handler);
                gl.detachShader(shader_handler, fs_handler);
                gl.deleteShader(vs_handler);
                gl.deleteShader(fs_handler);

                shader_handler = -1;
            }
            return shader_handler;
        }
    },

    static_methods: {

    }
});
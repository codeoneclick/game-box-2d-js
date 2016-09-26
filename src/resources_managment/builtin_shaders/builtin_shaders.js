/* global oop, gl, gb */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "builtin_shaders",

    init: function() {

    },

    release: function() {

    },

    methods: {

    },

    static_methods: {
        get_screen_quad_tex2d_shader: function() {
            var shader_screen_quad_tex2d_vert = "varying vec2 v_texcoord;\nvoid main(void)\n{\nv_texcoord = a_texcoord;\ngl_Position = vec4(a_position, 0.0, 1.0);\n}";
            var shader_screen_quad_tex2d_frag = "varying vec2 v_texcoord;\nuniform sampler2D  sampler_01;\nvoid main(void)\n{\ngl_FragColor = texture2D(sampler_01, v_texcoord);\n}";
            return gb.shader.construct("screen_quad_tex2d", shader_screen_quad_tex2d_vert, shader_screen_quad_tex2d_frag);
        }
    }
});
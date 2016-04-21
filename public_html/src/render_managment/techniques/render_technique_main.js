/* global oop, gb, gl */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "render_technique_main",
    extend: gb.render_technique_base,

    init: function(width, height, name, index, material) {
        this.m_material = material;
        this.m_screen_quad = gb.mesh_constructor.create_screen_quad();
        this.m_render_buffer = null;
    },

    release: function() {
        this.m_screen_quad.release();
    },

    methods: {
        bind: function() {
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.m_frame_buffer);
            gl.bindRenderbuffer(gl.RENDERBUFFER, this.m_render_buffer);
            gl.viewport(0, 0, this.m_frame_width, this.m_frame_height);

            gl.disable(gl.DEPTH_TEST);
            gb.material_cached_parameters.get_cached_parameters().is_depth_test = false;
            gl.depthMask(false);
            gb.material_cached_parameters.get_cached_parameters().is_depth_mask = false;
            gl.disable(gl.STENCIL_TEST);
            gb.material_cached_parameters.get_cached_parameters().is_stencil_test = false;

            gl.clearColor(this.m_clear_color.x, this.m_clear_color.y, this.m_clear_color.z, this.m_clear_color.w);
            gl.clear(gl.COLOR_BUFFER_BIT);

            if (this.m_material.shader && this.m_material.shader.is_commited) {
                this.m_material.bind();
                this.m_screen_quad.bind(this.m_material.shader.attributes);
            }
        },

        unbind: function() {
            if (this.m_material.shader && this.m_material.shader.is_commited) {
                this.m_material.unbind();
                this.m_screen_quad.unbind(this.m_material.shader.attributes);
            }
        },

        draw: function() {
            if (this.m_material.shader && this.m_material.shader.is_commited) {
                this.m_screen_quad.draw();
            }
        }
    },

    static_methods: {

    }
});
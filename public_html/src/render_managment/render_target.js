/* global oop, console, alert */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "render_target",

    init: function(width, height) {
        var color_attachment_id = gl.createTexture();
        this.m_color_attachment_texture = gb.texture.construct("render_target", color_attachment_id, width, height);
        this.m_color_attachment_texture.wrap_mode = gl.CLAMP_TO_EDGE;
        this.m_color_attachment_texture.mag_filter = gl.LINEAR;
        this.m_color_attachment_texture.min_filter = gl.LINEAR;
        this.m_color_attachment_texture.bind();
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

        this.m_frame_buffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.m_frame_buffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, color_attachment_id, 0);

        var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
        if (status !== gl.FRAMEBUFFER_COMPLETE) {
            console.error("can't create framebuffer");
        }
        this.m_screen_quad = gb.mesh_constructor.create_screen_quad();
    },

    release: function() {
        gl.deleteFramebuffer(this.m_frame_buffer);
        this.m_color_attachment_texture.release();
        this.m_screen_quad.release();
    },

    methods: {
        begin: function() {
            gl.bindFramebuffer(gl.FRAMEBUFFER, this.m_frame_buffer);
            gl.viewport(0, 0, this.m_color_attachment_texture.width, this.m_color_attachment_texture.height);

            gl.disable(gl.DEPTH_TEST);
            gb.material_cached_parameters.get_cached_parameters().is_depth_test = false;
            gl.depthMask(false);
            gb.material_cached_parameters.get_cached_parameters().is_depth_mask = false;
            gl.disable(gl.STENCIL_TEST);
            gb.material_cached_parameters.get_cached_parameters().is_stencil_test = false;

            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);
        },

        end: function(clip_width, clip_height) {
            var data = new Uint8Array(this.m_color_attachment_texture.width * this.m_color_attachment_texture.height * 4);
            gl.readPixels(0, 0, this.m_color_attachment_texture.width, this.m_color_attachment_texture.height, gl.RGBA, gl.UNSIGNED_BYTE, data);

            var canvas_2d = document.createElement('canvas');
            canvas_2d.width = this.m_color_attachment_texture.width;
            canvas_2d.height = this.m_color_attachment_texture.height;
            var context_2d = canvas_2d.getContext('2d');

            var image_data = context_2d.createImageData(this.m_color_attachment_texture.width, this.m_color_attachment_texture.height);
            image_data.data.set(data);
            context_2d.putImageData(image_data, 0, 0);

            var image = new Image();
            image.src = canvas_2d.toDataURL();

            canvas_2d.width = clip_width;
            canvas_2d.height = clip_height;
            context_2d.clearRect(0, 0, this.m_color_attachment_texture.width, this.m_color_attachment_texture.height);
            context_2d.scale(1, -1);
            context_2d.drawImage(image, 0, -image.height);
            image.src = canvas_2d.toDataURL();

            return image;
        }
    },
    
    static_methods: {

    }
});
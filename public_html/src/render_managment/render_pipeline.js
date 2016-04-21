/* global oop, gb, gl, console */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "render_pipeline",

    init: function() {
        this.m_main_render_technique = null;
        this.m_ws_render_techniques = [];
        this.m_unique_ws_render_techniques = [];
        this.m_ss_render_techniques = [];
        this.m_unique_ss_render_techniques = [];

        Object.defineProperty(this, 'ws_render_techniques', {
            get: function() {
                return this.m_ws_render_techniques;
            }
        });
    },

    release: function() {
        var techniques_count = this.m_ws_render_techniques.length;
        var technique = null;
        for(var i = 0; i < techniques_count; ++i) {
            technique = this.m_ws_render_techniques[i];
            technique.release();
        }

        techniques_count = this.m_ss_render_techniques.length;
        for(var i = 0; i < techniques_count; ++i) {
            technique = this.m_ss_render_techniques[i];
            technique.release();
        }
        this.m_main_render_technique.release();
    },

    methods: {
        
        create_main_render_technique: function(material) {
            this.m_main_render_technique = new gb.render_technique_main(gl.viewport_width, gl.viewport_height, "main", 0, material);
        },

        add_ws_render_technique: function(technique_name, technique_index, technique) {
            var guid = "" + technique_index + technique_name;
            if (!this.m_unique_ws_render_techniques[guid]) {
                this.m_unique_ws_render_techniques[guid] = technique;
                this.m_ws_render_techniques.push(technique);
            } else {
                console.log("can't add same ws render technique: " + technique_name);
            }
        },

        remove_ws_render_technique: function(technique_name, technique_index) {

        },

        add_ss_render_technique: function(technique_name, technique) {
            if (typeof this.m_unique_ss_render_techniques[technique_name] === 'undefined') {
                this.m_unique_ss_render_techniques[technique_name] = technique;
                this.m_ss_render_techniques.push(technique);
            } else {
                console.log("can't add same ss render technique: " + technique_name);
            }
        },

        remove_ss_render_technique: function(technique_name) {

        },

        on_draw_begin: function() {

        },

        on_draw_end: function() {
            for (var i = 0; i < this.m_ss_render_techniques.length; ++i) {
                var technique = this.m_ss_render_techniques[i];
                technique.bind();
                technique.draw();
                technique.unbind();
            }

            if (this.m_main_render_technique) {
                this.m_main_render_technique.bind();
                this.m_main_render_technique.draw();
                this.m_main_render_technique.unbind();
            }
        },

        get_ws_technique_result_as_image: function(technique_name, technique_index, image_width, image_height) {
            var image = null;
            var guid = "" + technique_index + technique_name;
            if (this.m_unique_ws_render_techniques[guid]) {
                var technique = this.m_unique_ws_render_techniques[guid];
                var material = new gb.material();
                var shader = gb.builtin_shaders.get_screen_quad_tex2d_shader();
                material.shader = shader;
                material.set_texture(technique.color_attachment_texture, gb.shader.sampler_type.sampler_01);
                
                var screen_quad = new gb.mesh_constructor.create_screen_quad();
                var render_target = new gb.render_target(image_width, image_height);

                render_target.begin();
                if (material.shader && material.shader.is_commited) {
                    material.bind();
                    screen_quad.bind(material.shader.attributes);
                    screen_quad.draw();
                    material.unbind();
                    screen_quad.unbind(material.shader.attributes);
                }
                var image = render_target.end();
                render_target.release();
                screen_quad.release();
            }
            return image;
        }
    },

    static_methods: {

    }
});
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

    },

    methods: {
        create_main_render_technique: function(material) {
            this.m_main_render_technique = new gb.render_technique_main(gl.viewport_width, gl.viewport_height, "main", 0, material);
        },

        add_ws_render_technique: function(technique_name, technique_index, technique) {
            var guid = "" + technique_index + technique_name;
            if (typeof this.m_unique_ws_render_techniques[guid] === 'undefined') {
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
        }
    },

    static_methods: {

    }
});
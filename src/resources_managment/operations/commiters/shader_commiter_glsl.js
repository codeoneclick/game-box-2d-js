/* global oop, gl, gb */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "shader_commiter_glsl",
    extend: gb.resource_commiter,

    init: function() {

    },

    release: function() {

    },

    methods: {
        commit: function(data) {
            this.m_status = gb.resource_commiter.status.in_progress;

            var shader_compiler = new gb.shader_compiler_glsl();
            var status = gb.resource_commiter.status.failure;

            var vs_handler = shader_compiler.compile(data.vs_source_code, gl.VERTEX_SHADER);
            if (vs_handler !== -1) {
                var fs_handler = shader_compiler.compile(data.fs_source_code, gl.FRAGMENT_SHADER);
                if (fs_handler !== -1) {
                    var handler = shader_compiler.link(vs_handler, fs_handler);
                    data.handler = handler;
                    if (handler !== -1) {
                        status = gb.resource_commiter.status.success;
                    }
                }
            }
            this.m_resource.on_transfering_data_commited(data);
            this.m_status = status;
        }
    },

    static_methods: {

    }
});
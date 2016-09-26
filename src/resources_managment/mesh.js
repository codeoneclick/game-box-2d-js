/* global oop, gl */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "mesh",

    init: function(vbo, ibo, mode) {
        this.m_vbo = vbo;
        this.m_ibo = ibo;
        this.m_mode = mode;

        Object.defineProperty(this, 'vbo', {
            get: function() {
                return this.m_vbo;
            }
        });

        Object.defineProperty(this, 'ibo', {
            get: function() {
                return this.m_ibo;
            }
        });
    },

    release: function() {
        this.vbo.release();
        this.ibo.release();
    },

    methods: {
        bind: function(attributes) {
            this.m_vbo.bind(attributes);
            this.m_ibo.bind();
        },

        unbind: function(attributes) {
            this.m_vbo.unbind(attributes);
            this.m_ibo.unbind();
        },

        draw: function() {
            gl.drawElements(this.m_mode, this.m_ibo.used_size, gl.UNSIGNED_SHORT, 0);
        }
    }
});
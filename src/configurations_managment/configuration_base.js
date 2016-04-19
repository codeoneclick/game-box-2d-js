/* global oop, gl */

"use strict";

var g_string_to_glenum = null;

oop.define_class({
    namespace: "gb",
    name: "configuration_base",

    init: function() {
        this.m_configurations = [];
    },

    release: function() {

    },

    methods: {
        set_configuration: function(name, value, index) {
            if (this.m_configurations[name] instanceof Object) {
                if (arguments.length === 3) {
                    if (index >= 0 && index < this.m_configurations[name].length) {
                        this.m_configurations[name][index] = value;
                    } else {
                        this.m_configurations[name].push(value);
                    }
                } else {
                    this.m_configurations[name].push(value);
                }
            } else {
                this.m_configurations[name] = [];
                this.m_configurations[name].push(value);
            }
            return this;
        }
    },

    static_methods: {
        string_to_glenum: function() {

            if (!g_string_to_glenum) {
                g_string_to_glenum = {
                    GL_FRONT: gl.FRONT,
                    GL_BACK: gl.BACK,
                    GL_SRC_COLOR: gl.SRC_ALPHA,
                    GL_SRC_ALPHA: gl.SRC_ALPHA,
                    GL_ONE: gl.ONE,
                    GL_ZERO: gl.ZERO,
                    GL_ONE_MINUS_SRC_COLOR: gl.ONE_MINUS_SRC_COLOR,
                    GL_ONE_MINUS_DST_COLOR: gl.ONE_MINUS_DST_COLOR,
                    GL_ONE_MINUS_SRC_ALPHA: gl.ONE_MINUS_SRC_ALPHA,
                    GL_ONE_MINUS_DST_ALPHA: gl.ONE_MINUS_DST_ALPHA,
                    GL_DST_ALPHA: gl.DST_ALPHA,
                    GL_CONSTANT_ALPHA: gl.CONSTANT_ALPHA,
                    GL_REPEAT: gl.REPEAT,
                    GL_CLAMP_TO_EDGE: gl.CLAMP_TO_EDGE,
                    GL_MIRRORED_REPEAT: gl.MIRRORED_REPEAT,
                    GL_NEAREST: gl.NEAREST,
                    GL_LINEAR: gl.LINEAR,
                    GL_MIPMAP: gl.LINEAR_MIPMAP_NEAREST,
                    GL_ALWAYS: gl.ALWAYS,
                    GL_EQUAL: gl.EQUAL,
                    GL_NOTEQUAL: gl.NOTEQUAL,
                    GL_FUNC_ADD: gl.FUNC_ADD,
                };
            }
            return g_string_to_glenum;
        }
    }
});
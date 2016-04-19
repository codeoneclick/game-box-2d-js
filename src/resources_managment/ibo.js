/* global oop, gl */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "ibo",

    init: function(size, mode) {
        this.m_handler = gl.createBuffer();
        this.m_allocated_size = size;
        this.m_used_size = size;
        this.m_mode = mode;
        this.m_data = new Uint16Array(size);

        Object.defineProperty(this, 'allocated_size', {
            get: function() {
                return this.m_allocated_size;
            }
        });

        Object.defineProperty(this, 'used_size', {
            get: function() {
                return this.m_used_size;
            }
        });

        Object.defineProperty(this, 'data', {
            get: function() {
                return this.m_data;
            }
        });
    },

    release: function() {
        gl.deleteBuffer(this.m_handler);
    },

    methods: {
        
        submit: function(size) {
            var data = this.m_data;
            if(size && size > 0 && size < this.m_allocated_size)
            {
                this.m_used_size = size;
                data = this.m_data.slice(0, size);
            }
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.m_handler);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, data, this.m_mode);
        },

        bind: function() {
            if (this.m_used_size !== 0) {
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.m_handler);
            }
        },

        unbind: function() {
            if (this.m_used_size !== 0) {
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
            }
        }
    }
});
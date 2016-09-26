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
        this.m_stride = 2;

        var size_in_bytes = size * this.m_stride;
        this.m_data = new ArrayBuffer(size_in_bytes);
        this.m_data_accessor = new DataView(this.m_data);

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
    },

    release: function() {
        gl.deleteBuffer(this.m_handler);
    },

    methods: {

        write_element: function(index, value) {
            if (index < this.m_allocated_size) {
                this.m_data_accessor.setUint16(index * this.m_stride, value, true);
            } else {
                console.error("out of ibo bound");
            }
        },

        read_attribute: function(index) {
            if (index < this.m_allocated_size) {
                return this.m_data_accessor.getUint16(index * this.m_stride, true);
            } else {
                console.error("out of ibo bound");
            }
        },
        
        submit: function(size) {
            var data = this.m_data;
            if(size && size > 0 && size < this.m_allocated_size) {
                this.m_used_size = size;
                data = this.m_data.slice(0, size * this.m_stride);
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
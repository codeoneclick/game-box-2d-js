/* global oop, gl, gb */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "texture",
    extend: gb.resource_base,

    init: function() {
        this.m_type = gb.resource_base.type.texture;
        this.m_handler = -1;
        this.m_width = 0;
        this.m_height = 0;
        this.m_setted_wrap_mode = 0;
        this.m_presseted_wrap_mode = gl.CLAMP_TO_EDGE;
        this.m_setted_mag_filter = 0;
        this.m_presetted_mag_filter = gl.NEAREST;
        this.m_setted_min_filter = 0;
        this.m_presetted_min_filter = gl.NEAREST;

        Object.defineProperty(this, 'handler', {
            get: function() {
                return this.m_handler;
            }
        });

        Object.defineProperty(this, 'width', {
            get: function() {
                return this.m_width;
            }
        });

        Object.defineProperty(this, 'height', {
            get: function() {
                return this.m_height;
            }
        });

        Object.defineProperty(this, 'wrap_mode', {
            set: function(value) {
                this.m_presseted_wrap_mode = value;
            }
        });

        Object.defineProperty(this, 'mag_filter', {
            set: function(value) {
                this.m_presetted_mag_filter = value;
            }
        });

        Object.defineProperty(this, 'min_filter', {
            set: function(value) {
                this.m_presetted_min_filter = value;
            }
        });
    },

    release: function() {
        gl.deleteTexture(this.m_handler);
    },

    methods: {

        on_transfering_data_serialized: function(data) {
            switch (data.type) {
                case gb.resource_transfering_data.type.texture: {
                    this.m_status = gb.resource_base.status.loaded;
                }
                break;
            }
        },

        on_transfering_data_commited: function(data) {
            switch (data.type) {
                case gb.resource_transfering_data.type.texture:
                    {
                        this.m_handler = data.handler;
                        this.m_width = data.width;
                        this.m_height = data.height;
                        this.m_status = gb.resource_base.status.commited;
                    }
                    break;
            }
        },

        bind: function() {
            if (this.status === gb.resource_base.status.commited) {
                gl.bindTexture(gl.TEXTURE_2D, this.m_handler);
                if (this.m_presseted_wrap_mode !== this.m_setted_wrap_mode) {
                    this.m_setted_wrap_mode = this.m_presseted_wrap_mode;
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.m_setted_wrap_mode);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.m_setted_wrap_mode);
                }
                if (this.m_presetted_min_filter !== this.m_setted_min_filter) {
                    this.m_setted_min_filter = this.m_presetted_min_filter;
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.m_setted_min_filter);
                }
                if (this.m_presetted_mag_filter !== this.m_setted_mag_filter) {
                    this.m_setted_mag_filter = this.m_presetted_mag_filter;
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.m_setted_mag_filter);
                }
            }
        },

        unbind: function() {
            gl.bindTexture(gl.TEXTURE_2D, null);
        },
    },

    static_methods: {
        construct: function(guid, handler, width, height) {
            var texture = new gb.texture(guid);
            texture.m_handler = handler;
            texture.m_width = width;
            texture.m_height = height;
            texture.m_status = gb.resource_base.status.commited;
            return texture;
        },
    }
});
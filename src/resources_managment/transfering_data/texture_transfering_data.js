/* global oop, gb */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "texture_transfering_data",
    extend: gb.resource_transfering_data,

    init: function() {
        this.m_type = gb.resource_transfering_data.type.texture;

        this.m_width = 0;
        this.m_height = 0;
        this.m_data = null;
        this.m_handler = -1;

        Object.defineProperty(this, 'width', {
            get: function() {
                return this.m_width;
            },
            set: function(value) {
                this.m_width = value;
            }
        });

        Object.defineProperty(this, 'height', {
            get: function() {
                return this.m_height;
            },
            set: function(value) {
                this.m_height = value;
            }
        });

        Object.defineProperty(this, 'handler', {
            get: function() {
                return this.m_handler;
            },
            set: function(value) {
                this.m_handler = value;
            }
        });

        Object.defineProperty(this, 'data', {
            get: function() {
                return this.m_data;
            },
            set: function(value) {
                this.m_data = value;
            }
        });
    },

    release: function() {

    }
});
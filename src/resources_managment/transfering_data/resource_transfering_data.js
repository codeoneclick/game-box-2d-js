/* global oop, gb */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "resource_transfering_data",
    constants: {
        type: {
            undefined: 0,
            shader: 1,
            texture: 2
        }
    },

    init: function() {
        this.m_type = gb.resource_transfering_data.type.undefined;

        Object.defineProperty(this, 'type', {
            get: function() {
                return this.m_type;
            }
        });
    },

    release: function() {

    },
});
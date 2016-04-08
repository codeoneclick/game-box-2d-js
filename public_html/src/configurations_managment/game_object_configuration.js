/* global oop, gb */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "game_object_configuration",
    extend: gb.configuration_base,

    init: function() {
        Object.defineProperty(this, 'materials_configurations', {
            get: function() {
                if (this.m_configurations instanceof Object) {
                    if (this.m_configurations.materials_configurations instanceof Object) {
                        return this.m_configurations.materials_configurations;
                    }
                }
                return null;
            }
        });
    },

    release: function() {

    },

    methods: {

    }
});
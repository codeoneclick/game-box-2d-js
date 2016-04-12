/* global oop, gb */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "texture_configuration",
    extend: gb.configuration_base,

    init: function() {
        this.json = null;

        Object.defineProperty(this, 'filename', {
            get: function() {
                return this.json.filename;
            }
        });

        Object.defineProperty(this, 'technique_name', {
            get: function() {
                return this.json.technique_name;
            }
        });

        Object.defineProperty(this, 'sampler_index', {
            get: function() {
                return this.json.sampler_index;
            }
        });

        Object.defineProperty(this, 'wrap_mode', {
            get: function() {
                return gb.configuration_base.string_to_glenum()[this.json.wrap_mode];
            }
        });

        Object.defineProperty(this, 'mag_filter', {
            get: function() {
                return gb.configuration_base.string_to_glenum()[this.json.mag_filter];
            }
        });

        Object.defineProperty(this, 'min_filter', {
            get: function() {
                return gb.configuration_base.string_to_glenum()[this.json.min_filter];
            }
        });
    },

    release: function() {

    },

    methods: {
        serialize: function(value) {
            this.json = value;
        }
    }
});
/* global oop, gb, $, console */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "ws_technique_configuration",
    extend: gb.configuration_base,

    init: function() {
        this.json = null;

        Object.defineProperty(this, 'technique_name', {
            get: function() {
                return this.json.technique_name;
            }
        });

        Object.defineProperty(this, 'num_passes', {
            get: function() {
                return this.json.num_passes;
            }
        });

        Object.defineProperty(this, 'index', {
            get: function() {
                return this.json.index;
            }
        });

        Object.defineProperty(this, 'screen_width', {
            get: function() {
                return this.json.screen_width;
            }
        });

        Object.defineProperty(this, 'screen_height', {
            get: function() {
                return this.json.screen_height;
            }
        });

        Object.defineProperty(this, 'clear_color_r', {
            get: function() {
                return this.json.clear_color_r;
            }
        });

        Object.defineProperty(this, 'clear_color_g', {
            get: function() {
                return this.json.clear_color_g;
            }
        });

        Object.defineProperty(this, 'clear_color_b', {
            get: function() {
                return this.json.clear_color_b;
            }
        });

        Object.defineProperty(this, 'clear_color_a', {
            get: function() {
                return this.json.clear_color_a;
            }
        });
    },

    release: function() {

    },

    methods: {
        serialize: function(filename, callback) {
            var self = this;
            $.ajax({
                dataType: "json",
                url: filename,
                data: {},
                async: true
            }).done(function(value) {
                self.json = value;
                console.log("loaded: " + filename);
                callback(self);
            }).fail(function() {
                console.log("can't load: " + filename);
                callback(null);
            });
        }
    }
});
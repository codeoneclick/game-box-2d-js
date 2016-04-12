/* global oop, $, console, gb */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "ss_technique_configuration",
    extend: gb.configuration_base,

    init: function() {
        this.json = null;

        Object.defineProperty(this, 'material_configuration', {
            get: function() {
                if (this.m_configurations instanceof Object) {
                    if (this.m_configurations.material_configuration instanceof Object) {
                        if (this.m_configurations.material_configuration.length > 0) {
                            return this.m_configurations.material_configuration[0];
                        }
                    }
                }
                return null;
            }
        });

        Object.defineProperty(this, 'technique_name', {
            get: function() {
                return this.json.technique_name;
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
    },

    release: function() {

    },

    methods: {
        serialize_material_configuration: function(callback) {
            var self = this;
            var configuration = new gb.material_configuration();
            configuration.serialize(self.json.material_filename, function(configuration) {
                self.set_configuration("material_configuration", configuration);
                callback();
            });
        },

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
                self.serialize_material_configuration(function() {
                    callback(self);
                });
            }).fail(function() {
                console.log("can't load: " + filename);
                callback(null);
            });
        }
    }
});
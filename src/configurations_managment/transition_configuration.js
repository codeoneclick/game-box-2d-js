/* global oop, gb, $, console */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "transition_configuration",
    extend: gb.configuration_base,

    init: function() {
        this.json = null;

        Object.defineProperty(this, 'guid', {
            get: function() {
                return this.json.guid;
            }
        });

        Object.defineProperty(this, 'main_technique_configuration', {
            get: function() {
                if (this.m_configurations instanceof Object) {
                    if (this.m_configurations.main_technique_configuration instanceof Object) {
                        if (this.m_configurations.main_technique_configuration.length > 0) {
                            return this.m_configurations.main_technique_configuration[0];
                        }
                    }
                }
                return null;
            }
        });

        Object.defineProperty(this, 'ws_techniques_configurations', {
            get: function() {
                if (this.m_configurations instanceof Object) {
                    if (this.m_configurations.ws_techniques_configurations instanceof Object) {
                        return this.m_configurations.ws_techniques_configurations;
                    }
                }
                return null;
            }
        });

        Object.defineProperty(this, 'ss_techniques_configurations', {
            get: function() {
                if (this.m_configurations instanceof Object) {
                    if (this.m_configurations.ss_techniques_configurations instanceof Object) {
                        return this.m_configurations.ss_techniques_configurations;
                    }
                }
                return null;
            }
        });
    },

    release: function() {

    },

    methods: {
        serialize_main_technique_configuration: function(callback) {
            var self = this;
            var configuration = new gb.main_technique_configuration();
            configuration.serialize(self.json.main_technique_filename, function(configuration) {
                self.set_configuration("main_technique_configuration", configuration);
                callback();
            });
        },

        serialize_ws_techniques_configurations: function(callback) {
            var self = this;
            var configurations_count = self.json.ws_techniques.length;
            if (configurations_count > 0) {

                var waiting_configurations_count = configurations_count;
                var add_ws_technique_configuration = function(configuration) {
                    self.set_configuration("ws_techniques_configurations", configuration);
                    waiting_configurations_count--;
                    if (waiting_configurations_count === 0) {
                        callback();
                    }
                };
                for (var i = 0; i < configurations_count; ++i) {
                    var configuration = new gb.ws_technique_configuration();
                    configuration.serialize(self.json.ws_techniques[i].filename, add_ws_technique_configuration);
                }
            } else {
                callback();
            }
        },

        serialize_ss_techniques_configurations: function(callback) {
            var self = this;
            var configurations_count = self.json.ss_techniques.length;
            if (configurations_count > 0) {

                var waiting_configurations_count = configurations_count;
                var add_ss_technique_configuration = function(configuration) {
                    self.set_configuration("ss_techniques_configurations", configuration);
                    waiting_configurations_count--;
                    if (waiting_configurations_count === 0) {
                        callback();
                    }
                };
                for (var i = 0; i < configurations_count; ++i) {
                    var configuration = new gb.ss_technique_configuration();
                    configuration.serialize(self.json.ss_techniques[i].filename, add_ss_technique_configuration);
                }
            } else {
                callback();
            }
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
                self.serialize_main_technique_configuration(function() {
                    self.serialize_ws_techniques_configurations(function() {
                        self.serialize_ss_techniques_configurations(function() {
                            callback(self);
                        });
                    });
                });
            }).fail(function() {
                console.log("can't load: " + filename);
                callback(null);
            });
        },
    }
});
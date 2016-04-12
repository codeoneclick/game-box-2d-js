/* global oop, $, console, gb */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "material_configuration",
    extend: gb.configuration_base,

    init: function() {
        this.json = null;

        Object.defineProperty(this, 'technique_name', {
            get: function() {
                return this.json.technique_name;
            }
        });

        Object.defineProperty(this, 'technique_pass', {
            get: function() {
                return this.json.technique_pass;
            }
        });

        Object.defineProperty(this, 'is_depth_test', {
            get: function() {
                return Boolean(this.json.is_depth_test);
            }
        });

        Object.defineProperty(this, 'is_depth_mask', {
            get: function() {
                return Boolean(this.json.is_depth_mask);
            }
        });

        Object.defineProperty(this, 'is_cull_face', {
            get: function() {
                return Boolean(this.json.is_cull_face);
            }
        });

        Object.defineProperty(this, 'cull_face_mode', {
            get: function() {
                return gb.configuration_base.string_to_glenum()[this.json.cull_face_mode];
            }
        });

        Object.defineProperty(this, 'is_blending', {
            get: function() {
                return Boolean(this.json.is_blending);
            }
        });

        Object.defineProperty(this, 'blending_function_source', {
            get: function() {
                return gb.configuration_base.string_to_glenum()[this.json.blending_function_source];
            }
        });

        Object.defineProperty(this, 'blending_function_destination', {
            get: function() {
                return gb.configuration_base.string_to_glenum()[this.json.blending_function_destination];
            }
        });

        Object.defineProperty(this, 'blending_equation', {
            get: function() {
                return gb.configuration_base.string_to_glenum()[this.json.blending_equation];
            }
        });

        Object.defineProperty(this, 'is_stencil_test', {
            get: function() {
                return Boolean(this.json.is_stencil_test);
            }
        });

        Object.defineProperty(this, 'stencil_function', {
            get: function() {
                return gb.configuration_base.string_to_glenum()[this.json.stencil_function];
            }
        });

        Object.defineProperty(this, 'stencil_function_parameter_1', {
            get: function() {
                return this.json.stencil_function_parameter_1;
            }
        });

        Object.defineProperty(this, 'stencil_function_parameter_2', {
            get: function() {
                return this.json.stencil_function_parameter_2;
            }
        });

        Object.defineProperty(this, 'stencil_mask_parameter', {
            get: function() {
                return this.json.stencil_mask_parameter;
            }
        });

        Object.defineProperty(this, 'shader_configuration', {
            get: function() {
                if (this.m_configurations instanceof Object) {
                    if (this.m_configurations.shader instanceof Object) {
                        if (this.m_configurations.shader.length > 0) {
                            return this.m_configurations.shader[0];
                        }
                    }
                }
                return null;
            }
        });

        Object.defineProperty(this, 'textures_configurations', {
            get: function() {
                if (this.m_configurations instanceof Object) {
                    if (this.m_configurations.textures instanceof Object) {
                        return this.m_configurations.textures;
                    }
                }
                return null;
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
                var configuration = new gb.shader_configuration();
                configuration.serialize(self.json.shader);
                self.set_configuration("shader", configuration);

                for (var i = 0; i < self.json.textures.length; ++i) {
                    configuration = new gb.texture_configuration();
                    configuration.serialize(self.json.textures[i]);
                    self.set_configuration("textures", configuration);
                }
                callback(self);
            }).fail(function() {
                console.log("can't load: " + filename);
                callback(null);
            });
        }
    }
});
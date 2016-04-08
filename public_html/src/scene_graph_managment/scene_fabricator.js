/* global oop, gb */
"use strict";

oop.define_class({
    namespace: "gb",
    name: "scene_fabricator",

    init: function() {
        this.m_game_objects = [];
        this.m_configurations_accessor = null;
        this.m_resources_accessor = null;

        Object.defineProperty(this, 'configurations_accessor', {
            set: function(value) {
                this.m_configurations_accessor = value;
            },

            get: function() {
                return this.m_configurations_accessor;
            }
        });

        Object.defineProperty(this, 'resources_accessor', {
            set: function(value) {
                this.m_resources_accessor = value;
            },

            get: function() {
                return this.m_resources_accessor;
            }
        });
    },

    release: function() {

    },

    methods: {
        add_materials: function(game_object, configurations) {
            for (var i = 0; i < configurations.length; ++i) {
                var material_configuration = configurations[i];
                var material = gb.material.construct(material_configuration);

                gb.material.set_shader(material, material_configuration, this.m_resources_accessor);
                gb.material.set_textures(material, material_configuration, this.m_resources_accessor);
                gb.ces_material_component.add_material(game_object, material_configuration.technique_name, material_configuration.technique_pass, material);
            }
        },

        create_sprite: function(filename, callback) {
            var sprite = new gb.sprite();
            this.m_game_objects.push(sprite);

            var self = this;
            this.m_configurations_accessor.get_sprite_configuration(filename, function(configuration) {
                self.add_materials(sprite, configuration.materials_configurations);
                if (callback) {
                    callback();
                }
            });
            return sprite;
        },

        create_light_source: function(filename, callback) {
            var light_source = new gb.light_source();
            this.m_game_objects.push(light_source);

            var self = this;
            this.m_configurations_accessor.get_sprite_configuration(filename, function(configuration) {
                self.add_materials(light_source, configuration.materials_configurations);
                if (callback) {
                    callback();
                }
            });
            return light_source;
        }
    },

    static_methods: {

    }
});
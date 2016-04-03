/* global gb */

"use strict";

gb.scene_fabricator = function() {
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
};

gb.scene_fabricator.prototype = {
    constructor: gb.scene_fabricator,

    add_materials: function(game_object, configurations) {
        for (var i = 0; i < configurations.length; ++i) {
            var material_configuration = configurations[i];
            var material = gb.material.construct(material_configuration);

            gb.material.set_shader(material, material_configuration, this.m_resource_accessor);
            gb.material.set_textures(material, material_configuration, this.m_resource_accessor);
            gb.ces_material_component.add_material(game_object, material_configuration.technique_name,
                material_configuration.technique_pass, material);
        }
    },

    create_sprite: function(filename) {
        var sprite = new gb.sprite();
        this.m_game_objects_container.insert(sprite);

        var self = this;
        this.m_configuration_accessor.get_sprite_configuration(filename, function(configuration) {
            self.add_materials(sprite, configuration.materials_configurations);
        });
        return sprite;
    }
};
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
        },

        create_grid: function(filename, num_rows, num_columns, rows_gap, columns_gap, callback) {
            var grid = new gb.grid();
            this.m_game_objects.push(grid);

            var geometry_component = grid.get_component(gb.ces_base_component.type.geometry);
            geometry_component.mesh = gb.mesh_constructor.create_grid(num_rows, num_columns, rows_gap, columns_gap);

            var bound = grid.bound;  
            var vertices = [];
            vertices.push(new gb.vec2(bound.x, bound.y));
            vertices.push(new gb.vec2(bound.z, bound.y));
            vertices.push(new gb.vec2(bound.z, bound.w));
            vertices.push(new gb.vec2(bound.x, bound.w));

            var convex_hull_component = new gb.ces_convex_hull_component();
            convex_hull_component.generate_convex_hull(vertices);
            grid.add_component(convex_hull_component);

            var self = this;
            this.m_configurations_accessor.get_sprite_configuration(filename, function(configuration) {
                self.add_materials(grid, configuration.materials_configurations);
                if (callback) {
                    callback();
                }
            });
            return grid;
        }
    },

    static_methods: {

    }
});
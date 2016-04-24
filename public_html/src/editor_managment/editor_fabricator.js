/* global oop, gb */
"use strict";

oop.define_class({
	namespace: "gb",
	name: "editor_fabricator",

	init: function() {
		this.m_scene_fabricator = null;
		Object.defineProperty(this, 'scene_fabricator', {
			get: function() {
				return this.m_scene_fabricator;
			},
			set: function(value) {
				this.m_scene_fabricator = value;
			}
		});
	},

	release: function() {

	},

	methods: {
		create_selector: function() {
			var selector = new gb.selector();
			var bounding_quad = this.m_scene_fabricator.create_sprite("data/resources/configurations/game_objects/selector.json", function() {
                var material_component = bounding_quad.get_component(gb.ces_base_component.type.material);
                material_component.set_custom_shader_uniform(new gb.vec4(0, 1, 0, 0.25), "u_color");
            });
            selector.bounding_quad = bounding_quad;

            var center_selector = this.m_scene_fabricator.create_sprite("data/resources/configurations/game_objects/selector.json", function() {
                var material_component = center_selector.get_component(gb.ces_base_component.type.material);
                material_component.set_custom_shader_uniform(new gb.vec4(0, 1, 0, 0.5), "u_color");

                var geometry_component = new gb.ces_geometry_freeform_component();
				geometry_component.mesh = gb.mesh_constructor.create_circle();
				center_selector.add_component(geometry_component);
				center_selector.size = new gb.vec2(8);
            });
			selector.center_selector = center_selector;

			var left_top_selector = this.m_scene_fabricator.create_sprite("data/resources/configurations/game_objects/selector.json", function() {
                var material_component = left_top_selector.get_component(gb.ces_base_component.type.material);
                material_component.set_custom_shader_uniform(new gb.vec4(0, 1, 0, 0.5), "u_color");

                var geometry_component = new gb.ces_geometry_freeform_component();
				geometry_component.mesh = gb.mesh_constructor.create_circle();
				left_top_selector.add_component(geometry_component);
				left_top_selector.size = new gb.vec2(8);
            });
			selector.set_corner_selector(left_top_selector, gb.selector.corner_type.left_top);

			var right_top_selector = this.m_scene_fabricator.create_sprite("data/resources/configurations/game_objects/selector.json", function() {
                var material_component = right_top_selector.get_component(gb.ces_base_component.type.material);
                material_component.set_custom_shader_uniform(new gb.vec4(0, 1, 0, 0.5), "u_color");

                var geometry_component = new gb.ces_geometry_freeform_component();
				geometry_component.mesh = gb.mesh_constructor.create_circle();
				right_top_selector.add_component(geometry_component);
				right_top_selector.size = new gb.vec2(8);
            });
			selector.set_corner_selector(right_top_selector, gb.selector.corner_type.right_top);

			var left_bottom_selector = this.m_scene_fabricator.create_sprite("data/resources/configurations/game_objects/selector.json", function() {
                var material_component = left_bottom_selector.get_component(gb.ces_base_component.type.material);
                material_component.set_custom_shader_uniform(new gb.vec4(0, 1, 0, 0.5), "u_color");

                var geometry_component = new gb.ces_geometry_freeform_component();
				geometry_component.mesh = gb.mesh_constructor.create_circle();
				left_bottom_selector.add_component(geometry_component);
				left_bottom_selector.size = new gb.vec2(8);
            });
			selector.set_corner_selector(left_bottom_selector, gb.selector.corner_type.left_bottom);

			var right_bottom_selector = this.m_scene_fabricator.create_sprite("data/resources/configurations/game_objects/selector.json", function() {
                var material_component = right_bottom_selector.get_component(gb.ces_base_component.type.material);
                material_component.set_custom_shader_uniform(new gb.vec4(0, 1, 0, 0.5), "u_color");

                var geometry_component = new gb.ces_geometry_freeform_component();
				geometry_component.mesh = gb.mesh_constructor.create_circle();
				right_bottom_selector.add_component(geometry_component);
				right_bottom_selector.size = new gb.vec2(8);
            });
			selector.set_corner_selector(right_bottom_selector, gb.selector.corner_type.right_bottom);

			return selector;
		}
	},

	static_methods: {

	}
});
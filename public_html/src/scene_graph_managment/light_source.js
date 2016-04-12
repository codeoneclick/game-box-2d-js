/* global oop, gb */
"use strict";

oop.define_class({
	namespace: "gb",
	name: "light_source",
	extend: gb.game_object,
	constants: {
		radius_uniform: "u_radius",
		center_uniform: "u_center",
		color_uniform: "u_color"
	},

	init: function() {
		var material_component = new gb.ces_material_component();
		this.add_component(material_component);

		var geometry_component = new gb.ces_geometry_freeform_component();
		geometry_component.mesh = gb.mesh_constructor.create_circle();
		this.add_component(geometry_component);

		var light_component = new gb.ces_light_component();
		this.add_component(light_component);

		var light_mask_component = new gb.ces_light_mask_component();
		this.add_component(light_mask_component);

		this.m_radius = 1.0;
		this.m_color = new gb.vec4(0.0);

		Object.defineProperty(this, 'radius', {
			get: function() {

				return this.m_radius;
			},
			set: function(value) {
				this.m_radius = value;
				this.get_component(gb.ces_base_component.type.transformation).scale = new gb.vec2(this.m_radius);
				this.get_component(gb.ces_base_component.type.material).set_custom_shader_uniform(this.m_radius, gb.light_source.radius_uniform);
			}
		});

		Object.defineProperty(this, 'color', {
			get: function() {
				return this.m_color;
			},
			set: function(value) {
				this.m_color = value;
				this.get_component(gb.ces_base_component.type.material).set_custom_shader_uniform(this.m_color, gb.light_source.color_uniform);
			}
		});
	},

	release: function() {

	},

	methods: {

	},

	static_methods: {

	}
});
/* global oop, gb */
"use strict";

oop.define_class({
	namespace: "gb",
	name: "grid",
	extend: gb.game_object,
	constants: {
		color_uniform: "u_color"
	},

	init: function() {
		var material_component = new gb.ces_material_component();
		this.add_component(material_component);

		var geometry_component = new gb.ces_geometry_freeform_component();
		this.add_component(geometry_component);

		this.m_color = new gb.vec4(0.0, 1.0, 0.0, 1.0);
		Object.defineProperty(this, 'color', {
			get: function() {
				return this.m_color;
			},
			set: function(value) {
				this.m_color = value;
				this.get_component(gb.ces_base_component.type.material).set_custom_shader_uniform(this.m_color, gb.grid.color_uniform);
			}
		});

		Object.defineProperty(this, 'bound', {
			configurable: true,
			get: function() {

				this.m_bound.x = 0;
				this.m_bound.y = 0;
				this.m_bound.z = 0;
				this.m_bound.w = 0;

				var geometry_component = this.get_component(gb.ces_base_component.type.geometry);
				if(geometry_component.mesh)
				{
					var transformation_component = this.get_component(gb.ces_base_component.type.transformation);
					var min_bound = gb.mat4.multiply_vec2(geometry_component.mesh.vbo.min_bound, transformation_component.matrix_m);
					var max_bound = gb.mat4.multiply_vec2(geometry_component.mesh.vbo.max_bound, transformation_component.matrix_m);
					min_bound.sub(transformation_component.position);
					max_bound.sub(transformation_component.position);

					this.m_bound.x = min_bound.x;
					this.m_bound.y = min_bound.y;
					this.m_bound.z = max_bound.x;
					this.m_bound.w = max_bound.y;
				}
				return this.m_bound;
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
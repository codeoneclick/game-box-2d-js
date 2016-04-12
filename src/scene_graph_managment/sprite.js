/* global oop, gb */
"use strict";

oop.define_class({
	namespace: "gb",
	name: "sprite",
	extend: gb.game_object,

	init: function() {
		var material_component = new gb.ces_material_component();
		this.add_component(material_component);

		var geometry_component = new gb.ces_geometry_quad_component();
		this.add_component(geometry_component);

		Object.defineProperty(this, 'size', {
			get: function() {
				var geometry_component = this.get_component(gb.ces_base_component.type.geometry);
				return geometry_component.size;
			},
			set: function(value) {
				var geometry_component = this.get_component(gb.ces_base_component.type.geometry);
				geometry_component.size = value;
			}
		});

		Object.defineProperty(this, 'pivot', {
			get: function() {
				var geometry_component = this.get_component(gb.ces_base_component.type.geometry);
				return geometry_component.pivot;
			},
			set: function(value) {
				var geometry_component = this.get_component(gb.ces_base_component.type.geometry);
				geometry_component.pivot = value;
			}
		});

		Object.defineProperty(this, 'cast_shadow', {
			get: function() {
				return this.is_component_exist(gb.ces_base_component.type.convex_hull);
			},
			set: function(value) {
				if (value) {
					var geometry_component = this.get_component(gb.ces_base_component.type.geometry);
					var convex_hull_component = new gb.ces_convex_hull_component();
					convex_hull_component.generate_convex_hull(geometry_component.mesh.vbo.lock());
					this.add_component(convex_hull_component);
				} else {
					this.remove_component(gb.ces_base_component.type.convex_hull);
				}
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
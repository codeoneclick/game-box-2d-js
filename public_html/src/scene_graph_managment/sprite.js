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
			if(value)
			{
				var geometry_component = this.get_component(gb.ces_base_component.type.geometry);
				var convex_hull_component = new gb.ces_convex_hull_component();
				convex_hull_component.update_convex_hull(geometry_component.mesh.vbo.lock());
				this.add_component(convex_hull_component);
			}
			else
			{
				this.remove_component(gb.ces_base_component.type.convex_hull);
			}
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
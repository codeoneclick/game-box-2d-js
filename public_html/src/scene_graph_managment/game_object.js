/* global oop, gb */
"use strict";

oop.define_class({
	namespace: "gb",
	name: "game_object",
	extend: gb.ces_entity,

	init: function() {
		var transformation_component = new gb.ces_transformation_component();
		this.add_component(transformation_component);

		Object.defineProperty(this, 'position', {
			configurable: true,
			set: function(value) {
				this.get_component(gb.ces_base_component.type.transformation).position = value;
			},
			get: function() {
				return this.get_component(gb.ces_base_component.type.transformation).position;
			}
		});

		Object.defineProperty(this, 'rotation', {
			set: function(value) {
				this.get_component(gb.ces_base_component.type.transformation).rotation = value;
			},
			get: function() {
				return this.get_component(gb.ces_base_component.type.transformation).rotation;
			}
		});

		Object.defineProperty(this, 'scale', {
			set: function(value) {
				this.get_component(gb.ces_base_component.type.transformation).scale = value;
			},
			get: function() {
				return this.get_component(gb.ces_base_component.type.transformation).scale;
			}
		});

		Object.defineProperty(this, 'size', {
			configurable: true,
			set: function(value) {
				this.get_component(gb.ces_base_component.type.transformation).scale = value;
			},
			get: function() {
				return this.get_component(gb.ces_base_component.type.transformation).scale;
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
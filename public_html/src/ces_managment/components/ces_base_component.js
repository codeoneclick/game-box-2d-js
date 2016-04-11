/* global oop, gb */

"use strict";

oop.define_class({
	namespace: "gb",
	name: "ces_base_component",
	constants: {
		type: {
			undefined: -1,
			transformation: 0,
			material: 1,
			geometry: 2,
			scene: 3,
			light: 4,
			light_mask: 5,
			convex_hull: 6,
			max: 7
		}
	},

	init: function() {
		this.m_type = gb.ces_base_component.undefined;

		Object.defineProperty(this, 'type', {
			get: function() {
				return this.m_type;
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
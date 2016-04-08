/* global oop, gb */

"use strict";

oop.define_class({
	namespace: "gb",
	name: "ces_geometry_component",
	extend: gb.ces_base_component,

	init: function() {

		this.m_type = gb.ces_base_component.type.geometry;
		this.m_mesh = null;

		Object.defineProperty(this, 'mesh', {
			configurable: true,
			get: function() {
				return this.m_mesh;
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
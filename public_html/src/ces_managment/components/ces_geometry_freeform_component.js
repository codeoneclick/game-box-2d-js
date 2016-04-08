/* global oop, gb */
"use strict";

oop.define_class({
	namespace: "gb",
	name: "ces_geometry_freeform_component",
	extend: gb.ces_geometry_component,

	init: function() {

		Object.defineProperty(this, 'mesh', {
			get: function() {
				return this.m_mesh;
			},
			set: function(value) {
				this.m_mesh = value;
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
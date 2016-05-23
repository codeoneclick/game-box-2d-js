/* global oop, gb */

"use strict";

oop.define_class({
	namespace: "gb",
	name: "ces_geometry_component",
	extend: gb.ces_base_component,

	init: function() {

		this.m_type = gb.ces_base_component.type.geometry;
		this.m_mesh = null;

		this.m_size = new gb.vec2(0.0);
		this.m_pivot = new gb.vec2(0.0);

		Object.defineProperty(this, 'pivot', {
			configurable: true,
			get: function() {
				return this.m_pivot;
			},
			set: function(value) {
				this.m_pivot = value;
			}
		});

		Object.defineProperty(this, 'size', {
			configurable: true,
			get: function() {
				return this.m_size;
			},
			set: function(value) {
				this.m_size = value;
			}
		});

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
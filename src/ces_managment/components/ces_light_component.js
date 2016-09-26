/* global oop, gb */

"use strict";

oop.define_class({
	namespace: "gb",
	name: "ces_light_component",
	extend: gb.ces_base_component,

	init: function() {

		this.m_type = gb.ces_base_component.type.light;
		this.m_shadow_casters = [];

		Object.defineProperty(this, 'shadow_casters', {
			get: function() {
				return this.m_shadow_casters;
			}
		});
	},

	release: function() {

	},

	methods: {
		add_shadow_caster: function(shadow_caster) {
			this.m_shadow_casters.push(shadow_caster);
		},
		cleanup: function() {
			this.m_shadow_casters = [];
		}
	},

	static_methods: {

	}
});
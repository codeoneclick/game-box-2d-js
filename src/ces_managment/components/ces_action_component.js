/* global oop, gb */

"use strict";

oop.define_class({
	namespace: "gb",
	name: "ces_action_component",
	extend: gb.ces_base_component,

	init: function() {
		this.m_type = gb.ces_base_component.type.action;
		this.m_action = null;

		Object.defineProperty(this, 'action', {
			get: function() {
				return this.m_action;
			},
			set: function(value) {
				this.m_action = value;
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
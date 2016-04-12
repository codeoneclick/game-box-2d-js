/* global oop, gb */

"use strict";

oop.define_class({
	namespace: "gb",
	name: "shader_configuration",
	extend: gb.configuration_base,

	init: function() {
		this.json = null;

		Object.defineProperty(this, 'filename', {
			get: function() {
				return this.json.filename;
			}
		});
	},

	release: function() {

	},

	methods: {
		serialize: function(value) {
			this.json = value;
		}
	}
});
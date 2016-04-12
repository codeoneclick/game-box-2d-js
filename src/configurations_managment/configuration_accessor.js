/* global oop, gb */

"use strict";

oop.define_class({
	namespace: "gb",
	name: "configuration_accessor",

	init: function() {

	},

	release: function() {

	},

	methods: {
		get_transition_configuration: function(filename, callback) {
			var configuration = new gb.transition_configuration();
			configuration.serialize(filename, function(configuration) {
				callback(configuration);
			});
		},

		get_sprite_configuration: function(filename, callback) {
			var configuration = new gb.sprite_configuration();
			configuration.serialize(filename, function(configuration) {
				callback(configuration);
			});
		}
	},

	static_methods: {

	}
});
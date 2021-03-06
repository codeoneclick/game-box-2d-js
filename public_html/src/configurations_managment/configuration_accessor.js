/* global gb */

"use strict";

gb.configuration_accessor = function() {

};

gb.configuration_accessor.prototype = {
	constructor: gb.configuration_accessor,

	get_transition_configuration: function(filename, callback) {
		var transition_configuration = new gb.transition_configuration();
		transition_configuration.serialize(filename, function(configuration) {
			callback(configuration);
		});
	},

	get_sprite_configuration: function(filename, callback) {
		var sprite_configuration = new gb.sprite_configuration();
		sprite_configuration.serialize(filename, function(configuration) {
			callback(configuration);
		});
	}
};
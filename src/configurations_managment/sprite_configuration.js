/* global gb, $ */

"use strict";

gb.sprite_configuration = function() {
	gb.game_object_configuration.call(this);
};

gb.sprite_configuration.prototype = Object.create(gb.game_object_configuration.prototype);
gb.sprite_configuration.prototype.constructor = gb.sprite_configuration;

gb.sprite_configuration.prototype.serialize = function(filename, callback) {
	var self = this;
	$.ajax({
		dataType: "json",
		url: filename,
		data: {},
		async: true
	}).done(function(value) {
		self.json = value;
		console.log("loaded: " + filename);
		var configurations_count = self.json.materials.length;
		if (configurations_count > 0) {
			var waiting_configurations_count = configurations_count;
			for (var i = 0; i < configurations_count; ++i) {
				var material_configuration = new gb.material_configuration();
				material_configuration.serialize(self.json.materials[i].filename, function(configuration) {
					self.set_configuration("materials_configurations", configuration);
					waiting_configurations_count--;
					if (waiting_configurations_count === 0) {
						callback(self);
					}
				});
			}
		} else {
			callback(self);
		}
	}).fail(function() {
		console.log("can't load: " + filename);
		callback(null);
	});
};
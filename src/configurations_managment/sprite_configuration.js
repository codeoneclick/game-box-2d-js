/* global oop, $, console, gb */

"use strict";

oop.define_class({
	namespace: "gb",
	name: "sprite_configuration",
	extend: gb.game_object_configuration,

	init: function() {

	},

	release: function() {

	},

	methods: {
		serialize: function(filename, callback) {
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
					var add_material_configuration = function(configuration) {
						self.set_configuration("materials_configurations", configuration);
						waiting_configurations_count--;
						if (waiting_configurations_count === 0) {
							callback(self);
						}
					};
					for (var i = 0; i < configurations_count; ++i) {
						var configuration = new gb.material_configuration();
						configuration.serialize(self.json.materials[i].filename, add_material_configuration);
					}
				} else {
					callback(self);
				}
			}).fail(function() {
				console.log("can't load: " + filename);
				callback(null);
			});
		}
	}
});
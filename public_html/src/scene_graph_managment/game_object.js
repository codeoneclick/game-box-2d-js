/* global gb */

"use strict";

gb.game_object = function() {
	gb.ces_entity.call(this);

	var transformation_component = new gb.ces_transformation_component();
	this.add_component(transformation_component);

	Object.defineProperty(this, 'position', {
		set: function(value) {
			this.get_component(gb.ces_component_type.transformation).position = value;
		},
		get: function() {
			return this.get_component(gb.ces_component_type.transformation).position;
		}
	});

	Object.defineProperty(this, 'rotation', {
		set: function(value) {
			this.get_component(gb.ces_component_type.transformation).rotation = value;
		},
		get: function() {
			return this.get_component(gb.ces_component_type.transformation).rotation;
		}
	});

	Object.defineProperty(this, 'scale', {
		set: function(value) {
			this.get_component(gb.ces_component_type.transformation).scale = value;
		},
		get: function() {
			return this.get_component(gb.ces_component_type.transformation).scale;
		}
	});

	Object.defineProperty(this, 'size', {
		set: function(value) {
			this.get_component(gb.ces_component_type.transformation).scale = value;
		},
		get: function() {
			return this.get_component(gb.ces_component_type.transformation).scale;
		}
	});
};

gb.game_object.prototype = Object.create(gb.ces_entity.prototype);
gb.game_object.prototype.constructor = gb.game_object;
/* global gb */

"use strict";

gb.sprite = function() {
	gb.game_object.call(this);

	var material_component = new gb.ces_material_component();
	this.add_component(material_component);

	var geometry_component = new gb.ces_geometry_component();
	this.add_component(geometry_component);
};

gb.sprite.prototype = Object.create(gb.game_object.prototype);
gb.sprite.prototype.constructor = gb.sprite;
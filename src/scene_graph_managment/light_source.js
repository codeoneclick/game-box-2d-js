/* global gb */

"use strict";

gb.light_source = function() {
	gb.game_object.call(this);

	var material_component = new gb.ces_material_component();
	this.add_component(material_component);

	var geometry_component = new gb.ces_geometry_freeform_component();
	geometry_component.mesh = gb.mesh_constructor.create_circle();
	this.add_component(geometry_component);

	var light_component = new gb.ces_light_component();
	this.add_component(light_component);

	var light_mask_component = new gb.ces_light_mask_component();
	this.add_component(light_mask_component);

	this.m_radius = 1.0;
	this.m_color = new gb.vec4(0.0);

	Object.defineProperty(this, 'radius', {
		get: function() {
			
			return this.m_radius;
		},
		set: function(value) {
			this.m_radius = value;
			this.get_component(gb.ces_component_type.transformation).scale = new gb.vec2(value);
		}
	});

	Object.defineProperty(this, 'color', {
		get: function() {
			return this.m_color;
		},
		set: function(value) {
			this.m_color = value;
		}
	});
};
gb.light_source.prototype = Object.create(gb.game_object.prototype);
gb.light_source.prototype.constructor = gb.light_source;
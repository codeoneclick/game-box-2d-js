/* global gb */

"use strict";

gb.ces_geometry_freeform_component = function() {
	gb.ces_geometry_component.call(this);

	Object.defineProperty(this, 'mesh', {
		get: function() {
			return this.m_mesh;
		},
		set: function(value) {
			this.m_mesh = value;
		}
	});
};

gb.ces_geometry_freeform_component.prototype = Object.create(gb.ces_geometry_component.prototype);
gb.ces_geometry_freeform_component.prototype.constructor = gb.ces_geometry_freeform_component;
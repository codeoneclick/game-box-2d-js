/* global gb */

gb.ces_component_type = {
	undefined: -1,
	transformation: 0,
	material: 1,
	geometry: 2,
	scene: 3,
	max: 4
};

gb.ces_base_component = function() {

	this.m_type = gb.ces_component_type.undefined;

	Object.defineProperty(this, 'type', {
		get: function() {
			return this.m_type;
		}
	});
};

gb.ces_base_component.prototype = {
	constructor: gb.ces_base_component
};
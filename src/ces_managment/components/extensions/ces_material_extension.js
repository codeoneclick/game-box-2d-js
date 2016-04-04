/* global gb */

"use strict";

gb.ces_material_component.add_material = function(entity, technique_name, technique_pass, material) {
	var material_component = entity.get_component(gb.ces_component_type.material);
	if (material_component) {
		material_component.add_material(technique_name, technique_pass, material);
	}
};

gb.ces_material_component.remove_material = function(entity, technique_name, technique_pass) {
	var material_component = entity.get_component(gb.ces_component_type.material);
	if (material_component) {
		material_component.remove_material(technique_name, technique_pass);
	}
};

gb.ces_material_component.get_material = function(entity, technique_name, technique_pass) {
	var material = null;
	var material_component = entity.get_component(gb.ces_component_type.material);
	if (material_component) {
		material = material_component.get_material(technique_name, technique_pass);
	}
	return material;
};
/* global gb */

"use strict";

gb.ces_material_component = function() {
    gb.ces_base_component.call(this);

    this.m_type = gb.ces_component_type.material;
    this.m_materials = [];
};

gb.ces_material_component.prototype = Object.create(gb.ces_base_component.prototype);
gb.ces_material_component.prototype.constructor = gb.ces_material_component;

gb.ces_material_component.prototype.add_material = function(technique_name, technique_pass, material) {
    if (typeof this.m_materials[technique_name] === 'undefined') {
        this.m_materials[technique_name] = [];
    }
    this.m_materials[technique_name][technique_pass] = material;
};

gb.ces_material_component.prototype.remove_material = function(technique_name, technique_pass) {
    if (typeof this.m_materials[technique_name] !== 'undefined' && this.m_materials[technique_name].length > technique_pass) {
        this.m_materials[technique_name].splice(technique_pass, 1);
    }
};

gb.ces_material_component.prototype.get_material = function(technique_name, technique_pass) {
    var material = null;
    if (typeof this.m_materials[technique_name] !== 'undefined' && this.m_materials[technique_name].length > technique_pass) {
        material = this.m_materials[technique_name][technique_pass];
    }
    return material;
};

gb.ces_material_component.prototype.bind = function(technique_name, technique_pass, material) {
    var using_material = material;
    if (typeof material === 'undefined') {
        using_material = this.get_material(technique_name, technique_pass);
    }
    using_material.bind();
};

gb.ces_material_component.prototype.unbind = function(technique_name, technique_pass, material) {
    var using_material = material;
    if (typeof material === 'undefined') {
        using_material = this.get_material(technique_name, technique_pass);
    }
    using_material.unbind();
};
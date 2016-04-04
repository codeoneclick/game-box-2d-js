/* global gb */

"use strict";

gb.ces_light_component = function() {
    gb.ces_base_component.call(this);

    this.m_type = gb.ces_component_type.light;
    this.m_shadow_casters = [];

    Object.defineProperty(this, 'shadow_casters', {
        get: function() {
            return this.m_shadow_casters;
        }
    });
};

gb.ces_light_component.prototype = Object.create(gb.ces_base_component.prototype);
gb.ces_light_component.prototype.constructor = gb.ces_light_component;

gb.ces_light_component.prototype.add_shadow_caster = function(shadow_caster) {
	this.m_shadow_casters.push(shadow_caster);
};

gb.ces_light_component.prototype.cleanup = function() {
	this.m_shadow_casters = [];
};
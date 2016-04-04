/* global gb */

"use strict";

gb.ces_geometry_component = function() {
    gb.ces_base_component.call(this);

    this.m_type = gb.ces_component_type.geometry;
    this.m_mesh = null;

    Object.defineProperty(this, 'mesh', {
        get: function() {
            return this.m_mesh;
        }
    });
};

gb.ces_geometry_component.prototype = Object.create(gb.ces_base_component.prototype);
gb.ces_geometry_component.prototype.constructor = gb.ces_geometry_component;
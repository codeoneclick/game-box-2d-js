/* global gb */

"use strict";

gb.ces_scene_component = function() {
    gb.ces_base_component.call(this);

    this.m_type = gb.ces_component_type.scene;
    this.m_scene = null;

    Object.defineProperty(this, 'scene', {
    	set: function(value) {
            this.m_scene = value;
        },
        get: function() {
            return this.m_scene;
        }
    });

    Object.defineProperty(this, 'camera', {
        get: function() {
            return this.m_scene.camera;
        }
    });
};

gb.ces_scene_component.prototype = Object.create(gb.ces_base_component.prototype);
gb.ces_scene_component.prototype.constructor = gb.ces_scene_component;
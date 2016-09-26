/* global oop, gb */
"use strict";

oop.define_class({
    namespace: "gb",
    name: "ces_scene_component",
    extend: gb.ces_base_component,

    init: function() {

        this.m_type = gb.ces_base_component.type.scene;
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

    },

    release: function() {

    },

    methods: {

    },

    static_methods: {

    }
});
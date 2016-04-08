/* global oop, gb */
"use strict";

oop.define_class({
	namespace: "gb",
	name: "scene_graph",
	extend: gb.ces_entity,

	init: function(transition) {
		this.m_camera = null;
		this.m_fabricator = null;
		this.m_transition = transition;

		var transformation_component = new gb.ces_transformation_component();
		this.add_component(transformation_component);
		var scene_component = new gb.ces_scene_component();
		scene_component.scene = this;
		this.add_component(scene_component);

		Object.defineProperty(this, 'camera', {
			set: function(value) {
				this.m_camera = value;
			},
			get: function() {
				return this.m_camera;
			}
		});

		Object.defineProperty(this, 'fabricator', {
			set: function(value) {
				this.m_fabricator = value;
			},
			get: function() {
				return this.m_fabricator;
			}
		});

		Object.defineProperty(this, 'transition', {
			get: function() {
				return this.m_transition;
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
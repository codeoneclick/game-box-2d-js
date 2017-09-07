/* global gb */

"use strict";

gb.scene_graph = function(transition) {
	gb.ces_entity.call(this);

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
};

gb.scene_graph.prototype = Object.create(gb.ces_entity.prototype);
gb.scene_graph.prototype.constructor = gb.scene_graph;
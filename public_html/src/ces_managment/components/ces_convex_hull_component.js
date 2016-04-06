/* global gb */

"use strict";

gb.ces_convex_hull_component = function() {
	gb.ces_base_component.call(this);

	this.m_type = gb.ces_component_type.convex_hull;
	this.m_center = new gb.vec2(0.0);
	this.m_oriented_vertices = [];

	Object.defineProperty(this, 'center', {
		get: function() {
			return this.m_center;
		}
	});

	Object.defineProperty(this, 'oriented_vertices', {
		get: function() {
			return this.m_oriented_vertices;
		}
	});
};

gb.ces_convex_hull_component.prototype = Object.create(gb.ces_base_component.prototype);
gb.ces_convex_hull_component.prototype.constructor = gb.ces_convex_hull_component;

gb.ces_convex_hull_component.prototype.update_convex_hull = function(vertices) {
	if (vertices.length < 3) {
		return;
	}

	var leftmost_point_index = 0;

	for (var i = 0; i < vertices.length; ++i) {
		if (vertices[i].m_position.x < vertices[leftmost_point_index].m_position.x) {
			leftmost_point_index = i;
		}
		this.m_oriented_vertices.push(vertices[i].m_position);
	}

	var start_point_index = leftmost_point_index, end_point_index;
	do {
		end_point_index = (start_point_index + 1) % vertices.length;

		for (var i = 0; i < vertices.length; ++i) {
			if (gb.math.orientation(vertices[start_point_index].m_position, vertices[i].m_position, vertices[end_point_index].m_position) === gb.vertices_orientation.counterclockwise) {
				end_point_index = i;
			}
		}
		this.m_oriented_vertices.push(vertices[end_point_index].m_position);
		start_point_index = end_point_index;
	}
	while (start_point_index !== leftmost_point_index);

	var min_bound = new gb.vec2(INT16_MAX);
	var max_bound = new gb.vec2(INT16_MIN);

	for (var i = 0; i < this.m_oriented_vertices.length; ++i) {
		min_bound = gb.vec2.min(this.m_oriented_vertices[i], min_bound);
		max_bound = gb.vec2.max(this.m_oriented_vertices[i], max_bound);
	}
	this.m_center = gb.vec2.sub(max_bound, min_bound).divide_scalar(2.0);
};
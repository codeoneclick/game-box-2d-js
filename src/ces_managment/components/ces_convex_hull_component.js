/* global oop, gb */

"use strict";

oop.define_class({
	namespace: "gb",
	name: "ces_convex_hull_component",
	extend: gb.ces_base_component,

	init: function() {
		this.m_type = gb.ces_base_component.type.convex_hull;
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
	},

	release: function() {

	},

	methods: {
		generate_convex_hull: function(vertices) {
			if (vertices.length < 3) {
				return;
			}
			this.m_oriented_vertices = [];
			var leftmost_point_index = 0;

			for (var i = 0; i < vertices.length; ++i) {
				if (vertices[i].x < vertices[leftmost_point_index].x) {
					leftmost_point_index = i;
				}
			}

			var start_point_index = leftmost_point_index, end_point_index;
			do {
				end_point_index = (start_point_index + 1) % vertices.length;

				for (var i = 0; i < vertices.length; ++i) {
					if (gb.math.point_orientation(vertices[start_point_index], vertices[i], vertices[end_point_index]) === gb.math.orientation.counterclockwise) {
						end_point_index = i;
					}
				}
				this.m_oriented_vertices.push(vertices[end_point_index]);
				start_point_index = end_point_index;
			}
			while (start_point_index !== leftmost_point_index);

			var min_bound = new gb.vec2(gb.math.INT16_MAX);
			var max_bound = new gb.vec2(gb.math.INT16_MIN);

			for (var i = 0; i < this.m_oriented_vertices.length; ++i) {
				min_bound = gb.vec2.min(this.m_oriented_vertices[i], min_bound);
				max_bound = gb.vec2.max(this.m_oriented_vertices[i], max_bound);
			}
			this.m_center = gb.vec2.sub(max_bound, min_bound).divide_scalar(2.0);
		}
	},

	static_methods: {

	}
});
/* global oop, gb */

"use strict";

oop.define_class({
	namespace: "gb",
	name: "math",

	constants: {
		INT16_MAX: 32767,
		INT16_MIN: -32768,

		orientation: {
			colinear: 0,
			clockwise: 1,
			counterclockwise: 2
		}
	},

	init: function() {

	},

	release: function() {

	},

	methods: {

	},

	static_methods: {
		radians: function(degrees) {
			return Math.PI / 180 * degrees;
		},

		degrees: function(radians) {
			return 180 / Math.PI * radians;
		},

		is_int: function(value) {
			return Number(value) === value && value % 1 === 0;
		},

		is_float: function(value) {
			return Number(value) === value && value % 1 !== 0;
		},

		intersect: function(ray_origin, ray_direction, edge_point_01, edge_point_02) {
			var r_px = ray_origin.x;
			var r_py = ray_origin.y;
			var r_dx = ray_direction.x - ray_origin.x;
			var r_dy = ray_direction.y - ray_origin.y;

			var s_px = edge_point_01.x;
			var s_py = edge_point_01.y;
			var s_dx = edge_point_02.x - edge_point_01.x;
			var s_dy = edge_point_02.y - edge_point_01.y;

			var r_mag = Math.sqrt(r_dx * r_dx + r_dy * r_dy);
			var s_mag = Math.sqrt(s_dx * s_dx + s_dy * s_dy);

			if (r_dx / r_mag === s_dx / s_mag && r_dy / r_mag === s_dy / s_mag) {
				return {
					intersected: false
				};
			}
			var t_2 = (r_dx * (s_py - r_py) + r_dy * (r_px - s_px)) / (s_dx * r_dy - s_dy * r_dx);
			var t_1 = (s_px + s_dx * t_2 - r_px) / r_dx;

			if (t_1 < 0.0) {
				return {
					intersected: false
				};
			}

			if (t_2 < 0.0 || t_2 > 1.0) {
				return {
					intersected: false
				};
			}
			return {
				intersected: true,
				point_x: r_px + r_dx * t_1,
				point_y: r_py + r_dy * t_1,
				distance: t_1
			};
		},

		point_orientation: function(point_01, point_02, point_03) {
			var result = (point_02.y - point_01.y) * (point_03.x - point_02.x) - (point_02.x - point_01.x) * (point_03.y - point_02.y);
			if (result === 0) {
				return gb.math.orientation.colinear;
			}
			return (result > 0) ? gb.math.orientation.clockwise : gb.math.orientation.counterclockwise;
		},
	}
});
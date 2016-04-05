/* global gb */

"use strict";

var INT16_MAX = 32767;
var INT16_MIN = -32768;

gb.math = function() {

};

gb.math.radians = function(degrees) {
	return Math.PI / 180 * degrees;
};

gb.math.degrees = function(radians) {
	return 180 / Math.PI * radians;
};

gb.math.is_int = function(value) {
    return Number(value) === value && value % 1 === 0;
};

gb.math.is_float = function(value) {
    return Number(value) === value && value % 1 !== 0;
};

gb.math.intersect = function(ray_origin, ray_direction, edge_point_01, edge_point_02) {
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
		//console.log("ray origin: " + ray_origin.x + ", " + ray_origin.y + "ray direction: " + ray_direction.x + ", " + ray_direction.y);
		//console.log("not intersected");
		//console.log("point_01: " + edge_point_01.x + ", " + edge_point_01.y + "point_02: " + edge_point_02.x + ", " + edge_point_02.y);
		return {
			intersected: false
		};
	}

	var t_2 = (r_dx * (s_py - r_py) + r_dy * (r_px - s_px)) / (s_dx * r_dy - s_dy * r_dx);
	var t_1 = (s_px + s_dx * t_2 - r_px) / r_dx;

	if (t_1 < 0.0) {
		//console.log("ray origin: " + ray_origin.x + ", " + ray_origin.y + "ray direction: " + ray_direction.x + ", " + ray_direction.y);
		//console.log("not intersected");
		//console.log("point_01: " + edge_point_01.x + ", " + edge_point_01.y + "point_02: " + edge_point_02.x + ", " + edge_point_02.y);
		return {
			intersected: false
		};
	}

	if (t_2 < 0.0 || t_2 > 1.0) {
		//console.log("ray origin: " + ray_origin.x + ", " + ray_origin.y + "ray direction: " + ray_direction.x + ", " + ray_direction.y);
		//console.log("not intersected");
		//console.log("point_01: " + edge_point_01.x + ", " + edge_point_01.y + "point_02: " + edge_point_02.x + ", " + edge_point_02.y);
		return {
			intersected: false
		};
	}

	//console.log("ray origin: " + ray_origin.x + ", " + ray_origin.y + " ray direction: " + ray_direction.x + ", " + ray_direction.y);
	//console.log("intersected");
	//console.log("point_01: " + edge_point_01.x + ", " + edge_point_01.y + " point_02: " + edge_point_02.x + ", " + edge_point_02.y);
	return {
		intersected: true,
		point: new gb.vec2(r_px + r_dx * t_1, r_py + r_dy * t_1),
		distance: t_1
	};
};

gb.vertices_orientation = {
	colinear: 0,
	clockwise: 1,
	counterclockwise: 1
};

gb.math.orientation = function(point_01, point_02, point_03) {
	var result = (point_02.y - point_01.y) * (point_03.x - point_02.x) - (point_02.x - point_01.x) * (point_03.y - point_02.y);
	if (result === 0) {
		return gb.vertices_orientation.colinear;
	}
	return (result > 0) ? gb.vertices_orientation.clockwise : gb.vertices_orientation.counterclockwise;
};
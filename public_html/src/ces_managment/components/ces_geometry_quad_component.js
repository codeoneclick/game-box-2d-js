/* global gb */

"use strict";

gb.ces_geometry_quad_component = function() {
	gb.ces_geometry_component.call(this);

	this.m_mesh = gb.mesh_constructor.create_shape_quad();
	this.m_frame = new gb.vec4(0.0, 0.0, 1.0, 1.0);
	this.m_pivot = new gb.vec2(0.0);

	Object.defineProperty(this, 'pivot', {
		get: function() {
			return this.m_pivot;
		},
		set: function(value) {
			this.m_pivot = value;
			this.update_mesh_position_attributes();
		}
	});

	Object.defineProperty(this, 'size', {
		get: function() {
			return new gb.vec2(m_frame.z, m_frame.w);
		},
		set: function(value) {
			this.m_frame.z = value.x;
			this.m_frame.w = value.y;
			this.update_mesh_position_attributes();
		}
	});
};

gb.ces_geometry_quad_component.prototype = Object.create(gb.ces_geometry_component.prototype);
gb.ces_geometry_quad_component.prototype.constructor = gb.ces_geometry_quad_component;

gb.ces_geometry_quad_component.prototype.update_mesh_position_attributes = function() {
	var size = new gb.vec2(this.m_frame.z - this.m_pivot.x, this.m_frame.w - this.m_pivot.y);
	var position = new gb.vec2(size.x - this.m_frame.z, size.y - this.m_frame.w);
	var frame = new gb.vec4(position.x, size.y, size.x, position.y);

	var vertices = this.m_mesh.vbo.lock();
	vertices[0].m_position = new gb.vec2(frame.x, frame.z);
	vertices[1].m_position = new gb.vec2(frame.x, frame.w);
	vertices[2].m_position = new gb.vec2(frame.y, frame.z);
	vertices[3].m_position = new gb.vec2(frame.y, frame.w);
	this.m_mesh.vbo.unlock();
};
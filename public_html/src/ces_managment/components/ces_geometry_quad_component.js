/* global oop, gb */

"use strict";

oop.define_class({
	namespace: "gb",
	name: "ces_geometry_quad_component",
	extend: gb.ces_geometry_component,

	init: function() {

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
				return new gb.vec2(this.m_frame.z, this.m_frame.w);
			},
			set: function(value) {
				this.m_frame.w = value.x;
				this.m_frame.z = value.y;
				this.update_mesh_position_attributes();
			}
		});
	},

	release: function() {

	},

	methods: {
		update_mesh_position_attributes: function() {
			var size = new gb.vec2(this.m_frame.z - this.m_pivot.x, this.m_frame.w - this.m_pivot.y);
			var position = new gb.vec2(size.x - this.m_frame.z, size.y - this.m_frame.w);
			var frame = new gb.vec4(position.x, size.y, size.x, position.y);

			var vbo = this.m_mesh.vbo;
			vbo.write_attribute(gb.vbo.attribute.position, 0, new gb.vec2(frame.x, frame.z));
			vbo.write_attribute(gb.vbo.attribute.position, 1, new gb.vec2(frame.x, frame.w));
			vbo.write_attribute(gb.vbo.attribute.position, 2, new gb.vec2(frame.y, frame.z));
			vbo.write_attribute(gb.vbo.attribute.position, 3, new gb.vec2(frame.y, frame.w));
			vbo.submit();
		}
	},

	static_methods: {

	}
});
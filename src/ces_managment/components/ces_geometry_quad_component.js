/* global oop, gb */

"use strict";

oop.define_class({
	namespace: "gb",
	name: "ces_geometry_quad_component",
	extend: gb.ces_geometry_component,

	init: function() {

		this.m_mesh = gb.mesh_constructor.create_shape_quad();
		this.m_pivot.x = 0.5;
		this.m_pivot.y = 0.5;

		Object.defineProperty(this, 'pivot', {
			get: function() {
				return this.m_pivot;
			},
			set: function(value) {
				this.m_pivot = value;
				this.m_pivot.x = Math.max(Math.min(this.m_pivot.x, 1.0), 0.0);
				this.m_pivot.y = Math.max(Math.min(this.m_pivot.y, 1.0), 0.0);	
				this.update_mesh_position_attributes();
			}
		});

		Object.defineProperty(this, 'size', {
			get: function() {
				return this.m_size;
			},
			set: function(value) {
				this.m_size = value;
				this.update_mesh_position_attributes();
			}
		});
	},

	release: function() {

	},

	methods: {

		update_mesh_position_attributes: function() {
			var position_00 = new gb.vec2(-this.m_size.x * (1.0 - this.m_pivot.x), -this.m_size.y * (1.0 - this.m_pivot.y));
			var position_11 = new gb.vec2(this.m_size.x * this.m_pivot.x, this.m_size.y * this.m_pivot.y);
			var vbo = this.m_mesh.vbo;
			vbo.write_attribute(gb.vbo.attribute.position, 0, new gb.vec2(position_00.x, position_00.y));
			vbo.write_attribute(gb.vbo.attribute.position, 1, new gb.vec2(position_00.x, position_11.y));
			vbo.write_attribute(gb.vbo.attribute.position, 2, new gb.vec2(position_11.x, position_00.y));
			vbo.write_attribute(gb.vbo.attribute.position, 3, new gb.vec2(position_11.x, position_11.y));
			vbo.submit();
		},

		update_mesh_texcoord_attributes: function(u_0, v_0, u_1, v_1) {
			var vbo = this.m_mesh.vbo;
			vbo.write_attribute(gb.vbo.attribute.texcoord, 0, new gb.vec2(u_0, v_0));
            vbo.write_attribute(gb.vbo.attribute.texcoord, 1, new gb.vec2(u_0, v_1));
            vbo.write_attribute(gb.vbo.attribute.texcoord, 2, new gb.vec2(u_1, v_0));
            vbo.write_attribute(gb.vbo.attribute.texcoord, 3, new gb.vec2(u_1, v_1));
            vbo.submit();
		}
	},

	static_methods: {

	}
});
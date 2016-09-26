/* global oop, gb, Box2D */

"use strict";

oop.define_class({
	namespace: "gb",
	name: "ces_box2d_body_component",
	extend: gb.ces_base_component,

	init: function() {

		this.m_type = gb.ces_base_component.type.box2d_body;
		this.m_position = new gb.vec2(0.0);
		this.m_rotation = 0;
		this.m_box2d_body = null;
		this.m_box2d_definition = new Box2D.b2BodyDef();

		Object.defineProperty(this, 'position', {
			configurable: true,
			get: function() {
				return this.m_position;
			}
		});

		Object.defineProperty(this, 'rotation', {
			configurable: true,
			get: function() {
				return this.m_rotation;
			}
		});

		Object.defineProperty(this, 'box2d_definition', {
			configurable: true,
			get: function() {
				return this.m_box2d_definition;
			}
		});

		Object.defineProperty(this, 'box2d_body', {
			configurable: true,
			get: function() {
				return this.m_box2d_body;
			},
			set: function(value) {
				this.m_box2d_body = value;
			}
		});
	},

	release: function() {

	},

	methods: {
		on_position_changed: function(position) {
			this.m_position = position;
		},

		on_rotation_changed: function(rotation) {
			this.m_rotation = rotation;
		}
	},

	static_methods: {

	}
});
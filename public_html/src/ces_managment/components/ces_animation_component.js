/* global oop, gb */

"use strict";

oop.define_class({
	namespace: "gb",
	name: "ces_animation_component",
	extend: gb.ces_base_component,

	init: function() {

		this.m_type = gb.ces_base_component.type.animation;
		this.m_frames = [];
		this.m_current_animation = "";
		this.m_current_frame = 0;

		Object.defineProperty(this, 'frames', {
			get: function() {
				if(this.m_frames[this.m_current_animation]) {
					return this.m_frames[this.m_current_animation];
				} else {
					return null;
				}
			}
		});

		Object.defineProperty(this, 'current_frame', {
			get: function() {
				return this.m_current_frame;
			},
			set: function(value) {
				this.m_current_frame = value;
			}
		});

		Object.defineProperty(this, 'current_animation', {
			get: function() {
				return this.m_current_animation;
			},
			set: function(value) {
				this.m_current_animation = value;
				this.m_current_frame = 0;
			}
		});
	},

	release: function() {

	},

	methods: {

		add_animation: function(animation_name, frames) {
			this.m_frames[animation_name] = frames;
			this.current_animation = animation_name;
		}
	},

	static_methods: {

	}
});
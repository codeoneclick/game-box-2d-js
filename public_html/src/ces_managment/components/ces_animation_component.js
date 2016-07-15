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
		this.m_switch_frame_deltatime = 60 / 1000;
		this.m_current_switch_frame_deltatime = 60 / 1000;

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

		Object.defineProperty(this, 'switch_frame_deltatime', {
			get: function() {
				return this.m_switch_frame_deltatime;
			}
		});

		Object.defineProperty(this, 'current_switch_frame_deltatime', {
			get: function() {
				return this.m_current_switch_frame_deltatime;
			},
			set: function(value) {
				this.m_current_switch_frame_deltatime = value;
			}
		});
	},

	release: function() {

	},

	methods: {

		set_animations_configuration: function(animations_configuration) {
			this.m_frames = [];
			var animations = animations_configuration["animations"];
			var frames = animations_configuration["frames"];
			var animations_count = animations.length;
			for(var i = 0; i < animations_count; ++i) {
				animation = animations[i];
				var animation_name = animation.name;
				var first_frame = animation.first_frame;
				var last_frame = animation.last_frame;

				this.m_frames[animation_name] = [];
				for(var j = first_frame; j < last_frame; ++j) {
					this.m_frames[animation_name].push(frames[j]);
				}
			}
		}
	},

	static_methods: {

	}
});
/* global oop, gb */
"use strict";

oop.define_class({
	namespace: "gb",
	name: "selector",
	constants: {
		corner_type: {
			left_top: 0,
			right_top: 1,
			left_bottom: 2,
			right_bottom: 3,
			center: 4,
			max: 5
		}
	},

	init: function() {
		this.m_bounding_quad = null;
		this.m_points = [];
		this.m_target = null;
		this.m_previous_target_touch_point = null;
		this.m_previous_selector_touch_point = null;

		Object.defineProperty(this, 'bounding_quad', {
			get: function() {
				return this.m_bounding_quad;
			},
			set: function(value) {
				this.m_bounding_quad = value;
			}
		});

		Object.defineProperty(this, 'size', {
			get: function() {
				return this.m_bounding_quad.size;
			},
			set: function(value) {
				this.m_bounding_quad.size = value;
				var center = new gb.vec2(value.x / 2, value.y / 2);
				this.m_points[gb.selector.corner_type.center].position = center;

				this.m_points[gb.selector.corner_type.left_top].position = new gb.vec2(0.0 + this.m_points[gb.selector.corner_type.left_top].size.x * 0.5,
					0.0 + this.m_points[gb.selector.corner_type.left_top].size.y * 0.5);
				this.m_points[gb.selector.corner_type.right_top].position = new gb.vec2(0.0 + this.m_points[gb.selector.corner_type.right_top].size.x * 0.5,
					value.y - this.m_points[gb.selector.corner_type.right_top].size.y * 0.5);
				this.m_points[gb.selector.corner_type.left_bottom].position = new gb.vec2(value.x - this.m_points[gb.selector.corner_type.left_bottom].size.x * 0.5,
					0.0 + this.m_points[gb.selector.corner_type.left_bottom].size.y * 0.5);
				this.m_points[gb.selector.corner_type.right_bottom].position = new gb.vec2(value.x - this.m_points[gb.selector.corner_type.right_bottom].size.x * 0.5, 
					value.y - this.m_points[gb.selector.corner_type.right_bottom].size.y * 0.5);
			}
		});

		Object.defineProperty(this, 'position', {
			get: function() {
				return this.m_bounding_quad.position;
			},
			set: function(value) {
				this.m_bounding_quad.position = value;
			}
		});

		Object.defineProperty(this, 'target', {
			get: function() {
				return this.m_target;
			},
			set: function(value) {
				if (value) {
					var target_touch_recognize_component = null;
					if (this.m_target) {
						target_touch_recognize_component = this.m_target.get_component(gb.ces_base_component.type.touch_recognize);
						target_touch_recognize_component.remove_callback(gb.input_context.state.pressed, this.on_target_pressed);
						target_touch_recognize_component.remove_callback(gb.input_context.state.dragged, this.on_target_dragged);
						target_touch_recognize_component.remove_callback(gb.input_context.state.released, this.on_target_released);
					}
					this.m_target = value;
					this.m_target.remove_from_parent();
					this.m_target.position = new gb.vec2(0);
					this.m_target.rotation = 0;
					this.m_bounding_quad.add_child(this.m_target);
					this.m_bounding_quad.visible = true;

					var interactive_point = null;
					for (var i = 0; i < gb.selector.corner_type.max; ++i) {
						interactive_point = this.m_points[i];
						interactive_point.remove_from_parent();
						this.m_bounding_quad.add_child(interactive_point);
						interactive_point.visible = true;
					}

					target_touch_recognize_component = this.m_target.get_component(gb.ces_base_component.type.touch_recognize);
					target_touch_recognize_component.add_callback(gb.input_context.state.pressed, this.on_target_pressed, this);
					target_touch_recognize_component.add_callback(gb.input_context.state.released, this.on_target_released, this);
					target_touch_recognize_component.add_callback(gb.input_context.state.dragged, this.on_target_dragged, this);
				} else {
					this.m_target = null;
					this.m_bounding_quad.visible = false;
					var interactive_point = null;
					for (var i = 0; i < gb.selector.corner_type.max; ++i) {
						interactive_point = this.m_points[i];
						interactive_point.visible = false;
					}
				}
			}
		});

		Object.defineProperty(this, 'rotation', {
			get: function() {
				return this.m_bounding_quad.rotation;
			},
			set: function(value) {
				this.m_bounding_quad.rotation = value;
			}
		});

		this.m_is_align_movement = false;
		Object.defineProperty(this, 'is_align_movement', {
			get: function() {
				return this.m_is_align_movement;
			},
			set: function(value) {
				this.m_is_align_movement = value;
			}
		});

		this.m_is_proportional_resizing = false;
		Object.defineProperty(this, 'is_proportional_resizing', {
			get: function() {
				return this.m_is_proportional_resizing;
			},
			set: function(value) {
				this.m_is_proportional_resizing = value;
			}
		});

		this.m_summury_delta = new gb.vec2();
	},

	release: function() {

	},

	methods: {
		set_interactive_point: function(interactive_point, type) {
			if(this.m_points[type]) {
				this.m_points[type].remove_from_parent();
			}
			this.m_points[type] = interactive_point;
			this.m_bounding_quad.add_child(this.m_points[type]);
			interactive_point.is_touchable = true;
			var selector_touch_recognize_component = interactive_point.get_component(gb.ces_base_component.type.touch_recognize);
			selector_touch_recognize_component.add_callback(gb.input_context.state.pressed, this.on_selector_pressed, this);
            selector_touch_recognize_component.add_callback(gb.input_context.state.released, this.on_selector_released, this);
            selector_touch_recognize_component.add_callback(gb.input_context.state.dragged, this.on_selector_dragged, this);
		},

		on_selector_pressed: function(entity, state, point, userdata) {
			userdata.m_previous_selector_touch_point = point;
		},

		on_selector_released: function(entity, state, point, userdata) {
			userdata.m_previous_selector_touch_point = null;
		},

		on_selector_dragged: function(entity, state, point, userdata) {
			if(userdata.m_previous_selector_touch_point) {
				var delta = userdata.m_previous_selector_touch_point.sub(point);
				if(userdata.m_is_proportional_resizing) {
					delta.x = Math.abs(delta.x) > Math.abs(delta.y) ? delta.x : delta.y;
					delta.y = Math.abs(delta.x) > Math.abs(delta.y) ? delta.x : delta.y;
				}
				var current_position = userdata.position;
				var current_size = userdata.size;

				if (userdata.m_is_align_movement) {
					userdata.m_summury_delta.x += delta.x;
					userdata.m_summury_delta.y += delta.y;

					delta.x = 0;
					delta.y = 0;

					if (Math.abs(userdata.m_summury_delta.x) > 16) {
						var next_position_x = Math.round((userdata.position.x - userdata.m_summury_delta.x) / 32.0) * 32.0;
						delta.x = userdata.position.x - next_position_x;
						userdata.m_summury_delta.x = 0;
					}
					if (Math.abs(userdata.m_summury_delta.y) > 16) {
						var next_position_y = Math.round((userdata.position.y - userdata.m_summury_delta.y) / 32.0) * 32.0;
						delta.y = userdata.position.y - next_position_y;
						userdata.m_summury_delta.y = 0;
					}
				}

				if (entity === userdata.m_points[gb.selector.corner_type.left_top]) {
					current_size.x += delta.x;
					current_size.y += delta.y;
					current_position.x -= delta.x;
					current_position.y -= delta.y;
				} else if (entity === userdata.m_points[gb.selector.corner_type.right_top]) {
					current_size.x += delta.x;
					current_size.y -= delta.y;
					current_position.x -= delta.x;
				} else if(entity === userdata.m_points[gb.selector.corner_type.left_bottom]) {
					current_size.x -= delta.x;
					current_size.y += delta.y;
					current_position.y -= delta.y;
				} else if(entity === userdata.m_points[gb.selector.corner_type.right_bottom]) {
					current_size.x -= delta.x;
					current_size.y -= delta.y;
				}
				userdata.position = current_position;
				userdata.size = current_size;
				userdata.m_target.size = current_size;
				userdata.m_previous_selector_touch_point = new gb.vec2(point);
			}
		},

		on_target_pressed: function(entity, state, point, userdata) {
			userdata.m_previous_target_touch_point = new gb.vec2(point);
		},

		on_target_released: function(entity, state, point, userdata) {
			userdata.m_previous_target_touch_point = null;
			userdata.m_summury_delta.x = 0;
			userdata.m_summury_delta.y = 0;
		},

		on_target_dragged: function(entity, state, point, userdata) {
			if(userdata.m_previous_target_touch_point) {
				var delta = userdata.m_previous_target_touch_point.sub(point);
				if(userdata.m_is_align_movement) {
					userdata.m_summury_delta.x += delta.x;
					userdata.m_summury_delta.y += delta.y;

					delta.x = 0;
					delta.y = 0;

					if(Math.abs(userdata.m_summury_delta.x) > 16) {
						var next_position_x = Math.round((userdata.position.x - userdata.m_summury_delta.x) / 32.0) * 32.0;
						delta.x = userdata.position.x - next_position_x;
						userdata.m_summury_delta.x = 0;
					}
					if(Math.abs(userdata.m_summury_delta.y) > 16) {
						var next_position_y = Math.round((userdata.position.y - userdata.m_summury_delta.y) / 32.0) * 32.0;
						delta.y = userdata.position.y - next_position_y;
						userdata.m_summury_delta.y = 0;
					}
					userdata.position = userdata.position.sub(delta);

				} else {
					userdata.position = userdata.position.sub(delta);
				}
				userdata.m_previous_target_touch_point = new gb.vec2(point);
			}
		}
	},

	static_methods: {

	}
});
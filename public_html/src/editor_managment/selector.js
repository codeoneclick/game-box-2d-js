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
			max: 4
		}
	},

	init: function() {
		this.m_bounding_quad = null;
		this.m_corners_selectors = [];
		this.m_center_selector = null;
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

		Object.defineProperty(this, 'center_selector', {
			get: function() {
				return this.m_center_selector;
			},
			set: function(value) {
				if(this.m_center_selector) {
					this.m_center_selector.remove_from_parent();
				}
				this.m_center_selector = value;
				this.m_bounding_quad.add_child(this.m_center_selector);

				this.m_center_selector.is_touchable = true;
				var touch_recognize_component = this.m_center_selector.get_component(gb.ces_base_component.type.touch_recognize);
            	touch_recognize_component.add_callback(gb.input_context.state.dragged, this.on_selector_dragged);
			}
		});

		Object.defineProperty(this, 'size', {
			get: function() {
				return this.m_bounding_quad.size;
			},
			set: function(value) {
				this.m_bounding_quad.size = value;
				var center = new gb.vec2(value.x / 2, value.y / 2);
				this.m_center_selector.position = center;

				this.m_corners_selectors[gb.selector.corner_type.left_top].position = new gb.vec2(0.0, 0.0);
				this.m_corners_selectors[gb.selector.corner_type.right_top].position = new gb.vec2(0.0, value.x);
				this.m_corners_selectors[gb.selector.corner_type.left_bottom].position = new gb.vec2(value.y, 0.0);
				this.m_corners_selectors[gb.selector.corner_type.right_bottom].position = new gb.vec2(value.x, value.y);
			}
		});

		Object.defineProperty(this, 'position', {
			get: function() {
				return this.m_bounding_quad.position;
			},
			set: function(value) {
				this.m_bounding_quad.position = value;
				console.log("position ");
				console.log(value);
			}
		});

		Object.defineProperty(this, 'target', {
			get: function() {
				return this.m_target;
			},
			set: function(value) {
				var target_touch_recognize_component = null;
				if(this.m_target) {
					target_touch_recognize_component = this.m_target.get_component(gb.ces_base_component.type.touch_recognize);
            		target_touch_recognize_component.remove_callback(gb.input_context.state.pressed, this.on_target_pressed);
            		target_touch_recognize_component.remove_callback(gb.input_context.state.dragged, this.on_target_dragged);
            		target_touch_recognize_component.remove_callback(gb.input_context.state.released, this.on_target_released, this);
				}

				this.m_target = value;
				this.m_target.remove_from_parent();
				this.m_target.position = new gb.vec2(0);
				this.m_target.rotation = 0;
				this.m_bounding_quad.add_child(this.m_target);

				var corner_selector = null;
				for(var i = 0; i < gb.selector.corner_type.max; ++i) {
					corner_selector = this.m_corners_selectors[i];
					corner_selector.remove_from_parent();
					this.m_bounding_quad.add_child(corner_selector);
				}
				this.m_center_selector.remove_from_parent();
				this.m_bounding_quad.add_child(this.m_center_selector);

				target_touch_recognize_component = this.m_target.get_component(gb.ces_base_component.type.touch_recognize);
            	target_touch_recognize_component.add_callback(gb.input_context.state.pressed, this.on_target_pressed, this);
            	target_touch_recognize_component.add_callback(gb.input_context.state.dragged, this.on_target_dragged, this);
            	target_touch_recognize_component.add_callback(gb.input_context.state.released, this.on_target_released, this);
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
	},

	release: function() {

	},

	methods: {
		set_corner_selector: function(selector, type) {
			if(this.m_corners_selectors[type]) {
				this.m_corners_selectors[type].remove_from_parent();
			}
			this.m_corners_selectors[type] = selector;
			this.m_bounding_quad.add_child(this.m_corners_selectors[type]);
			selector.is_touchable = true;
			var touch_recognize_component = selector.get_component(gb.ces_base_component.type.touch_recognize);
            touch_recognize_component.add_callback(gb.input_context.state.dragged, this.on_selector_dragged);
		},

		on_selector_pressed: function() {

		},

		on_selector_released: function() {

		},

		on_selector_dragged: function() {
			console.log("selector dragged");
		},

		on_target_pressed: function(entity, state, point, userdata) {
			userdata.m_previous_target_touch_point = new gb.vec2(point);
		},

		on_target_released: function(entity, state, point, userdata) {
			userdata.m_previous_target_touch_point = null;
		},

		on_target_dragged: function(entity, state, point, userdata) {
			if(userdata.m_previous_target_touch_point) {
				var delta = userdata.m_previous_target_touch_point.sub(point);
				userdata.position = userdata.position.sub(delta);
				userdata.m_previous_target_touch_point = new gb.vec2(point);
			}
		}
	},

	static_methods: {

	}
});
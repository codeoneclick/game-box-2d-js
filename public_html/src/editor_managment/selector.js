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
			}
		});

		Object.defineProperty(this, 'size', {
			get: function() {
				return this.m_bounding_quad.size;
			},
			set: function(value) {
				this.m_bounding_quad.size = value;
				var center = new gb.vec2(value.x / 2 - this.m_center_selector.size.x / 2, 
					value.y / 2 - this.m_center_selector.size.y / 2);
				console.log(center);
				this.m_center_selector.position = center;
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
				this.m_target = value;
				this.m_target.remove_from_parent();
				this.m_target.position = gb.vec2(0);
				this.m_target.rotation = 0;
				this.m_bounding_quad.add_child(this.m_target);

				var corner_selector = null;
				for(var i = 0; i < gb.selector.corner_type.max; ++i) {
					corner_selector = this.m_corners_selectors[i];
					if(corner_selector) {
						corner_selector.remove_from_parent();
						this.m_bounding_quad.add_child(corner_selector);
					}
				}
				this.m_center_selector.remove_from_parent();
				this.m_bounding_quad.add_child(this.m_center_selector);
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
		}
	},

	static_methods: {

	}
});
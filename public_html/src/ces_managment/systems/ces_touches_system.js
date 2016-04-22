/* global oop, gb */
"use strict";

oop.define_class({
    namespace: "gb",
    name: "ces_touches_system",
    extend: gb.ces_base_system,

    init: function() {

        this.m_type = gb.ces_base_system.type.touches_recognize;
        this.m_events = [];
        this.m_captured_entities = [];
    },

    release: function() {

    },

    methods: {
        on_feed_start: function() {

        },

        on_feed: function(root) {

            while (this.m_events.length !== 0) {
                var event = this.m_events.pop();
                var intersected_entity = this.intersected_entity(root, event.state, event.point);
                if (event.state === gb.input_context.state.released) {
                    var captured_entities_count = this.m_captured_entities.length;
                    for (var i = 0; i < captured_entities_count; ++i) {
                        var captured_entity = this.m_captured_entities[i];
                        var touch_recognize_component = captured_entity.get_component(gb.ces_base_component.type.touch_recognize);
                        var callbacks = touch_recognize_component.get_callbacks(event.state);
                        var callbacks_count = callbacks.length;
                        for (var j = 0; j < callbacks_count; ++j) {
                            var callback = callbacks[j];
                            callback(captured_entity, event.state, event.point);
                        }
                    }
                    this.m_captured_entities = [];
                }

                if (intersected_entity) {

                    if (event.state === gb.input_context.state.pressed) {
                        var index = this.m_captured_entities.findIndex(function(analized_entity) {
                            return analized_entity === intersected_entity;
                        });
                        if (index === -1) {
                            this.m_captured_entities.push(intersected_entity);
                        }
                    }

                    var touch_recognize_component = intersected_entity.get_component(gb.ces_base_component.type.touch_recognize);
                    var callbacks = touch_recognize_component.get_callbacks(event.state);
                    var callbacks_count = callbacks.length;
                    for (var i = 0; i < callbacks_count; ++i) {
                        var callback = callbacks[i];
                        var index = this.m_captured_entities.findIndex(function(analized_entity) {
                            return analized_entity === intersected_entity;
                        });
                        
                        if (index !== -1) {
                            callback(intersected_entity, event.state, event.point);
                        }
                    }
                }
                if (event.state === gb.input_context.state.dragged) {
                    var captured_entities_count = this.m_captured_entities.length;
                    for (var i = 0; i < captured_entities_count; ++i) {
                        var captured_entity = this.m_captured_entities[i];
                        var touch_recognize_component = captured_entity.get_component(gb.ces_base_component.type.touch_recognize);
                        var callbacks = touch_recognize_component.get_callbacks(event.state);
                        var callbacks_count = callbacks.length;
                        for (var j = 0; j < callbacks_count; ++j) {
                            var callback = callbacks[j];
                            callback(captured_entity, event.state, event.point);
                        }
                    }
                }
            }

        },

        on_feed_end: function() {


        },

        intersected_entity: function(entity, state, point) {
            var intersected_entity = null;
            var children = entity.children;
            var children_count = children.length;
            var child = null;
            for (var i = 0; i < children_count; ++i) {
                child = children[i];
                var intersected_child_entity = this.intersected_entity(child, state, point);
                if (intersected_child_entity) {
                    intersected_entity = intersected_child_entity;
                }
            }

            var touch_recognize_component = entity.get_component(gb.ces_base_component.type.touch_recognize);
            if (touch_recognize_component && !intersected_entity && touch_recognize_component.is_respond_to(state) && entity.visible) {
            
                var scene_component = entity.get_component(gb.ces_base_component.type.scene);

                var matrix_m = gb.ces_transformation_component.get_absolute_transformation(entity, false);
                matrix_m = gb.mat4.multiply(matrix_m, scene_component.camera.matrix_v);

                var min_bound = gb.mat4.multiply_vec2(touch_recognize_component.min_bound, matrix_m);
                var max_bound = gb.mat4.multiply_vec2(touch_recognize_component.max_bound, matrix_m);

                if (gb.math.intersect_min_max_bound(min_bound, max_bound, point)) {
                    intersected_entity = entity;
                }
            }
            return intersected_entity;

        },

        on_mouse_pressed: function(point) {
            this.m_events.push({state: gb.input_context.state.pressed, point: point });
        },

        on_mouse_released: function(point) {
            this.m_events.push({state: gb.input_context.state.released, point: point });
        },

        on_mouse_moved: function(point, delta) {
            this.m_events.push({state: gb.input_context.state.moved, point: point });
        },

        on_mouse_dragged: function(point, delta) {
            this.m_events.push({state: gb.input_context.state.dragged, point: point });
        },
    },

    static_methods: {

    }
});
/* global oop, gb */
"use strict";

oop.define_class({
    namespace: "gb",
    name: "ces_box2d_system",
    extend: gb.ces_base_system,

    init: function() {

        this.m_type = gb.ces_base_system.type.box2d;
    },

    release: function() {

    },

    methods: {
        on_feed_start: function() {

        },

        on_feed: function(root) {
            var box2d_world_component = root.get_component(gb.ces_base_component.type.box2d_world);
            if (box2d_world_component) {
                box2d_world_component.box2d_world.Step(1.0 / 60.0, 1, 1);
                this.update_recursively(root);
            }
        },

        on_feed_end: function() {

        },

        update_recursively: function(entity) {
            var box2d_body_component = entity.get_component(gb.ces_base_component.type.box2d_body);
            if (box2d_body_component) {
                var new_position = new gb.vec2(box2d_body_component.box2d_body.GetPosition().get_x(),
                                               box2d_body_component.box2d_body.GetPosition().get_y());
                box2d_body_component.on_position_changed(new_position);
                box2d_body_component.on_rotation_changed(box2d_body_component.box2d_body.GetAngle());
                var transformation_component = entity.get_component(gb.ces_base_component.type.transformation);
                transformation_component.position = box2d_body_component.position;
            }

            var children = entity.children;
            for (var i = 0; i < children.length; ++i) {
                this.update_recursively(children[i]);
            }
        }
    },

    static_methods: {

    }
});
/* global oop, gb */
"use strict";

oop.define_class({
    namespace: "gb",
    name: "ces_animation_system",
    extend: gb.ces_base_system,

    init: function() {

        this.m_type = gb.ces_base_system.type.animation;
    },

    release: function() {

    },

    methods: {
        on_feed_start: function() {

        },

        on_feed: function(root) {
            this.update_recursively(root);
        },

        on_feed_end: function() {


        },

        update_recursively: function(entity) {

            var geometry_component = entity.get_component(gb.ces_base_component.type.geometry);
            var animation_component = entity.get_component(gb.ces_base_component.type.animation);
            if (geometry_component && animation_component) {
                var frames = animation_component.frames;
                var current_frame = animation_component.current_frame;
                current_frame++;
                if(frames) {
                    animation_component.current_frame = current_frame < (frames.length - 1) ? current_frame : 0;
                    var frame = frames[animation_component.current_frame];
                    geometry_component.update_mesh_texcoord_attributes(frame.u_0, frame.v_0, frame.u_1, frame.v_1);
                }
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
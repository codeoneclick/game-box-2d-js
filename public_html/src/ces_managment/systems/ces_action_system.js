/* global oop, gb */
"use strict";

oop.define_class({
    namespace: "gb",
    name: "ces_action_system",
    extend: gb.ces_base_system,

    init: function() {

        this.m_type = gb.ces_base_system.type.action;
    },

    release: function() {

    },

    methods: {
        on_feed_start: function() {

        },

        on_feed: function(root, deltatime) {
            this.update_recursively(root, deltatime);
        },

        on_feed_end: function() {

        },

        update_recursively: function(entity, deltatime) {
            var action_component = entity.get_component(gb.ces_base_component.type.action);
            if (action_component && action_component.action) {
                action_component.action(entity, deltatime);
            }
            var children = entity.children;
            for (var i = 0; i < children.length; ++i) {
                this.update_recursively(children[i], deltatime);
            }
        }
    },

    static_methods: {

    }
});
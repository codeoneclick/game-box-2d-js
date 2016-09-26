/* global oop, gb */
"use strict";

oop.define_class({
    namespace: "gb",
    name: "ces_touch_recognize_component",
    extend: gb.ces_base_component,

    init: function() {

        this.m_type = gb.ces_base_component.type.touch_recognize;
        this.m_bound = new gb.vec4(0.0);
        this.m_min_bound = new gb.vec2(0.0);
        this.m_max_bound = new gb.vec2(0.0);

        this.m_responders = [];
        this.m_responders[gb.input_context.state.pressed] = false;
        this.m_responders[gb.input_context.state.released] = false;
        this.m_responders[gb.input_context.state.moved] = false;
        this.m_responders[gb.input_context.state.dragged] = false;

        this.m_callbacks = [];
        this.m_callbacks[gb.input_context.state.pressed] = [];
        this.m_callbacks[gb.input_context.state.released] = [];
        this.m_callbacks[gb.input_context.state.moved] = [];
        this.m_callbacks[gb.input_context.state.dragged] = [];

        Object.defineProperty(this, 'bound', {
            set: function(value) {
                this.m_bound = value;

                this.m_min_bound.x = value.x;
                this.m_min_bound.y = value.y;

                this.m_max_bound.x = value.z;
                this.m_max_bound.y = value.w;
            },

            get: function() {
                return this.m_bound;
            }
        });

        Object.defineProperty(this, 'min_bound', {
            get: function() {
                return this.m_min_bound;
            }
        });

        Object.defineProperty(this, 'max_bound', {
            get: function() {
                return this.m_max_bound;
            }
        });
    },

    release: function() {

    },

    methods: {

        enable: function(state, value)
        {
            this.m_responders[state] = value;
        },

        is_respond_to: function(state)
        {
            return this.m_responders[state];
        },

        add_callback: function(state, callback, userdata)
        {
            this.m_callbacks[state].push({ callback: callback, userdata: userdata });
        },

        remove_callback: function(state, callback)
        {
            var index = this.m_callbacks[state].findIndex(function(analized_callback) {
                return callback === analized_callback.callback;
            });
            if(index !== -1)
            {
                this.m_callbacks[state].splice(index, 1);
            }
        },

        get_callbacks: function(state)
        {
            return this.m_callbacks[state];
        }
    },

    static_methods: {

    }
});
/* global oop, gb */
"use strict";

oop.define_class({
    namespace: "gb",
    name: "ces_base_system",
    constants: {
        type: {
            undefined: -1,
            render: 0,
            deferred_lighting: 1,
            touches_recognize: 2,
            animation: 3
        }
    },
    
    init: function() {

        this.m_type = gb.ces_base_system.type.undefined;
        this.m_priority = 0;

        Object.defineProperty(this, 'type', {
            get: function() {
                return this.m_type;
            }
        });

        Object.defineProperty(this, 'priority', {
            get: function() {
                return this.m_priority;
            }
        });
    },

    release: function() {

    },

    methods: {

    },

    static_methods: {

    }
});
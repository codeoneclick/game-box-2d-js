/* global oop, gb */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "resource_commiter",
    constants: {
        status: {
            undefined: 0,
            in_progress: 1,
            failure: 2,
            success: 3
        }
    },

    init: function(guid, resource) {
        this.m_guid = guid;
        this.m_resource = resource;
        this.m_status = gb.resource_commiter.status.undefined;

        Object.defineProperty(this, 'guid', {
            get: function() {
                return this.m_guid;
            }
        });

        Object.defineProperty(this, 'status', {
            get: function() {
                return this.m_status;
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
/* global oop, gb */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "resource_loading_operation",
    constants: {
        status: {
            undefined: 0,
            in_progress: 1,
            waiting: 2,
            failure: 3,
            success: 4
        }
    },

    init: function(guid, resource) {
        this.m_guid = guid;
        this.m_resource = resource;
        this.m_status = gb.resource_loading_operation.status.undefined;
        this.m_transfering_data = null;
        this.m_serializer = null;
        this.m_commiter = null;

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
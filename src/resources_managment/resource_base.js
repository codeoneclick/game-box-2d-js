/* global oop, _, gb, console */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "resource_base",
    constants: {
        type: {
            undefined: 0,
            shader: 1,
            texture: 2
        },
        status: {
            unloaded: 0,
            loaded: 1,
            commited: 2
        }
    },

    init: function(guid) {
        this.m_guid = guid;
        this.m_type = gb.resource_base.type.undefined;
        this.m_status = gb.resource_base.status.unloaded;

        this.m_callbacks = [];
        this.m_userdata_container = [];

        Object.defineProperty(this, 'guid', {
            get: function() {
                return this.m_guid;
            }
        });
        Object.defineProperty(this, 'type', {
            get: function() {
                return this.m_type;
            }
        });
        Object.defineProperty(this, 'status', {
            get: function() {
                return this.m_status;
            }
        });
        Object.defineProperty(this, 'is_commited', {
            get: function() {
                return gb.resource_base.status.commited;
            }
        });
    },

    release: function() {

    },

    methods: {
        on_resource_loaded: function(success) {
            for (var i = 0; i < this.m_callbacks.length; ++i) {
                var callback = this.m_callbacks[i];
                callback(success ? this : null, this.m_userdata_container[i]);
            }

            this.m_callbacks = [];
            this.m_userdata_container = [];
        },

        add_resource_loading_callback: function(callback, userdata) {
            if (_.isFunction(callback)) {
                if (!_.contains(this.m_callbacks, callback)) {
                    if (this.status === gb.resource_base.status.commited) {
                        callback(this, userdata);
                    } else {
                        this.m_callbacks.push(callback);
                        this.m_userdata_container.push(userdata);
                    }
                } else {
                    console.error("can't add same callback for resource loading");
                }
            } else {
                console.error("resource loading callback isn't function");
            }
        },

        remove_resource_loading_callback: function(callback) {
            var index = _.indexOf(this.m_callbacks, callback);
            if (index !== -1) {
                this.m_callbacks.splice(index, 1);
                this.m_userdatas.splice(index, 1);
            } else {
                console.error("resource doesn't contain this callback");
            }
        }
    }
});
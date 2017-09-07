/* global gb, _, console */

"use strict";

gb.resource_type = {
    undefined: 0,
    shader: 1,
    texture: 2
};

gb.resource_status = {
    unloaded: 0,
    loaded: 1,
    commited: 2
};

gb.resource_base = function(guid) {
    this.m_guid = guid;
    this.m_type = gb.resource_type.undefined;
    this.m_status = gb.resource_status.unloaded;

    this.m_callbacks = [];
    this.m_userdata_container = [];
};

gb.resource_base.prototype = {
    constructor: gb.resource_base,

    get_guid: function() {
        return this.m_guid;
    },

    get_type: function() {
        return this.m_type;
    },

    get_status: function() {
        return this.m_status;
    },

    on_transfering_data_serialized: function() {

    },

    on_transfering_data_commited: function() {

    },

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
                if (this.get_status() === gb.resource_status.commited) {
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
};
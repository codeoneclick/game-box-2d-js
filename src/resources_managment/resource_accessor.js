/* global oop, gb */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "resource_accessor",

    init: function() {
        this.m_resources = [];
        this.m_operations_queue = [];
    },

    release: function() {

    },

    methods: {
        add_custom_resource: function(guid, resource) {
            this.m_resources[guid] = resource;
        },

        get_shader: function(filename) {
            var resource = this.m_resources[filename];
            if (typeof resource === 'undefined') {
                resource = new gb.shader(filename);
                this.m_resources[filename] = resource;

                var operation = new gb.shader_loading_operation(filename, resource);
                this.m_operations_queue[filename] = operation;
                var self = this;
                operation.start(function() {
                    self.m_resources[filename].on_resource_loaded(self.m_operations_queue[filename].status === gb.resource_loading_operation.status.success);
                    self.m_operations_queue[filename] = null;
                });
            }
            return resource;
        },

        get_texture: function(filename, data) {
            var resource = data ? null : this.m_resources[filename];
            if (!resource) {
                resource = new gb.texture(filename);
                this.m_resources[filename] = resource;

                var operation = new gb.texture_loading_operation(filename, resource, data);
                this.m_operations_queue[filename] = operation;
                var self = this;
                operation.start(function() {
                    self.m_resources[filename].on_resource_loaded(self.m_operations_queue[filename].status === gb.resource_loading_operation.status.success);
                    self.m_operations_queue[filename] = null;
                });
            }
            return resource;
        }
    },

    static_methods: {
    }
});
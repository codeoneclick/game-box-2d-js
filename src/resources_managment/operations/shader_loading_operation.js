/* global oop, gb  */

"use strict";

oop.define_class({
  namespace: "gb",
  name: "shader_loading_operation",
  extend: gb.resource_loading_operation,
  constants: {
    vs_extension: ".vert",
    fs_extension: ".frag"
  },

  init: function() {
    this.m_transfering_data = new gb.shader_transfering_data();
  },

  release: function() {

  },

  methods: {
    start: function(callback) {
      var self = this;
      this.serialize(function() {
        if (self.m_status === gb.resource_loading_operation.status.waiting) {
          self.commit(function() {
            callback();
          });
        } else {
          callback();
        }
      });
    },

    serialize: function(callback) {
      this.m_status = gb.resource_loading_operation.status.in_progress;
      this.m_serializer = new gb.shader_serializer_glsl(this.m_guid, this.m_resource,
        this.m_guid + gb.shader_loading_operation.vs_extension, this.m_guid + gb.shader_loading_operation.fs_extension);

      var self = this;
      this.m_serializer.serialize(this.m_transfering_data, function() {
        self.m_status = self.m_serializer.status === gb.resource_serializer.status.success ? gb.resource_loading_operation.status.waiting : gb.resource_loading_operation.status.failure;
        callback();
      });
    },

    commit: function(callback) {
      this.m_status = gb.resource_loading_operation.status.in_progress;
      this.m_commiter = new gb.shader_commiter_glsl(this.m_guid, this.m_resource);
      this.m_commiter.commit(this.m_transfering_data);
      this.m_status = this.m_commiter.status === gb.resource_commiter.status.success ? gb.resource_loading_operation.status.success : gb.resource_loading_operation.status.failure;
      callback();
    }
  },

  static_methods: {

  }
});
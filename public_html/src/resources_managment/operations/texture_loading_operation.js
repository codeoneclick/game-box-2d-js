/* global oop, gb  */

"use strict";

oop.define_class({
  namespace: "gb",
  name: "texture_loading_operation",
  extend: gb.resource_loading_operation,

  init: function() {
    this.m_transfering_data = new gb.texture_transfering_data();
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

      if (!this.m_serialized_data) {
        this.m_status = gb.resource_loading_operation.status.in_progress;
        this.m_serializer = new gb.texture_serializer_png(this.m_guid, this.m_resource);

        var self = this;
        this.m_serializer.serialize(this.m_transfering_data, function() {
          self.m_status = self.m_serializer.status === gb.resource_serializer.status.success ? gb.resource_loading_operation.status.waiting : gb.resource_loading_operation.status.failure;
          callback();
        });
      }
      else
      {
          this.m_status = gb.resource_loading_operation.status.waiting;
          this.m_transfering_data.data = this.m_serialized_data;
          this.m_transfering_data.width = this.m_serialized_data.width;
          this.m_transfering_data.height = this.m_serialized_data.height;
          this.m_resource.on_transfering_data_serialized(this.m_transfering_data);
          callback();
      }
    },

    commit: function(callback) {
      this.m_status = gb.resource_loading_operation.status.in_progress;
      this.m_commiter = new gb.texture_commiter_png(this.m_guid, this.m_resource);
      this.m_commiter.commit(this.m_transfering_data);
      this.m_status = this.m_commiter.status === gb.resource_commiter.status.success ? gb.resource_loading_operation.status.success : gb.resource_loading_operation.status.failure;
      callback();
    }
  },

  static_methods: {

  }
});
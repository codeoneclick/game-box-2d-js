/* global oop, gb */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "texture_serializer_png",
    extend: gb.resource_serializer,

    init: function(filename) {
        this.m_filename = filename;
    },

    release: function() {

    },

    methods: {
        serialize: function(data, callback) {
            this.m_status = gb.resource_serializer.status.in_progress;

            var self = this;
            var image = new Image();
            image.onload = function() {
                data.data = image;
                data.width = image.width;
                data.height = image.height;
                self.m_resource.on_transfering_data_serialized(data);
                self.m_status = gb.resource_serializer.status.success;
                callback();
            };
            image.src = this.m_filename;
        }
    },

    static_methods: {

    }
});
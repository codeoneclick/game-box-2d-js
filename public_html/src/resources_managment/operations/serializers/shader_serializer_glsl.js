/* global oop, $, gb */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "shader_serializer_glsl",
    extend: gb.resource_serializer,

    init: function(filename, resource, vs_filename, fs_filename) {
        this.m_vs_filename = vs_filename;
        this.m_fs_filename = fs_filename;
    },

    release: function() {

    },

    methods: {
        serialize: function(data, callback) {
            this.m_status = gb.resource_serializer.status.in_progress;

            var self = this;
            $.ajax({
                dataType: "text",
                url: this.m_vs_filename,
                data: {},
                async: true,
                success: function(value) {
                    data.vs_source_code = value;

                    $.ajax({
                        dataType: "text",
                        url: self.m_fs_filename,
                        data: {},
                        async: true,
                        success: function(value) {
                            data.fs_source_code = value;

                            self.m_resource.on_transfering_data_serialized(data);

                            self.m_status = data.vs_source_code.length !== 0 && data.fs_source_code.length !== 0 ?
                                gb.resource_serializer.status.success : gb.resource_serializer.status.failure;

                            callback();
                        }
                    });
                }
            });
        }
    },

    static_methods: {

    }
});
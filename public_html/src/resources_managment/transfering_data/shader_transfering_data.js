/* global oop, resource_transfering_data */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "shader_transfering_data",
    extend: resource_transfering_data,

    init: function() {
        this.m_type = resource_transfering_data.type.shader;
        this.m_vs_source_code = "";
        this.m_fs_source_code = "";
    this.m_handler = -1;
    
    Object.defineProperty(this, 'vs_source_code', {
        get: function()
        {
            return this.m_vs_source_code;
        },
        set: function(value)
        {
            this.m_vs_source_code = value;
        }
    });
    
    Object.defineProperty(this, 'fs_source_code', {
        get: function()
        {
            return this.m_fs_source_code;
        },
        set: function(value)
        {
            this.m_fs_source_code = value;
        }
    });
    
    Object.defineProperty(this, 'handler', {
        get: function()
        {
            return this.m_handler;
        },
        set: function(value)
        {
            this.m_handler = value;
        }
    });
    },

    release: function() {

    }
});

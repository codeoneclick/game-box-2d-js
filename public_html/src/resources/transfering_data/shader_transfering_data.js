/* global gb */

$.getScript("src/resources/transfering_data/resource_transfering_data.js");

gb.shader_transfering_data = function()
{
    gb.resource_transfering_data.call(this);
    
    this.m_type = gb.resource_transfering_data_type.shader;
    this.m_vs_source_code = "";
    this.m_fs_source_code = "";
    this.m_shader_id = -1;
    
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
    
    Object.defineProperty(this, 'shader_id', {
        get: function()
        {
            return this.m_shader_id;
        },
        set: function(value)
        {
            this.m_shader_id = value;
        }
    });
};

gb.shader_transfering_data.prototype = Object.create(gb.resource_transfering_data.prototype);
gb.shader_transfering_data.prototype.constructor = gb.shader_transfering_data;


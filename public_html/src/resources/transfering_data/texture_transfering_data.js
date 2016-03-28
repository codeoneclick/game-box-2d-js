/* global gb */

$.getScript("src/resources/transfering_data/resource_transfering_data.js");

gb.texture_transfering_data = function()
{
    gb.resource_transfering_data.call(this);
    
    this.m_type = gb.resource_transfering_data_type.texture;
    this.m_width = 0;
    this.m_height = 0;
    this.m_texture_id = -1;
    
    Object.defineProperty(this, 'width', {
        get: function()
        {
            return this.m_width;
        },
        set: function(value)
        {
            this.m_width = value;
        }
    });
    
    Object.defineProperty(this, 'height', {
        get: function()
        {
            return this.m_height;
        },
        set: function(value)
        {
            this.m_height = value;
        }
    });
    
    Object.defineProperty(this, 'texture_id', {
        get: function()
        {
            return this.m_texture_id;
        },
        set: function(value)
        {
            this.m_texture_id = value;
        }
    });
};

gb.texture_transfering_data.prototype = Object.create(gb.resource_transfering_data.prototype);
gb.texture_transfering_data.prototype.constructor = gb.texture_transfering_data;


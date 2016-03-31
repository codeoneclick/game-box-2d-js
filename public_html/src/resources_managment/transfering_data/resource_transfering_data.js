/* global gb */

gb.resource_transfering_data_type = {
    undefined : 0,
    shader : 1,
    texture : 2
};

gb.resource_transfering_data = function()
{
    this.m_type = gb.resource_transfering_data_type.undefined;
    
    Object.defineProperty(this, 'type', {
        get: function()
        {
            return this.m_type;
        }
    });
};

gb.resource_transfering_data.prototype = 
{ 
    constructor: gb.resource_transfering_data
};


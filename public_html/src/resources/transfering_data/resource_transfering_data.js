/* global gb */

gb.resource_transfering_data_type = {
    undefined : 0,
    shader : 1,
    texture : 2
};

gb.resource_transfering_data = function()
{
    this.m_type = gb.resource_transfering_data_type.undefined;
};

gb.resource_transfering_data.prototype = 
{ 
    constructor: gb.resource_transfering_data,
    
    get_type: function()
    {
        return this.m_type;
    }
};


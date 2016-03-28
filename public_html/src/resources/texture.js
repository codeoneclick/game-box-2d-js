/* global gb */

$.getScript("src/resources/resource_base.js");

gb.texture = function(guid)
{
    gb.resource_base.call(this, guid);
    
    this.m_type = gb.resource_type.texture;
    
    this.m_texture_id = -1;
    
};

gb.texture.prototype = Object.create(gb.resource_base.prototype);
gb.texture.prototype.constructor = gb.texture;

gb.texture.prototype.on_transfering_data_serialized = function(transfering_data)
{
    switch(transfering_data.type)
    {
        case gb.resource_transfering_data_type.shader :
        {
            this.m_status = gb.resource_status.loaded;
        }
        break;
    }
};
    
gb.texture.prototype.on_transfering_data_commited = function(transfering_data)
{
    switch(transfering_data.type)
    {
        case gb.resource_transfering_data_type.shader :
        {
            this.m_shader_id = transfering_data.shader_id;
            this.m_status = gb.resource_status.commited;
            this.setup();
        }
        break;
    }  
};
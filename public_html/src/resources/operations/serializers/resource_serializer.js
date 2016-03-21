/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

gb.serializer_status = {
    undefined : 0,
    in_progress : 1,
    failure : 2,
    success : 3
};

gb.resource_serializer = function(guid, resource)
{
    this.m_guid = guid;
    this.m_resource = resource;
    this.m_status = gb.serializer_status.undefined;
}

gb.resource_serializer.prototype = 
{ 
    constructor: gb.resource_serializer,
    
    clone: function() 
    {
        return new this.constructor();
    },

    copy: function(value)
    {
	this.m_guid = value.m_guid;
	this.m_resource = value.m_resource;
        this.m_status = value.m_status;
	return this;
    },
    
    get_guid: function()
    {
        return this.m_guid;
    },
    
    get_status: function()
    {
        return this.m_status;
    }
};

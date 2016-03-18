/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var k_serializer_status_undefined = 0;
var k_serializer_status_in_progress = 1;
var k_serializer_status_failure = 2;
var k_serializer_status_success = 3;

function resource_serializer (guid, resource)
{
    this.m_guid = guid;
    this.m_resource = resource;
    this.m_status = k_serializer_status_undefined;
}

resource_serializer.prototype = 
{ 
    constructor: resource_serializer,
    
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

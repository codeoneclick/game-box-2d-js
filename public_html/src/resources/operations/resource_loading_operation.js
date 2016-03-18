/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var k_resource_loading_operation_status_undefined = 0;
var k_resource_loading_operation_status_in_progress = 1;
var k_resource_loading_operation_status_waiting = 2;
var k_resource_loading_operation_status_failure = 3;
var k_resource_loading_operation_status_success = 4;

function resource_loading_operation (guid, resource)
{
    this.m_guid = guid;
    this.m_resource = resource;
    this.m_status = k_resource_loading_operation_status_undefined;
    this.m_transfering_data = null;
    this.m_serializer = null;
    this.m_commiter = null;
}

resource_loading_operation.prototype = 
{ 
    constructor: resource_loading_operation,
    
    get_guid: function()
    {
        return this.m_guid;
    },
    
    get_status: function()
    {
        return this.m_status;
    }
};

/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

gb.resource_loading_operation_status = {
    undefined : 0,
    in_progress : 1,
    waiting : 2,
    failure : 3,
    success : 4
};

gb.resource_loading_operation = function(guid, resource)
{
    this.m_guid = guid;
    this.m_resource = resource;
    this.m_status = gb.resource_loading_operation_status.undefined;
    this.m_transfering_data = null;
    this.m_serializer = null;
    this.m_commiter = null;
};

gb.resource_loading_operation.prototype = 
{ 
    constructor: gb.resource_loading_operation,
    
    get_guid: function()
    {
        return this.m_guid;
    },
    
    get_status: function()
    {
        return this.m_status;
    }
};

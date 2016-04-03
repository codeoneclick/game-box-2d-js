/* global gb */

gb.texture_loading_operation = function(guid, resource)
{
    gb.resource_loading_operation.call(this, guid, resource);
    this.m_transfering_data = new gb.texture_transfering_data();
};

gb.texture_loading_operation.prototype = Object.create(gb.resource_loading_operation.prototype);
gb.texture_loading_operation.prototype.constructor = gb.texture_loading_operation;

gb.texture_loading_operation.prototype.start = function(callback) 
{
    var self = this;
    this.serialize(function() {
       if(self.m_status === gb.resource_loading_operation_status.waiting)
       {
           self.commit(function() {
               callback();
           });
       }
       else 
       {
           callback();
       }
    });
};

gb.texture_loading_operation.prototype.serialize = function(callback) 
{
    this.m_status = gb.resource_loading_operation_status.in_progress;
    this.m_serializer = new gb.texture_serializer_png(this.m_guid, this.m_resource);
    
    var self = this;
    this.m_serializer.serialize(this.m_transfering_data, function() {
        self.m_status = self.m_serializer.get_status() === gb.serializer_status.success ? gb.resource_loading_operation_status.waiting : gb.resource_loading_operation_status.failure;
        callback();
    });
};

gb.texture_loading_operation.prototype.commit = function(callback) 
{
    this.m_status = gb.resource_loading_operation_status.in_progress;
    this.m_commiter = new gb.texture_commiter_png(this.m_guid, this.m_resource);
    this.m_commiter.commit(this.m_transfering_data);
    this.m_status = this.m_commiter.get_status() === gb.commiter_status.success ? gb.resource_loading_operation_status.success : gb.resource_loading_operation_status.failure;
    callback();
};
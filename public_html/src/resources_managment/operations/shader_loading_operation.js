/* global gb */

var k_vs_extension = ".vert";
var k_fs_extension = ".frag";

gb.shader_loading_operation = function(guid, resource)
{
    gb.resource_loading_operation.call(this, guid, resource);
    this.m_transfering_data = new gb.shader_transfering_data();
};

gb.shader_loading_operation.prototype = Object.create(gb.resource_loading_operation.prototype);
gb.shader_loading_operation.prototype.constructor = gb.shader_loading_operation;

gb.shader_loading_operation.prototype.start = function(callback) 
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

gb.shader_loading_operation.prototype.serialize = function(callback) 
{
    this.m_status = gb.resource_loading_operation_status.in_progress;
    this.m_serializer = new gb.shader_serializer_glsl(this.m_guid + k_vs_extension,
                                                      this.m_guid + k_fs_extension,
                                                      this.m_resource);
    
    var self = this;
    this.m_serializer.serialize(this.m_transfering_data, function() {
        self.m_status = self.m_serializer.get_status() === gb.serializer_status.success ? gb.resource_loading_operation_status.waiting : gb.resource_loading_operation_status.failure;
        callback();
    });
};

gb.shader_loading_operation.prototype.commit = function(callback) 
{
    this.m_status = gb.resource_loading_operation_status.in_progress;
    this.m_commiter = new gb.shader_commiter_glsl(this.m_guid,
                                                  this.m_resource);
    this.m_commiter.commit(this.m_transfering_data);
    this.m_status = this.m_commiter.get_status() === gb.commiter_status.success ? gb.resource_loading_operation_status.success : gb.resource_loading_operation_status.failure;
    callback();
};
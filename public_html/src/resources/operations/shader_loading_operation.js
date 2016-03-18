/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.getScript("src/resources/transfering_data/shader_transfering_data.js");
$.getScript("src/resources/operations/serializers/shader_serializer_glsl.js");
$.getScript("src/resources/operations/commiters/shader_commiter_glsl.js");
$.getScript("src/resources/operations/resource_loading_operation.js");

var k_vs_extension = ".vert";
var k_fs_extension = ".frag";

function shader_loading_operation (guid, resource)
{
    resource_loading_operation.call(this, guid, resource);
    this.m_transfering_data = new shader_transfering_data();
}

shader_loading_operation.prototype = Object.create(resource_loading_operation.prototype);
shader_loading_operation.prototype.constructor = shader_loading_operation;

shader_loading_operation.prototype.serialize = function() 
{
    this.m_status = k_resource_loading_operation_status_in_progress;
    this.m_serializer = new shader_serializer_glsl(this.m_guid + k_vs_extension,
                                                   this.m_guid + k_fs_extension,
                                                   this.m_resource);
    this.m_serializer.serialize(this.m_transfering_data);
    this.m_status = this.m_serializer.get_status() == k_serializer_status_success ? k_resource_loading_operation_status_waiting : k_resource_loading_operation_status_failure;
};

shader_loading_operation.prototype.commit = function() 
{
    this.m_status = k_resource_loading_operation_status_in_progress;
    this.m_commiter = new shader_commiter_glsl(this.m_guid,
                                               this.m_resource);
    console.log(this.m_commiter);
    this.m_commiter.commit(this.m_transfering_data);
    this.m_status = this.m_commiter.get_status() == k_commiter_status_success ? k_resource_loading_operation_status_success : k_resource_loading_operation_status_failure;
};
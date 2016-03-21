/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.getScript("src/resources/operations/serializers/resource_serializer.js");
$.getScript("src/resources/transfering_data/shader_transfering_data.js");

gb.shader_serializer_glsl = function(vs_filename, fs_filename, resource)
{
    gb.resource_serializer.call(this, vs_filename + fs_filename, resource);
    
    this.m_vs_filename = vs_filename;
    this.m_fs_filename = fs_filename;
};

gb.shader_serializer_glsl.prototype = Object.create(gb.resource_serializer.prototype);
gb.shader_serializer_glsl.prototype.constructor = gb.shader_serializer_glsl;

gb.shader_serializer_glsl.prototype.serialize = function(transfering_data) 
{
    this.m_status = gb.serializer_status.in_progress;
    $.ajax({dataType: "text", url: this.m_vs_filename, data: {}, async: false, success: function(value) {
        transfering_data.set_vs_source_code(value);
    }});
    $.ajax({dataType: "text", url: this.m_fs_filename, data: {}, async: false, success: function(value) {
        transfering_data.set_fs_source_code(value);
    }});
    this.m_resource.on_transfering_data_serialized(transfering_data);

    this.m_status = transfering_data.get_vs_source_code().length != 0 && transfering_data.get_fs_source_code().length != 0 ? 
    gb.serializer_status.success : gb.serializer_status.failure;
};

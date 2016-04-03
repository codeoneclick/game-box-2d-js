/* global gb */

gb.shader_serializer_glsl = function(vs_filename, fs_filename, resource)
{
    gb.resource_serializer.call(this, vs_filename + fs_filename, resource);
    
    this.m_vs_filename = vs_filename;
    this.m_fs_filename = fs_filename;
};

gb.shader_serializer_glsl.prototype = Object.create(gb.resource_serializer.prototype);
gb.shader_serializer_glsl.prototype.constructor = gb.shader_serializer_glsl;

gb.shader_serializer_glsl.prototype.serialize = function(transfering_data, callback) 
{
    this.m_status = gb.serializer_status.in_progress;
    
    var self = this;
    $.ajax({dataType: "text", url: this.m_vs_filename, data: {}, async: true, success: function(value) {
        transfering_data.vs_source_code = value;
        
        $.ajax({dataType: "text", url: self.m_fs_filename, data: {}, async: true, success: function(value) {
            transfering_data.fs_source_code = value;
            
            self.m_resource.on_transfering_data_serialized(transfering_data);

            self.m_status = transfering_data.vs_source_code.length !== 0 && transfering_data.fs_source_code.length !== 0 ? 
            gb.serializer_status.success : gb.serializer_status.failure;
            
            callback();
        }});
    }});
};

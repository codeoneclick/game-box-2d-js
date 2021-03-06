/* global gb, gl */

gb.shader_commiter_glsl = function(guid, resource)
{
    gb.resource_commiter.call(this, guid, resource);
};

gb.shader_commiter_glsl.prototype = Object.create(gb.resource_commiter.prototype);
gb.shader_commiter_glsl.prototype.constructor = gb.shader_commiter_glsl;

gb.shader_commiter_glsl.prototype.commit = function(transfering_data) 
{
    this.m_status = gb.commiter_status.in_progress;
    
    var shader_compiler = new gb.shader_compiler_glsl();
    var status = gb.commiter_status.failure;

    var vs_handler = shader_compiler.compile(transfering_data.vs_source_code, gl.VERTEX_SHADER);
    if(vs_handler !== -1)
    {
        var fs_handler = shader_compiler.compile(transfering_data.fs_source_code, gl.FRAGMENT_SHADER);
        if(fs_handler !== -1)
        {
            var shader_handler = shader_compiler.link(vs_handler, fs_handler);
            transfering_data.shader_id = shader_handler;
            if(shader_handler !== -1)
            {
                status = gb.commiter_status.success;
            }
        }
    }

    this.m_resource.on_transfering_data_commited(transfering_data);
    this.m_status = status;
};
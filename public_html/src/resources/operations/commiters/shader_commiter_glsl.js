/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.getScript("src/resources/operations/commiters/resource_commiter.js");
$.getScript("src/resources/operations/commiters/compilers/shader_compiler_glsl.js");
$.getScript("src/resources/transfering_data/shader_transfering_data.js");
$.getScript("src/render/graphics_context.js");

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

    var vs_handler = shader_compiler.compile(transfering_data.get_vs_source_code(), graphics_context.get_instance().VERTEX_SHADER);
    if(vs_handler !== -1)
    {
        var fs_handler = shader_compiler.compile(transfering_data.get_fs_source_code(), graphics_context.get_instance().FRAGMENT_SHADER);
        if(fs_handler !== -1)
        {
            var shader_handler = shader_compiler.link(vs_handler, fs_handler);
            transfering_data.set_shader_id(shader_handler);
            if(shader_handler !== -1)
            {
                status = gb.commiter_status.success;
            }
        }
    }

    this.m_resource.on_transfering_data_commited(transfering_data);
    this.m_status = status;
};





/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.getScript("src/resources/transfering_data/resource_transfering_data.js");

function shader_transfering_data ()
{
    resource_transfering_data.call(this);
    
    this.m_type = k_resource_transfering_data_type_shader;
    this.m_vs_source_code = "";
    this.m_fs_source_code = "";
    this.m_shader_id = -1;
}

shader_transfering_data.prototype = Object.create(resource_transfering_data.prototype);
shader_transfering_data.prototype.constructor = shader_transfering_data;

shader_transfering_data.prototype.set_vs_source_code = function(source_code) 
{
    this.m_vs_source_code = source_code;
};

shader_transfering_data.prototype.get_vs_source_code = function()
{
    return this.m_vs_source_code;
};

shader_transfering_data.prototype.set_fs_source_code = function(source_code) 
{
    this.m_fs_source_code = source_code;
};

shader_transfering_data.prototype.get_fs_source_code = function()
{
    return this.m_fs_source_code;
};

shader_transfering_data.prototype.set_shader_id = function(shader_id) 
{
    this.m_shader_id = shader_id;
};

shader_transfering_data.prototype.get_shader_id = function()
{
    return this.m_shader_id;
};


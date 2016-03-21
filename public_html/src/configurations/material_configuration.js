/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.getScript("src/configurations/configuration_base.js");
$.getScript("src/configurations/shader_configuration.js");
$.getScript("src/configurations/texture_configuration.js");

gb.material_configuration = function()
{
    gb.configuration_base.call(this);
    this.json = null;
};

gb.material_configuration.prototype = Object.create(gb.configuration_base.prototype);
gb.material_configuration.prototype.constructor = gb.material_configuration;

gb.material_configuration.prototype.serialize = function(filename) 
{
    var self = this;
    $.ajax({ dataType: "json", url: filename, data: {}, async: false, success: function(value) {
        self.json = value;
        
        var configuration = new gb.shader_configuration();
        configuration.serialize(self.json.shader);
        self.set_configuration("shader", configuration);
        
        for(var i = 0; i < self.json.textures.length; ++i)
        {
            var configuration = new gb.texture_configuration();
            configuration.serialize(self.json.textures[i]);
            self.set_configuration("textures", configuration);
        }
    }});
};

gb.material_configuration.prototype.get_technique_name = function() 
{
    return this.json.technique_name;
};

gb.material_configuration.prototype.get_technique_pass = function() 
{
    return this.json.technique_pass;
};

gb.material_configuration.prototype.get_depth_test = function() 
{
    return this.json.is_depth_test;
};

gb.material_configuration.prototype.get_depth_mask = function() 
{
    return this.json.is_depth_mask;
};

gb.material_configuration.prototype.get_cull_face = function() 
{
    return this.json.is_cull_face;
};

gb.material_configuration.prototype.get_cull_face_mode = function() 
{
    return this.json.cull_face_mode;
};

gb.material_configuration.prototype.get_blending = function() 
{
    return this.json.is_blending;
};

gb.material_configuration.prototype.get_blending_function_source = function() 
{
    return this.json.blending_function_source;
};

gb.material_configuration.prototype.get_blending_function_destination = function() 
{
    return this.json.blending_function_destination;
};

gb.material_configuration.prototype.get_blending_equation = function() 
{
    return this.json.blending_equation;
};

gb.material_configuration.prototype.get_stencil_test = function() 
{
    return this.json.is_stencil_test;
};

gb.material_configuration.prototype.get_stencil_function = function() 
{
    return this.json.is_stencil_function;
};

gb.material_configuration.prototype.get_stencil_function_parameter_1 = function() 
{
    return this.json.stencil_function_parameter_1;
};

gb.material_configuration.prototype.get_stencil_function_parameter_2 = function() 
{
    return this.json.stencil_function_parameter_2;
};

gb.material_configuration.prototype.get_stencil_mask_parameter = function() 
{
    return this.json.stencil_mask_parameter;
};

gb.material_configuration.prototype.get_debugging = function() 
{
    return this.json.is_debugging;
};

gb.material_configuration.prototype.get_shader_configuration = function() 
{
    if(this.m_configurations instanceof Object)
    {
        if(this.m_configurations["shader"] instanceof Object)
        {
            if(this.m_configurations["shader"].length > 0)
            {
                return this.m_configurations["shader"][0];
            }
        }
    }
    return null;
};

gb.material_configuration.prototype.get_textures_configurations = function() 
{
    if(this.m_configurations instanceof Object)
    {
        if(this.m_configurations["textures"] instanceof Object)
        {
            return this.m_configurations["textures"];
        }
    }
    return null;
};


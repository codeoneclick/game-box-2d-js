/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.getScript("src/configurations/configuration_base.js");
$.getScript("src/configurations/shader_configuration.js");
$.getScript("src/configurations/texture_configuration.js");

function material_configuration ()
{
    configuration_base.call(this);
    this.json = null;
}

material_configuration.prototype = Object.create(configuration_base.prototype);
material_configuration.prototype.constructor = material_configuration;

material_configuration.prototype.serialize = function(filename) 
{
    var self = this;
    $.ajax({ dataType: "json", url: filename, data: {}, async: false, success: function(value) {
        self.json = value;
        
        var configuration = new shader_configuration();
        configuration.serialize(self.json.shader);
        self.set_configuration("shader", configuration);
        
        for(var i = 0; i < self.json.textures.length; ++i)
        {
            var configuration = new texture_configuration();
            configuration.serialize(self.json.textures[i]);
            self.set_configuration("textures", configuration);
        }
    }});
};

material_configuration.prototype.get_technique_name = function() 
{
    return this.json.technique_name;
};

material_configuration.prototype.get_technique_pass = function() 
{
    return this.json.technique_pass;
};

material_configuration.prototype.get_depth_test = function() 
{
    return this.json.is_depth_test;
};

material_configuration.prototype.get_depth_mask = function() 
{
    return this.json.is_depth_mask;
};

material_configuration.prototype.get_cull_face = function() 
{
    return this.json.is_cull_face;
};

material_configuration.prototype.get_cull_face_mode = function() 
{
    return this.json.cull_face_mode;
};

material_configuration.prototype.get_blending = function() 
{
    return this.json.is_blending;
};

material_configuration.prototype.get_blending_function_source = function() 
{
    return this.json.blending_function_source;
};

material_configuration.prototype.get_blending_function_destination = function() 
{
    return this.json.blending_function_destination;
};

material_configuration.prototype.get_blending_equation = function() 
{
    return this.json.blending_equation;
};

material_configuration.prototype.get_stencil_test = function() 
{
    return this.json.is_stencil_test;
};

material_configuration.prototype.get_stencil_function = function() 
{
    return this.json.is_stencil_function;
};

material_configuration.prototype.get_stencil_function_parameter_1 = function() 
{
    return this.json.stencil_function_parameter_1;
};

material_configuration.prototype.get_stencil_function_parameter_2 = function() 
{
    return this.json.stencil_function_parameter_2;
};

material_configuration.prototype.get_stencil_mask_parameter = function() 
{
    return this.json.stencil_mask_parameter;
};

material_configuration.prototype.get_debugging = function() 
{
    return this.json.is_debugging;
};

material_configuration.prototype.get_shader_configuration = function() 
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

material_configuration.prototype.get_textures_configurations = function() 
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


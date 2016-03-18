/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.getScript("src/configurations/configuration_base.js");

function texture_configuration ()
{
    configuration_base.call(this);
    this.json = null;
}

texture_configuration.prototype = Object.create(configuration_base.prototype);
texture_configuration.prototype.constructor = texture_configuration;

texture_configuration.prototype.serialize = function(value) 
{
    this.json = value;
};

texture_configuration.prototype.get_filename = function() 
{
    return this.json.filename;
};

texture_configuration.prototype.get_render_technique_name = function() 
{
    return this.json.render_technique_name;
};

texture_configuration.prototype.get_sampler_index = function() 
{
    return this.json.sampler_index;
};

texture_configuration.prototype.get_wrap_mode = function() 
{
    return this.json.wrap_mode;
};

texture_configuration.prototype.get_mag_filter = function() 
{
    return this.json.mag_filter;
};

texture_configuration.prototype.get_min_filter = function() 
{
    return this.json.min_filter;
};


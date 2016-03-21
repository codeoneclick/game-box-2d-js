/* global gb */

$.getScript("src/configurations/configuration_base.js");

gb.texture_configuration = function()
{
    gb.configuration_base.call(this);
    this.json = null;
};

gb.texture_configuration.prototype = Object.create(gb.configuration_base.prototype);
gb.texture_configuration.prototype.constructor = gb.texture_configuration;

gb.texture_configuration.prototype.serialize = function(value) 
{
    this.json = value;
};

gb.texture_configuration.prototype.get_filename = function() 
{
    return this.json.filename;
};

gb.texture_configuration.prototype.get_render_technique_name = function() 
{
    return this.json.render_technique_name;
};

gb.texture_configuration.prototype.get_sampler_index = function() 
{
    return this.json.sampler_index;
};

gb.texture_configuration.prototype.get_wrap_mode = function() 
{
    return this.json.wrap_mode;
};

gb.texture_configuration.prototype.get_mag_filter = function() 
{
    return this.json.mag_filter;
};

gb.texture_configuration.prototype.get_min_filter = function() 
{
    return this.json.min_filter;
};


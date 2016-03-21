/* global gb */

$.getScript("src/configurations/configuration_base.js");

gb.shader_configuration = function()
{
    gb.configuration_base.call(this);
    this.json = null;
};

gb.shader_configuration.prototype = Object.create(gb.configuration_base.prototype);
gb.shader_configuration.prototype.constructor = gb.shader_configuration;

gb.shader_configuration.prototype.serialize = function(value) 
{
    this.json = value;
};

gb.shader_configuration.prototype.get_filename = function() 
{
    return this.json.filename;
};

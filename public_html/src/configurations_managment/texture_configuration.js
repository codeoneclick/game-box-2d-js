/* global gb */

$.getScript("src/configurations/configuration_base.js");

gb.texture_configuration = function()
{
    gb.configuration_base.call(this);
    this.json = null;
    
    Object.defineProperty(this, 'filename', {
        get: function()
        {
            return this.json.filename;
        }
    });
    
    Object.defineProperty(this, 'technique_name', {
        get: function()
        {
            return this.json.technique_name;
        }
    });
    
    Object.defineProperty(this, 'sampler_index', {
        get: function()
        {
            return this.json.sampler_index;
        }
    });
    
    Object.defineProperty(this, 'wrap_mode', {
        get: function()
        {
            return gb.configuration_base.string_to_glenum()[this.json.wrap_mode];
        }
    });
    
    Object.defineProperty(this, 'mag_filter', {
        get: function()
        {
            return gb.configuration_base.string_to_glenum()[this.json.mag_filter];
        }
    });
    
    Object.defineProperty(this, 'min_filter', {
        get: function()
        {
            return gb.configuration_base.string_to_glenum()[this.json.min_filter];
        }
    });
};

gb.texture_configuration.prototype = Object.create(gb.configuration_base.prototype);
gb.texture_configuration.prototype.constructor = gb.texture_configuration;

gb.texture_configuration.prototype.serialize = function(value) 
{
    this.json = value;
};
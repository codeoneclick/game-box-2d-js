/* global gb */

gb.shader_configuration = function()
{
    gb.configuration_base.call(this);
    this.json = null;
    
    Object.defineProperty(this, 'filename', {
        get: function()
        {
            return this.json.filename;
        }
    });
};

gb.shader_configuration.prototype = Object.create(gb.configuration_base.prototype);
gb.shader_configuration.prototype.constructor = gb.shader_configuration;

gb.shader_configuration.prototype.serialize = function(value) 
{
    this.json = value;
};
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

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

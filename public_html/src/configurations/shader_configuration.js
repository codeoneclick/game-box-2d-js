/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.getScript("src/configurations/configuration_base.js");

function shader_configuration ()
{
    configuration_base.call(this);
    this.json = null;
}

shader_configuration.prototype = Object.create(configuration_base.prototype);
shader_configuration.prototype.constructor = shader_configuration;

shader_configuration.prototype.serialize = function(value) 
{
    this.json = value;
};

shader_configuration.prototype.get_filename = function() 
{
    return this.json.filename;
};

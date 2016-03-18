/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.getScript("src/configurations/configuration_base.js");

function game_object_configuration ()
{
    configuration_base.call(this);
}

game_object_configuration.prototype = Object.create(configuration_base.prototype);
game_object_configuration.prototype.constructor = game_object_configuration;

game_object_configuration.prototype.get_materials_configurations = function() 
{
    if(this.m_configurations instanceof Object)
    {
        if(this.m_configurations["materials"] instanceof Object)
        {
            return this.m_configurations["materials"];
        }
    }
    return null;
};
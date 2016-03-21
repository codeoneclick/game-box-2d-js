/* global gb */

$.getScript("src/configurations/configuration_base.js");

gb.game_object_configuration = function()
{
    gb.configuration_base.call(this);
};

gb.game_object_configuration.prototype = Object.create(gb.configuration_base.prototype);
gb.game_object_configuration.prototype.constructor = gb.game_object_configuration;

gb.game_object_configuration.prototype.get_materials_configurations = function() 
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
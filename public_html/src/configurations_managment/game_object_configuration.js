/* global gb */

gb.game_object_configuration = function()
{
    gb.configuration_base.call(this);
    
    Object.defineProperty(this, 'materials_configurations', {
        get: function()
        {
            if(this.m_configurations instanceof Object)
            {
                if(this.m_configurations["materials_configurations"] instanceof Object)
                {
                    return this.m_configurations["materials_configurations"];
                }
            }
            return null;
        }
    });
};

gb.game_object_configuration.prototype = Object.create(gb.configuration_base.prototype);
gb.game_object_configuration.prototype.constructor = gb.game_object_configuration;
/* global gb */

$.getScript("src/configurations/configuration_base.js");

gb.main_technique_configuration = function()
{
    gb.configuration_base.call(this);
    this.json = null;
    
    Object.defineProperty(this, 'material_configuration', {
        get: function()
        {
            if(this.m_configurations instanceof Object)
            {
                if(this.m_configurations["material_configuration"] instanceof Object)
                {
                    if(this.m_configurations["material_configuration"].length > 0)
                    {
                        return this.m_configurations["material_configuration"][0];
                    }
                }
            }
            return null;
        }
    });
    
    Object.defineProperty(this, 'technique_name', {
        get: function()
        {
            return this.json.technique_name;
        }
    });
};

gb.main_technique_configuration.prototype = Object.create(gb.configuration_base.prototype);
gb.main_technique_configuration.prototype.constructor = gb.main_technique_configuration;

gb.main_technique_configuration.prototype.serialize = function(filename) 
{
    var self = this;
    $.ajax({ dataType: "json", url: filename, data: {}, async: false, success: function(value) {
        self.json = value;
        
        var configuration = new gb.material_configuration();
        configuration.serialize(self.json.material_filename);
        self.set_configuration("material_configuration", configuration);
    }});
};
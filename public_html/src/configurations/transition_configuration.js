/* global gb */

$.getScript("src/configurations/configuration_base.js");

gb.transition_configuration = function()
{
    gb.configuration_base.call(this);
    this.json = null;
    
    Object.defineProperty(this, 'guid', {
        get: function()
        {
            return this.json.guid;
        }
    });
    
    Object.defineProperty(this, 'main_technique_configuration', {
        get: function()
        {
            if(this.m_configurations instanceof Object)
            {
                if(this.m_configurations["main_technique_configuration"] instanceof Object)
                {
                    if(this.m_configurations["main_technique_configuration"].length > 0)
                    {
                        return this.m_configurations["main_technique_configuration"][0];
                    }
                }
            }
            return null;
        }
    });
    
    Object.defineProperty(this, 'ws_techniques_configurations', {
        get: function()
        {
            if(this.m_configurations instanceof Object)
            {
                if(this.m_configurations["ws_techniques_configurations"] instanceof Object)
                {
                    return this.m_configurations["ws_techniques_configurations"];
                }
            }
            return null;
        }
    });
    
    Object.defineProperty(this, 'ss_techniques_configurations', {
        get: function()
        {
            if(this.m_configurations instanceof Object)
            {
                if(this.m_configurations["ss_techniques_configurations"] instanceof Object)
                {
                    return this.m_configurations["ss_techniques_configurations"];
                }
            }
            return null;
        }
    });
};

gb.transition_configuration.prototype = Object.create(gb.configuration_base.prototype);
gb.transition_configuration.prototype.constructor = gb.transition_configuration;

gb.transition_configuration.prototype.serialize = function(filename) 
{
    var self = this;
    $.ajax({ dataType: "json", url: filename, data: {}, async: false, success: function(value) {
        self.json = value;
        
        var configuration = new gb.main_technique_configuration();
        configuration.serialize(self.json.main_technique_filename);
        self.set_configuration("main_technique_configuration", configuration);
        
        for(var i = 0; i < self.json.ws_techniques.length; ++i)
        {
            var configuration = new gb.ws_technique_configuration();
            configuration.serialize(self.json.ws_techniques[i].filename);
            self.set_configuration("ws_techniques_configurations", configuration);
        }
        
        for(var i = 0; i < self.json.ss_techniques.length; ++i)
        {
            var configuration = new gb.ws_technique_configuration();
            configuration.serialize(self.json.ss_techniques[i].filename);
            self.set_configuration("ss_techniques_configurations", configuration);
        }
    }});
};
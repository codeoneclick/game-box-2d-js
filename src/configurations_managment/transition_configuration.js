/* global gb */

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

gb.transition_configuration.prototype.serialize_main_technique_configuration = function(callback)
{
    var self = this;
    var main_technique_configuration = new gb.main_technique_configuration();
    main_technique_configuration.serialize(self.json.main_technique_filename, function(configuration) {
        self.set_configuration("main_technique_configuration", configuration);
        callback();
    });
};

gb.transition_configuration.prototype.serialize_ws_techniques_configurations = function(callback)
{
    var self = this;
    var configurations_count = self.json.ws_techniques.length;
    if(configurations_count > 0)
    {
        var waiting_configurations_count = configurations_count;
        for(var i = 0; i < configurations_count; ++i)
        {
            var ws_technique_configuration = new gb.ws_technique_configuration();
            ws_technique_configuration.serialize(self.json.ws_techniques[i].filename, function(configuration) {
                self.set_configuration("ws_techniques_configurations", configuration);
                waiting_configurations_count--;
                if(waiting_configurations_count === 0)
                {
                    callback();
                }
            });
        }
    }
    else
    {
        callback();
    }
};

gb.transition_configuration.prototype.serialize_ss_techniques_configurations = function(callback)
{
    var self = this;
    var configurations_count = self.json.ss_techniques.length;
    if(configurations_count > 0)
    {
        var waiting_configurations_count = configurations_count;
        for(var i = 0; i < configurations_count; ++i)
        {
            var ss_technique_configuration = new gb.ss_technique_configuration();
            ss_technique_configuration.serialize(self.json.ss_techniques[i].filename, function(configuration) {
                self.set_configuration("ss_techniques_configurations", configuration);
                waiting_configurations_count--;
                if(waiting_configurations_count === 0)
                {
                    callback();
                }
            });
        }
    }
    else
    {
        callback();
    }
};

gb.transition_configuration.prototype.serialize = function(filename, callback) 
{
    var self = this;
    $.ajax({ dataType: "json", url: filename, data: {}, async: true, success: function(value) {
        self.json = value;
        self.serialize_main_technique_configuration(function() {
           self.serialize_ws_techniques_configurations(function() {
              self.serialize_ss_techniques_configurations(function() {
                  callback(self);
              });
           });
        });
    }});
};
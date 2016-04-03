/* global gb */

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

gb.main_technique_configuration.prototype.serialize_material_configuration = function(callback)
{
    var self = this;
    var material_configuration = new gb.material_configuration();
    material_configuration.serialize(self.json.material_filename, function(configuration) {
        self.set_configuration("material_configuration", configuration);
        callback();
    });
};

gb.main_technique_configuration.prototype.serialize = function(filename, callback) 
{
    var self = this;
    $.ajax({ dataType: "json", url: filename, data: {}, async: true, success: function(value) {
        self.json = value;
        self.serialize_material_configuration(function() {
           callback(self);
        });
    }});
};
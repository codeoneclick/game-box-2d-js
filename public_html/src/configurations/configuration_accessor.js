/* global gb */

gb.configuration_accessor = function()
{

};

gb.configuration_accessor.prototype =
{
    constructor: gb.configuration_accessor,

    get_material_configuration: function(filename)
    {
        var configuration = new gb.material_configuration();
        configuration.serialize(filename);
        return configuration;
    },

    get_main_technique_configuration: function(filename)
    {
        var configuration = new gb.main_technique_configuration();
        configuration.serialize(filename);
        return configuration;
    },
    
    get_ws_technique_configuration: function(filename)
    {
        var configuration = new gb.ws_technique_configuration();
        configuration.serialize(filename);
        return configuration;
    },
    
    get_transition_configuration: function(filename)
    {
        var configuration = new gb.transition_configuration();
        configuration.serialize(filename);
        return configuration;
    }
};

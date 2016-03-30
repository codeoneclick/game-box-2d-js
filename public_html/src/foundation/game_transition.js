/* global gb, gl */

gb.game_transition = function(guid)
{
    this.m_guid = guid;
    this.m_configuration_accessor = null;
    this.m_resource_accessor = null;
    this.m_systems_feeder = new gb.ces_systems_feeder();
    
    Object.defineProperty(this, 'guid', {
        get: function()
        {
            return this.m_guid;
        }
    });
};

gb.game_transition.prototype =
{
    constructor: gb.game_transition,

    on_activated: function(configuration_accessor, resource_accessor)
    {
        this.m_configuration_accessor = configuration_accessor;
        this.m_resource_accessor = resource_accessor;
        
        var render_system = new gb.ces_render_system();
        var render_pipeline = render_system.render_pipeline;
        
        var transition_configuration = this.m_configuration_accessor.get_transition_configuration(this.m_fuid);
        
        for(var i = 0; i < transition_configuration.ws_techniques_configurations.length; ++i)
        {
            var ws_technique_configuration = transition_configuration.ws_techniques_configurations[i];
            var screen_width = Math.min(gl.viewport_width, ws_technique_configuration.screen_width);
            var screen_height = Math.min(gl.viewport_height, ws_technique_configuration.screen_height);
            
            var render_technique_ws = new gb.render_technique_ws(screen_width, screen_height, ws_technique_configuration.guid, 
                                                                 ws_technique_configuration.index, ws_technique_configuration.num_passes);
            var clear_color = new gb.vec4(ws_technique_configuration.clear_color_r,
                                          ws_technique_configuration.clear_color_g,
                                          ws_technique_configuration.clear_color_b,
                                          ws_technique_configuration.clear_color_a);
            render_technique_ws.clear_color = clear_color;
            render_pipeline.add_ws_render_technique(ws_technique_configuration.guid, ws_technique_configuration.index, render_technique_ws);
        }
    }
};

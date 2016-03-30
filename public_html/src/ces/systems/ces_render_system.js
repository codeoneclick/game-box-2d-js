/* global gb */

gb.ces_render_system = function()
{
    gb.ces_base_system.call(this);
    
    this.m_render_pipeline = new gb.render_pipeline();
    this.m_type = gb.ces_system_type.render;
    
    Object.defineProperty(this, 'render_pipeline', {
        get: function()
        {
            return this.m_render_pipeline;
        }
    });
};

gb.ces_render_system.prototype = Object.create(gb.ces_base_system.prototype);
gb.ces_render_system.prototype.constructor = gb.ces_render_system;

gb.ces_render_system.prototype.on_feed_start = function(deltatime) 
{
    this.m_render_pipeline.on_draw_begin();
};

gb.ces_render_system.prototype.on_feed = function(root, deltatime) 
{
    var ws_render_techniques = this.m_render_pipeline.ws_render_techniques;
    for(var i = 0; i < ws_render_techniques.length; ++i)
    {
        var technique = ws_render_techniques[i];
        var technique_name = technique.name;
        for(var technique_pass = 0; technique_pass < ws_render_techniques.num_passes; ++technique_pass)
        {
            draw_recursively(root, technique_name, technique_pass);
        }
    }
};

gb.ces_render_system.prototype.on_feed_end = function(deltatime) 
{
    this.m_render_pipeline.on_draw_end();
};

gb.ces_render_system.prototype.draw_recursively = function(entity, technique_name, technique_pass) 
{
    
};
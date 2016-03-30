/* global gb*/

gb.render_technique_base = function (width, height, name, index)
{
    this.m_name = name;
    this.m_frame_width = width;
    this.m_frame_height = height;
    this.m_index = index;
    this.m_clear_color = gb.vec4(0.0, 0.0, 0.0, 1.0);
    this.m_frame_buffer = null;
    
    Object.defineProperty(this, 'name', {
        get: function()
        {
            return this.m_name;
        }
    }); 
    
    Object.defineProperty(this, 'frame_width', {
        get: function()
        {
            return this.m_frame_width;
        }
    });
    
    Object.defineProperty(this, 'frame_height', {
        get: function()
        {
            return this.m_frame_height;
        }
    });

    Object.defineProperty(this, 'index', {
        get: function()
        {
            return this.m_index;
        }
    });
    
    Object.defineProperty(this, 'clear_color', {
        set: function(value)
        {
            return this.m_clear_color = value;
        }
    });
};

gb.render_technique_base.prototype = 
{ 
    constructor: gb.render_technique_base
};

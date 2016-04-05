/* global gb, gl */

gb.render_technique_ss = function(width, height, name, material)
{
    gb.render_technique_base.call(this, width, height, name, 0);
    
    var color_attachment_id = gl.createTexture();
    this.m_color_attachment_texture = gb.texture.construct(name + ".color", color_attachment_id, this.m_frame_width, this.m_frame_height);
    this.m_color_attachment_texture.wrap_mode = gl.CLAMP_TO_EDGE;
    this.m_color_attachment_texture.mag_filter = gl.LINEAR;
    this.m_color_attachment_texture.min_filter = gl.LINEAR;
    this.m_color_attachment_texture.bind();
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.m_frame_width, this.m_frame_height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    
    this.m_frame_buffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.m_frame_buffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, color_attachment_id, 0);
    
    var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if(status !== gl.FRAMEBUFFER_COMPLETE)
    {
        console.error("can't create framebuffer");
    }
    
    this.m_material = material;
    this.m_screen_quad = gb.mesh_constructor.create_screen_quad();
    
    Object.defineProperty(this, 'color_attachment_texture', {
        get: function()
        {
            return this.m_color_attachment_texture;
        }
    }); 
    
    Object.defineProperty(this, 'material', {
        get: function()
        {
            return this.m_material;
        }
    }); 
};

gb.render_technique_ss.prototype = Object.create(gb.render_technique_base.prototype);
gb.render_technique_ss.prototype.constructor = gb.render_technique_ss;

gb.render_technique_ss.prototype.bind = function()
{
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.m_frame_buffer);
    gl.viewport(0, 0, this.m_frame_width, this.m_frame_height);
    
    gl.disable(gl.DEPTH_TEST);
    gb.material_cached_parameters.get_cached_parameters().is_depth_test = false;
    gl.depthMask(false);
    gb.material_cached_parameters.get_cached_parameters().is_depth_mask = false;
    gl.disable(gl.STENCIL_TEST);
    gb.material_cached_parameters.get_cached_parameters().is_stencil_test = false;
    
    gl.clearColor(this.m_clear_color.x, this.m_clear_color.y, this.m_clear_color.z, this.m_clear_color.w);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    if(this.m_material.shader.get_status() === gb.resource_status.commited)
    {
        this.m_material.bind();
        this.m_screen_quad.bind(this.m_material.shader.get_attributes());
    }
};

gb.render_technique_ss.prototype.unbind = function()
{
    if(this.m_material.shader.get_status() === gb.resource_status.commited)
    {
        this.m_material.unbind();
        this.m_screen_quad.unbind(this.m_material.shader.get_attributes());
    }
};

gb.render_technique_ss.prototype.draw = function()
{
    if(this.m_material.shader.get_status() === gb.resource_status.commited)
    {
        this.m_screen_quad.draw();
    }
};
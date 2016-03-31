/* global gb, gl */

gb.render_technique_ws = function(width, height, name, index, num_passes)
{
    gb.render_technique_base.call(this, width, height, name, index);
    
    this.m_num_passes = Math.max(num_passes, 1);
    
    var color_attachment_id = gl.createTexture();
    this.m_color_attachment_texture = gb.texture.construct(name + ".color", color_attachment_id, this.m_frame_width, this.m_frame_height);
    this.m_color_attachment_texture.wrap_mode = gl.CLAMP_TO_EDGE;
    this.m_color_attachment_texture.mag_filter = gl.LINEAR;
    this.m_color_attachment_texture.min_filter = gl.LINEAR;
    this.m_color_attachment_texture.bind();
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.m_frame_width, this.m_frame_height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    
    this.m_depth_attachment_texture = null;
    
    var depth_attachment_id = gl.createRenderbuffer();
    gl.bindRenderbuffer(gl.RENDERBUFFER, depth_attachment_id);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, this.m_frame_width, this.m_frame_height);
    
    this.m_frame_buffer = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.m_frame_buffer);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, color_attachment_id, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, depth_attachment_id);
    
    var status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
    if(status !== gl.FRAMEBUFFER_COMPLETE)
    {
        console.error("can't create framebuffer");
    }
    
    Object.defineProperty(this, 'color_attachment_texture', {
        get: function()
        {
            return this.m_color_attachment_texture;
        }
    }); 
    
    Object.defineProperty(this, 'depth_attachment_texture', {
        get: function()
        {
            return this.m_depth_attachment_texture;
        }
    }); 
    
    Object.defineProperty(this, 'num_passes', {
        get: function()
        {
            return this.m_num_passes;
        }
    });
};

gb.render_technique_ws.prototype = Object.create(gb.render_technique_ws.prototype);
gb.render_technique_ws.prototype.constructor = gb.render_technique_main;

gb.render_technique_ws.prototype.bind = function()
{
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.m_frame_buffer);
    gl.viewport(0, 0, this.m_frame_width, this.m_frame_height);
    
    gl.enable(gl.DEPTH_TEST);
    gb.material_cached_parameters.get_cached_parameters().is_depth_test = true;
    gl.depthMask(gl.TRUE);
    gb.material_cached_parameters.get_cached_parameters().is_depth_mask = true;
    gl.enable(gl.STENCIL_TEST);
    gb.material_cached_parameters.get_cached_parameters().is_stencil_test = true;
    
    gl.clearColor(this.m_clear_color.x, this.m_clear_color.y, this.m_clear_color.z, this.m_clear_color.w);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
};

gb.render_technique_ws.prototype.unbind = function()
{
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
};

gb.render_technique_ws.prototype.draw = function()
{

};
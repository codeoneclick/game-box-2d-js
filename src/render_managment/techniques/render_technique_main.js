/* global gb, gl */

gb.render_technique_main = function(width, height, material)
{
    gb.render_technique_base.call(this, width, height, "render.technique.main", 0);
    this.m_material = material;
    this.m_screen_quad = gb.mesh_constructor.create_screen_quad();
    this.m_render_buffer = null;
};

gb.render_technique_main.prototype = Object.create(gb.render_technique_base.prototype);
gb.render_technique_main.prototype.constructor = gb.render_technique_main;

gb.render_technique_main.prototype.bind = function()
{
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.m_frame_buffer);
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.m_render_buffer);
    gl.viewport(0, 0, this.m_frame_width, this.m_frame_height);
    
    gl.disable(gl.DEPTH_TEST);
    gb.material_cached_parameters.get_cached_parameters().is_depth_test = false;
    gl.depthMask(false);
    gb.material_cached_parameters.get_cached_parameters().is_depth_mask = false;
    gl.disable(gl.STENCIL_TEST);
    gb.material_cached_parameters.get_cached_parameters().is_stencil_test = false;
    
    gl.clearColor(this.m_clear_color.x, this.m_clear_color.y, this.m_clear_color.z, this.m_clear_color.w);
    gl.clear(gl.COLOR_BUFFER_BIT);
    
    if(this.m_material.shader && this.m_material.shader.get_status() === gb.resource_status.commited)
    {
        this.m_material.bind();
        this.m_screen_quad.bind(this.m_material.shader.get_attributes());
    }
};

gb.render_technique_main.prototype.unbind = function()
{
    if(this.m_material.shader && this.m_material.shader.get_status() === gb.resource_status.commited)
    {
        this.m_material.unbind();
        this.m_screen_quad.unbind(this.m_material.shader.get_attributes());
    }
};

gb.render_technique_main.prototype.draw = function()
{
    if(this.m_material.shader && this.m_material.shader.get_status() === gb.resource_status.commited)
    {
        this.m_screen_quad.draw();
    }
};
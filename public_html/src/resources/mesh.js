/* global gb  */

gb.mesh = function(vbo, ibo, mode)
{
    this.m_vbo = vbo;
    this.m_ibo = ibo;
    this.m_mode = mode;
    
    Object.defineProperty(this, 'vbo', {
        get: function()
        {
            return this.m_vbo;
        }
    });
    
    Object.defineProperty(this, 'ibo', {
        get: function()
        {
            return this.m_ibo;
        }
    });  
};

gb.mesh.prototype = 
{ 
    constructor: gb.mesh,
    
    bind : function(attributes)
    {
        this.m_vbo.bind(attributes);
        this.m_ibo.bind();
    },
    
    unbind : function(attributes)
    {
        this.m_vbo.unbind(attributes);
        this.m_ibo.unbind();
    },
    
    draw : function()
    {
        gb.gl.drawElements(gb.gl.TRIANGLES, this.m_ibo.used_size, gb.gl.UNSIGNED_SHORT, 0);
    }
};
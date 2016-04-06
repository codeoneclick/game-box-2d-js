/* global gb, gl  */

var g_num_meshes = 0;

gb.mesh = function(vbo, ibo, mode)
{
    g_num_meshes++;
    console.log("created mesh, summ: ", g_num_meshes);
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
    
    destroy : function()
    {
        this.vbo.destroy();
        this.ibo.destroy();
    },

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
        gl.drawElements(gl.TRIANGLES, this.m_ibo.used_size, gl.UNSIGNED_SHORT, 0);
    }
};
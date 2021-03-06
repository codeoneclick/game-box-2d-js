/* global gb, gl */

gb.ibo = function(size, mode)
{
    this.m_handler = gl.createBuffer();
    this.m_allocated_size = size;
    this.m_used_size = 0;
    this.m_mode = mode;
    
    this.m_data = [];
    for(var i = 0; i < this.m_allocated_size; ++i)
    {
        this.m_data[i] = 0;
    }
    
    Object.defineProperty(this, 'allocated_size', {
        get: function()
        {
            return this.m_allocated_size;
        }
    });
    
    Object.defineProperty(this, 'used_size', {
        get: function()
        {
            return this.m_used_size;
        }
    });
};

gb.ibo.prototype = 
{ 
    constructor: gb.ibo,

    destroy : function()
    {
        gl.deleteBuffer(this.m_handler);
    },
    
    lock : function()
    {
        return this.m_data;
    },
    
    unlock: function()
    {
        this.m_used_size = arguments.length !== 0 && arguments[0] > 0 && arguments[0] < this.m_allocated_size ? arguments[0] : this.m_allocated_size;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.m_handler);
        var indices = [];
        for(var i = 0; i < this.m_used_size; ++i)
        {
            indices.push(this.m_data[i]);
        }
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.m_mode);
    },
    
    bind : function()
    {
        if(this.m_used_size !== 0)
        {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.m_handler);
        }
    },
    
    unbind : function()
    {
        if(this.m_used_size !== 0)
        {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
        }
    }
};
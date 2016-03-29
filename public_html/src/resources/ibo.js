/* global gb */

gb.ibo = function(size, mode)
{
    this.m_handler = gb.gl.createBuffer();
    this.m_allocated_size = size;
    this.m_used_size = 0;
    this.m_mode = mode;
    
    this.m_data = new Array();
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
    
    lock : function()
    {
        return this.m_data;
    },
    
    unlock: function()
    {
        this.m_used_size = arguments.length !== 0 && arguments[0] > 0 && arguments[0] < this.m_allocated_size ? arguments[0] : this.m_allocated_size;
        gb.gl.bindBuffer(gb.gl.ELEMENT_ARRAY_BUFFER, this.m_handler);
        gb.gl.bufferData(gb.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.m_data), this.m_mode);
    },
    
    bind : function()
    {
        if(this.m_used_size !== 0)
        {
            gb.gl.bindBuffer(gb.gl.ELEMENT_ARRAY_BUFFER, this.m_handler);
        }
    },
    
    unbind : function()
    {
        if(this.m_used_size !== 0)
        {
            gb.gl.bindBuffer(gb.gl.ELEMENT_ARRAY_BUFFER, null);
        }
    }
};
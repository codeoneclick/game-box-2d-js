/* global gb, INT16_MAX, INT16_MIN */

gb.vertex_attribute = function()
{
    this.m_position = new gb.vec2(0);
    this.m_texcoord = new gb.vec2(0);
    this.m_color = new gb.vec4(0);
    
    Object.defineProperty(this, 'position', {
        get: function()
        {
            return this.m_position;
        },
        set: function(value)
        {
            this.m_position = value;
        }
    });
    
    Object.defineProperty(this, 'texcoord', {
        get: function()
        {
            return this.m_texcoord;
        },
        set: function(value)
        {
            this.m_texcoord = value;
        }
    });
    
    Object.defineProperty(this, 'color', {
        get: function()
        {
            return this.m_color;
        },
        set: function(value)
        {
            this.m_color = value;
        }
    });
};

gb.vertex_attribute.prototype = 
{ 
    constructor: gb.vertex_attribute,
    
    to_array: function()
    {
        return new Array(this.m_position.x, this.m_position.y,
        this.m_texcoord.x, this.m_texcoord.y,
        this.m_color.x, this.m_color.y, this.m_color.z, this.m_color.w);
    }
};

gb.vbo = function(size, mode)
{
    this.m_handler = gb.gl.createBuffer();
    this.m_allocated_size = size;
    this.m_used_size = 0;
    this.m_mode = mode;
    this.m_min_bound = new gb.vec2(INT16_MAX);
    this.m_max_bound = new gb.vec2(INT16_MIN);
    
    this.m_data = new Array();
    for(var i = 0; i < this.m_allocated_size; ++i)
    {
        this.m_data[i] = new gb.vertex_attribute();
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
    
    Object.defineProperty(this, 'min_bound', {
        get: function()
        {
            return this.m_min_bound;
        }
    });
    
    Object.defineProperty(this, 'max_bound', {
        get: function()
        {
            return this.m_max_bound;
        }
    });
};

gb.vbo.prototype = 
{ 
    constructor: gb.vbo,
    
    lock : function()
    {
        return this.m_data;
    },
    
    unlock: function()
    {
        this.m_used_size = arguments.length !== 0 && arguments[0] > 0 && arguments[0] < this.m_allocated_size ? arguments[0] : this.m_allocated_size;
        gb.gl.bindBuffer(gb.gl.ARRAY_BUFFER, this.m_handler);
        var vertices = new Array();
        for(var i = 0; i < this.m_used_size; ++i)
        {
            var vertex_attribute_array = this.m_data[i].to_array();
            console.log(vertex_attribute_array);
            for(var j = 0; j < vertex_attribute_array.length; ++j)
            {
                vertices.push(vertex_attribute_array[j]);
            }
            var vertex_position = new gb.vec2(vertex_attribute_array[0], vertex_attribute_array[1]);
            this.m_min_bound = gb.vec2.min(vertex_position, this.m_min_bound);
            this.m_max_bound = gb.vec2.max(vertex_position, this.m_max_bound);
        }
        console.log(vertices);
        gb.gl.bufferData(gb.gl.ARRAY_BUFFER, new Float32Array(vertices), this.m_mode);
    },
    
    bind : function(attributes)
    {
        if(this.m_used_size !== 0)
        {
            gb.gl.bindBuffer(gb.gl.ARRAY_BUFFER, this.m_handler);
            if(attributes[gb.shader_attribute_type.position] >= 0)
            {
                gb.gl.vertexAttribPointer(attributes[gb.shader_attribute_type.position], 2, gb.gl.FLOAT, false, 4 * 8, 0);
                gb.gl.enableVertexAttribArray(attributes[gb.shader_attribute_type.position]);
            }
            if(attributes[gb.shader_attribute_type.texcoord] >= 0)
            {
                gb.gl.vertexAttribPointer(attributes[gb.shader_attribute_type.texcoord], 2, gb.gl.FLOAT, false, 4 * 8, 4 * 2);
                gb.gl.enableVertexAttribArray(attributes[gb.shader_attribute_type.texcoord]);
            }
            if(attributes[gb.shader_attribute_type.color] >= 0)
            {
                gb.gl.vertexAttribPointer(attributes[gb.shader_attribute_type.color], 4, gb.gl.FLOAT, false, 4 * 8, 4 * 4);
                gb.gl.enableVertexAttribArray(attributes[gb.shader_attribute_type.color]);
            }
        }
    },
    
    unbind : function(attributes)
    {
        if(this.m_used_size !== 0)
        {
            gb.gl.bindBuffer(gb.gl.ARRAY_BUFFER, this.m_handler);
            if(attributes[gb.shader_attribute_type.position] >= 0)
            {
                gb.gl.disableVertexAttribArray(attributes[gb.shader_attribute_type.position]);
            }
            if(attributes[gb.shader_attribute_type.texcoord] >= 0)
            {
                gb.gl.disableVertexAttribArray(attributes[gb.shader_attribute_type.texcoord]);
            }
            if(attributes[gb.shader_attribute_type.color] >= 0)
            {
                gb.gl.disableVertexAttribArray(attributes[gb.shader_attribute_type.color]);
            }
            gb.gl.bindBuffer(gb.gl.ARRAY_BUFFER, null);
        }
    }
};
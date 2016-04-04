/* global gb, gl */

gb.uniform_type = {
    mat4 : 0,
    mat4_array : 1,
    vec4 : 2,
    vec4_array : 3,
    vec3 : 4,
    vec3_array : 5,
    vec2 : 6,
    vec2_array : 7,
    f32 : 8,
    f32_array : 9,
    i32 : 10,
    i32_array : 11,
    sampler : 12
};

gb.shader_sampler_type = {
    sampler_01 : 0,
    sampler_02 : 1,
    sampler_03 : 2,
    sampler_04 : 3,
    sampler_05 : 4,
    sampler_06 : 5,
    sampler_07 : 6,
    sampler_08 : 7,
    max : 8
};
    
gb.shader_attribute_type = {
    position : 0,
    texcoord : 1,
    color : 2,
    max : 3
};
    
gb.shader_uniform_type = {
    mat_m : 0,
    mat_p : 1,
    mat_v : 2,
    max : 3
};

gb.attribute_names = {
    a_position : "a_position",
    a_texcoord : "a_texcoord",
    a_color : "a_color"
};
    
gb.uniform_names = {
    u_mat_m : "u_mat_m",
    u_mat_p : "u_mat_p",
    u_mat_v : "u_mat_v"
};
    
gb.sampler_names = {
    sampler_01 : "sampler_01",
    sampler_02 : "sampler_02",
    sampler_03 : "sampler_03",
    sampler_04 : "sampler_04",
    sampler_05 : "sampler_05",
    sampler_06 : "sampler_06",
    sampler_07 : "sampler_07",
    sampler_08 : "sampler_08"
};

gb.shader_uniform = function(type)
{
    this.m_type = type;
};

gb.shader_uniform.prototype = 
{ 
    constructor: gb.shader_uniform,
    
    set_mat4 : function(value)
    {
        this.m_mat4_value = value;
    },
    
    set_mat4_array : function(value)
    {
        this.m_mat4_array = value;
        this.m_array_size = value.length;
    },
    
    set_vec4 : function(value)
    {
        this.m_vec4_value = value;
    },
    
    set_vec4_array : function(value)
    {
        this.m_vec4_array = value;
        this.m_array_size = value.length;
    },
    
    set_vec3 : function(value)
    {
        this.m_vec3_value = value;
    },
    
    set_vec3_array : function(value)
    {
        this.m_vec3_array = value;
        this.m_array_size = value.length;
    },
    
    set_vec2 : function(value)
    {
        this.m_vec2_value = value;
    },
    
    set_vec2_array : function(value)
    {
        this.m_vec2_array = value;
        this.m_array_size = value.length;
    },
    
    set_f32 : function(value)
    {
        this.m_f32_value = value;
    },
    
    set_f32_array : function(value)
    {
        this.m_f32_array = value;
        this.m_array_size = value.length;
    },
    
    set_i32 : function(value)
    {
        this.m_i32_value = value;
    },
    
    set_i32_array : function(value)
    {
        this.m_i32_array = value;
        this.m_array_size = value.length;
    },
    
    set_sampler : function(texture, sampler)
    {
        this.m_texture = texture;
        this.m_sampler_value = sampler;
    },
    
    get_mat4 : function()
    {
       return this.m_mat4_value;
    },
    
    get_mat4_array : function()
    {
        return this.m_mat4_array;
    },
    
    get_vec4 : function()
    {
        return this.m_vec4_value;
    },
    
    get_vec4_array : function()
    {
        return this.m_vec4_array;
    },
    
    get_vec3 : function()
    {
        return this.m_vec3_value;
    },
    
    get_vec3_array : function()
    {
        return this.m_vec3_array;
    },
    
    get_vec2 : function()
    {
        return this.m_vec2_value;
    },
    
    get_vec2_array : function()
    {
        return this.m_vec2_array;
    },
    
    get_f32 : function(value)
    {
        return this.m_f32_value;
    },
    
    get_f32_array : function()
    {
        return this.m_f32_array;
    },
    
    get_i32 : function()
    {
        return this.m_i32_value;
    },
    
    get_i32_array : function()
    {
        return this.m_i32_array;
    },
    
    get_sampler : function()
    {
        return this.m_sampler_value;
    },
    
    get_texture : function()
    {
        return this.m_texture;
    },
    
    get_array_size : function()
    {
        return this.m_array_size;
    },
    
    get_type : function()
    {
        return this.m_type;
    }
};

gb.shader = function(guid)
{
    gb.resource_base.call(this, guid);
    
    this.m_type = gb.resource_type.shader;
    
    this.m_shader_id = -1;
    this.m_uniforms = [];
    this.m_uniforms[gb.shader_uniform_type.max - 1] = -1;
    this.m_samplers = [];
    this.m_samplers[gb.shader_sampler_type.max - 1] = -1;
    this.m_attributes = [];
    this.m_attributes[gb.shader_attribute_type.max -1] = -1;
    
    this.m_custom_uniforms = [];
    this.m_custom_attributes = [];
    
    this.m_cached_uniforms = [];
};

gb.shader.prototype = Object.create(gb.resource_base.prototype);
gb.shader.prototype.constructor = gb.shader;

gb.shader.prototype.setup = function()
{
    this.m_uniforms[gb.shader_uniform_type.mat_m] = gl.getUniformLocation(this.m_shader_id, gb.uniform_names.u_mat_m);
    this.m_uniforms[gb.shader_uniform_type.mat_v] = gl.getUniformLocation(this.m_shader_id, gb.uniform_names.u_mat_v);
    this.m_uniforms[gb.shader_uniform_type.mat_p] = gl.getUniformLocation(this.m_shader_id, gb.uniform_names.u_mat_p);
    
    this.m_samplers[gb.shader_sampler_type.sampler_01] = gl.getUniformLocation(this.m_shader_id, gb.sampler_names.sampler_01);
    this.m_samplers[gb.shader_sampler_type.sampler_02] = gl.getUniformLocation(this.m_shader_id, gb.sampler_names.sampler_02);
    this.m_samplers[gb.shader_sampler_type.sampler_03] = gl.getUniformLocation(this.m_shader_id, gb.sampler_names.sampler_03);
    this.m_samplers[gb.shader_sampler_type.sampler_04] = gl.getUniformLocation(this.m_shader_id, gb.sampler_names.sampler_04);
    this.m_samplers[gb.shader_sampler_type.sampler_05] = gl.getUniformLocation(this.m_shader_id, gb.sampler_names.sampler_05);
    this.m_samplers[gb.shader_sampler_type.sampler_06] = gl.getUniformLocation(this.m_shader_id, gb.sampler_names.sampler_06);
    this.m_samplers[gb.shader_sampler_type.sampler_07] = gl.getUniformLocation(this.m_shader_id, gb.sampler_names.sampler_07);
    this.m_samplers[gb.shader_sampler_type.sampler_08] = gl.getUniformLocation(this.m_shader_id, gb.sampler_names.sampler_08);
    
    this.m_attributes[gb.shader_attribute_type.position] = gl.getAttribLocation(this.m_shader_id, gb.attribute_names.a_position);
    this.m_attributes[gb.shader_attribute_type.texcoord] = gl.getAttribLocation(this.m_shader_id, gb.attribute_names.a_texcoord);
    this.m_attributes[gb.shader_attribute_type.color] = gl.getAttribLocation(this.m_shader_id, gb.attribute_names.a_color);
};

gb.shader.prototype.on_transfering_data_serialized = function(transfering_data)
{
    switch(transfering_data.type)
    {
        case gb.resource_transfering_data_type.shader :
        {
            this.m_status = gb.resource_status.loaded;
        }
        break;
    }
};
    
gb.shader.prototype.on_transfering_data_commited = function(transfering_data)
{
    switch(transfering_data.type)
    {
        case gb.resource_transfering_data_type.shader :
        {
            this.m_shader_id = transfering_data.shader_id;
            this.m_status = gb.resource_status.commited;
            this.setup();
        }
        break;
    }  
};

gb.shader.prototype.get_attributes = function()
{
    return this.m_attributes;
};

gb.shader.prototype.get_custom_uniform = function(uniform)
{
    var handler = -1;
    if(typeof this.m_custom_uniforms[uniform] !== 'undefined')
    {
        handler = this.m_custom_uniforms[uniform];
    }
    else
    {
        handler = gl.getUniformLocation(this.m_shader_id, uniform);
        this.m_custom_uniforms[uniform] = handler;
    }
    return this;
};

gb.shader.prototype.set_mat4 = function(value, uniform)
{
    if(this.get_status() === gb.resource_status.commited)
    {
        if(typeof this.m_cached_uniforms[uniform] !== 'undefined' && this.m_cached_uniforms[uniform] === value)
        {
            return;
        }
        else if(typeof this.m_cached_uniforms[uniform] === 'undefined')
        {
            this.m_cached_uniforms[uniform] = new gb.shader_uniform(gb.uniform_type.mat4);
        }
        var handler = this.m_uniforms[uniform];
        gl.uniformMatrix4fv(handler, gl.FALSE, new Float32Array(value.to_array()));
        this.m_cached_uniforms[uniform].set_mat4(value);
    }
};

gb.shader.prototype.set_custom_mat4 = function(value, uniform)
{
    if(this.get_status() === gb.resource_status.commited)
    {
        gl.uniformMatrix4fv(this.get_custom_uniform(uniform), gl.FALSE, new Float32Array(value.to_array()));
    }
};

gb.shader.prototype.set_vec4 = function(value, uniform)
{
    if(this.get_status() === gb.resource_status.commited)
    {
        if(typeof this.m_cached_uniforms[uniform] !== 'undefined' && this.m_cached_uniforms[uniform] === value)
        {
            return;
        }
        else if(typeof this.m_cached_uniforms[uniform] === 'undefined')
        {
            this.m_cached_uniforms[uniform] = new gb.shader_uniform(gb.uniform_type.vec4);
        }
        var handler = this.m_uniforms[uniform];
        gl.uniform4fv(handler, gl.FALSE, new Float32Array(value));
        this.m_cached_uniforms[uniform].set_vec4(value);
    }
};

gb.shader.prototype.set_custom_vec4 = function(value, uniform)
{
    if(this.get_status() === gb.resource_status.commited)
    {
        gl.uniform4fv(this.get_custom_uniform(uniform), gl.FALSE, new Float32Array(value));
    }
};

gb.shader.prototype.set_vec3 = function(value, uniform)
{
    if(this.get_status() === gb.resource_status.commited)
    {
        if(typeof this.m_cached_uniforms[uniform] !== 'undefined' && this.m_cached_uniforms[uniform] === value)
        {
            return;
        }
        else if(typeof this.m_cached_uniforms[uniform] === 'undefined')
        {
            this.m_cached_uniforms[uniform] = new gb.shader_uniform(gb.uniform_type.vec3);
        }
        var handler = this.m_uniforms[uniform];
        gl.uniform3fv(handler, gl.FALSE, new Float32Array(value));
        this.m_cached_uniforms[uniform].set_vec3(value);
    }
};

gb.shader.prototype.set_custom_vec3 = function(value, uniform)
{
    if(this.get_status() === gb.resource_status.commited)
    {
        gl.uniform3fv(this.get_custom_uniform(uniform), gl.FALSE, new Float32Array(value));
    }
};

gb.shader.prototype.set_vec2 = function(value, uniform)
{
    if(this.get_status() === gb.resource_status.commited)
    {
        if(typeof this.m_cached_uniforms[uniform] !== 'undefined' && this.m_cached_uniforms[uniform] === value)
        {
            return;
        }
        else if(typeof this.m_cached_uniforms[uniform] === 'undefined')
        {
            this.m_cached_uniforms[uniform] = new gb.shader_uniform(gb.uniform_type.vec2);
        }
        var handler = this.m_uniforms[uniform];
        gl.uniform2fv(handler, gl.FALSE, new Float32Array(value));
        this.m_cached_uniforms[uniform].set_vec2(value);
    }
};

gb.shader.prototype.set_custom_vec2 = function(value, uniform)
{
    if(this.get_status() === gb.resource_status.commited)
    {
        gl.uniform2fv(this.get_custom_uniform(uniform), gl.FALSE, new Float32Array(value));
    }
};

gb.shader.prototype.set_f32 = function(value, uniform)
{
    if(this.get_status() === gb.resource_status.commited)
    {
        if(typeof this.m_cached_uniforms[uniform] !== 'undefined' && this.m_cached_uniforms[uniform] === value)
        {
            return;
        }
        else if(typeof this.m_cached_uniforms[uniform] === 'undefined')
        {
            this.m_cached_uniforms[uniform] = new gb.shader_uniform(gb.uniform_type.f32);
        }
        var handler = this.m_uniforms[uniform];
        gl.uniform1f(handler, gl.FALSE, value);
        this.m_cached_uniforms[uniform].set_f32(value);
    }
};

gb.shader.prototype.set_custom_f32 = function(value, uniform)
{
    if(this.get_status() === gb.resource_status.commited)
    {
        gl.uniform1f(this.get_custom_uniform(uniform), value);
    }
};

gb.shader.prototype.set_i32 = function(value, uniform)
{
    if(this.get_status() === gb.resource_status.commited)
    {
        if(typeof this.m_cached_uniforms[uniform] !== 'undefined' && this.m_cached_uniforms[uniform] === value)
        {
            return;
        }
        else if(typeof this.m_cached_uniforms[uniform] === 'undefined')
        {
            this.m_cached_uniforms[uniform] = new gb.shader_uniform(gb.uniform_type.i32);
        }
        var handler = this.m_uniforms[uniform];
        gl.uniform1i(handler, gl.FALSE, value);
        this.m_cached_uniforms[uniform].set_i32(value);
    }
};

gb.shader.prototype.set_custom_i32 = function(value, uniform)
{
    if(this.get_status() === gb.resource_status.commited)
    {
        gl.uniform1i(this.get_custom_uniform(uniform), value);
    }
};

gb.shader.prototype.set_texture = function(texture, sampler)
{
    if(this.get_status() === gb.resource_status.commited && sampler < gb.shader_sampler_type.max)
    {
        gl.activeTexture(gl.TEXTURE0 + sampler);
        texture.bind();
        gl.uniform1i(this.m_samplers[sampler], sampler);
    }
};

gb.shader.prototype.bind = function()
{
    if(this.get_status() === gb.resource_status.commited)
    {
        gl.useProgram(this.m_shader_id);
    }
};

gb.shader.prototype.unbind = function()
{
    if(this.get_status() === gb.resource_status.commited)
    {
        gl.useProgram(null);
    }
};


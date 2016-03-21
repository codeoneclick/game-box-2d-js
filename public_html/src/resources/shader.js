/* global gb */

$.getScript("src/resources/resource_base.js");

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
    this.m_uniforms = new Array();
    this.m_uniforms[gb.shader_uniform_type.max - 1] = -1;
    this.m_samplers = new Array();
    this.m_samplers[gb.shader_sampler_type.max - 1] = -1;
    this.m_attributes = new Array();
    this.m_attributes[gb.shader_attribute_type.max -1] = -1;
    
    this.m_custom_uniforms = new Array();
    this.m_custom_attributes = new Array();
    
    this.m_cached_uniforms = new Array();
};

gb.shader.prototype = Object.create(gb.resource_base.prototype);
gb.shader.prototype.constructor = gb.shader;

gb.shader.prototype.setup = function()
{
    this.m_uniforms[gb.shader_uniform_type.mat_m] = gb.gl.getUniformLocation(this.m_shader_id, gb.uniform_names.u_mat_m);
    this.m_uniforms[gb.shader_uniform_type.mat_v] = gb.gl.getUniformLocation(this.m_shader_id, gb.uniform_names.u_mat_v);
    this.m_uniforms[gb.shader_uniform_type.mat_p] = gb.gl.getUniformLocation(this.m_shader_id, gb.uniform_names.u_mat_p);
    
    this.m_uniforms[gb.shader_sampler_type.sampler_01] = gb.gl.getUniformLocation(this.m_shader_id, gb.sampler_names.sampler_01);
    this.m_uniforms[gb.shader_sampler_type.sampler_02] = gb.gl.getUniformLocation(this.m_shader_id, gb.sampler_names.sampler_02);
    this.m_uniforms[gb.shader_sampler_type.sampler_03] = gb.gl.getUniformLocation(this.m_shader_id, gb.sampler_names.sampler_03);
    this.m_uniforms[gb.shader_sampler_type.sampler_04] = gb.gl.getUniformLocation(this.m_shader_id, gb.sampler_names.sampler_04);
    this.m_uniforms[gb.shader_sampler_type.sampler_05] = gb.gl.getUniformLocation(this.m_shader_id, gb.sampler_names.sampler_05);
    this.m_uniforms[gb.shader_sampler_type.sampler_06] = gb.gl.getUniformLocation(this.m_shader_id, gb.sampler_names.sampler_06);
    this.m_uniforms[gb.shader_sampler_type.sampler_07] = gb.gl.getUniformLocation(this.m_shader_id, gb.sampler_names.sampler_07);
    this.m_uniforms[gb.shader_sampler_type.sampler_08] = gb.gl.getUniformLocation(this.m_shader_id, gb.sampler_names.sampler_08);
    
    this.m_attributes[gb.shader_attribute_type.position] = gb.gl.getAttribLocation(this.m_shader_id, gb.attribute_names.a_position);
    this.m_attributes[gb.shader_attribute_type.texcoord] = gb.gl.getAttribLocation(this.m_shader_id, gb.attribute_names.a_texcoord);
    this.m_attributes[gb.shader_attribute_type.color] = gb.gl.getAttribLocation(this.m_shader_id, gb.attribute_names.a_color);
};

gb.shader.prototype.on_transfering_data_serialized = function(data)
{
    switch(data.get_type())
    {
        case gb.resource_transfering_data_type.shader :
        {
            this.m_status = gb.resource_status.loaded;
        }
        break;
    }
};
    
gb.shader.prototype.on_transfering_data_commited = function(data)
{
    switch(data.get_type())
    {
        case gb.resource_transfering_data_type.shader :
        {
            this.m_shader_id = data.get_shader_id();
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
            this.m_cached_uniforms[uniform] = gb.shader_uniform(gb.uniform_type.mat4);
        }
        var handler = this.m_uniforms[uniform];
        gb.gl.uniformMatrix4fv(handler, gb.gl.FALSE, new Float32Array(value));
        this.m_cached_uniforms[uniform].set_mat4(value);
    }
};

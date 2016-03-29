/* global gb, gl */

var g_string_to_glenum = null;

gb.configuration_base = function()
{
    this.m_attributes = new Array();
    this.m_configurations = new Array();
};

gb.configuration_base.string_to_glenum = function() 
{
    if(g_string_to_glenum === null)
    {
        g_string_to_glenum = new Array();
        g_string_to_glenum["GL_FRONT"] = gl.FRONT;
        g_string_to_glenum["GL_BACK"] = gl.BACK;
        g_string_to_glenum["GL_SRC_COLOR"] = gl.SRC_ALPHA;
        g_string_to_glenum["GL_SRC_ALPHA"] = gl.SRC_ALPHA;
        g_string_to_glenum["GL_ONE"] = gl.ONE;
        g_string_to_glenum["GL_ZERO"] = gl.ZERO;
        g_string_to_glenum["GL_ONE_MINUS_SRC_COLOR"] = gl.ONE_MINUS_SRC_COLOR;
        g_string_to_glenum["GL_ONE_MINUS_DST_COLOR"] = gl.ONE_MINUS_DST_COLOR;
        g_string_to_glenum["GL_ONE_MINUS_SRC_ALPHA"] = gl.ONE_MINUS_SRC_ALPHA;
        g_string_to_glenum["GL_ONE_MINUS_DST_ALPHA"] = gl.ONE_MINUS_DST_ALPHA;
        g_string_to_glenum["GL_DST_ALPHA"] = gl.DST_ALPHA;
        g_string_to_glenum["GL_CONSTANT_ALPHA"] = gl.CONSTANT_ALPHA;
        g_string_to_glenum["GL_REPEAT"] = gl.REPEAT;
        g_string_to_glenum["GL_CLAMP_TO_EDGE"] = gl.CLAMP_TO_EDGE;
        g_string_to_glenum["GL_MIRRORED_REPEAT"] = gl.MIRRORED_REPEAT;
        g_string_to_glenum["GL_NEAREST"] = gl.NEAREST;
        g_string_to_glenum["GL_LINEAR"] = gl.LINEAR;
        g_string_to_glenum["GL_MIPMAP"] = gl.LINEAR_MIPMAP_NEAREST;
        g_string_to_glenum["GL_ALWAYS"] = gl.ALWAYS;
        g_string_to_glenum["GL_EQUAL"] = gl.EQUAL;
        g_string_to_glenum["GL_NOTEQUAL"] = gl.NOTEQUAL;
        g_string_to_glenum["GL_FUNC_ADD"] = gl.FUNC_ADD; 
    }
    return g_string_to_glenum;
};

gb.configuration_base.prototype = 
{ 
    constructor: gb.configuration_base,
    
    clone: function() 
    {
        return new this.constructor();
    },

    copy: function(value)
    {
	this.m_attributes = value.m_attributes;
	this.m_configurations = value.m_configurations;
	return this;
    },
    
    set_attribute: function(name, value)
    {
        this.m_attributes[name] = value;
        return this;
    },
    
    set_configuration: function(name, value, index)
    {
        if(this.m_configurations[name] instanceof Object)
        {
            if(arguments.length === 3)
            {
                if(index >= 0 && index < this.m_configurations[name].length)
                {
                    this.m_configurations[name][index] = value;
                }
                else
                {
                    this.m_configurations[name].push(value);
                }
            }
            else
            {
                this.m_configurations[name].push(value);
            }
        }
        else
        {
            this.m_configurations[name] = new Array();
            this.m_configurations[name].push(value);
        }
        return this;
    }
};

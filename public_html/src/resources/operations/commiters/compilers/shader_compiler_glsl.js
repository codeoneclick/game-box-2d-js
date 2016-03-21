/* global gb */

gb.shader_compiler_glsl = function()
{
    this.m_vs_shader_header = "precision highp float;\n\
    #if defined(__OPENGL_30__)\n\
    layout (location = 0) in vec2 a_position;\n\
    layout (location = 1) in vec2 a_texcoord;\n\
    layout (location = 4) in vec4 a_color;\n\
    #else\n\
    attribute vec2 a_position;\n\
    attribute vec2 a_texcoord;\n\
    attribute vec4 a_color;\n\
    #endif\n";
    
    this.m_fs_shader_header = "precision highp float;\n\
    #if defined(__OPENGL_30__)\n\
    layout (location = 0) out vec4 attachment_01;\n\
    #define gl_FragColor attachment_01\n\
    #define texture2D texture\n\
    #endif\n";
};

gb.shader_compiler_glsl.prototype = 
{ 
    constructor: gb.shader_compiler_glsl,
   
    compile: function(source_code, shader_type)
    {
        var handler = gb.gl.createShader(shader_type);
        if(!handler)
        {
            console.error("can't create shader");
            return -1;
        }
        
        gb.gl.shaderSource(handler, shader_type === gb.gl.VERTEX_SHADER ? 
        (this.m_vs_shader_header + source_code).trim() :
        (this.m_fs_shader_header + source_code).trim());
        gb.gl.compileShader(handler);
        
        var compile_message = gb.gl.getShaderInfoLog(handler) || "";
        if(!gb.gl.getShaderParameter(handler, gb.gl.COMPILE_STATUS))
        {
            console.error(compile_message);
        }
        return handler;
    },
    
    link: function(vs_handler, fs_handler)
    {
        var shader_handler = gb.gl.createProgram();
        gb.gl.attachShader(shader_handler, vs_handler);
        gb.gl.attachShader(shader_handler, fs_handler);
        
        gb.gl.linkProgram(shader_handler);
        
        var link_message = gb.gl.getProgramInfoLog(shader_handler) || "";
        
        if(!gb.gl.getProgramParameter(shader_handler, gb.gl.LINK_STATUS))
        {
            console.error(link_message);
            
            gb.gl.detachShader(shader_handler, vs_handler);
            gb.gl.detachShader(shader_handler, fs_handler);
            gb.gl.deleteShader(vs_handler);
            gb.gl.deleteShader(fs_handler);
            
            shader_handler = -1;
        }
        return shader_handler;
    }
};


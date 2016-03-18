/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.getScript("src/render/graphics_context.js");

function shader_compiler_glsl ()
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
}

shader_compiler_glsl.prototype = 
{ 
    constructor: shader_compiler_glsl,
   
    compile: function(source_code, shader_type)
    {
        var handler = graphics_context.get_instance().createShader(shader_type);
        if(!handler)
        {
            console.error("can't create shader");
            return -1;
        }
        
        graphics_context.get_instance().shaderSource(handler, shader_type === graphics_context.get_instance().VERTEX_SHADER ? 
        (this.m_vs_shader_header + source_code).trim() :
        (this.m_fs_shader_header + source_code).trim());
        graphics_context.get_instance().compileShader(handler);
        
        var compile_message = graphics_context.get_instance().getShaderInfoLog(handler) || "";
        if(!graphics_context.get_instance().getShaderParameter(handler, graphics_context.get_instance().COMPILE_STATUS))
        {
            console.error(compile_message);
        }
        return handler;
    },
    
    link: function(vs_handler, fs_handler)
    {
        var shader_handler = graphics_context.get_instance().createProgram();
        graphics_context.get_instance().attachShader(shader_handler, vs_handler);
        graphics_context.get_instance().attachShader(shader_handler, fs_handler);
        
        graphics_context.get_instance().linkProgram(shader_handler);
        
        var link_message = graphics_context.get_instance().getProgramInfoLog(shader_handler) || "";
        
        if(!graphics_context.get_instance().getProgramParameter(shader_handler, graphics_context.get_instance().LINK_STATUS))
        {
            console.error(link_message);
            
            graphics_context.get_instance().detachShader(shader_handler, vs_handler);
            graphics_context.get_instance().detachShader(shader_handler, fs_handler);
            graphics_context.get_instance().deleteShader(vs_handler);
            graphics_context.get_instance().deleteShader(fs_handler);
            
            shader_handler = -1;
        }
        return shader_handler;
    }
};


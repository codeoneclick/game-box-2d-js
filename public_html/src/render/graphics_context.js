/* global gb */

var g_graphics_context = null;

var graphics_context = (function() 
{
    function init()
    {
        var canvas = document.getElementById("gl_canvas");
        try 
        {
            g_graphics_context = canvas.getContext("experimental-webgl");
            g_graphics_context.viewportWidth = canvas.width;
            g_graphics_context.viewportHeight = canvas.height;
            console.log("OpenGL context created");
            console.log("viewport: [ " + canvas.width + ", " + canvas.height + " ]");
        } 
        catch (exception) 
        {
                    
        }
        if (!g_graphics_context) 
        {
            alert("could not initialise gl context");
        }
        else
        {
            g_graphics_context.clearColor(0.0, 0.0, 0.0, 1.0);
            g_graphics_context.enable(g_graphics_context.DEPTH_TEST);
                    
            g_graphics_context.viewport(0, 0, g_graphics_context.viewportWidth, g_graphics_context.viewportHeight);
            g_graphics_context.clear(g_graphics_context.COLOR_BUFFER_BIT | g_graphics_context.DEPTH_BUFFER_BIT);
        }
        return g_graphics_context;
    }
 
    return {
        get_instance: function() 
        {
            if (!g_graphics_context)
            {
                g_graphics_context = init();
            }
            return g_graphics_context;
        }
    };
})();

var gl = (function() 
{
    return graphics_context.get_instance();
})();

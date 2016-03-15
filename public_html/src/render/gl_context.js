/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gl_context = (function (window) 
{
    var gl_context_instance = null;
 
    function init()
    {
        gl_context_instance = window.webgl_context;
    }
 
    return {
        get_instance: function() 
        {
            if (!gl_context_instance)
            {
                gl_context_instance = init();
            }
            return gl_context_instance;
        }
    };
})(window);
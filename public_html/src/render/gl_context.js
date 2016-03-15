/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gl_context = (function() 
{
    var m_instance = null;
 
    function init()
    {
        var canvas = document.getElementById("gl_canvas");
        try 
        {
            m_instance = canvas.getContext("experimental-webgl");
            m_instance.viewportWidth = canvas.width;
            m_instance.viewportHeight = canvas.height;
        } 
        catch (exception) 
        {
                    
        }
        if (!m_instance) 
        {
            alert("could not initialise gl context");
        }
        else
        {
            m_instance.clearColor(0.0, 0.0, 0.0, 1.0);
            m_instance.enable(m_instance.DEPTH_TEST);
                    
            m_instance.viewport(0, 0, m_instance.viewportWidth, m_instance.viewportHeight);
            m_instance.clear(m_instance.COLOR_BUFFER_BIT | m_instance.DEPTH_BUFFER_BIT);
        }
    }
 
    return {
        get_instance: function() 
        {
            if (!m_instance)
            {
                m_instance = init();
            }
            return m_instance;
        }
    };
})();
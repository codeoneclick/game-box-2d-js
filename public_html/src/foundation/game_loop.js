/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var game_loop = (function(window) 
{
    var m_instance = null;
    
    function on_update()
    {
        m_instance.attach_to_runloop()(on_update);
    }
 
    function init()
    {
        m_instance = new Object();
        
        m_instance.attach_to_runloop = function() {
        return window.requestAnimationFrame ||
               window.webkitRequestAnimationFrame ||
               window.mozRequestAnimationFrame ||
               window.oRequestAnimationFrame ||
               window.msRequestAnimationFrame ||
               function(callback)
               {
                    window.setTimeout(callback, 1000/60);
               };
        };
        
        return {
            instance : m_instance,
            attach_to_runloop : m_instance.attach_to_runloop
        };
    }
 
    return {
        get_instance: function() 
        {
            if (!m_instance)
            {
                m_instance = init().instance;
                on_update();
            }
            return m_instance;
        }
    };
})(window);

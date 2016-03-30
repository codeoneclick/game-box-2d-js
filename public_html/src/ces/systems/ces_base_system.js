/* global gb */

gb.ces_system_type = {
    undefined : "undefined",
    render : "render"
};

gb.ces_base_system = function()
{
    this.m_type = gb.ces_system_type.undefined;
    this.m_priority = 0;
    
    Object.defineProperty(this, 'type', {
        get: function()
        {
            return this.m_type;
        }
    });
    
    Object.defineProperty(this, 'priority', {
        get: function()
        {
            return this.m_priority;
        }
    });
};

gb.ces_base_system.prototype =
{
    constructor: gb.ces_base_system
};
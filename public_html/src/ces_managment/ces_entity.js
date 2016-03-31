/* global gb */

var g_tag = 0;

gb.ces_entity = function()
{
    this.m_tag = "ces_entity" + g_tag++;
    
    this.m_components = new Array();
    
    this.m_parent = null;
    this.m_children = new Array();
    this.m_ordered_children = new Array();
    
    this.m_visible = true;
    
    Object.defineProperty(this, 'tag', {
        set: function(value)
        {
            this.m_tag = value;
        },
        get: function()
        {
            return this.m_tag;
        }
    });
    
    Object.defineProperty(this, 'parent', {
        set: function(value)
        {
            this.m_parent = value;
        },
        get: function()
        {
            return this.m_parent;
        }
    });
    
    Object.defineProperty(this, 'children', {
        set: function(value)
        {
            this.m_ordered_children = value;
        },
        get: function()
        {
            return this.m_ordered_children;
        }
    });
    
    Object.defineProperty(this, 'visible', {
        set: function(value)
        {
            this.m_visible = value;
        },
        get: function()
        {
            return this.m_visible;
        }
    });
};

gb.ces_entity.prototype =
{
    constructor: gb.ces_entity,

    add_component: function(component)
    {

    }
};

/* global gb */

gb.ces_systems_feeder = function(guid)
{
    this.m_systems = new Array();
    this.m_ordered_systems = new Array();
    this.m_root = null;
    
    Object.defineProperty(this, 'root', {
        set: function(value)
        {
            this.m_root = value;
        }
    });
};

gb.ces_systems_feeder.prototype =
{
    constructor: gb.ces_systems_feeder,

    on_update: function(deltatime)
    {
       for(var i = 0; i < this.m_ordered_systems.length; ++i)
       {
           var system = this.m_ordered_systems[i];
           system.on_feed_start(deltatime);
       }
       for(var i = 0; i < this.m_ordered_systems.length; ++i)
       {
           var system = this.m_ordered_systems[i];
           system.on_feed(this.m_root, deltatime);
       }
       for(var i = 0; i < this.m_ordered_systems.length; ++i)
       {
           var system = this.m_ordered_systems[i];
           system.on_feed_end(deltatime);
       }
    },

    add_system: function(system)
    {
        this.m_ordered_systems.push(system);
        this.m_systems[system.type] = system;
    },
    
    remove_system: function(system)
    {

    }
};

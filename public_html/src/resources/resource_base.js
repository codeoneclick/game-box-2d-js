/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.getScript("lib/underscore/underscore-min.js");

gb.resource_type = {
    undefined : 0,
    shader : 1,
    texture : 2
};

gb.resource_status = {
    unloaded : 0,
    loaded : 1,
    commited : 2
};

gb.resource_base = function (guid)
{
    this.m_guid = guid;
    this.m_type = gb.resource_type.undefined;
    this.m_status = gb.resource_status.unloaded;
    
    this.m_listeners = new Array();
    this.m_callbacks = new Array();
}

gb.resource_base.prototype = 
{ 
    constructor: gb.resource_base,
    
    get_guid: function()
    {
        return this.m_guid;
    },
    
    get_type: function()
    {
        return this.m_type;
    },
    
    get_status: function()
    {
        return this.m_status;
    },
    
    on_transfering_data_serialized: function()
    {
        
    },
    
    on_transfering_data_commited: function()
    {
        
    },
    
    on_resource_loaded: function(success)
    {
        for(var i = 0; i < this.m_listeners.length; ++i)
        {
            var listener = this.m_listeners[i];
            listener.on_resource_loaded(success ? this : null);
        }
        
        for(var i = 0; i < this.m_callbacks.length; ++i)
        {
            var callback = this.m_callbacks[i];
            callback(success ? this : null);
        }
        
        this.m_listeners = new Array();
        this.m_callbacks = new Array();
    },
    
    add_resource_loading_listener: function(listener)
    {
        if(_.isFunction(listener.on_resource_loaded))
        {
            if(!_.contains(this.m_listeners, listener))
            {
                this.m_listeners.push(listener);
            }
            else
            {
                console.error("can't add same listener for resource loading");
            }
        }
        else
        {
            console.error("resource loading listener doesn't contain on_resource_loaded method");
        }
    },
    
    remove_resource_loading_listener: function(listener)
    {
        var index = _.indexOf(this.m_listeners, listener);
        if(index !== -1)
        {
            this.m_listeners.splice(index, 1);
        }
        else
        {
            console.error("resource doesn't contain this listener");
        }
    },
    
    add_resource_loading_callback: function(callback)
    {
        if(_.isFunction(callback))
        {
            if(!_.contains(this.m_callbacks, callback))
            {
                this.m_callbacks.push(callback);
            }
            else
            {
                console.error("can't add same callback for resource loading");
            }
        }
        else
        {
            console.error("resource loading callback isn't function");
        }
    },
    
    remove_resource_loading_callback: function(callback)
    {
        var index = _.indexOf(this.m_callbacks, callback);
        if(index !== -1)
        {
            this.m_callbacks.splice(index, 1);
        }
        else 
        {
            console.error("resource doesn't contain this callback");
        }
    }
};

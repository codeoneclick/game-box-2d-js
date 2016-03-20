/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.getScript("lib/underscore/underscore-min.js");

var k_resource_type_undefined = 0;
var k_resource_type_shader = 1;
var k_resource_type_texture = 2;

var k_resource_status_unloaded = 0;
var k_resource_status_loaded = 1;
var k_resource_status_commited = 2;

function resource_base (guid)
{
    this.m_guid = guid;
    this.m_type = k_resource_type_undefined;
    this.m_status = k_resource_status_unloaded;
    
    this.m_listeners = new Array();
    this.m_callbacks = new Array();
}

resource_base.prototype = 
{ 
    constructor: resource_base,
    
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

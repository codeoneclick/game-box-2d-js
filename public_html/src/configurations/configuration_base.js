/* global gb */

gb.configuration_base = function()
{
    this.m_attributes = new Array();
    this.m_configurations = new Array();
};

gb.configuration_base.prototype = 
{ 
    constructor: gb.configuration_base,
    
    clone: function() 
    {
        return new this.constructor();
    },

    copy: function(value)
    {
	this.m_attributes = value.m_attributes;
	this.m_configurations = value.m_configurations;
	return this;
    },
    
    set_attribute: function(name, value)
    {
        this.m_attributes[name] = value;
        return this;
    },
    
    set_configuration: function(name, value, index)
    {
        if(this.m_configurations[name] instanceof Object)
        {
            if(arguments.length === 3)
            {
                if(index >= 0 && index < this.m_configurations[name].length)
                {
                    this.m_configurations[name][index] = value;
                }
                else
                {
                    this.m_configurations[name].push(value);
                }
            }
            else
            {
                this.m_configurations[name].push(value);
            }
        }
        else
        {
            this.m_configurations[name] = new Array();
            this.m_configurations[name].push(value);
        }
        return this;
    }
};

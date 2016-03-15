/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$.getScript("src/utils/debug.js");

function vec2 ()
{
    if(typeof arguments[0] === 'vec2')
    {
        this.x = arguments[0].get_x();
        this.y = arguments[0].get_y();
    }
    else if(arguments.length === 1)
    {
        this.x = arguments[0];
        this.y = arguments[0];
    }
    else if(arguments.length === 2)
    {
        this.x = arguments[0];
        this.y = arguments[1];
    }
    else
    {
        this.x = 0;
        this.y = 0;
    }
}

vec2.prototype = 
{ 
    constructor: vec2,
    
    clone: function() 
    {
        return new this.constructor(this.x, this.y);
    },

    copy: function(value)
    {
	this.x = value.x;
	this.y = value.y;
	return this;
    },
    
    set_x: function(value)
    {
        this.x = value;
        return this;
    },
    
    set_y: function(value)
    {
        this.y = value;
        return this;
    },
    
    get_x: function()
    {
        return this.x;
    },
    
    get_y: function()
    {
        return this.y;
    },
    
    add: function(value)
    {
        this.x += value.x;
        this.y += value.y;
        return this;
    },
    
    add_scalar: function(value)
    {
        this.x += value;
        this.y += value;
        return this;
    },
    
    add_vectors: function(value_01, value_02)
    {
        this.x = value_01.x + value_02.x;
        this.y = value_01.y + value_02.y;
        return this;
    },
    
    sub: function(value)
    {
        this.x -= value.x;
        this.y -= value.y;
        return this;
    },
    
    sub_scalar: function(value)
    {
        this.x -= value;
        this.y -= value;
        return this;
    },
    
    sub_vectors: function(value_01, value_02)
    {
        this.x = value_01.x - value_02.x;
        this.y = value_01.y - value_02.y;
        return this;
    },
    
    multiply: function(value)
    {
        this.x *= value.x;
        this.y *= value.y;
        return this;
    },
    
    multiply_scalar: function(value)
    {
        this.x *= value;
        this.y *= value;
        return this;
    },
    
    divide: function(value)
    {
        this.x /= value.x;
        this.y /= value.y;
        return this;
    },
    
    divide_scalar: function(value)
    {
        this.x /= value;
        this.y /= value;
        return this;
    },
    
    min: function(value)
    {
        this.x = Math.min(this.x, value.x);
        this.y = Math.min(this.y, value.y);
        return this;
    },
    
    max: function(value)
    {
        this.x = Math.max(this.x, value.x);
        this.y = Math.max(this.y, value.y);
        return this;
    },
    
    clamp: function(min, max)
    {
        this.x = Math.max(min.x, Math.min(max.x, this.x ));
        this.y = Math.max(min.y, Math.min(max.y, this.y ));
	return this;
    },
    
    dot: function(value)
    {
	return this.x * value.x + this.y * value.y;
    },

    length: function() 
    {
	return Math.sqrt(this.x * this.x + this.y * this.y);
    },

    normalize: function() 
    {
	return this.divide_scalar(this.length());
    },

    angle: function() 
    {
	var angle = Math.atan2(this.y, this.x);
	if(angle < 0) 
        {
            angle += 2 * Math.PI;
        }
	return angle;
    },

    distance_to: function (value) 
    {
        var dx = this.x - value.x, dy = this.y - value.y;
        return Math.sqrt(dx * dx + dy * dy);
    },
    
    lerp: function(value, alpha)
    {
	this.x += (value.x - this.x) * alpha;
	this.y += (value.y - this.y) * alpha;
	return this;
    },

    lerp_vectors: function(value_01, value_02, alpha) 
    {
	this.sub_vectors(value_02, value_01).multiply_scalar(alpha).add(value_01);
	return this;
    },

    equals: function (value) 
    {
	return ((value.x === this.x) && (value.y === this.y ));
    }
};
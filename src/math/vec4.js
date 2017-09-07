/* global gb */

gb.vec4 = function()
{
    if(typeof arguments[0] === 'gb.vec4')
    {
        this.x = arguments[0].get_x();
        this.y = arguments[0].get_y();
        this.z = arguments[0].get_z();
        this.w = arguments[0].get_w();
    }
    else if(arguments.length === 1)
    {
        this.x = arguments[0];
        this.y = arguments[0];
        this.z = arguments[0];
        this.w = arguments[0];
    }
    else if(arguments.length === 4)
    {
        this.x = arguments[0];
        this.y = arguments[1];
        this.z = arguments[2];
        this.w = arguments[3];
    }
    else
    {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.w = 0;
    }
};

gb.vec4.prototype = 
{ 
    constructor: gb.vec4,
    
    clone: function() 
    {
        return new this.constructor(this.x, this.y, this.z, this.w);
    },

    copy: function(value)
    {
	this.x = value.x;
	this.y = value.y;
        this.z = value.z;
        this.w = value.w;
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
    
    set_z: function(value)
    {
        this.z = value;
        return this;
    },
    
    set_w: function(value)
    {
        this.w = value;
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
    
    get_z: function()
    {
        return this.z;
    },
    
    get_w: function()
    {
        return this.w;
    },
    
    add: function(value)
    {
        this.x += value.x;
        this.y += value.y;
        this.z += value.z;
        this.w += value.w;
        return this;
    },
    
    add_scalar: function(value)
    {
        this.x += value;
        this.y += value;
        this.z += value;
        this.w += value;
        return this;
    },
    
    add_vectors: function(value_01, value_02)
    {
        this.x = value_01.x + value_02.x;
        this.y = value_01.y + value_02.y;
        this.z = value_01.z + value_02.z;
        this.w = value_01.w + value_02.w;
        return this;
    },
    
    sub: function(value)
    {
        this.x -= value.x;
        this.y -= value.y;
        this.z -= value.z;
        this.w -= value.w;
        return this;
    },
    
    sub_scalar: function(value)
    {
        this.x -= value;
        this.y -= value;
        this.z -= value;
        this.w -= value;
        return this;
    },
    
    sub_vectors: function(value_01, value_02)
    {
        this.x = value_01.x - value_02.x;
        this.y = value_01.y - value_02.y;
        this.z = value_01.z - value_02.z;
        this.w = value_01.w - value_02.w;
        return this;
    },
    
    multiply: function(value)
    {
        this.x *= value.x;
        this.y *= value.y;
        this.z *= value.z;
        this.w *= value.w;
        return this;
    },
    
    multiply_scalar: function(value)
    {
        this.x *= value;
        this.y *= value;
        this.z *= value;
        this.w *= value;
        return this;
    },
    
    divide: function(value)
    {
        this.x /= value.x;
        this.y /= value.y;
        this.z /= value.z;
        this.w /= value.w;
        return this;
    },
    
    divide_scalar: function(value)
    {
        this.x /= value;
        this.y /= value;
        this.z /= value;
        this.w /= value;
        return this;
    },
    
    min: function(value)
    {
        this.x = Math.min(this.x, value.x);
        this.y = Math.min(this.y, value.y);
        this.z = Math.min(this.z, value.z);
        this.w = Math.min(this.w, value.w);
        return this;
    },
    
    max: function(value)
    {
        this.x = Math.max(this.x, value.x);
        this.y = Math.max(this.y, value.y);
        this.z = Math.max(this.z, value.z);
        this.w = Math.max(this.w, value.w);
        return this;
    },
    
    clamp: function(min, max)
    {
        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));
        this.z = Math.max(min.z, Math.min(max.z, this.z));
        this.w = Math.max(min.w, Math.min(max.w, this.w));
	return this;
    },
    
    dot: function(value)
    {
	return this.x * value.x + this.y * value.y + this.z * value.z + this.w * value.w;
    },

    length: function() 
    {
	return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    },

    normalize: function() 
    {
	return this.divide_scalar(this.length());
    },
    
    lerp: function(value, alpha)
    {
	this.x += (value.x - this.x) * alpha;
	this.y += (value.y - this.y) * alpha;
        this.z += (value.z - this.z) * alpha;
        this.w += (value.w - this.w) * alpha;
	return this;
    },

    lerp_vectors: function(value_01, value_02, alpha) 
    {
	this.sub_vectors(value_02, value_01).multiply_scalar(alpha).add(value_01);
	return this;
    },

    equals: function (value) 
    {
	return ((value.x === this.x) && (value.y === this.y) && (value.z === this.z) && (value.w === this.w));
    },
    
    to_array: function()
    {
        var array = [];
        array.push(this.x);
        array.push(this.y);
        array.push(this.z);
        array.push(this.w);
        return array;
    }
};
/* global gb */

gb.vec3 = function()
{
    if(typeof arguments[0] === 'gb.vec3')
    {
        this.x = arguments[0].get_x();
        this.y = arguments[0].get_y();
        this.z = arguments[0].get_z();
    }
    else if(arguments.length === 1)
    {
        this.x = arguments[0];
        this.y = arguments[0];
        this.z = arguments[0];
    }
    else if(arguments.length === 3)
    {
        this.x = arguments[0];
        this.y = arguments[1];
        this.z = arguments[2];
    }
    else
    {
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
};

gb.vec3.prototype = 
{ 
    constructor: gb.vec3,
    
    clone: function() 
    {
        return new this.constructor(this.x, this.y, this.z);
    },

    copy: function(value)
    {
	this.x = value.x;
	this.y = value.y;
        this.z = value.z;
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
    
    add: function(value)
    {
        this.x += value.x;
        this.y += value.y;
        this.z += value.z;
        return this;
    },
    
    add_scalar: function(value)
    {
        this.x += value;
        this.y += value;
        this.z += value;
        return this;
    },
    
    add_vectors: function(value_01, value_02)
    {
        this.x = value_01.x + value_02.x;
        this.y = value_01.y + value_02.y;
        this.z = value_01.z + value_02.z;
        return this;
    },
    
    sub: function(value)
    {
        this.x -= value.x;
        this.y -= value.y;
        this.z -= value.z;
        return this;
    },
    
    sub_scalar: function(value)
    {
        this.x -= value;
        this.y -= value;
        this.z -= value;
        return this;
    },
    
    sub_vectors: function(value_01, value_02)
    {
        this.x = value_01.x - value_02.x;
        this.y = value_01.y - value_02.y;
        this.z = value_01.z - value_02.z;
        return this;
    },
    
    multiply: function(value)
    {
        this.x *= value.x;
        this.y *= value.y;
        this.z *= value.z;
        return this;
    },
    
    multiply_scalar: function(value)
    {
        this.x *= value;
        this.y *= value;
        this.z *= value;
        return this;
    },
    
    divide: function(value)
    {
        this.x /= value.x;
        this.y /= value.y;
        this.z /= value.z;
        return this;
    },
    
    divide_scalar: function(value)
    {
        this.x /= value;
        this.y /= value;
        this.z /= value;
        return this;
    },
    
    min: function(value)
    {
        this.x = Math.min(this.x, value.x);
        this.y = Math.min(this.y, value.y);
        this.z = Math.min(this.z, value.z);
        return this;
    },
    
    max: function(value)
    {
        this.x = Math.max(this.x, value.x);
        this.y = Math.max(this.y, value.y);
        this.z = Math.max(this.z, value.z);
        return this;
    },
    
    clamp: function(min, max)
    {
        this.x = Math.max(min.x, Math.min(max.x, this.x));
        this.y = Math.max(min.y, Math.min(max.y, this.y));
        this.z = Math.max(min.z, Math.min(max.z, this.z));
	return this;
    },
    
    dot: function(value)
    {
	return this.x * value.x + this.y * value.y + this.z * value.z;
    },
    
    cross: function(value)
    {
        var x = this.x, y = this.y, z = this.z;
	this.x = y * value.z - z * value.y;
	this.y = z * value.x - x * value.z;
	this.z = x * value.y - y * value.x;
	return this;
    },

    length: function() 
    {
	return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    },

    normalize: function() 
    {
	return this.divide_scalar(this.length());
    },

    distance_to: function (value) 
    {
        var dx = this.x - value.x, dy = this.y - value.y, dz = this.z - value.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    },
    
    lerp: function(value, alpha)
    {
	this.x += (value.x - this.x) * alpha;
	this.y += (value.y - this.y) * alpha;
        this.z += (value.z - this.z) * alpha;
	return this;
    },

    lerp_vectors: function(value_01, value_02, alpha) 
    {
	this.sub_vectors(value_02, value_01).multiply_scalar(alpha).add(value_01);
	return this;
    },

    equals: function (value) 
    {
	return ((value.x === this.x) && (value.y === this.y) && (value.z === this.z));
    },
    
    to_array: function()
    {
        var array = new Array();
        array[0] = this.x;
        array[1] = this.y;
        array[2] = this.z;
        return array;
    }
};
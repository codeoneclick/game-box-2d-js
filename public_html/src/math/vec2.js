/* global gb */

gb.vec2 = function()
{
    if(arguments[0] instanceof gb.vec2)
    {
        this.m_x = arguments[0].x;
        this.m_y = arguments[0].y;
    }
    else if(arguments.length === 1)
    {
        this.m_x = arguments[0];
        this.m_y = arguments[0];
    }
    else if(arguments.length === 2)
    {
        this.m_x = arguments[0];
        this.m_y = arguments[1];
    }
    else
    {
        this.m_x = 0;
        this.m_y = 0;
    }
    
    Object.defineProperty(this, 'x', {
        get: function()
        {
            return this.m_x;
        },
        set: function(value)
        {
            this.m_x = value;
        }
    });
    
    Object.defineProperty(this, 'y', {
        get: function()
        {
            return this.m_y;
        },
        set: function(value)
        {
            this.m_y = value;
        }
    });
};

gb.vec2.add = function(vector_01, vector_02)
{
    return new gb.vec2(vector_01.x + vector_02.x,
                       vector_01.y + vector_02.y);
};

gb.vec2.sub = function(vector_01, vector_02)
{
    return new gb.vec2(vector_01.x - vector_02.x,
                       vector_01.y - vector_02.y);
};

gb.vec2.lerp = function(vector_01, vector_02, alpha) 
{
    return gb.vec2.sub(vector_02, vector_01).multiply_scalar(alpha).add(vector_01);
};

gb.vec2.equals = function(vector_01, vector_02) 
{
    return ((vector_01.x === vector_02.x) && (vector_01.y === vector_02.y ));
};

gb.vec2.prototype = 
{ 
    constructor: gb.vec2,

    add: function(vector)
    {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    },
    
    add_scalar: function(scalar)
    {
        this.x += scalar;
        this.y += scalar;
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

    equals: function (value) 
    {
	return ((value.x === this.x) && (value.y === this.y ));
    },
    
    to_array: function()
    {
        var array = new Array();
        array[0] = this.x;
        array[1] = this.y;
        return array;
    }
};
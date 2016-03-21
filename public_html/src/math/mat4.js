/* global gb */

gb.mat4 = function()
{
    this.elements = new Array([1, 0, 0, 0,
                               0, 1, 0, 0,
                               0, 0, 1, 0,
                               0, 0, 0, 1]);
};

gb.mat4.prototype = 
{ 
    constructor: gb.mat4,
    
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
};
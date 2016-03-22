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

    identity: function() 
    {
        this.elements[ 0 ] = 1; this.elements[ 4 ] = 0; this.elements[ 8 ] = 0; this.elements[ 12 ] = 0;
	this.elements[ 1 ] = 0; this.elements[ 5 ] = 1; this.elements[ 9 ] = 0; this.elements[ 13 ] = 0;
	this.elements[ 2 ] = 0; this.elements[ 6 ] = 0; this.elements[ 10 ] = 1; this.elements[ 14 ] = 0;
	this.elements[ 3 ] = 0; this.elements[ 7 ] = 0; this.elements[ 11 ] = 0; this.elements[ 15 ] = 1;    
	return this;
    },
    
    make_rotation: function(euler) 
    {
	var x = euler.x, y = euler.y, z = euler.z;
	var a = Math.cos(x), b = Math.sin(x);
	var c = Math.cos(y), d = Math.sin(y);
	var e = Math.cos(z), f = Math.sin(z);

	var ae = a * e, af = a * f, be = b * e, bf = b * f;

	this.elements[ 0 ] = c * e;
	this.elements[ 4 ] = - c * f;
	this.elements[ 8 ] = d;

	this.elements[ 1 ] = af + be * d;
	this.elements[ 5 ] = ae - bf * d;
	this.elements[ 9 ] = - b * c;

	this.elements[ 2 ] = bf - ae * d;
	this.elements[ 6 ] = be + af * d;
	this.elements[ 10 ] = a * c;
        
        this.elements[ 3 ] = 0;
		this.elements[ 7 ] = 0;
		this.elements[ 11 ] = 0;

		this.elements[ 12 ] = 0;
		this.elements[ 13 ] = 0;
		this.elements[ 14 ] = 0;
		this.elements[ 15 ] = 1;
        return this;
    } 
};
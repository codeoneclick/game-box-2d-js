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

};
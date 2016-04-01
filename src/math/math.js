/* global gb */

var INT16_MAX = 32767;
var INT16_MIN = -32768;

gb.math = function()
{
    
};

gb.math.radians = function(degrees)
{
    return Math.PI / 180 * degrees;
};

gb.math.degrees = function(radians)
{
     return 180 / Math.PI * radians;
};


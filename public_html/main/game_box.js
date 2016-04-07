/* global graphics_context, define */

var gb = { REVISION: "1",
		   resource_base : resource_base };

if (typeof define === "function" && define.amd)
{
    define("gb", gb);
} 
else if ("undefined" !== typeof exports && "undefined" !== typeof module) 
{
    module.exports = gb;
}

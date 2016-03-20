/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gb = { REVISION: "1" };

if (typeof define === "function" && define.amd)
{
    define("gb", gb);
} 
else if ("undefined" !== typeof exports && "undefined" !== typeof module) 
{
    module.exports = gb;
}

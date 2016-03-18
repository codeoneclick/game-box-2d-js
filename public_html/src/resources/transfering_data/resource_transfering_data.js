/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var k_resource_transfering_data_type_undefined = 0;
var k_resource_transfering_data_type_shader = 1;
var k_resource_transfering_data_type_texture = 2;

function resource_transfering_data ()
{
    this.m_type = k_resource_transfering_data_type_undefined;
}

resource_transfering_data.prototype = 
{ 
    constructor: resource_transfering_data,
    
    get_type: function()
    {
        return this.m_type;
    }
};


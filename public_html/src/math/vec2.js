/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function vec2 ()
{
    if(typeof arguments[0] === 'vec2')
    {
        this.x = arguments[0].get_x();
        this.y = arguments[0].get_y();
    }
    else if(arguments.length === 2)
    {
        this.x = arguments[0];
        this.y = arguments[1];
    }
    else
    {
        this.x = 0;
        this.y = 0;
    }
    output('x: %d, y: %d ', this.x, this.y);
}
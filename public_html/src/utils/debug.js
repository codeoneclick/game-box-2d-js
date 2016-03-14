/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function output() {
    var args = arguments,
    string = args[0],
    i = 1;
    console.log(string.replace(/%((%)|s|d)/g, function (matched) {
        var value = null;
        if (matched[2])
        {
            value = matched[2];
        }
        else 
        {
            value = args[i];
            switch (matched) 
            {
                case '%d':
                    value = parseFloat(value);
                    if (isNaN(value))
                    {
                        value = 0;
                    }
                    break;
            }
            i++;
        }
        return value;
    }));
}

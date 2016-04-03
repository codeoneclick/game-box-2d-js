/* global gb */

"use strict";

gb.sprite_configuration = function()
{
    gb.game_object_configuration.call(this);
};

gb.sprite_configuration.prototype = Object.create(gb.game_object_configuration.prototype);
gb.sprite_configuration.prototype.constructor = gb.sprite_configuration;
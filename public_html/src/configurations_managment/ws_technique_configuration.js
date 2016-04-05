/* global gb */

gb.ws_technique_configuration = function()
{
    gb.configuration_base.call(this);
    this.json = null;
    
    Object.defineProperty(this, 'technique_name', {
        get: function()
        {
            return this.json.technique_name;
        }
    });
    
    Object.defineProperty(this, 'num_passes', {
        get: function()
        {
            return this.json.num_passes;
        }
    });
    
    Object.defineProperty(this, 'index', {
        get: function()
        {
            return this.json.index;
        }
    });
    
    Object.defineProperty(this, 'screen_width', {
        get: function()
        {
            return this.json.screen_width;
        }
    });
    
    Object.defineProperty(this, 'screen_height', {
        get: function()
        {
            return this.json.screen_height;
        }
    });
    
    Object.defineProperty(this, 'clear_color_r', {
        get: function()
        {
            return this.json.clear_color_r;
        }
    });
    
    Object.defineProperty(this, 'clear_color_g', {
        get: function()
        {
            return this.json.clear_color_g;
        }
    });
    
    Object.defineProperty(this, 'clear_color_b', {
        get: function()
        {
            return this.json.clear_color_b;
        }
    });
    
    Object.defineProperty(this, 'clear_color_a', {
        get: function()
        {
            return this.json.clear_color_a;
        }
    });
};

gb.ws_technique_configuration.prototype = Object.create(gb.configuration_base.prototype);
gb.ws_technique_configuration.prototype.constructor = gb.ws_technique_configuration;

gb.ws_technique_configuration.prototype.serialize = function(filename, callback) {
    var self = this;
    $.ajax({
        dataType: "json",
        url: filename,
        data: {},
        async: true
    }).done(function(value) {
        self.json = value;
        console.log("loaded: " + filename);
        callback(self);
    }).fail(function() {
        console.log("can't load: " + filename);
        callback(null);
    });
};
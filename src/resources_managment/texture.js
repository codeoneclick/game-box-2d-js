/* global gb, gl */

gb.texture = function(guid)
{
    gb.resource_base.call(this, guid);
    
    this.m_type = gb.resource_type.texture;
    this.m_texture_id = -1;
    this.m_width = 0;
    this.m_height = 0;
    this.m_setted_wrap_mode = 0;
    this.m_presseted_wrap_mode = gl.REPEAT;
    this.m_setted_mag_filter = 0;
    this.m_presetted_mag_filter = gl.NEAREST;
    this.m_setted_min_filter = 0;
    this.m_presetted_min_filter = gl.NEAREST;
    
    Object.defineProperty(this, 'texture_id', {
        get: function()
        {
            return this.m_texture_id;
        }
    });
    
    Object.defineProperty(this, 'width', {
        get: function()
        {
            return this.m_width;
        }
    });
    
    Object.defineProperty(this, 'height', {
        get: function()
        {
            return this.m_height;
        }
    });
    
    Object.defineProperty(this, 'wrap_mode', {
        set: function(value)
        {
            this.m_presseted_wrap_mode = value;
        }
    });
    
    Object.defineProperty(this, 'mag_filter', {
        set: function(value)
        {
            this.m_presetted_mag_filter = value;
        }
    });
    
    Object.defineProperty(this, 'min_filter', {
        set: function(value)
        {
            this.m_presetted_min_filter = value;
        }
    });
};

gb.texture.prototype = Object.create(gb.resource_base.prototype);
gb.texture.prototype.constructor = gb.texture;

gb.texture.construct = function(guid, texture_id, width, height)
{
    var texture = new gb.texture(guid);
    texture.m_texture_id = texture_id;
    texture.m_width = width;
    texture.m_height = height;
    texture.m_status = gb.resource_status.commited;
    return texture;
};

gb.texture.prototype.destroy = function()
{
    gl.deleteTexture(this.m_texture_id);
};

gb.texture.prototype.on_transfering_data_serialized = function(transfering_data)
{
    switch(transfering_data.type)
    {
        case gb.resource_transfering_data_type.texture :
        {
            this.m_status = gb.resource_status.loaded;
        }
        break;
    }
};
    
gb.texture.prototype.on_transfering_data_commited = function(transfering_data)
{
    switch(transfering_data.type)
    {
        case gb.resource_transfering_data_type.texture :
        {
            this.m_texture_id = transfering_data.texture_id;
            this.m_width = transfering_data.width;
            this.m_height = transfering_data.height;
            this.m_status = gb.resource_status.commited;
        }
        break;
    }  
};

gb.texture.prototype.bind = function()
{
    if(this.get_status() === gb.resource_status.commited)
    {
        gl.bindTexture(gl.TEXTURE_2D, this.texture_id);
        if(this.m_presseted_wrap_mode !== this.m_setted_wrap_mode)
        {
            this.m_setted_wrap_mode = this.m_presseted_wrap_mode;
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.m_setted_wrap_mode);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.m_setted_wrap_mode);
        }
        if(this.m_presetted_min_filter !== this.m_setted_min_filter)
        {
            this.m_setted_min_filter = this.m_presetted_min_filter;
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, this.m_setted_min_filter);
        }
        if(this.m_presetted_mag_filter !== this.m_setted_mag_filter)
        {
            this.m_setted_mag_filter = this.m_presetted_mag_filter;
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.m_setted_mag_filter);
        }
    }
};

gb.texture.prototype.unbind = function()
{
    gl.bindTexture(gl.TEXTURE_2D, null);
};
/* global gb, gl */

gb.texture_commiter_png = function(guid, resource)
{
    gb.resource_commiter.call(this, guid, resource);
};

gb.texture_commiter_png.prototype = Object.create(gb.resource_commiter.prototype);
gb.texture_commiter_png.prototype.constructor = gb.texture_commiter_png;

gb.texture_commiter_png.prototype.commit = function(transfering_data) 
{
    this.m_status = gb.commiter_status.in_progress;
    
    var texture_id = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture_id);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, transfering_data.data);
    gl.generateMipmap(gl.TEXTURE_2D);

    transfering_data.texture_id = texture_id;
    this.m_resource.on_transfering_data_commited(transfering_data);
    this.m_status = gb.commiter_status.success;
};
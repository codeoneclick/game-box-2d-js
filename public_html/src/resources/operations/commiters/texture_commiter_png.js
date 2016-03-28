/* global gb */

$.getScript("src/resources/operations/commiters/resource_commiter.js");
$.getScript("src/resources/transfering_data/texture_transfering_data.js");
$.getScript("src/render/graphics_context.js");

gb.texture_commiter_png = function(guid, resource)
{
    gb.resource_commiter.call(this, guid, resource);
};

gb.texture_commiter_png.prototype = Object.create(gb.resource_commiter.prototype);
gb.texture_commiter_png.prototype.constructor = gb.texture_commiter_png;

gb.texture_commiter_png.prototype.commit = function(transfering_data) 
{
    this.m_status = gb.commiter_status.in_progress;
    
    var texture_id = gb.gl.createTexture();
    gb.gl.bindTexture(gb.gl.TEXTURE_2D, texture_id);
    gb.gl.texImage2D(gb.gl.TEXTURE_2D, 0, gb.gl.RGBA, gb.gl.RGBA, gb.gl.UNSIGNED_BYTE, transfering_data.data);
    gb.gl.generateMipmap(gb.gl.TEXTURE_2D);

    transfering_data.texture_id = texture_id;
    this.m_resource.on_transfering_data_commited(transfering_data);
    this.m_status = gb.commiter_status.success;
};
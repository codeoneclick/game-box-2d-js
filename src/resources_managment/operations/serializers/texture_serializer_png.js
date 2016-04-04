/* global gb */

gb.texture_serializer_png = function(filename, resource)
{
    gb.resource_serializer.call(this, filename, resource);
    this.m_filename = filename;
};

gb.texture_serializer_png.prototype = Object.create(gb.resource_serializer.prototype);
gb.texture_serializer_png.prototype.constructor = gb.texture_serializer_png;

gb.texture_serializer_png.prototype.serialize = function(transfering_data, callback) 
{
    this.m_status = gb.serializer_status.in_progress;
    
    var self = this;
    var image = new Image();
    image.onload = function() {
        transfering_data.data = image;
        transfering_data.width = image.width;
        transfering_data.height = image.height;
        self.m_resource.on_transfering_data_serialized(transfering_data);
        self.m_status =  gb.serializer_status.success;    
        callback();
    };
    image.src = this.m_filename;
};

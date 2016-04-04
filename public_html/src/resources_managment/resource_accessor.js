/* global gb */

gb.resource_accessor = function()
{
    this.m_resources = new Array();
    this.m_operations_queue = new Array();
};

gb.resource_accessor.prototype =
{
    constructor: gb.resource_accessor,

    add_custom_resource: function(guid, resource)
    {
        console.log("added custom resource: " + guid);
        console.log(resource);
        this.m_resources[guid] = resource;
    },

    get_shader: function (filename)
    {
        var resource = this.m_resources[filename];
        if(typeof resource === 'undefined')
        {
            resource = new gb.shader(filename);
            this.m_resources[filename] = resource;
            
            var operation = new gb.shader_loading_operation(filename, resource);
            var self = this;
            operation.start(function () {
                self.m_resources[filename].on_resource_loaded(self.m_operations_queue[filename].get_status() === gb.resource_loading_operation_status.success);
                self.m_operations_queue[filename] = null;
            });
            this.m_operations_queue[filename] = operation;
        }
        return resource;
    },

    get_texture: function(filename)
    {
        var resource = this.m_resources[filename];
        if(typeof resource === 'undefined')
        {
            resource = new gb.texture(filename);
            this.m_resources[filename] = resource;
            
            var operation = new gb.texture_loading_operation(filename, resource);
            var self = this;
            operation.start(function () {
                self.m_resources[filename].on_resource_loaded(self.m_operations_queue[filename].get_status() === gb.resource_loading_operation_status.success);
                self.m_operations_queue[filename] = null;
            });
            this.m_operations_queue[filename] = operation;
        }
        return resource;
    }
};

/* global oop, gb, gl */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "vertex_attribute",

    init: function() {
        this.m_position = new gb.vec2(0);
        this.m_texcoord = new gb.vec2(0);
        this.m_color = new gb.vec4(0);

        this.m_raw_buffer = new ArrayBuffer(2 * 4 + 2 * 4 + 4 * 4);
        this.m_raw_data = new DataView(this.m_raw_buffer);

        Object.defineProperty(this, 'position', {
            get: function() {
                return this.m_position;
            },
            set: function(value) {
                this.m_position = value;
                this.m_raw_data.setFloat32(0, value.x, true);
                this.m_raw_data.setFloat32(4, value.y, true);
            }
        });

        Object.defineProperty(this, 'texcoord', {
            get: function() {
                return this.m_texcoord;
            },
            set: function(value) {
                this.m_texcoord = value;
                this.m_raw_data.setFloat32(8, value.x, true);
                this.m_raw_data.setFloat32(12, value.y, true);
            }
        });

        Object.defineProperty(this, 'color', {
            get: function() {
                return this.m_color;
            },
            set: function(value) {
                this.m_color = value;
                this.m_raw_data.setFloat32(16, value.x, true);
                this.m_raw_data.setFloat32(20, value.y, true);
                this.m_raw_data.setFloat32(24, value.z, true);
                this.m_raw_data.setFloat32(28, value.w, true);
            }
        });
    },

    release: function() {

    },

    methods: {
        to_array: function() {
            return new Float32Array(this.m_raw_buffer);
            /*[this.m_position.x, this.m_position.y,
                            this.m_texcoord.x, this.m_texcoord.y,
                            this.m_color.x, this.m_color.y, this.m_color.z, this.m_color.w
                        ];*/
        }
    }
});

oop.define_class({
    namespace: "gb",
    name: "vbo",
    constants: {
        attributes: {
            position: 0,
            texcoord: 1,
            color: 2
        }
    },

    init: function(size, mode, attributes) {
        this.m_handler = gl.createBuffer();
        this.m_allocated_size = size;
        this.m_used_size = size;
        this.m_mode = mode;
        this.m_min_bound = new gb.vec2(gb.math.INT16_MAX);
        this.m_max_bound = new gb.vec2(gb.math.INT16_MIN);

        if (attributes) {
            this.m_attributes = new Uint8Array(3);

            this.m_stride = 0;
            for (var i = 0; i < attributes.length; ++i) {
                var attribute = attributes[i];
                switch (attribute) {
                    case gb.vbo.attributes.position:
                        this.m_stride += 8;
                        break;
                    case gb.vbo.attributes.texcoord:
                        this.m_stride += 8;
                        break;
                    case gb.vbo.attributes.color:
                        this.m_stride += 16;
                        break;
                }
                this.m_attributes[attribute] = 1;
            }

            var size_in_bytes = size * this.m_stride;
            this.m_raw_data = new ArrayBuffer(size_in_bytes);
            this.m_raw_data_accessor = new DataView(this.m_raw_data);
        }
        else
        {
            this.m_data = [];
            for (var i = 0; i < this.m_allocated_size; ++i) {
                this.m_data[i] = new gb.vertex_attribute();
            }
        }

        Object.defineProperty(this, 'allocated_size', {
            get: function() {
                return this.m_allocated_size;
            }
        });

        Object.defineProperty(this, 'used_size', {
            get: function() {
                return this.m_used_size;
            }
        });

        Object.defineProperty(this, 'min_bound', {
            get: function() {
                return this.m_min_bound;
            }
        });

        Object.defineProperty(this, 'max_bound', {
            get: function() {
                return this.m_max_bound;
            }
        });
    },

    release: function() {
        gl.deleteBuffer(this.m_handler);
    },

    methods: {

        write_attribute: function(attribute, index, value) {
            if (attribute === gb.vbo.attributes.position) {
                if (index < this.m_allocated_size) {
                    this.m_raw_data_accessor.setFloat32(index * this.m_stride + 0, value.x, true);
                    this.m_raw_data_accessor.setFloat32(index * this.m_stride + 4, value.y, true);

                    this.m_min_bound = gb.vec2.min(value, this.m_min_bound);
                    this.m_max_bound = gb.vec2.max(value, this.m_max_bound);
                } else {
                    console.error("out of vbo bound");
                }
            }

            if (attribute === gb.vbo.attributes.texcoord) {
                if (index < this.m_allocated_size) {
                    this.m_raw_data_accessor.setFloat32(index * this.m_stride + 8, value.x, true);
                    this.m_raw_data_accessor.setFloat32(index * this.m_stride + 12, value.y, true);
                } else {
                    console.error("out of vbo bound");
                }
            }

            if (attribute === gb.vbo.attributes.color) {
                if (index < this.m_allocated_size) {
                    this.m_raw_data_accessor.setFloat32(index * this.m_stride + 16, value.x, true);
                    this.m_raw_data_accessor.setFloat32(index * this.m_stride + 20, value.y, true);
                    this.m_raw_data_accessor.setFloat32(index * this.m_stride + 24, value.z, true);
                    this.m_raw_data_accessor.setFloat32(index * this.m_stride + 28, value.w, true);
                } else {
                    console.error("out of vbo bound");
                }
            }
        },

        read_attribute: function(attribute, index) {
            if (attribute === gb.vbo.attributes.position) {
                if (index < this.m_allocated_size) {
                    return {x: this.m_raw_data_accessor.getFloat32(index * this.m_stride + 0, true),
                            y: this.m_raw_data_accessor.getFloat32(index * this.m_stride + 4, true)};
                } else {
                    console.error("out of vbo bound");
                }
            }

            if (attribute === gb.vbo.attributes.texcoord) {
                if (index < this.m_allocated_size) {
                    return {x: this.m_raw_data_accessor.getFloat32(index * this.m_stride + 8, true),
                            y: this.m_raw_data_accessor.getFloat32(index * this.m_stride + 12, true)};
                } else {
                    console.error("out of vbo bound");
                }
            }

            if (attribute === gb.vbo.attributes.color) {
                if (index < this.m_allocated_size) {
                    return {x: this.m_raw_data_accessor.getFloat32(index * this.m_stride + 16, true),
                            y: this.m_raw_data_accessor.getFloat32(index * this.m_stride + 20, true),
                            z: this.m_raw_data_accessor.getFloat32(index * this.m_stride + 24, true),
                            w: this.m_raw_data_accessor.getFloat32(index * this.m_stride + 28, true)};
                } else {
                    console.error("out of vbo bound");
                }
            }
            return null;
        },

        submit: function(size) {
            
            var data = this.m_raw_data;
            if(size && size > 0 && size < this.m_allocated_size)
            {
                data = this.m_raw_data.slice(0, size * this.m_stride);
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, this.m_handler);
            gl.bufferData(gl.ARRAY_BUFFER, data, this.m_mode);
        },

        bind: function(attributes) {
            if (this.m_used_size !== 0) {
                gl.bindBuffer(gl.ARRAY_BUFFER, this.m_handler);
                if (attributes[gb.shader.attribute_type.position] >= 0) {
                    gl.vertexAttribPointer(attributes[gb.shader.attribute_type.position], 2, gl.FLOAT, false, 4 * 8, 0);
                    gl.enableVertexAttribArray(attributes[gb.shader.attribute_type.position]);
                }
                if (attributes[gb.shader.attribute_type.texcoord] >= 0) {
                    gl.vertexAttribPointer(attributes[gb.shader.attribute_type.texcoord], 2, gl.FLOAT, false, 4 * 8, 4 * 2);
                    gl.enableVertexAttribArray(attributes[gb.shader.attribute_type.texcoord]);
                }
                if (attributes[gb.shader.attribute_type.color] >= 0) {
                    gl.vertexAttribPointer(attributes[gb.shader.attribute_type.color], 4, gl.FLOAT, false, 4 * 8, 4 * 4);
                    gl.enableVertexAttribArray(attributes[gb.shader.attribute_type.color]);
                }
            }
        },

        unbind: function(attributes) {
            if (this.m_used_size !== 0) {
                gl.bindBuffer(gl.ARRAY_BUFFER, this.m_handler);
                if (attributes[gb.shader.attribute_type.position] >= 0) {
                    gl.disableVertexAttribArray(attributes[gb.shader.attribute_type.position]);
                }
                if (attributes[gb.shader.attribute_type.texcoord] >= 0) {
                    gl.disableVertexAttribArray(attributes[gb.shader.attribute_type.texcoord]);
                }
                if (attributes[gb.shader.attribute_type.color] >= 0) {
                    gl.disableVertexAttribArray(attributes[gb.shader.attribute_type.color]);
                }
                gl.bindBuffer(gl.ARRAY_BUFFER, null);
            }
        },

        to_vertices_positions: function()
        {
            var vertices = [];
            for(var i = 0; i < this.m_allocated_size; ++i)
            {
                var position = this.read_attribute(gb.vbo.attributes.position, i);
                vertices.push(new gb.vec2(position.x, position.y));
            }
            return vertices;
        }
    }
});
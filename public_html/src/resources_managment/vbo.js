/* global oop, gb, gl */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "vbo",
    constants: {

        attribute: {
            position: 0,
            texcoord: 1,
            color: 2
        },

        declaration: {
            position_xy: 0,
            position_xy_texcoord_uv: 1,
            position_xy_texcoord_uv_color_rgba: 2
        }
    },

    init: function(size, mode, declaration) {
        this.m_handler = gl.createBuffer();
        this.m_allocated_size = size;
        this.m_used_size = size;
        this.m_mode = mode;
        this.m_min_bound = new gb.vec2(gb.math.INT16_MAX);
        this.m_max_bound = new gb.vec2(gb.math.INT16_MIN);

        this.m_declaration = declaration;
        this.m_stride = 0;

        switch (declaration) {
            case gb.vbo.declaration.position_xy:
                this.m_stride = 8;
                break;
            case gb.vbo.declaration.position_xy_texcoord_uv:
                this.m_stride = 16;
                break;
            case gb.vbo.declaration.position_xy_texcoord_uv_color_rgba:
                this.m_stride = 32;
                break;
        }

        console.log("stride: " + this.m_stride);

        var size_in_bytes = size * this.m_stride;
        this.m_data = new ArrayBuffer(size_in_bytes);
        this.m_data_accessor = new DataView(this.m_data);

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
            if (attribute === gb.vbo.attribute.position) {
                if (index < this.m_allocated_size) {
                    this.m_data_accessor.setFloat32(index * this.m_stride + 0, value.x, true);
                    this.m_data_accessor.setFloat32(index * this.m_stride + 4, value.y, true);

                    this.m_min_bound.min(value);
                    this.m_max_bound.max(value);
                } else {
                    console.error("out of vbo bound");
                }
            }

            if (attribute === gb.vbo.attribute.texcoord && (this.m_declaration === gb.vbo.declaration.position_xy_texcoord_uv ||
                    this.m_declaration === gb.vbo.declaration.position_xy_texcoord_uv_color_rgba)) {
                if (index < this.m_allocated_size) {
                    this.m_data_accessor.setFloat32(index * this.m_stride + 8, value.x, true);
                    this.m_data_accessor.setFloat32(index * this.m_stride + 12, value.y, true);
                } else {
                    console.error("out of vbo bound");
                }
            }

            if (attribute === gb.vbo.attribute.color && this.m_declaration === gb.vbo.declaration.position_xy_texcoord_uv_color_rgba) {
                if (index < this.m_allocated_size) {
                    this.m_data_accessor.setFloat32(index * this.m_stride + 16, value.x, true);
                    this.m_data_accessor.setFloat32(index * this.m_stride + 20, value.y, true);
                    this.m_data_accessor.setFloat32(index * this.m_stride + 24, value.z, true);
                    this.m_data_accessor.setFloat32(index * this.m_stride + 28, value.w, true);
                } else {
                    console.error("out of vbo bound");
                }
            }
        },

        read_attribute: function(attribute, index) {
            if (attribute === gb.vbo.attribute.position) {
                if (index < this.m_allocated_size) {
                    return {
                        x: this.m_data_accessor.getFloat32(index * this.m_stride + 0, true),
                        y: this.m_data_accessor.getFloat32(index * this.m_stride + 4, true)
                    };
                } else {
                    console.error("out of vbo bound");
                }
            }

            if (attribute === gb.vbo.attribute.texcoord && (this.m_declaration === gb.vbo.declaration.position_xy_texcoord_uv ||
                    this.m_declaration === gb.vbo.declaration.position_xy_texcoord_uv_color_rgba)) {
                if (index < this.m_allocated_size) {
                    return {
                        x: this.m_data_accessor.getFloat32(index * this.m_stride + 8, true),
                        y: this.m_data_accessor.getFloat32(index * this.m_stride + 12, true)
                    };
                } else {
                    console.error("out of vbo bound");
                }
            }

            if (attribute === gb.vbo.attribute.color && this.m_declaration === gb.vbo.declaration.position_xy_texcoord_uv_color_rgba) {
                if (index < this.m_allocated_size) {
                    return {
                        x: this.m_data_accessor.getFloat32(index * this.m_stride + 16, true),
                        y: this.m_data_accessor.getFloat32(index * this.m_stride + 20, true),
                        z: this.m_data_accessor.getFloat32(index * this.m_stride + 24, true),
                        w: this.m_data_accessor.getFloat32(index * this.m_stride + 28, true)
                    };
                } else {
                    console.error("out of vbo bound");
                }
            }
            return null;
        },

        submit: function(size) {

            var data = this.m_data;
            if (size && size > 0 && size < this.m_allocated_size) {
                this.m_used_size = size;
                data = this.m_data.slice(0, size * this.m_stride);
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, this.m_handler);
            gl.bufferData(gl.ARRAY_BUFFER, data, this.m_mode);
        },

        bind: function(attributes) {
            if (this.m_used_size !== 0) {
                gl.bindBuffer(gl.ARRAY_BUFFER, this.m_handler);
                if (attributes[gb.shader.attribute_type.position] >= 0) {
                    gl.vertexAttribPointer(attributes[gb.shader.attribute_type.position], 2, gl.FLOAT, false, this.m_stride, 0);
                    gl.enableVertexAttribArray(attributes[gb.shader.attribute_type.position]);
                }
                if (attributes[gb.shader.attribute_type.texcoord] >= 0 && (this.m_declaration === gb.vbo.declaration.position_xy_texcoord_uv ||
                    this.m_declaration === gb.vbo.declaration.position_xy_texcoord_uv_color_rgba)) {
                    gl.vertexAttribPointer(attributes[gb.shader.attribute_type.texcoord], 2, gl.FLOAT, false, this.m_stride, 4 * 2);
                    gl.enableVertexAttribArray(attributes[gb.shader.attribute_type.texcoord]);
                }
                if (attributes[gb.shader.attribute_type.color] >= 0 && this.m_declaration === gb.vbo.declaration.position_xy_texcoord_uv_color_rgba) {
                    gl.vertexAttribPointer(attributes[gb.shader.attribute_type.color], 4, gl.FLOAT, false, this.m_stride, 4 * 4);
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
                if (attributes[gb.shader.attribute_type.texcoord] >= 0 && (this.m_declaration === gb.vbo.declaration.position_xy_texcoord_uv ||
                    this.m_declaration === gb.vbo.declaration.position_xy_texcoord_uv_color_rgba)) {
                    gl.disableVertexAttribArray(attributes[gb.shader.attribute_type.texcoord]);
                }
                if (attributes[gb.shader.attribute_type.color] >= 0 && this.m_declaration === gb.vbo.declaration.position_xy_texcoord_uv_color_rgba) {
                    gl.disableVertexAttribArray(attributes[gb.shader.attribute_type.color]);
                }
                gl.bindBuffer(gl.ARRAY_BUFFER, null);
            }
        },

        to_vertices_positions: function() {
            var vertices = [];
            for (var i = 0; i < this.m_allocated_size; ++i) {
                var position = this.read_attribute(gb.vbo.attribute.position, i);
                vertices.push(new gb.vec2(position.x, position.y));
            }
            return vertices;
        }
    }
});
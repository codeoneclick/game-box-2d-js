/* global oop, shader, vertex_attribute, INT16_MAX, INT16_MIN, gl, vec2, vec4 */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "vertex_attribute",

    init: function() {
        this.m_position = new vec2(0);
        this.m_texcoord = new vec2(0);
        this.m_color = new vec4(0);

        Object.defineProperty(this, 'position', {
            get: function() {
                return this.m_position;
            },
            set: function(value) {
                this.m_position = value;
            }
        });

        Object.defineProperty(this, 'texcoord', {
            get: function() {
                return this.m_texcoord;
            },
            set: function(value) {
                this.m_texcoord = value;
            }
        });

        Object.defineProperty(this, 'color', {
            get: function() {
                return this.m_color;
            },
            set: function(value) {
                this.m_color = value;
            }
        });
    },

    release: function() {

    },

    methods: {
        to_array: function() {
            return [this.m_position.x, this.m_position.y,
                this.m_texcoord.x, this.m_texcoord.y,
                this.m_color.x, this.m_color.y, this.m_color.z, this.m_color.w
            ];
        }
    }
});

oop.define_class({
    namespace: "gb",
    name: "vbo",

    init: function(size, mode) {
        this.m_handler = gl.createBuffer();
        this.m_allocated_size = size;
        this.m_used_size = 0;
        this.m_mode = mode;
        this.m_min_bound = new vec2(INT16_MAX);
        this.m_max_bound = new vec2(INT16_MIN);

        this.m_data = [];
        for (var i = 0; i < this.m_allocated_size; ++i) {
            this.m_data[i] = new vertex_attribute();
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
        lock: function() {
            return this.m_data;
        },

        unlock: function() {
            this.m_used_size = arguments.length !== 0 && arguments[0] > 0 && arguments[0] < this.m_allocated_size ? arguments[0] : this.m_allocated_size;
            gl.bindBuffer(gl.ARRAY_BUFFER, this.m_handler);
            var vertices = [];
            for (var i = 0; i < this.m_used_size; ++i) {
                var vertex_attribute_array = this.m_data[i].to_array();
                for (var j = 0; j < vertex_attribute_array.length; ++j) {
                    vertices.push(vertex_attribute_array[j]);
                }
                var vertex_position = new vec2(vertex_attribute_array[0], vertex_attribute_array[1]);
                this.m_min_bound = vec2.min(vertex_position, this.m_min_bound);
                this.m_max_bound = vec2.max(vertex_position, this.m_max_bound);
            }
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), this.m_mode);
        },

        bind: function(attributes) {
            if (this.m_used_size !== 0) {
                gl.bindBuffer(gl.ARRAY_BUFFER, this.m_handler);
                if (attributes[shader.attribute_type.position] >= 0) {
                    gl.vertexAttribPointer(attributes[shader.attribute_type.position], 2, gl.FLOAT, false, 4 * 8, 0);
                    gl.enableVertexAttribArray(attributes[shader.attribute_type.position]);
                }
                if (attributes[shader.attribute_type.texcoord] >= 0) {
                    gl.vertexAttribPointer(attributes[shader.attribute_type.texcoord], 2, gl.FLOAT, false, 4 * 8, 4 * 2);
                    gl.enableVertexAttribArray(attributes[shader.attribute_type.texcoord]);
                }
                if (attributes[shader.attribute_type.color] >= 0) {
                    gl.vertexAttribPointer(attributes[shader.attribute_type.color], 4, gl.FLOAT, false, 4 * 8, 4 * 4);
                    gl.enableVertexAttribArray(attributes[shader.attribute_type.color]);
                }
            }
        },

        unbind: function(attributes) {
            if (this.m_used_size !== 0) {
                gl.bindBuffer(gl.ARRAY_BUFFER, this.m_handler);
                if (attributes[shader.attribute_type.position] >= 0) {
                    gl.disableVertexAttribArray(attributes[shader.attribute_type.position]);
                }
                if (attributes[shader.attribute_type.texcoord] >= 0) {
                    gl.disableVertexAttribArray(attributes[shader.attribute_type.texcoord]);
                }
                if (attributes[shader.attribute_type.color] >= 0) {
                    gl.disableVertexAttribArray(attributes[shader.attribute_type.color]);
                }
                gl.bindBuffer(gl.ARRAY_BUFFER, null);
            }
        }
    }
});
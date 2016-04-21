/* global oop, gl, gb */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "shader_uniform",
    constants: {
        type: {
            undefined: -1,
            mat4: 0,
            mat4_array: 1,
            vec4: 2,
            vec4_array: 3,
            vec3: 4,
            vec3_array: 5,
            vec2: 6,
            vec2_array: 7,
            f32: 8,
            f32_array: 9,
            i32: 10,
            i32_array: 11,
            sampler: 12
        }
    },

    init: function() {
        this.m_type = gb.shader_uniform.type.undefined;

        Object.defineProperty(this, "type", {
            get: function() {
                return this.m_type;
            },
            set: function(value) {
                this.m_type = value;
            }
        });

        Object.defineProperty(this, "mat4_value", {
            get: function() {
                return this.m_mat4_value;
            },
            set: function(value) {
                this.m_mat4_value = value;
            }
        });

        Object.defineProperty(this, "vec4_value", {
            get: function() {
                return this.m_vec4_value;
            },
            set: function(value) {
                this.m_vec4_value = value;
            }
        });

        Object.defineProperty(this, "vec3_value", {
            get: function() {
                return this.m_vec3_value;
            },
            set: function(value) {
                this.m_vec3_value = value;
            }
        });

        Object.defineProperty(this, "vec2_value", {
            get: function() {
                return this.m_vec2_value;
            },
            set: function(value) {
                this.m_vec2_value = value;
            }
        });

        Object.defineProperty(this, "f32_value", {
            get: function() {
                return this.m_f32_value;
            },
            set: function(value) {
                this.m_f32_value = value;
            }
        });

        Object.defineProperty(this, "i32_value", {
            get: function() {
                return this.m_i32_value;
            },
            set: function(value) {
                this.m_i32_value = value;
            }
        });

        Object.defineProperty(this, "sampler_index", {
            get: function() {
                return this.m_sampler_index;
            }
        });

        Object.defineProperty(this, "sampler_texture", {
            get: function() {
                return this.m_sampler_texture;
            }
        });
    },

    release: function() {

    },

    methods: {
        set_sampler: function(texture, index) {
            this.m_sampler_texture = texture;
            this.m_sampler_index = index;
        }
    }
});

oop.define_class({
    namespace: "gb",
    name: "shader",
    extend: gb.resource_base,
    constants: {
        sampler_type: {
            sampler_01: 0,
            sampler_02: 1,
            sampler_03: 2,
            sampler_04: 3,
            sampler_05: 4,
            sampler_06: 5,
            sampler_07: 6,
            sampler_08: 7,
            max: 8
        },

        attribute_type: {
            position: 0,
            texcoord: 1,
            color: 2,
            max: 3
        },

        uniform_type: {
            mat_m: 0,
            mat_p: 1,
            mat_v: 2,
            max: 3
        },

        attribute_names: {
            a_position: "a_position",
            a_texcoord: "a_texcoord",
            a_color: "a_color"
        },

        uniform_names: {
            u_mat_m: "u_mat_m",
            u_mat_p: "u_mat_p",
            u_mat_v: "u_mat_v"
        },

        sampler_names: {
            sampler_01: "sampler_01",
            sampler_02: "sampler_02",
            sampler_03: "sampler_03",
            sampler_04: "sampler_04",
            sampler_05: "sampler_05",
            sampler_06: "sampler_06",
            sampler_07: "sampler_07",
            sampler_08: "sampler_08"
        },
    },

    init: function() {

        this.m_type = gb.resource_base.type.shader;

        this.m_handler = -1;
        this.m_uniforms = [];
        this.m_uniforms[gb.shader.uniform_type.max - 1] = -1;
        this.m_samplers = [];
        this.m_samplers[gb.shader.sampler_type.max - 1] = -1;
        this.m_attributes = [];
        this.m_attributes[gb.shader.attribute_type.max - 1] = -1;

        this.m_custom_uniforms = [];
        this.m_custom_attributes = [];

        this.m_cached_uniforms = [];

        Object.defineProperty(this, "attributes", {
            get: function() {
                return this.m_attributes;
            }
        });
    },

    release: function() {

    },

    methods: {
        setup: function() {
            this.m_uniforms[gb.shader.uniform_type.mat_m] = gl.getUniformLocation(this.m_handler, gb.shader.uniform_names.u_mat_m);
            this.m_uniforms[gb.shader.uniform_type.mat_v] = gl.getUniformLocation(this.m_handler, gb.shader.uniform_names.u_mat_v);
            this.m_uniforms[gb.shader.uniform_type.mat_p] = gl.getUniformLocation(this.m_handler, gb.shader.uniform_names.u_mat_p);

            this.m_samplers[gb.shader.sampler_type.sampler_01] = gl.getUniformLocation(this.m_handler, gb.shader.sampler_names.sampler_01);
            this.m_samplers[gb.shader.sampler_type.sampler_02] = gl.getUniformLocation(this.m_handler, gb.shader.sampler_names.sampler_02);
            this.m_samplers[gb.shader.sampler_type.sampler_03] = gl.getUniformLocation(this.m_handler, gb.shader.sampler_names.sampler_03);
            this.m_samplers[gb.shader.sampler_type.sampler_04] = gl.getUniformLocation(this.m_handler, gb.shader.sampler_names.sampler_04);
            this.m_samplers[gb.shader.sampler_type.sampler_05] = gl.getUniformLocation(this.m_handler, gb.shader.sampler_names.sampler_05);
            this.m_samplers[gb.shader.sampler_type.sampler_06] = gl.getUniformLocation(this.m_handler, gb.shader.sampler_names.sampler_06);
            this.m_samplers[gb.shader.sampler_type.sampler_07] = gl.getUniformLocation(this.m_handler, gb.shader.sampler_names.sampler_07);
            this.m_samplers[gb.shader.sampler_type.sampler_08] = gl.getUniformLocation(this.m_handler, gb.shader.sampler_names.sampler_08);

            this.m_attributes[gb.shader.attribute_type.position] = gl.getAttribLocation(this.m_handler, gb.shader.attribute_names.a_position);
            this.m_attributes[gb.shader.attribute_type.texcoord] = gl.getAttribLocation(this.m_handler, gb.shader.attribute_names.a_texcoord);
            this.m_attributes[gb.shader.attribute_type.color] = gl.getAttribLocation(this.m_handler, gb.shader.attribute_names.a_color);
        },

        on_transfering_data_serialized: function(data) {
            switch (data.type) {
                case gb.resource_transfering_data.type.shader:
                    {
                        this.m_status = gb.resource_base.status.loaded;
                    }
                    break;
            }
        },

        on_transfering_data_commited: function(data) {
            switch (data.type) {
                case gb.resource_transfering_data.type.shader:
                    {
                        this.m_handler = data.handler;
                        this.m_status = gb.resource_base.status.commited;
                        this.setup();
                    }
                    break;
            }
        },

        get_custom_uniform: function(uniform) {
            var handler = -1;
            if (typeof this.m_custom_uniforms[uniform] !== 'undefined') {
                handler = this.m_custom_uniforms[uniform];
            } else {
                handler = gl.getUniformLocation(this.m_handler, uniform);
                this.m_custom_uniforms[uniform] = handler;
            }
            return handler;
        },

        set_mat4: function(value, uniform) {
            if (this.status === gb.resource_base.status.commited) {
                if (typeof this.m_cached_uniforms[uniform] !== 'undefined' && this.m_cached_uniforms[uniform] === value) {
                    return;
                } else if (typeof this.m_cached_uniforms[uniform] === 'undefined') {
                    this.m_cached_uniforms[uniform] = new gb.shader_uniform();
                }
                var handler = this.m_uniforms[uniform];
                gl.uniformMatrix4fv(handler, false, new Float32Array(value.to_array()));
                this.m_cached_uniforms[uniform].mat4_value = value;
            }
        },

        set_custom_mat4: function(value, uniform) {
            if (this.status === gb.resource_base.status.commited) {
                gl.uniformMatrix4fv(this.get_custom_uniform(uniform), false, new Float32Array(value.to_array()));
            }
        },

        set_vec4: function(value, uniform) {
            if (this.status === gb.resource_base.status.commited) {
                if (typeof this.m_cached_uniforms[uniform] !== 'undefined' && this.m_cached_uniforms[uniform] === value) {
                    return;
                } else if (typeof this.m_cached_uniforms[uniform] === 'undefined') {
                    this.m_cached_uniforms[uniform] = new gb.shader_uniform();
                }
                var handler = this.m_uniforms[uniform];
                gl.uniform4fv(handler, new Float32Array(value.to_array()));
                this.m_cached_uniforms[uniform].vec4_value = value;
            }
        },

        set_custom_vec4: function(value, uniform) {
            if (this.status === gb.resource_base.status.commited) {
                gl.uniform4fv(this.get_custom_uniform(uniform), new Float32Array(value.to_array()));
            }
        },

        set_vec3: function(value, uniform) {
            if (this.status === gb.resource_base.status.commited) {
                if (typeof this.m_cached_uniforms[uniform] !== 'undefined' && this.m_cached_uniforms[uniform] === value) {
                    return;
                } else if (typeof this.m_cached_uniforms[uniform] === 'undefined') {
                    this.m_cached_uniforms[uniform] = new gb.shader_uniform();
                }
                var handler = this.m_uniforms[uniform];
                gl.uniform3fv(handler, new Float32Array(value.to_array()));
                this.m_cached_uniforms[uniform].vec3_value = value;
            }
        },

        set_custom_vec3: function(value, uniform) {
            if (this.status === gb.resource_base.status.commited) {
                gl.uniform3fv(this.get_custom_uniform(uniform), new Float32Array(value.to_array()));
            }
        },

        set_vec2: function(value, uniform) {
            if (this.status === gb.resource_base.status.commited) {
                if (typeof this.m_cached_uniforms[uniform] !== 'undefined' && this.m_cached_uniforms[uniform] === value) {
                    return;
                } else if (typeof this.m_cached_uniforms[uniform] === 'undefined') {
                    this.m_cached_uniforms[uniform] = new gb.shader_uniform();
                }
                var handler = this.m_uniforms[uniform];
                gl.uniform2fv(handler, new Float32Array(value.to_array()));
                this.m_cached_uniforms[uniform].vec2_value = value;
            }
        },

        set_custom_vec2: function(value, uniform) {
            if (this.status === gb.resource_base.status.commited) {
                gl.uniform2fv(this.get_custom_uniform(uniform), new Float32Array(value.to_array()));
            }
        },

        set_f32: function(value, uniform) {
            if (this.status === gb.resource_base.status.commited) {
                if (typeof this.m_cached_uniforms[uniform] !== 'undefined' && this.m_cached_uniforms[uniform] === value) {
                    return;
                } else if (typeof this.m_cached_uniforms[uniform] === 'undefined') {
                    this.m_cached_uniforms[uniform] = new gb.shader_uniform();
                }
                var handler = this.m_uniforms[uniform];
                gl.uniform1f(handler, value);
                this.m_cached_uniforms[uniform].f32_value = value;
            }
        },

        set_custom_f32: function(value, uniform) {
            if (this.status === gb.resource_base.status.commited) {
                gl.uniform1f(this.get_custom_uniform(uniform), value);
            }
        },

        set_i32: function(value, uniform) {
            if (this.status === gb.resource_base.status.commited) {
                if (typeof this.m_cached_uniforms[uniform] !== 'undefined' && this.m_cached_uniforms[uniform] === value) {
                    return;
                } else if (typeof this.m_cached_uniforms[uniform] === 'undefined') {
                    this.m_cached_uniforms[uniform] = new gb.shader_uniform();
                }
                var handler = this.m_uniforms[uniform];
                gl.uniform1i(handler, value);
                this.m_cached_uniforms[uniform].i32_value = value;
            }
        },

        set_custom_i32: function(value, uniform) {
            if (this.status === gb.resource_base.status.commited) {
                gl.uniform1i(this.get_custom_uniform(uniform), value);
            }
        },

        set_texture: function(texture, sampler) {
            if (this.status === gb.resource_base.status.commited && sampler < gb.shader.sampler_type.max) {
                gl.activeTexture(gl.TEXTURE0 + sampler);
                texture.bind();
                gl.uniform1i(this.m_samplers[sampler], sampler);
            }
        },

        bind: function() {
            if (this.status === gb.resource_base.status.commited) {
                gl.useProgram(this.m_handler);
            }
        },

        unbind: function() {
            if (this.status === gb.resource_base.status.commited) {
                gl.useProgram(null);
            }
        },
    },

    static_methods: {
        construct: function(guid, vs_source_code, fs_source_code) {
            var shader = null;
            var shader_compiler = new gb.shader_compiler_glsl();
            var vs_handler = shader_compiler.compile(vs_source_code, gl.VERTEX_SHADER);
            if (vs_handler !== -1) {
                var fs_handler = shader_compiler.compile(fs_source_code, gl.FRAGMENT_SHADER);
                if (fs_handler !== -1) {
                    var handler = shader_compiler.link(vs_handler, fs_handler);
                    if (handler !== -1) {
                        shader = new gb.shader(guid);
                        shader.m_handler = handler;
                        shader.m_status = gb.resource_base.status.commited;
                        shader.setup();
                    }
                }
            }
            return shader;
        }
    }
});
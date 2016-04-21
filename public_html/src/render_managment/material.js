/* global oop, gl, gb, console */

"use strict";

var g_cached_parameters = null;

oop.define_class({
    namespace: "gb",
    name: "material_cached_parameters",

    init: function() {
        this.m_is_cull_face = false;
        this.m_cull_face_mode = gl.FRONT;

        this.m_is_blending = false;
        this.m_blending_function_source = gl.SRC_ALPHA;
        this.m_blending_function_destination = gl.ONE_MINUS_SRC_ALPHA;
        this.m_blending_equation = gl.FUNC_ADD;

        this.m_is_stencil_test = false;
        this.m_stencil_function = gl.ALWAYS;
        this.m_stencil_function_parameter_1 = -1;
        this.m_stencil_function_parameter_2 = -1;
        this.m_stencil_mask_parameter = -1;

        this.m_is_depth_test = false;
        this.m_is_depth_mask = false;

        this.m_shader = null;

        this.m_textures = [];
        for (var i = 0; i < 8; ++i) {
            this.m_textures[i] = null;
        }

        Object.defineProperty(this, 'is_cull_face', {
            get: function() {
                return this.m_is_cull_face;
            },
            set: function(value) {
                this.m_is_cull_face = value;
            }
        });

        Object.defineProperty(this, 'cull_face_mode', {
            get: function() {
                return this.m_cull_face_mode;
            },
            set: function(value) {
                this.m_cull_face_mode = value;
            }
        });

        Object.defineProperty(this, 'is_blending', {
            get: function() {
                return this.m_is_blending;
            },
            set: function(value) {
                this.m_is_blending = value;
            }
        });

        Object.defineProperty(this, 'blending_function_source', {
            get: function() {
                return this.m_blending_function_source;
            },
            set: function(value) {
                this.m_blending_function_source = value;
            }
        });

        Object.defineProperty(this, 'blending_function_destination', {
            get: function() {
                return this.m_blending_function_destination;
            },
            set: function(value) {
                this.m_blending_function_destination = value;
            }
        });

        Object.defineProperty(this, 'blending_equation', {
            get: function() {
                return this.m_blending_equation;
            },
            set: function(value) {
                this.m_blending_equation = value;
            }
        });

        Object.defineProperty(this, 'is_stencil_test', {
            get: function() {
                return this.m_is_stencil_test;
            },
            set: function(value) {
                this.m_is_stencil_test = value;
            }
        });

        Object.defineProperty(this, 'stencil_function', {
            get: function() {
                return this.m_stencil_function;
            },
            set: function(value) {
                this.m_stencil_function = value;
            }
        });

        Object.defineProperty(this, 'stencil_function_parameter_1', {
            get: function() {
                return this.m_stencil_function_parameter_1;
            },
            set: function(value) {
                this.m_stencil_function_parameter_1 = value;
            }
        });

        Object.defineProperty(this, 'stencil_function_parameter_2', {
            get: function() {
                return this.m_stencil_function_parameter_2;
            },
            set: function(value) {
                this.m_stencil_function_parameter_2 = value;
            }
        });

        Object.defineProperty(this, 'stencil_mask_parameter', {
            get: function() {
                return this.m_stencil_mask_parameter;
            },
            set: function(value) {
                this.m_stencil_mask_parameter = value;
            }
        });

        Object.defineProperty(this, 'is_depth_test', {
            get: function() {
                return this.m_is_depth_test;
            },
            set: function(value) {
                this.m_is_depth_test = value;
            }
        });

        Object.defineProperty(this, 'is_depth_mask', {
            get: function() {
                return this.m_is_depth_mask;
            },
            set: function(value) {
                this.m_is_depth_mask = value;
            }
        });

        Object.defineProperty(this, 'shader', {
            get: function() {
                return this.m_shader;
            },
            set: function(value) {
                this.m_shader = value;
            }
        });

        Object.defineProperty(this, 'textures', {
            get: function() {
                return this.m_textures;
            },
            set: function(value) {
                this.m_textures = value;
            }
        });
    },

    release: function() {

    },

    methods: {

    },

    static_methods: {
        get_cached_parameters: function() {
            if (g_cached_parameters === null) {
                g_cached_parameters = new gb.material_cached_parameters();

                g_cached_parameters.is_cull_face = true;
                gl.enable(gl.CULL_FACE);
                g_cached_parameters.cull_face_mode = gl.BACK;
                gl.cullFace(gl.BACK);

                g_cached_parameters.is_blending = true;
                gl.enable(gl.BLEND);
                g_cached_parameters.blending_function_source = gl.SRC_ALPHA;
                g_cached_parameters.blending_function_destination = gl.ONE_MINUS_SRC_ALPHA;
                gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

                g_cached_parameters.is_stencil_test = false;
                gl.disable(gl.STENCIL_TEST);
                g_cached_parameters.stencil_function = gl.ALWAYS;
                g_cached_parameters.stencil_function_parameter_1 = 0;
                g_cached_parameters.stencil_function_parameter_2 = 0;
                gl.stencilFunc(gl.ALWAYS, 0, 0);
                g_cached_parameters.m_stencil_mask_parameter = 0;
                gl.stencilMask(0);

                g_cached_parameters.is_depth_test = true;
                gl.enable(gl.DEPTH_TEST);
                g_cached_parameters.is_depth_mask = true;
                gl.depthMask(true);
            }
            return g_cached_parameters;
        }
    }
});

oop.define_class({
    namespace: "gb",
    name: "material",

    init: function() {
        this.m_parameters = new gb.material_cached_parameters();
        this.m_custom_shader_uniforms = [];
        this.m_guid = "";

        Object.defineProperty(this, 'is_cull_face', {
            get: function() {
                return this.m_parameters.is_cull_face;
            },
            set: function(value) {
                this.m_parameters.is_culling = value;
            }
        });

        Object.defineProperty(this, 'cull_face_mode', {
            get: function() {
                return this.m_parameters.cull_face_mode;
            },
            set: function(value) {
                this.m_parameters.cull_face_mode = value;
            }
        });

        Object.defineProperty(this, 'is_blending', {
            get: function() {
                return this.m_parameters.is_blending;
            },
            set: function(value) {
                this.m_parameters.is_blending = value;
            }
        });

        Object.defineProperty(this, 'blending_function_source', {
            get: function() {
                return this.m_parameters.blending_function_source;
            },
            set: function(value) {
                this.m_parameters.blending_function_source = value;
            }
        });

        Object.defineProperty(this, 'blending_function_destination', {
            get: function() {
                return this.m_parameters.blending_function_destination;
            },
            set: function(value) {
                this.m_parameters.blending_function_destination = value;
            }
        });

        Object.defineProperty(this, 'blending_equation', {
            get: function() {
                return this.m_parameters.blending_equation;
            },
            set: function(value) {
                this.m_parameters.blending_equation = value;
            }
        });

        Object.defineProperty(this, 'is_stencil_test', {
            get: function() {
                return this.m_parameters.is_stencil_test;
            },
            set: function(value) {
                this.m_parameters.is_stencil_test = value;
            }
        });

        Object.defineProperty(this, 'stencil_function', {
            get: function() {
                return this.m_parameters.stencil_function;
            },
            set: function(value) {
                this.m_parameters.stencil_function = value;
            }
        });

        Object.defineProperty(this, 'stencil_function_parameter_1', {
            get: function() {
                return this.m_parameters.stencil_function_parameter_1;
            },
            set: function(value) {
                this.m_parameters.stencil_function_parameter_1 = value;
            }
        });

        Object.defineProperty(this, 'stencil_function_parameter_2', {
            get: function() {
                return this.m_parameters.stencil_function_parameter_2;
            },
            set: function(value) {
                this.m_parameters.stencil_function_parameter_2 = value;
            }
        });

        Object.defineProperty(this, 'stencil_mask_parameter', {
            get: function() {
                return this.m_parameters.stencil_mask_parameter;
            },
            set: function(value) {
                this.m_parameters.stencil_mask_parameter = value;
            }
        });

        Object.defineProperty(this, 'is_depth_test', {
            get: function() {
                return this.m_parameters.is_depth_test;
            },
            set: function(value) {
                this.m_parameters.is_depth_test = value;
            }
        });

        Object.defineProperty(this, 'is_depth_mask', {
            get: function() {
                return this.m_parameters.is_depth_mask;
            },
            set: function(value) {
                this.m_parameters.is_depth_mask = value;
            }
        });

        Object.defineProperty(this, 'shader', {
            get: function() {
                return this.m_parameters.shader;
            },
            set: function(value) {
                this.m_parameters.shader = value;
            }
        });

        Object.defineProperty(this, 'guid', {
            get: function() {
                return this.m_guid;
            },
            set: function(value) {
                this.m_guid = value;
            }
        });
    },

    release: function() {

    },

    methods: {
        set_texture: function(texture, sampler) {
            this.m_parameters.textures[sampler] = texture;
        },

        set_custom_shader_uniform: function(value, uniform) {
            var current_uniform = null;
            if (typeof this.m_custom_shader_uniforms[uniform] !== 'undefined') {
                current_uniform = this.m_custom_shader_uniforms[uniform];
            } else {
                current_uniform = new gb.shader_uniform();
                this.m_custom_shader_uniforms[uniform] = current_uniform;
            }

            if (value instanceof gb.mat4) {
                current_uniform.mat4_value = value;
                current_uniform.type = gb.shader_uniform.type.mat4;
            } else if (value instanceof gb.vec4) {
                current_uniform.vec4_value = value;
                current_uniform.type = gb.shader_uniform.type.vec4;
            } else if (value instanceof gb.vec3) {
                current_uniform.vec3_value = value;
                current_uniform.type = gb.shader_uniform.type.vec3;
            } else if (value instanceof gb.vec2) {
                current_uniform.vec2_value = value;
                current_uniform.type = gb.shader_uniform.type.vec2;
            } else if (typeof value === 'number') {
                if (gb.math.is_int(value)) {
                    current_uniform.i32_value = value;
                    current_uniform.type = gb.shader_uniform.type.i32;
                } else {
                    current_uniform.f32_value = value;
                    current_uniform.type = gb.shader_uniform.type.f32;
                }
            } else {
                console.log("unknown shader uniform type: ", typeof value);
            }
        },

        bind_custom_shader_uniforms: function() {
            for (var key in this.m_custom_shader_uniforms) {
                var current_uniform = this.m_custom_shader_uniforms[key];
                switch (current_uniform.type) {
                    case gb.shader_uniform.type.mat4:
                        this.m_parameters.shader.set_custom_mat4(current_uniform.mat4_value, key);
                        break;
                    case gb.shader_uniform.type.vec4:
                        this.m_parameters.shader.set_custom_vec4(current_uniform.vec4_value, key);
                        break;
                    case gb.shader_uniform.type.vec3:
                        this.m_parameters.shader.set_custom_vec3(current_uniform.vec3_value, key);
                        break;
                    case gb.shader_uniform.type.vec2:
                        this.m_parameters.shader.set_custom_vec2(current_uniform.vec2_value, key);
                        break;
                    case gb.shader_uniform.type.f32:
                        this.m_parameters.shader.set_custom_f32(current_uniform.f32_value, key);
                        break;
                    case gb.shader_uniform.type.i32:
                        this.m_parameters.shader.set_custom_i32(current_uniform.i32_value, key);
                        break;
                }
            }
        },

        bind: function() {
            this.m_parameters.shader.bind();

            for (var i = 0; i < 8; ++i) {
                if (this.m_parameters.textures[i] !== null) {
                    this.m_parameters.shader.set_texture(this.m_parameters.textures[i], i);
                }
            }

            if (this.m_parameters.is_depth_test && this.m_parameters.is_depth_test !== gb.material_cached_parameters.get_cached_parameters.is_depth_test) {
                gl.enable(gl.DEPTH_TEST);
                gb.material_cached_parameters.get_cached_parameters.is_depth_test = this.m_parameters.is_depth_test;
            } else if (this.m_parameters.is_depth_test !== gb.material_cached_parameters.get_cached_parameters.is_depth_test) {
                gl.disable(gl.DEPTH_TEST);
                gb.material_cached_parameters.get_cached_parameters.is_depth_test = this.m_parameters.is_depth_test;
            }

            if (this.m_parameters.is_depth_mask && this.m_parameters.is_depth_mask !== gb.material_cached_parameters.get_cached_parameters.is_depth_mask) {
                gl.depthMask(true);
                gb.material_cached_parameters.get_cached_parameters.is_depth_mask = this.m_parameters.is_depth_mask;
            } else if (this.m_parameters.is_depth_mask !== gb.material_cached_parameters.get_cached_parameters.is_depth_mask) {
                gl.depthMask(false);
                gb.material_cached_parameters.get_cached_parameters.is_depth_mask = this.m_parameters.is_depth_mask;
            }

            if (this.m_parameters.is_cull_face && this.m_parameters.is_cull_face !== gb.material_cached_parameters.get_cached_parameters.is_cull_face) {
                gl.enable(gl.CULL_FACE);
                gb.material_cached_parameters.get_cached_parameters.is_cull_face = this.m_parameters.is_cull_face;
            } else if (this.m_parameters.is_cull_face !== gb.material_cached_parameters.get_cached_parameters.is_cull_face) {
                gl.disable(gl.CULL_FACE);
                gb.material_cached_parameters.get_cached_parameters.is_cull_face = this.m_parameters.is_cull_face;
            }

            if (this.m_parameters.cull_face_mode && this.m_parameters.cull_face_mode !== gb.material_cached_parameters.get_cached_parameters.cull_face_mode) {
                gl.cullFace(this.m_parameters.cull_face_mode);
                gb.material_cached_parameters.get_cached_parameters.cull_face_mode = this.m_parameters.cull_face_mode;
            } else if (this.m_parameters.cull_face_mode !== gb.material_cached_parameters.get_cached_parameters.cull_face_mode) {
                gl.cullFace(this.m_parameters.cull_face_mode);
                gb.material_cached_parameters.get_cached_parameters.cull_face_mode = this.m_parameters.cull_face_mode;
            }

            if (this.m_parameters.is_blending && this.m_parameters.is_blending !== gb.material_cached_parameters.get_cached_parameters.is_blending) {
                gl.enable(gl.BLEND);
                gb.material_cached_parameters.get_cached_parameters.is_blending = this.m_parameters.is_blending;
            } else if (this.m_parameters.is_blending !== gb.material_cached_parameters.get_cached_parameters.is_blending) {
                gl.disable(gl.BLEND);
                gb.material_cached_parameters.get_cached_parameters.is_blending = this.m_parameters.is_blending;
            }

            if (this.m_parameters.blending_function_source !== gb.material_cached_parameters.get_cached_parameters.blending_function_source ||
                this.m_parameters.blending_function_destination !== gb.material_cached_parameters.get_cached_parameters.blending_function_destination) {
                gl.blendFunc(this.m_parameters.blending_function_source, this.m_parameters.blending_function_destination);
                gb.material_cached_parameters.get_cached_parameters.blending_function_source = this.m_parameters.blending_function_source;
                gb.material_cached_parameters.get_cached_parameters.blending_function_destination = this.m_parameters.blending_function_destination;
            }

            if (this.m_parameters.blending_equation !== gb.material_cached_parameters.get_cached_parameters.blending_equation) {
                gl.blendEquation(this.m_parameters.blending_equation);
                gb.material_cached_parameters.get_cached_parameters.blending_equation = this.m_parameters.blending_equation;
            }

            if (this.m_parameters.is_stencil_test && this.m_parameters.is_stencil_test !== gb.material_cached_parameters.get_cached_parameters.is_stencil_test) {
                gl.enable(gl.STENCIL_TEST);
                gb.material_cached_parameters.get_cached_parameters.is_stencil_test = this.m_parameters.is_stencil_test;
            } else if (this.m_parameters.is_stencil_test !== gb.material_cached_parameters.get_cached_parameters.is_stencil_test) {
                gl.disable(gl.STENCIL_TEST);
                gb.material_cached_parameters.get_cached_parameters.is_stencil_test = this.m_parameters.is_stencil_test;
            }

            if (this.m_parameters.stencil_function !== gb.material_cached_parameters.get_cached_parameters.stencil_function ||
                this.m_parameters.stencil_function_parameter_1 !== gb.material_cached_parameters.get_cached_parameters.stencil_function_parameter_1 ||
                this.m_parameters.stencil_function_parameter_2 !== gb.material_cached_parameters.get_cached_parameters.stencil_function_parameter_2) {
                gl.stencilFunc(this.m_parameters.stencil_function, this.m_parameters.stencil_function_parameter_1, this.m_parameters.stencil_function_parameter_2);
                gb.material_cached_parameters.get_cached_parameters.stencil_function = this.m_parameters.stencil_function;
                gb.material_cached_parameters.get_cached_parameters.stencil_function_parameter_1 = this.m_parameters.stencil_function_parameter_1;
                gb.material_cached_parameters.get_cached_parameters.stencil_function_parameter_2 = this.m_parameters.stencil_function_parameter_2;
            }

            if (this.m_parameters.stencil_mask_parameter !== gb.material_cached_parameters.get_cached_parameters.stencil_mask_parameter) {
                gl.stencilMask(this.m_parameters.stencil_mask_parameter);
                gb.material_cached_parameters.get_cached_parameters.stencil_mask_parameter = this.m_parameters.stencil_mask_parameter;
            }
            this.bind_custom_shader_uniforms();
        },

        unbind: function() {
            this.m_parameters.shader.unbind();
        }
    },

    static_methods: {
        construct: function(configuration) {
            var material = new gb.material();

            material.is_cull_face = configuration.is_cull_face;
            material.cull_face_mode = configuration.cull_face_mode;

            material.is_blending = configuration.is_blending;
            material.blending_function_source = configuration.blending_function_source;
            material.blending_function_destination = configuration.blending_function_destination;
            material.blending_equation = configuration.blending_equation;

            material.is_stencil_test = configuration.is_stencil_test;
            material.stencil_function = configuration.stencil_function;
            material.stencil_function_parameter_1 = configuration.stencil_function_parameter_1;
            material.stencil_function_parameter_2 = configuration.stencil_function_parameter_2;
            material.stencil_mask_parameter = configuration.stencil_mask_parameter;

            material.guid = "" + configuration.technique_name + configuration.technique_pass + configuration.shader_configuration.filename;

            return material;
        },

        set_shader: function(material, configuration, resource_accessor) {
            var shader = resource_accessor.get_shader(configuration.shader_configuration.filename);
            shader.add_resource_loading_callback(function(resource) {
                material.shader = resource;
            });
        },

        set_textures: function(material, configuration, resource_accessor) {
            
            var textures_count = configuration.textures_configurations ? configuration.textures_configurations.length : 0;
            if(textures_count) {
                var on_texture_loaded_callback = function(resource, userdata) {
                        resource.wrap_mode = userdata.wrap_mode;
                        resource.mag_filter = userdata.mag_filter;
                        resource.min_filter = userdata.min_filter;
                        material.set_texture(resource, userdata.sampler_index);
                    };
                for (var i = 0; i < textures_count; ++i) {
                    var texture_configuration = configuration.textures_configurations[i];
                    var texture_name = texture_configuration.filename.length !== 0 ? texture_configuration.filename : texture_configuration.technique_name;
                    var texture = resource_accessor.get_texture(texture_name);
                    texture.add_resource_loading_callback(on_texture_loaded_callback, texture_configuration);
                }
            }
        }
    }
});
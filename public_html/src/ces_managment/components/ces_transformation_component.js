/* global oop, gb */
"use strict";

oop.define_class({
    namespace: "gb",
    name: "ces_transformation_component",
    extend: gb.ces_base_component,

    init: function() {

        this.m_type = gb.ces_base_component.type.transformation;
        this.m_position = new gb.vec2(0.0);
        this.m_rotation = 0.0;
        this.m_scale = new gb.vec2(1.0);

        this.m_matrix_t = new gb.mat4().identity();
        this.m_matrix_r = new gb.mat4().identity();
        this.m_matrix_s = new gb.mat4().identity();

        this.m_matrix_m = new gb.mat4().identity();

        this.m_is_matrix_m_computed = false;

        var self = this;
        Object.defineProperty(this, 'position', {
            set: function(value) {
                self.m_position = value;

                Object.defineProperty(value, 'x', {
                    set: function(value) {
                        self.m_position.m_x = value;
                        self.m_matrix_t.translate(self.m_position.x, self.m_position.y, 0.0);
                        self.m_is_matrix_m_computed = false;
                    },
                    get: function() {
                        return self.m_position.m_x;
                    }
                });

                Object.defineProperty(value, 'y', {
                    set: function(value) {
                        self.m_position.m_y = value;
                        self.m_matrix_t.translate(self.m_position.x, self.m_position.y, 0.0);
                        self.m_is_matrix_m_computed = false;
                    },
                    get: function() {
                        return self.m_position.m_y;
                    }
                });

                self.m_matrix_t.translate(self.m_position.x, self.m_position.y, 0.0);
                self.m_is_matrix_m_computed = false;
            },

            get: function() {
                return self.m_position;
            }
        });

        Object.defineProperty(this, 'rotation', {
            set: function(value) {
                this.m_rotation = value;
                this.m_matrix_r.rotate_z(this.m_rotation);
                this.m_is_matrix_m_computed = false;
            },

            get: function() {
                return this.m_rotation;
            }
        });

        Object.defineProperty(this, 'scale', {
            set: function(value) {
                this.m_scale = value;
                this.m_matrix_s.scale(this.m_scale.x, this.m_scale.y, 1.0);
                this.m_is_matrix_m_computed = false;
            },

            get: function() {
                return this.m_scale;
            }
        });

        Object.defineProperty(this, "matrix_m", {
            get: function() {
                if (!this.m_is_matrix_m_computed) {
                    this.m_matrix_m = gb.mat4.multiply(gb.mat4.multiply(this.m_matrix_t, this.m_matrix_r), this.m_matrix_s);
                    this.m_is_matrix_m_computed = true;
                }
                return this.m_matrix_m;
            }
        });

        this.position = new gb.vec2(0.0);
        this.rotation = 0.0;
        this.scale = new gb.vec2(1.0);
    },

    release: function() {

    },

    methods: {

    },

    static_methods: {
        get_parent_transformation: function(entity, is_use_scale) {
            var matrix = new gb.mat4().identity();
            var parent = entity.parent;

            while (parent) {
                var parent_transformation_component = parent.get_component(gb.ces_base_component.type.transformation);
                if (is_use_scale) {
                    matrix = gb.mat4.multiply(matrix, parent_transformation_component.matrix_m);
                } else {
                    matrix = gb.mat4.multiply(matrix, gb.mat4.multiply(parent_transformation_component.m_matrix_t, parent_transformation_component.m_matrix_r));
                }
                parent = parent.parent;
            }
            return matrix;
        },

        get_absolute_transformation: function(entity, is_use_scale) {
            var matrix = gb.ces_transformation_component.get_parent_transformation(entity, is_use_scale);
            var transformation_component = entity.get_component(gb.ces_base_component.type.transformation);
            if (is_use_scale) {
                matrix = gb.mat4.multiply(matrix, transformation_component.matrix_m);
            } else {
                matrix = gb.mat4.multiply(matrix, gb.mat4.multiply(transformation_component.m_matrix_t, transformation_component.m_matrix_r));
            }
            return matrix;
        },

        get_absolute_transformation_in_camera_space: function(entity) {
            var matrix = gb.ces_transformation_component.get_absolute_transformation(entity);
            if (entity.is_component_exist(gb.ces_base_component.type.scene)) {
                var scene_component = entity.get_component(gb.ces_base_component.type.scene);
                matrix = gb.mat4.multiply(matrix, scene_component.camera.matrix_v);
            }
            return matrix;
        }
    }
});
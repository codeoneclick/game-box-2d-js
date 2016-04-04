/* global gb */

"use strict";

gb.ces_transformation_component = function() {
    gb.ces_base_component.call(this);

    this.m_type = gb.ces_component_type.transformation;
    this.m_position = new gb.vec2(0.0);
    this.m_rotation = 0.0;
    this.m_scale = new gb.vec2(1.0);

    this.m_matrix_t = new gb.mat4().identity();
    this.m_matrix_r = new gb.mat4().identity();
    this.m_matrix_s = new gb.mat4().identity();

    this.m_matrix_m = new gb.mat4().identity();

    this.m_is_matrix_m_computed = false;

    Object.defineProperty(this, 'position', {
        set: function(value) {
            this.m_position = value;
            this.m_matrix_t.translate(this.m_position.x, this.m_position.y, 0.0);
            this.m_is_matrix_m_computed = false;
        },

        get: function() {
            return this.m_position;
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
            }
            return this.m_matrix_m;
        }
    });

    this.position = new gb.vec2(0.0);
    this.rotation = 0.0;
    this.scale = new gb.vec2(1.0);
};

gb.ces_transformation_component.prototype = Object.create(gb.ces_base_component.prototype);
gb.ces_transformation_component.prototype.constructor = gb.ces_transformation_component;
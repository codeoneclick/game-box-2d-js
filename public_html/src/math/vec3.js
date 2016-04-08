/* global oop, gb */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "vec3",

    init: function() {
        if (arguments[0] instanceof gb.vec3) {
            this.m_x = arguments[0].x;
            this.m_y = arguments[0].y;
            this.m_z = arguments[0].z;
        } else if (arguments.length === 1) {
            this.m_x = arguments[0];
            this.m_y = arguments[0];
            this.m_z = arguments[0];
        } else if (arguments.length === 3) {
            this.m_x = arguments[0];
            this.m_y = arguments[1];
            this.m_z = arguments[2];
        } else {
            this.m_x = 0;
            this.m_y = 0;
            this.m_z = 0;
        }

        Object.defineProperty(this, 'x', {
            get: function() {
                return this.m_x;
            },
            set: function(value) {
                this.m_x = value;
            }
        });

        Object.defineProperty(this, 'y', {
            get: function() {
                return this.m_y;
            },
            set: function(value) {
                this.m_y = value;
            }
        });

        Object.defineProperty(this, 'z', {
            get: function() {
                return this.m_z;
            },
            set: function(value) {
                this.m_z = value;
            }
        });
    },

    release: function() {

    },

    methods: {
        add: function(value) {
            this.x += value.x;
            this.y += value.y;
            this.z += value.z;
            return this;
        },

        add_scalar: function(value) {
            this.x += value;
            this.y += value;
            this.z += value;
            return this;
        },

        sub: function(value) {
            this.x -= value.x;
            this.y -= value.y;
            this.z -= value.z;
            return this;
        },

        sub_scalar: function(value) {
            this.x -= value;
            this.y -= value;
            this.z -= value;
            return this;
        },

        multiply: function(value) {
            this.x *= value.x;
            this.y *= value.y;
            this.z *= value.z;
            return this;
        },

        multiply_scalar: function(value) {
            this.x *= value;
            this.y *= value;
            this.z *= value;
            return this;
        },

        divide: function(value) {
            this.x /= value.x;
            this.y /= value.y;
            this.z /= value.z;
            return this;
        },

        divide_scalar: function(value) {
            this.x /= value;
            this.y /= value;
            this.z /= value;
            return this;
        },

        min: function(value) {
            this.x = Math.min(this.x, value.x);
            this.y = Math.min(this.y, value.y);
            this.z = Math.min(this.z, value.z);
            return this;
        },

        max: function(value) {
            this.x = Math.max(this.x, value.x);
            this.y = Math.max(this.y, value.y);
            this.z = Math.max(this.z, value.z);
            return this;
        },

        clamp: function(min, max) {
            this.x = Math.max(min.x, Math.min(max.x, this.x));
            this.y = Math.max(min.y, Math.min(max.y, this.y));
            this.z = Math.max(min.z, Math.min(max.z, this.z));
            return this;
        },

        dot: function(value) {
            return this.x * value.x + this.y * value.y + this.z * value.z;
        },

        cross: function(value) {
            var x = this.x,
                y = this.y,
                z = this.z;
            this.x = y * value.z - z * value.y;
            this.y = z * value.x - x * value.z;
            this.z = x * value.y - y * value.x;
            return this;
        },

        length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        },

        length_sq: function() {
            return this.x * this.x + this.y * this.y + this.z * this.z;
        },

        normalize: function() {
            return this.divide_scalar(this.length());
        },

        distance_to: function(value) {
            var dx = this.x - value.x,
                dy = this.y - value.y,
                dz = this.z - value.z;
            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        },

        lerp: function(value, alpha) {
            this.x += (value.x - this.x) * alpha;
            this.y += (value.y - this.y) * alpha;
            this.z += (value.z - this.z) * alpha;
            return this;
        },

        lerp_vectors: function(value_01, value_02, alpha) {
            this.sub_vectors(value_02, value_01).multiply_scalar(alpha).add(value_01);
            return this;
        },

        equals: function(value) {
            return ((value.x === this.x) && (value.y === this.y) && (value.z === this.z));
        },

        to_array: function() {
            var array = [];
            array[0] = this.x;
            array[1] = this.y;
            array[2] = this.z;
            return array;
        }
    },
    static_methods: {
        add: function(vector_01, vector_02) {
            return new gb.vec3(vector_01.x + vector_02.x,
                vector_01.y + vector_02.y,
                vector_01.z + vector_02.z);
        },

        sub: function(vector_01, vector_02) {
            return new gb.vec3(vector_01.x - vector_02.x,
                vector_01.y - vector_02.y,
                vector_01.z - vector_02.z);
        },

        cross: function(vector_01, vector_02) {
            return new gb.vec3(vector_01.y * vector_02.z - vector_01.z * vector_02.y,
                vector_01.z * vector_02.x - vector_01.x * vector_02.z,
                vector_01.x * vector_02.y - vector_01.y * vector_02.x);
        }
    }
});
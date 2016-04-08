/* global oop, gb */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "vec4",

    init: function() {
        if (arguments[0] instanceof gb.vec4) {
            this.m_x = arguments[0].x;
            this.m_y = arguments[0].y;
            this.m_z = arguments[0].z;
            this.m_w = arguments[0].w;
        } else if (arguments.length === 1) {
            this.m_x = arguments[0];
            this.m_y = arguments[0];
            this.m_z = arguments[0];
            this.m_w = arguments[0];
        } else if (arguments.length === 4) {
            this.m_x = arguments[0];
            this.m_y = arguments[1];
            this.m_z = arguments[2];
            this.m_w = arguments[3];
        } else {
            this.m_x = 0;
            this.m_y = 0;
            this.m_z = 0;
            this.m_w = 0;
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

        Object.defineProperty(this, 'w', {
            get: function() {
                return this.m_w;
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
            this.w += value.w;
            return this;
        },

        add_scalar: function(value) {
            this.x += value;
            this.y += value;
            this.z += value;
            this.w += value;
            return this;
        },

        add_vectors: function(value_01, value_02) {
            this.x = value_01.x + value_02.x;
            this.y = value_01.y + value_02.y;
            this.z = value_01.z + value_02.z;
            this.w = value_01.w + value_02.w;
            return this;
        },

        sub: function(value) {
            this.x -= value.x;
            this.y -= value.y;
            this.z -= value.z;
            this.w -= value.w;
            return this;
        },

        sub_scalar: function(value) {
            this.x -= value;
            this.y -= value;
            this.z -= value;
            this.w -= value;
            return this;
        },

        sub_vectors: function(value_01, value_02) {
            this.x = value_01.x - value_02.x;
            this.y = value_01.y - value_02.y;
            this.z = value_01.z - value_02.z;
            this.w = value_01.w - value_02.w;
            return this;
        },

        multiply: function(value) {
            this.x *= value.x;
            this.y *= value.y;
            this.z *= value.z;
            this.w *= value.w;
            return this;
        },

        multiply_scalar: function(value) {
            this.x *= value;
            this.y *= value;
            this.z *= value;
            this.w *= value;
            return this;
        },

        divide: function(value) {
            this.x /= value.x;
            this.y /= value.y;
            this.z /= value.z;
            this.w /= value.w;
            return this;
        },

        divide_scalar: function(value) {
            this.x /= value;
            this.y /= value;
            this.z /= value;
            this.w /= value;
            return this;
        },

        min: function(value) {
            this.x = Math.min(this.x, value.x);
            this.y = Math.min(this.y, value.y);
            this.z = Math.min(this.z, value.z);
            this.w = Math.min(this.w, value.w);
            return this;
        },

        max: function(value) {
            this.x = Math.max(this.x, value.x);
            this.y = Math.max(this.y, value.y);
            this.z = Math.max(this.z, value.z);
            this.w = Math.max(this.w, value.w);
            return this;
        },

        clamp: function(min, max) {
            this.x = Math.max(min.x, Math.min(max.x, this.x));
            this.y = Math.max(min.y, Math.min(max.y, this.y));
            this.z = Math.max(min.z, Math.min(max.z, this.z));
            this.w = Math.max(min.w, Math.min(max.w, this.w));
            return this;
        },

        dot: function(value) {
            return this.x * value.x + this.y * value.y + this.z * value.z + this.w * value.w;
        },

        length: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
        },

        normalize: function() {
            return this.divide_scalar(this.length());
        },

        lerp: function(value, alpha) {
            this.x += (value.x - this.x) * alpha;
            this.y += (value.y - this.y) * alpha;
            this.z += (value.z - this.z) * alpha;
            this.w += (value.w - this.w) * alpha;
            return this;
        },

        lerp_vectors: function(value_01, value_02, alpha) {
            this.sub_vectors(value_02, value_01).multiply_scalar(alpha).add(value_01);
            return this;
        },

        equals: function(value) {
            return ((value.x === this.x) && (value.y === this.y) && (value.z === this.z) && (value.w === this.w));
        },

        to_array: function() {
            var array = [];
            array.push(this.x);
            array.push(this.y);
            array.push(this.z);
            array.push(this.w);
            return array;
        }
    },
    static_methods: {

    }
});
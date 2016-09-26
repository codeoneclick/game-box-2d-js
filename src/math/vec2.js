/* global oop, gb */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "vec2",

    init: function() {
        this.m_data = new Float32Array(2);
        if (arguments[0] instanceof gb.vec2) {
            this.m_data[0] = arguments[0].x;
            this.m_data[1] = arguments[0].y;
        } else if (arguments.length === 1) {
            this.m_data[0] = arguments[0];
            this.m_data[1] = arguments[0];
        } else if (arguments.length === 2) {
            this.m_data[0] = arguments[0];
            this.m_data[1] = arguments[1];
        } else {
            this.m_data[0] = 0;
            this.m_data[1] = 0;
        }

        Object.defineProperty(this, 'x', {
            configurable: true,
            get: function() {
                return this.m_data[0];
            },
            set: function(value) {
                this.m_data[0] = value;
            }
        });

        Object.defineProperty(this, 'y', {
            configurable: true,
            get: function() {
                return this.m_data[1];
            },
            set: function(value) {
                this.m_data[1] = value;
            }
        });
    },

    release: function() {

    },

    methods: {
        add: function(vector) {
            this.m_data[0] += vector.m_data[0];
            this.m_data[1] += vector.m_data[1];
            return this;
        },

        add_scalar: function(scalar) {
            this.m_data[0] += scalar;
            this.m_data[1] += scalar;
            return this;
        },

        sub: function(value) {
            this.m_data[0] -= value.m_data[0];
            this.m_data[1] -= value.m_data[1];
            return this;
        },

        sub_scalar: function(value) {
            this.m_data[0] -= value;
            this.m_data[1] -= value;
            return this;
        },

        multiply: function(value) {
            this.m_data[0] *= value.m_data[0];
            this.m_data[1] *= value.m_data[1];
            return this;
        },

        multiply_scalar: function(value) {
            this.m_data[0] *= value;
            this.m_data[1] *= value;
            return this;
        },

        divide: function(value) {
            this.m_data[0] /= value.m_data[0];
            this.m_data[1] /= value.m_data[1];
            return this;
        },

        divide_scalar: function(value) {
            this.m_data[0] /= value;
            this.m_data[1] /= value;
            return this;
        },

        clamp: function(min, max) {
            this.m_data[0] = Math.max(min.m_data[0], Math.min(max.m_data[0], this.m_data[0]));
            this.m_data[1] = Math.max(min.m_data[1], Math.min(max.m_data[1], this.m_data[1]));
            return this;
        },

        dot: function(value) {
            return this.m_data[0] * value.m_data[0] + this.m_data[1] * value.m_data[1];
        },

        length: function() {
            return Math.sqrt(this.m_data[0] * this.m_data[0] + this.m_data[1] * this.m_data[1]);
        },

        normalize: function() {
            return this.divide_scalar(this.length());
        },

        angle: function() {
            var angle = Math.atan2(this.m_data[1], this.m_data[0]);
            if (angle < 0) {
                angle += 2 * Math.PI;
            }
            return angle;
        },

        distance_to: function(value) {
            var dx = this.m_data[0] - value.m_data[0],
                dy = this.m_data[1] - value.m_data[1];
            return Math.sqrt(dx * dx + dy * dy);
        },

        lerp: function(value, alpha) {
            this.m_data[0] += (value.m_data[0] - this.m_data[0]) * alpha;
            this.m_data[1] += (value.m_data[1] - this.m_data[1]) * alpha;
            return this;
        },

        equals: function(value) {
            return ((value.m_data[0] === this.m_data[0]) && (value.m_data[1] === this.m_data[1]));
        },

        min: function(value) {
            this.m_data[0] = Math.min(this.m_data[0], value.m_data[0]);
            this.m_data[1] = Math.min(this.m_data[1], value.m_data[1]);
            return this;
        },

        max: function(value) {
            this.m_data[0] = Math.max(this.m_data[0], value.m_data[0]);
            this.m_data[1] = Math.max(this.m_data[1], value.m_data[1]);
            return this;
        },

        to_array: function() {
            return this.m_data;
        }
    },

    static_methods: {
        add: function(vector_01, vector_02) {
            return new gb.vec2(vector_01.m_data[0] + vector_02.m_data[0],
                vector_01.m_data[1] + vector_02.m_data[1]);
        },

        sub: function(vector_01, vector_02) {
            return new gb.vec2(vector_01.m_data[0] - vector_02.m_data[0],
                vector_01.m_data[1] - vector_02.m_data[1]);
        },

        lerp: function(vector_01, vector_02, alpha) {
            return gb.vec2.sub(vector_02, vector_01).multiply_scalar(alpha).add(vector_01);
        },

        equals: function(vector_01, vector_02) {
            return ((vector_01.m_data[0] === vector_02.m_data[0]) && (vector_01.m_data[1] === vector_02.m_data[1]));
        },

        min: function(vector_01, vector_02) {
            var vector_03 = new gb.vec2(0);
            vector_03.m_data[0] = Math.min(vector_01.m_data[0], vector_02.m_data[0]);
            vector_03.m_data[1] = Math.min(vector_01.m_data[1], vector_02.m_data[1]);
            return vector_03;
        },

        max: function(vector_01, vector_02) {
            var vector_03 = new gb.vec2(0);
            vector_03.m_data[0] = Math.max(vector_01.m_data[0], vector_02.m_data[0]);
            vector_03.m_data[1] = Math.max(vector_01.m_data[1], vector_02.m_data[1]);
            return vector_03;
        }
    }
});
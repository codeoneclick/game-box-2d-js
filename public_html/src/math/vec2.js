/* global oop, gb */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "vec2",

    init: function() {
        if (arguments[0] instanceof gb.vec2) {
            this.m_x = arguments[0].x;
            this.m_y = arguments[0].y;
        } else if (arguments.length === 1) {
            this.m_x = arguments[0];
            this.m_y = arguments[0];
        } else if (arguments.length === 2) {
            this.m_x = arguments[0];
            this.m_y = arguments[1];
        } else {
            this.m_x = 0;
            this.m_y = 0;
        }

        Object.defineProperty(this, 'x', {
            configurable: true,
            get: function() {
                return this.m_x;
            },
            set: function(value) {
                this.m_x = value;
            }
        });

        Object.defineProperty(this, 'y', {
            configurable: true,
            get: function() {
                return this.m_y;
            },
            set: function(value) {
                this.m_y = value;
            }
        });
    },

    release: function() {

    },

    methods: {
        add: function(vector) {
            this.m_x += vector.m_x;
            this.m_y += vector.m_y;
            return this;
        },

        add_scalar: function(scalar) {
            this.m_x += scalar;
            this.m_y += scalar;
            return this;
        },

        sub: function(value) {
            this.m_x -= value.m_x;
            this.m_y -= value.m_y;
            return this;
        },

        sub_scalar: function(value) {
            this.m_x -= value;
            this.m_y -= value;
            return this;
        },

        multiply: function(value) {
            this.m_x *= value.m_x;
            this.m_y *= value.m_y;
            return this;
        },

        multiply_scalar: function(value) {
            this.m_x *= value;
            this.m_y *= value;
            return this;
        },

        divide: function(value) {
            this.m_x /= value.m_x;
            this.m_y /= value.m_y;
            return this;
        },

        divide_scalar: function(value) {
            this.m_x /= value;
            this.m_y /= value;
            return this;
        },

        clamp: function(min, max) {
            this.m_x = Math.max(min.m_x, Math.min(max.m_x, this.m_x));
            this.m_y = Math.max(min.m_y, Math.min(max.m_y, this.m_y));
            return this;
        },

        dot: function(value) {
            return this.m_x * value.m_x + this.m_y * value.m_y;
        },

        length: function() {
            return Math.sqrt(this.m_x * this.m_x + this.m_y * this.m_y);
        },

        normalize: function() {
            return this.divide_scalar(this.length());
        },

        angle: function() {
            var angle = Math.atan2(this.m_y, this.m_x);
            if (angle < 0) {
                angle += 2 * Math.PI;
            }
            return angle;
        },

        distance_to: function(value) {
            var dx = this.m_x - value.m_x,
                dy = this.m_y - value.m_y;
            return Math.sqrt(dx * dx + dy * dy);
        },

        lerp: function(value, alpha) {
            this.m_x += (value.m_x - this.m_x) * alpha;
            this.m_y += (value.m_y - this.m_y) * alpha;
            return this;
        },

        equals: function(value) {
            return ((value.m_x === this.m_x) && (value.m_y === this.m_y));
        },

        min: function(vector) {
            this.m_x = Math.min(this.m_x, vector.m_x);
            this.m_y = Math.min(this.m_y, vector.m_y);
            return this;
        },

        max: function(vector) {
            this.m_x = Math.max(this.m_x, vector.m_x);
            this.m_y = Math.max(this.m_y, vector.m_y);
            return this;
        },

        to_array: function() {
            var array = [];
            array.push(this.m_x);
            array.push(this.m_y);
            return array;
        }
    },

    static_methods: {
        add: function(vector_01, vector_02) {
            return new gb.vec2(vector_01.m_x + vector_02.m_x,
                vector_01.m_y + vector_02.m_y);
        },

        sub: function(vector_01, vector_02) {
            return new gb.vec2(vector_01.m_x - vector_02.m_x,
                vector_01.m_y - vector_02.m_y);
        },

        lerp: function(vector_01, vector_02, alpha) {
            return gb.vec2.sub(vector_02, vector_01).multiply_scalar(alpha).add(vector_01);
        },

        equals: function(vector_01, vector_02) {
            return ((vector_01.m_x === vector_02.m_x) && (vector_01.m_y === vector_02.m_y));
        },

        min: function(vector_01, vector_02) {
            var vector_03 = new gb.vec2(0);
            vector_03.m_x = Math.min(vector_01.m_x, vector_02.m_x);
            vector_03.m_y = Math.min(vector_01.m_y, vector_02.m_y);
            return vector_03;
        },

        max: function(vector_01, vector_02) {
            var vector_03 = new gb.vec2(0);
            vector_03.m_x = Math.max(vector_01.m_x, vector_02.m_x);
            vector_03.m_y = Math.max(vector_01.m_y, vector_02.m_y);
            return vector_03;
        }
    }
});
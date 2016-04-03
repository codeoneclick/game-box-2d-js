/* global gb */

"use strict";

gb.mat4 = function() {
    this.m_elements = new Array([1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]);
};

gb.mat4.multiply = function(matrix_01, matrix_02) {
    var ae = matrix_01.m_elements;
    var be = matrix_02.m_elements;
    var matrix_03 = new gb.mat4();

    var a11 = ae[0],
        a12 = ae[4],
        a13 = ae[8],
        a14 = ae[12];
    var a21 = ae[1],
        a22 = ae[5],
        a23 = ae[9],
        a24 = ae[13];
    var a31 = ae[2],
        a32 = ae[6],
        a33 = ae[10],
        a34 = ae[14];
    var a41 = ae[3],
        a42 = ae[7],
        a43 = ae[11],
        a44 = ae[15];

    var b11 = be[0],
        b12 = be[4],
        b13 = be[8],
        b14 = be[12];
    var b21 = be[1],
        b22 = be[5],
        b23 = be[9],
        b24 = be[13];
    var b31 = be[2],
        b32 = be[6],
        b33 = be[10],
        b34 = be[14];
    var b41 = be[3],
        b42 = be[7],
        b43 = be[11],
        b44 = be[15];

    matrix_03.m_elements[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
    matrix_03.m_elements[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
    matrix_03.m_elements[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
    matrix_03.m_elements[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;

    matrix_03.m_elements[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
    matrix_03.m_elements[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
    matrix_03.m_elements[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
    matrix_03.m_elements[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;

    matrix_03.m_elements[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
    matrix_03.m_elements[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
    matrix_03.m_elements[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
    matrix_03.m_elements[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;

    matrix_03.m_elements[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
    matrix_03.m_elements[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
    matrix_03.m_elements[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
    matrix_03.m_elements[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;

    return matrix_03;
};

gb.mat4.prototype = {
    constructor: gb.mat4,

    identity: function() {
        this.m_elements[0] = 1;
        this.m_elements[4] = 0;
        this.m_elements[8] = 0;
        this.m_elements[12] = 0;
        this.m_elements[1] = 0;
        this.m_elements[5] = 1;
        this.m_elements[9] = 0;
        this.m_elements[13] = 0;
        this.m_elements[2] = 0;
        this.m_elements[6] = 0;
        this.m_elements[10] = 1;
        this.m_elements[14] = 0;
        this.m_elements[3] = 0;
        this.m_elements[7] = 0;
        this.m_elements[11] = 0;
        this.m_elements[15] = 1;
        return this;
    },

    rotate: function(euler) {
        var x = euler.x,
            y = euler.y,
            z = euler.z;
        var a = Math.cos(x),
            b = Math.sin(x);
        var c = Math.cos(y),
            d = Math.sin(y);
        var e = Math.cos(z),
            f = Math.sin(z);

        var ae = a * e,
            af = a * f,
            be = b * e,
            bf = b * f;

        this.m_elements[0] = c * e;
        this.m_elements[4] = -c * f;
        this.m_elements[8] = d;

        this.m_elements[1] = af + be * d;
        this.m_elements[5] = ae - bf * d;
        this.m_elements[9] = -b * c;

        this.m_elements[2] = bf - ae * d;
        this.m_elements[6] = be + af * d;
        this.m_elements[10] = a * c;

        this.m_elements[3] = 0;
        this.m_elements[7] = 0;
        this.m_elements[11] = 0;

        this.m_elements[12] = 0;
        this.m_elements[13] = 0;
        this.m_elements[14] = 0;
        this.m_elements[15] = 1;

        return this;
    },

    translate: function(x, y, z) {
        this.m_elements[0] = 1;
        this.m_elements[4] = 0;
        this.m_elements[8] = 0;
        this.m_elements[12] = 0;
        this.m_elements[1] = 0;
        this.m_elements[5] = 1;
        this.m_elements[9] = 0;
        this.m_elements[13] = 0;
        this.m_elements[2] = 0;
        this.m_elements[6] = 0;
        this.m_elements[10] = 1;
        this.m_elements[14] = 0;
        this.m_elements[3] = x;
        this.m_elements[7] = y;
        this.m_elements[11] = z;
        this.m_elements[15] = 1;
        return this;

    },

    rotation_x: function(theta) {
        var c = Math.cos(theta),
            s = Math.sin(theta);
        this.m_elements[0] = 1;
        this.m_elements[4] = 0;
        this.m_elements[8] = 0;
        this.m_elements[12] = 0;
        this.m_elements[1] = 0;
        this.m_elements[5] = c;
        this.m_elements[9] = -s;
        this.m_elements[13] = 0;
        this.m_elements[2] = 0;
        this.m_elements[6] = s;
        this.m_elements[10] = c;
        this.m_elements[14] = 0;
        this.m_elements[3] = 0;
        this.m_elements[7] = 0;
        this.m_elements[11] = 0;
        this.m_elements[15] = 1;
        return this;
    },

    rotate_y: function(theta) {
        var c = Math.cos(theta),
            s = Math.sin(theta);
        this.m_elements[0] = c;
        this.m_elements[4] = 0;
        this.m_elements[8] = s;
        this.m_elements[12] = 0;
        this.m_elements[1] = 0;
        this.m_elements[5] = 1;
        this.m_elements[9] = 0;
        this.m_elements[13] = 0;
        this.m_elements[2] = -s;
        this.m_elements[6] = 0;
        this.m_elements[10] = c;
        this.m_elements[14] = 0;
        this.m_elements[3] = 0;
        this.m_elements[7] = 0;
        this.m_elements[11] = 0;
        this.m_elements[15] = 1;
        return this;
    },

    rotate_z: function(theta) {
        var c = Math.cos(theta),
            s = Math.sin(theta);
        this.m_elements[0] = c;
        this.m_elements[4] = -s;
        this.m_elements[8] = 0;
        this.m_elements[12] = 0;
        this.m_elements[1] = s;
        this.m_elements[5] = c;
        this.m_elements[9] = 0;
        this.m_elements[13] = 0;
        this.m_elements[2] = 0;
        this.m_elements[6] = 0;
        this.m_elements[10] = 1;
        this.m_elements[14] = 0;
        this.m_elements[3] = 0;
        this.m_elements[7] = 0;
        this.m_elements[11] = 0;
        this.m_elements[15] = 1;
        return this;
    },

    scale: function(x, y, z) {
        this.m_elements[0] = x;
        this.m_elements[4] = 0;
        this.m_elements[8] = 0;
        this.m_elements[12] = 0;
        this.m_elements[1] = 0;
        this.m_elements[5] = y;
        this.m_elements[9] = 0;
        this.m_elements[13] = 0;
        this.m_elements[2] = 0;
        this.m_elements[6] = 0;
        this.m_elements[10] = z;
        this.m_elements[14] = 0;
        this.m_elements[3] = 0;
        this.m_elements[7] = 0;
        this.m_elements[11] = 0;
        this.m_elements[15] = 1;
        return this;
    },

    frustum: function(left, right, bottom, top, near, far) {
        var x = 2 * near / (right - left);
        var y = 2 * near / (top - bottom);

        var a = (right + left) / (right - left);
        var b = (top + bottom) / (top - bottom);
        var c = -(far + near) / (far - near);
        var d = -2 * far * near / (far - near);

        this.m_elements[0] = x;
        this.m_elements[4] = 0;
        this.m_elements[8] = a;
        this.m_elements[12] = 0;
        this.m_elements[1] = 0;
        this.m_elements[5] = y;
        this.m_elements[9] = b;
        this.m_elements[13] = 0;
        this.m_elements[2] = 0;
        this.m_elements[6] = 0;
        this.m_elements[10] = c;
        this.m_elements[14] = d;
        this.m_elements[3] = 0;
        this.m_elements[7] = 0;
        this.m_elements[11] = -1;
        this.m_elements[15] = 0;

        return this;
    },

    perspective: function(fov, aspect, near, far) {
        var ymax = near * Math.tan(gb.math.radians(fov * 0.5));
        var ymin = -ymax;
        var xmin = ymin * aspect;
        var xmax = ymax * aspect;

        return this.frustum(xmin, xmax, ymin, ymax, near, far);
    },

    ortho: function(left, right, top, bottom, near, far) {
        var w = 1.0 / (right - left);
        var h = 1.0 / (top - bottom);
        var p = 1.0 / (far - near);

        var x = (right + left) * w;
        var y = (top + bottom) * h;
        var z = (far + near) * p;

        this.m_elements[0] = 2 * w;
        this.m_elements[4] = 0;
        this.m_elements[8] = 0;
        this.m_elements[12] = -x;
        this.m_elements[1] = 0;
        this.m_elements[5] = 2 * h;
        this.m_elements[9] = 0;
        this.m_elements[13] = -y;
        this.m_elements[2] = 0;
        this.m_elements[6] = 0;
        this.m_elements[10] = -2 * p;
        this.m_elements[14] = -z;
        this.m_elements[3] = 0;
        this.m_elements[7] = 0;
        this.m_elements[11] = 0;
        this.m_elements[15] = 1;

        return this;
    },

    look_at: function(eye, target, up) {
        var x = new gb.vec3();
        var y = new gb.vec3();
        var z = new gb.vec3();

        z = gb.vec3.sub(eye, target).normalize();

        if (z.length_sq() === 0) {
            z.z = 1;
        }

        x = gb.vec3.cross(up, z).normalize();

        if (x.length_sq() === 0) {
            z.x += 0.0001;
            x = gb.vec3.cross(up, z).normalize();
        }
        y = gb.vec3.cross(z, x);

        this.m_elements[0] = x.x;
        this.m_elements[4] = y.x;
        this.m_elements[8] = z.x;
        this.m_elements[1] = x.y;
        this.m_elements[5] = y.y;
        this.m_elements[9] = z.y;
        this.m_elements[2] = x.z;
        this.m_elements[6] = y.z;
        this.m_elements[10] = z.z;
        return this;
    },

    equals: function(matrix) {
        for (var i = 0; i < 16; i++) {
            if (this.m_elements[i] !== matrix.m_elements[i]) {
                return false;
            }
        }
        return true;
    },

    to_array: function() {
        return this.m_elements;
    }
};
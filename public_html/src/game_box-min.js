var oop = {global:function() {
  return this;
}(), define_class:function(a) {
  try {
    if (!a) {
      throw Error("empty class definition");
    }
    var b = a.name;
    if (!b || "string" !== typeof b) {
      throw Error("empty or wrong type class name");
    }
    var c = a.init;
    if (!c || "function" !== typeof c) {
      throw Error("class must have init method");
    }
    var d = a.release;
    if (!d || "function" !== typeof d) {
      throw Error("class must have release method");
    }
    var e = a.extend;
    if (e && "function" !== typeof e) {
      throw Error("parent constructor must be function");
    }
    var f = null;
    if (e) {
      f = function() {
        e.apply(this, arguments);
        f.prototype.init.apply(this, arguments);
      };
      if (e === f) {
        throw Error("class cannot extend himself");
      }
      var g = new Function;
      g.prototype = e.prototype;
      f.prototype = new g;
      f.prototype.constructor = f;
    } else {
      f = function() {
        f.prototype.init.apply(this, arguments);
      };
    }
    f.prototype.init = c;
    f.prototype.release = d;
    var h = a.methods;
    if (h) {
      for (var k in h) {
        if ("function" !== typeof h[k]) {
          throw Error("class method must be function");
        }
        f.prototype[k] = h[k];
      }
    }
    var m = a.static_methods;
    if (m) {
      for (k in m) {
        if ("function" !== typeof m[k]) {
          throw Error("class method must be function");
        }
        f[k] = m[k];
      }
    }
    var n = a.constants;
    if (n) {
      for (var t in n) {
        if ("function" === typeof n[t]) {
          throw Error("class constant cannot be function");
        }
        f[t] = n[t];
      }
    }
    var q = oop.global;
    a.namespace && (q[a.namespace] || (q[a.namespace] = {}, console.warn("created new namespace: ", a.namespace)), q = q[a.namespace]);
    if (q[b]) {
      throw Error("can't create class with same definition name");
    }
    q[b] = f;
  } catch (u) {
    console.error("class_definition --\x3e"), console.error(a);
  } finally {
    console.warn("class defined: ", a.name);
  }
}};
function guid() {
  function a() {
    return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1);
  }
  return a() + a() + "-" + a() + "-" + a() + "-" + a() + "-" + a() + a() + a();
}
;oop.define_class({namespace:"gb", name:"vec2", init:function() {
  this.m_data = new Float32Array(2);
  arguments[0] instanceof gb.vec2 ? (this.m_data[0] = arguments[0].x, this.m_data[1] = arguments[0].y) : 1 === arguments.length ? (this.m_data[0] = arguments[0], this.m_data[1] = arguments[0]) : 2 === arguments.length ? (this.m_data[0] = arguments[0], this.m_data[1] = arguments[1]) : (this.m_data[0] = 0, this.m_data[1] = 0);
  Object.defineProperty(this, "x", {configurable:!0, get:function() {
    return this.m_data[0];
  }, set:function(a) {
    this.m_data[0] = a;
  }});
  Object.defineProperty(this, "y", {configurable:!0, get:function() {
    return this.m_data[1];
  }, set:function(a) {
    this.m_data[1] = a;
  }});
}, release:function() {
}, methods:{add:function(a) {
  this.m_data[0] += a.m_data[0];
  this.m_data[1] += a.m_data[1];
  return this;
}, add_scalar:function(a) {
  this.m_data[0] += a;
  this.m_data[1] += a;
  return this;
}, sub:function(a) {
  this.m_data[0] -= a.m_data[0];
  this.m_data[1] -= a.m_data[1];
  return this;
}, sub_scalar:function(a) {
  this.m_data[0] -= a;
  this.m_data[1] -= a;
  return this;
}, multiply:function(a) {
  this.m_data[0] *= a.m_data[0];
  this.m_data[1] *= a.m_data[1];
  return this;
}, multiply_scalar:function(a) {
  this.m_data[0] *= a;
  this.m_data[1] *= a;
  return this;
}, divide:function(a) {
  this.m_data[0] /= a.m_data[0];
  this.m_data[1] /= a.m_data[1];
  return this;
}, divide_scalar:function(a) {
  this.m_data[0] /= a;
  this.m_data[1] /= a;
  return this;
}, clamp:function(a, b) {
  this.m_data[0] = Math.max(a.m_data[0], Math.min(b.m_data[0], this.m_data[0]));
  this.m_data[1] = Math.max(a.m_data[1], Math.min(b.m_data[1], this.m_data[1]));
  return this;
}, dot:function(a) {
  return this.m_data[0] * a.m_data[0] + this.m_data[1] * a.m_data[1];
}, length:function() {
  return Math.sqrt(this.m_data[0] * this.m_data[0] + this.m_data[1] * this.m_data[1]);
}, normalize:function() {
  return this.divide_scalar(this.length());
}, angle:function() {
  var a = Math.atan2(this.m_data[1], this.m_data[0]);
  0 > a && (a += 2 * Math.PI);
  return a;
}, distance_to:function(a) {
  var b = this.m_data[0] - a.m_data[0];
  a = this.m_data[1] - a.m_data[1];
  return Math.sqrt(b * b + a * a);
}, lerp:function(a, b) {
  this.m_data[0] += (a.m_data[0] - this.m_data[0]) * b;
  this.m_data[1] += (a.m_data[1] - this.m_data[1]) * b;
  return this;
}, equals:function(a) {
  return a.m_data[0] === this.m_data[0] && a.m_data[1] === this.m_data[1];
}, min:function(a) {
  this.m_data[0] = Math.min(this.m_data[0], a.m_data[0]);
  this.m_data[1] = Math.min(this.m_data[1], a.m_data[1]);
  return this;
}, max:function(a) {
  this.m_data[0] = Math.max(this.m_data[0], a.m_data[0]);
  this.m_data[1] = Math.max(this.m_data[1], a.m_data[1]);
  return this;
}, to_array:function() {
  return this.m_data;
}}, static_methods:{add:function(a, b) {
  return new gb.vec2(a.m_data[0] + b.m_data[0], a.m_data[1] + b.m_data[1]);
}, sub:function(a, b) {
  return new gb.vec2(a.m_data[0] - b.m_data[0], a.m_data[1] - b.m_data[1]);
}, lerp:function(a, b, c) {
  return gb.vec2.sub(b, a).multiply_scalar(c).add(a);
}, equals:function(a, b) {
  return a.m_data[0] === b.m_data[0] && a.m_data[1] === b.m_data[1];
}, min:function(a, b) {
  var c = new gb.vec2(0);
  c.m_data[0] = Math.min(a.m_data[0], b.m_data[0]);
  c.m_data[1] = Math.min(a.m_data[1], b.m_data[1]);
  return c;
}, max:function(a, b) {
  var c = new gb.vec2(0);
  c.m_data[0] = Math.max(a.m_data[0], b.m_data[0]);
  c.m_data[1] = Math.max(a.m_data[1], b.m_data[1]);
  return c;
}}});
oop.define_class({namespace:"gb", name:"vec3", init:function() {
  this.m_data = new Float32Array(3);
  arguments[0] instanceof gb.vec3 ? (this.m_data[0] = arguments[0].x, this.m_data[1] = arguments[0].y, this.m_data[2] = arguments[0].z) : 1 === arguments.length ? (this.m_data[0] = arguments[0], this.m_data[1] = arguments[0], this.m_data[2] = arguments[0]) : 3 === arguments.length ? (this.m_data[0] = arguments[0], this.m_data[1] = arguments[1], this.m_data[2] = arguments[2]) : (this.m_data[0] = 0, this.m_data[1] = 0, this.m_data[2] = 0);
  Object.defineProperty(this, "x", {get:function() {
    return this.m_data[0];
  }, set:function(a) {
    this.m_data[0] = a;
  }});
  Object.defineProperty(this, "y", {get:function() {
    return this.m_data[1];
  }, set:function(a) {
    this.m_data[1] = a;
  }});
  Object.defineProperty(this, "z", {get:function() {
    return this.m_data[2];
  }, set:function(a) {
    this.m_data[2] = a;
  }});
}, release:function() {
}, methods:{add:function(a) {
  this.x += a.x;
  this.y += a.y;
  this.z += a.z;
  return this;
}, add_scalar:function(a) {
  this.x += a;
  this.y += a;
  this.z += a;
  return this;
}, sub:function(a) {
  this.x -= a.x;
  this.y -= a.y;
  this.z -= a.z;
  return this;
}, sub_scalar:function(a) {
  this.x -= a;
  this.y -= a;
  this.z -= a;
  return this;
}, multiply:function(a) {
  this.x *= a.x;
  this.y *= a.y;
  this.z *= a.z;
  return this;
}, multiply_scalar:function(a) {
  this.x *= a;
  this.y *= a;
  this.z *= a;
  return this;
}, divide:function(a) {
  this.x /= a.x;
  this.y /= a.y;
  this.z /= a.z;
  return this;
}, divide_scalar:function(a) {
  this.x /= a;
  this.y /= a;
  this.z /= a;
  return this;
}, min:function(a) {
  this.x = Math.min(this.x, a.x);
  this.y = Math.min(this.y, a.y);
  this.z = Math.min(this.z, a.z);
  return this;
}, max:function(a) {
  this.x = Math.max(this.x, a.x);
  this.y = Math.max(this.y, a.y);
  this.z = Math.max(this.z, a.z);
  return this;
}, clamp:function(a, b) {
  this.x = Math.max(a.x, Math.min(b.x, this.x));
  this.y = Math.max(a.y, Math.min(b.y, this.y));
  this.z = Math.max(a.z, Math.min(b.z, this.z));
  return this;
}, dot:function(a) {
  return this.x * a.x + this.y * a.y + this.z * a.z;
}, cross:function(a) {
  var b = this.x, c = this.y, d = this.z;
  this.x = c * a.z - d * a.y;
  this.y = d * a.x - b * a.z;
  this.z = b * a.y - c * a.x;
  return this;
}, length:function() {
  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
}, length_sq:function() {
  return this.x * this.x + this.y * this.y + this.z * this.z;
}, normalize:function() {
  return this.divide_scalar(this.length());
}, distance_to:function(a) {
  var b = this.x - a.x, c = this.y - a.y;
  a = this.z - a.z;
  return Math.sqrt(b * b + c * c + a * a);
}, lerp:function(a, b) {
  this.x += (a.x - this.x) * b;
  this.y += (a.y - this.y) * b;
  this.z += (a.z - this.z) * b;
  return this;
}, lerp_vectors:function(a, b, c) {
  this.sub_vectors(b, a).multiply_scalar(c).add(a);
  return this;
}, equals:function(a) {
  return a.x === this.x && a.y === this.y && a.z === this.z;
}, to_array:function() {
  return this.m_data;
}}, static_methods:{add:function(a, b) {
  return new gb.vec3(a.x + b.x, a.y + b.y, a.z + b.z);
}, sub:function(a, b) {
  return new gb.vec3(a.x - b.x, a.y - b.y, a.z - b.z);
}, cross:function(a, b) {
  return new gb.vec3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
}}});
oop.define_class({namespace:"gb", name:"vec4", init:function() {
  this.m_data = new Float32Array(4);
  arguments[0] instanceof gb.vec4 ? (this.m_data[0] = arguments[0].x, this.m_data[1] = arguments[0].y, this.m_data[2] = arguments[0].z, this.m_data[3] = arguments[0].w) : 1 === arguments.length ? (this.m_data[0] = arguments[0], this.m_data[1] = arguments[0], this.m_data[2] = arguments[0], this.m_data[3] = arguments[0]) : 4 === arguments.length ? (this.m_data[0] = arguments[0], this.m_data[1] = arguments[1], this.m_data[2] = arguments[2], this.m_data[3] = arguments[3]) : (this.m_data[0] = 0, this.m_data[1] = 
  0, this.m_data[2] = 0, this.m_data[3] = 0);
  Object.defineProperty(this, "x", {get:function() {
    return this.m_data[0];
  }, set:function(a) {
    this.m_data[0] = a;
  }});
  Object.defineProperty(this, "y", {get:function() {
    return this.m_data[1];
  }, set:function(a) {
    this.m_data[1] = a;
  }});
  Object.defineProperty(this, "z", {get:function() {
    return this.m_data[2];
  }, set:function(a) {
    this.m_data[2] = a;
  }});
  Object.defineProperty(this, "w", {get:function() {
    return this.m_data[3];
  }, set:function(a) {
    this.m_data[3] = a;
  }});
}, release:function() {
}, methods:{add:function(a) {
  this.x += a.x;
  this.y += a.y;
  this.z += a.z;
  this.w += a.w;
  return this;
}, add_scalar:function(a) {
  this.x += a;
  this.y += a;
  this.z += a;
  this.w += a;
  return this;
}, add_vectors:function(a, b) {
  this.x = a.x + b.x;
  this.y = a.y + b.y;
  this.z = a.z + b.z;
  this.w = a.w + b.w;
  return this;
}, sub:function(a) {
  this.x -= a.x;
  this.y -= a.y;
  this.z -= a.z;
  this.w -= a.w;
  return this;
}, sub_scalar:function(a) {
  this.x -= a;
  this.y -= a;
  this.z -= a;
  this.w -= a;
  return this;
}, sub_vectors:function(a, b) {
  this.x = a.x - b.x;
  this.y = a.y - b.y;
  this.z = a.z - b.z;
  this.w = a.w - b.w;
  return this;
}, multiply:function(a) {
  this.x *= a.x;
  this.y *= a.y;
  this.z *= a.z;
  this.w *= a.w;
  return this;
}, multiply_scalar:function(a) {
  this.x *= a;
  this.y *= a;
  this.z *= a;
  this.w *= a;
  return this;
}, divide:function(a) {
  this.x /= a.x;
  this.y /= a.y;
  this.z /= a.z;
  this.w /= a.w;
  return this;
}, divide_scalar:function(a) {
  this.x /= a;
  this.y /= a;
  this.z /= a;
  this.w /= a;
  return this;
}, min:function(a) {
  this.x = Math.min(this.x, a.x);
  this.y = Math.min(this.y, a.y);
  this.z = Math.min(this.z, a.z);
  this.w = Math.min(this.w, a.w);
  return this;
}, max:function(a) {
  this.x = Math.max(this.x, a.x);
  this.y = Math.max(this.y, a.y);
  this.z = Math.max(this.z, a.z);
  this.w = Math.max(this.w, a.w);
  return this;
}, clamp:function(a, b) {
  this.x = Math.max(a.x, Math.min(b.x, this.x));
  this.y = Math.max(a.y, Math.min(b.y, this.y));
  this.z = Math.max(a.z, Math.min(b.z, this.z));
  this.w = Math.max(a.w, Math.min(b.w, this.w));
  return this;
}, dot:function(a) {
  return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w;
}, length:function() {
  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
}, normalize:function() {
  return this.divide_scalar(this.length());
}, lerp:function(a, b) {
  this.x += (a.x - this.x) * b;
  this.y += (a.y - this.y) * b;
  this.z += (a.z - this.z) * b;
  this.w += (a.w - this.w) * b;
  return this;
}, lerp_vectors:function(a, b, c) {
  this.sub_vectors(b, a).multiply_scalar(c).add(a);
  return this;
}, equals:function(a) {
  return a.x === this.x && a.y === this.y && a.z === this.z && a.w === this.w;
}, to_array:function() {
  return this.m_data;
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"mat4", init:function() {
  this.m_elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
}, release:function() {
}, methods:{identity:function() {
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
}, rotate:function(a) {
  var b = a.x, c = a.y, d = a.z;
  a = Math.cos(b);
  var b = Math.sin(b), e = Math.cos(c), c = Math.sin(c), f = Math.cos(d), d = Math.sin(d), g = a * f, h = a * d, k = b * f, m = b * d;
  this.m_elements[0] = e * f;
  this.m_elements[4] = -e * d;
  this.m_elements[8] = c;
  this.m_elements[1] = h + k * c;
  this.m_elements[5] = g - m * c;
  this.m_elements[9] = -b * e;
  this.m_elements[2] = m - g * c;
  this.m_elements[6] = k + h * c;
  this.m_elements[10] = a * e;
  this.m_elements[3] = 0;
  this.m_elements[7] = 0;
  this.m_elements[11] = 0;
  this.m_elements[12] = 0;
  this.m_elements[13] = 0;
  this.m_elements[14] = 0;
  this.m_elements[15] = 1;
  return this;
}, translate:function(a, b, c) {
  this.identity();
  this.m_elements[12] = a;
  this.m_elements[13] = b;
  this.m_elements[14] = c;
  return this;
}, rotation_x:function(a) {
  var b = Math.cos(a);
  a = Math.sin(a);
  this.m_elements[0] = 1;
  this.m_elements[4] = 0;
  this.m_elements[8] = 0;
  this.m_elements[12] = 0;
  this.m_elements[1] = 0;
  this.m_elements[5] = b;
  this.m_elements[9] = -a;
  this.m_elements[13] = 0;
  this.m_elements[2] = 0;
  this.m_elements[6] = a;
  this.m_elements[10] = b;
  this.m_elements[14] = 0;
  this.m_elements[3] = 0;
  this.m_elements[7] = 0;
  this.m_elements[11] = 0;
  this.m_elements[15] = 1;
  return this;
}, rotate_y:function(a) {
  var b = Math.cos(a);
  a = Math.sin(a);
  this.m_elements[0] = b;
  this.m_elements[4] = 0;
  this.m_elements[8] = a;
  this.m_elements[12] = 0;
  this.m_elements[1] = 0;
  this.m_elements[5] = 1;
  this.m_elements[9] = 0;
  this.m_elements[13] = 0;
  this.m_elements[2] = -a;
  this.m_elements[6] = 0;
  this.m_elements[10] = b;
  this.m_elements[14] = 0;
  this.m_elements[3] = 0;
  this.m_elements[7] = 0;
  this.m_elements[11] = 0;
  this.m_elements[15] = 1;
  return this;
}, rotate_z:function(a) {
  var b = Math.cos(a);
  a = Math.sin(a);
  this.m_elements[0] = b;
  this.m_elements[4] = -a;
  this.m_elements[8] = 0;
  this.m_elements[12] = 0;
  this.m_elements[1] = a;
  this.m_elements[5] = b;
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
}, scale:function(a, b, c) {
  this.m_elements[0] = a;
  this.m_elements[4] = 0;
  this.m_elements[8] = 0;
  this.m_elements[12] = 0;
  this.m_elements[1] = 0;
  this.m_elements[5] = b;
  this.m_elements[9] = 0;
  this.m_elements[13] = 0;
  this.m_elements[2] = 0;
  this.m_elements[6] = 0;
  this.m_elements[10] = c;
  this.m_elements[14] = 0;
  this.m_elements[3] = 0;
  this.m_elements[7] = 0;
  this.m_elements[11] = 0;
  this.m_elements[15] = 1;
  return this;
}, frustum:function(a, b, c, d, e, f) {
  this.m_elements[0] = 2 * e / (b - a);
  this.m_elements[4] = 0;
  this.m_elements[8] = (b + a) / (b - a);
  this.m_elements[12] = 0;
  this.m_elements[1] = 0;
  this.m_elements[5] = 2 * e / (d - c);
  this.m_elements[9] = (d + c) / (d - c);
  this.m_elements[13] = 0;
  this.m_elements[2] = 0;
  this.m_elements[6] = 0;
  this.m_elements[10] = -(f + e) / (f - e);
  this.m_elements[14] = -2 * f * e / (f - e);
  this.m_elements[3] = 0;
  this.m_elements[7] = 0;
  this.m_elements[11] = -1;
  this.m_elements[15] = 0;
  return this;
}, perspective:function(a, b, c, d) {
  a = c * Math.tan(gb.math.radians(.5 * a));
  var e = -a;
  return this.frustum(e * b, a * b, e, a, c, d);
}, ortho:function(a, b, c, d, e, f) {
  this.identity();
  this.m_elements[0] = 2 / (b - a);
  this.m_elements[5] = 2 / (d - c);
  this.m_elements[10] = -2 / (f - e);
  this.m_elements[12] = -(b + a) / (b - a);
  this.m_elements[13] = -(d + c) / (d - c);
  this.m_elements[14] = -(f + e) / (f - e);
  return this;
}, look_at:function(a, b, c) {
  var d = new gb.vec3, e = new gb.vec3, f = new gb.vec3, f = gb.vec3.sub(a, b).normalize();
  0 === f.length_sq() && (f.z = 1);
  d = gb.vec3.cross(c, f).normalize();
  0 === d.length_sq() && (f.x += 1E-4, d = gb.vec3.cross(c, f).normalize());
  e = gb.vec3.cross(f, d);
  this.m_elements[0] = d.x;
  this.m_elements[4] = e.x;
  this.m_elements[8] = f.x;
  this.m_elements[1] = d.y;
  this.m_elements[5] = e.y;
  this.m_elements[9] = f.y;
  this.m_elements[2] = d.z;
  this.m_elements[6] = e.z;
  this.m_elements[10] = f.z;
  return this;
}, equals:function(a) {
  for (var b = 0;16 > b;b++) {
    if (this.m_elements[b] !== a.m_elements[b]) {
      return !1;
    }
  }
  return !0;
}, to_array:function() {
  return this.m_elements;
}}, static_methods:{multiply:function(a, b) {
  var c = a.m_elements, d = b.m_elements, e = new gb.mat4, f = c[0], g = c[4], h = c[8], k = c[12], m = c[1], n = c[5], t = c[9], q = c[13], u = c[2], w = c[6], r = c[10], l = c[14], x = c[3], p = c[7], v = c[11], c = c[15], y = d[0], z = d[4], A = d[8], B = d[12], C = d[1], D = d[5], E = d[9], F = d[13], G = d[2], H = d[6], I = d[10], J = d[14], K = d[3], L = d[7], M = d[11], d = d[15];
  e.m_elements[0] = f * y + g * C + h * G + k * K;
  e.m_elements[4] = f * z + g * D + h * H + k * L;
  e.m_elements[8] = f * A + g * E + h * I + k * M;
  e.m_elements[12] = f * B + g * F + h * J + k * d;
  e.m_elements[1] = m * y + n * C + t * G + q * K;
  e.m_elements[5] = m * z + n * D + t * H + q * L;
  e.m_elements[9] = m * A + n * E + t * I + q * M;
  e.m_elements[13] = m * B + n * F + t * J + q * d;
  e.m_elements[2] = u * y + w * C + r * G + l * K;
  e.m_elements[6] = u * z + w * D + r * H + l * L;
  e.m_elements[10] = u * A + w * E + r * I + l * M;
  e.m_elements[14] = u * B + w * F + r * J + l * d;
  e.m_elements[3] = x * y + p * C + v * G + c * K;
  e.m_elements[7] = x * z + p * D + v * H + c * L;
  e.m_elements[11] = x * A + p * E + v * I + c * M;
  e.m_elements[15] = x * B + p * F + v * J + c * d;
  return e;
}, multiply_vec4:function(a, b) {
  var c = new gb.vec4;
  c.x = b.m_elements[0] * a.x + b.m_elements[4] * a.y + b.m_elements[8] * a.z + b.m_elements[12] * a.w;
  c.y = b.m_elements[1] * a.x + b.m_elements[5] * a.y + b.m_elements[9] * a.z + b.m_elements[13] * a.w;
  c.z = b.m_elements[2] * a.x + b.m_elements[6] * a.y + b.m_elements[10] * a.z + b.m_elements[14] * a.w;
  c.w = b.m_elements[3] * a.x + b.m_elements[7] * a.y + b.m_elements[11] * a.z + b.m_elements[15] * a.w;
  return c;
}, multiply_vec2:function(a, b) {
  var c = new gb.vec2;
  c.x = b.m_elements[0] * a.x + b.m_elements[4] * a.y + b.m_elements[12];
  c.y = b.m_elements[1] * a.x + b.m_elements[5] * a.y + b.m_elements[13];
  return c;
}}});
oop.define_class({namespace:"gb", name:"math", constants:{INT16_MAX:32767, INT16_MIN:-32768, orientation:{colinear:0, clockwise:1, counterclockwise:2}}, init:function() {
}, release:function() {
}, methods:{}, static_methods:{radians:function(a) {
  return Math.PI / 180 * a;
}, degrees:function(a) {
  return 180 / Math.PI * a;
}, is_int:function(a) {
  return Number(a) === a && 0 === a % 1;
}, is_float:function(a) {
  return Number(a) === a && 0 !== a % 1;
}, intersect_min_max_bound:function(a, b, c) {
  return c.x >= a.x && c.x <= b.x && c.y >= a.y && c.y <= b.y ? !0 : !1;
}, intersect:function(a, b, c, d) {
  var e = a.x, f = a.y, g = b.x - a.x;
  a = b.y - a.y;
  b = c.x;
  var h = d.x - c.x;
  d = d.y - c.y;
  var k = Math.sqrt(g * g + a * a), m = Math.sqrt(h * h + d * d);
  if (g / k === h / m && a / k === d / m) {
    return {intersected:!1};
  }
  c = (g * (c.y - f) + a * (e - b)) / (h * a - d * g);
  b = (b + h * c - e) / g;
  return 0 > b || 0 > c || 1 < c ? {intersected:!1} : {intersected:!0, point_x:e + g * b, point_y:f + a * b, distance:b};
}, rect_intersect:function(a, b) {
  return b.x < a.x + a.z && a.x < b.x + b.z && b.y < a.y + a.w ? a.y < b.y + b.w : !1;
}, rect_contains:function(a, b) {
  return b.x > a.x && b.y > a.y && b.z < a.z && b.w < a.w;
}, point_orientation:function(a, b, c) {
  a = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
  return 0 === a ? gb.math.orientation.colinear : 0 < a ? gb.math.orientation.clockwise : gb.math.orientation.counterclockwise;
}, is_pot:function(a) {
  return 0 !== a && 0 === (a & a - 1);
}}});
var gl = null;
oop.define_class({namespace:"gb", name:"graphics_context", init:function() {
  var a = document.getElementById("gl_canvas");
  console.log(a);
  var b = null;
  try {
    b = a.getContext("webgl", {depth:!1, antialias:!0}), b.viewport_width = a.width, b.viewport_height = a.height, console.log("OpenGL context created"), console.log("viewport: [ " + b.viewport_width + ", " + b.viewport_height + " ]");
  } catch (c) {
    alert(c);
  }
  b || alert("could not initialise gl context");
  gl = b;
}, release:function() {
}, methods:{}, static_methods:{}});
oop.define_class({namespace:"gb", name:"resource_transfering_data", constants:{type:{undefined:0, shader:1, texture:2}}, init:function() {
  this.m_type = gb.resource_transfering_data.type.undefined;
  Object.defineProperty(this, "type", {get:function() {
    return this.m_type;
  }});
}, release:function() {
}});
oop.define_class({namespace:"gb", name:"shader_transfering_data", extend:gb.resource_transfering_data, init:function() {
  this.m_type = gb.resource_transfering_data.type.shader;
  this.m_fs_source_code = this.m_vs_source_code = "";
  this.m_handler = -1;
  Object.defineProperty(this, "vs_source_code", {get:function() {
    return this.m_vs_source_code;
  }, set:function(a) {
    this.m_vs_source_code = a;
  }});
  Object.defineProperty(this, "fs_source_code", {get:function() {
    return this.m_fs_source_code;
  }, set:function(a) {
    this.m_fs_source_code = a;
  }});
  Object.defineProperty(this, "handler", {get:function() {
    return this.m_handler;
  }, set:function(a) {
    this.m_handler = a;
  }});
}, release:function() {
}});
oop.define_class({namespace:"gb", name:"texture_transfering_data", extend:gb.resource_transfering_data, init:function() {
  this.m_type = gb.resource_transfering_data.type.texture;
  this.m_height = this.m_width = 0;
  this.m_data = null;
  this.m_handler = -1;
  Object.defineProperty(this, "width", {get:function() {
    return this.m_width;
  }, set:function(a) {
    this.m_width = a;
  }});
  Object.defineProperty(this, "height", {get:function() {
    return this.m_height;
  }, set:function(a) {
    this.m_height = a;
  }});
  Object.defineProperty(this, "handler", {get:function() {
    return this.m_handler;
  }, set:function(a) {
    this.m_handler = a;
  }});
  Object.defineProperty(this, "data", {get:function() {
    return this.m_data;
  }, set:function(a) {
    this.m_data = a;
  }});
}, release:function() {
}});
oop.define_class({namespace:"gb", name:"resource_base", constants:{type:{undefined:0, shader:1, texture:2}, status:{unloaded:0, loaded:1, commited:2}}, init:function(a) {
  this.m_guid = a;
  this.m_type = gb.resource_base.type.undefined;
  this.m_status = gb.resource_base.status.unloaded;
  this.m_callbacks = [];
  this.m_userdata_container = [];
  Object.defineProperty(this, "guid", {get:function() {
    return this.m_guid;
  }});
  Object.defineProperty(this, "type", {get:function() {
    return this.m_type;
  }});
  Object.defineProperty(this, "status", {get:function() {
    return this.m_status;
  }});
  Object.defineProperty(this, "is_commited", {get:function() {
    return gb.resource_base.status.commited;
  }});
}, release:function() {
}, methods:{on_resource_loaded:function(a) {
  for (var b = 0;b < this.m_callbacks.length;++b) {
    (0,this.m_callbacks[b])(a ? this : null, this.m_userdata_container[b]);
  }
  this.m_callbacks = [];
  this.m_userdata_container = [];
}, add_resource_loading_callback:function(a, b) {
  _.isFunction(a) ? _.contains(this.m_callbacks, a) ? console.error("can't add same callback for resource loading") : this.status === gb.resource_base.status.commited ? a(this, b) : (this.m_callbacks.push(a), this.m_userdata_container.push(b)) : console.error("resource loading callback isn't function");
}, remove_resource_loading_callback:function(a) {
  a = _.indexOf(this.m_callbacks, a);
  -1 !== a ? (this.m_callbacks.splice(a, 1), this.m_userdatas.splice(a, 1)) : console.error("resource doesn't contain this callback");
}}});
oop.define_class({namespace:"gb", name:"shader_uniform", constants:{type:{undefined:-1, mat4:0, mat4_array:1, vec4:2, vec4_array:3, vec3:4, vec3_array:5, vec2:6, vec2_array:7, f32:8, f32_array:9, i32:10, i32_array:11, sampler:12}}, init:function() {
  this.m_type = gb.shader_uniform.type.undefined;
  Object.defineProperty(this, "type", {get:function() {
    return this.m_type;
  }, set:function(a) {
    this.m_type = a;
  }});
  Object.defineProperty(this, "mat4_value", {get:function() {
    return this.m_mat4_value;
  }, set:function(a) {
    this.m_mat4_value = a;
  }});
  Object.defineProperty(this, "vec4_value", {get:function() {
    return this.m_vec4_value;
  }, set:function(a) {
    this.m_vec4_value = a;
  }});
  Object.defineProperty(this, "vec3_value", {get:function() {
    return this.m_vec3_value;
  }, set:function(a) {
    this.m_vec3_value = a;
  }});
  Object.defineProperty(this, "vec2_value", {get:function() {
    return this.m_vec2_value;
  }, set:function(a) {
    this.m_vec2_value = a;
  }});
  Object.defineProperty(this, "f32_value", {get:function() {
    return this.m_f32_value;
  }, set:function(a) {
    this.m_f32_value = a;
  }});
  Object.defineProperty(this, "i32_value", {get:function() {
    return this.m_i32_value;
  }, set:function(a) {
    this.m_i32_value = a;
  }});
  Object.defineProperty(this, "sampler_index", {get:function() {
    return this.m_sampler_index;
  }});
  Object.defineProperty(this, "sampler_texture", {get:function() {
    return this.m_sampler_texture;
  }});
}, release:function() {
}, methods:{set_sampler:function(a, b) {
  this.m_sampler_texture = a;
  this.m_sampler_index = b;
}}});
oop.define_class({namespace:"gb", name:"shader", extend:gb.resource_base, constants:{sampler_type:{sampler_01:0, sampler_02:1, sampler_03:2, sampler_04:3, sampler_05:4, sampler_06:5, sampler_07:6, sampler_08:7, max:8}, attribute_type:{position:0, texcoord:1, color:2, max:3}, uniform_type:{mat_m:0, mat_p:1, mat_v:2, max:3}, attribute_names:{a_position:"a_position", a_texcoord:"a_texcoord", a_color:"a_color"}, uniform_names:{u_mat_m:"u_mat_m", u_mat_p:"u_mat_p", u_mat_v:"u_mat_v"}, sampler_names:{sampler_01:"sampler_01", 
sampler_02:"sampler_02", sampler_03:"sampler_03", sampler_04:"sampler_04", sampler_05:"sampler_05", sampler_06:"sampler_06", sampler_07:"sampler_07", sampler_08:"sampler_08"}}, init:function() {
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
  Object.defineProperty(this, "attributes", {get:function() {
    return this.m_attributes;
  }});
}, release:function() {
}, methods:{setup:function() {
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
}, on_transfering_data_serialized:function(a) {
  switch(a.type) {
    case gb.resource_transfering_data.type.shader:
      this.m_status = gb.resource_base.status.loaded;
  }
}, on_transfering_data_commited:function(a) {
  switch(a.type) {
    case gb.resource_transfering_data.type.shader:
      this.m_handler = a.handler, this.m_status = gb.resource_base.status.commited, this.setup();
  }
}, get_custom_uniform:function(a) {
  var b = -1;
  "undefined" !== typeof this.m_custom_uniforms[a] ? b = this.m_custom_uniforms[a] : (b = gl.getUniformLocation(this.m_handler, a), this.m_custom_uniforms[a] = b);
  return b;
}, set_mat4:function(a, b) {
  this.status !== gb.resource_base.status.commited || "undefined" !== typeof this.m_cached_uniforms[b] && this.m_cached_uniforms[b] === a || ("undefined" === typeof this.m_cached_uniforms[b] && (this.m_cached_uniforms[b] = new gb.shader_uniform), gl.uniformMatrix4fv(this.m_uniforms[b], !1, new Float32Array(a.to_array())), this.m_cached_uniforms[b].mat4_value = a);
}, set_custom_mat4:function(a, b) {
  this.status === gb.resource_base.status.commited && gl.uniformMatrix4fv(this.get_custom_uniform(b), !1, new Float32Array(a.to_array()));
}, set_vec4:function(a, b) {
  this.status !== gb.resource_base.status.commited || "undefined" !== typeof this.m_cached_uniforms[b] && this.m_cached_uniforms[b] === a || ("undefined" === typeof this.m_cached_uniforms[b] && (this.m_cached_uniforms[b] = new gb.shader_uniform), gl.uniform4fv(this.m_uniforms[b], new Float32Array(a.to_array())), this.m_cached_uniforms[b].vec4_value = a);
}, set_custom_vec4:function(a, b) {
  this.status === gb.resource_base.status.commited && gl.uniform4fv(this.get_custom_uniform(b), new Float32Array(a.to_array()));
}, set_vec3:function(a, b) {
  this.status !== gb.resource_base.status.commited || "undefined" !== typeof this.m_cached_uniforms[b] && this.m_cached_uniforms[b] === a || ("undefined" === typeof this.m_cached_uniforms[b] && (this.m_cached_uniforms[b] = new gb.shader_uniform), gl.uniform3fv(this.m_uniforms[b], new Float32Array(a.to_array())), this.m_cached_uniforms[b].vec3_value = a);
}, set_custom_vec3:function(a, b) {
  this.status === gb.resource_base.status.commited && gl.uniform3fv(this.get_custom_uniform(b), new Float32Array(a.to_array()));
}, set_vec2:function(a, b) {
  this.status !== gb.resource_base.status.commited || "undefined" !== typeof this.m_cached_uniforms[b] && this.m_cached_uniforms[b] === a || ("undefined" === typeof this.m_cached_uniforms[b] && (this.m_cached_uniforms[b] = new gb.shader_uniform), gl.uniform2fv(this.m_uniforms[b], new Float32Array(a.to_array())), this.m_cached_uniforms[b].vec2_value = a);
}, set_custom_vec2:function(a, b) {
  this.status === gb.resource_base.status.commited && gl.uniform2fv(this.get_custom_uniform(b), new Float32Array(a.to_array()));
}, set_f32:function(a, b) {
  this.status !== gb.resource_base.status.commited || "undefined" !== typeof this.m_cached_uniforms[b] && this.m_cached_uniforms[b] === a || ("undefined" === typeof this.m_cached_uniforms[b] && (this.m_cached_uniforms[b] = new gb.shader_uniform), gl.uniform1f(this.m_uniforms[b], a), this.m_cached_uniforms[b].f32_value = a);
}, set_custom_f32:function(a, b) {
  this.status === gb.resource_base.status.commited && gl.uniform1f(this.get_custom_uniform(b), a);
}, set_i32:function(a, b) {
  this.status !== gb.resource_base.status.commited || "undefined" !== typeof this.m_cached_uniforms[b] && this.m_cached_uniforms[b] === a || ("undefined" === typeof this.m_cached_uniforms[b] && (this.m_cached_uniforms[b] = new gb.shader_uniform), gl.uniform1i(this.m_uniforms[b], a), this.m_cached_uniforms[b].i32_value = a);
}, set_custom_i32:function(a, b) {
  this.status === gb.resource_base.status.commited && gl.uniform1i(this.get_custom_uniform(b), a);
}, set_texture:function(a, b) {
  this.status === gb.resource_base.status.commited && b < gb.shader.sampler_type.max && (gl.activeTexture(gl.TEXTURE0 + b), a.bind(), gl.uniform1i(this.m_samplers[b], b));
}, bind:function() {
  this.status === gb.resource_base.status.commited && gl.useProgram(this.m_handler);
}, unbind:function() {
  this.status === gb.resource_base.status.commited && gl.useProgram(null);
}}, static_methods:{construct:function(a, b, c) {
  var d = null, e = new gb.shader_compiler_glsl;
  b = e.compile(b, gl.VERTEX_SHADER);
  -1 !== b && (c = e.compile(c, gl.FRAGMENT_SHADER), -1 !== c && (e = e.link(b, c), -1 !== e && (d = new gb.shader(a), d.m_handler = e, d.m_status = gb.resource_base.status.commited, d.setup())));
  return d;
}}});
oop.define_class({namespace:"gb", name:"texture", extend:gb.resource_base, init:function() {
  this.m_type = gb.resource_base.type.texture;
  this.m_handler = -1;
  this.m_setted_wrap_mode = this.m_height = this.m_width = 0;
  this.m_presseted_wrap_mode = gl.CLAMP_TO_EDGE;
  this.m_setted_mag_filter = 0;
  this.m_presetted_mag_filter = gl.NEAREST;
  this.m_setted_min_filter = 0;
  this.m_presetted_min_filter = gl.NEAREST;
  Object.defineProperty(this, "handler", {get:function() {
    return this.m_handler;
  }});
  Object.defineProperty(this, "width", {get:function() {
    return this.m_width;
  }});
  Object.defineProperty(this, "height", {get:function() {
    return this.m_height;
  }});
  Object.defineProperty(this, "wrap_mode", {set:function(a) {
    this.m_presseted_wrap_mode = a;
  }});
  Object.defineProperty(this, "mag_filter", {set:function(a) {
    this.m_presetted_mag_filter = a;
  }});
  Object.defineProperty(this, "min_filter", {set:function(a) {
    this.m_presetted_min_filter = a;
  }});
}, release:function() {
  gl.deleteTexture(this.m_handler);
}, methods:{on_transfering_data_serialized:function(a) {
  switch(a.type) {
    case gb.resource_transfering_data.type.texture:
      this.m_status = gb.resource_base.status.loaded;
  }
}, on_transfering_data_commited:function(a) {
  switch(a.type) {
    case gb.resource_transfering_data.type.texture:
      this.m_handler = a.handler, this.m_width = a.width, this.m_height = a.height, this.m_status = gb.resource_base.status.commited;
  }
}, bind:function() {
  this.status === gb.resource_base.status.commited && (gl.bindTexture(gl.TEXTURE_2D, this.m_handler), this.m_presseted_wrap_mode !== this.m_setted_wrap_mode && (this.m_setted_wrap_mode = this.m_presseted_wrap_mode, gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.m_setted_wrap_mode), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.m_setted_wrap_mode)), this.m_presetted_min_filter !== this.m_setted_min_filter && (this.m_setted_min_filter = this.m_presetted_min_filter, gl.texParameteri(gl.TEXTURE_2D, 
  gl.TEXTURE_MIN_FILTER, this.m_setted_min_filter)), this.m_presetted_mag_filter !== this.m_setted_mag_filter && (this.m_setted_mag_filter = this.m_presetted_mag_filter, gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.m_setted_mag_filter)));
}, unbind:function() {
  gl.bindTexture(gl.TEXTURE_2D, null);
}}, static_methods:{construct:function(a, b, c, d) {
  a = new gb.texture(a);
  a.m_handler = b;
  a.m_width = c;
  a.m_height = d;
  a.m_status = gb.resource_base.status.commited;
  return a;
}}});
oop.define_class({namespace:"gb", name:"ibo", init:function(a, b) {
  this.m_handler = gl.createBuffer();
  this.m_used_size = this.m_allocated_size = a;
  this.m_mode = b;
  this.m_stride = 2;
  this.m_data = new ArrayBuffer(a * this.m_stride);
  this.m_data_accessor = new DataView(this.m_data);
  Object.defineProperty(this, "allocated_size", {get:function() {
    return this.m_allocated_size;
  }});
  Object.defineProperty(this, "used_size", {get:function() {
    return this.m_used_size;
  }});
}, release:function() {
  gl.deleteBuffer(this.m_handler);
}, methods:{write_element:function(a, b) {
  a < this.m_allocated_size ? this.m_data_accessor.setUint16(a * this.m_stride, b, !0) : console.error("out of ibo bound");
}, read_attribute:function(a) {
  if (a < this.m_allocated_size) {
    return this.m_data_accessor.getUint16(a * this.m_stride, !0);
  }
  console.error("out of ibo bound");
}, submit:function(a) {
  var b = this.m_data;
  a && 0 < a && a < this.m_allocated_size && (this.m_used_size = a, b = this.m_data.slice(0, a * this.m_stride));
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.m_handler);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, b, this.m_mode);
}, bind:function() {
  0 !== this.m_used_size && gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.m_handler);
}, unbind:function() {
  0 !== this.m_used_size && gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}}});
oop.define_class({namespace:"gb", name:"vbo", constants:{attribute:{position:0, texcoord:1, color:2}, declaration:{position_xy:0, position_xy_texcoord_uv:1, position_xy_texcoord_uv_color_rgba:2}}, init:function(a, b, c) {
  this.m_handler = gl.createBuffer();
  this.m_used_size = this.m_allocated_size = a;
  this.m_mode = b;
  this.m_min_bound = new gb.vec2(gb.math.INT16_MAX);
  this.m_max_bound = new gb.vec2(gb.math.INT16_MIN);
  this.m_declaration = c;
  this.m_stride = 0;
  switch(c) {
    case gb.vbo.declaration.position_xy:
      this.m_stride = 8;
      break;
    case gb.vbo.declaration.position_xy_texcoord_uv:
      this.m_stride = 16;
      break;
    case gb.vbo.declaration.position_xy_texcoord_uv_color_rgba:
      this.m_stride = 32;
  }
  this.m_data = new ArrayBuffer(a * this.m_stride);
  this.m_data_accessor = new DataView(this.m_data);
  Object.defineProperty(this, "allocated_size", {get:function() {
    return this.m_allocated_size;
  }});
  Object.defineProperty(this, "used_size", {get:function() {
    return this.m_used_size;
  }});
  Object.defineProperty(this, "min_bound", {get:function() {
    return this.m_min_bound;
  }});
  Object.defineProperty(this, "max_bound", {get:function() {
    return this.m_max_bound;
  }});
}, release:function() {
  gl.deleteBuffer(this.m_handler);
}, methods:{write_attribute:function(a, b, c) {
  a === gb.vbo.attribute.position && (b < this.m_allocated_size ? (this.m_data_accessor.setFloat32(b * this.m_stride + 0, c.x, !0), this.m_data_accessor.setFloat32(b * this.m_stride + 4, c.y, !0), this.m_min_bound.min(c), this.m_max_bound.max(c)) : console.error("out of vbo bound"));
  a !== gb.vbo.attribute.texcoord || this.m_declaration !== gb.vbo.declaration.position_xy_texcoord_uv && this.m_declaration !== gb.vbo.declaration.position_xy_texcoord_uv_color_rgba || (b < this.m_allocated_size ? (this.m_data_accessor.setFloat32(b * this.m_stride + 8, c.x, !0), this.m_data_accessor.setFloat32(b * this.m_stride + 12, c.y, !0)) : console.error("out of vbo bound"));
  a === gb.vbo.attribute.color && this.m_declaration === gb.vbo.declaration.position_xy_texcoord_uv_color_rgba && (b < this.m_allocated_size ? (this.m_data_accessor.setFloat32(b * this.m_stride + 16, c.x, !0), this.m_data_accessor.setFloat32(b * this.m_stride + 20, c.y, !0), this.m_data_accessor.setFloat32(b * this.m_stride + 24, c.z, !0), this.m_data_accessor.setFloat32(b * this.m_stride + 28, c.w, !0)) : console.error("out of vbo bound"));
}, read_attribute:function(a, b) {
  if (a === gb.vbo.attribute.position) {
    if (b < this.m_allocated_size) {
      return {x:this.m_data_accessor.getFloat32(b * this.m_stride + 0, !0), y:this.m_data_accessor.getFloat32(b * this.m_stride + 4, !0)};
    }
    console.error("out of vbo bound");
  }
  if (a === gb.vbo.attribute.texcoord && (this.m_declaration === gb.vbo.declaration.position_xy_texcoord_uv || this.m_declaration === gb.vbo.declaration.position_xy_texcoord_uv_color_rgba)) {
    if (b < this.m_allocated_size) {
      return {x:this.m_data_accessor.getFloat32(b * this.m_stride + 8, !0), y:this.m_data_accessor.getFloat32(b * this.m_stride + 12, !0)};
    }
    console.error("out of vbo bound");
  }
  if (a === gb.vbo.attribute.color && this.m_declaration === gb.vbo.declaration.position_xy_texcoord_uv_color_rgba) {
    if (b < this.m_allocated_size) {
      return {x:this.m_data_accessor.getFloat32(b * this.m_stride + 16, !0), y:this.m_data_accessor.getFloat32(b * this.m_stride + 20, !0), z:this.m_data_accessor.getFloat32(b * this.m_stride + 24, !0), w:this.m_data_accessor.getFloat32(b * this.m_stride + 28, !0)};
    }
    console.error("out of vbo bound");
  }
  return null;
}, submit:function(a) {
  var b = this.m_data;
  a && 0 < a && a < this.m_allocated_size && (this.m_used_size = a, b = this.m_data.slice(0, a * this.m_stride));
  gl.bindBuffer(gl.ARRAY_BUFFER, this.m_handler);
  gl.bufferData(gl.ARRAY_BUFFER, b, this.m_mode);
}, bind:function(a) {
  0 !== this.m_used_size && (gl.bindBuffer(gl.ARRAY_BUFFER, this.m_handler), 0 <= a[gb.shader.attribute_type.position] && (gl.vertexAttribPointer(a[gb.shader.attribute_type.position], 2, gl.FLOAT, !1, this.m_stride, 0), gl.enableVertexAttribArray(a[gb.shader.attribute_type.position])), 0 <= a[gb.shader.attribute_type.texcoord] && (this.m_declaration === gb.vbo.declaration.position_xy_texcoord_uv || this.m_declaration === gb.vbo.declaration.position_xy_texcoord_uv_color_rgba) && (gl.vertexAttribPointer(a[gb.shader.attribute_type.texcoord], 
  2, gl.FLOAT, !1, this.m_stride, 8), gl.enableVertexAttribArray(a[gb.shader.attribute_type.texcoord])), 0 <= a[gb.shader.attribute_type.color] && this.m_declaration === gb.vbo.declaration.position_xy_texcoord_uv_color_rgba && (gl.vertexAttribPointer(a[gb.shader.attribute_type.color], 4, gl.FLOAT, !1, this.m_stride, 16), gl.enableVertexAttribArray(a[gb.shader.attribute_type.color])));
}, unbind:function(a) {
  0 !== this.m_used_size && (gl.bindBuffer(gl.ARRAY_BUFFER, this.m_handler), 0 <= a[gb.shader.attribute_type.position] && gl.disableVertexAttribArray(a[gb.shader.attribute_type.position]), 0 <= a[gb.shader.attribute_type.texcoord] && (this.m_declaration === gb.vbo.declaration.position_xy_texcoord_uv || this.m_declaration === gb.vbo.declaration.position_xy_texcoord_uv_color_rgba) && gl.disableVertexAttribArray(a[gb.shader.attribute_type.texcoord]), 0 <= a[gb.shader.attribute_type.color] && this.m_declaration === 
  gb.vbo.declaration.position_xy_texcoord_uv_color_rgba && gl.disableVertexAttribArray(a[gb.shader.attribute_type.color]), gl.bindBuffer(gl.ARRAY_BUFFER, null));
}, to_vertices_positions:function() {
  for (var a = [], b = 0;b < this.m_allocated_size;++b) {
    var c = this.read_attribute(gb.vbo.attribute.position, b);
    a.push(new gb.vec2(c.x, c.y));
  }
  return a;
}}});
oop.define_class({namespace:"gb", name:"mesh", init:function(a, b, c) {
  this.m_vbo = a;
  this.m_ibo = b;
  this.m_mode = c;
  Object.defineProperty(this, "vbo", {get:function() {
    return this.m_vbo;
  }});
  Object.defineProperty(this, "ibo", {get:function() {
    return this.m_ibo;
  }});
}, release:function() {
  this.vbo.release();
  this.ibo.release();
}, methods:{bind:function(a) {
  this.m_vbo.bind(a);
  this.m_ibo.bind();
}, unbind:function(a) {
  this.m_vbo.unbind(a);
  this.m_ibo.unbind();
}, draw:function() {
  gl.drawElements(this.m_mode, this.m_ibo.used_size, gl.UNSIGNED_SHORT, 0);
}}});
oop.define_class({namespace:"gb", name:"builtin_shaders", init:function() {
}, release:function() {
}, methods:{}, static_methods:{get_screen_quad_tex2d_shader:function() {
  return gb.shader.construct("screen_quad_tex2d", "varying vec2 v_texcoord;\nvoid main(void)\n{\nv_texcoord = a_texcoord;\ngl_Position = vec4(a_position, 0.0, 1.0);\n}", "varying vec2 v_texcoord;\nuniform sampler2D  sampler_01;\nvoid main(void)\n{\ngl_FragColor = texture2D(sampler_01, v_texcoord);\n}");
}}});
oop.define_class({namespace:"gb", name:"resource_serializer", constants:{status:{undefined:0, in_progress:1, failure:2, success:3}}, init:function(a, b) {
  this.m_guid = a;
  this.m_resource = b;
  this.m_status = gb.resource_serializer.status.undefined;
  Object.defineProperty(this, "guid", {get:function() {
    return this.m_guid;
  }});
  Object.defineProperty(this, "status", {get:function() {
    return this.m_status;
  }});
}, release:function() {
}, methods:{}, static_methods:{}});
oop.define_class({namespace:"gb", name:"shader_serializer_glsl", extend:gb.resource_serializer, init:function(a, b, c, d) {
  this.m_vs_filename = c;
  this.m_fs_filename = d;
}, release:function() {
}, methods:{serialize:function(a, b) {
  this.m_status = gb.resource_serializer.status.in_progress;
  var c = this;
  $.ajax({dataType:"text", url:this.m_vs_filename, data:{}, async:!0, success:function(d) {
    a.vs_source_code = d;
    $.ajax({dataType:"text", url:c.m_fs_filename, data:{}, async:!0, success:function(d) {
      a.fs_source_code = d;
      c.m_resource.on_transfering_data_serialized(a);
      c.m_status = 0 !== a.vs_source_code.length && 0 !== a.fs_source_code.length ? gb.resource_serializer.status.success : gb.resource_serializer.status.failure;
      b();
    }});
  }});
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"texture_serializer_png", extend:gb.resource_serializer, init:function(a) {
  this.m_filename = a;
}, release:function() {
}, methods:{serialize:function(a, b) {
  this.m_status = gb.resource_serializer.status.in_progress;
  var c = this, d = new Image;
  d.onload = function() {
    a.data = d;
    a.width = d.width;
    a.height = d.height;
    c.m_resource.on_transfering_data_serialized(a);
    c.m_status = gb.resource_serializer.status.success;
    b();
  };
  d.src = this.m_filename;
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"shader_compiler_glsl", constants:{vs_shader_header:"precision highp float;\nattribute vec2 a_position;\nattribute vec2 a_texcoord;\nattribute vec4 a_color;\n", fs_shader_header:"precision highp float;\n"}, init:function() {
}, release:function() {
}, methods:{compile:function(a, b) {
  var c = gl.createShader(b);
  if (!c) {
    return console.error("can't create shader"), -1;
  }
  var d = b === gl.VERTEX_SHADER ? (gb.shader_compiler_glsl.vs_shader_header + a).trim() : (gb.shader_compiler_glsl.fs_shader_header + a).trim();
  gl.shaderSource(c, d);
  gl.compileShader(c);
  var e = gl.getShaderInfoLog(c) || "";
  gl.getShaderParameter(c, gl.COMPILE_STATUS) || (console.error(d), console.error(e));
  return c;
}, link:function(a, b) {
  var c = gl.createProgram();
  gl.attachShader(c, a);
  gl.attachShader(c, b);
  gl.linkProgram(c);
  var d = gl.getProgramInfoLog(c) || "";
  gl.getProgramParameter(c, gl.LINK_STATUS) || (console.error(d), gl.detachShader(c, a), gl.detachShader(c, b), gl.deleteShader(a), gl.deleteShader(b), c = -1);
  return c;
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"resource_commiter", constants:{status:{undefined:0, in_progress:1, failure:2, success:3}}, init:function(a, b) {
  this.m_guid = a;
  this.m_resource = b;
  this.m_status = gb.resource_commiter.status.undefined;
  Object.defineProperty(this, "guid", {get:function() {
    return this.m_guid;
  }});
  Object.defineProperty(this, "status", {get:function() {
    return this.m_status;
  }});
}, release:function() {
}, methods:{}, static_methods:{}});
oop.define_class({namespace:"gb", name:"shader_commiter_glsl", extend:gb.resource_commiter, init:function() {
}, release:function() {
}, methods:{commit:function(a) {
  this.m_status = gb.resource_commiter.status.in_progress;
  var b = new gb.shader_compiler_glsl, c = gb.resource_commiter.status.failure, d = b.compile(a.vs_source_code, gl.VERTEX_SHADER);
  if (-1 !== d) {
    var e = b.compile(a.fs_source_code, gl.FRAGMENT_SHADER);
    -1 !== e && (b = b.link(d, e), a.handler = b, -1 !== b && (c = gb.resource_commiter.status.success));
  }
  this.m_resource.on_transfering_data_commited(a);
  this.m_status = c;
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"texture_commiter_png", extend:gb.resource_commiter, init:function() {
}, release:function() {
}, methods:{commit:function(a) {
  this.m_status = gb.resource_commiter.status.in_progress;
  var b = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, b);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, a.data);
  a.handler = b;
  this.m_resource.on_transfering_data_commited(a);
  this.m_status = gb.resource_commiter.status.success;
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"resource_loading_operation", constants:{status:{undefined:0, in_progress:1, waiting:2, failure:3, success:4}}, init:function(a, b, c) {
  this.m_guid = a;
  this.m_resource = b;
  this.m_status = gb.resource_loading_operation.status.undefined;
  this.m_commiter = this.m_serializer = this.m_transfering_data = null;
  this.m_serialized_data = c;
  Object.defineProperty(this, "guid", {get:function() {
    return this.m_guid;
  }});
  Object.defineProperty(this, "status", {get:function() {
    return this.m_status;
  }});
}, release:function() {
}, methods:{}, static_methods:{}});
oop.define_class({namespace:"gb", name:"shader_loading_operation", extend:gb.resource_loading_operation, constants:{vs_extension:".vert", fs_extension:".frag"}, init:function() {
  this.m_transfering_data = new gb.shader_transfering_data;
}, release:function() {
}, methods:{start:function(a) {
  var b = this;
  this.serialize(function() {
    b.m_status === gb.resource_loading_operation.status.waiting ? b.commit(function() {
      a();
    }) : a();
  });
}, serialize:function(a) {
  this.m_status = gb.resource_loading_operation.status.in_progress;
  this.m_serializer = new gb.shader_serializer_glsl(this.m_guid, this.m_resource, this.m_guid + gb.shader_loading_operation.vs_extension, this.m_guid + gb.shader_loading_operation.fs_extension);
  var b = this;
  this.m_serializer.serialize(this.m_transfering_data, function() {
    b.m_status = b.m_serializer.status === gb.resource_serializer.status.success ? gb.resource_loading_operation.status.waiting : gb.resource_loading_operation.status.failure;
    a();
  });
}, commit:function(a) {
  this.m_status = gb.resource_loading_operation.status.in_progress;
  this.m_commiter = new gb.shader_commiter_glsl(this.m_guid, this.m_resource);
  this.m_commiter.commit(this.m_transfering_data);
  this.m_status = this.m_commiter.status === gb.resource_commiter.status.success ? gb.resource_loading_operation.status.success : gb.resource_loading_operation.status.failure;
  a();
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"texture_loading_operation", extend:gb.resource_loading_operation, init:function() {
  this.m_transfering_data = new gb.texture_transfering_data;
}, release:function() {
}, methods:{start:function(a) {
  var b = this;
  this.serialize(function() {
    b.m_status === gb.resource_loading_operation.status.waiting ? b.commit(function() {
      a();
    }) : a();
  });
}, serialize:function(a) {
  if (this.m_serialized_data) {
    this.m_status = gb.resource_loading_operation.status.waiting, this.m_transfering_data.data = this.m_serialized_data, this.m_transfering_data.width = this.m_serialized_data.width, this.m_transfering_data.height = this.m_serialized_data.height, this.m_resource.on_transfering_data_serialized(this.m_transfering_data), a();
  } else {
    this.m_status = gb.resource_loading_operation.status.in_progress;
    this.m_serializer = new gb.texture_serializer_png(this.m_guid, this.m_resource);
    var b = this;
    this.m_serializer.serialize(this.m_transfering_data, function() {
      b.m_status = b.m_serializer.status === gb.resource_serializer.status.success ? gb.resource_loading_operation.status.waiting : gb.resource_loading_operation.status.failure;
      a();
    });
  }
}, commit:function(a) {
  this.m_status = gb.resource_loading_operation.status.in_progress;
  this.m_commiter = new gb.texture_commiter_png(this.m_guid, this.m_resource);
  this.m_commiter.commit(this.m_transfering_data);
  this.m_status = this.m_commiter.status === gb.resource_commiter.status.success ? gb.resource_loading_operation.status.success : gb.resource_loading_operation.status.failure;
  a();
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"resource_accessor", init:function() {
  this.m_resources = [];
  this.m_operations_queue = [];
}, release:function() {
}, methods:{add_custom_resource:function(a, b) {
  this.m_resources[a] = b;
}, get_shader:function(a) {
  var b = this.m_resources[a];
  if ("undefined" === typeof b) {
    b = new gb.shader(a);
    this.m_resources[a] = b;
    var c = new gb.shader_loading_operation(a, b);
    this.m_operations_queue[a] = c;
    var d = this;
    c.start(function() {
      d.m_resources[a].on_resource_loaded(d.m_operations_queue[a].status === gb.resource_loading_operation.status.success);
      d.m_operations_queue[a] = null;
    });
  }
  return b;
}, get_texture:function(a, b) {
  var c = this.m_resources[a];
  if ("undefined" === typeof c) {
    c = new gb.texture(a);
    this.m_resources[a] = c;
    var d = new gb.texture_loading_operation(a, c, b);
    this.m_operations_queue[a] = d;
    var e = this;
    d.start(function() {
      e.m_resources[a].on_resource_loaded(e.m_operations_queue[a].status === gb.resource_loading_operation.status.success);
      e.m_operations_queue[a] = null;
    });
  }
  return c;
}}, static_methods:{}});
var g_string_to_glenum = null;
oop.define_class({namespace:"gb", name:"configuration_base", init:function() {
  this.m_configurations = [];
}, release:function() {
}, methods:{set_configuration:function(a, b, c) {
  this.m_configurations[a] instanceof Object ? 3 === arguments.length ? 0 <= c && c < this.m_configurations[a].length ? this.m_configurations[a][c] = b : this.m_configurations[a].push(b) : this.m_configurations[a].push(b) : (this.m_configurations[a] = [], this.m_configurations[a].push(b));
  return this;
}}, static_methods:{string_to_glenum:function() {
  g_string_to_glenum || (g_string_to_glenum = {GL_FRONT:gl.FRONT, GL_BACK:gl.BACK, GL_SRC_COLOR:gl.SRC_ALPHA, GL_SRC_ALPHA:gl.SRC_ALPHA, GL_ONE:gl.ONE, GL_ZERO:gl.ZERO, GL_ONE_MINUS_SRC_COLOR:gl.ONE_MINUS_SRC_COLOR, GL_ONE_MINUS_DST_COLOR:gl.ONE_MINUS_DST_COLOR, GL_ONE_MINUS_SRC_ALPHA:gl.ONE_MINUS_SRC_ALPHA, GL_ONE_MINUS_DST_ALPHA:gl.ONE_MINUS_DST_ALPHA, GL_DST_ALPHA:gl.DST_ALPHA, GL_CONSTANT_ALPHA:gl.CONSTANT_ALPHA, GL_REPEAT:gl.REPEAT, GL_CLAMP_TO_EDGE:gl.CLAMP_TO_EDGE, GL_MIRRORED_REPEAT:gl.MIRRORED_REPEAT, 
  GL_NEAREST:gl.NEAREST, GL_LINEAR:gl.LINEAR, GL_MIPMAP:gl.LINEAR_MIPMAP_NEAREST, GL_ALWAYS:gl.ALWAYS, GL_EQUAL:gl.EQUAL, GL_NOTEQUAL:gl.NOTEQUAL, GL_FUNC_ADD:gl.FUNC_ADD});
  return g_string_to_glenum;
}}});
oop.define_class({namespace:"gb", name:"game_object_configuration", extend:gb.configuration_base, init:function() {
  Object.defineProperty(this, "materials_configurations", {get:function() {
    return this.m_configurations instanceof Object && this.m_configurations.materials_configurations instanceof Object ? this.m_configurations.materials_configurations : null;
  }});
}, release:function() {
}, methods:{}});
oop.define_class({namespace:"gb", name:"texture_configuration", extend:gb.configuration_base, init:function() {
  this.json = null;
  Object.defineProperty(this, "filename", {get:function() {
    return this.json.filename;
  }});
  Object.defineProperty(this, "technique_name", {get:function() {
    return this.json.technique_name;
  }});
  Object.defineProperty(this, "sampler_index", {get:function() {
    return this.json.sampler_index;
  }});
  Object.defineProperty(this, "wrap_mode", {get:function() {
    return gb.configuration_base.string_to_glenum()[this.json.wrap_mode];
  }});
  Object.defineProperty(this, "mag_filter", {get:function() {
    return gb.configuration_base.string_to_glenum()[this.json.mag_filter];
  }});
  Object.defineProperty(this, "min_filter", {get:function() {
    return gb.configuration_base.string_to_glenum()[this.json.min_filter];
  }});
}, release:function() {
}, methods:{serialize:function(a) {
  this.json = a;
}}});
oop.define_class({namespace:"gb", name:"shader_configuration", extend:gb.configuration_base, init:function() {
  this.json = null;
  Object.defineProperty(this, "filename", {get:function() {
    return this.json.filename;
  }});
}, release:function() {
}, methods:{serialize:function(a) {
  this.json = a;
}}});
oop.define_class({namespace:"gb", name:"material_configuration", extend:gb.configuration_base, init:function() {
  this.json = null;
  Object.defineProperty(this, "technique_name", {get:function() {
    return this.json.technique_name;
  }});
  Object.defineProperty(this, "technique_pass", {get:function() {
    return this.json.technique_pass;
  }});
  Object.defineProperty(this, "is_depth_test", {get:function() {
    return !!this.json.is_depth_test;
  }});
  Object.defineProperty(this, "is_depth_mask", {get:function() {
    return !!this.json.is_depth_mask;
  }});
  Object.defineProperty(this, "is_cull_face", {get:function() {
    return !!this.json.is_cull_face;
  }});
  Object.defineProperty(this, "cull_face_mode", {get:function() {
    return gb.configuration_base.string_to_glenum()[this.json.cull_face_mode];
  }});
  Object.defineProperty(this, "is_blending", {get:function() {
    return !!this.json.is_blending;
  }});
  Object.defineProperty(this, "blending_function_source", {get:function() {
    return gb.configuration_base.string_to_glenum()[this.json.blending_function_source];
  }});
  Object.defineProperty(this, "blending_function_destination", {get:function() {
    return gb.configuration_base.string_to_glenum()[this.json.blending_function_destination];
  }});
  Object.defineProperty(this, "blending_equation", {get:function() {
    return gb.configuration_base.string_to_glenum()[this.json.blending_equation];
  }});
  Object.defineProperty(this, "is_stencil_test", {get:function() {
    return !!this.json.is_stencil_test;
  }});
  Object.defineProperty(this, "stencil_function", {get:function() {
    return gb.configuration_base.string_to_glenum()[this.json.stencil_function];
  }});
  Object.defineProperty(this, "stencil_function_parameter_1", {get:function() {
    return this.json.stencil_function_parameter_1;
  }});
  Object.defineProperty(this, "stencil_function_parameter_2", {get:function() {
    return this.json.stencil_function_parameter_2;
  }});
  Object.defineProperty(this, "stencil_mask_parameter", {get:function() {
    return this.json.stencil_mask_parameter;
  }});
  Object.defineProperty(this, "shader_configuration", {get:function() {
    return this.m_configurations instanceof Object && this.m_configurations.shader instanceof Object && 0 < this.m_configurations.shader.length ? this.m_configurations.shader[0] : null;
  }});
  Object.defineProperty(this, "textures_configurations", {get:function() {
    return this.m_configurations instanceof Object && this.m_configurations.textures instanceof Object ? this.m_configurations.textures : null;
  }});
}, release:function() {
}, methods:{serialize:function(a, b) {
  var c = this;
  $.ajax({dataType:"json", url:a, data:{}, async:!0}).done(function(d) {
    c.json = d;
    console.log("loaded: " + a);
    d = new gb.shader_configuration;
    d.serialize(c.json.shader);
    c.set_configuration("shader", d);
    for (var e = 0;e < c.json.textures.length;++e) {
      d = new gb.texture_configuration, d.serialize(c.json.textures[e]), c.set_configuration("textures", d);
    }
    b(c);
  }).fail(function() {
    console.log("can't load: " + a);
    b(null);
  });
}}});
oop.define_class({namespace:"gb", name:"sprite_configuration", extend:gb.game_object_configuration, init:function() {
}, release:function() {
}, methods:{serialize:function(a, b) {
  var c = this;
  $.ajax({dataType:"json", url:a, data:{}, async:!0}).done(function(d) {
    c.json = d;
    console.log("loaded: " + a);
    d = c.json.materials.length;
    if (0 < d) {
      for (var e = d, f = function(a) {
        c.set_configuration("materials_configurations", a);
        e--;
        0 === e && b(c);
      }, g = 0;g < d;++g) {
        (new gb.material_configuration).serialize(c.json.materials[g].filename, f);
      }
    } else {
      b(c);
    }
  }).fail(function() {
    console.log("can't load: " + a);
    b(null);
  });
}}});
oop.define_class({namespace:"gb", name:"ws_technique_configuration", extend:gb.configuration_base, init:function() {
  this.json = null;
  Object.defineProperty(this, "technique_name", {get:function() {
    return this.json.technique_name;
  }});
  Object.defineProperty(this, "num_passes", {get:function() {
    return this.json.num_passes;
  }});
  Object.defineProperty(this, "index", {get:function() {
    return this.json.index;
  }});
  Object.defineProperty(this, "screen_width", {get:function() {
    return this.json.screen_width;
  }});
  Object.defineProperty(this, "screen_height", {get:function() {
    return this.json.screen_height;
  }});
  Object.defineProperty(this, "clear_color_r", {get:function() {
    return this.json.clear_color_r;
  }});
  Object.defineProperty(this, "clear_color_g", {get:function() {
    return this.json.clear_color_g;
  }});
  Object.defineProperty(this, "clear_color_b", {get:function() {
    return this.json.clear_color_b;
  }});
  Object.defineProperty(this, "clear_color_a", {get:function() {
    return this.json.clear_color_a;
  }});
}, release:function() {
}, methods:{serialize:function(a, b) {
  var c = this;
  $.ajax({dataType:"json", url:a, data:{}, async:!0}).done(function(d) {
    c.json = d;
    console.log("loaded: " + a);
    b(c);
  }).fail(function() {
    console.log("can't load: " + a);
    b(null);
  });
}}});
oop.define_class({namespace:"gb", name:"ss_technique_configuration", extend:gb.configuration_base, init:function() {
  this.json = null;
  Object.defineProperty(this, "material_configuration", {get:function() {
    return this.m_configurations instanceof Object && this.m_configurations.material_configuration instanceof Object && 0 < this.m_configurations.material_configuration.length ? this.m_configurations.material_configuration[0] : null;
  }});
  Object.defineProperty(this, "technique_name", {get:function() {
    return this.json.technique_name;
  }});
  Object.defineProperty(this, "screen_width", {get:function() {
    return this.json.screen_width;
  }});
  Object.defineProperty(this, "screen_height", {get:function() {
    return this.json.screen_height;
  }});
}, release:function() {
}, methods:{serialize_material_configuration:function(a) {
  var b = this;
  (new gb.material_configuration).serialize(b.json.material_filename, function(c) {
    b.set_configuration("material_configuration", c);
    a();
  });
}, serialize:function(a, b) {
  var c = this;
  $.ajax({dataType:"json", url:a, data:{}, async:!0}).done(function(d) {
    c.json = d;
    console.log("loaded: " + a);
    c.serialize_material_configuration(function() {
      b(c);
    });
  }).fail(function() {
    console.log("can't load: " + a);
    b(null);
  });
}}});
oop.define_class({namespace:"gb", name:"main_technique_configuration", extend:gb.configuration_base, init:function() {
  this.json = null;
  Object.defineProperty(this, "material_configuration", {get:function() {
    return this.m_configurations instanceof Object && this.m_configurations.material_configuration instanceof Object && 0 < this.m_configurations.material_configuration.length ? this.m_configurations.material_configuration[0] : null;
  }});
  Object.defineProperty(this, "technique_name", {get:function() {
    return this.json.technique_name;
  }});
}, release:function() {
}, methods:{serialize_material_configuration:function(a) {
  var b = this;
  (new gb.material_configuration).serialize(b.json.material_filename, function(c) {
    b.set_configuration("material_configuration", c);
    a();
  });
}, serialize:function(a, b) {
  var c = this;
  $.ajax({dataType:"json", url:a, data:{}, async:!0}).done(function(d) {
    c.json = d;
    console.log("loaded: " + a);
    c.serialize_material_configuration(function() {
      b(c);
    });
  }).fail(function() {
    console.log("can't load: " + a);
    b(null);
  });
}}});
oop.define_class({namespace:"gb", name:"transition_configuration", extend:gb.configuration_base, init:function() {
  this.json = null;
  Object.defineProperty(this, "guid", {get:function() {
    return this.json.guid;
  }});
  Object.defineProperty(this, "main_technique_configuration", {get:function() {
    return this.m_configurations instanceof Object && this.m_configurations.main_technique_configuration instanceof Object && 0 < this.m_configurations.main_technique_configuration.length ? this.m_configurations.main_technique_configuration[0] : null;
  }});
  Object.defineProperty(this, "ws_techniques_configurations", {get:function() {
    return this.m_configurations instanceof Object && this.m_configurations.ws_techniques_configurations instanceof Object ? this.m_configurations.ws_techniques_configurations : null;
  }});
  Object.defineProperty(this, "ss_techniques_configurations", {get:function() {
    return this.m_configurations instanceof Object && this.m_configurations.ss_techniques_configurations instanceof Object ? this.m_configurations.ss_techniques_configurations : null;
  }});
}, release:function() {
}, methods:{serialize_main_technique_configuration:function(a) {
  var b = this;
  (new gb.main_technique_configuration).serialize(b.json.main_technique_filename, function(c) {
    b.set_configuration("main_technique_configuration", c);
    a();
  });
}, serialize_ws_techniques_configurations:function(a) {
  var b = this, c = b.json.ws_techniques.length;
  if (0 < c) {
    for (var d = c, e = function(c) {
      b.set_configuration("ws_techniques_configurations", c);
      d--;
      0 === d && a();
    }, f = 0;f < c;++f) {
      (new gb.ws_technique_configuration).serialize(b.json.ws_techniques[f].filename, e);
    }
  } else {
    a();
  }
}, serialize_ss_techniques_configurations:function(a) {
  var b = this, c = b.json.ss_techniques.length;
  if (0 < c) {
    for (var d = c, e = function(c) {
      b.set_configuration("ss_techniques_configurations", c);
      d--;
      0 === d && a();
    }, f = 0;f < c;++f) {
      (new gb.ss_technique_configuration).serialize(b.json.ss_techniques[f].filename, e);
    }
  } else {
    a();
  }
}, serialize:function(a, b) {
  var c = this;
  $.ajax({dataType:"json", url:a, data:{}, async:!0}).done(function(d) {
    c.json = d;
    console.log("loaded: " + a);
    c.serialize_main_technique_configuration(function() {
      c.serialize_ws_techniques_configurations(function() {
        c.serialize_ss_techniques_configurations(function() {
          b(c);
        });
      });
    });
  }).fail(function() {
    console.log("can't load: " + a);
    b(null);
  });
}}});
oop.define_class({namespace:"gb", name:"configuration_accessor", init:function() {
}, release:function() {
}, methods:{get_transition_configuration:function(a, b) {
  (new gb.transition_configuration).serialize(a, function(a) {
    b(a);
  });
}, get_sprite_configuration:function(a, b) {
  (new gb.sprite_configuration).serialize(a, function(a) {
    b(a);
  });
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"mesh_constructor", init:function() {
}, release:function() {
}, methods:{}, static_methods:{create_screen_quad:function() {
  var a = new gb.vbo(4, gl.STATIC_DRAW, gb.vbo.declaration.position_xy_texcoord_uv);
  a.write_attribute(gb.vbo.attribute.position, 0, new gb.vec2(-1, -1));
  a.write_attribute(gb.vbo.attribute.position, 1, new gb.vec2(-1, 1));
  a.write_attribute(gb.vbo.attribute.position, 2, new gb.vec2(1, -1));
  a.write_attribute(gb.vbo.attribute.position, 3, new gb.vec2(1, 1));
  a.write_attribute(gb.vbo.attribute.texcoord, 0, new gb.vec2(0, 0));
  a.write_attribute(gb.vbo.attribute.texcoord, 1, new gb.vec2(0, 1));
  a.write_attribute(gb.vbo.attribute.texcoord, 2, new gb.vec2(1, 0));
  a.write_attribute(gb.vbo.attribute.texcoord, 3, new gb.vec2(1, 1));
  a.submit();
  var b = new gb.ibo(6, gl.STATIC_DRAW);
  b.write_element(0, 0);
  b.write_element(1, 2);
  b.write_element(2, 1);
  b.write_element(3, 1);
  b.write_element(4, 2);
  b.write_element(5, 3);
  b.submit();
  return new gb.mesh(a, b, gl.TRIANGLES);
}, create_shape_quad:function() {
  var a = new gb.vbo(4, gl.STATIC_DRAW, gb.vbo.declaration.position_xy_texcoord_uv);
  a.write_attribute(gb.vbo.attribute.position, 0, new gb.vec2(-.5, -.5));
  a.write_attribute(gb.vbo.attribute.position, 1, new gb.vec2(-.5, .5));
  a.write_attribute(gb.vbo.attribute.position, 2, new gb.vec2(.5, -.5));
  a.write_attribute(gb.vbo.attribute.position, 3, new gb.vec2(.5, .5));
  a.write_attribute(gb.vbo.attribute.texcoord, 0, new gb.vec2(0, 0));
  a.write_attribute(gb.vbo.attribute.texcoord, 1, new gb.vec2(0, 1));
  a.write_attribute(gb.vbo.attribute.texcoord, 2, new gb.vec2(1, 0));
  a.write_attribute(gb.vbo.attribute.texcoord, 3, new gb.vec2(1, 1));
  a.submit();
  var b = new gb.ibo(6, gl.STATIC_DRAW);
  b.write_element(0, 0);
  b.write_element(1, 2);
  b.write_element(2, 1);
  b.write_element(3, 1);
  b.write_element(4, 2);
  b.write_element(5, 3);
  b.submit();
  return new gb.mesh(a, b, gl.TRIANGLES);
}, create_circle:function() {
  var a = new gb.vbo(33, gl.STATIC_DRAW, gb.vbo.declaration.position_xy), b = 1, c = new gb.vec2;
  a.write_attribute(gb.vbo.attribute.position, 0, c);
  for (var d = 0;d <= 2 * Math.PI;d += 2 * Math.PI / 32) {
    c.x = 1 * Math.cos(d), c.y = 1 * Math.sin(d), a.write_attribute(gb.vbo.attribute.position, b, c), b++;
  }
  a.submit();
  b = 1;
  c = new gb.ibo(99, gl.STATIC_DRAW);
  for (d = 0;96 > d;d += 3) {
    c.write_element(d + 0, 0), c.write_element(d + 1, Math.min(b++, 32)), c.write_element(d + 2, Math.min(b, 32));
  }
  c.write_element(96, 0);
  c.write_element(97, Math.min(b - 1, 32));
  c.write_element(98, 1);
  c.submit();
  return new gb.mesh(a, c, gl.TRIANGLES);
}, create_grid:function(a, b, c, d) {
  for (var e = (a + 1) * (b + 1) * 4, f = new gb.vbo((a + 1) * (b + 1) * 4, gl.STATIC_DRAW, gb.vbo.declaration.position_xy), g = 0, h = new gb.vec2, k = 0;k <= a;++k) {
    h.x = k * c, h.y = 0, k === b && --h.x, 0 === k && (h.x += 1), f.write_attribute(gb.vbo.attribute.position, g, h), g++, h.x = k * c, k === b && --h.x, 0 === k && (h.x += 1), h.y = b * d, f.write_attribute(gb.vbo.attribute.position, g, h), g++;
  }
  for (k = 0;k <= b;++k) {
    h.x = 0, h.y = k * d, k === b && --h.y, 0 === k && (h.y += 1), f.write_attribute(gb.vbo.attribute.position, g, h), g++, h.x = b * c, h.y = k * d, k === b && --h.y, 0 === k && (h.y += 1), f.write_attribute(gb.vbo.attribute.position, g, h), g++;
  }
  f.submit();
  a = new gb.ibo(4 * e, gl.STATIC_DRAW);
  for (k = 0;k < e;++k) {
    a.write_element(k, k);
  }
  a.submit();
  return new gb.mesh(f, a, gl.LINES);
}}});
var g_cached_parameters = null;
oop.define_class({namespace:"gb", name:"material_cached_parameters", init:function() {
  this.m_is_cull_face = !1;
  this.m_cull_face_mode = gl.FRONT;
  this.m_is_blending = !1;
  this.m_blending_function_source = gl.SRC_ALPHA;
  this.m_blending_function_destination = gl.ONE_MINUS_SRC_ALPHA;
  this.m_blending_equation = gl.FUNC_ADD;
  this.m_is_stencil_test = !1;
  this.m_stencil_function = gl.ALWAYS;
  this.m_stencil_mask_parameter = this.m_stencil_function_parameter_2 = this.m_stencil_function_parameter_1 = -1;
  this.m_is_depth_mask = this.m_is_depth_test = !1;
  this.m_shader = null;
  this.m_textures = [];
  for (var a = 0;8 > a;++a) {
    this.m_textures[a] = null;
  }
  Object.defineProperty(this, "is_cull_face", {get:function() {
    return this.m_is_cull_face;
  }, set:function(a) {
    this.m_is_cull_face = a;
  }});
  Object.defineProperty(this, "cull_face_mode", {get:function() {
    return this.m_cull_face_mode;
  }, set:function(a) {
    this.m_cull_face_mode = a;
  }});
  Object.defineProperty(this, "is_blending", {get:function() {
    return this.m_is_blending;
  }, set:function(a) {
    this.m_is_blending = a;
  }});
  Object.defineProperty(this, "blending_function_source", {get:function() {
    return this.m_blending_function_source;
  }, set:function(a) {
    this.m_blending_function_source = a;
  }});
  Object.defineProperty(this, "blending_function_destination", {get:function() {
    return this.m_blending_function_destination;
  }, set:function(a) {
    this.m_blending_function_destination = a;
  }});
  Object.defineProperty(this, "blending_equation", {get:function() {
    return this.m_blending_equation;
  }, set:function(a) {
    this.m_blending_equation = a;
  }});
  Object.defineProperty(this, "is_stencil_test", {get:function() {
    return this.m_is_stencil_test;
  }, set:function(a) {
    this.m_is_stencil_test = a;
  }});
  Object.defineProperty(this, "stencil_function", {get:function() {
    return this.m_stencil_function;
  }, set:function(a) {
    this.m_stencil_function = a;
  }});
  Object.defineProperty(this, "stencil_function_parameter_1", {get:function() {
    return this.m_stencil_function_parameter_1;
  }, set:function(a) {
    this.m_stencil_function_parameter_1 = a;
  }});
  Object.defineProperty(this, "stencil_function_parameter_2", {get:function() {
    return this.m_stencil_function_parameter_2;
  }, set:function(a) {
    this.m_stencil_function_parameter_2 = a;
  }});
  Object.defineProperty(this, "stencil_mask_parameter", {get:function() {
    return this.m_stencil_mask_parameter;
  }, set:function(a) {
    this.m_stencil_mask_parameter = a;
  }});
  Object.defineProperty(this, "is_depth_test", {get:function() {
    return this.m_is_depth_test;
  }, set:function(a) {
    this.m_is_depth_test = a;
  }});
  Object.defineProperty(this, "is_depth_mask", {get:function() {
    return this.m_is_depth_mask;
  }, set:function(a) {
    this.m_is_depth_mask = a;
  }});
  Object.defineProperty(this, "shader", {get:function() {
    return this.m_shader;
  }, set:function(a) {
    this.m_shader = a;
  }});
  Object.defineProperty(this, "textures", {get:function() {
    return this.m_textures;
  }, set:function(a) {
    this.m_textures = a;
  }});
}, release:function() {
}, methods:{}, static_methods:{get_cached_parameters:function() {
  null === g_cached_parameters && (g_cached_parameters = new gb.material_cached_parameters, g_cached_parameters.is_cull_face = !0, gl.enable(gl.CULL_FACE), g_cached_parameters.cull_face_mode = gl.BACK, gl.cullFace(gl.BACK), g_cached_parameters.is_blending = !0, gl.enable(gl.BLEND), g_cached_parameters.blending_function_source = gl.SRC_ALPHA, g_cached_parameters.blending_function_destination = gl.ONE_MINUS_SRC_ALPHA, gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA), g_cached_parameters.is_stencil_test = 
  !1, gl.disable(gl.STENCIL_TEST), g_cached_parameters.stencil_function = gl.ALWAYS, g_cached_parameters.stencil_function_parameter_1 = 0, g_cached_parameters.stencil_function_parameter_2 = 0, gl.stencilFunc(gl.ALWAYS, 0, 0), g_cached_parameters.m_stencil_mask_parameter = 0, gl.stencilMask(0), g_cached_parameters.is_depth_test = !0, gl.enable(gl.DEPTH_TEST), g_cached_parameters.is_depth_mask = !0, gl.depthMask(!0));
  return g_cached_parameters;
}}});
oop.define_class({namespace:"gb", name:"material", init:function() {
  this.m_parameters = new gb.material_cached_parameters;
  this.m_custom_shader_uniforms = [];
  this.m_guid = "";
  Object.defineProperty(this, "is_cull_face", {get:function() {
    return this.m_parameters.is_cull_face;
  }, set:function(a) {
    this.m_parameters.is_culling = a;
  }});
  Object.defineProperty(this, "cull_face_mode", {get:function() {
    return this.m_parameters.cull_face_mode;
  }, set:function(a) {
    this.m_parameters.cull_face_mode = a;
  }});
  Object.defineProperty(this, "is_blending", {get:function() {
    return this.m_parameters.is_blending;
  }, set:function(a) {
    this.m_parameters.is_blending = a;
  }});
  Object.defineProperty(this, "blending_function_source", {get:function() {
    return this.m_parameters.blending_function_source;
  }, set:function(a) {
    this.m_parameters.blending_function_source = a;
  }});
  Object.defineProperty(this, "blending_function_destination", {get:function() {
    return this.m_parameters.blending_function_destination;
  }, set:function(a) {
    this.m_parameters.blending_function_destination = a;
  }});
  Object.defineProperty(this, "blending_equation", {get:function() {
    return this.m_parameters.blending_equation;
  }, set:function(a) {
    this.m_parameters.blending_equation = a;
  }});
  Object.defineProperty(this, "is_stencil_test", {get:function() {
    return this.m_parameters.is_stencil_test;
  }, set:function(a) {
    this.m_parameters.is_stencil_test = a;
  }});
  Object.defineProperty(this, "stencil_function", {get:function() {
    return this.m_parameters.stencil_function;
  }, set:function(a) {
    this.m_parameters.stencil_function = a;
  }});
  Object.defineProperty(this, "stencil_function_parameter_1", {get:function() {
    return this.m_parameters.stencil_function_parameter_1;
  }, set:function(a) {
    this.m_parameters.stencil_function_parameter_1 = a;
  }});
  Object.defineProperty(this, "stencil_function_parameter_2", {get:function() {
    return this.m_parameters.stencil_function_parameter_2;
  }, set:function(a) {
    this.m_parameters.stencil_function_parameter_2 = a;
  }});
  Object.defineProperty(this, "stencil_mask_parameter", {get:function() {
    return this.m_parameters.stencil_mask_parameter;
  }, set:function(a) {
    this.m_parameters.stencil_mask_parameter = a;
  }});
  Object.defineProperty(this, "is_depth_test", {get:function() {
    return this.m_parameters.is_depth_test;
  }, set:function(a) {
    this.m_parameters.is_depth_test = a;
  }});
  Object.defineProperty(this, "is_depth_mask", {get:function() {
    return this.m_parameters.is_depth_mask;
  }, set:function(a) {
    this.m_parameters.is_depth_mask = a;
  }});
  Object.defineProperty(this, "shader", {get:function() {
    return this.m_parameters.shader;
  }, set:function(a) {
    this.m_parameters.shader = a;
  }});
  Object.defineProperty(this, "guid", {get:function() {
    return this.m_guid;
  }, set:function(a) {
    this.m_guid = a;
  }});
}, release:function() {
}, methods:{set_texture:function(a, b) {
  this.m_parameters.textures[b] = a;
}, set_custom_shader_uniform:function(a, b) {
  var c = null;
  "undefined" !== typeof this.m_custom_shader_uniforms[b] ? c = this.m_custom_shader_uniforms[b] : (c = new gb.shader_uniform, this.m_custom_shader_uniforms[b] = c);
  a instanceof gb.mat4 ? (c.mat4_value = a, c.type = gb.shader_uniform.type.mat4) : a instanceof gb.vec4 ? (c.vec4_value = a, c.type = gb.shader_uniform.type.vec4) : a instanceof gb.vec3 ? (c.vec3_value = a, c.type = gb.shader_uniform.type.vec3) : a instanceof gb.vec2 ? (c.vec2_value = a, c.type = gb.shader_uniform.type.vec2) : "number" === typeof a ? gb.math.is_int(a) ? (c.i32_value = a, c.type = gb.shader_uniform.type.i32) : (c.f32_value = a, c.type = gb.shader_uniform.type.f32) : console.log("unknown shader uniform type: ", 
  typeof a);
}, bind_custom_shader_uniforms:function() {
  for (var a in this.m_custom_shader_uniforms) {
    var b = this.m_custom_shader_uniforms[a];
    switch(b.type) {
      case gb.shader_uniform.type.mat4:
        this.m_parameters.shader.set_custom_mat4(b.mat4_value, a);
        break;
      case gb.shader_uniform.type.vec4:
        this.m_parameters.shader.set_custom_vec4(b.vec4_value, a);
        break;
      case gb.shader_uniform.type.vec3:
        this.m_parameters.shader.set_custom_vec3(b.vec3_value, a);
        break;
      case gb.shader_uniform.type.vec2:
        this.m_parameters.shader.set_custom_vec2(b.vec2_value, a);
        break;
      case gb.shader_uniform.type.f32:
        this.m_parameters.shader.set_custom_f32(b.f32_value, a);
        break;
      case gb.shader_uniform.type.i32:
        this.m_parameters.shader.set_custom_i32(b.i32_value, a);
    }
  }
}, bind:function() {
  this.m_parameters.shader.bind();
  for (var a = 0;8 > a;++a) {
    null !== this.m_parameters.textures[a] && this.m_parameters.shader.set_texture(this.m_parameters.textures[a], a);
  }
  this.m_parameters.is_depth_test && this.m_parameters.is_depth_test !== gb.material_cached_parameters.get_cached_parameters.is_depth_test ? (gl.enable(gl.DEPTH_TEST), gb.material_cached_parameters.get_cached_parameters.is_depth_test = this.m_parameters.is_depth_test) : this.m_parameters.is_depth_test !== gb.material_cached_parameters.get_cached_parameters.is_depth_test && (gl.disable(gl.DEPTH_TEST), gb.material_cached_parameters.get_cached_parameters.is_depth_test = this.m_parameters.is_depth_test);
  this.m_parameters.is_depth_mask && this.m_parameters.is_depth_mask !== gb.material_cached_parameters.get_cached_parameters.is_depth_mask ? (gl.depthMask(!0), gb.material_cached_parameters.get_cached_parameters.is_depth_mask = this.m_parameters.is_depth_mask) : this.m_parameters.is_depth_mask !== gb.material_cached_parameters.get_cached_parameters.is_depth_mask && (gl.depthMask(!1), gb.material_cached_parameters.get_cached_parameters.is_depth_mask = this.m_parameters.is_depth_mask);
  this.m_parameters.is_cull_face && this.m_parameters.is_cull_face !== gb.material_cached_parameters.get_cached_parameters.is_cull_face ? (gl.enable(gl.CULL_FACE), gb.material_cached_parameters.get_cached_parameters.is_cull_face = this.m_parameters.is_cull_face) : this.m_parameters.is_cull_face !== gb.material_cached_parameters.get_cached_parameters.is_cull_face && (gl.disable(gl.CULL_FACE), gb.material_cached_parameters.get_cached_parameters.is_cull_face = this.m_parameters.is_cull_face);
  this.m_parameters.cull_face_mode && this.m_parameters.cull_face_mode !== gb.material_cached_parameters.get_cached_parameters.cull_face_mode ? (gl.cullFace(this.m_parameters.cull_face_mode), gb.material_cached_parameters.get_cached_parameters.cull_face_mode = this.m_parameters.cull_face_mode) : this.m_parameters.cull_face_mode !== gb.material_cached_parameters.get_cached_parameters.cull_face_mode && (gl.cullFace(this.m_parameters.cull_face_mode), gb.material_cached_parameters.get_cached_parameters.cull_face_mode = 
  this.m_parameters.cull_face_mode);
  this.m_parameters.is_blending && this.m_parameters.is_blending !== gb.material_cached_parameters.get_cached_parameters.is_blending ? (gl.enable(gl.BLEND), gb.material_cached_parameters.get_cached_parameters.is_blending = this.m_parameters.is_blending) : this.m_parameters.is_blending !== gb.material_cached_parameters.get_cached_parameters.is_blending && (gl.disable(gl.BLEND), gb.material_cached_parameters.get_cached_parameters.is_blending = this.m_parameters.is_blending);
  if (this.m_parameters.blending_function_source !== gb.material_cached_parameters.get_cached_parameters.blending_function_source || this.m_parameters.blending_function_destination !== gb.material_cached_parameters.get_cached_parameters.blending_function_destination) {
    gl.blendFunc(this.m_parameters.blending_function_source, this.m_parameters.blending_function_destination), gb.material_cached_parameters.get_cached_parameters.blending_function_source = this.m_parameters.blending_function_source, gb.material_cached_parameters.get_cached_parameters.blending_function_destination = this.m_parameters.blending_function_destination;
  }
  this.m_parameters.blending_equation !== gb.material_cached_parameters.get_cached_parameters.blending_equation && (gl.blendEquation(this.m_parameters.blending_equation), gb.material_cached_parameters.get_cached_parameters.blending_equation = this.m_parameters.blending_equation);
  this.m_parameters.is_stencil_test && this.m_parameters.is_stencil_test !== gb.material_cached_parameters.get_cached_parameters.is_stencil_test ? (gl.enable(gl.STENCIL_TEST), gb.material_cached_parameters.get_cached_parameters.is_stencil_test = this.m_parameters.is_stencil_test) : this.m_parameters.is_stencil_test !== gb.material_cached_parameters.get_cached_parameters.is_stencil_test && (gl.disable(gl.STENCIL_TEST), gb.material_cached_parameters.get_cached_parameters.is_stencil_test = this.m_parameters.is_stencil_test);
  if (this.m_parameters.stencil_function !== gb.material_cached_parameters.get_cached_parameters.stencil_function || this.m_parameters.stencil_function_parameter_1 !== gb.material_cached_parameters.get_cached_parameters.stencil_function_parameter_1 || this.m_parameters.stencil_function_parameter_2 !== gb.material_cached_parameters.get_cached_parameters.stencil_function_parameter_2) {
    gl.stencilFunc(this.m_parameters.stencil_function, this.m_parameters.stencil_function_parameter_1, this.m_parameters.stencil_function_parameter_2), gb.material_cached_parameters.get_cached_parameters.stencil_function = this.m_parameters.stencil_function, gb.material_cached_parameters.get_cached_parameters.stencil_function_parameter_1 = this.m_parameters.stencil_function_parameter_1, gb.material_cached_parameters.get_cached_parameters.stencil_function_parameter_2 = this.m_parameters.stencil_function_parameter_2
    ;
  }
  this.m_parameters.stencil_mask_parameter !== gb.material_cached_parameters.get_cached_parameters.stencil_mask_parameter && (gl.stencilMask(this.m_parameters.stencil_mask_parameter), gb.material_cached_parameters.get_cached_parameters.stencil_mask_parameter = this.m_parameters.stencil_mask_parameter);
  this.bind_custom_shader_uniforms();
}, unbind:function() {
  this.m_parameters.shader.unbind();
}}, static_methods:{construct:function(a) {
  var b = new gb.material;
  b.is_cull_face = a.is_cull_face;
  b.cull_face_mode = a.cull_face_mode;
  b.is_blending = a.is_blending;
  b.blending_function_source = a.blending_function_source;
  b.blending_function_destination = a.blending_function_destination;
  b.blending_equation = a.blending_equation;
  b.is_stencil_test = a.is_stencil_test;
  b.stencil_function = a.stencil_function;
  b.stencil_function_parameter_1 = a.stencil_function_parameter_1;
  b.stencil_function_parameter_2 = a.stencil_function_parameter_2;
  b.stencil_mask_parameter = a.stencil_mask_parameter;
  b.guid = "" + a.technique_name + a.technique_pass + a.shader_configuration.filename;
  return b;
}, set_shader:function(a, b, c) {
  c.get_shader(b.shader_configuration.filename).add_resource_loading_callback(function(b) {
    a.shader = b;
  });
}, set_textures:function(a, b, c) {
  var d = b.textures_configurations ? b.textures_configurations.length : 0;
  if (d) {
    for (var e = function(b, c) {
      b.wrap_mode = c.wrap_mode;
      b.mag_filter = c.mag_filter;
      b.min_filter = c.min_filter;
      a.set_texture(b, c.sampler_index);
    }, f = 0;f < d;++f) {
      var g = b.textures_configurations[f];
      c.get_texture(0 !== g.filename.length ? g.filename : g.technique_name).add_resource_loading_callback(e, g);
    }
  }
}}});
oop.define_class({namespace:"gb", name:"render_technique_base", init:function(a, b, c, d) {
  this.m_name = c;
  this.m_frame_width = a;
  this.m_frame_height = b;
  this.m_index = d;
  this.m_clear_color = new gb.vec4(.5, .5, .5, 1);
  this.m_frame_buffer = null;
  Object.defineProperty(this, "name", {get:function() {
    return this.m_name;
  }});
  Object.defineProperty(this, "frame_width", {get:function() {
    return this.m_frame_width;
  }});
  Object.defineProperty(this, "frame_height", {get:function() {
    return this.m_frame_height;
  }});
  Object.defineProperty(this, "index", {get:function() {
    return this.m_index;
  }});
  Object.defineProperty(this, "clear_color", {set:function(a) {
    this.m_clear_color = a;
  }});
}, release:function() {
}, methods:{}, static_methods:{}});
oop.define_class({namespace:"gb", name:"render_technique_main", extend:gb.render_technique_base, init:function(a, b, c, d, e) {
  this.m_material = e;
  this.m_screen_quad = gb.mesh_constructor.create_screen_quad();
  this.m_render_buffer = null;
}, release:function() {
  this.m_screen_quad.release();
}, methods:{bind:function() {
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.m_frame_buffer);
  gl.bindRenderbuffer(gl.RENDERBUFFER, this.m_render_buffer);
  gl.viewport(0, 0, this.m_frame_width, this.m_frame_height);
  gl.disable(gl.DEPTH_TEST);
  gb.material_cached_parameters.get_cached_parameters().is_depth_test = !1;
  gl.depthMask(!1);
  gb.material_cached_parameters.get_cached_parameters().is_depth_mask = !1;
  gl.disable(gl.STENCIL_TEST);
  gb.material_cached_parameters.get_cached_parameters().is_stencil_test = !1;
  gl.clearColor(this.m_clear_color.x, this.m_clear_color.y, this.m_clear_color.z, this.m_clear_color.w);
  gl.clear(gl.COLOR_BUFFER_BIT);
  this.m_material.shader && this.m_material.shader.is_commited && (this.m_material.bind(), this.m_screen_quad.bind(this.m_material.shader.attributes));
}, unbind:function() {
  this.m_material.shader && this.m_material.shader.is_commited && (this.m_material.unbind(), this.m_screen_quad.unbind(this.m_material.shader.attributes));
}, draw:function() {
  this.m_material.shader && this.m_material.shader.is_commited && this.m_screen_quad.draw();
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"render_technique_ws", extend:gb.render_technique_base, init:function(a, b, c, d, e) {
  this.m_num_passes = Math.max(e, 1);
  a = gl.createTexture();
  this.m_color_attachment_texture = gb.texture.construct(c + ".color", a, this.m_frame_width, this.m_frame_height);
  this.m_color_attachment_texture.wrap_mode = gl.CLAMP_TO_EDGE;
  this.m_color_attachment_texture.mag_filter = gl.LINEAR;
  this.m_color_attachment_texture.min_filter = gl.LINEAR;
  this.m_color_attachment_texture.bind();
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.m_frame_width, this.m_frame_height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  this.m_depth_attachment_texture = null;
  this.m_depth_attachment_id = gl.createRenderbuffer();
  gl.bindRenderbuffer(gl.RENDERBUFFER, this.m_depth_attachment_id);
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, this.m_frame_width, this.m_frame_height);
  this.m_frame_buffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.m_frame_buffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, a, 0);
  gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.m_depth_attachment_id);
  gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE && console.error("can't create framebuffer");
  Object.defineProperty(this, "color_attachment_texture", {get:function() {
    return this.m_color_attachment_texture;
  }});
  Object.defineProperty(this, "depth_attachment_texture", {get:function() {
    return this.m_depth_attachment_texture;
  }});
  Object.defineProperty(this, "num_passes", {get:function() {
    return this.m_num_passes;
  }});
}, release:function() {
  gl.deleteFramebuffer(this.m_frame_buffer);
  gl.deleteRenderbuffer(this.m_depth_attachment_id);
  this.m_color_attachment_texture.release();
}, methods:{bind:function() {
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.m_frame_buffer);
  gl.viewport(0, 0, this.m_frame_width, this.m_frame_height);
  gl.disable(gl.DEPTH_TEST);
  gb.material_cached_parameters.get_cached_parameters().is_depth_test = !0;
  gl.depthMask(!1);
  gb.material_cached_parameters.get_cached_parameters().is_depth_mask = !0;
  gl.enable(gl.STENCIL_TEST);
  gb.material_cached_parameters.get_cached_parameters().is_stencil_test = !0;
  gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
  gl.clearColor(this.m_clear_color.x, this.m_clear_color.y, this.m_clear_color.z, this.m_clear_color.w);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
}, unbind:function() {
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}, draw:function() {
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"render_technique_ss", extend:gb.render_technique_base, init:function(a, b, c, d, e) {
  a = gl.createTexture();
  this.m_color_attachment_texture = gb.texture.construct(c + ".color", a, this.m_frame_width, this.m_frame_height);
  this.m_color_attachment_texture.wrap_mode = gl.CLAMP_TO_EDGE;
  this.m_color_attachment_texture.mag_filter = gl.LINEAR;
  this.m_color_attachment_texture.min_filter = gl.LINEAR;
  this.m_color_attachment_texture.bind();
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.m_frame_width, this.m_frame_height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  this.m_frame_buffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.m_frame_buffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, a, 0);
  gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE && console.error("can't create framebuffer");
  this.m_material = e;
  this.m_screen_quad = gb.mesh_constructor.create_screen_quad();
  Object.defineProperty(this, "color_attachment_texture", {get:function() {
    return this.m_color_attachment_texture;
  }});
  Object.defineProperty(this, "material", {get:function() {
    return this.m_material;
  }});
}, release:function() {
  this.m_screen_quad.release();
  this.m_color_attachment_texture.release();
  gl.deleteFramebuffer(this.m_frame_buffer);
}, methods:{bind:function() {
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.m_frame_buffer);
  gl.viewport(0, 0, this.m_frame_width, this.m_frame_height);
  gl.disable(gl.DEPTH_TEST);
  gb.material_cached_parameters.get_cached_parameters().is_depth_test = !1;
  gl.depthMask(!1);
  gb.material_cached_parameters.get_cached_parameters().is_depth_mask = !1;
  gl.disable(gl.STENCIL_TEST);
  gb.material_cached_parameters.get_cached_parameters().is_stencil_test = !1;
  gl.clearColor(this.m_clear_color.x, this.m_clear_color.y, this.m_clear_color.z, this.m_clear_color.w);
  gl.clear(gl.COLOR_BUFFER_BIT);
  this.m_material.shader && this.m_material.shader.is_commited && (this.m_material.bind(), this.m_screen_quad.bind(this.m_material.shader.attributes));
}, unbind:function() {
  this.m_material.shader && this.m_material.shader.is_commited && (this.m_material.unbind(), this.m_screen_quad.unbind(this.m_material.shader.attributes));
}, draw:function() {
  this.m_material.shader && this.m_material.shader.is_commited && this.m_screen_quad.draw();
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"render_pipeline", init:function() {
  this.m_main_render_technique = null;
  this.m_ws_render_techniques = [];
  this.m_unique_ws_render_techniques = [];
  this.m_ss_render_techniques = [];
  this.m_unique_ss_render_techniques = [];
  Object.defineProperty(this, "ws_render_techniques", {get:function() {
    return this.m_ws_render_techniques;
  }});
}, release:function() {
  for (var a = this.m_ws_render_techniques.length, b = null, c = 0;c < a;++c) {
    b = this.m_ws_render_techniques[c], b.release();
  }
  a = this.m_ss_render_techniques.length;
  for (c = 0;c < a;++c) {
    b = this.m_ss_render_techniques[c], b.release();
  }
  this.m_main_render_technique.release();
}, methods:{create_main_render_technique:function(a) {
  this.m_main_render_technique = new gb.render_technique_main(gl.viewport_width, gl.viewport_height, "main", 0, a);
}, add_ws_render_technique:function(a, b, c) {
  b = "" + b + a;
  this.m_unique_ws_render_techniques[b] ? console.log("can't add same ws render technique: " + a) : (this.m_unique_ws_render_techniques[b] = c, this.m_ws_render_techniques.push(c));
}, remove_ws_render_technique:function(a, b) {
}, add_ss_render_technique:function(a, b) {
  "undefined" === typeof this.m_unique_ss_render_techniques[a] ? (this.m_unique_ss_render_techniques[a] = b, this.m_ss_render_techniques.push(b)) : console.log("can't add same ss render technique: " + a);
}, remove_ss_render_technique:function(a) {
}, on_draw_begin:function() {
}, on_draw_end:function() {
  for (var a = 0;a < this.m_ss_render_techniques.length;++a) {
    var b = this.m_ss_render_techniques[a];
    b.bind();
    b.draw();
    b.unbind();
  }
  this.m_main_render_technique && (this.m_main_render_technique.bind(), this.m_main_render_technique.draw(), this.m_main_render_technique.unbind());
}, get_ws_technique_result_as_image:function(a, b, c, d) {
  var e = null;
  a = "" + b + a;
  this.m_unique_ws_render_techniques[a] && (b = this.m_unique_ws_render_techniques[a], e = new gb.material, a = gb.builtin_shaders.get_screen_quad_tex2d_shader(), e.shader = a, e.set_texture(b.color_attachment_texture, gb.shader.sampler_type.sampler_01), a = new gb.mesh_constructor.create_screen_quad, b = new gb.render_target(b.frame_width, b.frame_height), b.begin(), e.shader && e.shader.is_commited && (e.bind(), a.bind(e.shader.attributes), a.draw(), e.unbind(), a.unbind(e.shader.attributes)), 
  e = b.end(c, d), b.release(), a.release());
  return e;
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"render_target", init:function(a, b) {
  var c = gl.createTexture();
  this.m_color_attachment_texture = gb.texture.construct("render_target", c, a, b);
  this.m_color_attachment_texture.wrap_mode = gl.CLAMP_TO_EDGE;
  this.m_color_attachment_texture.mag_filter = gl.LINEAR;
  this.m_color_attachment_texture.min_filter = gl.LINEAR;
  this.m_color_attachment_texture.bind();
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, a, b, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  this.m_frame_buffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.m_frame_buffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, c, 0);
  gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE && console.error("can't create framebuffer");
  this.m_screen_quad = gb.mesh_constructor.create_screen_quad();
}, release:function() {
  gl.deleteFramebuffer(this.m_frame_buffer);
  this.m_color_attachment_texture.release();
  this.m_screen_quad.release();
}, methods:{begin:function() {
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.m_frame_buffer);
  gl.viewport(0, 0, this.m_color_attachment_texture.width, this.m_color_attachment_texture.height);
  gl.disable(gl.DEPTH_TEST);
  gb.material_cached_parameters.get_cached_parameters().is_depth_test = !1;
  gl.depthMask(!1);
  gb.material_cached_parameters.get_cached_parameters().is_depth_mask = !1;
  gl.disable(gl.STENCIL_TEST);
  gb.material_cached_parameters.get_cached_parameters().is_stencil_test = !1;
  gl.clearColor(0, 0, 0, 0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}, end:function(a, b) {
  var c = new Uint8Array(this.m_color_attachment_texture.width * this.m_color_attachment_texture.height * 4);
  gl.readPixels(0, 0, this.m_color_attachment_texture.width, this.m_color_attachment_texture.height, gl.RGBA, gl.UNSIGNED_BYTE, c);
  var d = document.createElement("canvas");
  d.width = this.m_color_attachment_texture.width;
  d.height = this.m_color_attachment_texture.height;
  var e = d.getContext("2d"), f = e.createImageData(this.m_color_attachment_texture.width, this.m_color_attachment_texture.height);
  f.data.set(c);
  e.putImageData(f, 0, 0);
  c = new Image;
  c.src = d.toDataURL();
  d.width = a;
  d.height = b;
  e.clearRect(0, 0, this.m_color_attachment_texture.width, this.m_color_attachment_texture.height);
  e.scale(1, -1);
  e.drawImage(c, 0, -c.height);
  c.src = d.toDataURL();
  return c;
}}, static_methods:{}});
var g_input_context = null;
oop.define_class({namespace:"gb", name:"input_context", constants:{source:{mouse:0, keyboard:3}, state:{pressed:0, released:1, moved:2, dragged:3}}, init:function() {
  g_input_context = this;
  var a = document.getElementById("gl_canvas");
  a.onmousedown = this.on_mouse_pressed;
  a.onmouseup = this.on_mouse_released;
  a.onmousemove = this.on_mouse_moved;
  this.m_listeners = [];
  this.m_mouse_pressed = !1;
  this.m_previouse_pressed_point = new gb.vec2(0);
}, release:function() {
}, methods:{on_mouse_pressed:function(a) {
  g_input_context.m_mouse_pressed = !0;
  for (var b = g_input_context.m_listeners.length, c = 0;c < b;++c) {
    var d = g_input_context.m_listeners[c];
    if (d.on_mouse_pressed) {
      d.on_mouse_pressed(new gb.vec2(a.offsetX, a.offsetY));
    }
  }
  g_input_context.m_previouse_pressed_point.x = a.offsetX;
  g_input_context.m_previouse_pressed_point.y = a.offsetY;
}, on_mouse_released:function(a) {
  g_input_context.m_mouse_pressed = !1;
  for (var b = g_input_context.m_listeners.length, c = 0;c < b;++c) {
    var d = g_input_context.m_listeners[c];
    if (d.on_mouse_released) {
      d.on_mouse_released(new gb.vec2(a.offsetX, a.offsetY));
    }
  }
  g_input_context.m_previouse_pressed_point.x = a.offsetX;
  g_input_context.m_previouse_pressed_point.y = a.offsetY;
}, on_mouse_moved:function(a) {
  for (var b = g_input_context.m_listeners.length, c = 0;c < b;++c) {
    var d = g_input_context.m_listeners[c];
    if (!g_input_context.m_mouse_pressed && d.on_mouse_moved) {
      d.on_mouse_moved(new gb.vec2(a.offsetX, a.offsetY), new gb.vec2(g_input_context.m_previouse_pressed_point.x - a.offsetX, g_input_context.m_previouse_pressed_point.y - a.offsetY));
    } else {
      if (g_input_context.m_mouse_pressed && d.on_mouse_dragged) {
        d.on_mouse_dragged(new gb.vec2(a.offsetX, a.offsetY), new gb.vec2(g_input_context.m_previouse_pressed_point.x - a.offsetX, g_input_context.m_previouse_pressed_point.y - a.offsetY));
      }
    }
  }
  g_input_context.m_previouse_pressed_point.x = a.offsetX;
  g_input_context.m_previouse_pressed_point.y = a.offsetY;
}, add_listener:function(a) {
  this.m_listeners.push(a);
}, remove_listener:function(a) {
  a = _.indexOf(this.m_listeners, a);
  -1 !== a ? this.m_listeners.splice(a, 1) : console.error("input context doesn't contain this listener");
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"ces_base_component", constants:{type:{undefined:-1, transformation:0, material:1, geometry:2, scene:3, light:4, light_mask:5, convex_hull:6, touch_recognize:7, animation:8, box2d_body:9, box2d_world:10, action:11, max:12}}, init:function() {
  this.m_type = gb.ces_base_component.undefined;
  Object.defineProperty(this, "type", {get:function() {
    return this.m_type;
  }});
}, release:function() {
}, methods:{}, static_methods:{}});
oop.define_class({namespace:"gb", name:"ces_transformation_component", extend:gb.ces_base_component, init:function() {
  this.m_type = gb.ces_base_component.type.transformation;
  this.m_position = new gb.vec2(0);
  this.m_rotation = 0;
  this.m_scale = new gb.vec2(1);
  this.m_matrix_t = (new gb.mat4).identity();
  this.m_matrix_r = (new gb.mat4).identity();
  this.m_matrix_s = (new gb.mat4).identity();
  this.m_matrix_m = (new gb.mat4).identity();
  this.m_is_matrix_m_computed = !1;
  var a = this;
  Object.defineProperty(this, "position", {set:function(b) {
    a.m_position = b;
    Object.defineProperty(b, "x", {set:function(b) {
      a.m_position.m_data[0] = b;
      a.m_matrix_t.translate(a.m_position.x, a.m_position.y, 0);
      a.m_is_matrix_m_computed = !1;
    }, get:function() {
      return a.m_position.m_data[0];
    }});
    Object.defineProperty(b, "y", {set:function(b) {
      a.m_position.m_data[1] = b;
      a.m_matrix_t.translate(a.m_position.x, a.m_position.y, 0);
      a.m_is_matrix_m_computed = !1;
    }, get:function() {
      return a.m_position.m_data[1];
    }});
    a.m_matrix_t.translate(a.m_position.x, a.m_position.y, 0);
    a.m_is_matrix_m_computed = !1;
  }, get:function() {
    return a.m_position;
  }});
  Object.defineProperty(this, "rotation", {set:function(a) {
    this.m_rotation = a;
    this.m_matrix_r.rotate_z(this.m_rotation);
    this.m_is_matrix_m_computed = !1;
  }, get:function() {
    return this.m_rotation;
  }});
  Object.defineProperty(this, "scale", {set:function(b) {
    this.m_scale = b;
    Object.defineProperty(b, "x", {set:function(b) {
      a.m_scale.m_data[0] = b;
      a.m_matrix_s.scale(a.m_scale.x, a.m_scale.y, 1);
      a.m_is_matrix_m_computed = !1;
    }, get:function() {
      return a.m_scale.m_data[0];
    }});
    Object.defineProperty(b, "y", {set:function(b) {
      a.m_scale.m_data[1] = b;
      a.m_matrix_s.scale(a.m_scale.x, a.m_scale.y, 1);
      a.m_is_matrix_m_computed = !1;
    }, get:function() {
      return a.m_scale.m_data[1];
    }});
    this.m_matrix_s.scale(this.m_scale.x, this.m_scale.y, 1);
    this.m_is_matrix_m_computed = !1;
  }, get:function() {
    return this.m_scale;
  }});
  Object.defineProperty(this, "matrix_m", {get:function() {
    this.m_is_matrix_m_computed || (this.m_matrix_m = gb.mat4.multiply(gb.mat4.multiply(this.m_matrix_t, this.m_matrix_r), this.m_matrix_s), this.m_is_matrix_m_computed = !0);
    return this.m_matrix_m;
  }});
  this.position = new gb.vec2(0);
  this.rotation = 0;
  this.scale = new gb.vec2(1);
}, release:function() {
}, methods:{}, static_methods:{get_parent_transformation:function(a, b) {
  for (var c = (new gb.mat4).identity(), d = a.parent;d;) {
    var e = d.get_component(gb.ces_base_component.type.transformation), c = b ? gb.mat4.multiply(c, e.matrix_m) : gb.mat4.multiply(c, gb.mat4.multiply(e.m_matrix_t, e.m_matrix_r)), d = d.parent
  }
  return c;
}, get_absolute_transformation:function(a, b) {
  var c = gb.ces_transformation_component.get_parent_transformation(a, b), d = a.get_component(gb.ces_base_component.type.transformation);
  return c = b ? gb.mat4.multiply(c, d.matrix_m) : gb.mat4.multiply(c, gb.mat4.multiply(d.m_matrix_t, d.m_matrix_r));
}, get_absolute_transformation_in_camera_space:function(a) {
  var b = gb.ces_transformation_component.get_absolute_transformation(a);
  a.is_component_exist(gb.ces_base_component.type.scene) && (a = a.get_component(gb.ces_base_component.type.scene), b = gb.mat4.multiply(b, a.camera.matrix_v));
  return b;
}}});
oop.define_class({namespace:"gb", name:"ces_material_component", extend:gb.ces_base_component, init:function() {
  this.m_type = gb.ces_base_component.type.material;
  this.m_materials = [];
}, release:function() {
}, methods:{add_material:function(a, b, c) {
  "undefined" === typeof this.m_materials[a] && (this.m_materials[a] = []);
  this.m_materials[a][b] = c;
}, remove_material:function(a, b) {
  "undefined" !== typeof this.m_materials[a] && this.m_materials[a].length > b && this.m_materials[a].splice(b, 1);
}, get_material:function(a, b) {
  var c = null;
  "undefined" !== typeof this.m_materials[a] && this.m_materials[a].length > b && (c = this.m_materials[a][b]);
  return c;
}, bind:function(a, b, c) {
  var d = c;
  "undefined" === typeof c && (d = this.get_material(a, b));
  d.bind();
}, unbind:function(a, b, c) {
  var d = c;
  "undefined" === typeof c && (d = this.get_material(a, b));
  d.unbind();
}, set_custom_shader_uniform:function(a, b, c, d) {
  if (4 === arguments.length) {
    var e = this.get_material(c, d);
    e && e.set_custom_shader_uniform(a, b);
  } else {
    for (e in this.m_materials) {
      for (var f = 0;f < this.m_materials[e].length;++f) {
        this.m_materials[e][f].set_custom_shader_uniform(a, b);
      }
    }
  }
}, set_texture:function(a, b, c, d) {
  if (4 === arguments.length) {
    var e = this.get_material(c, d);
    e && e.set_texture(a, b);
  } else {
    for (e in this.m_materials) {
      for (var f = 0;f < this.m_materials[e].length;++f) {
        this.m_materials[e][f].set_texture(a, b);
      }
    }
  }
}}, static_methods:{add_material:function(a, b, c, d) {
  (a = a.get_component(gb.ces_base_component.type.material)) && a.add_material(b, c, d);
}, remove_material:function(a, b, c) {
  (a = a.get_component(gb.ces_base_component.type.material)) && a.remove_material(b, c);
}, get_material:function(a, b, c) {
  var d = null;
  (a = a.get_component(gb.ces_base_component.type.material)) && (d = a.get_material(b, c));
  return d;
}}});
oop.define_class({namespace:"gb", name:"ces_scene_component", extend:gb.ces_base_component, init:function() {
  this.m_type = gb.ces_base_component.type.scene;
  this.m_scene = null;
  Object.defineProperty(this, "scene", {set:function(a) {
    this.m_scene = a;
  }, get:function() {
    return this.m_scene;
  }});
  Object.defineProperty(this, "camera", {get:function() {
    return this.m_scene.camera;
  }});
}, release:function() {
}, methods:{}, static_methods:{}});
oop.define_class({namespace:"gb", name:"ces_convex_hull_component", extend:gb.ces_base_component, init:function() {
  this.m_type = gb.ces_base_component.type.convex_hull;
  this.m_center = new gb.vec2(0);
  this.m_oriented_vertices = [];
  Object.defineProperty(this, "center", {get:function() {
    return this.m_center;
  }});
  Object.defineProperty(this, "oriented_vertices", {get:function() {
    return this.m_oriented_vertices;
  }});
}, release:function() {
}, methods:{generate_convex_hull:function(a) {
  if (!(3 > a.length)) {
    this.m_oriented_vertices = [];
    for (var b = 0, c = 0;c < a.length;++c) {
      a[c].x < a[b].x && (b = c);
    }
    var d = b, e;
    do {
      e = (d + 1) % a.length;
      for (c = 0;c < a.length;++c) {
        gb.math.point_orientation(a[d], a[c], a[e]) === gb.math.orientation.counterclockwise && (e = c);
      }
      this.m_oriented_vertices.push(a[e]);
      d = e;
    } while (d !== b);
    a = new gb.vec2(gb.math.INT16_MAX);
    b = new gb.vec2(gb.math.INT16_MIN);
    for (c = 0;c < this.m_oriented_vertices.length;++c) {
      a = gb.vec2.min(this.m_oriented_vertices[c], a), b = gb.vec2.max(this.m_oriented_vertices[c], b);
    }
    this.m_center = gb.vec2.sub(b, a).divide_scalar(2);
  }
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"ces_geometry_component", extend:gb.ces_base_component, init:function() {
  this.m_type = gb.ces_base_component.type.geometry;
  this.m_mesh = null;
  this.m_size = new gb.vec2(0);
  this.m_pivot = new gb.vec2(0);
  Object.defineProperty(this, "pivot", {configurable:!0, get:function() {
    return this.m_pivot;
  }, set:function(a) {
    this.m_pivot = a;
  }});
  Object.defineProperty(this, "size", {configurable:!0, get:function() {
    return this.m_size;
  }, set:function(a) {
    this.m_size = a;
  }});
  Object.defineProperty(this, "mesh", {configurable:!0, get:function() {
    return this.m_mesh;
  }});
}, release:function() {
}, methods:{}, static_methods:{}});
oop.define_class({namespace:"gb", name:"ces_geometry_freeform_component", extend:gb.ces_geometry_component, init:function() {
  Object.defineProperty(this, "mesh", {get:function() {
    return this.m_mesh;
  }, set:function(a) {
    this.m_mesh = a;
  }});
}, release:function() {
}, methods:{}, static_methods:{}});
oop.define_class({namespace:"gb", name:"ces_geometry_quad_component", extend:gb.ces_geometry_component, init:function() {
  this.m_mesh = gb.mesh_constructor.create_shape_quad();
  this.m_pivot.x = .5;
  this.m_pivot.y = .5;
  Object.defineProperty(this, "pivot", {get:function() {
    return this.m_pivot;
  }, set:function(a) {
    this.m_pivot = a;
    this.m_pivot.x = Math.max(Math.min(this.m_pivot.x, 1), 0);
    this.m_pivot.y = Math.max(Math.min(this.m_pivot.y, 1), 0);
    this.update_mesh_position_attributes();
  }});
  Object.defineProperty(this, "size", {get:function() {
    return this.m_size;
  }, set:function(a) {
    this.m_size = a;
    this.update_mesh_position_attributes();
  }});
}, release:function() {
}, methods:{update_mesh_position_attributes:function() {
  var a = new gb.vec2(-this.m_size.x * (1 - this.m_pivot.x), -this.m_size.y * (1 - this.m_pivot.y)), b = new gb.vec2(this.m_size.x * this.m_pivot.x, this.m_size.y * this.m_pivot.y), c = this.m_mesh.vbo;
  c.write_attribute(gb.vbo.attribute.position, 0, new gb.vec2(a.x, a.y));
  c.write_attribute(gb.vbo.attribute.position, 1, new gb.vec2(a.x, b.y));
  c.write_attribute(gb.vbo.attribute.position, 2, new gb.vec2(b.x, a.y));
  c.write_attribute(gb.vbo.attribute.position, 3, new gb.vec2(b.x, b.y));
  c.submit();
}, update_mesh_texcoord_attributes:function(a, b, c, d) {
  var e = this.m_mesh.vbo;
  e.write_attribute(gb.vbo.attribute.texcoord, 0, new gb.vec2(a, b));
  e.write_attribute(gb.vbo.attribute.texcoord, 1, new gb.vec2(a, d));
  e.write_attribute(gb.vbo.attribute.texcoord, 2, new gb.vec2(c, b));
  e.write_attribute(gb.vbo.attribute.texcoord, 3, new gb.vec2(c, d));
  e.submit();
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"ces_light_component", extend:gb.ces_base_component, init:function() {
  this.m_type = gb.ces_base_component.type.light;
  this.m_shadow_casters = [];
  Object.defineProperty(this, "shadow_casters", {get:function() {
    return this.m_shadow_casters;
  }});
}, release:function() {
}, methods:{add_shadow_caster:function(a) {
  this.m_shadow_casters.push(a);
}, cleanup:function() {
  this.m_shadow_casters = [];
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"ces_light_mask_component", extend:gb.ces_base_component, init:function() {
  this.m_type = gb.ces_base_component.type.light_mask;
  this.m_shadow_casters_vertices = [];
  this.m_shadow_casters_edges = [];
  this.m_vertices = [];
  this.m_indices = [];
  var a = new gb.vbo(1024, gl.DYNAMIC_DRAW, gb.vbo.declaration.position_xy), b = new gb.ibo(4096, gl.DYNAMIC_DRAW);
  this.m_mesh = new gb.mesh(a, b, gl.TRIANGLES);
  Object.defineProperty(this, "mesh", {get:function() {
    if (0 === this.m_vertices.length || 0 === this.m_indices.length) {
      this.m_mesh.vbo.submit(1), this.m_mesh.ibo.submit(1);
    } else {
      for (var a = this.m_mesh.vbo, b = 0;b < this.m_vertices.length;++b) {
        a.write_attribute(gb.vbo.attribute.position, b, this.m_vertices[b]);
      }
      a.submit();
      a = this.m_mesh.ibo;
      for (b = 0;b < this.m_indices.length;++b) {
        a.write_element(b, this.m_indices[b]);
      }
      a.submit(this.m_indices.length);
    }
    return this.m_mesh;
  }});
}, release:function() {
}, methods:{update_mask_geometry:function(a, b) {
  for (var c = 0;c < b.length;++c) {
    var d = (c + 1) % b.length;
    this.m_shadow_casters_edges.push({point_01:gb.mat4.multiply_vec2(b[c], a), point_02:gb.mat4.multiply_vec2(b[d], a)});
    this.m_shadow_casters_vertices.push(gb.mat4.multiply_vec2(b[c], a));
  }
}, generate_mask_mesh:function(a) {
  for (var b = [], c = 0;c < this.m_shadow_casters_vertices.length;++c) {
    var d = this.m_shadow_casters_vertices[c], e = Math.atan2(d.y - a.y, d.x - a.x);
    b.push(e - 1E-4);
    b.push(e);
    b.push(e + 1E-4);
  }
  for (var d = [], f = new gb.vec2(0), g = new gb.vec2(gb.math.INT16_MIN), h = new gb.vec2(g), k = gb.math.INT16_MAX, c = 0;c < b.length;++c) {
    e = b[c];
    f.x = Math.cos(e);
    f.y = Math.sin(e);
    var m = a, n = f.add(a), k = gb.math.INT16_MAX;
    h.x = g.x;
    h.y = g.y;
    for (var t = 0;t < this.m_shadow_casters_edges.length;++t) {
      var q = gb.math.intersect(m, n, this.m_shadow_casters_edges[t].point_01, this.m_shadow_casters_edges[t].point_02);
      q.intersected && q.distance < k && (k = q.distance, h.x = q.point_x, h.y = q.point_y);
    }
    h.equals(g) || -1 === d.findIndex(function(a) {
      return a.point_x === h.x && a.point_y === h.y;
    }) && d.push({point_x:h.x, point_y:h.y, angle:e});
  }
  d.sort(function(a, b) {
    return a.angle - b.angle;
  });
  c = d.length + 1 - this.m_vertices.length;
  if (0 < c) {
    for (c = this.m_vertices.length, this.m_vertices.length = d.length + 1;c < this.m_vertices.length;++c) {
      this.m_vertices[c] = new gb.vec2;
    }
  } else {
    0 > c && (this.m_vertices.length = d.length + 1);
  }
  this.m_vertices[0] = a;
  a = 1;
  for (c = 0;c < d.length;++c) {
    q = d[c], this.m_vertices[a].x = q.point_x, this.m_vertices[a].y = q.point_y, a++;
  }
  for (c = 1;c < this.m_vertices.length;++c) {
    a = Math.max((c + 1) % this.m_vertices.length, 1), this.m_indices.push(0), this.m_indices.push(c), this.m_indices.push(a);
  }
}, cleanup:function() {
  this.m_shadow_casters_vertices = [];
  this.m_shadow_casters_edges = [];
  this.m_indices = [];
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"ces_touch_recognize_component", extend:gb.ces_base_component, init:function() {
  this.m_type = gb.ces_base_component.type.touch_recognize;
  this.m_bound = new gb.vec4(0);
  this.m_min_bound = new gb.vec2(0);
  this.m_max_bound = new gb.vec2(0);
  this.m_responders = [];
  this.m_responders[gb.input_context.state.pressed] = !1;
  this.m_responders[gb.input_context.state.released] = !1;
  this.m_responders[gb.input_context.state.moved] = !1;
  this.m_responders[gb.input_context.state.dragged] = !1;
  this.m_callbacks = [];
  this.m_callbacks[gb.input_context.state.pressed] = [];
  this.m_callbacks[gb.input_context.state.released] = [];
  this.m_callbacks[gb.input_context.state.moved] = [];
  this.m_callbacks[gb.input_context.state.dragged] = [];
  Object.defineProperty(this, "bound", {set:function(a) {
    this.m_bound = a;
    this.m_min_bound.x = a.x;
    this.m_min_bound.y = a.y;
    this.m_max_bound.x = a.z;
    this.m_max_bound.y = a.w;
  }, get:function() {
    return this.m_bound;
  }});
  Object.defineProperty(this, "min_bound", {get:function() {
    return this.m_min_bound;
  }});
  Object.defineProperty(this, "max_bound", {get:function() {
    return this.m_max_bound;
  }});
}, release:function() {
}, methods:{enable:function(a, b) {
  this.m_responders[a] = b;
}, is_respond_to:function(a) {
  return this.m_responders[a];
}, add_callback:function(a, b, c) {
  this.m_callbacks[a].push({callback:b, userdata:c});
}, remove_callback:function(a, b) {
  var c = this.m_callbacks[a].findIndex(function(a) {
    return b === a.callback;
  });
  -1 !== c && this.m_callbacks[a].splice(c, 1);
}, get_callbacks:function(a) {
  return this.m_callbacks[a];
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"ces_animation_component", extend:gb.ces_base_component, init:function() {
  this.m_type = gb.ces_base_component.type.animation;
  this.m_frames = [];
  this.m_current_animation = "";
  this.m_current_frame = 0;
  this.m_current_switch_frame_deltatime = this.m_switch_frame_deltatime = .06;
  Object.defineProperty(this, "frames", {get:function() {
    return this.m_frames[this.m_current_animation] ? this.m_frames[this.m_current_animation] : null;
  }});
  Object.defineProperty(this, "current_frame", {get:function() {
    return this.m_current_frame;
  }, set:function(a) {
    this.m_current_frame = a;
  }});
  Object.defineProperty(this, "current_animation", {get:function() {
    return this.m_current_animation;
  }, set:function(a) {
    this.m_current_animation = a;
    this.m_current_frame = 0;
  }});
  Object.defineProperty(this, "switch_frame_deltatime", {get:function() {
    return this.m_switch_frame_deltatime;
  }});
  Object.defineProperty(this, "current_switch_frame_deltatime", {get:function() {
    return this.m_current_switch_frame_deltatime;
  }, set:function(a) {
    this.m_current_switch_frame_deltatime = a;
  }});
}, release:function() {
}, methods:{add_animation:function(a, b) {
  this.m_frames[a] = b;
  this.current_animation = a;
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"ces_box2d_body_component", extend:gb.ces_base_component, init:function() {
  this.m_type = gb.ces_base_component.type.box2d_body;
  this.m_position = new gb.vec2(0);
  this.m_rotation = 0;
  this.m_box2d_body = null;
  this.m_box2d_definition = new Box2D.b2BodyDef;
  Object.defineProperty(this, "position", {configurable:!0, get:function() {
    return this.m_position;
  }});
  Object.defineProperty(this, "rotation", {configurable:!0, get:function() {
    return this.m_rotation;
  }});
  Object.defineProperty(this, "box2d_definition", {configurable:!0, get:function() {
    return this.m_box2d_definition;
  }});
  Object.defineProperty(this, "box2d_body", {configurable:!0, get:function() {
    return this.m_box2d_body;
  }, set:function(a) {
    this.m_box2d_body = a;
  }});
}, release:function() {
}, methods:{on_position_changed:function(a) {
  this.m_position = a;
}, on_rotation_changed:function(a) {
  this.m_rotation = a;
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"ces_box2d_world_component", extend:gb.ces_base_component, init:function() {
  this.m_type = gb.ces_base_component.type.box2d_world;
  this.m_gravity = new Box2D.b2Vec2(0, 9.8);
  this.m_box2d_world = new Box2D.b2World(this.m_gravity);
  this.m_box2d_world.SetContinuousPhysics(!0);
  this.m_box2d_definition = new Box2D.b2BodyDef;
  this.m_box2d_definition.set_position(new Box2D.b2Vec2(0, 0));
  this.m_box2d_body = this.m_box2d_world.CreateBody(this.m_box2d_definition);
  this.m_max_bound = this.m_min_bound = null;
  Object.defineProperty(this, "box2d_world", {configurable:!0, get:function() {
    return this.m_box2d_world;
  }});
}, release:function() {
}, methods:{set_bounds:function(a, b) {
  this.m_min_bound = a;
  this.m_max_bound = b;
  var c = new Box2D.b2EdgeShape;
  c.Set(new Box2D.b2Vec2(a.x, a.y), new Box2D.b2Vec2(b.x, a.y));
  this.m_box2d_body.CreateFixture(c, 0);
  c.Set(new Box2D.b2Vec2(a.x, b.y), new Box2D.b2Vec2(b.x, b.y));
  this.m_box2d_body.CreateFixture(c, 0);
  c.Set(new Box2D.b2Vec2(a.x, b.y), new Box2D.b2Vec2(a.x, a.y));
  this.m_box2d_body.CreateFixture(c, 0);
  c.Set(new Box2D.b2Vec2(b.x, b.y), new Box2D.b2Vec2(b.x, a.y));
  this.m_box2d_body.CreateFixture(c, 0);
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"ces_action_component", extend:gb.ces_base_component, init:function() {
  this.m_type = gb.ces_base_component.type.action;
  this.m_action = null;
  Object.defineProperty(this, "action", {get:function() {
    return this.m_action;
  }, set:function(a) {
    this.m_action = a;
  }});
}, release:function() {
}, methods:{}, static_methods:{}});
var g_tag = 0;
oop.define_class({namespace:"gb", name:"ces_entity", init:function() {
  this.m_tag = "ces_entity" + g_tag++;
  this.m_components = [];
  for (var a = 0;a < gb.ces_base_component.type.max;++a) {
    this.m_components[a] = null;
  }
  this.m_parent = null;
  this.m_children = [];
  this.m_visible = !0;
  Object.defineProperty(this, "tag", {set:function(a) {
    this.m_tag = a;
  }, get:function() {
    return this.m_tag;
  }});
  Object.defineProperty(this, "parent", {set:function(a) {
    this.m_parent = a;
  }, get:function() {
    return this.m_parent;
  }});
  Object.defineProperty(this, "children", {get:function() {
    return this.m_children;
  }});
  Object.defineProperty(this, "visible", {set:function(a) {
    this.m_visible = a;
  }, get:function() {
    return this.m_visible;
  }});
  Object.defineProperty(this, "components", {get:function() {
    return this.m_components;
  }});
}, release:function() {
}, methods:{add_component:function(a) {
  this.m_components[a.type] = a;
}, remove_component:function(a) {
  a instanceof gb.ces_base_component ? this.m_components[a.type] = null : a < this.m_components.length && (this.m_components[a] = null);
}, remove_components:function() {
  this.m_components = [];
  for (var a = 0;a < gb.ces_base_component.type.max;++a) {
    this.m_components[a] = null;
  }
}, is_component_exist:function(a) {
  return null !== this.m_components[a];
}, get_component:function(a) {
  return this.m_components[a];
}, add_child:function(a) {
  -1 === this.m_children.findIndex(function(b) {
    return b.tag === a.tag;
  }) && (a.parent && a.parent.remove_child(a), a.parent = this, this.m_children.push(a), this.add_scene_component());
}, remove_child:function(a) {
  var b = this.m_children.findIndex(function(b) {
    return b.tag === a.tag;
  });
  -1 !== b && (this.m_children[b].remove_scene_component(), this.m_children[b].parent = null, this.m_children.splice(b, 1));
}, remove_from_parent:function() {
  this.parent && this.parent.remove_child(this);
}, add_scene_component:function() {
  var a = this.parent ? this.parent.get_component(gb.ces_base_component.type.scene) : null;
  !this.is_component_exist(gb.ces_base_component.type.scene) && a && this.add_component(a);
  for (a = 0;a < this.m_children.length;++a) {
    this.m_children[a].add_scene_component();
  }
}, remove_scene_component:function() {
  for (var a = 0;a < this.m_children.length;++a) {
    this.m_children[a].remove_scene_component();
  }
  this.remove_component(gb.ces_base_component.type.scene);
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"ces_base_system", constants:{type:{undefined:-1, render:0, deferred_lighting:1, touches_recognize:2, animation:3, box2d:4, action:5}}, init:function() {
  this.m_type = gb.ces_base_system.type.undefined;
  this.m_priority = 0;
  Object.defineProperty(this, "type", {get:function() {
    return this.m_type;
  }});
  Object.defineProperty(this, "priority", {get:function() {
    return this.m_priority;
  }});
}, release:function() {
}, methods:{}, static_methods:{}});
oop.define_class({namespace:"gb", name:"ces_deferred_lighting_system", extend:gb.ces_base_system, init:function() {
  this.m_type = gb.ces_base_system.type.deferred_lighting;
  this.m_light_casters = [];
  this.m_shadow_casters = [];
}, release:function() {
}, methods:{on_feed_start:function() {
  this.m_light_casters = [];
  this.m_shadow_casters = [];
}, on_feed:function(a) {
  this.update_recursively(a);
}, on_feed_end:function() {
  for (var a = 0;a < this.m_light_casters.length;++a) {
    var b = this.m_light_casters[a].get_component(gb.ces_base_component.type.light);
    b.cleanup();
    var c = this.m_light_casters[a].get_component(gb.ces_base_component.type.light_mask);
    c.cleanup();
    for (var d = this.m_light_casters[a].get_component(gb.ces_base_component.type.transformation), e = (new gb.mat4).identity(), f = this.m_light_casters[a].parent;f;) {
      var g = f.get_component(gb.ces_base_component.type.transformation), e = gb.mat4.multiply(e, g.matrix_m), f = f.parent
    }
    d = gb.mat4.multiply_vec2(d.position, e);
    for (e = 0;e < this.m_shadow_casters.length;++e) {
      for (var f = this.m_shadow_casters[e].get_component(gb.ces_base_component.type.convex_hull), g = this.m_shadow_casters[e].get_component(gb.ces_base_component.type.transformation), h = (new gb.mat4).identity(), k = this.m_shadow_casters[e].parent;k;) {
        var m = k.get_component(gb.ces_base_component.type.transformation), h = gb.mat4.multiply(h, m.matrix_m), k = k.parent
      }
      h = gb.mat4.multiply(h, g.matrix_m);
      c.update_mask_geometry(h, f.oriented_vertices);
      b.add_shadow_caster(this.m_shadow_casters[e]);
    }
    c.generate_mask_mesh(d);
  }
}, update_recursively:function(a) {
  a.get_component(gb.ces_base_component.type.light) && this.m_light_casters.push(a);
  a.get_component(gb.ces_base_component.type.convex_hull) && this.m_shadow_casters.push(a);
  a = a.children;
  for (var b = 0;b < a.length;++b) {
    this.update_recursively(a[b]);
  }
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"ces_render_system", extend:gb.ces_base_system, constants:{shadow_color_uniform:"u_shadow_color", light_mask_vs_flag_uniform:"u_mask_flag_vs", light_mask_fs_flag_uniform:"u_mask_flag_fs", shadow_color_for_casters:new gb.vec4(1), shadow_color_for_receivers:new gb.vec4(0, 0, 0, .75)}, init:function() {
  this.m_render_pipeline = new gb.render_pipeline;
  this.m_type = gb.ces_base_system.type.render;
  Object.defineProperty(this, "render_pipeline", {get:function() {
    return this.m_render_pipeline;
  }});
  this.m_screed_quad_mesh = gb.mesh_constructor.create_screen_quad();
}, release:function() {
  this.m_screed_quad_mesh.release();
  this.m_render_pipeline.release();
}, methods:{on_feed_start:function() {
  this.m_render_pipeline.on_draw_begin();
}, on_feed:function(a) {
  for (var b = this.m_render_pipeline.ws_render_techniques, c = 0;c < b.length;++c) {
    var d = b[c], e = d.name;
    d.bind();
    for (var f = 0;f < d.num_passes;++f) {
      this.draw_recursively_lights(a, e, f), this.draw_recursively(a, e, f);
    }
    d.unbind();
  }
}, on_feed_end:function() {
  this.m_render_pipeline.on_draw_end();
}, draw_recursively:function(a, b, c) {
  var d = a.get_component(gb.ces_base_component.type.scene);
  if (d) {
    var e = a.get_component(gb.ces_base_component.type.light), f = a.get_component(gb.ces_base_component.type.transformation), g = a.get_component(gb.ces_base_component.type.material), h = a.get_component(gb.ces_base_component.type.geometry);
    !e && g && h && f && (e = g.get_material(b, c), h = h.mesh, e && e.shader && e.shader.is_commited && h && a.visible && (e.set_custom_shader_uniform(gb.ces_render_system.shadow_color_for_casters, gb.ces_render_system.shadow_color_uniform), g.bind(b, c, e), e.shader.set_mat4(d.camera.matrix_p, gb.shader.uniform_type.mat_p), e.shader.set_mat4(d.camera.matrix_v, gb.shader.uniform_type.mat_v), d = gb.ces_transformation_component.get_absolute_transformation(a, !0), e.shader.set_mat4(d, gb.shader.uniform_type.mat_m), 
    h.bind(e.shader.attributes), h.draw(), h.unbind(e.shader.attributes), g.unbind(b, c, e)));
    a = a.children;
    for (g = 0;g < a.length;++g) {
      this.draw_recursively(a[g], b, c);
    }
  }
}, draw_recursively_lights:function(a, b, c) {
  var d = a.get_component(gb.ces_base_component.type.scene);
  if (d) {
    var e = a.get_component(gb.ces_base_component.type.light), f = a.get_component(gb.ces_base_component.type.light_mask), g = a.get_component(gb.ces_base_component.type.transformation), h = a.get_component(gb.ces_base_component.type.material), k = a.get_component(gb.ces_base_component.type.geometry);
    if (e && h && k && g) {
      var m = h.get_material(b, c), n = k.mesh, t = f.mesh;
      m && a.visible && m.shader && m.shader.is_commited && n && t && (function() {
        gl.colorMask(!1, !1, !1, !1);
        gl.depthMask(!1);
        m.stencil_function = gl.ALWAYS;
        m.stencil_function_parameter_1 = 1;
        m.stencil_function_parameter_2 = 255;
        m.stencil_mask_parameter = 1;
        m.set_custom_shader_uniform(0, gb.ces_render_system.light_mask_vs_flag_uniform);
        m.set_custom_shader_uniform(1, gb.ces_render_system.light_mask_fs_flag_uniform);
        h.bind(b, c, m);
        m.shader.set_mat4(d.camera.matrix_p, gb.shader.uniform_type.mat_p);
        m.shader.set_mat4(d.camera.matrix_v, gb.shader.uniform_type.mat_v);
        m.shader.set_mat4((new gb.mat4).identity(), gb.shader.uniform_type.mat_m);
        t.bind(m.shader.attributes);
        t.draw();
        t.unbind(m.shader.attributes);
        for (var a = e.shadow_casters, f = 0;f < a.length;++f) {
          var g = a[f], k = g.get_component(gb.ces_base_component.type.geometry);
          g.get_component(gb.ces_base_component.type.material).get_material(b, c) && (k = k.mesh, g = gb.ces_transformation_component.get_absolute_transformation(g, !1), m.shader.set_mat4(g, gb.shader.uniform_type.mat_m), k.bind(m.shader.attributes), k.draw(), k.unbind(m.shader.attributes));
        }
        gl.colorMask(!0, !0, !0, !0);
        gl.depthMask(!0);
        h.unbind(b, c, m);
      }(), function() {
        var d = gb.ces_transformation_component.get_absolute_transformation(a, !0);
        m.stencil_function = gl.EQUAL;
        m.stencil_function_parameter_1 = 1;
        m.stencil_function_parameter_2 = 255;
        m.stencil_mask_parameter = 0;
        m.blending_function_source = gl.SRC_ALPHA;
        m.blending_function_destination = gl.ONE;
        m.set_custom_shader_uniform(0, gb.ces_render_system.light_mask_vs_flag_uniform);
        m.set_custom_shader_uniform(0, gb.ces_render_system.light_mask_fs_flag_uniform);
        h.bind(b, c, m);
        m.shader.set_mat4(d, gb.shader.uniform_type.mat_m);
        n.bind(m.shader.attributes);
        n.draw();
        n.unbind(m.shader.attributes);
        h.unbind(b, c, m);
      }(), gl.colorMask(!1, !1, !1, !1), gl.depthMask(!1), m.stencil_function = gl.ALWAYS, m.stencil_function_parameter_1 = 0, m.stencil_function_parameter_2 = 255, m.stencil_mask_parameter = 1, m.set_custom_shader_uniform(1, gb.ces_render_system.light_mask_vs_flag_uniform), m.set_custom_shader_uniform(1, gb.ces_render_system.light_mask_fs_flag_uniform), h.bind(b, c, m), m.shader.set_mat4((new gb.mat4).identity(), gb.shader.uniform_type.mat_m), this.m_screed_quad_mesh.bind(m.shader.attributes), this.m_screed_quad_mesh.draw(), 
      this.m_screed_quad_mesh.unbind(m.shader.attributes), gl.colorMask(!0, !0, !0, !0), gl.depthMask(!0), h.unbind(b, c, m));
    }
    f = a.children;
    for (g = 0;g < f.length;++g) {
      this.draw_recursively_lights(f[g], b, c);
    }
  }
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"ces_touches_system", extend:gb.ces_base_system, init:function() {
  this.m_type = gb.ces_base_system.type.touches_recognize;
  this.m_events = [];
  this.m_captured_entities = [];
}, release:function() {
}, methods:{on_feed_start:function() {
}, on_feed:function(a) {
  for (;0 !== this.m_events.length;) {
    var b = this.m_events.pop(), c = this.intersected_entity(a, b.state, b.point);
    if (b.state === gb.input_context.state.released) {
      for (var d = this.m_captured_entities.length, e = 0;e < d;++e) {
        for (var f = this.m_captured_entities[e], g = f.get_component(gb.ces_base_component.type.touch_recognize), g = g.get_callbacks(b.state), h = g.length, k = 0;k < h;++k) {
          var m = g[k].callback;
          m(f, b.state, b.point, g[k].userdata);
        }
      }
      this.m_captured_entities = [];
    }
    if (c) {
      for (b.state === gb.input_context.state.pressed && (d = this.m_captured_entities.findIndex(function(a) {
        return a === c;
      }), -1 === d && this.m_captured_entities.push(c)), g = c.get_component(gb.ces_base_component.type.touch_recognize), g = g.get_callbacks(b.state), h = g.length, e = 0;e < h;++e) {
        m = g[e].callback, d = this.m_captured_entities.findIndex(function(a) {
          return a === c;
        }), -1 !== d && m(c, b.state, b.point, g[e].userdata);
      }
    }
    if (b.state === gb.input_context.state.dragged) {
      for (d = this.m_captured_entities.length, e = 0;e < d;++e) {
        for (f = this.m_captured_entities[e], g = f.get_component(gb.ces_base_component.type.touch_recognize), g = g.get_callbacks(b.state), h = g.length, k = 0;k < h;++k) {
          m = g[k].callback, m(f, b.state, b.point, g[k].userdata);
        }
      }
    }
  }
}, on_feed_end:function() {
}, intersected_entity:function(a, b, c) {
  for (var d = null, e = a.children, f = e.length, g = null, h = 0;h < f;++h) {
    g = e[h], (g = this.intersected_entity(g, b, c)) && (d = g);
  }
  (e = a.get_component(gb.ces_base_component.type.touch_recognize)) && !d && e.is_respond_to(b) && a.visible && (f = a.get_component(gb.ces_base_component.type.scene), b = gb.ces_transformation_component.get_absolute_transformation(a, !1), b = gb.mat4.multiply(b, f.camera.matrix_v), f = gb.mat4.multiply_vec2(e.min_bound, b), b = gb.mat4.multiply_vec2(e.max_bound, b), gb.math.intersect_min_max_bound(f, b, c) && (d = a));
  return d;
}, on_mouse_pressed:function(a) {
  this.m_events.push({state:gb.input_context.state.pressed, point:a});
}, on_mouse_released:function(a) {
  this.m_events.push({state:gb.input_context.state.released, point:a});
}, on_mouse_moved:function(a, b) {
  this.m_events.push({state:gb.input_context.state.moved, point:a});
}, on_mouse_dragged:function(a, b) {
  this.m_events.push({state:gb.input_context.state.dragged, point:a});
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"ces_animation_system", extend:gb.ces_base_system, init:function() {
  this.m_type = gb.ces_base_system.type.animation;
}, release:function() {
}, methods:{on_feed_start:function() {
}, on_feed:function(a, b) {
  this.update_recursively(a, b);
}, on_feed_end:function() {
}, update_recursively:function(a, b) {
  var c = a.get_component(gb.ces_base_component.type.geometry), d = a.get_component(gb.ces_base_component.type.animation);
  if (c && d && (d.current_switch_frame_deltatime -= b, 0 > d.current_switch_frame_deltatime)) {
    var e = d.frames, f = (d.current_frame + 1) % e.length;
    d.current_switch_frame_deltatime = d.switch_frame_deltatime;
    e && (d.current_frame = f, d = e[d.current_frame], c.update_mesh_texcoord_attributes(d.u_0, d.v_0, d.u_1, d.v_1));
  }
  c = a.children;
  for (d = 0;d < c.length;++d) {
    this.update_recursively(c[d], b);
  }
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"ces_box2d_system", extend:gb.ces_base_system, init:function() {
  this.m_type = gb.ces_base_system.type.box2d;
}, release:function() {
}, methods:{on_feed_start:function() {
}, on_feed:function(a, b) {
  var c = a.get_component(gb.ces_base_component.type.box2d_world);
  c && (c.box2d_world.Step(b, 1, 1), this.update_recursively(a));
}, on_feed_end:function() {
}, update_recursively:function(a) {
  var b = a.get_component(gb.ces_base_component.type.box2d_body);
  if (b) {
    var c = new gb.vec2(b.box2d_body.GetPosition().get_x(), b.box2d_body.GetPosition().get_y());
    b.on_position_changed(c);
    b.on_rotation_changed(b.box2d_body.GetAngle());
    a.get_component(gb.ces_base_component.type.transformation).position = b.position;
  }
  a = a.children;
  for (b = 0;b < a.length;++b) {
    this.update_recursively(a[b]);
  }
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"ces_action_system", extend:gb.ces_base_system, init:function() {
  this.m_type = gb.ces_base_system.type.action;
}, release:function() {
}, methods:{on_feed_start:function() {
}, on_feed:function(a, b) {
  this.update_recursively(a, b);
}, on_feed_end:function() {
}, update_recursively:function(a, b) {
  var c = a.get_component(gb.ces_base_component.type.action);
  c && c.action && c.action(a, b);
  for (var c = a.children, d = 0;d < c.length;++d) {
    this.update_recursively(c[d], b);
  }
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"ces_systems_feeder", init:function() {
  this.m_systems = [];
  this.m_root = null;
  Object.defineProperty(this, "root", {set:function(a) {
    this.m_root = a;
  }});
}, release:function() {
}, methods:{on_update:function(a) {
  for (var b = 0;b < this.m_systems.length;++b) {
    var c = this.m_systems[b];
    c.on_feed_start(a);
  }
  for (b = 0;b < this.m_systems.length;++b) {
    c = this.m_systems[b], c.on_feed(this.m_root, a);
  }
  for (b = 0;b < this.m_systems.length;++b) {
    c = this.m_systems[b], c.on_feed_end(a);
  }
}, add_system:function(a) {
  this.remove_system(a.type);
  this.m_systems.push(a);
  this.m_systems.sort(function(a, c) {
    return a.priority - c.priority;
  });
}, remove_system:function(a) {
  var b = this.m_systems.findIndex(function(b) {
    return b.type === a;
  });
  -1 !== b && this.m_systems.splice(b, 1);
}, remove_systems:function() {
  this.m_systems = [];
}, deallock_systems:function() {
  for (var a = this.m_systems.length, b = 0;b < a;++b) {
    this.m_systems[b].release();
  }
  this.remove_systems();
}, get_system:function(a) {
  var b = null, c = this.m_systems.findIndex(function(b) {
    return b.type === a;
  });
  -1 !== c && (b = this.m_systems[c]);
  return b;
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"camera", init:function(a, b) {
  this.m_screen_width = a;
  this.m_screen_height = b;
  this.m_position = new gb.vec2(0);
  this.m_rotation = 0;
  this.m_scale = new gb.vec2(1);
  this.m_matrix_t = (new gb.mat4).identity();
  this.m_matrix_r = (new gb.mat4).identity();
  this.m_matrix_s = (new gb.mat4).identity();
  this.m_matrix_v = (new gb.mat4).identity();
  this.m_matrix_p = (new gb.mat4).ortho(0, a, b, 0, -1, 1);
  this.m_is_matrix_m_computed = !1;
  Object.defineProperty(this, "position", {set:function(a) {
    this.m_position = a;
    this.m_matrix_t.translate(this.m_position.x, this.m_position.y, 0);
    this.m_is_matrix_m_computed = !1;
  }, get:function() {
    return this.m_position;
  }});
  Object.defineProperty(this, "rotation", {set:function(a) {
    this.m_rotation = a;
    this.m_matrix_r.rotate_z(this.m_rotation);
    this.m_is_matrix_m_computed = !1;
  }, get:function() {
    return this.m_rotation;
  }});
  Object.defineProperty(this, "zoom", {set:function(a) {
    this.m_scale = a;
    this.m_matrix_s.scale(this.m_scale.x, this.m_scale.y, 1);
    this.m_is_matrix_m_computed = !1;
  }, get:function() {
    return this.m_scale;
  }});
  Object.defineProperty(this, "matrix_v", {get:function() {
    this.m_is_matrix_m_computed || (this.m_matrix_v = gb.mat4.multiply(gb.mat4.multiply(this.m_matrix_t, this.m_matrix_r), this.m_matrix_s));
    return this.m_matrix_v;
  }});
  Object.defineProperty(this, "matrix_p", {get:function() {
    return this.m_matrix_p;
  }});
  this.position = new gb.vec2(0);
  this.rotation = 0;
  this.zoom = new gb.vec2(1);
}, release:function() {
}, methods:{}, static_methods:{}});
oop.define_class({namespace:"gb", name:"game_object", extend:gb.ces_entity, init:function() {
  var a = new gb.ces_transformation_component;
  this.add_component(a);
  Object.defineProperty(this, "position", {configurable:!0, set:function(a) {
    this.get_component(gb.ces_base_component.type.transformation).position = a;
  }, get:function() {
    return this.get_component(gb.ces_base_component.type.transformation).position;
  }});
  Object.defineProperty(this, "rotation", {set:function(a) {
    this.get_component(gb.ces_base_component.type.transformation).rotation = a;
  }, get:function() {
    return this.get_component(gb.ces_base_component.type.transformation).rotation;
  }});
  Object.defineProperty(this, "scale", {set:function(a) {
    this.get_component(gb.ces_base_component.type.transformation).scale = a;
  }, get:function() {
    return this.get_component(gb.ces_base_component.type.transformation).scale;
  }});
  Object.defineProperty(this, "size", {configurable:!0, set:function(a) {
    this.get_component(gb.ces_base_component.type.transformation).scale = a;
  }, get:function() {
    return this.get_component(gb.ces_base_component.type.transformation).scale;
  }});
  this.m_bound = new gb.vec4(0);
  Object.defineProperty(this, "bound", {configurable:!0, get:function() {
    return this.m_bound;
  }});
}, release:function() {
}, methods:{}, static_methods:{}});
oop.define_class({namespace:"gb", name:"scene_graph", extend:gb.ces_entity, init:function(a) {
  this.m_fabricator = this.m_camera = null;
  this.m_transition = a;
  a = new gb.ces_transformation_component;
  this.add_component(a);
  a = new gb.ces_scene_component;
  a.scene = this;
  this.add_component(a);
  Object.defineProperty(this, "camera", {set:function(a) {
    this.m_camera = a;
  }, get:function() {
    return this.m_camera;
  }});
  Object.defineProperty(this, "fabricator", {set:function(a) {
    this.m_fabricator = a;
  }, get:function() {
    return this.m_fabricator;
  }});
  Object.defineProperty(this, "transition", {get:function() {
    return this.m_transition;
  }});
}, release:function() {
}, methods:{set_box2d_world:function(a, b) {
  var c = this.get_component(gb.ces_base_component.type.box2d_world);
  c || (c = new gb.ces_box2d_world_component, this.add_component(c));
  c.set_bounds(a, b);
}, add_box2d_body:function(a) {
  var b = this.get_component(gb.ces_base_component.type.box2d_world), c = a.get_component(gb.ces_base_component.type.box2d_body);
  if (b && !c) {
    var c = new gb.ces_box2d_body_component, d = a.get_component(gb.ces_base_component.type.transformation), e = c.box2d_definition;
    e.set_type(Box2D.b2_dynamicBody);
    e.set_position(new Box2D.b2Vec2(d.position.x + .5 * a.size.x, d.position.y + .5 * a.size.y));
    e.userData = a;
    d = new Box2D.b2PolygonShape;
    e = [];
    e.push(new Box2D.b2Vec2(0, 0));
    e.push(new Box2D.b2Vec2(a.size.x, 0));
    e.push(new Box2D.b2Vec2(a.size.x, a.size.y));
    e.push(new Box2D.b2Vec2(0, a.size.y));
    d.SetAsBox(.5 * a.size.x, .5 * a.size.y);
    b = b.box2d_world.CreateBody(c.box2d_definition);
    b.CreateFixture(d, 1);
    c.box2d_body = b;
    a.add_component(c);
  }
}, remove_box2d_body:function(a) {
  var b = this.get_component(gb.ces_base_component.type.box2d_world), c = a.get_component(gb.ces_base_component.type.box2d_body);
  b && c && (b.box2d_world.DestroyBody(c.box2d_body), a.remove_component(gb.ces_base_component.type.box2d_body));
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"light_source", extend:gb.game_object, constants:{radius_uniform:"u_radius", center_uniform:"u_center", color_uniform:"u_color"}, init:function() {
  var a = new gb.ces_material_component;
  this.add_component(a);
  a = new gb.ces_geometry_freeform_component;
  a.mesh = gb.mesh_constructor.create_circle();
  this.add_component(a);
  a = new gb.ces_light_component;
  this.add_component(a);
  a = new gb.ces_light_mask_component;
  this.add_component(a);
  this.m_radius = 1;
  this.m_color = new gb.vec4(0);
  Object.defineProperty(this, "radius", {get:function() {
    return this.m_radius;
  }, set:function(a) {
    this.m_radius = a;
    this.get_component(gb.ces_base_component.type.transformation).scale = new gb.vec2(this.m_radius);
    this.get_component(gb.ces_base_component.type.material).set_custom_shader_uniform(this.m_radius, gb.light_source.radius_uniform);
  }});
  Object.defineProperty(this, "color", {get:function() {
    return this.m_color;
  }, set:function(a) {
    this.m_color = a;
    this.get_component(gb.ces_base_component.type.material).set_custom_shader_uniform(this.m_color, gb.light_source.color_uniform);
  }});
}, release:function() {
}, methods:{}, static_methods:{}});
oop.define_class({namespace:"gb", name:"sprite", extend:gb.game_object, init:function() {
  var a = new gb.ces_material_component;
  this.add_component(a);
  a = new gb.ces_geometry_quad_component;
  this.add_component(a);
  Object.defineProperty(this, "size", {get:function() {
    var a = this.get_component(gb.ces_base_component.type.geometry);
    return a instanceof gb.ces_geometry_quad_component ? a.size : this.get_component(gb.ces_base_component.type.transformation).scale;
  }, set:function(a) {
    var c = this.get_component(gb.ces_base_component.type.geometry);
    c instanceof gb.ces_geometry_quad_component ? c.size = a : this.get_component(gb.ces_base_component.type.transformation).scale = a;
    var d = this.get_component(gb.ces_base_component.type.touch_recognize);
    d && (a = new gb.vec4(-a.x * (1 - c.pivot.x), -a.y * (1 - c.pivot.y), a.x * c.pivot.x, a.y * c.pivot.y), d.bound = a);
  }});
  Object.defineProperty(this, "pivot", {get:function() {
    return this.get_component(gb.ces_base_component.type.geometry).pivot;
  }, set:function(a) {
    this.get_component(gb.ces_base_component.type.geometry).pivot = a;
  }});
  Object.defineProperty(this, "cast_shadow", {get:function() {
    return this.is_component_exist(gb.ces_base_component.type.convex_hull);
  }, set:function(a) {
    if (a) {
      a = this.get_component(gb.ces_base_component.type.geometry);
      var c = new gb.ces_convex_hull_component;
      c.generate_convex_hull(a.mesh.vbo.to_vertices_positions());
      this.add_component(c);
    } else {
      this.remove_component(gb.ces_base_component.type.convex_hull);
    }
  }});
  Object.defineProperty(this, "is_touchable", {get:function() {
    return this.get_component(gb.ces_base_component.type.touch_recognize) ? !0 : !1;
  }, set:function(a) {
    if (a) {
      if (!this.get_component(gb.ces_base_component.type.touch_recognize)) {
        a = new gb.ces_touch_recognize_component;
        var c = this.size;
        a.bound = new gb.vec4(0, 0, c.x, c.y);
        a.enable(gb.input_context.state.pressed, !0);
        a.enable(gb.input_context.state.released, !0);
        a.enable(gb.input_context.state.dragged, !0);
        this.add_component(a);
      }
    } else {
      this.remove_component(gb.ces_base_component.type.touch_recognize);
    }
  }});
  Object.defineProperty(this, "bound", {configurable:!0, get:function() {
    this.m_bound.x = 0;
    this.m_bound.y = 0;
    this.m_bound.z = 0;
    this.m_bound.w = 0;
    var a = this.get_component(gb.ces_base_component.type.geometry);
    if (a.mesh) {
      var c = this.get_component(gb.ces_base_component.type.transformation), d = gb.mat4.multiply_vec2(a.mesh.vbo.min_bound, c.matrix_m), a = gb.mat4.multiply_vec2(a.mesh.vbo.max_bound, c.matrix_m);
      d.sub(c.position);
      a.sub(c.position);
      this.m_bound.x = d.x;
      this.m_bound.y = d.y;
      this.m_bound.z = a.x;
      this.m_bound.w = a.y;
    }
    return this.m_bound;
  }});
}, release:function() {
}, methods:{add_animation:function(a, b) {
  var c = this.get_component(gb.ces_base_component.type.animation);
  c || (c = new gb.ces_animation_component, this.add_component(c));
  c.add_animation(a, b);
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"grid", extend:gb.game_object, constants:{color_uniform:"u_color"}, init:function() {
  var a = new gb.ces_material_component;
  this.add_component(a);
  a = new gb.ces_geometry_freeform_component;
  this.add_component(a);
  this.m_color = new gb.vec4(0, 1, 0, 1);
  Object.defineProperty(this, "color", {get:function() {
    return this.m_color;
  }, set:function(a) {
    this.m_color = a;
    this.get_component(gb.ces_base_component.type.material).set_custom_shader_uniform(this.m_color, gb.grid.color_uniform);
  }});
  Object.defineProperty(this, "bound", {configurable:!0, get:function() {
    this.m_bound.x = 0;
    this.m_bound.y = 0;
    this.m_bound.z = 0;
    this.m_bound.w = 0;
    var a = this.get_component(gb.ces_base_component.type.geometry);
    if (a.mesh) {
      var c = this.get_component(gb.ces_base_component.type.transformation), d = gb.mat4.multiply_vec2(a.mesh.vbo.min_bound, c.matrix_m), a = gb.mat4.multiply_vec2(a.mesh.vbo.max_bound, c.matrix_m);
      d.sub(c.position);
      a.sub(c.position);
      this.m_bound.x = d.x;
      this.m_bound.y = d.y;
      this.m_bound.z = a.x;
      this.m_bound.w = a.y;
    }
    return this.m_bound;
  }});
}, release:function() {
}, methods:{}, static_methods:{}});
oop.define_class({namespace:"gb", name:"scene_fabricator", init:function() {
  this.m_game_objects = [];
  this.m_resources_accessor = this.m_configurations_accessor = null;
  Object.defineProperty(this, "configurations_accessor", {set:function(a) {
    this.m_configurations_accessor = a;
  }, get:function() {
    return this.m_configurations_accessor;
  }});
  Object.defineProperty(this, "resources_accessor", {set:function(a) {
    this.m_resources_accessor = a;
  }, get:function() {
    return this.m_resources_accessor;
  }});
}, release:function() {
}, methods:{add_materials:function(a, b) {
  for (var c = 0;c < b.length;++c) {
    var d = b[c], e = gb.material.construct(d);
    gb.material.set_shader(e, d, this.m_resources_accessor);
    gb.material.set_textures(e, d, this.m_resources_accessor);
    gb.ces_material_component.add_material(a, d.technique_name, d.technique_pass, e);
  }
}, create_sprite:function(a, b) {
  var c = new gb.sprite;
  this.m_game_objects.push(c);
  var d = this;
  this.m_configurations_accessor.get_sprite_configuration(a, function(a) {
    d.add_materials(c, a.materials_configurations);
    b && b(c);
  });
  return c;
}, create_light_source:function(a, b) {
  var c = new gb.light_source;
  this.m_game_objects.push(c);
  var d = this;
  this.m_configurations_accessor.get_sprite_configuration(a, function(a) {
    d.add_materials(c, a.materials_configurations);
    b && b();
  });
  return c;
}, create_grid:function(a, b, c, d, e, f) {
  var g = new gb.grid;
  this.m_game_objects.push(g);
  g.get_component(gb.ces_base_component.type.geometry).mesh = gb.mesh_constructor.create_grid(b, c, d, e);
  c = g.bound;
  b = [];
  b.push(new gb.vec2(c.x, c.y));
  b.push(new gb.vec2(c.z, c.y));
  b.push(new gb.vec2(c.z, c.w));
  b.push(new gb.vec2(c.x, c.w));
  c = new gb.ces_convex_hull_component;
  c.generate_convex_hull(b);
  g.add_component(c);
  var h = this;
  this.m_configurations_accessor.get_sprite_configuration(a, function(a) {
    h.add_materials(g, a.materials_configurations);
    f && f();
  });
  return g;
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"game_loop", init:function() {
  this.m_listeners = [];
  this.m_previous_timestamp = Date.now();
}, release:function() {
}, methods:{on_update:function() {
  for (var a = Date.now(), b = (a - this.m_previous_timestamp) / 1E3, c = this.m_listeners.length, d = null, e = 0;e < c;++e) {
    d = this.m_listeners[e], d.on_update(b);
  }
  this.m_previous_timestamp = a;
}, add_listener:function(a) {
  _.isFunction(a.on_update) ? _.contains(this.m_listeners, a) ? console.error("can't add same listener for game loop") : this.m_listeners.push(a) : console.error("game loop listener doesn't contain on_update method");
}, remove_listener:function(a) {
  a = _.indexOf(this.m_listeners, a);
  -1 !== a ? this.m_listeners.splice(a, 1) : console.error("game loop doesn't contain this listener");
}}, static_methods:{}});
var g_game_loop = null, game_loop = function(a) {
  function b() {
    g_game_loop.on_update();
    g_game_loop.attach_to_runloop()(b);
  }
  function c() {
    g_game_loop = new gb.game_loop;
    g_game_loop.attach_to_runloop = function() {
      return a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame || function(b) {
        a.setTimeout(b, 1E3 / 60);
      };
    };
    return g_game_loop;
  }
  return {get_instance:function() {
    g_game_loop || (g_game_loop = c(), b());
    return g_game_loop;
  }};
}(window), loop = function() {
  return game_loop.get_instance();
}();
oop.define_class({namespace:"gb", name:"game_transition", init:function(a) {
  this.m_guid = a;
  this.m_resources_accessor = this.m_configurations_accessor = null;
  this.m_systems_feeder = new gb.ces_systems_feeder;
  this.m_scene = this.m_input_context = null;
  Object.defineProperty(this, "guid", {get:function() {
    return this.m_guid;
  }});
}, release:function() {
}, methods:{on_activated:function(a, b, c, d) {
  this.m_input_context = a;
  this.m_configurations_accessor = b;
  this.m_resources_accessor = c;
  var e = new gb.ces_render_system, f = e.render_pipeline, g = this;
  this.m_configurations_accessor.get_transition_configuration(this.m_guid, function(a) {
    if (null !== a.ws_techniques_configurations) {
      for (var b = 0;b < a.ws_techniques_configurations.length;++b) {
        var c = a.ws_techniques_configurations[b], n = Math.min(gl.viewport_width, c.screen_width), t = Math.min(gl.viewport_height, c.screen_height), n = new gb.render_technique_ws(n, t, c.technique_name, c.index, c.num_passes), t = new gb.vec4(c.clear_color_r, c.clear_color_g, c.clear_color_b, c.clear_color_a);
        n.clear_color = t;
        f.add_ws_render_technique(c.technique_name, c.index, n);
        g.m_resources_accessor.add_custom_resource(c.technique_name + ".color", n.color_attachment_texture);
        g.m_resources_accessor.add_custom_resource(c.technique_name + ".depth", n.depth_attachment_texture);
      }
    }
    if (null !== a.ss_techniques_configurations) {
      for (b = 0;b < a.ss_techniques_configurations.length;++b) {
        var c = a.ss_techniques_configurations[b], n = c.material_configuration, q = gb.material.construct(n);
        gb.material.set_shader(q, n, g.m_resources_accessor);
        gb.material.set_textures(q, n, g.m_resources_accessor);
        n = Math.min(gl.viewport_width, c.screen_width);
        t = Math.min(gl.viewport_height, c.screen_height);
        n = new gb.render_technique_ss(n, t, c.technique_name, 0, q);
        f.add_ss_render_technique(c.technique_name, n);
        g.m_resources_accessor.add_custom_resource(c.technique_name + ".color", n.color_attachment_texture);
      }
    }
    n = a.main_technique_configuration.material_configuration;
    q = gb.material.construct(n);
    gb.material.set_shader(q, n, g.m_resources_accessor);
    gb.material.set_textures(q, n, g.m_resources_accessor);
    f.create_main_render_technique(q);
    a = new gb.scene_fabricator;
    a.configurations_accessor = g.m_configurations_accessor;
    a.resources_accessor = g.m_resources_accessor;
    g.m_scene = new gb.scene_graph(g);
    g.m_scene.fabricator = a;
    d(g.m_scene);
    g.m_systems_feeder.root = g.m_scene;
    g.m_systems_feeder.add_system(e);
    a = new gb.ces_deferred_lighting_system;
    g.m_systems_feeder.add_system(a);
    a = new gb.ces_animation_system;
    g.m_systems_feeder.add_system(a);
    a = new gb.ces_touches_system;
    g.m_input_context.add_listener(a);
    g.m_systems_feeder.add_system(a);
    a = new gb.ces_box2d_system;
    g.m_systems_feeder.add_system(a);
    a = new gb.ces_action_system;
    g.m_systems_feeder.add_system(a);
    loop.add_listener(g.m_systems_feeder);
  });
}, on_deactivated:function() {
  var a = this.m_systems_feeder.get_system(gb.ces_base_system.type.touches_recognize);
  this.m_input_context.remove_listener(a);
  this.m_systems_feeder.deallock_systems();
  loop.remove_listener(this.m_systems_feeder);
}, get_ws_technique_result_as_image:function(a, b, c, d) {
  return this.m_systems_feeder.get_system(gb.ces_base_system.type.render).render_pipeline.get_ws_technique_result_as_image(a, b, c, d);
}}, static_methods:{}});
var g_game_controller = null;
oop.define_class({namespace:"gb", name:"game_controller", init:function() {
  this.m_current_transition = null;
  this.m_transitions = [];
  this.resource_accessor = new gb.resource_accessor;
  this.configuration_accessor = new gb.configuration_accessor;
  this.m_input_context = new gb.input_context;
}, release:function() {
}, methods:{add_transition:function(a) {
  -1 === this.m_transitions.findIndex(function(b) {
    return b.guid === a.guid;
  }) ? this.m_transitions.push(a) : console.warn("can't add same transition");
}, remove_transition:function(a) {
  var b = this.m_transitions.findIndex(function(b) {
    return b.guid === a.guid;
  });
  -1 !== b && this.m_transitions.splice(b, 1);
}, goto_transition:function(a, b) {
  var c = this.m_transitions.findIndex(function(b) {
    return b.guid === a;
  });
  if (-1 !== c) {
    if (this.m_current_transition) {
      this.m_current_transition.on_deactivated();
    }
    this.m_current_transition = this.m_transitions[c];
    this.m_current_transition.on_activated(this.m_input_context, this.configuration_accessor, this.resource_accessor, b);
  }
}}, static_methods:{get_instance:function() {
  g_game_controller || (g_game_controller = new gb.game_controller);
  return g_game_controller;
}}});
oop.define_class({namespace:"gb", name:"frames_container", init:function() {
  this.reset();
}, release:function() {
}, methods:{get_frame_parameters:function(a, b) {
  var c = this.m_chunks.findIndex(function(c) {
    return c.width >= a && c.height >= b;
  });
  if (-1 !== c) {
    var d = this.m_chunks[c], e = {x:d.x, y:d.y, width:a, height:b}, f = [];
    f.push({x:e.x + e.width, y:e.y, width:d.width - e.width, height:e.height});
    f.push({x:e.x, y:e.y + e.height, width:e.width, height:d.height - e.height});
    f.push({x:e.x + e.width, y:e.y + e.height, width:d.width - e.width, height:d.height - e.height});
    this.m_chunks.splice(c, 1);
    this.m_chunks.push(f[0]);
    this.m_chunks.push(f[1]);
    this.m_chunks.push(f[2]);
    return e;
  }
  console.log(this.m_chunks);
  return null;
}, reset:function() {
  this.m_chunks = [];
  this.m_chunks.push({x:0, y:0, width:1024, height:1024});
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"max_rects_pack_algorithm", constants:{heuristic:{none:0, TL:1, BAF:2, BSSF:3, BLSF:4, MINW:5, MINH:6}}, init:function() {
  this.m_free_nodes_container = [];
  this.m_occupied_nodes_container = [];
  this.m_heuristic = 0;
  Object.defineProperty(this, "heuristic", {get:function() {
    return this.m_heuristic;
  }, set:function(a) {
    this.m_heuristic = a;
  }});
  this.m_atlas_width = 0;
  Object.defineProperty(this, "atlas_width", {get:function() {
    return this.m_atlas_width;
  }, set:function(a) {
    this.m_atlas_width = a;
  }});
  this.m_atlas_height = 0;
  Object.defineProperty(this, "atlas_height", {get:function() {
    return this.m_atlas_height;
  }, set:function(a) {
    this.m_atlas_height = a;
  }});
  this.m_is_rotation_enabled = !1;
  Object.defineProperty(this, "is_rotation_enabled", {get:function() {
    return this.m_is_rotation_enabled;
  }, set:function(a) {
    this.m_is_rotation_enabled = a;
  }});
}, release:function() {
}, methods:{add_sprite:function(a, b) {
  b || (console.warn("atlas page undefined"), b = 0);
  console.warn("try to add sprite in atlas page: " + b);
  this.m_free_nodes_container[b] || (this.m_free_nodes_container[b] = [], this.m_free_nodes_container[b].push(new gb.vec4(0, 0, this.m_atlas_width, this.m_atlas_height)), console.warn("new atlas page created with index: " + b));
  var c = this.m_free_nodes_container[b];
  this.m_occupied_nodes_container[b] || (this.m_occupied_nodes_container[b] = []);
  for (var d = this.m_occupied_nodes_container[b], e = !1, f = !1, g = !1, h = !1, k = !1, m = !1, n = 0, t = this.m_atlas_width * this.m_atlas_height + 1, q = -1, u = gb.max_rects_pack_algorithm.heuristic, w = c.length, r = 0;r < w;++r) {
    var l = c[r];
    if (l.z >= a.size.x && l.w >= a.size.y || l.z >= a.size.y && l.w >= a.size.x) {
      k = !1;
      n = 0;
      if (l.z >= a.size.y && l.w >= a.size.x && !(l.z >= a.size.x && l.w >= a.size.y)) {
        if (!this.m_is_rotation_enabled) {
          continue;
        }
        k = !0;
        n += a.size.y;
        console.error("implement sprite rotation");
      }
      switch(this.m_heuristic) {
        case u.none:
          q = r;
          r = w;
          continue;
        case u.TL:
          for (var n = n + l.y, h = g = !1, x = d.length, p = 0;p < x;++p) {
            var v = d[p];
            Math.abs(v.y + v.w / 2 - l.y - l.w / 2) < Math.max(v.w, l.w) / 2 && (v.x + v.z === l.x && (n -= 5, g = !0), v.x === l.x + l.z && (n -= 5, h = !0));
          }
          if (g || !h) {
            l.x + l.z === this.m_atlas_width && (--n, h = !0), 0 === l.x && (--n, g = !0);
          }
          break;
        case u.BAF:
          n += l.z * l.w;
          break;
        case u.BSSF:
          n += Math.min(l.z - a.size.x, l.w - a.size.y);
          break;
        case u.BLSF:
          n += Math.max(l.z - a.size.x, l.w - a.size.y);
          break;
        case u.MINW:
          n += l.z;
          break;
        case u.MINH:
          n += l.w;
      }
      n < t && (t = n, q = r, e = g, f = h, m = k);
      k && console.error("implement sprite rotation");
    }
  }
  m && console.error("implement sprite rotation");
  if (0 <= q) {
    r = q;
    l = c[q];
    g = new gb.vec4(l.x, l.y, a.size.x, a.size.y);
    this.m_heuristic === u.TL && (e || 0 === l.x || l.z + l.x !== this.m_atlas_width || (g.x = this.m_atlas_width - a.size.x, g.y = l.y, g.z = a.size.x, g.w = a.size.y), !e && f && (g.x = l.x + l.z - a.size.x, g.y = l.y, g.z = a.size.x, g.w = a.size.y));
    d.push(new gb.vec4(g));
    l.z > a.size.x && (p = new gb.vec4, p.x = l.x + (g.x === l.x ? a.size.x : 0), p.y = l.y, p.z = l.z - a.size.x, p.w = l.w, c.push(p));
    l.w > a.size.y && (p = new gb.vec4, p.x = l.x, p.y = l.y + a.size.y, p.z = l.z, p.w = l.w - a.size.y, c.push(p));
    c.splice(r, 1);
    for (r = 0;r < c.length;++r) {
      l = c[r], gb.math.rect_intersect(l, g) && (g.x + g.z < l.x + l.z && (p = new gb.vec4, p.x = g.x + g.z, p.y = l.y, p.z = l.x + l.z - g.x - g.z, p.w = l.w, c.push(p)), g.y + g.w < l.y + l.w && (p = new gb.vec4, p.x = l.x, p.y = g.y + g.w, p.z = l.z, p.w = l.y + l.w - g.y - g.w, c.push(p)), g.x > l.x && (p = new gb.vec4, p.x = l.x, p.y = l.y, p.z = g.x - l.x, p.w = l.w, c.push(p)), g.y > l.y && (p = new gb.vec4, p.x = l.x, p.y = l.y, p.z = l.z, p.w = g.y - l.y, c.push(p)), c.splice(r, 1), --r)
      ;
    }
    for (r = 0;r < c.length;r++) {
      for (p = r + 1;p < c.length;p++) {
        l = c[r], d = c[r], r != p && gb.math.rect_contains(l, d) && (c.splice(p, 1), --p);
      }
    }
    return {position:new gb.vec2(g.x, g.y), page:b};
  }
  return this.add_sprite(a, b + 1);
}, reset:function() {
  this.m_free_nodes_container = [];
  this.m_occupied_nodes_container = [];
}}, static_methods:{}});
var g_ss_merge_controller = null, g_ss_merge_transition = null;
oop.define_class({namespace:"gb", name:"ss_merge_controller", constants:{html_elements:{tab_container:"ss-merge-tab-container", tab_left_panel:"ss-merge-tab-left-panel", tab_right_panel:"ss-merge-tab-right-panel", import_container:"ss-merge-import-container", import_size_drop_down_box:"ss-merge-size-drop-down-box", import_size_drop_down_box_button:"ss-merge-size-drop-down-box-button", import_drop_zone:"ss-merge-drop-zone", import_add_image_button:"ss-merge-add_image-button", import_add_image_input:"ss-merge-add_image-input", 
frames_container:"ss-merge-frames-container", frames_sort_button:"ss-merge-frames-sort-button", frames_table:"ss-merge-frames-table", frames_table_cell:"ss-merge-frames-table-cell", frames_table_cell_delete_icon:"ss-merge-frames-table-cell-delete-icon", frames_table_cell_image:"ss-merge-frames-table-cell-image", editing_container:"ss-merge-editing-container", editing_page_drop_down_box:"ss-merge-editing-page-drop-down-box", editing_page_drop_down_box_button:"ss-merge-editing-page-drop-down-box-button", 
editing_move_resize_radio_button:"ss-merge-editing-move-resize-radio-button", editing_move_resize_freeform_button:"ss-merge-editing-move-resize-freeform-button", editing_move_resize_snaptogrid_button:"ss-merge-editing-move-resize-snaptogrid-button", editing_pack_algorithm_drop_down_box:"ss-merge-editing-pack-algorithm-drop-down-box", editing_pack_algorithm_drop_down_box_button:"ss-merge-editing-pack-algorithm-drop-down-box-button", editing_spread_button:"ss-merge-editing-spread-button", export_container:"ss-merge-export-container", 
export_animation_preview_button:"ss-merge-export-animation-preview_button", export_save_atlas_button:"ss-merge-export-atlas-button", export_save_pages_list:"ss-merge-export-save-pages-list", export_save_pages_list_download_button:"ss-merge-export-save-pages-list-download", export_save_frames_button:"ss-merge-export-save-frames-button", animation_preview_dialog:"ss-merge-animation-preview-dialog"}}, init:function() {
  g_ss_merge_controller = this;
  var a = gb.ss_merge_controller.ui(), b = gb.ss_merge_controller.ui_j, c = gb.ss_merge_controller.self(), d = null;
  $(b("tab_container")).append($("<div id=" + a.tab_left_panel + ' style="background:black;"/>'));
  $(b("tab_container")).append($("<div id=" + a.tab_right_panel + ' style="background:black;"/>'));
  $(b("tab_right_panel")).append($('<canvas style="width:100%; height:100%;" id="gl_canvas" width="1024" height="1024"></canvas>'));
  this.m_import_view = new gb.ss_merge_import_view(this, a, gb.ss_merge_controller.ui_j_v2);
  this.m_frames_view = new gb.ss_merge_frames_view(this, a, gb.ss_merge_controller.ui_j_v2);
  this.ui_packer(c, a, gb.ss_merge_controller.ui_j_v2);
  this.ui_export(c, a, gb.ss_merge_controller.ui_j_v2);
  d = "<div id=" + a.animation_preview_dialog + ' class="ui-dialog" title="Animation"></div>';
  $(b("tab_right_panel")).append($(d));
  $(b("animation_preview_dialog")).dialog({autoOpen:!1, width:512, height:512, modal:!0, show:{effect:"blind", duration:300}, hide:{effect:"blind", duration:300}, beforeClose:function(a, b) {
    c.m_play_animation_dialog_controller.deactivate();
    c.activate();
  }});
  $(b("tab_container")).tooltip({position:{my:"left top", at:"left+10 top+10", of:"#gl_canvas"}});
  $(b("tab_left_panel")).accordion({heightStyle:"content"});
  new gb.graphics_context;
  g_ss_merge_transition = new gb.game_transition("data/resources/configurations/transitions/transition.spritesheets.merge.json");
  gb.game_controller.get_instance().add_transition(g_ss_merge_transition);
  this.m_sprites = [];
  this.m_sprites_on_pages = [];
  this.m_current_page = 0;
  this.m_importing_images_size = 1;
  this.m_selector = this.m_grid = null;
  this.m_play_animation_dialog_controller = new gb.ss_play_animation_dialog_controller;
  this.m_merge_algorithm = new gb.max_rects_pack_algorithm;
  this.m_merge_algorithm.atlas_width = 1024;
  this.m_merge_algorithm.atlas_height = 1024;
  this.m_merge_algorithm.heuristic = gb.max_rects_pack_algorithm.heuristic.TL;
  this.m_scene = null;
  Object.defineProperty(this, "import_view", {get:function() {
    return this.m_import_view;
  }});
  Object.defineProperty(this, "frames_view", {get:function() {
    return this.m_frames_view;
  }});
  Object.defineProperty(this, "scene", {get:function() {
    return this.m_scene;
  }, set:function(a) {
    this.m_scene = a;
  }});
}, release:function() {
}, methods:{ui_packer:function(a, b, c) {
  $(c(b.tab_left_panel)).append('<h3><span class="ui-icon ui-icon-note" style="float:left; margin:2px;"></span>packer</h3><div style="background:none; border:0px;" id=' + b.editing_container + '><div style="width:95%; margin:2%; margin-top:5%"><select id=' + b.editing_page_drop_down_box + '><option selected="selected">page 1</option></select></div><div style="margin:2%;" id=' + b.editing_move_resize_radio_button + '><input type="radio" id=' + b.editing_move_resize_freeform_button + ' name="' + b.editing_move_resize_radio_button + 
  '" checked="checked"><label for=' + b.editing_move_resize_freeform_button + ' style="width:48%;">free form</label><input type="radio" id=' + b.editing_move_resize_snaptogrid_button + ' name="' + b.editing_move_resize_radio_button + '"><label for=' + b.editing_move_resize_snaptogrid_button + ' style="width:52%;">snap to grid</label></div><div title="packing algorithm" style="width:95%; margin:2%; margin-top:5%"><select id=' + b.editing_pack_algorithm_drop_down_box + '><option selected="selected">heuristic - none</option><option>heuristic - TL (top left fit)</option><option>heuristic - BAF (best area fit)</option><option>heuristic - BSSF (best short side fit)</option><option>heuristic - BLSF (best long side fit)</option><option>heuristic - MINW (min width fit)</option><option>heuristic - MINH (min height fit)</option></select></div><button id=' + 
  b.editing_spread_button + ' style="margin:2%; width:95.5%;">spread</button></div>');
  $(c(b.editing_pack_algorithm_drop_down_box)).selectmenu();
  $(c(b.editing_pack_algorithm_drop_down_box_button)).css({width:"100%"});
  $(c(b.editing_spread_button)).button();
  $(c(b.editing_page_drop_down_box)).selectmenu();
  $(c(b.editing_page_drop_down_box_button)).css({width:"100%"});
  $(c(b.editing_page_drop_down_box)).on("selectmenuselect", function(b, c) {
    a.on_page_changed(c.item.index, !0);
  });
  $(c(b.editing_move_resize_radio_button)).buttonset();
  $(c(b.editing_move_resize_radio_button) + " input[type=radio]").change(function() {
    a.m_selector.is_align_movement = this.id === b.editing_move_resize_snaptogrid_button;
  });
}, ui_export:function(a, b, c) {
  $(c(b.tab_left_panel)).append('<h3><span class="ui-icon ui-icon-note" style="float:left; margin:2px;"></span>export</h3><div style="background:none; border:0px;" id=' + b.export_container + '><button title="preview animation" id=' + b.export_animation_preview_button + ' style="margin:2%; width:95.5%;">preview</button><br><button id=' + b.export_save_atlas_button + ' style="margin:2%; width:95.5%;">create images</button><br><ul style="list-style-type:none; height:340px; overflow:auto; margin-left:-10%; margin-top:-0.5%;" id="' + 
  b.export_save_pages_list + '"/><button id=' + b.export_save_frames_button + ' style="margin:2%; margin-top:-2%; width:95.5%;">create frames configuration</button></div>');
  $(c(b.export_save_atlas_button)).button();
  $(c(b.export_save_atlas_button)).on("click", function() {
    a.set_selected_sprite(null);
    var d = a.m_sprites_on_pages.length, e = function(f) {
      a.on_page_changed(f, !0, function() {
        var g = g_ss_merge_transition.get_ws_technique_result_as_image("ws.savetoimage", 0, gl.viewport_width, gl.viewport_height), h;
        h = '<li class="ui-state-default" style="height:160px; margin:8px; background: none;">' + ('<p align="center" style="font-size:14px; float:left; margin:2px; margin-left:-0.25%; margin-top:-0.25%; height:24px; width:100%; border-color: #666;" id="page-index" class="ui-widget-header" style="margin:4px;">page_' + (f + 1) + ".png</p>");
        h += ['<img style="float:left; margin:2px; height:128px; width:128px;" id="images-list-cell-image" align="left" src="', g.src, '"/>'].join("");
        h += '<a style="margin-top:12%; margin-left:24%;" id="' + b.export_save_pages_list_download_button + f + '" href="' + g.src.replace("image/png", "image/octet-stream") + '"  download="page_' + (f + 1) + '.png">download</a>';
        h += "</li>";
        $(c(b.export_save_pages_list)).append($(h));
        $("#" + b.export_save_pages_list_download_button + f).button();
        f++;
        $(c(b.export_save_pages_list)).height(170 * Math.min(f + 1, d));
        if (f < d) {
          e(f);
        } else {
          a.on_page_changed(0, !0);
        }
      });
    };
    e(0);
  });
  $(c(b.export_save_pages_list)).height(0);
  $(c(b.export_save_pages_list)).sortable();
  $(c(b.export_save_pages_list)).disableSelection();
  $(c(b.export_save_frames_button)).button();
  $(c(b.export_animation_preview_button)).button();
  $(c(b.export_animation_preview_button)).on("click", function() {
    a.set_selected_sprite(null);
    var d = a.calculate_atlas_size();
    if (0 < d.width && 0 < d.height) {
      var e = g_ss_merge_transition.get_ws_technique_result_as_image("ws.savetoimage", 0, d.width, d.height), f = a.create_animation_configuration(d.width, d.height);
      a.deactivate();
      setTimeout(function() {
        $(c(b.animation_preview_dialog)).dialog("open");
        $(".ui-dialog :button").blur();
        a.m_play_animation_dialog_controller.activate(e, f);
      }, 1E3);
    }
  });
}, activate:function() {
  var a = gb.ss_merge_controller.self(), b = gb.ss_merge_controller.html_elements, c = $("#gl_canvas").detach();
  $("#" + b.tab_right_panel).append(c);
  gb.game_controller.get_instance().goto_transition("data/resources/configurations/transitions/transition.spritesheets.merge.json", function(b) {
    a.scene = b;
    var c = new gb.camera(gl.viewport_width, gl.viewport_height);
    b.camera = c;
    a.m_grid = b.fabricator.create_grid("data/resources/configurations/game_objects/grid.json", 32, 32, 32, 32, function() {
      a.m_grid.color = new gb.vec4(0, 1, 0, 1);
      a.m_grid.position = new gb.vec2(0, -1);
    });
    b.add_child(a.m_grid);
    c = a.m_sprites.length;
    if (0 !== c) {
      for (var f = 0;f < c;++f) {
        b.add_child(a.m_sprites[f]);
      }
    }
    a.pack_sprites();
    c = new gb.editor_fabricator;
    c.scene_fabricator = b.fabricator;
    a.m_selector = c.create_selector();
  });
}, deactivate:function() {
  var a = this.m_sprites.length;
  if (0 !== a) {
    for (var b = 0;b < a;++b) {
      this.scene.remove_child(this.m_sprites[b]);
    }
  }
  this.scene.remove_child(this.m_grid);
  this.m_grid.get_component(gb.ces_base_component.type.geometry).mesh.release();
}, on_importing_images_size_changed:function(a) {
  this.m_importing_images_size = a;
}, calculate_atlas_size:function() {
  for (var a = this.m_sprites.sort(function(a, b) {
    return b.size.x * b.size.y - a.size.x * a.size.y;
  }), b = a.length, c = 0, d = 0, e = 0;e < b;++e) {
    var f = a[e], g = f.position.x + f.size.x, f = f.position.y + f.size.y, c = g > c ? g : c, d = f > d ? f : d
  }
  return {width:Math.min(c, gl.viewport_width), height:Math.min(d, gl.viewport_height)};
}, on_images_importing:function(a) {
  for (var b = gb.ss_merge_controller.self(), c = a.length, d = 0, e = 0;e < c;++e) {
    var f = a[e];
    if (f.type.match("image.*")) {
      var g = new FileReader;
      g.m_filename = f.name;
      g.onload = function(a) {
        return function(a) {
          var e = new Image;
          e.src = a.target.result;
          e.onload = function() {
            b.scene.fabricator.resources_accessor.get_texture(a.target.m_filename, e).add_resource_loading_callback(function(e, f) {
              for (var g = b.scene.fabricator.create_sprite("data/resources/configurations/game_objects/sprite.json", function() {
                e.mag_filter = gl.LINEAR;
                e.min_filter = gl.LINEAR;
                e.wrap_mode = gl.CLAMP_TO_EDGE;
                g.get_component(gb.ces_base_component.type.material).set_texture(e, 0);
                g.size = new gb.vec2(Math.round(e.width * b.m_importing_images_size), Math.round(e.height * b.m_importing_images_size));
                b.on_sprite_added(g, 0);
                d++;
                d === c && b.pack_sprites();
              }), h = b.m_sprites.length, m = 0, r = null, l = 0;l < h;++l) {
                r = b.m_sprites[l], -1 !== r.tag.indexOf(a.target.m_filename) && m++;
              }
              h = a.target.m_filename;
              0 !== m && (h += "(" + m + ")");
              b.frames_view.add_frame(b, h, a.target.result, gb.ss_merge_controller.ui(), gb.ss_merge_controller.ui_j_v2);
              g.is_touchable = !0;
              g.get_component(gb.ces_base_component.type.touch_recognize).add_callback(gb.input_context.state.pressed, b.on_sprite_pressed, b);
              g.tag = h;
              b.scene.add_child(g);
              b.m_sprites.push(g);
            });
          };
        };
      }(f);
      g.readAsDataURL(f);
    }
  }
}, create_animation_configuration:function(a, b) {
  for (var c = [], d = this.m_sprites.sort(function(a, b) {
    return a.tag.localeCompare(b.tag, "en", {numeric:!0});
  }), e = d.length, f = null, g = null, f = null, h = 0;h < e;++h) {
    f = d[h], g = f.position, g.x -= f.size.x * f.pivot.x, g.y -= f.size.y * f.pivot.y, f = gb.vec2.add(g, f.size), c.push({u_0:g.x / a, v_0:g.y / b, u_1:f.x / a, v_1:f.y / b});
  }
  return c;
}, on_sprite_pressed:function(a, b, c, d) {
  d.set_selected_sprite(a);
}, set_selected_sprite:function(a) {
  for (var b = gb.ss_merge_controller.ui_j, c = this.m_sprites.indexOf(a), d = this.m_sprites.length, e = 0;e < d;++e) {
    e === c ? $(b("frames_list")).animate({scrollTop:170 * c}, "slow", "swing", function() {
      $(b("frames_list") + " li").eq(c).find("p").animate({backgroundColor:"#f58400"});
    }) : $(b("frames_list") + " li").eq(e).find("p").css({background:"black"});
  }
  d = null;
  this.m_selector.target && (e = this.m_selector.target, this.scene.add_child(e), e.position = this.m_selector.position, e.rotation = this.m_selector.rotation, d = e.get_component(gb.ces_base_component.type.touch_recognize), d.add_callback(gb.input_context.state.pressed, this.on_sprite_pressed, this), this.scene.add_box2d_body(e));
  a ? (this.scene.remove_box2d_body(a), this.m_selector.position = a.position, this.m_selector.rotation = a.rotation, this.m_selector.target = a, d = a.get_component(gb.ces_base_component.type.touch_recognize), d.remove_callback(gb.input_context.state.pressed, this.on_sprite_pressed), this.m_selector.bounding_quad.remove_from_parent(), this.scene.add_child(this.m_selector.bounding_quad)) : this.m_selector.target = null;
}, on_sprites_reordering:function() {
  for (var a = gb.ss_merge_controller.ui_j, b = $(a("frames_list") + " li").map(function() {
    return $(this).find("#frame-index").text();
  }), c = [], d = b.length, e = null, f = 0;f < d;++f) {
    e = this.m_sprites.find(function(a) {
      return a.tag === b[f];
    }), c.push(e);
  }
  this.m_sprites = c;
  c = this.m_sprites.length;
  $(a("frames_list")).height(0 < c ? 1 == c ? 170 : 340 : 0);
  $(a("frames_sort_button")).button(1 < c ? "enable" : "disable");
}, pack_sprites:function() {
  this.m_merge_algorithm.reset();
  this.m_sprites_on_pages = [];
  for (var a = this.m_sprites.length, b = 1, c = 0;c < a;++c) {
    var d = this.m_sprites[c], e = this.m_merge_algorithm.add_sprite(d), f = e.position, e = e.page;
    this.m_sprites_on_pages[e] || (this.m_sprites_on_pages[e] = []);
    this.m_sprites_on_pages[e].push(d);
    f.x += d.size.x * d.pivot.x;
    f.y += d.size.y * d.pivot.y;
    d.position = f;
    d.visible = e === this.m_current_page;
    b = Math.max(b, e + 1);
  }
  a = gb.ss_merge_controller.ui_j;
  $(a("editing_page_drop_down_box")).find("option").remove().end();
  for (c = 0;c < b;++c) {
    $(a("editing_page_drop_down_box")).append($("<option></option>").attr("value", c).text("page " + (c + 1)));
  }
}, on_sprite_removed_from_table:function(a) {
  for (var b = -1, c = null, d = this.m_sprites.length, e = 0;e < d;++e) {
    if (c = gb.ss_merge_controller.self().m_sprites[e], c.tag === a) {
      b = e;
      break;
    }
  }
  this.m_sprites.splice(b, 1);
  this.scene.remove_child(c);
  c.release();
}, on_sprite_added:function(a, b) {
  if (b) {
    var c = a.get_component(gb.ces_base_component.type.action);
    c || (a.scale.x = 0, a.scale.y = 0, a.visible = !0, c = new gb.ces_action_component, c.action = function(a, b) {
      1 > a.scale.x ? (a.scale.x += .1, a.scale.y += .1) : (a.scale.x = 1, a.scale.y = 1, c.action = null, a.remove_component(gb.ces_base_component.type.action));
    }, a.add_component(c));
  } else {
    a.scale.x = 1, a.scale.y = 1, a.visible = !0;
  }
}, on_sprite_removed:function(a, b) {
  if (b) {
    var c = a.get_component(gb.ces_base_component.type.action);
    c || (a.scale.x = 1, a.scale.y = 1, c = new gb.ces_action_component, c.action = function(a, b) {
      0 < a.scale.x ? (a.scale.x -= .1, a.scale.y -= .1) : (a.scale.x = 0, a.scale.y = 0, a.visible = !1, c.action = null, a.remove_component(gb.ces_base_component.type.action));
    }, a.add_component(c));
  } else {
    a.scale.x = 0, a.scale.y = 0, a.visible = !1;
  }
}, on_add_sprites_on_page:function(a, b, c) {
  var d = this.m_sprites_on_pages[a], e = d.length, f = null;
  for (a = 0;a < e;++a) {
    f = d[a], this.on_sprite_added(f, b);
  }
  if (c) {
    var g = function() {
      for (var a = !0, b = 0;b < e;++b) {
        if (f = d[b], f.get_component(gb.ces_base_component.type.action)) {
          a = !1;
          break;
        }
      }
      a ? setTimeout(c, 100) : setTimeout(g, 100);
    };
    g();
  }
}, on_remove_sprites_on_page:function(a, b, c) {
  var d = this.m_sprites_on_pages[a], e = d.length, f = null;
  for (a = 0;a < e;++a) {
    f = d[a], this.on_sprite_removed(f, b);
  }
  if (c) {
    var g = function() {
      for (var a = !0, b = 0;b < e;++b) {
        if (f = d[b], f.get_component(gb.ces_base_component.type.action)) {
          a = !1;
          break;
        }
      }
      a ? setTimeout(c, 100) : setTimeout(g, 100);
    };
    g();
  }
}, on_page_changed:function(a, b, c) {
  var d = gb.ss_merge_controller.self();
  this.on_remove_sprites_on_page(this.m_current_page, b, function() {
    d.m_current_page = a;
    d.on_add_sprites_on_page(a, b, c);
  });
}}, static_methods:{self:function() {
  return g_ss_merge_controller;
}, ui:function() {
  return gb.ss_merge_controller.html_elements;
}, ui_j:function(a) {
  return "#" + gb.ss_merge_controller.ui()[a];
}, ui_j_v2:function(a) {
  return "#" + a;
}}});
oop.define_class({namespace:"gb", name:"ss_merge_import_view", extend:gb.game_object, init:function(a, b, c) {
  $(c(b.tab_left_panel)).append('<h3><span class="ui-icon ui-icon-note" style="float:left; margin:2px;"></span>import</h3><div style="background:none; border:0px;"><div title="changed size of imported images" style="width:95%; margin:2%;"><select id=' + b.import_size_drop_down_box + '><option>image scale - 10%</option><option>image scale - 20%</option><option>image scale - 30%</option><option>image scale - 40%</option><option>image scale - 50%</option><option>image scale - 60%</option><option>image scale - 70%</option><option>image scale - 80%</option><option>image scale - 90%</option><option selected="selected">image scale - 100%</option></select></div><div id=' + 
  b.import_drop_zone + '><input type="file" id=' + b.import_add_image_input + ' style="display:none;" multiple><a style="width:99%;" href="#" id=' + b.import_add_image_button + '>add images...</a><label style="float:right; margin-top:8%; margin-right:33.5%">or drop here...</label></div></div>');
  $(c(b.import_add_image_button)).button();
  $(c(b.import_add_image_button)).on("click", function() {
    $(c(b.import_add_image_input)).trigger("click");
  });
  document.getElementById(b.import_add_image_input).addEventListener("change", function() {
    a.on_images_importing(this.files);
  }, !1);
  document.getElementById(b.import_drop_zone).addEventListener("dragover", function(a) {
    a.stopPropagation();
    a.preventDefault();
    a.dataTransfer.dropEffect = "copy";
  }, !1);
  document.getElementById(b.import_drop_zone).addEventListener("drop", function(b) {
    b.stopPropagation();
    b.preventDefault();
    a.on_images_importing(b.dataTransfer.files);
  }, !1);
  $(c(b.import_size_drop_down_box)).selectmenu();
  $(c(b.import_size_drop_down_box_button)).css({width:"100%"});
  $(c(b.import_size_drop_down_box)).on("selectmenuselect", function(b, c) {
    a.on_importing_images_size_changed((c.item.index + 1) / 10);
  });
}, release:function() {
}, methods:{}, static_methods:{}});
oop.define_class({namespace:"gb", name:"ss_merge_frames_view", extend:gb.game_object, init:function(a, b, c) {
  $(c(b.tab_left_panel)).append('<h3><span class="ui-icon ui-icon-note" style="float:left; margin:2px;"></span>frames</h3><div style="background:none; border:0px;"><button id=' + b.frames_sort_button + ' style="margin:2%; width:95%;">sort by name</button><ul style="list-style-type:none; height:340px; overflow:auto; margin-left:-10%;" id="' + b.frames_table + '"></ul></div>');
  $(c(b.frames_table)).height(0);
  $(c(b.frames_table)).sortable();
  $(c(b.frames_table)).disableSelection();
  $(c(b.frames_table)).sortable({stop:function() {
    a.on_sprites_reordering();
  }});
  $(c(b.frames_sort_button)).button();
  $(c(b.frames_sort_button)).button("disable");
}, release:function() {
}, methods:{add_frame:function(a, b, c, d, e) {
  var f = this;
  $(e(d.frames_table)).append('<li class="ui-state-default" id=' + b + ' style="height: 160px; margin: 8px; background: none;"><p align="center" style="font-size:14px; float:left; margin:2px; margin-left:-0.25%; margin-top:-0.25%; height:24px; width:100%; border-color: #666;" id=' + d.frames_table_cell + ' class="ui-widget-header" style="margin:4px;"><span class="ui-icon ui-icon-circle-arrow-e" style="float:left; margin:4px;"/><span id=' + d.frames_table_cell_delete_icon + ' class="ui-icon ui-icon-trash" style="float:right; margin:4px;"/>' + 
  b + '</p><img style="float:left; margin:2px; height:128px; width:128px;" id=' + d.frames_table_cell_image + ' align="left" src="' + c + '"/></li>');
  b = $(e(d.frames_table)).children();
  $($(b[b.length - 1]).find("#" + d.frames_table_cell_delete_icon)).click(function() {
    var b = $(this).parent().find("#" + d.frames_table_cell).text();
    $(this).parent().parent().remove();
    a.on_sprite_removed_from_table(b);
    f.on_frames_count_changed(d, e);
  });
  this.on_frames_count_changed(d, e);
}, on_frames_count_changed:function(a, b) {
  var c = $(b(a.frames_table)).children().length;
  $(b(a.frames_table)).height(0 < c ? 1 == c ? 170 : 340 : 0);
  $(b(a.frames_sort_button)).button(1 < c ? "enable" : "disable");
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"ss_merge_packer_view", extend:gb.game_object, init:function(a, b, c) {
  $(c(b.tab_left_panel)).append('<h3><span class="ui-icon ui-icon-note" style="float:left; margin:2px;"></span>packer</h3><div style="background:none; border:0px;" id=' + b.editing_container + '><div style="width:95%; margin:2%; margin-top:5%"><select id=' + b.editing_page_drop_down_box + '><option selected="selected">page 1</option></select></div><div style="margin:2%;" id=' + b.editing_move_resize_radio_button + '><input type="radio" id=' + b.editing_move_resize_freeform_button + ' name="' + b.editing_move_resize_radio_button + 
  '" checked="checked"><label for=' + b.editing_move_resize_freeform_button + ' style="width:48%;">free form</label><input type="radio" id=' + b.editing_move_resize_snaptogrid_button + ' name="' + b.editing_move_resize_radio_button + '"><label for=' + b.editing_move_resize_snaptogrid_button + ' style="width:52%;">snap to grid</label></div><div title="packing algorithm" style="width:95%; margin:2%; margin-top:5%"><select id=' + b.editing_pack_algorithm_drop_down_box + '><option selected="selected">heuristic - none</option><option>heuristic - TL (top left fit)</option><option>heuristic - BAF (best area fit)</option><option>heuristic - BSSF (best short side fit)</option><option>heuristic - BLSF (best long side fit)</option><option>heuristic - MINW (min width fit)</option><option>heuristic - MINH (min height fit)</option></select></div><button id=' + 
  b.editing_spread_button + ' style="margin:2%; width:95.5%;">spread</button></div>');
  $(c(b.editing_pack_algorithm_drop_down_box)).selectmenu();
  $(c(b.editing_pack_algorithm_drop_down_box_button)).css({width:"100%"});
  $(c(b.editing_spread_button)).button();
  $(c(b.editing_page_drop_down_box)).selectmenu();
  $(c(b.editing_page_drop_down_box_button)).css({width:"100%"});
  $(c(b.editing_page_drop_down_box)).on("selectmenuselect", function(b, c) {
    a.on_page_changed(c.item.index, !0);
  });
  $(c(b.editing_move_resize_radio_button)).buttonset();
  $(c(b.editing_move_resize_radio_button) + " input[type=radio]").change(function() {
    a.m_selector.is_align_movement = this.id === b.editing_move_resize_snaptogrid_button;
  });
}, release:function() {
}, methods:{}, static_methods:{}});
var g_ss_animation_controller = null, g_ss_animation_scene = null;
oop.define_class({namespace:"gb", name:"ss_animation_controller", init:function() {
  $("#ss-animation-tab").append($('<div id="ui-ss-animation-center"/>'));
  $("#ss-animation-tab").append($('<div id="ui-ss-animation-left"/>'));
  g_ss_animation_controller = this;
  var a = new gb.game_transition("data/resources/configurations/transitions/transition.spritesheets.animation.json");
  gb.game_controller.get_instance().add_transition(a);
  this.m_grid = null;
}, release:function() {
}, methods:{activate:function() {
  var a = $("#gl_canvas").detach();
  $("#ui-ss-animation-center").append(a);
  var b = this;
  gb.game_controller.get_instance().goto_transition("data/resources/configurations/transitions/transition.spritesheets.animation.json", function(a) {
    g_ss_animation_scene = a;
    var d = new gb.camera(gl.viewport_width, gl.viewport_height);
    a.camera = d;
    b.m_grid = a.fabricator.create_grid("data/resources/configurations/game_objects/sprite_02.json", 32, 32, 32, 32, function() {
      b.m_grid.color = new gb.vec4(1, 1, 0, 1);
    });
    a.add_child(b.m_grid);
  });
}, deactivate:function() {
  g_ss_animation_scene.remove_child(this.m_grid);
  this.m_grid.get_component(gb.ces_base_component.type.geometry).mesh.release();
}}, static_methods:{}});
var g_ss_play_animation_dialog_controller = null;
oop.define_class({namespace:"gb", name:"ss_play_animation_dialog_controller", constants:{html_elements:{play_animation_dialog:"ss-merge-animation-preview-dialog"}}, init:function() {
  g_ss_play_animation_dialog_controller = this;
  this.m_transition = new gb.game_transition("data/resources/configurations/transitions/transition.spritesheets.play.animation.dialog.json");
  gb.game_controller.get_instance().add_transition(this.m_transition);
}, release:function() {
}, methods:{activate:function(a, b) {
  var c = $("#gl_canvas").detach();
  $("#" + gb.ss_play_animation_dialog_controller.html_elements.play_animation_dialog).append(c);
  this.m_scene = null;
  var d = this;
  gb.game_controller.get_instance().goto_transition("data/resources/configurations/transitions/transition.spritesheets.play.animation.dialog.json", function(c) {
    d.m_scene = c;
    var f = new gb.camera(gl.viewport_width, gl.viewport_height);
    c.camera = f;
    c.fabricator.resources_accessor.get_texture("animation_atlas", a).add_resource_loading_callback(function(a, d) {
      var f = c.fabricator.create_sprite("data/resources/configurations/game_objects/sprite.json", function() {
        a.mag_filter = gl.LINEAR;
        a.min_filter = gl.LINEAR;
        a.wrap_mode = gl.CLAMP_TO_EDGE;
        f.get_component(gb.ces_base_component.type.material).set_texture(a, 0);
        c.add_child(f);
        f.size = new gb.vec2(256, 256);
        f.position = new gb.vec2(.5 * gl.viewport_width, .5 * gl.viewport_height);
        f.add_animation("animation", b);
      });
    });
  });
}, deactivate:function() {
  var a = this.m_scene.children, b = a.length;
  if (0 !== b) {
    for (var c = 0;c < b;++c) {
      var d = a[c];
      d.get_component(gb.ces_base_component.type.geometry).mesh.release();
      this.m_scene.remove_child(d);
    }
  }
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"selector", constants:{corner_type:{left_top:0, right_top:1, left_bottom:2, right_bottom:3, center:4, max:5}}, init:function() {
  this.m_bounding_quad = null;
  this.m_points = [];
  this.m_previous_selector_touch_point = this.m_previous_target_touch_point = this.m_target = null;
  Object.defineProperty(this, "bounding_quad", {get:function() {
    return this.m_bounding_quad;
  }, set:function(a) {
    this.m_bounding_quad = a;
  }});
  Object.defineProperty(this, "size", {get:function() {
    return this.m_bounding_quad.size;
  }, set:function(a) {
    this.m_bounding_quad.size = a;
  }});
  Object.defineProperty(this, "position", {get:function() {
    return this.m_bounding_quad.position;
  }, set:function(a) {
    this.m_bounding_quad.position = a;
  }});
  Object.defineProperty(this, "target", {get:function() {
    return this.m_target;
  }, set:function(a) {
    if (a) {
      var b = null;
      this.m_target && (b = this.m_target.get_component(gb.ces_base_component.type.touch_recognize), b.remove_callback(gb.input_context.state.pressed, this.on_target_pressed), b.remove_callback(gb.input_context.state.dragged, this.on_target_dragged), b.remove_callback(gb.input_context.state.released, this.on_target_released));
      this.m_target = a;
      this.m_target.remove_from_parent();
      this.m_target.position = new gb.vec2(0);
      this.m_target.rotation = 0;
      this.m_bounding_quad.add_child(this.m_target);
      this.m_bounding_quad.visible = !0;
      this.m_bounding_quad.size = this.m_target.size;
      this.update_interactive_points_position();
      a = null;
      for (b = 0;b < gb.selector.corner_type.max;++b) {
        a = this.m_points[b], a.remove_from_parent(), this.m_bounding_quad.add_child(a), a.visible = !0;
      }
      b = this.m_target.get_component(gb.ces_base_component.type.touch_recognize);
      b.add_callback(gb.input_context.state.pressed, this.on_target_pressed, this);
      b.add_callback(gb.input_context.state.released, this.on_target_released, this);
      b.add_callback(gb.input_context.state.dragged, this.on_target_dragged, this);
    } else {
      for (this.m_target = null, this.m_bounding_quad.visible = !1, b = 0;b < gb.selector.corner_type.max;++b) {
        a = this.m_points[b], a.visible = !1;
      }
    }
  }});
  Object.defineProperty(this, "rotation", {get:function() {
    return this.m_bounding_quad.rotation;
  }, set:function(a) {
    this.m_bounding_quad.rotation = a;
  }});
  this.m_is_align_movement = !1;
  Object.defineProperty(this, "is_align_movement", {get:function() {
    return this.m_is_align_movement;
  }, set:function(a) {
    this.m_is_align_movement = a;
  }});
  this.m_is_proportional_resizing = !1;
  Object.defineProperty(this, "is_proportional_resizing", {get:function() {
    return this.m_is_proportional_resizing;
  }, set:function(a) {
    this.m_is_proportional_resizing = a;
  }});
  this.m_summury_delta = new gb.vec2;
}, release:function() {
}, methods:{update_interactive_points_position:function() {
  var a = new gb.vec2(this.m_target.size.x * this.m_target.pivot.x - this.m_target.size.x * (1 - this.m_target.pivot.x), this.m_target.size.y * this.m_target.pivot.y - this.m_target.size.y * (1 - this.m_target.pivot.y));
  this.m_points[gb.selector.corner_type.center].position = a;
  var a = new gb.vec2(-this.m_target.size.x * (1 - this.m_target.pivot.x), -this.m_target.size.y * (1 - this.m_target.pivot.y)), b = new gb.vec2(this.m_target.size.x * this.m_target.pivot.x, this.m_target.size.y * this.m_target.pivot.y);
  this.m_points[gb.selector.corner_type.left_top].position = new gb.vec2(a.x + .5 * this.m_points[gb.selector.corner_type.left_top].size.x, a.y + .5 * this.m_points[gb.selector.corner_type.left_top].size.y);
  this.m_points[gb.selector.corner_type.right_top].position = new gb.vec2(a.x + .5 * this.m_points[gb.selector.corner_type.right_top].size.x, b.y - .5 * this.m_points[gb.selector.corner_type.right_top].size.y);
  this.m_points[gb.selector.corner_type.left_bottom].position = new gb.vec2(b.x - .5 * this.m_points[gb.selector.corner_type.left_bottom].size.x, a.y + .5 * this.m_points[gb.selector.corner_type.left_bottom].size.y);
  this.m_points[gb.selector.corner_type.right_bottom].position = new gb.vec2(b.x - .5 * this.m_points[gb.selector.corner_type.right_bottom].size.x, b.y - .5 * this.m_points[gb.selector.corner_type.right_bottom].size.y);
}, set_interactive_point:function(a, b) {
  this.m_points[b] && this.m_points[b].remove_from_parent();
  this.m_points[b] = a;
  this.m_bounding_quad.add_child(this.m_points[b]);
  a.is_touchable = !0;
  var c = a.get_component(gb.ces_base_component.type.touch_recognize);
  c.add_callback(gb.input_context.state.pressed, this.on_selector_pressed, this);
  c.add_callback(gb.input_context.state.released, this.on_selector_released, this);
  c.add_callback(gb.input_context.state.dragged, this.on_selector_dragged, this);
}, on_selector_pressed:function(a, b, c, d) {
  d.m_previous_selector_touch_point = c;
}, on_selector_released:function(a, b, c, d) {
  d.m_previous_selector_touch_point = null;
}, on_selector_dragged:function(a, b, c, d) {
  if (d.m_previous_selector_touch_point) {
    b = d.m_previous_selector_touch_point.sub(c);
    d.m_is_proportional_resizing && (b.x = Math.abs(b.x) > Math.abs(b.y) ? b.x : b.y, b.y = Math.abs(b.x) > Math.abs(b.y) ? b.x : b.y);
    var e = new gb.vec2(b), f = d.position, g = d.size;
    if (d.m_is_align_movement) {
      d.m_summury_delta.x += b.x;
      d.m_summury_delta.y += b.y;
      b.x = 0;
      b.y = 0;
      e.x = 0;
      e.y = 0;
      if (16 < Math.abs(d.m_summury_delta.x)) {
        var h = 32 * Math.round((f.x - d.m_summury_delta.x) / 32), k = 32 * Math.round((f.x + g.x - d.m_summury_delta.x) / 32), k = k - f.x;
        b.x = f.x - h;
        e.x = g.x - k;
        d.m_summury_delta.x = 0;
      }
      16 < Math.abs(d.m_summury_delta.y) && (h = 32 * Math.round((f.y - d.m_summury_delta.y) / 32), k = 32 * Math.round((f.y + g.y - d.m_summury_delta.y) / 32), k -= f.y, b.y = f.y - h, e.y = g.y - k, d.m_summury_delta.y = 0);
    }
    a === d.m_points[gb.selector.corner_type.left_top] ? (g.x += b.x, g.y += b.y) : a === d.m_points[gb.selector.corner_type.right_top] ? (g.x += b.x, g.y -= e.y) : a === d.m_points[gb.selector.corner_type.left_bottom] ? (g.x -= e.x, g.y += b.y) : a === d.m_points[gb.selector.corner_type.right_bottom] && (g.x -= e.x, g.y -= e.y);
    f.x -= b.x * d.m_target.pivot.x;
    f.y -= b.y * d.m_target.pivot.y;
    d.position = f;
    d.size = g;
    d.m_target.size = g;
    d.update_interactive_points_position();
    d.m_previous_selector_touch_point = new gb.vec2(c);
  }
}, on_target_pressed:function(a, b, c, d) {
  d.m_previous_target_touch_point = new gb.vec2(c);
}, on_target_released:function(a, b, c, d) {
  d.m_previous_target_touch_point = null;
  d.m_summury_delta.x = 0;
  d.m_summury_delta.y = 0;
}, on_target_dragged:function(a, b, c, d) {
  d.m_previous_target_touch_point && (a = d.m_previous_target_touch_point.sub(c), d.m_is_align_movement && (d.m_summury_delta.x += a.x, d.m_summury_delta.y += a.y, a.x = 0, a.y = 0, 16 < Math.abs(d.m_summury_delta.x) && (a.x = d.position.x - 32 * Math.round((d.position.x - d.m_summury_delta.x) / 32), d.m_summury_delta.x = 0), 16 < Math.abs(d.m_summury_delta.y) && (a.y = d.position.y - 32 * Math.round((d.position.y - d.m_summury_delta.y) / 32), d.m_summury_delta.y = 0)), d.position = d.position.sub(a), 
  d.m_previous_target_touch_point = new gb.vec2(c));
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"editor_fabricator", init:function() {
  this.m_scene_fabricator = null;
  Object.defineProperty(this, "scene_fabricator", {get:function() {
    return this.m_scene_fabricator;
  }, set:function(a) {
    this.m_scene_fabricator = a;
  }});
}, release:function() {
}, methods:{create_selector:function() {
  var a = new gb.selector, b = this.m_scene_fabricator.create_sprite("data/resources/configurations/game_objects/selector.json", function() {
    b.get_component(gb.ces_base_component.type.material).set_custom_shader_uniform(new gb.vec4(0, 1, 0, .25), "u_color");
  });
  a.bounding_quad = b;
  var c = this.m_scene_fabricator.create_sprite("data/resources/configurations/game_objects/selector.json", function() {
    c.get_component(gb.ces_base_component.type.material).set_custom_shader_uniform(new gb.vec4(1, 0, 0, .5), "u_color");
    var a = new gb.ces_geometry_freeform_component;
    a.mesh = gb.mesh_constructor.create_circle();
    c.add_component(a);
    c.size = new gb.vec2(8);
    var a = c.get_component(gb.ces_base_component.type.touch_recognize), b = c.size;
    a.bound = new gb.vec4(-.5 * b.x, -.5 * b.y, .5 * b.x, .5 * b.y);
  });
  a.set_interactive_point(c, gb.selector.corner_type.center);
  var d = this.m_scene_fabricator.create_sprite("data/resources/configurations/game_objects/selector.json", function() {
    d.get_component(gb.ces_base_component.type.material).set_custom_shader_uniform(new gb.vec4(1, 0, 0, .5), "u_color");
    var a = new gb.ces_geometry_freeform_component;
    a.mesh = gb.mesh_constructor.create_circle();
    d.add_component(a);
    d.size = new gb.vec2(8);
    var a = d.get_component(gb.ces_base_component.type.touch_recognize), b = d.size;
    a.bound = new gb.vec4(-.5 * b.x, -.5 * b.y, .5 * b.x, .5 * b.y);
  });
  a.set_interactive_point(d, gb.selector.corner_type.left_top);
  var e = this.m_scene_fabricator.create_sprite("data/resources/configurations/game_objects/selector.json", function() {
    e.get_component(gb.ces_base_component.type.material).set_custom_shader_uniform(new gb.vec4(1, 0, 0, .5), "u_color");
    var a = new gb.ces_geometry_freeform_component;
    a.mesh = gb.mesh_constructor.create_circle();
    e.add_component(a);
    e.size = new gb.vec2(8);
    var a = e.get_component(gb.ces_base_component.type.touch_recognize), b = e.size;
    a.bound = new gb.vec4(-.5 * b.x, -.5 * b.y, .5 * b.x, .5 * b.y);
  });
  a.set_interactive_point(e, gb.selector.corner_type.right_top);
  var f = this.m_scene_fabricator.create_sprite("data/resources/configurations/game_objects/selector.json", function() {
    f.get_component(gb.ces_base_component.type.material).set_custom_shader_uniform(new gb.vec4(1, 0, 0, .5), "u_color");
    var a = new gb.ces_geometry_freeform_component;
    a.mesh = gb.mesh_constructor.create_circle();
    f.add_component(a);
    f.size = new gb.vec2(8);
    var a = f.get_component(gb.ces_base_component.type.touch_recognize), b = f.size;
    a.bound = new gb.vec4(-.5 * b.x, -.5 * b.y, .5 * b.x, .5 * b.y);
  });
  a.set_interactive_point(f, gb.selector.corner_type.left_bottom);
  var g = this.m_scene_fabricator.create_sprite("data/resources/configurations/game_objects/selector.json", function() {
    g.get_component(gb.ces_base_component.type.material).set_custom_shader_uniform(new gb.vec4(1, 0, 0, .5), "u_color");
    var a = new gb.ces_geometry_freeform_component;
    a.mesh = gb.mesh_constructor.create_circle();
    g.add_component(a);
    g.size = new gb.vec2(8);
    var a = g.get_component(gb.ces_base_component.type.touch_recognize), b = g.size;
    a.bound = new gb.vec4(-.5 * b.x, -.5 * b.y, .5 * b.x, .5 * b.y);
  });
  a.set_interactive_point(g, gb.selector.corner_type.right_bottom);
  return a;
}}, static_methods:{}});


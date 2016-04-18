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
      var h = new Function;
      h.prototype = e.prototype;
      f.prototype = new h;
      f.prototype.constructor = f;
    } else {
      f = function() {
        f.prototype.init.apply(this, arguments);
      };
    }
    f.prototype.init = c;
    f.prototype.release = d;
    var l = a.methods;
    if (l) {
      for (var k in l) {
        if ("function" !== typeof l[k]) {
          throw Error("class method must be function");
        }
        f.prototype[k] = l[k];
      }
    }
    var g = a.static_methods;
    if (g) {
      for (k in g) {
        if ("function" !== typeof g[k]) {
          throw Error("class method must be function");
        }
        f[k] = g[k];
      }
    }
    var n = a.constants;
    if (n) {
      for (var m in n) {
        if ("function" === typeof n[m]) {
          throw Error("class constant cannot be function");
        }
        f[m] = n[m];
      }
    }
    var p = oop.global;
    a.namespace && (p[a.namespace] || (p[a.namespace] = {}, console.warn("created new namespace: ", a.namespace)), p = p[a.namespace]);
    if (p[b]) {
      throw Error("can't create class with same definition name");
    }
    p[b] = f;
  } catch (q) {
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
  arguments[0] instanceof gb.vec2 ? (this.m_x = arguments[0].x, this.m_y = arguments[0].y) : 1 === arguments.length ? (this.m_x = arguments[0], this.m_y = arguments[0]) : 2 === arguments.length ? (this.m_x = arguments[0], this.m_y = arguments[1]) : this.m_y = this.m_x = 0;
  Object.defineProperty(this, "x", {configurable:!0, get:function() {
    return this.m_x;
  }, set:function(a) {
    this.m_x = a;
  }});
  Object.defineProperty(this, "y", {configurable:!0, get:function() {
    return this.m_y;
  }, set:function(a) {
    this.m_y = a;
  }});
}, release:function() {
}, methods:{add:function(a) {
  this.m_x += a.m_x;
  this.m_y += a.m_y;
  return this;
}, add_scalar:function(a) {
  this.m_x += a;
  this.m_y += a;
  return this;
}, sub:function(a) {
  this.m_x -= a.m_x;
  this.m_y -= a.m_y;
  return this;
}, sub_scalar:function(a) {
  this.m_x -= a;
  this.m_y -= a;
  return this;
}, multiply:function(a) {
  this.m_x *= a.m_x;
  this.m_y *= a.m_y;
  return this;
}, multiply_scalar:function(a) {
  this.m_x *= a;
  this.m_y *= a;
  return this;
}, divide:function(a) {
  this.m_x /= a.m_x;
  this.m_y /= a.m_y;
  return this;
}, divide_scalar:function(a) {
  this.m_x /= a;
  this.m_y /= a;
  return this;
}, clamp:function(a, b) {
  this.m_x = Math.max(a.m_x, Math.min(b.m_x, this.m_x));
  this.m_y = Math.max(a.m_y, Math.min(b.m_y, this.m_y));
  return this;
}, dot:function(a) {
  return this.m_x * a.m_x + this.m_y * a.m_y;
}, length:function() {
  return Math.sqrt(this.m_x * this.m_x + this.m_y * this.m_y);
}, normalize:function() {
  return this.divide_scalar(this.length());
}, angle:function() {
  var a = Math.atan2(this.m_y, this.m_x);
  0 > a && (a += 2 * Math.PI);
  return a;
}, distance_to:function(a) {
  var b = this.m_x - a.m_x;
  a = this.m_y - a.m_y;
  return Math.sqrt(b * b + a * a);
}, lerp:function(a, b) {
  this.m_x += (a.m_x - this.m_x) * b;
  this.m_y += (a.m_y - this.m_y) * b;
  return this;
}, equals:function(a) {
  return a.m_x === this.m_x && a.m_y === this.m_y;
}, min:function(a) {
  this.m_x = Math.min(this.m_x, a.m_x);
  this.m_y = Math.min(this.m_y, a.m_y);
  return this;
}, max:function(a) {
  this.m_x = Math.max(this.m_x, a.m_x);
  this.m_y = Math.max(this.m_y, a.m_y);
  return this;
}, to_array:function() {
  var a = [];
  a.push(this.m_x);
  a.push(this.m_y);
  return a;
}}, static_methods:{add:function(a, b) {
  return new gb.vec2(a.m_x + b.m_x, a.m_y + b.m_y);
}, sub:function(a, b) {
  return new gb.vec2(a.m_x - b.m_x, a.m_y - b.m_y);
}, lerp:function(a, b, c) {
  return gb.vec2.sub(b, a).multiply_scalar(c).add(a);
}, equals:function(a, b) {
  return a.m_x === b.m_x && a.m_y === b.m_y;
}, min:function(a, b) {
  var c = new gb.vec2(0);
  c.m_x = Math.min(a.m_x, b.m_x);
  c.m_y = Math.min(a.m_y, b.m_y);
  return c;
}, max:function(a, b) {
  var c = new gb.vec2(0);
  c.m_x = Math.max(a.m_x, b.m_x);
  c.m_y = Math.max(a.m_y, b.m_y);
  return c;
}}});
oop.define_class({namespace:"gb", name:"vec3", init:function() {
  arguments[0] instanceof gb.vec3 ? (this.m_x = arguments[0].x, this.m_y = arguments[0].y, this.m_z = arguments[0].z) : 1 === arguments.length ? (this.m_x = arguments[0], this.m_y = arguments[0], this.m_z = arguments[0]) : 3 === arguments.length ? (this.m_x = arguments[0], this.m_y = arguments[1], this.m_z = arguments[2]) : this.m_z = this.m_y = this.m_x = 0;
  Object.defineProperty(this, "x", {get:function() {
    return this.m_x;
  }, set:function(a) {
    this.m_x = a;
  }});
  Object.defineProperty(this, "y", {get:function() {
    return this.m_y;
  }, set:function(a) {
    this.m_y = a;
  }});
  Object.defineProperty(this, "z", {get:function() {
    return this.m_z;
  }, set:function(a) {
    this.m_z = a;
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
  var a = [];
  a[0] = this.x;
  a[1] = this.y;
  a[2] = this.z;
  return a;
}}, static_methods:{add:function(a, b) {
  return new gb.vec3(a.x + b.x, a.y + b.y, a.z + b.z);
}, sub:function(a, b) {
  return new gb.vec3(a.x - b.x, a.y - b.y, a.z - b.z);
}, cross:function(a, b) {
  return new gb.vec3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
}}});
oop.define_class({namespace:"gb", name:"vec4", init:function() {
  arguments[0] instanceof gb.vec4 ? (this.m_x = arguments[0].x, this.m_y = arguments[0].y, this.m_z = arguments[0].z, this.m_w = arguments[0].w) : 1 === arguments.length ? (this.m_x = arguments[0], this.m_y = arguments[0], this.m_z = arguments[0], this.m_w = arguments[0]) : 4 === arguments.length ? (this.m_x = arguments[0], this.m_y = arguments[1], this.m_z = arguments[2], this.m_w = arguments[3]) : this.m_w = this.m_z = this.m_y = this.m_x = 0;
  Object.defineProperty(this, "x", {get:function() {
    return this.m_x;
  }, set:function(a) {
    this.m_x = a;
  }});
  Object.defineProperty(this, "y", {get:function() {
    return this.m_y;
  }, set:function(a) {
    this.m_y = a;
  }});
  Object.defineProperty(this, "z", {get:function() {
    return this.m_z;
  }, set:function(a) {
    this.m_z = a;
  }});
  Object.defineProperty(this, "w", {get:function() {
    return this.m_w;
  }, set:function(a) {
    this.m_w = a;
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
  var a = [];
  a.push(this.x);
  a.push(this.y);
  a.push(this.z);
  a.push(this.w);
  return a;
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"mat4", init:function() {
  this.m_elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
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
  var b = Math.sin(b), e = Math.cos(c), c = Math.sin(c), f = Math.cos(d), d = Math.sin(d), h = a * f, l = a * d, k = b * f, g = b * d;
  this.m_elements[0] = e * f;
  this.m_elements[4] = -e * d;
  this.m_elements[8] = c;
  this.m_elements[1] = l + k * c;
  this.m_elements[5] = h - g * c;
  this.m_elements[9] = -b * e;
  this.m_elements[2] = g - h * c;
  this.m_elements[6] = k + l * c;
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
  var c = a.m_elements, d = b.m_elements, e = new gb.mat4, f = c[0], h = c[4], l = c[8], k = c[12], g = c[1], n = c[5], m = c[9], p = c[13], q = c[2], r = c[6], t = c[10], u = c[14], v = c[3], w = c[7], x = c[11], c = c[15], y = d[0], z = d[4], A = d[8], B = d[12], C = d[1], D = d[5], E = d[9], F = d[13], G = d[2], H = d[6], I = d[10], J = d[14], K = d[3], L = d[7], M = d[11], d = d[15];
  e.m_elements[0] = f * y + h * C + l * G + k * K;
  e.m_elements[4] = f * z + h * D + l * H + k * L;
  e.m_elements[8] = f * A + h * E + l * I + k * M;
  e.m_elements[12] = f * B + h * F + l * J + k * d;
  e.m_elements[1] = g * y + n * C + m * G + p * K;
  e.m_elements[5] = g * z + n * D + m * H + p * L;
  e.m_elements[9] = g * A + n * E + m * I + p * M;
  e.m_elements[13] = g * B + n * F + m * J + p * d;
  e.m_elements[2] = q * y + r * C + t * G + u * K;
  e.m_elements[6] = q * z + r * D + t * H + u * L;
  e.m_elements[10] = q * A + r * E + t * I + u * M;
  e.m_elements[14] = q * B + r * F + t * J + u * d;
  e.m_elements[3] = v * y + w * C + x * G + c * K;
  e.m_elements[7] = v * z + w * D + x * H + c * L;
  e.m_elements[11] = v * A + w * E + x * I + c * M;
  e.m_elements[15] = v * B + w * F + x * J + c * d;
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
  var e = a.x, f = a.y, h = b.x - a.x;
  a = b.y - a.y;
  b = c.x;
  var l = d.x - c.x;
  d = d.y - c.y;
  var k = Math.sqrt(h * h + a * a), g = Math.sqrt(l * l + d * d);
  if (h / k === l / g && a / k === d / g) {
    return {intersected:!1};
  }
  c = (h * (c.y - f) + a * (e - b)) / (l * a - d * h);
  b = (b + l * c - e) / h;
  return 0 > b || 0 > c || 1 < c ? {intersected:!1} : {intersected:!0, point_x:e + h * b, point_y:f + a * b, distance:b};
}, point_orientation:function(a, b, c) {
  a = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
  return 0 === a ? gb.math.orientation.colinear : 0 < a ? gb.math.orientation.clockwise : gb.math.orientation.counterclockwise;
}}});
var gl = null;
oop.define_class({namespace:"gb", name:"graphics_context", init:function() {
  var a = document.getElementById("gl_canvas"), b = null;
  try {
    b = a.getContext("experimental-webgl"), b.viewport_width = a.width, b.viewport_height = a.height, console.log("OpenGL context created"), console.log("viewport: [ " + b.viewport_width + ", " + b.viewport_height + " ]");
  } catch (c) {
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
}}});
oop.define_class({namespace:"gb", name:"texture", extend:gb.resource_base, init:function() {
  this.m_type = gb.resource_base.type.texture;
  this.m_handler = -1;
  this.m_setted_wrap_mode = this.m_height = this.m_width = 0;
  this.m_presseted_wrap_mode = gl.REPEAT;
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
  this.m_data = new Uint16Array(a);
  Object.defineProperty(this, "allocated_size", {get:function() {
    return this.m_allocated_size;
  }});
  Object.defineProperty(this, "used_size", {get:function() {
    return this.m_used_size;
  }});
  Object.defineProperty(this, "data", {get:function() {
    return this.m_data;
  }});
}, release:function() {
  gl.deleteBuffer(this.m_handler);
}, methods:{submit:function(a) {
  var b = this.m_data;
  a && 0 < a && a < this.m_allocated_size && (this.m_used_size = a, b = this.m_data.slice(0, a));
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
  this.vbo.destroy();
  this.ibo.destroy();
}, methods:{bind:function(a) {
  this.m_vbo.bind(a);
  this.m_ibo.bind();
}, unbind:function(a) {
  this.m_vbo.unbind(a);
  this.m_ibo.unbind();
}, draw:function() {
  gl.drawElements(this.m_mode, this.m_ibo.used_size, gl.UNSIGNED_SHORT, 0);
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
  gl.shaderSource(c, b === gl.VERTEX_SHADER ? (gb.shader_compiler_glsl.vs_shader_header + a).trim() : (gb.shader_compiler_glsl.fs_shader_header + a).trim());
  gl.compileShader(c);
  var d = gl.getShaderInfoLog(c) || "";
  gl.getShaderParameter(c, gl.COMPILE_STATUS) || console.error(d);
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
  gl.generateMipmap(gl.TEXTURE_2D);
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
      }, h = 0;h < d;++h) {
        (new gb.material_configuration).serialize(c.json.materials[h].filename, f);
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
  var b = new gb.ibo(6, gl.STATIC_DRAW), c = b.data;
  c[0] = 0;
  c[1] = 2;
  c[2] = 1;
  c[3] = 1;
  c[4] = 2;
  c[5] = 3;
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
  var b = new gb.ibo(6, gl.STATIC_DRAW), c = b.data;
  c[0] = 0;
  c[1] = 2;
  c[2] = 1;
  c[3] = 1;
  c[4] = 2;
  c[5] = 3;
  b.submit();
  return new gb.mesh(a, b, gl.TRIANGLES);
}, create_circle:function() {
  var a = new gb.vbo(33, gl.STATIC_DRAW, gb.vbo.declaration.position_xy), b = 1, c = new gb.vec2;
  a.write_attribute(gb.vbo.attribute.position, 0, c);
  for (var d = 0;d <= 2 * Math.PI;d += 2 * Math.PI / 32) {
    c.x = 1 * Math.cos(d), c.y = 1 * Math.sin(d), a.write_attribute(gb.vbo.attribute.position, b, c), b++;
  }
  a.submit();
  for (var b = 1, c = new gb.ibo(99, gl.STATIC_DRAW), d = c.data, e = 0;96 > e;e += 3) {
    d[e + 0] = 0, d[e + 1] = Math.min(b++, 32), d[e + 2] = Math.min(b, 32);
  }
  d[96] = 0;
  d[97] = Math.min(b - 1, 32);
  d[98] = 1;
  c.submit();
  return new gb.mesh(a, c, gl.TRIANGLES);
}, create_grid:function(a, b, c, d) {
  for (var e = (a + 1) * (b + 1) * 4, f = new gb.vbo((a + 1) * (b + 1) * 4, gl.STATIC_DRAW, gb.vbo.declaration.position_xy), h = 0, l = new gb.vec2, k = 0;k <= a;++k) {
    l.x = k * c, l.y = 0, f.write_attribute(gb.vbo.attribute.position, h, l), h++, l.x = k * c, l.y = b * d, f.write_attribute(gb.vbo.attribute.position, h, l), h++;
  }
  for (k = 0;k <= b;++k) {
    l.x = 0, l.y = k * d, f.write_attribute(gb.vbo.attribute.position, h, l), h++, l.x = a * c, l.y = k * d, f.write_attribute(gb.vbo.attribute.position, h, l), h++;
  }
  f.submit();
  a = new gb.ibo(4 * e, gl.STATIC_DRAW);
  b = a.data;
  for (k = 0;k < e;++k) {
    b[k] = k;
  }
  a.submit();
  return new gb.mesh(f, a, gl.LINES);
}}});
var g_cached_parameters = null;
oop.define_class({namespace:"gb", name:"material_cached_parameters", init:function() {
  this.m_is_cull_face = !1;
  this.m_cull_face_mode = -1;
  this.m_is_blending = !1;
  this.m_blending_equation = this.m_blending_function_destination = this.m_blending_function_source = -1;
  this.m_is_stencil_test = !1;
  this.m_stencil_mask_parameter = this.m_stencil_function_parameter_2 = this.m_stencil_function_parameter_1 = this.m_stencil_function = -1;
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
  for (var d = function(b, c) {
    b.wrap_mode = c.wrap_mode;
    b.mag_filter = c.mag_filter;
    b.min_filter = c.min_filter;
    a.set_texture(b, c.sampler_index);
  }, e = 0;e < b.textures_configurations.length;++e) {
    var f = b.textures_configurations[e];
    c.get_texture(0 !== f.filename.length ? f.filename : f.technique_name).add_resource_loading_callback(d, f);
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
  c = gl.createRenderbuffer();
  gl.bindRenderbuffer(gl.RENDERBUFFER, c);
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, this.m_frame_width, this.m_frame_height);
  this.m_frame_buffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.m_frame_buffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, a, 0);
  gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, c);
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
}, methods:{create_main_render_technique:function(a) {
  this.m_main_render_technique = new gb.render_technique_main(gl.viewport_width, gl.viewport_height, "main", 0, a);
}, add_ws_render_technique:function(a, b, c) {
  b = "" + b + a;
  "undefined" === typeof this.m_unique_ws_render_techniques[b] ? (this.m_unique_ws_render_techniques[b] = c, this.m_ws_render_techniques.push(c)) : console.log("can't add same ws render technique: " + a);
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
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"ces_base_component", constants:{type:{undefined:-1, transformation:0, material:1, geometry:2, scene:3, light:4, light_mask:5, convex_hull:6, touch_recognize:7, max:8}}, init:function() {
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
      a.m_position.m_x = b;
      a.m_matrix_t.translate(a.m_position.x, a.m_position.y, 0);
      a.m_is_matrix_m_computed = !1;
    }, get:function() {
      return a.m_position.m_x;
    }});
    Object.defineProperty(b, "y", {set:function(b) {
      a.m_position.m_y = b;
      a.m_matrix_t.translate(a.m_position.x, a.m_position.y, 0);
      a.m_is_matrix_m_computed = !1;
    }, get:function() {
      return a.m_position.m_y;
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
  Object.defineProperty(this, "scale", {set:function(a) {
    this.m_scale = a;
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
  this.m_frame = new gb.vec4(0, 0, 1, 1);
  this.m_pivot = new gb.vec2(0);
  Object.defineProperty(this, "pivot", {get:function() {
    return this.m_pivot;
  }, set:function(a) {
    this.m_pivot = a;
    this.update_mesh_position_attributes();
  }});
  Object.defineProperty(this, "size", {get:function() {
    return new gb.vec2(this.m_frame.z, this.m_frame.w);
  }, set:function(a) {
    this.m_frame.z = a.x;
    this.m_frame.w = a.y;
    this.update_mesh_position_attributes();
  }});
}, release:function() {
}, methods:{update_mesh_position_attributes:function() {
  var a = new gb.vec2(this.m_frame.z - this.m_pivot.x, this.m_frame.w - this.m_pivot.y), b = new gb.vec2(a.x - this.m_frame.z, a.y - this.m_frame.w), a = new gb.vec4(b.x, a.y, a.x, b.y), b = this.m_mesh.vbo;
  b.write_attribute(gb.vbo.attribute.position, 0, new gb.vec2(a.x, a.z));
  b.write_attribute(gb.vbo.attribute.position, 1, new gb.vec2(a.x, a.w));
  b.write_attribute(gb.vbo.attribute.position, 2, new gb.vec2(a.y, a.z));
  b.write_attribute(gb.vbo.attribute.position, 3, new gb.vec2(a.y, a.w));
  b.submit();
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
      for (var a = this.m_mesh.vbo, d = 0;d < this.m_vertices.length;++d) {
        a.write_attribute(gb.vbo.attribute.position, d, this.m_vertices[d]);
      }
      a.submit();
      a = this.m_mesh.ibo.data;
      for (d = 0;d < this.m_indices.length;++d) {
        a[d] = this.m_indices[d];
      }
      b.submit(this.m_indices.length);
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
  for (var d = [], f = new gb.vec2(0), h = new gb.vec2(gb.math.INT16_MIN), l = new gb.vec2(h), k = gb.math.INT16_MAX, c = 0;c < b.length;++c) {
    e = b[c];
    f.x = Math.cos(e);
    f.y = Math.sin(e);
    var g = a, n = f.add(a), k = gb.math.INT16_MAX;
    l.x = h.x;
    l.y = h.y;
    for (var m = 0;m < this.m_shadow_casters_edges.length;++m) {
      var p = gb.math.intersect(g, n, this.m_shadow_casters_edges[m].point_01, this.m_shadow_casters_edges[m].point_02);
      p.intersected && p.distance < k && (k = p.distance, l.x = p.point_x, l.y = p.point_y);
    }
    l.equals(h) || -1 === d.findIndex(function(a) {
      return a.point_x === l.x && a.point_y === l.y;
    }) && d.push({point_x:l.x, point_y:l.y, angle:e});
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
    p = d[c], this.m_vertices[a].x = p.point_x, this.m_vertices[a].y = p.point_y, a++;
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
}, add_callback:function(a, b) {
  this.m_callbacks[a].push(b);
}, remove_callback:function(a, b) {
  var c = this.m_callbacks[a].findIndex(function(a) {
    return b === a;
  });
  -1 !== c && this.m_callbacks[a].splice(c, 1);
}, get_callbacks:function(a) {
  return this.m_callbacks[a];
}}, static_methods:{}});
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
  var b = this.m_systems.findIndex(function(b) {
    return b.tag === a.tag;
  });
  -1 !== b && (this.m_children[b].remove_scene_component(), this.m_children.splice(b, 1));
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
oop.define_class({namespace:"gb", name:"ces_base_system", constants:{type:{undefined:-1, render:0, deferred_lighting:1, touches:2}}, init:function() {
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
      var h = f.get_component(gb.ces_base_component.type.transformation), e = gb.mat4.multiply(e, h.matrix_m), f = f.parent
    }
    d = gb.mat4.multiply_vec2(d.position, e);
    for (e = 0;e < this.m_shadow_casters.length;++e) {
      for (var f = this.m_shadow_casters[e].get_component(gb.ces_base_component.type.convex_hull), h = this.m_shadow_casters[e].get_component(gb.ces_base_component.type.transformation), l = (new gb.mat4).identity(), k = this.m_shadow_casters[e].parent;k;) {
        var g = k.get_component(gb.ces_base_component.type.transformation), l = gb.mat4.multiply(l, g.matrix_m), k = k.parent
      }
      l = gb.mat4.multiply(l, h.matrix_m);
      c.update_mask_geometry(l, f.oriented_vertices);
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
  Object.defineProperty(this, "screed_quad_mesh", {get:function() {
    return this.m_screed_quad_mesh;
  }});
}, release:function() {
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
    var e = a.get_component(gb.ces_base_component.type.light), f = a.get_component(gb.ces_base_component.type.transformation), h = a.get_component(gb.ces_base_component.type.material), l = a.get_component(gb.ces_base_component.type.geometry);
    !e && h && l && f && (e = h.get_material(b, c), l = l.mesh, e && e.shader && e.shader.is_commited && l && a.visible && (e.set_custom_shader_uniform(gb.ces_render_system.shadow_color_for_casters, gb.ces_render_system.shadow_color_uniform), h.bind(b, c, e), e.shader.set_mat4(d.camera.matrix_p, gb.shader.uniform_type.mat_p), e.shader.set_mat4(d.camera.matrix_v, gb.shader.uniform_type.mat_v), d = gb.ces_transformation_component.get_absolute_transformation(a, !1), e.shader.set_mat4(d, gb.shader.uniform_type.mat_m), 
    l.bind(e.shader.attributes), l.draw(), l.unbind(e.shader.attributes), h.unbind(b, c, e)));
    a = a.children;
    for (h = 0;h < a.length;++h) {
      this.draw_recursively(a[h], b, c);
    }
  }
}, draw_recursively_lights:function(a, b, c) {
  var d = a.get_component(gb.ces_base_component.type.scene);
  if (d) {
    var e = a.get_component(gb.ces_base_component.type.light), f = a.get_component(gb.ces_base_component.type.light_mask), h = a.get_component(gb.ces_base_component.type.transformation), l = a.get_component(gb.ces_base_component.type.material), k = a.get_component(gb.ces_base_component.type.geometry);
    if (e && l && k && h) {
      var g = l.get_material(b, c), n = k.mesh, m = f.mesh;
      g && a.visible && g.shader && g.shader.is_commited && n && m && (function() {
        gl.colorMask(!1, !1, !1, !1);
        gl.depthMask(!1);
        g.stencil_function = gl.ALWAYS;
        g.stencil_function_parameter_1 = 1;
        g.stencil_function_parameter_2 = 255;
        g.stencil_mask_parameter = 1;
        g.set_custom_shader_uniform(0, gb.ces_render_system.light_mask_vs_flag_uniform);
        g.set_custom_shader_uniform(1, gb.ces_render_system.light_mask_fs_flag_uniform);
        l.bind(b, c, g);
        g.shader.set_mat4(d.camera.matrix_p, gb.shader.uniform_type.mat_p);
        g.shader.set_mat4(d.camera.matrix_v, gb.shader.uniform_type.mat_v);
        g.shader.set_mat4((new gb.mat4).identity(), gb.shader.uniform_type.mat_m);
        m.bind(g.shader.attributes);
        m.draw();
        m.unbind(g.shader.attributes);
        for (var a = e.shadow_casters, f = 0;f < a.length;++f) {
          var h = a[f], k = h.get_component(gb.ces_base_component.type.geometry);
          h.get_component(gb.ces_base_component.type.material).get_material(b, c) && (k = k.mesh, h = gb.ces_transformation_component.get_absolute_transformation(h, !1), g.shader.set_mat4(h, gb.shader.uniform_type.mat_m), k.bind(g.shader.attributes), k.draw(), k.unbind(g.shader.attributes));
        }
        gl.colorMask(!0, !0, !0, !0);
        gl.depthMask(!0);
        l.unbind(b, c, g);
      }(), function() {
        var d = gb.ces_transformation_component.get_absolute_transformation(a, !0);
        g.stencil_function = gl.EQUAL;
        g.stencil_function_parameter_1 = 1;
        g.stencil_function_parameter_2 = 255;
        g.stencil_mask_parameter = 0;
        g.blending_function_source = gl.SRC_ALPHA;
        g.blending_function_destination = gl.ONE;
        g.set_custom_shader_uniform(0, gb.ces_render_system.light_mask_vs_flag_uniform);
        g.set_custom_shader_uniform(0, gb.ces_render_system.light_mask_fs_flag_uniform);
        l.bind(b, c, g);
        g.shader.set_mat4(d, gb.shader.uniform_type.mat_m);
        n.bind(g.shader.attributes);
        n.draw();
        n.unbind(g.shader.attributes);
        l.unbind(b, c, g);
      }(), gl.colorMask(!1, !1, !1, !1), gl.depthMask(!1), g.stencil_function = gl.ALWAYS, g.stencil_function_parameter_1 = 0, g.stencil_function_parameter_2 = 255, g.stencil_mask_parameter = 1, g.set_custom_shader_uniform(1, gb.ces_render_system.light_mask_vs_flag_uniform), g.set_custom_shader_uniform(1, gb.ces_render_system.light_mask_fs_flag_uniform), l.bind(b, c, g), g.shader.set_mat4((new gb.mat4).identity(), gb.shader.uniform_type.mat_m), this.screed_quad_mesh.bind(g.shader.attributes), this.screed_quad_mesh.draw(), 
      this.screed_quad_mesh.unbind(g.shader.attributes), gl.colorMask(!0, !0, !0, !0), gl.depthMask(!0), l.unbind(b, c, g));
    }
    f = a.children;
    for (h = 0;h < f.length;++h) {
      this.draw_recursively_lights(f[h], b, c);
    }
  }
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"ces_touches_system", extend:gb.ces_base_system, init:function() {
  this.m_type = gb.ces_base_system.type.touches;
  this.m_events = [];
  this.m_captured_entities = [];
}, release:function() {
}, methods:{on_feed_start:function() {
}, on_feed:function(a) {
  for (;0 !== this.m_events.length;) {
    var b = this.m_events.pop(), c = this.intersected_entity(a, b.state, b.point);
    if (b.state === gb.input_context.state.released) {
      for (var d = this.m_captured_entities.length, e = 0;e < d;++e) {
        for (var f = this.m_captured_entities[e], h = f.get_component(gb.ces_base_component.type.touch_recognize), h = h.get_callbacks(b.state), l = h.length, k = 0;k < l;++k) {
          var g = h[k];
          g(f, b.state, b.point);
        }
      }
      this.m_captured_entities = [];
    }
    if (c) {
      for (b.state === gb.input_context.state.pressed && (d = this.m_captured_entities.findIndex(function(a) {
        return a === c;
      }), -1 === d && this.m_captured_entities.push(c)), h = c.get_component(gb.ces_base_component.type.touch_recognize), h = h.get_callbacks(b.state), l = h.length, console.log(l), e = 0;e < l;++e) {
        g = h[e], d = this.m_captured_entities.findIndex(function(a) {
          return a === c;
        }), -1 !== d && g(c, b.state, b.point);
      }
    }
    if (b.state === gb.input_context.state.dragged) {
      for (d = this.m_captured_entities.length, e = 0;e < d;++e) {
        for (f = this.m_captured_entities[e], h = f.get_component(gb.ces_base_component.type.touch_recognize), h = h.get_callbacks(b.state), l = h.length, k = 0;k < l;++k) {
          g = h[k], g(f, b.state, b.point);
        }
      }
    }
  }
}, on_feed_end:function() {
}, intersected_entity:function(a, b, c) {
  for (var d = null, e = a.children, f = e.length, h = null, l = 0;l < f;++l) {
    h = e[l], (h = this.intersected_entity(h, b, c)) && (d = h);
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
oop.define_class({namespace:"gb", name:"ces_systems_feeder", init:function() {
  this.m_systems = [];
  this.m_root = null;
  var a = document.getElementById("main_container");
  this.m_fps_meter = new FPSMeter(a, {position:"absolute", zIndex:10, left:"auto", top:"0px", right:"0px", bottom:"auto"});
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
  this.m_fps_meter.tick();
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
}, methods:{}, static_methods:{}});
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
    return this.get_component(gb.ces_base_component.type.geometry).size;
  }, set:function(a) {
    this.get_component(gb.ces_base_component.type.geometry).size = a;
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
oop.define_class({namespace:"gb", name:"grid", extend:gb.game_object, constants:{color_uniform:"u_color"}, init:function() {
  var a = new gb.ces_material_component;
  this.add_component(a);
  a = new gb.ces_geometry_freeform_component;
  this.add_component(a);
  this.m_color = new gb.vec4(0);
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
    b && b();
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
  var h = new gb.grid;
  this.m_game_objects.push(h);
  h.get_component(gb.ces_base_component.type.geometry).mesh = gb.mesh_constructor.create_grid(b, c, d, e);
  c = h.bound;
  b = [];
  b.push(new gb.vec2(c.x, c.y));
  b.push(new gb.vec2(c.z, c.y));
  b.push(new gb.vec2(c.z, c.w));
  b.push(new gb.vec2(c.x, c.w));
  c = new gb.ces_convex_hull_component;
  c.generate_convex_hull(b);
  h.add_component(c);
  var l = this;
  this.m_configurations_accessor.get_sprite_configuration(a, function(a) {
    l.add_materials(h, a.materials_configurations);
    f && f();
  });
  return h;
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"game_loop", init:function() {
  this.m_listeners = [];
}, release:function() {
}, methods:{on_update:function() {
  for (var a = this.m_listeners.length, b = null, c = 0;c < a;++c) {
    b = this.m_listeners[c], b.on_update(0);
  }
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
  this.m_input_context = new gb.input_context;
  this.m_scene = null;
  Object.defineProperty(this, "guid", {get:function() {
    return this.m_guid;
  }});
}, release:function() {
}, methods:{on_activated:function(a, b, c) {
  this.m_configurations_accessor = a;
  this.m_resources_accessor = b;
  var d = new gb.ces_render_system, e = d.render_pipeline, f = this;
  this.m_configurations_accessor.get_transition_configuration(this.m_guid, function(a) {
    if (null !== a.ws_techniques_configurations) {
      for (var b = 0;b < a.ws_techniques_configurations.length;++b) {
        var k = a.ws_techniques_configurations[b], g = Math.min(gl.viewport_width, k.screen_width), n = Math.min(gl.viewport_height, k.screen_height), g = new gb.render_technique_ws(g, n, k.technique_name, k.index, k.num_passes), n = new gb.vec4(k.clear_color_r, k.clear_color_g, k.clear_color_b, k.clear_color_a);
        g.clear_color = n;
        e.add_ws_render_technique(k.technique_name, k.index, g);
        f.m_resources_accessor.add_custom_resource(k.technique_name + ".color", g.color_attachment_texture);
        f.m_resources_accessor.add_custom_resource(k.technique_name + ".depth", g.depth_attachment_texture);
      }
    }
    if (null !== a.ss_techniques_configurations) {
      for (b = 0;b < a.ss_techniques_configurations.length;++b) {
        var k = a.ss_techniques_configurations[b], g = k.material_configuration, m = gb.material.construct(g);
        gb.material.set_shader(m, g, f.m_resources_accessor);
        gb.material.set_textures(m, g, f.m_resources_accessor);
        g = Math.min(gl.viewport_width, k.screen_width);
        n = Math.min(gl.viewport_height, k.screen_height);
        g = new gb.render_technique_ss(g, n, k.technique_name, 0, m);
        e.add_ss_render_technique(k.technique_name, g);
        f.m_resources_accessor.add_custom_resource(k.technique_name + ".color", g.color_attachment_texture);
      }
    }
    g = a.main_technique_configuration.material_configuration;
    m = gb.material.construct(g);
    gb.material.set_shader(m, g, f.m_resources_accessor);
    gb.material.set_textures(m, g, f.m_resources_accessor);
    e.create_main_render_technique(m);
    a = new gb.scene_fabricator;
    a.configurations_accessor = f.m_configurations_accessor;
    a.resources_accessor = f.m_resources_accessor;
    f.m_scene = new gb.scene_graph(f);
    f.m_scene.fabricator = a;
    c(f.m_scene);
    f.m_systems_feeder.root = f.m_scene;
    f.m_systems_feeder.add_system(d);
    a = new gb.ces_deferred_lighting_system;
    f.m_systems_feeder.add_system(a);
    a = new gb.ces_touches_system;
    f.m_input_context.add_listener(a);
    f.m_systems_feeder.add_system(a);
    loop.add_listener(f.m_systems_feeder);
  });
}, on_deactivated:function() {
}}, static_methods:{}});
oop.define_class({namespace:"gb", name:"game_controller", init:function() {
  this.m_current_transition = null;
  this.m_transitions = [];
  this.resource_accessor = new gb.resource_accessor;
  this.configuration_accessor = new gb.configuration_accessor;
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
    this.m_current_transition.on_activated(this.configuration_accessor, this.resource_accessor, b);
  }
}}, static_methods:{}});


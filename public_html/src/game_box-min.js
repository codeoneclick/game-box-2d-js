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
    var k = a.init;
    if (!k || "function" !== typeof k) {
      throw Error("class must have init method");
    }
    var l = a.release;
    if (!l || "function" !== typeof l) {
      throw Error("class must have release method");
    }
    var e = a.extend;
    if (e && "function" !== typeof e) {
      throw Error("parent constructor must be function");
    }
    var c = null;
    if (e) {
      c = function() {
        e.apply(this, arguments);
        c.prototype.init.apply(this, arguments);
      };
      if (e === c) {
        throw Error("class cannot extend himself");
      }
      var n = new Function;
      n.prototype = e.prototype;
      c.prototype = new n;
      c.prototype.constructor = c;
    } else {
      c = function() {
        c.prototype.init.apply(this, arguments);
      };
    }
    c.prototype.init = k;
    c.prototype.release = l;
    var f = a.methods;
    if (f) {
      for (var d in f) {
        if ("function" !== typeof f[d]) {
          throw Error("class method must be function");
        }
        c.prototype[d] = f[d];
      }
    }
    var g = a.static_methods;
    if (g) {
      for (d in g) {
        if ("function" !== typeof g[d]) {
          throw Error("class method must be function");
        }
        console.log("add static method");
        c[d] = g[d];
      }
    }
    var h = a.constants;
    if (h) {
      for (var m in h) {
        if ("function" === typeof h[m]) {
          throw Error("class constant cannot be function");
        }
        c[m] = h[m];
      }
    }
    oop.global[b] = c;
  } catch (p) {
    console.error("class_definition --\x3e"), console.error(a);
  } finally {
    console.warn("class defined: ", a.name);
  }
}};
oop.define_class({namespace:"gb", name:"resource_transfering_data", constants:{type:{undefined:0, shader:1, texture:2}}, init:function() {
  this.m_type = resource_transfering_data.type.undefined;
  Object.defineProperty(this, "type", {get:function() {
    return this.m_type;
  }});
}, release:function() {
}});
oop.define_class({namespace:"gb", name:"shader_transfering_data", extend:resource_transfering_data, init:function() {
  this.m_type = resource_transfering_data.type.shader;
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
oop.define_class({namespace:"gb", name:"texture_transfering_data", extend:resource_transfering_data, init:function() {
  this.m_type = resource_transfering_data.type.texture;
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
  this.m_type = resource_base.type.undefined;
  this.m_status = resource_base.status.unloaded;
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
}, release:function() {
}, methods:{on_resource_loaded:function(a) {
  for (var b = 0;b < this.m_callbacks.length;++b) {
    (0,this.m_callbacks[b])(a ? this : null, this.m_userdata_container[b]);
  }
  this.m_callbacks = [];
  this.m_userdata_container = [];
}, add_resource_loading_callback:function(a, b) {
  _.isFunction(a) ? _.contains(this.m_callbacks, a) ? console.error("can't add same callback for resource loading") : this.get_status() === resource_base.status.commited ? a(this, b) : (this.m_callbacks.push(a), this.m_userdata_container.push(b)) : console.error("resource loading callback isn't function");
}, remove_resource_loading_callback:function(a) {
  a = _.indexOf(this.m_callbacks, a);
  -1 !== a ? (this.m_callbacks.splice(a, 1), this.m_userdatas.splice(a, 1)) : console.error("resource doesn't contain this callback");
}}});
oop.define_class({namespace:"gb", name:"shader_uniform", constants:{type:{undefined:-1, mat4:0, mat4_array:1, vec4:2, vec4_array:3, vec3:4, vec3_array:5, vec2:6, vec2_array:7, f32:8, f32_array:9, i32:10, i32_array:11, sampler:12}}, init:function() {
  this.m_type = shader_uniform.type.undefined;
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
oop.define_class({namespace:"gb", name:"shader", extend:resource_base, constants:{sampler_type:{sampler_01:0, sampler_02:1, sampler_03:2, sampler_04:3, sampler_05:4, sampler_06:5, sampler_07:6, sampler_08:7, max:8}, attribute_type:{position:0, texcoord:1, color:2, max:3}, uniform_type:{mat_m:0, mat_p:1, mat_v:2, max:3}, attribute_names:{a_position:"a_position", a_texcoord:"a_texcoord", a_color:"a_color"}, uniform_names:{u_mat_m:"u_mat_m", u_mat_p:"u_mat_p", u_mat_v:"u_mat_v"}, sampler_names:{sampler_01:"sampler_01", 
sampler_02:"sampler_02", sampler_03:"sampler_03", sampler_04:"sampler_04", sampler_05:"sampler_05", sampler_06:"sampler_06", sampler_07:"sampler_07", sampler_08:"sampler_08"}}, init:function() {
  this.m_type = resource_base.type.shader;
  this.m_handler = -1;
  this.m_uniforms = [];
  this.m_uniforms[shader.uniform_type.max - 1] = -1;
  this.m_samplers = [];
  this.m_samplers[shader.sampler_type.max - 1] = -1;
  this.m_attributes = [];
  this.m_attributes[shader.attribute_type.max - 1] = -1;
  this.m_custom_uniforms = [];
  this.m_custom_attributes = [];
  this.m_cached_uniforms = [];
  Object.defineProperty(this, "attributes", {get:function() {
    return this.m_attributes;
  }});
}, release:function() {
}, methods:{setup:function() {
  this.m_uniforms[shader.uniform_type.mat_m] = gl.getUniformLocation(this.m_handler, shader.uniform_names.u_mat_m);
  this.m_uniforms[shader.uniform_type.mat_v] = gl.getUniformLocation(this.m_handler, shader.uniform_names.u_mat_v);
  this.m_uniforms[shader.uniform_type.mat_p] = gl.getUniformLocation(this.m_handler, shader.uniform_names.u_mat_p);
  this.m_samplers[shader.sampler_type.sampler_01] = gl.getUniformLocation(this.m_handler, shader.sampler_names.sampler_01);
  this.m_samplers[shader.sampler_type.sampler_02] = gl.getUniformLocation(this.m_handler, shader.sampler_names.sampler_02);
  this.m_samplers[shader.sampler_type.sampler_03] = gl.getUniformLocation(this.m_handler, shader.sampler_names.sampler_03);
  this.m_samplers[shader.sampler_type.sampler_04] = gl.getUniformLocation(this.m_handler, shader.sampler_names.sampler_04);
  this.m_samplers[shader.sampler_type.sampler_05] = gl.getUniformLocation(this.m_handler, shader.sampler_names.sampler_05);
  this.m_samplers[shader.sampler_type.sampler_06] = gl.getUniformLocation(this.m_handler, shader.sampler_names.sampler_06);
  this.m_samplers[shader.sampler_type.sampler_07] = gl.getUniformLocation(this.m_handler, shader.sampler_names.sampler_07);
  this.m_samplers[shader.sampler_type.sampler_08] = gl.getUniformLocation(this.m_handler, shader.sampler_names.sampler_08);
  this.m_attributes[shader.attribute_type.position] = gl.getAttribLocation(this.m_handler, shader.attribute_names.a_position);
  this.m_attributes[shader.attribute_type.texcoord] = gl.getAttribLocation(this.m_handler, shader.attribute_names.a_texcoord);
  this.m_attributes[shader.attribute_type.color] = gl.getAttribLocation(this.m_handler, shader.attribute_names.a_color);
}, on_transfering_data_serialized:function(a) {
  switch(a.type) {
    case resource_transfering_data.type.shader:
      this.m_status = resource_base.status.loaded;
  }
}, on_transfering_data_commited:function(a) {
  switch(a.type) {
    case resource_transfering_data.type.shader:
      this.m_handler = a.handler, this.m_status = resource_base.status.commited, this.setup();
  }
}, get_custom_uniform:function(a) {
  var b = -1;
  "undefined" !== typeof this.m_custom_uniforms[a] ? b = this.m_custom_uniforms[a] : (b = gl.getUniformLocation(this.m_shader_id, a), this.m_custom_uniforms[a] = b);
  return b;
}, set_mat4:function(a, b) {
  this.status !== resource_base.status.commited || "undefined" !== typeof this.m_cached_uniforms[b] && this.m_cached_uniforms[b] === a || ("undefined" === typeof this.m_cached_uniforms[b] && (this.m_cached_uniforms[b] = new shader_uniform), gl.uniformMatrix4fv(this.m_uniforms[b], !1, new Float32Array(a.to_array())), this.m_cached_uniforms[b].mat4_value = a);
}, set_custom_mat4:function(a, b) {
  this.status === resource_base.status.commited && gl.uniformMatrix4fv(this.get_custom_uniform(b), !1, new Float32Array(a.to_array()));
}, set_vec4:function(a, b) {
  this.status !== resource_base.status.commited || "undefined" !== typeof this.m_cached_uniforms[b] && this.m_cached_uniforms[b] === a || ("undefined" === typeof this.m_cached_uniforms[b] && (this.m_cached_uniforms[b] = new shader_uniform), gl.uniform4fv(this.m_uniforms[b], new Float32Array(a.to_array())), this.m_cached_uniforms[b].vec4_value = a);
}, set_custom_vec4:function(a, b) {
  this.status === resource_base.status.commited && gl.uniform4fv(this.get_custom_uniform(b), new Float32Array(a.to_array()));
}, set_vec3:function(a, b) {
  this.status !== resource_base.status.commited || "undefined" !== typeof this.m_cached_uniforms[b] && this.m_cached_uniforms[b] === a || ("undefined" === typeof this.m_cached_uniforms[b] && (this.m_cached_uniforms[b] = new shader_uniform), gl.uniform3fv(this.m_uniforms[b], new Float32Array(a.to_array())), this.m_cached_uniforms[b].vec3_value = a);
}, set_custom_vec3:function(a, b) {
  this.status === resource_base.status.commited && gl.uniform3fv(this.get_custom_uniform(b), new Float32Array(a.to_array()));
}, set_vec2:function(a, b) {
  this.status !== resource_base.status.commited || "undefined" !== typeof this.m_cached_uniforms[b] && this.m_cached_uniforms[b] === a || ("undefined" === typeof this.m_cached_uniforms[b] && (this.m_cached_uniforms[b] = new shader_uniform), gl.uniform2fv(this.m_uniforms[b], new Float32Array(a.to_array())), this.m_cached_uniforms[b].vec2_value = a);
}, set_custom_vec2:function(a, b) {
  this.status === resource_base.status.commited && gl.uniform2fv(this.get_custom_uniform(b), new Float32Array(a.to_array()));
}, set_f32:function(a, b) {
  this.status !== resource_base.status.commited || "undefined" !== typeof this.m_cached_uniforms[b] && this.m_cached_uniforms[b] === a || ("undefined" === typeof this.m_cached_uniforms[b] && (this.m_cached_uniforms[b] = new shader_uniform), gl.uniform1f(this.m_uniforms[b], a), this.m_cached_uniforms[b].f32_value = a);
}, set_custom_f32:function(a, b) {
  this.status === resource_base.status.commited && gl.uniform1f(this.get_custom_uniform(b), a);
}, set_i32:function(a, b) {
  this.status !== resource_base.status.commited || "undefined" !== typeof this.m_cached_uniforms[b] && this.m_cached_uniforms[b] === a || ("undefined" === typeof this.m_cached_uniforms[b] && (this.m_cached_uniforms[b] = new shader_uniform), gl.uniform1i(this.m_uniforms[b], a), this.m_cached_uniforms[b].i32_value = a);
}, set_custom_i32:function(a, b) {
  this.status === resource_base.status.commited && gl.uniform1i(this.get_custom_uniform(b), a);
}, set_texture:function(a, b) {
  this.status === resource_base.status.commited && b < shader.sampler_type.max && (gl.activeTexture(gl.TEXTURE0 + b), a.bind(), gl.uniform1i(this.m_samplers[b], b));
}, bind:function() {
  this.status === resource_base.status.commited && gl.useProgram(this.m_handler);
}, unbind:function() {
  this.status === resource_base.status.commited && gl.useProgram(null);
}}});
var gb = {REVISION:"1", resource_base:resource_base};
"function" === typeof define && define.amd ? define("gb", gb) : "undefined" !== typeof exports && "undefined" !== typeof module && (module.exports = gb);


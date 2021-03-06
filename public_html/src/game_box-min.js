var gb = {REVISION:"1"};
"function" === typeof define && define.amd ? define("gb", gb) : "undefined" !== typeof exports && "undefined" !== typeof module && (module.exports = gb);
var g_tag = 0;
gb.ces_entity = function() {
  this.m_tag = "ces_entity" + g_tag++;
  this.m_components = [];
  for (var a = 0;a < gb.ces_component_type.max;++a) {
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
};
gb.ces_entity.prototype = {constructor:gb.ces_entity, add_component:function(a) {
  this.m_components[a.type] = a;
}, remove_component:function(a) {
  a instanceof gb.ces_base_component ? this.m_components[a.type] = null : a < this.m_components.length && (this.m_components[a] = null);
}, remove_components:function() {
  this.m_components = [];
  for (var a = 0;a < gb.ces_component_type.max;++a) {
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
  var a = this.parent ? this.parent.get_component(gb.ces_component_type.scene) : null;
  !this.is_component_exist(gb.ces_component_type.scene) && a && this.add_component(a);
  for (a = 0;a < this.m_children.length;++a) {
    this.m_children[a].add_scene_component();
  }
}, remove_scene_component:function() {
  for (var a = 0;a < this.m_children.length;++a) {
    this.m_children[a].remove_scene_component();
  }
  this.remove_component(gb.ces_component_type.scene);
}};
gb.ces_systems_feeder = function() {
  this.m_systems = [];
  this.m_root = null;
  this.m_fps_meter = new FPSMeter;
  Object.defineProperty(this, "root", {set:function(a) {
    this.m_root = a;
  }});
};
gb.ces_systems_feeder.prototype = {constructor:gb.ces_systems_feeder, on_update:function(a) {
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
}};
gb.ces_component_type = {undefined:-1, transformation:0, material:1, geometry:2, scene:3, light:4, light_mask:5, convex_hull:6, max:7};
gb.ces_base_component = function() {
  this.m_type = gb.ces_component_type.undefined;
  Object.defineProperty(this, "type", {get:function() {
    return this.m_type;
  }});
};
gb.ces_base_component.prototype = {constructor:gb.ces_base_component};
gb.ces_convex_hull_component = function() {
  gb.ces_base_component.call(this);
  this.m_type = gb.ces_component_type.convex_hull;
  this.m_center = new gb.vec2(0);
  this.m_oriented_vertices = [];
  Object.defineProperty(this, "center", {get:function() {
    return this.m_center;
  }});
  Object.defineProperty(this, "oriented_vertices", {get:function() {
    return this.m_oriented_vertices;
  }});
};
gb.ces_convex_hull_component.prototype = Object.create(gb.ces_base_component.prototype);
gb.ces_convex_hull_component.prototype.constructor = gb.ces_convex_hull_component;
gb.ces_convex_hull_component.prototype.update_convex_hull = function(a) {
  if (!(3 > a.length)) {
    for (var b = 0, c = 0;c < a.length;++c) {
      a[c].m_position.x < a[b].m_position.x && (b = c);
    }
    var d = b, e;
    do {
      e = (d + 1) % a.length;
      for (c = 0;c < a.length;++c) {
        gb.math.orientation(a[d].m_position, a[c].m_position, a[e].m_position) === gb.vertices_orientation.counterclockwise && (e = c);
      }
      this.m_oriented_vertices.push(a[e].m_position);
      d = e;
    } while (d !== b);
    a = new gb.vec2(INT16_MAX);
    b = new gb.vec2(INT16_MIN);
    for (c = 0;c < this.m_oriented_vertices.length;++c) {
      a = gb.vec2.min(this.m_oriented_vertices[c], a), b = gb.vec2.max(this.m_oriented_vertices[c], b);
    }
    this.m_center = gb.vec2.sub(b, a).divide_scalar(2);
  }
};
gb.ces_geometry_component = function() {
  gb.ces_base_component.call(this);
  this.m_type = gb.ces_component_type.geometry;
  this.m_mesh = null;
  Object.defineProperty(this, "mesh", {configurable:!0, get:function() {
    return this.m_mesh;
  }});
};
gb.ces_geometry_component.prototype = Object.create(gb.ces_base_component.prototype);
gb.ces_geometry_component.prototype.constructor = gb.ces_geometry_component;
gb.ces_geometry_freeform_component = function() {
  gb.ces_geometry_component.call(this);
  Object.defineProperty(this, "mesh", {get:function() {
    return this.m_mesh;
  }, set:function(a) {
    this.m_mesh = a;
  }});
};
gb.ces_geometry_freeform_component.prototype = Object.create(gb.ces_geometry_component.prototype);
gb.ces_geometry_freeform_component.prototype.constructor = gb.ces_geometry_freeform_component;
gb.ces_geometry_quad_component = function() {
  gb.ces_geometry_component.call(this);
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
};
gb.ces_geometry_quad_component.prototype = Object.create(gb.ces_geometry_component.prototype);
gb.ces_geometry_quad_component.prototype.constructor = gb.ces_geometry_quad_component;
gb.ces_geometry_quad_component.prototype.update_mesh_position_attributes = function() {
  var a = new gb.vec2(this.m_frame.z - this.m_pivot.x, this.m_frame.w - this.m_pivot.y), b = new gb.vec2(a.x - this.m_frame.z, a.y - this.m_frame.w), a = new gb.vec4(b.x, a.y, a.x, b.y), b = this.m_mesh.vbo.lock();
  b[0].m_position = new gb.vec2(a.x, a.z);
  b[1].m_position = new gb.vec2(a.x, a.w);
  b[2].m_position = new gb.vec2(a.y, a.z);
  b[3].m_position = new gb.vec2(a.y, a.w);
  this.m_mesh.vbo.unlock();
};
gb.ces_light_component = function() {
  gb.ces_base_component.call(this);
  this.m_type = gb.ces_component_type.light;
  this.m_shadow_casters = [];
  Object.defineProperty(this, "shadow_casters", {get:function() {
    return this.m_shadow_casters;
  }});
};
gb.ces_light_component.prototype = Object.create(gb.ces_base_component.prototype);
gb.ces_light_component.prototype.constructor = gb.ces_light_component;
gb.ces_light_component.prototype.add_shadow_caster = function(a) {
  this.m_shadow_casters.push(a);
};
gb.ces_light_component.prototype.cleanup = function() {
  this.m_shadow_casters = [];
};
gb.ces_light_mask_component = function() {
  gb.ces_base_component.call(this);
  this.m_type = gb.ces_component_type.light_mask;
  this.m_shadow_casters_vertices = [];
  this.m_shadow_casters_edges = [];
  this.m_vertices = [];
  this.m_indices = [];
  var a = new gb.vbo(1024, gl.STATIC_DRAW), b = new gb.ibo(4096, gl.STATIC_DRAW);
  this.m_mesh = new gb.mesh(a, b, gl.TRIANGLES);
  Object.defineProperty(this, "mesh", {get:function() {
    if (0 === this.m_vertices.length || 0 === this.m_indices.length) {
      this.m_mesh.vbo.unlock(1), this.m_mesh.ibo.unlock(1);
    } else {
      for (var c = this.m_mesh.vbo.lock(), d = 0;d < this.m_vertices.length;++d) {
        c[d].m_position = this.m_vertices[d].m_position;
      }
      a.unlock(this.m_vertices.length);
      c = this.m_mesh.ibo.lock();
      for (d = 0;d < this.m_indices.length;++d) {
        c[d] = this.m_indices[d];
      }
      b.unlock(this.m_indices.length);
    }
    return this.m_mesh;
  }});
};
gb.ces_light_mask_component.prototype = Object.create(gb.ces_base_component.prototype);
gb.ces_light_mask_component.prototype.constructor = gb.ces_light_mask_component;
gb.ces_light_mask_component.prototype.update_mask_geometry = function(a, b) {
  for (var c = 0;c < b.length;++c) {
    var d = (c + 1) % b.length;
    this.m_shadow_casters_edges.push({point_01:gb.mat4.multiply_vec2(b[c], a), point_02:gb.mat4.multiply_vec2(b[d], a)});
    this.m_shadow_casters_vertices.push(gb.mat4.multiply_vec2(b[c], a));
  }
};
gb.ces_light_mask_component.prototype.generate_mask_mesh = function(a) {
  for (var b = [], c = 0;c < this.m_shadow_casters_vertices.length;++c) {
    var d = this.m_shadow_casters_vertices[c], e = Math.atan2(d.y - a.y, d.x - a.x);
    b.push(e - 1E-4);
    b.push(e);
    b.push(e + 1E-4);
  }
  d = [];
  for (c = 0;c < b.length;++c) {
    for (var e = b[c], f = new gb.vec2(Math.cos(e), Math.sin(e)), l = a, m = gb.vec2.add(a, f), k = INT16_MAX, h = new gb.vec2(INT16_MIN), g = 0;g < this.m_shadow_casters_edges.length;++g) {
      f = gb.math.intersect(l, m, this.m_shadow_casters_edges[g].point_01, this.m_shadow_casters_edges[g].point_02), f.intersected && f.distance < k && (k = f.distance, h = f.point);
    }
    h.equals(new gb.vec2(INT16_MIN)) || -1 === d.findIndex(function(a) {
      return a.point.equals(h);
    }) && d.push({point:h, angle:e});
  }
  d.sort(function(a, b) {
    return a.angle - b.angle;
  });
  for (c = 0;c < d.length + 1;++c) {
    this.m_vertices[c] = new gb.vertex_attribute;
  }
  this.m_vertices[0].m_position = a;
  a = 1;
  for (c = 0;c < d.length;++c) {
    f = d[c], this.m_vertices[a++].m_position = f.point;
  }
  for (c = 1;c < this.m_vertices.length;++c) {
    a = Math.max((c + 1) % this.m_vertices.length, 1), this.m_indices.push(0), this.m_indices.push(c), this.m_indices.push(a);
  }
};
gb.ces_light_mask_component.prototype.cleanup = function() {
  this.m_shadow_casters_vertices = [];
  this.m_shadow_casters_edges = [];
  this.m_vertices = [];
  this.m_indices = [];
};
gb.ces_material_component = function() {
  gb.ces_base_component.call(this);
  this.m_type = gb.ces_component_type.material;
  this.m_materials = [];
};
gb.ces_material_component.prototype = Object.create(gb.ces_base_component.prototype);
gb.ces_material_component.prototype.constructor = gb.ces_material_component;
gb.ces_material_component.prototype.add_material = function(a, b, c) {
  "undefined" === typeof this.m_materials[a] && (this.m_materials[a] = []);
  this.m_materials[a][b] = c;
};
gb.ces_material_component.prototype.remove_material = function(a, b) {
  "undefined" !== typeof this.m_materials[a] && this.m_materials[a].length > b && this.m_materials[a].splice(b, 1);
};
gb.ces_material_component.prototype.get_material = function(a, b) {
  var c = null;
  "undefined" !== typeof this.m_materials[a] && this.m_materials[a].length > b && (c = this.m_materials[a][b]);
  return c;
};
gb.ces_material_component.prototype.bind = function(a, b, c) {
  var d = c;
  "undefined" === typeof c && (d = this.get_material(a, b));
  d.bind();
};
gb.ces_material_component.prototype.unbind = function(a, b, c) {
  var d = c;
  "undefined" === typeof c && (d = this.get_material(a, b));
  d.unbind();
};
gb.ces_material_component.prototype.set_custom_shader_uniform = function(a, b, c, d) {
  if (4 == arguments.length) {
    var e = this.get_material(c, d);
    e && e.set_custom_shader_uniform(a, b);
  } else {
    for (e in this.m_materials) {
      for (var f = 0;f < this.m_materials[e].length;++f) {
        this.m_materials[e][f].set_custom_shader_uniform(a, b);
      }
    }
  }
};
gb.ces_scene_component = function() {
  gb.ces_base_component.call(this);
  this.m_type = gb.ces_component_type.scene;
  this.m_scene = null;
  Object.defineProperty(this, "scene", {set:function(a) {
    this.m_scene = a;
  }, get:function() {
    return this.m_scene;
  }});
  Object.defineProperty(this, "camera", {get:function() {
    return this.m_scene.camera;
  }});
};
gb.ces_scene_component.prototype = Object.create(gb.ces_base_component.prototype);
gb.ces_scene_component.prototype.constructor = gb.ces_scene_component;
gb.ces_transformation_component = function() {
  gb.ces_base_component.call(this);
  this.m_type = gb.ces_component_type.transformation;
  this.m_position = new gb.vec2(0);
  this.m_rotation = 0;
  this.m_scale = new gb.vec2(1);
  this.m_matrix_t = (new gb.mat4).identity();
  this.m_matrix_r = (new gb.mat4).identity();
  this.m_matrix_s = (new gb.mat4).identity();
  this.m_matrix_m = (new gb.mat4).identity();
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
  Object.defineProperty(this, "scale", {set:function(a) {
    this.m_scale = a;
    this.m_matrix_s.scale(this.m_scale.x, this.m_scale.y, 1);
    this.m_is_matrix_m_computed = !1;
  }, get:function() {
    return this.m_scale;
  }});
  Object.defineProperty(this, "matrix_m", {get:function() {
    this.m_is_matrix_m_computed || (this.m_matrix_m = gb.mat4.multiply(gb.mat4.multiply(this.m_matrix_t, this.m_matrix_r), this.m_matrix_s));
    return this.m_matrix_m;
  }});
  this.position = new gb.vec2(0);
  this.rotation = 0;
  this.scale = new gb.vec2(1);
};
gb.ces_transformation_component.prototype = Object.create(gb.ces_base_component.prototype);
gb.ces_transformation_component.prototype.constructor = gb.ces_transformation_component;
gb.ces_material_component.add_material = function(a, b, c, d) {
  (a = a.get_component(gb.ces_component_type.material)) && a.add_material(b, c, d);
};
gb.ces_material_component.remove_material = function(a, b, c) {
  (a = a.get_component(gb.ces_component_type.material)) && a.remove_material(b, c);
};
gb.ces_material_component.get_material = function(a, b, c) {
  var d = null;
  (a = a.get_component(gb.ces_component_type.material)) && (d = a.get_material(b, c));
  return d;
};
gb.ces_system_type = {undefined:-1, render:0, deferred_lighting:1};
gb.ces_base_system = function() {
  this.m_type = gb.ces_system_type.undefined;
  this.m_priority = 0;
  Object.defineProperty(this, "type", {get:function() {
    return this.m_type;
  }});
  Object.defineProperty(this, "priority", {get:function() {
    return this.m_priority;
  }});
};
gb.ces_base_system.prototype = {constructor:gb.ces_base_system};
gb.ces_deferred_lighting_system = function() {
  gb.ces_base_system.call(this);
  this.m_type = gb.ces_system_type.deferred_lighting;
  this.m_light_casters = [];
  this.m_shadow_casters = [];
};
gb.ces_deferred_lighting_system.prototype = Object.create(gb.ces_base_system.prototype);
gb.ces_deferred_lighting_system.prototype.constructor = gb.ces_deferred_lighting_system;
gb.ces_deferred_lighting_system.prototype.on_feed_start = function() {
  this.m_light_casters = [];
  this.m_shadow_casters = [];
};
gb.ces_deferred_lighting_system.prototype.on_feed = function(a) {
  this.update_recursively(a);
};
gb.ces_deferred_lighting_system.prototype.on_feed_end = function() {
  for (var a = 0;a < this.m_light_casters.length;++a) {
    var b = this.m_light_casters[a].get_component(gb.ces_component_type.light);
    b.cleanup();
    var c = this.m_light_casters[a].get_component(gb.ces_component_type.light_mask);
    c.cleanup();
    for (var d = this.m_light_casters[a].get_component(gb.ces_component_type.transformation), e = (new gb.mat4).identity(), f = this.m_light_casters[a].parent;f;) {
      var l = f.get_component(gb.ces_component_type.transformation), e = gb.mat4.multiply(e, l.matrix_m), f = f.parent
    }
    d = gb.mat4.multiply_vec2(d.position, e);
    for (e = 0;e < this.m_shadow_casters.length;++e) {
      for (var f = this.m_shadow_casters[e].get_component(gb.ces_component_type.convex_hull), l = this.m_shadow_casters[e].get_component(gb.ces_component_type.transformation), m = (new gb.mat4).identity(), k = this.m_shadow_casters[e].parent;k;) {
        var h = k.get_component(gb.ces_component_type.transformation), m = gb.mat4.multiply(m, h.matrix_m), k = k.parent
      }
      m = gb.mat4.multiply(m, l.matrix_m);
      c.update_mask_geometry(m, f.oriented_vertices);
      b.add_shadow_caster(this.m_shadow_casters[e]);
    }
    c.generate_mask_mesh(d);
  }
};
gb.ces_deferred_lighting_system.prototype.update_recursively = function(a) {
  a.get_component(gb.ces_component_type.light) && this.m_light_casters.push(a);
  a.get_component(gb.ces_component_type.convex_hull) && this.m_shadow_casters.push(a);
  a = a.children;
  for (var b = 0;b < a.length;++b) {
    this.update_recursively(a[b]);
  }
};
gb.ces_render_system = function() {
  gb.ces_base_system.call(this);
  this.m_render_pipeline = new gb.render_pipeline;
  this.m_type = gb.ces_system_type.render;
  Object.defineProperty(this, "render_pipeline", {get:function() {
    return this.m_render_pipeline;
  }});
  this.m_screed_quad_mesh = gb.mesh_constructor.create_screen_quad();
  Object.defineProperty(this, "screed_quad_mesh", {get:function() {
    return this.m_screed_quad_mesh;
  }});
  this.k_shadow_color_uniform = "u_shadow_color";
  this.k_light_mask_vs_flag_uniform = "u_mask_flag_vs";
  this.k_light_mask_fs_flag_uniform = "u_mask_flag_fs";
  this.k_shadow_color_for_casters = new gb.vec4(1);
  this.k_shadow_color_for_receivers = new gb.vec4(0, 0, 0, .75);
};
gb.ces_render_system.prototype = Object.create(gb.ces_base_system.prototype);
gb.ces_render_system.prototype.constructor = gb.ces_render_system;
gb.ces_render_system.prototype.on_feed_start = function() {
  this.m_render_pipeline.on_draw_begin();
};
gb.ces_render_system.prototype.on_feed = function(a) {
  for (var b = this.m_render_pipeline.ws_render_techniques, c = 0;c < b.length;++c) {
    var d = b[c], e = d.name;
    d.bind();
    for (var f = 0;f < d.num_passes;++f) {
      this.draw_recursively_lights(a, e, f), this.draw_recursively(a, e, f);
    }
    d.unbind();
  }
};
gb.ces_render_system.prototype.on_feed_end = function() {
  this.m_render_pipeline.on_draw_end();
};
gb.ces_render_system.prototype.draw_recursively = function(a, b, c) {
  var d = a.get_component(gb.ces_component_type.scene);
  if (d) {
    var e = a.get_component(gb.ces_component_type.light), f = a.get_component(gb.ces_component_type.transformation), l = a.get_component(gb.ces_component_type.material), m = a.get_component(gb.ces_component_type.geometry);
    if (!e && l && m && f && (e = l.get_material(b, c), m = m.mesh, e && e.shader && e.shader.get_status() === gb.resource_status.commited && m && a.visible)) {
      e.set_custom_shader_uniform(this.k_shadow_color_for_casters, this.k_shadow_color_uniform);
      l.bind(b, c, e);
      e.shader.set_mat4(d.camera.matrix_p, gb.shader_uniform_type.mat_p);
      e.shader.set_mat4(d.camera.matrix_v, gb.shader_uniform_type.mat_v);
      for (var d = (new gb.mat4).identity(), k = a.parent;k;) {
        k.get_component(gb.ces_component_type.transformation), k = k.parent;
      }
      d = gb.mat4.multiply(d, f.matrix_m);
      e.shader.set_mat4(d, gb.shader_uniform_type.mat_m);
      m.bind(e.shader.get_attributes());
      m.draw();
      m.unbind(e.shader.get_attributes());
      l.unbind(b, c, e);
    }
    a = a.children;
    for (f = 0;f < a.length;++f) {
      this.draw_recursively(a[f], b, c);
    }
  }
};
gb.ces_render_system.prototype.draw_recursively_lights = function(a, b, c) {
  var d = a.get_component(gb.ces_component_type.scene);
  if (d) {
    var e = this, f = a.get_component(gb.ces_component_type.light), l = a.get_component(gb.ces_component_type.light_mask), m = a.get_component(gb.ces_component_type.transformation), k = a.get_component(gb.ces_component_type.material), h = a.get_component(gb.ces_component_type.geometry);
    if (f && k && h && m) {
      var g = k.get_material(b, c), n = h.mesh, p = l.mesh;
      g && a.visible && g.shader && g.shader.get_status() === gb.resource_status.commited && n && p && (function() {
        gl.colorMask(!1, !1, !1, !1);
        gl.depthMask(!1);
        g.stencil_function = gl.ALWAYS;
        g.stencil_function_parameter_1 = 1;
        g.stencil_function_parameter_2 = 255;
        g.stencil_mask_parameter = 1;
        g.set_custom_shader_uniform(0, e.k_light_mask_vs_flag_uniform);
        g.set_custom_shader_uniform(1, e.k_light_mask_fs_flag_uniform);
        k.bind(b, c, g);
        g.shader.set_mat4(d.camera.matrix_p, gb.shader_uniform_type.mat_p);
        g.shader.set_mat4(d.camera.matrix_v, gb.shader_uniform_type.mat_v);
        g.shader.set_mat4((new gb.mat4).identity(), gb.shader_uniform_type.mat_m);
        p.bind(g.shader.get_attributes());
        p.draw();
        p.unbind(g.shader.get_attributes());
        for (var a = f.shadow_casters, l = 0;l < a.length;++l) {
          var h = a[l], m = h.get_component(gb.ces_component_type.transformation), n = h.get_component(gb.ces_component_type.geometry);
          if (h.get_component(gb.ces_component_type.material).get_material(b, c)) {
            for (var n = n.mesh, q = (new gb.mat4).identity(), h = h.parent;h;) {
              h.get_component(gb.ces_component_type.transformation), h = h.parent;
            }
            q = gb.mat4.multiply(q, m.matrix_m);
            g.shader.set_mat4(q, gb.shader_uniform_type.mat_m);
            n.bind(g.shader.get_attributes());
            n.draw();
            n.unbind(g.shader.get_attributes());
          }
        }
        gl.colorMask(!0, !0, !0, !0);
        gl.depthMask(!0);
        k.unbind(b, c, g);
      }(), function() {
        for (var d = (new gb.mat4).identity(), f = a.parent;f;) {
          f.get_component(gb.ces_component_type.transformation), f = f.parent;
        }
        d = gb.mat4.multiply(d, m.matrix_m);
        g.stencil_function = gl.EQUAL;
        g.stencil_function_parameter_1 = 1;
        g.stencil_function_parameter_2 = 255;
        g.stencil_mask_parameter = 0;
        g.blending_function_source = gl.SRC_ALPHA;
        g.blending_function_destination = gl.ONE;
        g.set_custom_shader_uniform(0, e.k_light_mask_vs_flag_uniform);
        g.set_custom_shader_uniform(0, e.k_light_mask_fs_flag_uniform);
        k.bind(b, c, g);
        g.shader.set_mat4(d, gb.shader_uniform_type.mat_m);
        n.bind(g.shader.get_attributes());
        n.draw();
        n.unbind(g.shader.get_attributes());
        k.unbind(b, c, g);
      }(), gl.colorMask(!1, !1, !1, !1), gl.depthMask(!1), g.stencil_function = gl.ALWAYS, g.stencil_function_parameter_1 = 0, g.stencil_function_parameter_2 = 255, g.stencil_mask_parameter = 1, g.set_custom_shader_uniform(1, e.k_light_mask_vs_flag_uniform), g.set_custom_shader_uniform(1, e.k_light_mask_fs_flag_uniform), k.bind(b, c, g), g.shader.set_mat4((new gb.mat4).identity(), gb.shader_uniform_type.mat_m), e.screed_quad_mesh.bind(g.shader.get_attributes()), e.screed_quad_mesh.draw(), e.screed_quad_mesh.unbind(g.shader.get_attributes()), 
      gl.colorMask(!0, !0, !0, !0), gl.depthMask(!0), k.unbind(b, c, g));
    }
    l = a.children;
    for (h = 0;h < l.length;++h) {
      this.draw_recursively_lights(l[h], b, c);
    }
  }
};
gb.configuration_accessor = function() {
};
gb.configuration_accessor.prototype = {constructor:gb.configuration_accessor, get_transition_configuration:function(a, b) {
  (new gb.transition_configuration).serialize(a, function(a) {
    b(a);
  });
}, get_sprite_configuration:function(a, b) {
  (new gb.sprite_configuration).serialize(a, function(a) {
    b(a);
  });
}};
var g_string_to_glenum = null;
gb.configuration_base = function() {
  this.m_configurations = [];
};
gb.configuration_base.string_to_glenum = function() {
  null === g_string_to_glenum && (g_string_to_glenum = [], g_string_to_glenum.GL_FRONT = gl.FRONT, g_string_to_glenum.GL_BACK = gl.BACK, g_string_to_glenum.GL_SRC_COLOR = gl.SRC_ALPHA, g_string_to_glenum.GL_SRC_ALPHA = gl.SRC_ALPHA, g_string_to_glenum.GL_ONE = gl.ONE, g_string_to_glenum.GL_ZERO = gl.ZERO, g_string_to_glenum.GL_ONE_MINUS_SRC_COLOR = gl.ONE_MINUS_SRC_COLOR, g_string_to_glenum.GL_ONE_MINUS_DST_COLOR = gl.ONE_MINUS_DST_COLOR, g_string_to_glenum.GL_ONE_MINUS_SRC_ALPHA = gl.ONE_MINUS_SRC_ALPHA, 
  g_string_to_glenum.GL_ONE_MINUS_DST_ALPHA = gl.ONE_MINUS_DST_ALPHA, g_string_to_glenum.GL_DST_ALPHA = gl.DST_ALPHA, g_string_to_glenum.GL_CONSTANT_ALPHA = gl.CONSTANT_ALPHA, g_string_to_glenum.GL_REPEAT = gl.REPEAT, g_string_to_glenum.GL_CLAMP_TO_EDGE = gl.CLAMP_TO_EDGE, g_string_to_glenum.GL_MIRRORED_REPEAT = gl.MIRRORED_REPEAT, g_string_to_glenum.GL_NEAREST = gl.NEAREST, g_string_to_glenum.GL_LINEAR = gl.LINEAR, g_string_to_glenum.GL_MIPMAP = gl.LINEAR_MIPMAP_NEAREST, g_string_to_glenum.GL_ALWAYS = 
  gl.ALWAYS, g_string_to_glenum.GL_EQUAL = gl.EQUAL, g_string_to_glenum.GL_NOTEQUAL = gl.NOTEQUAL, g_string_to_glenum.GL_FUNC_ADD = gl.FUNC_ADD);
  return g_string_to_glenum;
};
gb.configuration_base.prototype = {constructor:gb.configuration_base, set_configuration:function(a, b, c) {
  this.m_configurations[a] instanceof Object ? 3 === arguments.length ? 0 <= c && c < this.m_configurations[a].length ? this.m_configurations[a][c] = b : this.m_configurations[a].push(b) : this.m_configurations[a].push(b) : (this.m_configurations[a] = [], this.m_configurations[a].push(b));
  return this;
}};
gb.game_object_configuration = function() {
  gb.configuration_base.call(this);
  Object.defineProperty(this, "materials_configurations", {get:function() {
    return this.m_configurations instanceof Object && this.m_configurations.materials_configurations instanceof Object ? this.m_configurations.materials_configurations : null;
  }});
};
gb.game_object_configuration.prototype = Object.create(gb.configuration_base.prototype);
gb.game_object_configuration.prototype.constructor = gb.game_object_configuration;
gb.main_technique_configuration = function() {
  gb.configuration_base.call(this);
  this.json = null;
  Object.defineProperty(this, "material_configuration", {get:function() {
    return this.m_configurations instanceof Object && this.m_configurations.material_configuration instanceof Object && 0 < this.m_configurations.material_configuration.length ? this.m_configurations.material_configuration[0] : null;
  }});
  Object.defineProperty(this, "technique_name", {get:function() {
    return this.json.technique_name;
  }});
};
gb.main_technique_configuration.prototype = Object.create(gb.configuration_base.prototype);
gb.main_technique_configuration.prototype.constructor = gb.main_technique_configuration;
gb.main_technique_configuration.prototype.serialize_material_configuration = function(a) {
  var b = this;
  (new gb.material_configuration).serialize(b.json.material_filename, function(c) {
    b.set_configuration("material_configuration", c);
    a();
  });
};
gb.main_technique_configuration.prototype.serialize = function(a, b) {
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
};
gb.material_configuration = function() {
  gb.configuration_base.call(this);
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
};
gb.material_configuration.prototype = Object.create(gb.configuration_base.prototype);
gb.material_configuration.prototype.constructor = gb.material_configuration;
gb.material_configuration.prototype.serialize = function(a, b) {
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
};
gb.shader_configuration = function() {
  gb.configuration_base.call(this);
  this.json = null;
  Object.defineProperty(this, "filename", {get:function() {
    return this.json.filename;
  }});
};
gb.shader_configuration.prototype = Object.create(gb.configuration_base.prototype);
gb.shader_configuration.prototype.constructor = gb.shader_configuration;
gb.shader_configuration.prototype.serialize = function(a) {
  this.json = a;
};
gb.sprite_configuration = function() {
  gb.game_object_configuration.call(this);
};
gb.sprite_configuration.prototype = Object.create(gb.game_object_configuration.prototype);
gb.sprite_configuration.prototype.constructor = gb.sprite_configuration;
gb.sprite_configuration.prototype.serialize = function(a, b) {
  var c = this;
  $.ajax({dataType:"json", url:a, data:{}, async:!0}).done(function(d) {
    c.json = d;
    console.log("loaded: " + a);
    d = c.json.materials.length;
    if (0 < d) {
      for (var e = d, f = 0;f < d;++f) {
        (new gb.material_configuration).serialize(c.json.materials[f].filename, function(a) {
          c.set_configuration("materials_configurations", a);
          e--;
          0 === e && b(c);
        });
      }
    } else {
      b(c);
    }
  }).fail(function() {
    console.log("can't load: " + a);
    b(null);
  });
};
gb.ss_technique_configuration = function() {
  gb.configuration_base.call(this);
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
};
gb.ss_technique_configuration.prototype = Object.create(gb.configuration_base.prototype);
gb.ss_technique_configuration.prototype.constructor = gb.ss_technique_configuration;
gb.ss_technique_configuration.prototype.serialize_material_configuration = function(a) {
  var b = this;
  (new gb.material_configuration).serialize(b.json.material_filename, function(c) {
    b.set_configuration("material_configuration", c);
    a();
  });
};
gb.ss_technique_configuration.prototype.serialize = function(a, b) {
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
};
gb.texture_configuration = function() {
  gb.configuration_base.call(this);
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
};
gb.texture_configuration.prototype = Object.create(gb.configuration_base.prototype);
gb.texture_configuration.prototype.constructor = gb.texture_configuration;
gb.texture_configuration.prototype.serialize = function(a) {
  this.json = a;
};
gb.transition_configuration = function() {
  gb.configuration_base.call(this);
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
};
gb.transition_configuration.prototype = Object.create(gb.configuration_base.prototype);
gb.transition_configuration.prototype.constructor = gb.transition_configuration;
gb.transition_configuration.prototype.serialize_main_technique_configuration = function(a) {
  var b = this;
  (new gb.main_technique_configuration).serialize(b.json.main_technique_filename, function(c) {
    b.set_configuration("main_technique_configuration", c);
    a();
  });
};
gb.transition_configuration.prototype.serialize_ws_techniques_configurations = function(a) {
  var b = this, c = b.json.ws_techniques.length;
  if (0 < c) {
    for (var d = c, e = 0;e < c;++e) {
      (new gb.ws_technique_configuration).serialize(b.json.ws_techniques[e].filename, function(c) {
        b.set_configuration("ws_techniques_configurations", c);
        d--;
        0 === d && a();
      });
    }
  } else {
    a();
  }
};
gb.transition_configuration.prototype.serialize_ss_techniques_configurations = function(a) {
  var b = this, c = b.json.ss_techniques.length;
  if (0 < c) {
    for (var d = c, e = 0;e < c;++e) {
      (new gb.ss_technique_configuration).serialize(b.json.ss_techniques[e].filename, function(c) {
        b.set_configuration("ss_techniques_configurations", c);
        d--;
        0 === d && a();
      });
    }
  } else {
    a();
  }
};
gb.transition_configuration.prototype.serialize = function(a, b) {
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
};
gb.ws_technique_configuration = function() {
  gb.configuration_base.call(this);
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
};
gb.ws_technique_configuration.prototype = Object.create(gb.configuration_base.prototype);
gb.ws_technique_configuration.prototype.constructor = gb.ws_technique_configuration;
gb.ws_technique_configuration.prototype.serialize = function(a, b) {
  var c = this;
  $.ajax({dataType:"json", url:a, data:{}, async:!0}).done(function(d) {
    c.json = d;
    console.log("loaded: " + a);
    b(c);
  }).fail(function() {
    console.log("can't load: " + a);
    b(null);
  });
};
gb.game_controller = function() {
  this.m_current_transition = null;
  this.m_transitions = [];
  this.resource_accessor = new gb.resource_accessor;
  this.configuration_accessor = new gb.configuration_accessor;
};
gb.game_controller.prototype = {constructor:gb.game_controller, add_transition:function(a) {
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
}};
gb.game_loop = function() {
  this.m_listeners = [];
};
gb.game_loop.prototype = {constructor:gb.game_loop, on_update:function() {
  for (var a = 0;a < this.m_listeners.length;++a) {
    this.m_listeners[a].on_update(0);
  }
}, add_listener:function(a) {
  _.isFunction(a.on_update) ? _.contains(this.m_listeners, a) ? console.error("can't add same listener for game loop") : this.m_listeners.push(a) : console.error("game loop listener doesn't contain on_update method");
}, remove_listener:function(a) {
  a = _.indexOf(this.m_listeners, a);
  -1 !== a ? this.m_listeners.splice(a, 1) : console.error("game loop doesn't contain this listener");
}};
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
gb.game_transition = function(a) {
  this.m_guid = a;
  this.m_resources_accessor = this.m_configurations_accessor = null;
  this.m_systems_feeder = new gb.ces_systems_feeder;
  this.m_scene = null;
  Object.defineProperty(this, "guid", {get:function() {
    return this.m_guid;
  }});
};
gb.game_transition.prototype = {constructor:gb.game_transition, on_activated:function(a, b, c) {
  this.m_configurations_accessor = a;
  this.m_resources_accessor = b;
  var d = new gb.ces_render_system, e = d.render_pipeline, f = this;
  this.m_configurations_accessor.get_transition_configuration(this.m_guid, function(a) {
    if (null !== a.ws_techniques_configurations) {
      for (var b = 0;b < a.ws_techniques_configurations.length;++b) {
        var k = a.ws_techniques_configurations[b], h = Math.min(gl.viewport_width, k.screen_width), g = Math.min(gl.viewport_height, k.screen_height), h = new gb.render_technique_ws(h, g, k.technique_name, k.index, k.num_passes), g = new gb.vec4(k.clear_color_r, k.clear_color_g, k.clear_color_b, k.clear_color_a);
        h.clear_color = g;
        e.add_ws_render_technique(k.technique_name, k.index, h);
        f.m_resources_accessor.add_custom_resource(k.technique_name + ".color", h.color_attachment_texture);
        f.m_resources_accessor.add_custom_resource(k.technique_name + ".depth", h.depth_attachment_texture);
      }
    }
    if (null !== a.ss_techniques_configurations) {
      for (b = 0;b < a.ss_techniques_configurations.length;++b) {
        var k = a.ss_techniques_configurations[b], h = k.material_configuration, n = gb.material.construct(h);
        gb.material.set_shader(n, h, f.m_resources_accessor);
        gb.material.set_textures(n, h, f.m_resources_accessor);
        h = Math.min(gl.viewport_width, k.screen_width);
        g = Math.min(gl.viewport_height, k.screen_height);
        h = new gb.render_technique_ss(h, g, k.technique_name, n);
        e.add_ss_render_technique(k.technique_name, h);
        f.m_resources_accessor.add_custom_resource(k.technique_name + ".color", h.color_attachment_texture);
      }
    }
    h = a.main_technique_configuration.material_configuration;
    n = gb.material.construct(h);
    gb.material.set_shader(n, h, f.m_resources_accessor);
    gb.material.set_textures(n, h, f.m_resources_accessor);
    e.create_main_render_technique(n);
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
    loop.add_listener(f.m_systems_feeder);
  });
}, on_deactivated:function() {
}};
gb.mesh_constructor = function() {
};
gb.mesh_constructor.create_screen_quad = function() {
  var a = new gb.vbo(4, gl.STATIC_DRAW), b = a.lock();
  b[0].position = new gb.vec2(-1, -1);
  b[0].texcoord = new gb.vec2(0, 0);
  b[1].position = new gb.vec2(-1, 1);
  b[1].texcoord = new gb.vec2(0, 1);
  b[2].position = new gb.vec2(1, -1);
  b[2].texcoord = new gb.vec2(1, 0);
  b[3].position = new gb.vec2(1, 1);
  b[3].texcoord = new gb.vec2(1, 1);
  a.unlock();
  var b = new gb.ibo(6, gl.STATIC_DRAW), c = b.lock();
  c[0] = 0;
  c[1] = 2;
  c[2] = 1;
  c[3] = 1;
  c[4] = 2;
  c[5] = 3;
  b.unlock();
  return new gb.mesh(a, b, gl.TRIANGLES);
};
gb.mesh_constructor.create_shape_quad = function() {
  var a = new gb.vbo(4, gl.STATIC_DRAW), b = a.lock();
  b[0].position = new gb.vec2(-.5, -.5);
  b[0].texcoord = new gb.vec2(0, 0);
  b[1].position = new gb.vec2(-.5, .5);
  b[1].texcoord = new gb.vec2(0, 1);
  b[2].position = new gb.vec2(.5, -.5);
  b[2].texcoord = new gb.vec2(1, 0);
  b[3].position = new gb.vec2(.5, .5);
  b[3].texcoord = new gb.vec2(1, 1);
  a.unlock();
  var b = new gb.ibo(6, gl.STATIC_DRAW), c = b.lock();
  c[0] = 0;
  c[1] = 2;
  c[2] = 1;
  c[3] = 1;
  c[4] = 2;
  c[5] = 3;
  b.unlock();
  return new gb.mesh(a, b, gl.TRIANGLES);
};
gb.mesh_constructor.create_circle = function() {
  var a = new gb.vbo(33, gl.STATIC_DRAW), b = a.lock();
  b[0].m_position = new gb.vec2(0, 0);
  for (var c = 1, d = 0;d <= 2 * Math.PI;d += 2 * Math.PI / 32) {
    b[c++].m_position = new gb.vec2(1 * Math.cos(d), 1 * Math.sin(d));
  }
  a.unlock();
  for (var c = 1, d = new gb.ibo(99, gl.STATIC_DRAW), e = d.lock(), f = 0;96 > f;f += 3) {
    e[f + 0] = 0, e[f + 1] = Math.min(c++, b.length - 1), e[f + 2] = Math.min(c, b.length - 1);
  }
  e[96] = 0;
  e[97] = Math.min(c - 1, b.length - 1);
  e[98] = 1;
  d.unlock();
  return new gb.mesh(a, d, gl.TRIANGLES);
};
gb.mat4 = function() {
  this.m_elements = [[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]];
};
gb.mat4.multiply = function(a, b) {
  var c = a.m_elements, d = b.m_elements, e = new gb.mat4, f = c[0], l = c[4], m = c[8], k = c[12], h = c[1], g = c[5], n = c[9], p = c[13], r = c[2], t = c[6], u = c[10], v = c[14], w = c[3], q = c[7], x = c[11], c = c[15], y = d[0], z = d[4], A = d[8], B = d[12], C = d[1], D = d[5], E = d[9], F = d[13], G = d[2], H = d[6], I = d[10], J = d[14], K = d[3], L = d[7], M = d[11], d = d[15];
  e.m_elements[0] = f * y + l * C + m * G + k * K;
  e.m_elements[4] = f * z + l * D + m * H + k * L;
  e.m_elements[8] = f * A + l * E + m * I + k * M;
  e.m_elements[12] = f * B + l * F + m * J + k * d;
  e.m_elements[1] = h * y + g * C + n * G + p * K;
  e.m_elements[5] = h * z + g * D + n * H + p * L;
  e.m_elements[9] = h * A + g * E + n * I + p * M;
  e.m_elements[13] = h * B + g * F + n * J + p * d;
  e.m_elements[2] = r * y + t * C + u * G + v * K;
  e.m_elements[6] = r * z + t * D + u * H + v * L;
  e.m_elements[10] = r * A + t * E + u * I + v * M;
  e.m_elements[14] = r * B + t * F + u * J + v * d;
  e.m_elements[3] = w * y + q * C + x * G + c * K;
  e.m_elements[7] = w * z + q * D + x * H + c * L;
  e.m_elements[11] = w * A + q * E + x * I + c * M;
  e.m_elements[15] = w * B + q * F + x * J + c * d;
  return e;
};
gb.mat4.multiply_vec4 = function(a, b) {
  var c = new gb.vec4;
  c.x = b.m_elements[0] * a.x + b.m_elements[4] * a.y + b.m_elements[8] * a.z + b.m_elements[12] * a.w;
  c.y = b.m_elements[1] * a.x + b.m_elements[5] * a.y + b.m_elements[9] * a.z + b.m_elements[13] * a.w;
  c.z = b.m_elements[2] * a.x + b.m_elements[6] * a.y + b.m_elements[10] * a.z + b.m_elements[14] * a.w;
  c.w = b.m_elements[3] * a.x + b.m_elements[7] * a.y + b.m_elements[11] * a.z + b.m_elements[15] * a.w;
  return c;
};
gb.mat4.multiply_vec2 = function(a, b) {
  var c = gb.mat4.multiply_vec4(new gb.vec4(a.x, a.y, 0, 1), b);
  return new gb.vec2(c.x, c.y);
};
gb.mat4.prototype = {constructor:gb.mat4, identity:function() {
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
  var b = Math.sin(b), e = Math.cos(c), c = Math.sin(c), f = Math.cos(d), d = Math.sin(d), l = a * f, m = a * d, k = b * f, h = b * d;
  this.m_elements[0] = e * f;
  this.m_elements[4] = -e * d;
  this.m_elements[8] = c;
  this.m_elements[1] = m + k * c;
  this.m_elements[5] = l - h * c;
  this.m_elements[9] = -b * e;
  this.m_elements[2] = h - l * c;
  this.m_elements[6] = k + m * c;
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
}};
var INT16_MAX = 32767, INT16_MIN = -32768;
gb.math = function() {
};
gb.math.radians = function(a) {
  return Math.PI / 180 * a;
};
gb.math.degrees = function(a) {
  return 180 / Math.PI * a;
};
gb.math.is_int = function(a) {
  return Number(a) === a && 0 === a % 1;
};
gb.math.is_float = function(a) {
  return Number(a) === a && 0 !== a % 1;
};
gb.math.intersect = function(a, b, c, d) {
  var e = a.x, f = a.y, l = b.x - a.x;
  a = b.y - a.y;
  b = c.x;
  var m = d.x - c.x;
  d = d.y - c.y;
  var k = Math.sqrt(l * l + a * a), h = Math.sqrt(m * m + d * d);
  if (l / k === m / h && a / k === d / h) {
    return {intersected:!1};
  }
  c = (l * (c.y - f) + a * (e - b)) / (m * a - d * l);
  b = (b + m * c - e) / l;
  return 0 > b || 0 > c || 1 < c ? {intersected:!1} : {intersected:!0, point:new gb.vec2(e + l * b, f + a * b), distance:b};
};
gb.vertices_orientation = {colinear:0, clockwise:1, counterclockwise:2};
gb.math.orientation = function(a, b, c) {
  a = (b.y - a.y) * (c.x - b.x) - (b.x - a.x) * (c.y - b.y);
  return 0 === a ? gb.vertices_orientation.colinear : 0 < a ? gb.vertices_orientation.clockwise : gb.vertices_orientation.counterclockwise;
};
gb.vec2 = function() {
  arguments[0] instanceof gb.vec2 ? (this.m_x = arguments[0].x, this.m_y = arguments[0].y) : 1 === arguments.length ? (this.m_x = arguments[0], this.m_y = arguments[0]) : 2 === arguments.length ? (this.m_x = arguments[0], this.m_y = arguments[1]) : this.m_y = this.m_x = 0;
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
};
gb.vec2.add = function(a, b) {
  return new gb.vec2(a.x + b.x, a.y + b.y);
};
gb.vec2.sub = function(a, b) {
  return new gb.vec2(a.x - b.x, a.y - b.y);
};
gb.vec2.lerp = function(a, b, c) {
  return gb.vec2.sub(b, a).multiply_scalar(c).add(a);
};
gb.vec2.equals = function(a, b) {
  return a.x === b.x && a.y === b.y;
};
gb.vec2.min = function(a, b) {
  var c = new gb.vec2(0);
  c.x = Math.min(a.x, b.x);
  c.y = Math.min(a.y, b.y);
  return c;
};
gb.vec2.max = function(a, b) {
  var c = new gb.vec2(0);
  c.x = Math.max(a.x, b.x);
  c.y = Math.max(a.y, b.y);
  return c;
};
gb.vec2.prototype = {constructor:gb.vec2, add:function(a) {
  this.x += a.x;
  this.y += a.y;
  return this;
}, add_scalar:function(a) {
  this.x += a;
  this.y += a;
  return this;
}, sub:function(a) {
  this.x -= a.x;
  this.y -= a.y;
  return this;
}, sub_scalar:function(a) {
  this.x -= a;
  this.y -= a;
  return this;
}, multiply:function(a) {
  this.x *= a.x;
  this.y *= a.y;
  return this;
}, multiply_scalar:function(a) {
  this.x *= a;
  this.y *= a;
  return this;
}, divide:function(a) {
  this.x /= a.x;
  this.y /= a.y;
  return this;
}, divide_scalar:function(a) {
  this.x /= a;
  this.y /= a;
  return this;
}, clamp:function(a, b) {
  this.x = Math.max(a.x, Math.min(b.x, this.x));
  this.y = Math.max(a.y, Math.min(b.y, this.y));
  return this;
}, dot:function(a) {
  return this.x * a.x + this.y * a.y;
}, length:function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
}, normalize:function() {
  return this.divide_scalar(this.length());
}, angle:function() {
  var a = Math.atan2(this.y, this.x);
  0 > a && (a += 2 * Math.PI);
  return a;
}, distance_to:function(a) {
  var b = this.x - a.x;
  a = this.y - a.y;
  return Math.sqrt(b * b + a * a);
}, lerp:function(a, b) {
  this.x += (a.x - this.x) * b;
  this.y += (a.y - this.y) * b;
  return this;
}, equals:function(a) {
  return a.x === this.x && a.y === this.y;
}, to_array:function() {
  var a = [];
  a.push(this.x);
  a.push(this.y);
  return a;
}};
gb.vec3 = function() {
  "gb.vec3" === typeof arguments[0] ? (this.m_x = arguments[0].x, this.m_y = arguments[0].y, this.m_z = arguments[0].z) : 1 === arguments.length ? (this.m_x = arguments[0], this.m_y = arguments[0], this.m_z = arguments[0]) : 3 === arguments.length ? (this.m_x = arguments[0], this.m_y = arguments[1], this.m_z = arguments[2]) : this.m_z = this.m_y = this.m_x = 0;
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
};
gb.vec3.add = function(a, b) {
  return new gb.vec3(a.x + b.x, a.y + b.y, a.z + b.z);
};
gb.vec3.sub = function(a, b) {
  return new gb.vec3(a.x - b.x, a.y - b.y, a.z - b.z);
};
gb.vec3.cross = function(a, b) {
  return new gb.vec3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
};
gb.vec3.prototype = {constructor:gb.vec3, add:function(a) {
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
}};
gb.vec4 = function() {
  "gb.vec4" === typeof arguments[0] ? (this.x = arguments[0].get_x(), this.y = arguments[0].get_y(), this.z = arguments[0].get_z(), this.w = arguments[0].get_w()) : 1 === arguments.length ? (this.x = arguments[0], this.y = arguments[0], this.z = arguments[0], this.w = arguments[0]) : 4 === arguments.length ? (this.x = arguments[0], this.y = arguments[1], this.z = arguments[2], this.w = arguments[3]) : this.w = this.z = this.y = this.x = 0;
};
gb.vec4.prototype = {constructor:gb.vec4, clone:function() {
  return new this.constructor(this.x, this.y, this.z, this.w);
}, copy:function(a) {
  this.x = a.x;
  this.y = a.y;
  this.z = a.z;
  this.w = a.w;
  return this;
}, set_x:function(a) {
  this.x = a;
  return this;
}, set_y:function(a) {
  this.y = a;
  return this;
}, set_z:function(a) {
  this.z = a;
  return this;
}, set_w:function(a) {
  this.w = a;
  return this;
}, get_x:function() {
  return this.x;
}, get_y:function() {
  return this.y;
}, get_z:function() {
  return this.z;
}, get_w:function() {
  return this.w;
}, add:function(a) {
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
}};
var g_graphics_context = null, graphics_context = function() {
  return {get_instance:function() {
    if (!g_graphics_context) {
      var a = document.getElementById("gl_canvas");
      try {
        g_graphics_context = a.getContext("experimental-webgl"), g_graphics_context.viewport_width = a.width, g_graphics_context.viewport_height = a.height, console.log("OpenGL context created"), console.log("viewport: [ " + g_graphics_context.viewport_width + ", " + g_graphics_context.viewport_height + " ]");
      } catch (b) {
      }
      g_graphics_context || alert("could not initialise gl context");
    }
    return g_graphics_context;
  }};
}(), gl = function() {
  return graphics_context.get_instance();
}();
gb.material_cached_parameters = function() {
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
};
gb.material_cached_parameters.prototype = {constructor:gb.material_cached_parameters};
var g_cached_parameters = null;
gb.material_cached_parameters.get_cached_parameters = function() {
  null === g_cached_parameters && (g_cached_parameters = new gb.material_cached_parameters, g_cached_parameters.is_cull_face = !0, gl.enable(gl.CULL_FACE), g_cached_parameters.cull_face_mode = gl.BACK, gl.cullFace(gl.BACK), g_cached_parameters.is_blending = !0, gl.enable(gl.BLEND), g_cached_parameters.blending_function_source = gl.SRC_ALPHA, g_cached_parameters.blending_function_destination = gl.ONE_MINUS_SRC_ALPHA, gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA), g_cached_parameters.is_stencil_test = 
  !1, gl.disable(gl.STENCIL_TEST), g_cached_parameters.stencil_function = gl.ALWAYS, g_cached_parameters.stencil_function_parameter_1 = 0, g_cached_parameters.stencil_function_parameter_2 = 0, gl.stencilFunc(gl.ALWAYS, 0, 0), g_cached_parameters.m_stencil_mask_parameter = 0, gl.stencilMask(0), g_cached_parameters.is_depth_test = !0, gl.enable(gl.DEPTH_TEST), g_cached_parameters.is_depth_mask = !0, gl.depthMask(!0));
  return g_cached_parameters;
};
gb.material = function() {
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
};
gb.material.construct = function(a) {
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
};
gb.material.set_shader = function(a, b, c) {
  c.get_shader(b.shader_configuration.filename).add_resource_loading_callback(function(b) {
    a.shader = b;
  });
};
gb.material.set_textures = function(a, b, c) {
  for (var d = 0;d < b.textures_configurations.length;++d) {
    var e = b.textures_configurations[d];
    c.get_texture(0 !== e.filename.length ? e.filename : e.technique_name).add_resource_loading_callback(function(b, c) {
      b.wrap_mode = c.wrap_mode;
      b.mag_filter = c.mag_filter;
      b.min_filter = c.min_filter;
      a.set_texture(b, c.sampler_index);
    }, e);
  }
};
gb.material.prototype = {constructor:gb.material, set_texture:function(a, b) {
  this.m_parameters.textures[b] = a;
}, set_custom_shader_uniform:function(a, b) {
  var c = null;
  "undefined" !== typeof this.m_custom_shader_uniforms[b] ? c = this.m_custom_shader_uniforms[b] : (c = new gb.shader_uniform, this.m_custom_shader_uniforms[b] = c);
  a instanceof gb.mat4 ? (c.set_mat4(a), c.type = gb.uniform_type.mat4) : a instanceof gb.vec4 ? (c.set_vec4(a), c.type = gb.uniform_type.vec4) : a instanceof gb.vec3 ? (c.set_vec3(a), c.type = gb.uniform_type.vec3) : a instanceof gb.vec2 ? (c.set_vec2(a), c.type = gb.uniform_type.vec2) : "number" === typeof a ? gb.math.is_int(a) ? (c.set_i32(a), c.type = gb.uniform_type.i32) : (c.set_f32(a), c.type = gb.uniform_type.f32) : console.log("unknown shader uniform type: ", typeof a);
}, bind_custom_shader_uniforms:function() {
  for (var a in this.m_custom_shader_uniforms) {
    var b = this.m_custom_shader_uniforms[a];
    switch(b.type) {
      case gb.uniform_type.mat4:
        this.m_parameters.shader.set_custom_mat4(b.get_mat4(), a);
        break;
      case gb.uniform_type.vec4:
        this.m_parameters.shader.set_custom_vec4(b.get_vec4(), a);
        break;
      case gb.uniform_type.vec3:
        this.m_parameters.shader.set_custom_vec3(b.get_vec3(), a);
        break;
      case gb.uniform_type.vec2:
        this.m_parameters.shader.set_custom_vec2(b.get_vec2(), a);
        break;
      case gb.uniform_type.f32:
        this.m_parameters.shader.set_custom_f32(b.get_f32(), a);
        break;
      case gb.uniform_type.i32:
        this.m_parameters.shader.set_custom_i32(b.get_i32(), a);
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
}};
gb.render_pipeline = function() {
  this.m_main_render_technique = null;
  this.m_ws_render_techniques = [];
  this.m_unique_ws_render_techniques = [];
  this.m_ss_render_techniques = [];
  this.m_unique_ss_render_techniques = [];
  Object.defineProperty(this, "ws_render_techniques", {get:function() {
    return this.m_ws_render_techniques;
  }});
};
gb.render_pipeline.prototype = {constructor:gb.render_pipeline, create_main_render_technique:function(a) {
  this.m_main_render_technique = new gb.render_technique_main(gl.viewport_width, gl.viewport_height, a);
}, add_ws_render_technique:function(a, b, c) {
  b = "" + b + a;
  "undefined" === typeof this.m_unique_ws_render_techniques[b] ? (this.m_unique_ws_render_techniques[b] = c, this.m_ws_render_techniques.push(c)) : console.log("can't add same ws render technique: " + a);
}, remove_ws_render_technique:function(a, b) {
}, add_ss_render_technique:function(a, b) {
  "undefined" === typeof this.m_unique_ss_render_techniques[a] ? (this.m_unique_ws_render_techniques[a] = b, this.m_ss_render_techniques.push(b)) : console.log("can't add same ss render technique: " + a);
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
}};
gb.render_technique_base = function(a, b, c, d) {
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
    return this.m_clear_color = a;
  }});
};
gb.render_technique_base.prototype = {constructor:gb.render_technique_base};
gb.render_technique_main = function(a, b, c) {
  gb.render_technique_base.call(this, a, b, "render.technique.main", 0);
  this.m_material = c;
  this.m_screen_quad = gb.mesh_constructor.create_screen_quad();
  this.m_render_buffer = null;
};
gb.render_technique_main.prototype = Object.create(gb.render_technique_base.prototype);
gb.render_technique_main.prototype.constructor = gb.render_technique_main;
gb.render_technique_main.prototype.bind = function() {
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
  this.m_material.shader && this.m_material.shader.get_status() === gb.resource_status.commited && (this.m_material.bind(), this.m_screen_quad.bind(this.m_material.shader.get_attributes()));
};
gb.render_technique_main.prototype.unbind = function() {
  this.m_material.shader && this.m_material.shader.get_status() === gb.resource_status.commited && (this.m_material.unbind(), this.m_screen_quad.unbind(this.m_material.shader.get_attributes()));
};
gb.render_technique_main.prototype.draw = function() {
  this.m_material.shader && this.m_material.shader.get_status() === gb.resource_status.commited && this.m_screen_quad.draw();
};
gb.render_technique_ss = function(a, b, c, d) {
  gb.render_technique_base.call(this, a, b, c, 0);
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
  this.m_material = d;
  this.m_screen_quad = gb.mesh_constructor.create_screen_quad();
  Object.defineProperty(this, "color_attachment_texture", {get:function() {
    return this.m_color_attachment_texture;
  }});
  Object.defineProperty(this, "material", {get:function() {
    return this.m_material;
  }});
};
gb.render_technique_ss.prototype = Object.create(gb.render_technique_base.prototype);
gb.render_technique_ss.prototype.constructor = gb.render_technique_ss;
gb.render_technique_ss.prototype.bind = function() {
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
  this.m_material.shader.get_status() === gb.resource_status.commited && (this.m_material.bind(), this.m_screen_quad.bind(this.m_material.shader.get_attributes()));
};
gb.render_technique_ss.prototype.unbind = function() {
  this.m_material.shader.get_status() === gb.resource_status.commited && (this.m_material.unbind(), this.m_screen_quad.unbind(this.m_material.shader.get_attributes()));
};
gb.render_technique_ss.prototype.draw = function() {
  this.m_material.shader.get_status() === gb.resource_status.commited && this.m_screen_quad.draw();
};
gb.render_technique_ws = function(a, b, c, d, e) {
  gb.render_technique_base.call(this, a, b, c, d);
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
};
gb.render_technique_ws.prototype = Object.create(gb.render_technique_ws.prototype);
gb.render_technique_ws.prototype.constructor = gb.render_technique_main;
gb.render_technique_ws.prototype.bind = function() {
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
};
gb.render_technique_ws.prototype.unbind = function() {
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
};
gb.render_technique_ws.prototype.draw = function() {
};
gb.ibo = function(a, b) {
  this.m_handler = gl.createBuffer();
  this.m_allocated_size = a;
  this.m_used_size = 0;
  this.m_mode = b;
  this.m_data = [];
  for (var c = 0;c < this.m_allocated_size;++c) {
    this.m_data[c] = 0;
  }
  Object.defineProperty(this, "allocated_size", {get:function() {
    return this.m_allocated_size;
  }});
  Object.defineProperty(this, "used_size", {get:function() {
    return this.m_used_size;
  }});
};
gb.ibo.prototype = {constructor:gb.ibo, destroy:function() {
  gl.deleteBuffer(this.m_handler);
}, lock:function() {
  return this.m_data;
}, unlock:function() {
  this.m_used_size = 0 !== arguments.length && 0 < arguments[0] && arguments[0] < this.m_allocated_size ? arguments[0] : this.m_allocated_size;
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.m_handler);
  for (var a = [], b = 0;b < this.m_used_size;++b) {
    a.push(this.m_data[b]);
  }
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(a), this.m_mode);
}, bind:function() {
  0 !== this.m_used_size && gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.m_handler);
}, unbind:function() {
  0 !== this.m_used_size && gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}};
gb.mesh = function(a, b, c) {
  this.m_vbo = a;
  this.m_ibo = b;
  this.m_mode = c;
  Object.defineProperty(this, "vbo", {get:function() {
    return this.m_vbo;
  }});
  Object.defineProperty(this, "ibo", {get:function() {
    return this.m_ibo;
  }});
};
gb.mesh.prototype = {constructor:gb.mesh, destroy:function() {
  this.vbo.destroy();
  this.ibo.destroy();
}, bind:function(a) {
  this.m_vbo.bind(a);
  this.m_ibo.bind();
}, unbind:function(a) {
  this.m_vbo.unbind(a);
  this.m_ibo.unbind();
}, draw:function() {
  gl.drawElements(gl.TRIANGLES, this.m_ibo.used_size, gl.UNSIGNED_SHORT, 0);
}};
gb.shader_compiler_glsl = function() {
  this.m_vs_shader_header = "precision highp float;\n#if defined(__OPENGL_30__)\nlayout (location = 0) in vec2 a_position;\nlayout (location = 1) in vec2 a_texcoord;\nlayout (location = 4) in vec4 a_color;\n#else\nattribute vec2 a_position;\nattribute vec2 a_texcoord;\nattribute vec4 a_color;\n#endif\n";
  this.m_fs_shader_header = "precision highp float;\n#if defined(__OPENGL_30__)\nlayout (location = 0) out vec4 attachment_01;\n#define gl_FragColor attachment_01\n#define texture2D texture\n#endif\n";
};
gb.shader_compiler_glsl.prototype = {constructor:gb.shader_compiler_glsl, compile:function(a, b) {
  var c = gl.createShader(b);
  if (!c) {
    return console.error("can't create shader"), -1;
  }
  gl.shaderSource(c, b === gl.VERTEX_SHADER ? (this.m_vs_shader_header + a).trim() : (this.m_fs_shader_header + a).trim());
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
}};
gb.commiter_status = {undefined:0, in_progress:1, failure:2, success:3};
gb.resource_commiter = function(a, b) {
  this.m_guid = a;
  this.m_resource = b;
  this.m_status = gb.commiter_status.undefined;
};
gb.resource_commiter.prototype = {constructor:gb.resource_commiter, clone:function() {
  return new this.constructor;
}, copy:function(a) {
  this.m_guid = a.m_guid;
  this.m_resource = a.m_resource;
  this.m_status = a.m_status;
  return this;
}, get_guid:function() {
  return this.m_guid;
}, get_status:function() {
  return this.m_status;
}};
gb.shader_commiter_glsl = function(a, b) {
  gb.resource_commiter.call(this, a, b);
};
gb.shader_commiter_glsl.prototype = Object.create(gb.resource_commiter.prototype);
gb.shader_commiter_glsl.prototype.constructor = gb.shader_commiter_glsl;
gb.shader_commiter_glsl.prototype.commit = function(a) {
  this.m_status = gb.commiter_status.in_progress;
  var b = new gb.shader_compiler_glsl, c = gb.commiter_status.failure, d = b.compile(a.vs_source_code, gl.VERTEX_SHADER);
  if (-1 !== d) {
    var e = b.compile(a.fs_source_code, gl.FRAGMENT_SHADER);
    -1 !== e && (b = b.link(d, e), a.shader_id = b, -1 !== b && (c = gb.commiter_status.success));
  }
  this.m_resource.on_transfering_data_commited(a);
  this.m_status = c;
};
gb.texture_commiter_png = function(a, b) {
  gb.resource_commiter.call(this, a, b);
};
gb.texture_commiter_png.prototype = Object.create(gb.resource_commiter.prototype);
gb.texture_commiter_png.prototype.constructor = gb.texture_commiter_png;
gb.texture_commiter_png.prototype.commit = function(a) {
  this.m_status = gb.commiter_status.in_progress;
  var b = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, b);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, a.data);
  gl.generateMipmap(gl.TEXTURE_2D);
  a.texture_id = b;
  this.m_resource.on_transfering_data_commited(a);
  this.m_status = gb.commiter_status.success;
};
gb.resource_loading_operation_status = {undefined:0, in_progress:1, waiting:2, failure:3, success:4};
gb.resource_loading_operation = function(a, b) {
  this.m_guid = a;
  this.m_resource = b;
  this.m_status = gb.resource_loading_operation_status.undefined;
  this.m_commiter = this.m_serializer = this.m_transfering_data = null;
};
gb.resource_loading_operation.prototype = {constructor:gb.resource_loading_operation, get_guid:function() {
  return this.m_guid;
}, get_status:function() {
  return this.m_status;
}};
gb.serializer_status = {undefined:0, in_progress:1, failure:2, success:3};
gb.resource_serializer = function(a, b) {
  this.m_guid = a;
  this.m_resource = b;
  this.m_status = gb.serializer_status.undefined;
};
gb.resource_serializer.prototype = {constructor:gb.resource_serializer, clone:function() {
  return new this.constructor;
}, copy:function(a) {
  this.m_guid = a.m_guid;
  this.m_resource = a.m_resource;
  this.m_status = a.m_status;
  return this;
}, get_guid:function() {
  return this.m_guid;
}, get_status:function() {
  return this.m_status;
}};
gb.shader_serializer_glsl = function(a, b, c) {
  gb.resource_serializer.call(this, a + b, c);
  this.m_vs_filename = a;
  this.m_fs_filename = b;
};
gb.shader_serializer_glsl.prototype = Object.create(gb.resource_serializer.prototype);
gb.shader_serializer_glsl.prototype.constructor = gb.shader_serializer_glsl;
gb.shader_serializer_glsl.prototype.serialize = function(a, b) {
  this.m_status = gb.serializer_status.in_progress;
  var c = this;
  $.ajax({dataType:"text", url:this.m_vs_filename, data:{}, async:!0, success:function(d) {
    a.vs_source_code = d;
    $.ajax({dataType:"text", url:c.m_fs_filename, data:{}, async:!0, success:function(d) {
      a.fs_source_code = d;
      c.m_resource.on_transfering_data_serialized(a);
      c.m_status = 0 !== a.vs_source_code.length && 0 !== a.fs_source_code.length ? gb.serializer_status.success : gb.serializer_status.failure;
      b();
    }});
  }});
};
gb.texture_serializer_png = function(a, b) {
  gb.resource_serializer.call(this, a, b);
  this.m_filename = a;
};
gb.texture_serializer_png.prototype = Object.create(gb.resource_serializer.prototype);
gb.texture_serializer_png.prototype.constructor = gb.texture_serializer_png;
gb.texture_serializer_png.prototype.serialize = function(a, b) {
  this.m_status = gb.serializer_status.in_progress;
  var c = this, d = new Image;
  d.onload = function() {
    a.data = d;
    a.width = d.width;
    a.height = d.height;
    c.m_resource.on_transfering_data_serialized(a);
    c.m_status = gb.serializer_status.success;
    b();
  };
  d.src = this.m_filename;
};
var k_vs_extension = ".vert", k_fs_extension = ".frag";
gb.shader_loading_operation = function(a, b) {
  gb.resource_loading_operation.call(this, a, b);
  this.m_transfering_data = new gb.shader_transfering_data;
};
gb.shader_loading_operation.prototype = Object.create(gb.resource_loading_operation.prototype);
gb.shader_loading_operation.prototype.constructor = gb.shader_loading_operation;
gb.shader_loading_operation.prototype.start = function(a) {
  var b = this;
  this.serialize(function() {
    b.m_status === gb.resource_loading_operation_status.waiting ? b.commit(function() {
      a();
    }) : a();
  });
};
gb.shader_loading_operation.prototype.serialize = function(a) {
  this.m_status = gb.resource_loading_operation_status.in_progress;
  this.m_serializer = new gb.shader_serializer_glsl(this.m_guid + k_vs_extension, this.m_guid + k_fs_extension, this.m_resource);
  var b = this;
  this.m_serializer.serialize(this.m_transfering_data, function() {
    b.m_status = b.m_serializer.get_status() === gb.serializer_status.success ? gb.resource_loading_operation_status.waiting : gb.resource_loading_operation_status.failure;
    a();
  });
};
gb.shader_loading_operation.prototype.commit = function(a) {
  this.m_status = gb.resource_loading_operation_status.in_progress;
  this.m_commiter = new gb.shader_commiter_glsl(this.m_guid, this.m_resource);
  this.m_commiter.commit(this.m_transfering_data);
  this.m_status = this.m_commiter.get_status() === gb.commiter_status.success ? gb.resource_loading_operation_status.success : gb.resource_loading_operation_status.failure;
  a();
};
gb.texture_loading_operation = function(a, b) {
  gb.resource_loading_operation.call(this, a, b);
  this.m_transfering_data = new gb.texture_transfering_data;
};
gb.texture_loading_operation.prototype = Object.create(gb.resource_loading_operation.prototype);
gb.texture_loading_operation.prototype.constructor = gb.texture_loading_operation;
gb.texture_loading_operation.prototype.start = function(a) {
  var b = this;
  this.serialize(function() {
    b.m_status === gb.resource_loading_operation_status.waiting ? b.commit(function() {
      a();
    }) : a();
  });
};
gb.texture_loading_operation.prototype.serialize = function(a) {
  this.m_status = gb.resource_loading_operation_status.in_progress;
  this.m_serializer = new gb.texture_serializer_png(this.m_guid, this.m_resource);
  var b = this;
  this.m_serializer.serialize(this.m_transfering_data, function() {
    b.m_status = b.m_serializer.get_status() === gb.serializer_status.success ? gb.resource_loading_operation_status.waiting : gb.resource_loading_operation_status.failure;
    a();
  });
};
gb.texture_loading_operation.prototype.commit = function(a) {
  this.m_status = gb.resource_loading_operation_status.in_progress;
  this.m_commiter = new gb.texture_commiter_png(this.m_guid, this.m_resource);
  this.m_commiter.commit(this.m_transfering_data);
  this.m_status = this.m_commiter.get_status() === gb.commiter_status.success ? gb.resource_loading_operation_status.success : gb.resource_loading_operation_status.failure;
  a();
};
gb.resource_accessor = function() {
  this.m_resources = [];
  this.m_operations_queue = [];
};
gb.resource_accessor.prototype = {constructor:gb.resource_accessor, add_custom_resource:function(a, b) {
  this.m_resources[a] = b;
}, get_shader:function(a) {
  var b = this.m_resources[a];
  if ("undefined" === typeof b) {
    b = new gb.shader(a);
    this.m_resources[a] = b;
    var c = new gb.shader_loading_operation(a, b), d = this;
    c.start(function() {
      d.m_resources[a].on_resource_loaded(d.m_operations_queue[a].get_status() === gb.resource_loading_operation_status.success);
      d.m_operations_queue[a] = null;
    });
    this.m_operations_queue[a] = c;
  }
  return b;
}, get_texture:function(a) {
  var b = this.m_resources[a];
  if ("undefined" === typeof b) {
    b = new gb.texture(a);
    this.m_resources[a] = b;
    var c = new gb.texture_loading_operation(a, b), d = this;
    c.start(function() {
      d.m_resources[a].on_resource_loaded(d.m_operations_queue[a].get_status() === gb.resource_loading_operation_status.success);
      d.m_operations_queue[a] = null;
    });
    this.m_operations_queue[a] = c;
  }
  return b;
}};
gb.resource_type = {undefined:0, shader:1, texture:2};
gb.resource_status = {unloaded:0, loaded:1, commited:2};
gb.resource_base = function(a) {
  this.m_guid = a;
  this.m_type = gb.resource_type.undefined;
  this.m_status = gb.resource_status.unloaded;
  this.m_callbacks = [];
  this.m_userdata_container = [];
};
gb.resource_base.prototype = {constructor:gb.resource_base, get_guid:function() {
  return this.m_guid;
}, get_type:function() {
  return this.m_type;
}, get_status:function() {
  return this.m_status;
}, on_transfering_data_serialized:function() {
}, on_transfering_data_commited:function() {
}, on_resource_loaded:function(a) {
  for (var b = 0;b < this.m_callbacks.length;++b) {
    (0,this.m_callbacks[b])(a ? this : null, this.m_userdata_container[b]);
  }
  this.m_callbacks = [];
  this.m_userdata_container = [];
}, add_resource_loading_callback:function(a, b) {
  _.isFunction(a) ? _.contains(this.m_callbacks, a) ? console.error("can't add same callback for resource loading") : this.get_status() === gb.resource_status.commited ? a(this, b) : (this.m_callbacks.push(a), this.m_userdata_container.push(b)) : console.error("resource loading callback isn't function");
}, remove_resource_loading_callback:function(a) {
  a = _.indexOf(this.m_callbacks, a);
  -1 !== a ? (this.m_callbacks.splice(a, 1), this.m_userdatas.splice(a, 1)) : console.error("resource doesn't contain this callback");
}};
gb.uniform_type = {undefined:-1, mat4:0, mat4_array:1, vec4:2, vec4_array:3, vec3:4, vec3_array:5, vec2:6, vec2_array:7, f32:8, f32_array:9, i32:10, i32_array:11, sampler:12};
gb.shader_sampler_type = {sampler_01:0, sampler_02:1, sampler_03:2, sampler_04:3, sampler_05:4, sampler_06:5, sampler_07:6, sampler_08:7, max:8};
gb.shader_attribute_type = {position:0, texcoord:1, color:2, max:3};
gb.shader_uniform_type = {mat_m:0, mat_p:1, mat_v:2, max:3};
gb.attribute_names = {a_position:"a_position", a_texcoord:"a_texcoord", a_color:"a_color"};
gb.uniform_names = {u_mat_m:"u_mat_m", u_mat_p:"u_mat_p", u_mat_v:"u_mat_v"};
gb.sampler_names = {sampler_01:"sampler_01", sampler_02:"sampler_02", sampler_03:"sampler_03", sampler_04:"sampler_04", sampler_05:"sampler_05", sampler_06:"sampler_06", sampler_07:"sampler_07", sampler_08:"sampler_08"};
gb.shader_uniform = function() {
  this.m_type = gb.uniform_type.undefined;
  Object.defineProperty(this, "type", {get:function() {
    return this.m_type;
  }, set:function(a) {
    this.m_type = a;
  }});
};
gb.shader_uniform.prototype = {constructor:gb.shader_uniform, set_mat4:function(a) {
  this.m_mat4_value = a;
}, set_mat4_array:function(a) {
  this.m_mat4_array = a;
  this.m_array_size = a.length;
}, set_vec4:function(a) {
  this.m_vec4_value = a;
}, set_vec4_array:function(a) {
  this.m_vec4_array = a;
  this.m_array_size = a.length;
}, set_vec3:function(a) {
  this.m_vec3_value = a;
}, set_vec3_array:function(a) {
  this.m_vec3_array = a;
  this.m_array_size = a.length;
}, set_vec2:function(a) {
  this.m_vec2_value = a;
}, set_vec2_array:function(a) {
  this.m_vec2_array = a;
  this.m_array_size = a.length;
}, set_f32:function(a) {
  this.m_f32_value = a;
}, set_f32_array:function(a) {
  this.m_f32_array = a;
  this.m_array_size = a.length;
}, set_i32:function(a) {
  this.m_i32_value = a;
}, set_i32_array:function(a) {
  this.m_i32_array = a;
  this.m_array_size = a.length;
}, set_sampler:function(a, b) {
  this.m_texture = a;
  this.m_sampler_value = b;
}, get_mat4:function() {
  return this.m_mat4_value;
}, get_mat4_array:function() {
  return this.m_mat4_array;
}, get_vec4:function() {
  return this.m_vec4_value;
}, get_vec4_array:function() {
  return this.m_vec4_array;
}, get_vec3:function() {
  return this.m_vec3_value;
}, get_vec3_array:function() {
  return this.m_vec3_array;
}, get_vec2:function() {
  return this.m_vec2_value;
}, get_vec2_array:function() {
  return this.m_vec2_array;
}, get_f32:function() {
  return this.m_f32_value;
}, get_f32_array:function() {
  return this.m_f32_array;
}, get_i32:function() {
  return this.m_i32_value;
}, get_i32_array:function() {
  return this.m_i32_array;
}, get_sampler:function() {
  return this.m_sampler_value;
}, get_texture:function() {
  return this.m_texture;
}, get_array_size:function() {
  return this.m_array_size;
}, get_type:function() {
  return this.m_type;
}};
gb.shader = function(a) {
  gb.resource_base.call(this, a);
  this.m_type = gb.resource_type.shader;
  this.m_shader_id = -1;
  this.m_uniforms = [];
  this.m_uniforms[gb.shader_uniform_type.max - 1] = -1;
  this.m_samplers = [];
  this.m_samplers[gb.shader_sampler_type.max - 1] = -1;
  this.m_attributes = [];
  this.m_attributes[gb.shader_attribute_type.max - 1] = -1;
  this.m_custom_uniforms = [];
  this.m_custom_attributes = [];
  this.m_cached_uniforms = [];
};
gb.shader.prototype = Object.create(gb.resource_base.prototype);
gb.shader.prototype.constructor = gb.shader;
gb.shader.prototype.setup = function() {
  this.m_uniforms[gb.shader_uniform_type.mat_m] = gl.getUniformLocation(this.m_shader_id, gb.uniform_names.u_mat_m);
  this.m_uniforms[gb.shader_uniform_type.mat_v] = gl.getUniformLocation(this.m_shader_id, gb.uniform_names.u_mat_v);
  this.m_uniforms[gb.shader_uniform_type.mat_p] = gl.getUniformLocation(this.m_shader_id, gb.uniform_names.u_mat_p);
  this.m_samplers[gb.shader_sampler_type.sampler_01] = gl.getUniformLocation(this.m_shader_id, gb.sampler_names.sampler_01);
  this.m_samplers[gb.shader_sampler_type.sampler_02] = gl.getUniformLocation(this.m_shader_id, gb.sampler_names.sampler_02);
  this.m_samplers[gb.shader_sampler_type.sampler_03] = gl.getUniformLocation(this.m_shader_id, gb.sampler_names.sampler_03);
  this.m_samplers[gb.shader_sampler_type.sampler_04] = gl.getUniformLocation(this.m_shader_id, gb.sampler_names.sampler_04);
  this.m_samplers[gb.shader_sampler_type.sampler_05] = gl.getUniformLocation(this.m_shader_id, gb.sampler_names.sampler_05);
  this.m_samplers[gb.shader_sampler_type.sampler_06] = gl.getUniformLocation(this.m_shader_id, gb.sampler_names.sampler_06);
  this.m_samplers[gb.shader_sampler_type.sampler_07] = gl.getUniformLocation(this.m_shader_id, gb.sampler_names.sampler_07);
  this.m_samplers[gb.shader_sampler_type.sampler_08] = gl.getUniformLocation(this.m_shader_id, gb.sampler_names.sampler_08);
  this.m_attributes[gb.shader_attribute_type.position] = gl.getAttribLocation(this.m_shader_id, gb.attribute_names.a_position);
  this.m_attributes[gb.shader_attribute_type.texcoord] = gl.getAttribLocation(this.m_shader_id, gb.attribute_names.a_texcoord);
  this.m_attributes[gb.shader_attribute_type.color] = gl.getAttribLocation(this.m_shader_id, gb.attribute_names.a_color);
};
gb.shader.prototype.on_transfering_data_serialized = function(a) {
  switch(a.type) {
    case gb.resource_transfering_data_type.shader:
      this.m_status = gb.resource_status.loaded;
  }
};
gb.shader.prototype.on_transfering_data_commited = function(a) {
  switch(a.type) {
    case gb.resource_transfering_data_type.shader:
      this.m_shader_id = a.shader_id, this.m_status = gb.resource_status.commited, this.setup();
  }
};
gb.shader.prototype.get_attributes = function() {
  return this.m_attributes;
};
gb.shader.prototype.get_custom_uniform = function(a) {
  var b = -1;
  "undefined" !== typeof this.m_custom_uniforms[a] ? b = this.m_custom_uniforms[a] : (b = gl.getUniformLocation(this.m_shader_id, a), this.m_custom_uniforms[a] = b);
  return b;
};
gb.shader.prototype.set_mat4 = function(a, b) {
  this.get_status() !== gb.resource_status.commited || "undefined" !== typeof this.m_cached_uniforms[b] && this.m_cached_uniforms[b] === a || ("undefined" === typeof this.m_cached_uniforms[b] && (this.m_cached_uniforms[b] = new gb.shader_uniform), gl.uniformMatrix4fv(this.m_uniforms[b], !1, new Float32Array(a.to_array())), this.m_cached_uniforms[b].set_mat4(a));
};
gb.shader.prototype.set_custom_mat4 = function(a, b) {
  this.get_status() === gb.resource_status.commited && gl.uniformMatrix4fv(this.get_custom_uniform(b), !1, new Float32Array(a.to_array()));
};
gb.shader.prototype.set_vec4 = function(a, b) {
  this.get_status() !== gb.resource_status.commited || "undefined" !== typeof this.m_cached_uniforms[b] && this.m_cached_uniforms[b] === a || ("undefined" === typeof this.m_cached_uniforms[b] && (this.m_cached_uniforms[b] = new gb.shader_uniform), gl.uniform4fv(this.m_uniforms[b], new Float32Array(a.to_array())), this.m_cached_uniforms[b].set_vec4(a));
};
gb.shader.prototype.set_custom_vec4 = function(a, b) {
  this.get_status() === gb.resource_status.commited && gl.uniform4fv(this.get_custom_uniform(b), new Float32Array(a.to_array()));
};
gb.shader.prototype.set_vec3 = function(a, b) {
  this.get_status() !== gb.resource_status.commited || "undefined" !== typeof this.m_cached_uniforms[b] && this.m_cached_uniforms[b] === a || ("undefined" === typeof this.m_cached_uniforms[b] && (this.m_cached_uniforms[b] = new gb.shader_uniform), gl.uniform3fv(this.m_uniforms[b], new Float32Array(a.to_array())), this.m_cached_uniforms[b].set_vec3(a));
};
gb.shader.prototype.set_custom_vec3 = function(a, b) {
  this.get_status() === gb.resource_status.commited && gl.uniform3fv(this.get_custom_uniform(b), new Float32Array(a.to_array()));
};
gb.shader.prototype.set_vec2 = function(a, b) {
  this.get_status() !== gb.resource_status.commited || "undefined" !== typeof this.m_cached_uniforms[b] && this.m_cached_uniforms[b] === a || ("undefined" === typeof this.m_cached_uniforms[b] && (this.m_cached_uniforms[b] = new gb.shader_uniform), gl.uniform2fv(this.m_uniforms[b], new Float32Array(a.to_array())), this.m_cached_uniforms[b].set_vec2(a));
};
gb.shader.prototype.set_custom_vec2 = function(a, b) {
  this.get_status() === gb.resource_status.commited && gl.uniform2fv(this.get_custom_uniform(b), new Float32Array(a.to_array()));
};
gb.shader.prototype.set_f32 = function(a, b) {
  this.get_status() !== gb.resource_status.commited || "undefined" !== typeof this.m_cached_uniforms[b] && this.m_cached_uniforms[b] === a || ("undefined" === typeof this.m_cached_uniforms[b] && (this.m_cached_uniforms[b] = new gb.shader_uniform), gl.uniform1f(this.m_uniforms[b], a), this.m_cached_uniforms[b].set_f32(a));
};
gb.shader.prototype.set_custom_f32 = function(a, b) {
  this.get_status() === gb.resource_status.commited && gl.uniform1f(this.get_custom_uniform(b), a);
};
gb.shader.prototype.set_i32 = function(a, b) {
  this.get_status() !== gb.resource_status.commited || "undefined" !== typeof this.m_cached_uniforms[b] && this.m_cached_uniforms[b] === a || ("undefined" === typeof this.m_cached_uniforms[b] && (this.m_cached_uniforms[b] = new gb.shader_uniform), gl.uniform1i(this.m_uniforms[b], a), this.m_cached_uniforms[b].set_i32(a));
};
gb.shader.prototype.set_custom_i32 = function(a, b) {
  this.get_status() === gb.resource_status.commited && gl.uniform1i(this.get_custom_uniform(b), a);
};
gb.shader.prototype.set_texture = function(a, b) {
  this.get_status() === gb.resource_status.commited && b < gb.shader_sampler_type.max && (gl.activeTexture(gl.TEXTURE0 + b), a.bind(), gl.uniform1i(this.m_samplers[b], b));
};
gb.shader.prototype.bind = function() {
  this.get_status() === gb.resource_status.commited && gl.useProgram(this.m_shader_id);
};
gb.shader.prototype.unbind = function() {
  this.get_status() === gb.resource_status.commited && gl.useProgram(null);
};
gb.texture = function(a) {
  gb.resource_base.call(this, a);
  this.m_type = gb.resource_type.texture;
  this.m_texture_id = -1;
  this.m_setted_wrap_mode = this.m_height = this.m_width = 0;
  this.m_presseted_wrap_mode = gl.REPEAT;
  this.m_setted_mag_filter = 0;
  this.m_presetted_mag_filter = gl.NEAREST;
  this.m_setted_min_filter = 0;
  this.m_presetted_min_filter = gl.NEAREST;
  Object.defineProperty(this, "texture_id", {get:function() {
    return this.m_texture_id;
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
};
gb.texture.prototype = Object.create(gb.resource_base.prototype);
gb.texture.prototype.constructor = gb.texture;
gb.texture.construct = function(a, b, c, d) {
  a = new gb.texture(a);
  a.m_texture_id = b;
  a.m_width = c;
  a.m_height = d;
  a.m_status = gb.resource_status.commited;
  return a;
};
gb.texture.prototype.destroy = function() {
  gl.deleteTexture(this.m_texture_id);
};
gb.texture.prototype.on_transfering_data_serialized = function(a) {
  switch(a.type) {
    case gb.resource_transfering_data_type.texture:
      this.m_status = gb.resource_status.loaded;
  }
};
gb.texture.prototype.on_transfering_data_commited = function(a) {
  switch(a.type) {
    case gb.resource_transfering_data_type.texture:
      this.m_texture_id = a.texture_id, this.m_width = a.width, this.m_height = a.height, this.m_status = gb.resource_status.commited;
  }
};
gb.texture.prototype.bind = function() {
  this.get_status() === gb.resource_status.commited && (gl.bindTexture(gl.TEXTURE_2D, this.texture_id), this.m_presseted_wrap_mode !== this.m_setted_wrap_mode && (this.m_setted_wrap_mode = this.m_presseted_wrap_mode, gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.m_setted_wrap_mode), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.m_setted_wrap_mode)), this.m_presetted_min_filter !== this.m_setted_min_filter && (this.m_setted_min_filter = this.m_presetted_min_filter, gl.texParameteri(gl.TEXTURE_2D, 
  gl.TEXTURE_MIN_FILTER, this.m_setted_min_filter)), this.m_presetted_mag_filter !== this.m_setted_mag_filter && (this.m_setted_mag_filter = this.m_presetted_mag_filter, gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.m_setted_mag_filter)));
};
gb.texture.prototype.unbind = function() {
  gl.bindTexture(gl.TEXTURE_2D, null);
};
gb.resource_transfering_data_type = {undefined:0, shader:1, texture:2};
gb.resource_transfering_data = function() {
  this.m_type = gb.resource_transfering_data_type.undefined;
  Object.defineProperty(this, "type", {get:function() {
    return this.m_type;
  }});
};
gb.resource_transfering_data.prototype = {constructor:gb.resource_transfering_data};
gb.shader_transfering_data = function() {
  gb.resource_transfering_data.call(this);
  this.m_type = gb.resource_transfering_data_type.shader;
  this.m_fs_source_code = this.m_vs_source_code = "";
  this.m_shader_id = -1;
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
  Object.defineProperty(this, "shader_id", {get:function() {
    return this.m_shader_id;
  }, set:function(a) {
    this.m_shader_id = a;
  }});
};
gb.shader_transfering_data.prototype = Object.create(gb.resource_transfering_data.prototype);
gb.shader_transfering_data.prototype.constructor = gb.shader_transfering_data;
gb.texture_transfering_data = function() {
  gb.resource_transfering_data.call(this);
  this.m_type = gb.resource_transfering_data_type.texture;
  this.m_height = this.m_width = 0;
  this.m_data = null;
  this.m_texture_id = -1;
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
  Object.defineProperty(this, "texture_id", {get:function() {
    return this.m_texture_id;
  }, set:function(a) {
    this.m_texture_id = a;
  }});
  Object.defineProperty(this, "data", {get:function() {
    return this.m_data;
  }, set:function(a) {
    this.m_data = a;
  }});
};
gb.texture_transfering_data.prototype = Object.create(gb.resource_transfering_data.prototype);
gb.texture_transfering_data.prototype.constructor = gb.texture_transfering_data;
gb.vertex_attribute = function() {
  this.m_position = new gb.vec2(0);
  this.m_texcoord = new gb.vec2(0);
  this.m_color = new gb.vec4(0);
  Object.defineProperty(this, "position", {get:function() {
    return this.m_position;
  }, set:function(a) {
    this.m_position = a;
  }});
  Object.defineProperty(this, "texcoord", {get:function() {
    return this.m_texcoord;
  }, set:function(a) {
    this.m_texcoord = a;
  }});
  Object.defineProperty(this, "color", {get:function() {
    return this.m_color;
  }, set:function(a) {
    this.m_color = a;
  }});
};
gb.vertex_attribute.prototype = {constructor:gb.vertex_attribute, to_array:function() {
  return [this.m_position.x, this.m_position.y, this.m_texcoord.x, this.m_texcoord.y, this.m_color.x, this.m_color.y, this.m_color.z, this.m_color.w];
}};
gb.vbo = function(a, b) {
  this.m_handler = gl.createBuffer();
  this.m_allocated_size = a;
  this.m_used_size = 0;
  this.m_mode = b;
  this.m_min_bound = new gb.vec2(INT16_MAX);
  this.m_max_bound = new gb.vec2(INT16_MIN);
  this.m_data = [];
  for (var c = 0;c < this.m_allocated_size;++c) {
    this.m_data[c] = new gb.vertex_attribute;
  }
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
};
gb.vbo.prototype = {constructor:gb.vbo, destroy:function() {
  gl.deleteBuffer(this.m_handler);
}, lock:function() {
  return this.m_data;
}, unlock:function() {
  this.m_used_size = 0 !== arguments.length && 0 < arguments[0] && arguments[0] < this.m_allocated_size ? arguments[0] : this.m_allocated_size;
  gl.bindBuffer(gl.ARRAY_BUFFER, this.m_handler);
  for (var a = [], b = 0;b < this.m_used_size;++b) {
    for (var c = this.m_data[b].to_array(), d = 0;d < c.length;++d) {
      a.push(c[d]);
    }
    c = new gb.vec2(c[0], c[1]);
    this.m_min_bound = gb.vec2.min(c, this.m_min_bound);
    this.m_max_bound = gb.vec2.max(c, this.m_max_bound);
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(a), this.m_mode);
}, bind:function(a) {
  0 !== this.m_used_size && (gl.bindBuffer(gl.ARRAY_BUFFER, this.m_handler), 0 <= a[gb.shader_attribute_type.position] && (gl.vertexAttribPointer(a[gb.shader_attribute_type.position], 2, gl.FLOAT, !1, 32, 0), gl.enableVertexAttribArray(a[gb.shader_attribute_type.position])), 0 <= a[gb.shader_attribute_type.texcoord] && (gl.vertexAttribPointer(a[gb.shader_attribute_type.texcoord], 2, gl.FLOAT, !1, 32, 8), gl.enableVertexAttribArray(a[gb.shader_attribute_type.texcoord])), 0 <= a[gb.shader_attribute_type.color] && 
  (gl.vertexAttribPointer(a[gb.shader_attribute_type.color], 4, gl.FLOAT, !1, 32, 16), gl.enableVertexAttribArray(a[gb.shader_attribute_type.color])));
}, unbind:function(a) {
  0 !== this.m_used_size && (gl.bindBuffer(gl.ARRAY_BUFFER, this.m_handler), 0 <= a[gb.shader_attribute_type.position] && gl.disableVertexAttribArray(a[gb.shader_attribute_type.position]), 0 <= a[gb.shader_attribute_type.texcoord] && gl.disableVertexAttribArray(a[gb.shader_attribute_type.texcoord]), 0 <= a[gb.shader_attribute_type.color] && gl.disableVertexAttribArray(a[gb.shader_attribute_type.color]), gl.bindBuffer(gl.ARRAY_BUFFER, null));
}};
gb.camera = function(a, b) {
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
};
gb.camera.prototype = {constructor:gb.camera};
gb.game_object = function() {
  gb.ces_entity.call(this);
  var a = new gb.ces_transformation_component;
  this.add_component(a);
  Object.defineProperty(this, "position", {configurable:!0, set:function(a) {
    this.get_component(gb.ces_component_type.transformation).position = a;
  }, get:function() {
    return this.get_component(gb.ces_component_type.transformation).position;
  }});
  Object.defineProperty(this, "rotation", {set:function(a) {
    this.get_component(gb.ces_component_type.transformation).rotation = a;
  }, get:function() {
    return this.get_component(gb.ces_component_type.transformation).rotation;
  }});
  Object.defineProperty(this, "scale", {set:function(a) {
    this.get_component(gb.ces_component_type.transformation).scale = a;
  }, get:function() {
    return this.get_component(gb.ces_component_type.transformation).scale;
  }});
  Object.defineProperty(this, "size", {configurable:!0, set:function(a) {
    this.get_component(gb.ces_component_type.transformation).scale = a;
  }, get:function() {
    return this.get_component(gb.ces_component_type.transformation).scale;
  }});
};
gb.game_object.prototype = Object.create(gb.ces_entity.prototype);
gb.game_object.prototype.constructor = gb.game_object;
var k_radius_uniform = "u_radius", k_center_uniform = "u_center", k_color_uniform = "u_color";
gb.light_source = function() {
  gb.game_object.call(this);
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
    this.get_component(gb.ces_component_type.transformation).scale = new gb.vec2(this.m_radius);
    this.get_component(gb.ces_component_type.material).set_custom_shader_uniform(this.m_radius, k_radius_uniform);
  }});
  Object.defineProperty(this, "color", {get:function() {
    return this.m_color;
  }, set:function(a) {
    this.m_color = a;
    this.get_component(gb.ces_component_type.material).set_custom_shader_uniform(this.m_color, k_color_uniform);
  }});
  Object.defineProperty(this, "position", {configurable:!0, set:function(a) {
    this.get_component(gb.ces_component_type.transformation).position = a;
    for (var c = (new gb.mat4).identity(), d = this.parent;d;) {
      var e = d.get_component(gb.ces_component_type.transformation), c = gb.mat4.multiply(c, e.matrix_m), d = d.parent
    }
    a = gb.mat4.multiply_vec2(a, c);
    this.get_component(gb.ces_component_type.material).set_custom_shader_uniform(a, k_center_uniform);
  }, get:function() {
    return this.get_component(gb.ces_component_type.transformation).position;
  }});
};
gb.light_source.prototype = Object.create(gb.game_object.prototype);
gb.light_source.prototype.constructor = gb.light_source;
gb.scene_fabricator = function() {
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
};
gb.scene_fabricator.prototype = {constructor:gb.scene_fabricator, add_materials:function(a, b) {
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
}};
gb.scene_graph = function(a) {
  gb.ces_entity.call(this);
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
};
gb.scene_graph.prototype = Object.create(gb.ces_entity.prototype);
gb.scene_graph.prototype.constructor = gb.scene_graph;
gb.sprite = function() {
  gb.game_object.call(this);
  var a = new gb.ces_material_component;
  this.add_component(a);
  a = new gb.ces_geometry_quad_component;
  this.add_component(a);
  Object.defineProperty(this, "size", {get:function() {
    return this.get_component(gb.ces_component_type.geometry).size;
  }, set:function(a) {
    this.get_component(gb.ces_component_type.geometry).size = a;
  }});
  Object.defineProperty(this, "pivot", {get:function() {
    return this.get_component(gb.ces_component_type.geometry).pivot;
  }, set:function(a) {
    this.get_component(gb.ces_component_type.geometry).pivot = a;
  }});
  Object.defineProperty(this, "cast_shadow", {get:function() {
    return this.is_component_exist(gb.ces_component_type.convex_hull);
  }, set:function(a) {
    if (a) {
      a = this.get_component(gb.ces_component_type.geometry);
      var c = new gb.ces_convex_hull_component;
      c.update_convex_hull(a.mesh.vbo.lock());
      this.add_component(c);
    } else {
      this.remove_component(gb.ces_component_type.convex_hull);
    }
  }});
};
gb.sprite.prototype = Object.create(gb.game_object.prototype);
gb.sprite.prototype.constructor = gb.sprite;


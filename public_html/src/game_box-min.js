var gb = {REVISION:"1"};
"function" === typeof define && define.amd ? define("gb", gb) : "undefined" !== typeof exports && "undefined" !== typeof module && (module.exports = gb);
var g_tag = 0;
gb.ces_entity = function $gb$ces_entity$() {
  this.m_tag = "ces_entity" + g_tag++;
  this.m_components = [];
  this.m_parent = null;
  this.m_children = [];
  this.m_ordered_children = [];
  this.m_visible = !0;
  Object.defineProperty(this, "tag", {set:function($value$$) {
    this.m_tag = $value$$;
  }, get:function() {
    return this.m_tag;
  }});
  Object.defineProperty(this, "parent", {set:function($value$$) {
    this.m_parent = $value$$;
  }, get:function() {
    return this.m_parent;
  }});
  Object.defineProperty(this, "children", {set:function($value$$) {
    this.m_ordered_children = $value$$;
  }, get:function() {
    return this.m_ordered_children;
  }});
  Object.defineProperty(this, "visible", {set:function($value$$) {
    this.m_visible = $value$$;
  }, get:function() {
    return this.m_visible;
  }});
};
gb.ces_entity.prototype = {constructor:gb.ces_entity, add_component:function $gb$ces_entity$$add_component$($component$$) {
}};
gb.ces_systems_feeder = function $gb$ces_systems_feeder$($guid$$) {
  this.m_systems = [];
  this.m_root = null;
  Object.defineProperty(this, "root", {set:function($value$$) {
    this.m_root = $value$$;
  }});
};
gb.ces_systems_feeder.prototype = {constructor:gb.ces_systems_feeder, on_update:function $gb$ces_systems_feeder$$on_update$($deltatime$$) {
  for (var $i$$ = 0;$i$$ < this.m_systems.length;++$i$$) {
    var $system$$ = this.m_systems[$i$$];
    $system$$.on_feed_start($deltatime$$);
  }
  for ($i$$ = 0;$i$$ < this.m_systems.length;++$i$$) {
    $system$$ = this.m_systems[$i$$], $system$$.on_feed(this.m_root, $deltatime$$);
  }
  for ($i$$ = 0;$i$$ < this.m_systems.length;++$i$$) {
    $system$$ = this.m_systems[$i$$], $system$$.on_feed_end($deltatime$$);
  }
}, add_system:function $gb$ces_systems_feeder$$add_system$($system$$) {
  this.remove_system($system$$.type);
  this.m_systems.push($system$$);
  this.m_systems.sort(function($system_01$$, $system_02$$) {
    return $system_01$$.priority - $system_02$$.priority;
  });
}, remove_system:function $gb$ces_systems_feeder$$remove_system$($type$$) {
  var $index$$ = this.m_systems.findIndex(function($system$$) {
    return $system$$.type === $type$$;
  });
  -1 !== $index$$ && this.m_systems.splice($index$$, 1);
}};
function ces_base_component() {
  this.m_type = "undefined";
}
ces_base_component.prototype.get_type = function $ces_base_component$$get_type$() {
  return this.m_type;
};
gb.ces_system_type = {undefined:-1, render:0};
gb.ces_base_system = function $gb$ces_base_system$() {
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
gb.ces_render_system = function $gb$ces_render_system$() {
  gb.ces_base_system.call(this);
  this.m_render_pipeline = new gb.render_pipeline;
  this.m_type = gb.ces_system_type.render;
  Object.defineProperty(this, "render_pipeline", {get:function() {
    return this.m_render_pipeline;
  }});
};
gb.ces_render_system.prototype = Object.create(gb.ces_base_system.prototype);
gb.ces_render_system.prototype.constructor = gb.ces_render_system;
gb.ces_render_system.prototype.on_feed_start = function $gb$ces_render_system$$on_feed_start$($deltatime$$) {
  this.m_render_pipeline.on_draw_begin();
};
gb.ces_render_system.prototype.on_feed = function $gb$ces_render_system$$on_feed$($root$$, $deltatime$$) {
  for (var $ws_render_techniques$$ = this.m_render_pipeline.ws_render_techniques, $i$$ = 0;$i$$ < $ws_render_techniques$$.length;++$i$$) {
    var $technique$$ = $ws_render_techniques$$[$i$$], $technique_name$$ = $technique$$.name;
    $technique$$.bind();
    for (var $technique_pass$$ = 0;$technique_pass$$ < $ws_render_techniques$$.num_passes;++$technique_pass$$) {
      draw_recursively($root$$, $technique_name$$, $technique_pass$$);
    }
    $technique$$.unbind();
  }
};
gb.ces_render_system.prototype.on_feed_end = function $gb$ces_render_system$$on_feed_end$($deltatime$$) {
  this.m_render_pipeline.on_draw_end();
};
gb.ces_render_system.prototype.draw_recursively = function $gb$ces_render_system$$draw_recursively$($entity$$, $technique_name$$, $technique_pass$$) {
};
gb.configuration_accessor = function $gb$configuration_accessor$() {
};
gb.configuration_accessor.prototype = {constructor:gb.configuration_accessor, get_transition_configuration:function $gb$configuration_accessor$$get_transition_configuration$($filename$$, $callback$$) {
  (new gb.transition_configuration).serialize($filename$$, function($configuration$$) {
    $callback$$($configuration$$);
  });
}};
var g_string_to_glenum = null;
gb.configuration_base = function $gb$configuration_base$() {
  this.m_configurations = [];
};
gb.configuration_base.string_to_glenum = function $gb$configuration_base$string_to_glenum$() {
  null === g_string_to_glenum && (g_string_to_glenum = [], g_string_to_glenum.GL_FRONT = gl.FRONT, g_string_to_glenum.GL_BACK = gl.BACK, g_string_to_glenum.GL_SRC_COLOR = gl.SRC_ALPHA, g_string_to_glenum.GL_SRC_ALPHA = gl.SRC_ALPHA, g_string_to_glenum.GL_ONE = gl.ONE, g_string_to_glenum.GL_ZERO = gl.ZERO, g_string_to_glenum.GL_ONE_MINUS_SRC_COLOR = gl.ONE_MINUS_SRC_COLOR, g_string_to_glenum.GL_ONE_MINUS_DST_COLOR = gl.ONE_MINUS_DST_COLOR, g_string_to_glenum.GL_ONE_MINUS_SRC_ALPHA = gl.ONE_MINUS_SRC_ALPHA, 
  g_string_to_glenum.GL_ONE_MINUS_DST_ALPHA = gl.ONE_MINUS_DST_ALPHA, g_string_to_glenum.GL_DST_ALPHA = gl.DST_ALPHA, g_string_to_glenum.GL_CONSTANT_ALPHA = gl.CONSTANT_ALPHA, g_string_to_glenum.GL_REPEAT = gl.REPEAT, g_string_to_glenum.GL_CLAMP_TO_EDGE = gl.CLAMP_TO_EDGE, g_string_to_glenum.GL_MIRRORED_REPEAT = gl.MIRRORED_REPEAT, g_string_to_glenum.GL_NEAREST = gl.NEAREST, g_string_to_glenum.GL_LINEAR = gl.LINEAR, g_string_to_glenum.GL_MIPMAP = gl.LINEAR_MIPMAP_NEAREST, g_string_to_glenum.GL_ALWAYS = 
  gl.ALWAYS, g_string_to_glenum.GL_EQUAL = gl.EQUAL, g_string_to_glenum.GL_NOTEQUAL = gl.NOTEQUAL, g_string_to_glenum.GL_FUNC_ADD = gl.FUNC_ADD);
  return g_string_to_glenum;
};
gb.configuration_base.prototype = {constructor:gb.configuration_base, set_configuration:function $gb$configuration_base$$set_configuration$($name$$, $value$$, $index$$) {
  this.m_configurations[$name$$] instanceof Object ? 3 === arguments.length ? 0 <= $index$$ && $index$$ < this.m_configurations[$name$$].length ? this.m_configurations[$name$$][$index$$] = $value$$ : this.m_configurations[$name$$].push($value$$) : this.m_configurations[$name$$].push($value$$) : (this.m_configurations[$name$$] = [], this.m_configurations[$name$$].push($value$$));
  return this;
}};
$.getScript("src/configurations/configuration_base.js");
gb.game_object_configuration = function $gb$game_object_configuration$() {
  gb.configuration_base.call(this);
  Object.defineProperty(this, "materials_configurations", {get:function() {
    return this.m_configurations instanceof Object && this.m_configurations.materials instanceof Object ? this.m_configurations.materials : null;
  }});
};
gb.game_object_configuration.prototype = Object.create(gb.configuration_base.prototype);
gb.game_object_configuration.prototype.constructor = gb.game_object_configuration;
$.getScript("src/configurations/configuration_base.js");
gb.main_technique_configuration = function $gb$main_technique_configuration$() {
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
gb.main_technique_configuration.prototype.serialize_material_configuration = function $gb$main_technique_configuration$$serialize_material_configuration$($callback$$) {
  var $self$$ = this;
  (new gb.material_configuration).serialize($self$$.json.material_filename, function($configuration$$) {
    $self$$.set_configuration("material_configuration", $configuration$$);
    $callback$$();
  });
};
gb.main_technique_configuration.prototype.serialize = function $gb$main_technique_configuration$$serialize$($filename$$, $callback$$) {
  var $self$$ = this;
  $.ajax({dataType:"json", url:$filename$$, data:{}, async:!0, success:function($value$$) {
    $self$$.json = $value$$;
    $self$$.serialize_material_configuration(function() {
      $callback$$($self$$);
    });
  }});
};
$.getScript("src/configurations/configuration_base.js");
$.getScript("src/configurations/shader_configuration.js");
$.getScript("src/configurations/texture_configuration.js");
gb.material_configuration = function $gb$material_configuration$() {
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
gb.material_configuration.prototype.serialize = function $gb$material_configuration$$serialize$($filename$$, $callback$$) {
  var $self$$ = this;
  $.ajax({dataType:"json", url:$filename$$, data:{}, async:!0, success:function($configuration$$4_value$$) {
    $self$$.json = $configuration$$4_value$$;
    $configuration$$4_value$$ = new gb.shader_configuration;
    $configuration$$4_value$$.serialize($self$$.json.shader);
    $self$$.set_configuration("shader", $configuration$$4_value$$);
    for (var $i$$ = 0;$i$$ < $self$$.json.textures.length;++$i$$) {
      $configuration$$4_value$$ = new gb.texture_configuration, $configuration$$4_value$$.serialize($self$$.json.textures[$i$$]), $self$$.set_configuration("textures", $configuration$$4_value$$);
    }
    $callback$$($self$$);
  }});
};
$.getScript("src/configurations/configuration_base.js");
gb.shader_configuration = function $gb$shader_configuration$() {
  gb.configuration_base.call(this);
  this.json = null;
  Object.defineProperty(this, "filename", {get:function() {
    return this.json.filename;
  }});
};
gb.shader_configuration.prototype = Object.create(gb.configuration_base.prototype);
gb.shader_configuration.prototype.constructor = gb.shader_configuration;
gb.shader_configuration.prototype.serialize = function $gb$shader_configuration$$serialize$($value$$) {
  this.json = $value$$;
};
$.getScript("src/configurations/configuration_base.js");
gb.ss_technique_configuration = function $gb$ss_technique_configuration$() {
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
gb.ss_technique_configuration.prototype.serialize_material_configuration = function $gb$ss_technique_configuration$$serialize_material_configuration$($callback$$) {
  var $self$$ = this;
  (new gb.material_configuration).serialize($self$$.json.material_filename, function($configuration$$) {
    $self$$.set_configuration("material_configuration", $configuration$$);
    $callback$$();
  });
};
gb.ss_technique_configuration.prototype.serialize = function $gb$ss_technique_configuration$$serialize$($filename$$, $callback$$) {
  var $self$$ = this;
  $.ajax({dataType:"json", url:$filename$$, data:{}, async:!0, success:function($value$$) {
    $self$$.json = $value$$;
    $self$$.serialize_material_configuration(function() {
      $callback$$($self$$);
    });
  }});
};
$.getScript("src/configurations/configuration_base.js");
gb.texture_configuration = function $gb$texture_configuration$() {
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
gb.texture_configuration.prototype.serialize = function $gb$texture_configuration$$serialize$($value$$) {
  this.json = $value$$;
};
$.getScript("src/configurations/configuration_base.js");
gb.transition_configuration = function $gb$transition_configuration$() {
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
gb.transition_configuration.prototype.serialize_main_technique_configuration = function $gb$transition_configuration$$serialize_main_technique_configuration$($callback$$) {
  var $self$$ = this;
  (new gb.main_technique_configuration).serialize($self$$.json.main_technique_filename, function($configuration$$) {
    $self$$.set_configuration("main_technique_configuration", $configuration$$);
    $callback$$();
  });
};
gb.transition_configuration.prototype.serialize_ws_techniques_configurations = function $gb$transition_configuration$$serialize_ws_techniques_configurations$($callback$$) {
  var $self$$ = this, $configurations_count$$ = $self$$.json.ws_techniques.length;
  if (0 < $configurations_count$$) {
    for (var $waiting_configurations_count$$ = $configurations_count$$, $i$$ = 0;$i$$ < $configurations_count$$;++$i$$) {
      (new gb.ws_technique_configuration).serialize($self$$.json.ws_techniques[$i$$].filename, function($configuration$$) {
        $self$$.set_configuration("ws_techniques_configurations", $configuration$$);
        $waiting_configurations_count$$--;
        0 === $waiting_configurations_count$$ && $callback$$();
      });
    }
  } else {
    $callback$$();
  }
};
gb.transition_configuration.prototype.serialize_ss_techniques_configurations = function $gb$transition_configuration$$serialize_ss_techniques_configurations$($callback$$) {
  var $self$$ = this, $configurations_count$$ = $self$$.json.ss_techniques.length;
  if (0 < $configurations_count$$) {
    for (var $waiting_configurations_count$$ = $configurations_count$$, $i$$ = 0;$i$$ < $configurations_count$$;++$i$$) {
      (new gb.ss_technique_configuration).serialize($self$$.json.ss_techniques[$i$$].filename, function($configuration$$) {
        $self$$.set_configuration("ss_techniques_configurations", $configuration$$);
        $waiting_configurations_count$$--;
        0 === $waiting_configurations_count$$ && $callback$$();
      });
    }
  } else {
    $callback$$();
  }
};
gb.transition_configuration.prototype.serialize = function $gb$transition_configuration$$serialize$($filename$$, $callback$$) {
  var $self$$ = this;
  $.ajax({dataType:"json", url:$filename$$, data:{}, async:!0, success:function($value$$) {
    $self$$.json = $value$$;
    $self$$.serialize_main_technique_configuration(function() {
      $self$$.serialize_ws_techniques_configurations(function() {
        $self$$.serialize_ss_techniques_configurations(function() {
          $callback$$($self$$);
        });
      });
    });
  }});
};
$.getScript("src/configurations/configuration_base.js");
gb.ws_technique_configuration = function $gb$ws_technique_configuration$() {
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
gb.ws_technique_configuration.prototype.serialize = function $gb$ws_technique_configuration$$serialize$($filename$$, $callback$$) {
  var $self$$ = this;
  $.ajax({dataType:"json", url:$filename$$, data:{}, async:!0, success:function($value$$) {
    $self$$.json = $value$$;
    $callback$$($self$$);
  }});
};
gb.game_loop = function $gb$game_loop$() {
  this.m_listeners = [];
};
gb.game_loop.prototype = {constructor:gb.game_loop, on_update:function $gb$game_loop$$on_update$() {
  for (var $i$$ = 0;$i$$ < this.m_listeners.length;++$i$$) {
    this.m_listeners[$i$$].on_update(0);
  }
  console.log("on_update");
}, add_listener:function $gb$game_loop$$add_listener$($listener$$) {
  _.isFunction($listener$$.on_update) ? _.contains(this.m_listeners, $listener$$) ? console.error("can't add same listener for game loop") : this.m_listeners.push($listener$$) : console.error("game loop listener doesn't contain on_update method");
}, remove_listener:function $gb$game_loop$$remove_listener$($index$$48_listener$$) {
  $index$$48_listener$$ = _.indexOf(this.m_listeners, $index$$48_listener$$);
  -1 !== $index$$48_listener$$ ? this.m_listeners.splice($index$$48_listener$$, 1) : console.error("game loop doesn't contain this listener");
}};
var g_game_loop = null, game_loop = function($window$$) {
  function $on_update$$() {
    g_game_loop.on_update();
    g_game_loop.attach_to_runloop()($on_update$$);
  }
  function $init$$() {
    g_game_loop = new gb.game_loop;
    g_game_loop.attach_to_runloop = function $g_game_loop$attach_to_runloop$() {
      return $window$$.requestAnimationFrame || $window$$.webkitRequestAnimationFrame || $window$$.mozRequestAnimationFrame || $window$$.oRequestAnimationFrame || $window$$.msRequestAnimationFrame || function($callback$$) {
        $window$$.setTimeout($callback$$, 1E3 / 60);
      };
    };
    return g_game_loop;
  }
  return {get_instance:function() {
    g_game_loop || (g_game_loop = $init$$(), $on_update$$());
    return g_game_loop;
  }};
}(window), loop = function() {
  return game_loop.get_instance();
}();
gb.game_transition = function $gb$game_transition$($guid$$) {
  this.m_guid = $guid$$;
  this.m_resource_accessor = this.m_configuration_accessor = null;
  this.m_systems_feeder = new gb.ces_systems_feeder;
  Object.defineProperty(this, "guid", {get:function() {
    return this.m_guid;
  }});
};
gb.game_transition.prototype = {constructor:gb.game_transition, on_activated:function $gb$game_transition$$on_activated$($configuration_accessor$$, $resource_accessor$$) {
  this.m_configuration_accessor = $configuration_accessor$$;
  this.m_resource_accessor = $resource_accessor$$;
  var $render_system$$ = new gb.ces_render_system, $render_pipeline$$ = $render_system$$.render_pipeline, $self$$ = this;
  this.m_configuration_accessor.get_transition_configuration(this.m_guid, function($transition_configuration$$) {
    if (null !== $transition_configuration$$.ws_techniques_configurations) {
      for (var $i$$ = 0;$i$$ < $transition_configuration$$.ws_techniques_configurations.length;++$i$$) {
        var $ss_technique_configuration$$1_ws_technique_configuration$$ = $transition_configuration$$.ws_techniques_configurations[$i$$], $material_configuration$$ = Math.min(gl.viewport_width, $ss_technique_configuration$$1_ws_technique_configuration$$.screen_width), $clear_color_screen_height$$ = Math.min(gl.viewport_height, $ss_technique_configuration$$1_ws_technique_configuration$$.screen_height), $material_configuration$$ = new gb.render_technique_ws($material_configuration$$, $clear_color_screen_height$$, 
        $ss_technique_configuration$$1_ws_technique_configuration$$.technique_name, $ss_technique_configuration$$1_ws_technique_configuration$$.index, $ss_technique_configuration$$1_ws_technique_configuration$$.num_passes), $clear_color_screen_height$$ = new gb.vec4($ss_technique_configuration$$1_ws_technique_configuration$$.clear_color_r, $ss_technique_configuration$$1_ws_technique_configuration$$.clear_color_g, $ss_technique_configuration$$1_ws_technique_configuration$$.clear_color_b, $ss_technique_configuration$$1_ws_technique_configuration$$.clear_color_a);
        $material_configuration$$.clear_color = $clear_color_screen_height$$;
        $render_pipeline$$.add_ws_render_technique($ss_technique_configuration$$1_ws_technique_configuration$$.technique_name, $ss_technique_configuration$$1_ws_technique_configuration$$.index, $material_configuration$$);
        $self$$.m_resource_accessor.add_custom_resource($ss_technique_configuration$$1_ws_technique_configuration$$.technique_name + ".color", $material_configuration$$.color_attachment_texture);
        $self$$.m_resource_accessor.add_custom_resource($ss_technique_configuration$$1_ws_technique_configuration$$.technique_name + ".depth", $material_configuration$$.depth_attachment_texture);
      }
    }
    if (null !== $transition_configuration$$.ss_techniques_configurations) {
      for ($i$$ = 0;$i$$ < $transition_configuration$$.ss_techniques_configurations.length;++$i$$) {
        var $ss_technique_configuration$$1_ws_technique_configuration$$ = $transition_configuration$$.ss_techniques_configurations[$i$$], $material_configuration$$ = $ss_technique_configuration$$1_ws_technique_configuration$$.material_configuration, $material$$ = gb.material.construct($material_configuration$$);
        gb.material.set_shader($material$$, $material_configuration$$, $self$$.m_resource_accessor);
        gb.material.set_textures($material$$, $material_configuration$$, $self$$.m_resource_accessor);
        $material_configuration$$ = Math.min(gl.viewport_width, $ss_technique_configuration$$1_ws_technique_configuration$$.screen_width);
        $clear_color_screen_height$$ = Math.min(gl.viewport_height, $ss_technique_configuration$$1_ws_technique_configuration$$.screen_height);
        $material_configuration$$ = new gb.render_technique_ss($material_configuration$$, $clear_color_screen_height$$, $ss_technique_configuration$$1_ws_technique_configuration$$.technique_name, $material$$);
        $render_pipeline$$.add_ss_render_technique($ss_technique_configuration$$1_ws_technique_configuration$$.technique_name, $material_configuration$$);
        $self$$.m_resource_accessor.add_custom_resource($ss_technique_configuration$$1_ws_technique_configuration$$.technique_name + ".color", $material_configuration$$.color_attachment_texture);
      }
    }
    $material_configuration$$ = $transition_configuration$$.main_technique_configuration.material_configuration;
    $material$$ = gb.material.construct($material_configuration$$);
    gb.material.set_shader($material$$, $material_configuration$$, $self$$.m_resource_accessor);
    gb.material.set_textures($material$$, $material_configuration$$, $self$$.m_resource_accessor);
    $render_pipeline$$.create_main_render_technique($material$$);
    $self$$.m_systems_feeder.add_system($render_system$$);
    loop.add_listener($self$$.m_systems_feeder);
  });
}};
gb.mesh_constructor = function $gb$mesh_constructor$() {
};
gb.mesh_constructor.create_screen_quad = function $gb$mesh_constructor$create_screen_quad$() {
  var $vbo$$ = new gb.vbo(4, gl.STATIC_DRAW), $ibo_vertices$$ = $vbo$$.lock();
  $ibo_vertices$$[0].position = new gb.vec2(-1, -1);
  $ibo_vertices$$[0].texcoord = new gb.vec2(0, 0);
  $ibo_vertices$$[1].position = new gb.vec2(-1, 1);
  $ibo_vertices$$[1].texcoord = new gb.vec2(0, 1);
  $ibo_vertices$$[2].position = new gb.vec2(1, -1);
  $ibo_vertices$$[2].texcoord = new gb.vec2(1, 0);
  $ibo_vertices$$[3].position = new gb.vec2(1, 1);
  $ibo_vertices$$[3].texcoord = new gb.vec2(1, 1);
  $vbo$$.unlock();
  var $ibo_vertices$$ = new gb.ibo(6, gl.STATIC_DRAW), $indices$$ = $ibo_vertices$$.lock();
  $indices$$[0] = 0;
  $indices$$[1] = 1;
  $indices$$[2] = 2;
  $indices$$[3] = 1;
  $indices$$[4] = 2;
  $indices$$[5] = 3;
  $ibo_vertices$$.unlock();
  return new gb.mesh($vbo$$, $ibo_vertices$$, gl.TRIANGLES);
};
gb.mesh_constructor.create_sprite_quad = function $gb$mesh_constructor$create_sprite_quad$() {
  return null;
};
gb.mat4 = function $gb$mat4$() {
  this.m_elements = [[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]];
};
gb.mat4.multiply = function $gb$mat4$multiply$($matrix_01$$, $matrix_02$$) {
  var $a44_ae$$ = $matrix_01$$.m_elements, $b44_be$$ = $matrix_02$$.m_elements, $matrix_03$$ = new gb.mat4, $a11$$ = $a44_ae$$[0], $a12$$ = $a44_ae$$[4], $a13$$ = $a44_ae$$[8], $a14$$ = $a44_ae$$[12], $a21$$ = $a44_ae$$[1], $a22$$ = $a44_ae$$[5], $a23$$ = $a44_ae$$[9], $a24$$ = $a44_ae$$[13], $a31$$ = $a44_ae$$[2], $a32$$ = $a44_ae$$[6], $a33$$ = $a44_ae$$[10], $a34$$ = $a44_ae$$[14], $a41$$ = $a44_ae$$[3], $a42$$ = $a44_ae$$[7], $a43$$ = $a44_ae$$[11], $a44_ae$$ = $a44_ae$$[15], $b11$$ = $b44_be$$[0], 
  $b12$$ = $b44_be$$[4], $b13$$ = $b44_be$$[8], $b14$$ = $b44_be$$[12], $b21$$ = $b44_be$$[1], $b22$$ = $b44_be$$[5], $b23$$ = $b44_be$$[9], $b24$$ = $b44_be$$[13], $b31$$ = $b44_be$$[2], $b32$$ = $b44_be$$[6], $b33$$ = $b44_be$$[10], $b34$$ = $b44_be$$[14], $b41$$ = $b44_be$$[3], $b42$$ = $b44_be$$[7], $b43$$ = $b44_be$$[11], $b44_be$$ = $b44_be$$[15];
  $matrix_03$$.m_elements[0] = $a11$$ * $b11$$ + $a12$$ * $b21$$ + $a13$$ * $b31$$ + $a14$$ * $b41$$;
  $matrix_03$$.m_elements[4] = $a11$$ * $b12$$ + $a12$$ * $b22$$ + $a13$$ * $b32$$ + $a14$$ * $b42$$;
  $matrix_03$$.m_elements[8] = $a11$$ * $b13$$ + $a12$$ * $b23$$ + $a13$$ * $b33$$ + $a14$$ * $b43$$;
  $matrix_03$$.m_elements[12] = $a11$$ * $b14$$ + $a12$$ * $b24$$ + $a13$$ * $b34$$ + $a14$$ * $b44_be$$;
  $matrix_03$$.m_elements[1] = $a21$$ * $b11$$ + $a22$$ * $b21$$ + $a23$$ * $b31$$ + $a24$$ * $b41$$;
  $matrix_03$$.m_elements[5] = $a21$$ * $b12$$ + $a22$$ * $b22$$ + $a23$$ * $b32$$ + $a24$$ * $b42$$;
  $matrix_03$$.m_elements[9] = $a21$$ * $b13$$ + $a22$$ * $b23$$ + $a23$$ * $b33$$ + $a24$$ * $b43$$;
  $matrix_03$$.m_elements[13] = $a21$$ * $b14$$ + $a22$$ * $b24$$ + $a23$$ * $b34$$ + $a24$$ * $b44_be$$;
  $matrix_03$$.m_elements[2] = $a31$$ * $b11$$ + $a32$$ * $b21$$ + $a33$$ * $b31$$ + $a34$$ * $b41$$;
  $matrix_03$$.m_elements[6] = $a31$$ * $b12$$ + $a32$$ * $b22$$ + $a33$$ * $b32$$ + $a34$$ * $b42$$;
  $matrix_03$$.m_elements[10] = $a31$$ * $b13$$ + $a32$$ * $b23$$ + $a33$$ * $b33$$ + $a34$$ * $b43$$;
  $matrix_03$$.m_elements[14] = $a31$$ * $b14$$ + $a32$$ * $b24$$ + $a33$$ * $b34$$ + $a34$$ * $b44_be$$;
  $matrix_03$$.m_elements[3] = $a41$$ * $b11$$ + $a42$$ * $b21$$ + $a43$$ * $b31$$ + $a44_ae$$ * $b41$$;
  $matrix_03$$.m_elements[7] = $a41$$ * $b12$$ + $a42$$ * $b22$$ + $a43$$ * $b32$$ + $a44_ae$$ * $b42$$;
  $matrix_03$$.m_elements[11] = $a41$$ * $b13$$ + $a42$$ * $b23$$ + $a43$$ * $b33$$ + $a44_ae$$ * $b43$$;
  $matrix_03$$.m_elements[15] = $a41$$ * $b14$$ + $a42$$ * $b24$$ + $a43$$ * $b34$$ + $a44_ae$$ * $b44_be$$;
  return $matrix_03$$;
};
gb.mat4.prototype = {constructor:gb.mat4, identity:function $gb$mat4$$identity$() {
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
}, rotate:function $gb$mat4$$rotate$($a_euler$$) {
  var $b_x$$ = $a_euler$$.x, $d_y$$ = $a_euler$$.y, $f$$1_z$$ = $a_euler$$.z;
  $a_euler$$ = Math.cos($b_x$$);
  var $b_x$$ = Math.sin($b_x$$), $c$$ = Math.cos($d_y$$), $d_y$$ = Math.sin($d_y$$), $e$$ = Math.cos($f$$1_z$$), $f$$1_z$$ = Math.sin($f$$1_z$$), $ae$$ = $a_euler$$ * $e$$, $af$$ = $a_euler$$ * $f$$1_z$$, $be$$ = $b_x$$ * $e$$, $bf$$ = $b_x$$ * $f$$1_z$$;
  this.m_elements[0] = $c$$ * $e$$;
  this.m_elements[4] = -$c$$ * $f$$1_z$$;
  this.m_elements[8] = $d_y$$;
  this.m_elements[1] = $af$$ + $be$$ * $d_y$$;
  this.m_elements[5] = $ae$$ - $bf$$ * $d_y$$;
  this.m_elements[9] = -$b_x$$ * $c$$;
  this.m_elements[2] = $bf$$ - $ae$$ * $d_y$$;
  this.m_elements[6] = $be$$ + $af$$ * $d_y$$;
  this.m_elements[10] = $a_euler$$ * $c$$;
  this.m_elements[3] = 0;
  this.m_elements[7] = 0;
  this.m_elements[11] = 0;
  this.m_elements[12] = 0;
  this.m_elements[13] = 0;
  this.m_elements[14] = 0;
  this.m_elements[15] = 1;
  return this;
}, translate:function $gb$mat4$$translate$($x$$, $y$$, $z$$) {
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
  this.m_elements[3] = $x$$;
  this.m_elements[7] = $y$$;
  this.m_elements[11] = $z$$;
  this.m_elements[15] = 1;
  return this;
}, rotation_x:function $gb$mat4$$rotation_x$($s$$) {
  var $c$$ = Math.cos($s$$);
  $s$$ = Math.sin($s$$);
  this.m_elements[0] = 1;
  this.m_elements[4] = 0;
  this.m_elements[8] = 0;
  this.m_elements[12] = 0;
  this.m_elements[1] = 0;
  this.m_elements[5] = $c$$;
  this.m_elements[9] = -$s$$;
  this.m_elements[13] = 0;
  this.m_elements[2] = 0;
  this.m_elements[6] = $s$$;
  this.m_elements[10] = $c$$;
  this.m_elements[14] = 0;
  this.m_elements[3] = 0;
  this.m_elements[7] = 0;
  this.m_elements[11] = 0;
  this.m_elements[15] = 1;
  return this;
}, rotate_y:function $gb$mat4$$rotate_y$($s$$3_theta$$) {
  var $c$$ = Math.cos($s$$3_theta$$);
  $s$$3_theta$$ = Math.sin($s$$3_theta$$);
  this.m_elements[0] = $c$$;
  this.m_elements[4] = 0;
  this.m_elements[8] = $s$$3_theta$$;
  this.m_elements[12] = 0;
  this.m_elements[1] = 0;
  this.m_elements[5] = 1;
  this.m_elements[9] = 0;
  this.m_elements[13] = 0;
  this.m_elements[2] = -$s$$3_theta$$;
  this.m_elements[6] = 0;
  this.m_elements[10] = $c$$;
  this.m_elements[14] = 0;
  this.m_elements[3] = 0;
  this.m_elements[7] = 0;
  this.m_elements[11] = 0;
  this.m_elements[15] = 1;
  return this;
}, rotate_z:function $gb$mat4$$rotate_z$($s$$4_theta$$) {
  var $c$$ = Math.cos($s$$4_theta$$);
  $s$$4_theta$$ = Math.sin($s$$4_theta$$);
  this.m_elements[0] = $c$$;
  this.m_elements[4] = -$s$$4_theta$$;
  this.m_elements[8] = 0;
  this.m_elements[12] = 0;
  this.m_elements[1] = $s$$4_theta$$;
  this.m_elements[5] = $c$$;
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
}, scale:function $gb$mat4$$scale$($x$$, $y$$, $z$$) {
  this.m_elements[0] = $x$$;
  this.m_elements[4] = 0;
  this.m_elements[8] = 0;
  this.m_elements[12] = 0;
  this.m_elements[1] = 0;
  this.m_elements[5] = $y$$;
  this.m_elements[9] = 0;
  this.m_elements[13] = 0;
  this.m_elements[2] = 0;
  this.m_elements[6] = 0;
  this.m_elements[10] = $z$$;
  this.m_elements[14] = 0;
  this.m_elements[3] = 0;
  this.m_elements[7] = 0;
  this.m_elements[11] = 0;
  this.m_elements[15] = 1;
  return this;
}, frustum:function $gb$mat4$$frustum$($left$$, $right$$, $bottom$$, $top$$, $near$$, $far$$) {
  this.m_elements[0] = 2 * $near$$ / ($right$$ - $left$$);
  this.m_elements[4] = 0;
  this.m_elements[8] = ($right$$ + $left$$) / ($right$$ - $left$$);
  this.m_elements[12] = 0;
  this.m_elements[1] = 0;
  this.m_elements[5] = 2 * $near$$ / ($top$$ - $bottom$$);
  this.m_elements[9] = ($top$$ + $bottom$$) / ($top$$ - $bottom$$);
  this.m_elements[13] = 0;
  this.m_elements[2] = 0;
  this.m_elements[6] = 0;
  this.m_elements[10] = -($far$$ + $near$$) / ($far$$ - $near$$);
  this.m_elements[14] = -2 * $far$$ * $near$$ / ($far$$ - $near$$);
  this.m_elements[3] = 0;
  this.m_elements[7] = 0;
  this.m_elements[11] = -1;
  this.m_elements[15] = 0;
  return this;
}, perspective:function $gb$mat4$$perspective$($fov_ymax$$, $aspect$$, $near$$, $far$$) {
  $fov_ymax$$ = $near$$ * Math.tan(gb.math.radians(.5 * $fov_ymax$$));
  var $ymin$$ = -$fov_ymax$$;
  return this.frustum($ymin$$ * $aspect$$, $fov_ymax$$ * $aspect$$, $ymin$$, $fov_ymax$$, $near$$, $far$$);
}, ortho:function $gb$mat4$$ortho$($left$$, $right$$, $top$$, $bottom$$, $near$$, $far$$) {
  var $w$$ = 1 / ($right$$ - $left$$), $h$$ = 1 / ($top$$ - $bottom$$), $p$$ = 1 / ($far$$ - $near$$);
  this.m_elements[0] = 2 * $w$$;
  this.m_elements[4] = 0;
  this.m_elements[8] = 0;
  this.m_elements[12] = -(($right$$ + $left$$) * $w$$);
  this.m_elements[1] = 0;
  this.m_elements[5] = 2 * $h$$;
  this.m_elements[9] = 0;
  this.m_elements[13] = -(($top$$ + $bottom$$) * $h$$);
  this.m_elements[2] = 0;
  this.m_elements[6] = 0;
  this.m_elements[10] = -2 * $p$$;
  this.m_elements[14] = -(($far$$ + $near$$) * $p$$);
  this.m_elements[3] = 0;
  this.m_elements[7] = 0;
  this.m_elements[11] = 0;
  this.m_elements[15] = 1;
  return this;
}, look_at:function $gb$mat4$$look_at$($eye$$, $target$$, $up$$) {
  var $x$$ = new gb.vec3, $y$$ = new gb.vec3, $z$$ = new gb.vec3, $z$$ = gb.vec3.sub($eye$$, $target$$).normalize();
  0 === $z$$.length_sq() && ($z$$.z = 1);
  $x$$ = gb.vec3.cross($up$$, $z$$).normalize();
  0 === $x$$.length_sq() && ($z$$.x += 1E-4, $x$$ = gb.vec3.cross($up$$, $z$$).normalize());
  $y$$ = gb.vec3.cross($z$$, $x$$);
  this.m_elements[0] = $x$$.x;
  this.m_elements[4] = $y$$.x;
  this.m_elements[8] = $z$$.x;
  this.m_elements[1] = $x$$.y;
  this.m_elements[5] = $y$$.y;
  this.m_elements[9] = $z$$.y;
  this.m_elements[2] = $x$$.z;
  this.m_elements[6] = $y$$.z;
  this.m_elements[10] = $z$$.z;
  return this;
}, equals:function $gb$mat4$$equals$($matrix$$) {
  for (var $i$$ = 0;16 > $i$$;$i$$++) {
    if (this.m_elements[$i$$] !== $matrix$$.m_elements[$i$$]) {
      return !1;
    }
  }
  return !0;
}, to_array:function $gb$mat4$$to_array$() {
  return this.m_elements;
}};
var INT16_MAX = 32767, INT16_MIN = -32768;
gb.math = function $gb$math$() {
};
gb.math.radians = function $gb$math$radians$($degrees$$) {
  return Math.PI / 180 * $degrees$$;
};
gb.math.degrees = function $gb$math$degrees$($radians$$) {
  return 180 / Math.PI * $radians$$;
};
gb.vec2 = function $gb$vec2$() {
  arguments[0] instanceof gb.vec2 ? (this.m_x = arguments[0].x, this.m_y = arguments[0].y) : 1 === arguments.length ? (this.m_x = arguments[0], this.m_y = arguments[0]) : 2 === arguments.length ? (this.m_x = arguments[0], this.m_y = arguments[1]) : this.m_y = this.m_x = 0;
  Object.defineProperty(this, "x", {get:function() {
    return this.m_x;
  }, set:function($value$$) {
    this.m_x = $value$$;
  }});
  Object.defineProperty(this, "y", {get:function() {
    return this.m_y;
  }, set:function($value$$) {
    this.m_y = $value$$;
  }});
};
gb.vec2.add = function $gb$vec2$add$($vector_01$$, $vector_02$$) {
  return new gb.vec2($vector_01$$.x + $vector_02$$.x, $vector_01$$.y + $vector_02$$.y);
};
gb.vec2.sub = function $gb$vec2$sub$($vector_01$$, $vector_02$$) {
  return new gb.vec2($vector_01$$.x - $vector_02$$.x, $vector_01$$.y - $vector_02$$.y);
};
gb.vec2.lerp = function $gb$vec2$lerp$($vector_01$$, $vector_02$$, $alpha$$) {
  return gb.vec2.sub($vector_02$$, $vector_01$$).multiply_scalar($alpha$$).add($vector_01$$);
};
gb.vec2.equals = function $gb$vec2$equals$($vector_01$$, $vector_02$$) {
  return $vector_01$$.x === $vector_02$$.x && $vector_01$$.y === $vector_02$$.y;
};
gb.vec2.min = function $gb$vec2$min$($vector_01$$, $vector_02$$) {
  var $vector_03$$ = new gb.vec2(0);
  $vector_03$$.x = Math.min($vector_01$$.x, $vector_02$$.x);
  $vector_03$$.y = Math.min($vector_01$$.y, $vector_02$$.y);
  return $vector_03$$;
};
gb.vec2.max = function $gb$vec2$max$($vector_01$$, $vector_02$$) {
  var $vector_03$$ = new gb.vec2(0);
  $vector_03$$.x = Math.max($vector_01$$.x, $vector_02$$.x);
  $vector_03$$.y = Math.max($vector_01$$.y, $vector_02$$.y);
  return $vector_03$$;
};
gb.vec2.prototype = {constructor:gb.vec2, add:function $gb$vec2$$add$($vector$$) {
  this.x += $vector$$.x;
  this.y += $vector$$.y;
  return this;
}, add_scalar:function $gb$vec2$$add_scalar$($scalar$$) {
  this.x += $scalar$$;
  this.y += $scalar$$;
  return this;
}, sub:function $gb$vec2$$sub$($value$$) {
  this.x -= $value$$.x;
  this.y -= $value$$.y;
  return this;
}, sub_scalar:function $gb$vec2$$sub_scalar$($value$$) {
  this.x -= $value$$;
  this.y -= $value$$;
  return this;
}, multiply:function $gb$vec2$$multiply$($value$$) {
  this.x *= $value$$.x;
  this.y *= $value$$.y;
  return this;
}, multiply_scalar:function $gb$vec2$$multiply_scalar$($value$$) {
  this.x *= $value$$;
  this.y *= $value$$;
  return this;
}, divide:function $gb$vec2$$divide$($value$$) {
  this.x /= $value$$.x;
  this.y /= $value$$.y;
  return this;
}, divide_scalar:function $gb$vec2$$divide_scalar$($value$$) {
  this.x /= $value$$;
  this.y /= $value$$;
  return this;
}, clamp:function $gb$vec2$$clamp$($min$$, $max$$) {
  this.x = Math.max($min$$.x, Math.min($max$$.x, this.x));
  this.y = Math.max($min$$.y, Math.min($max$$.y, this.y));
  return this;
}, dot:function $gb$vec2$$dot$($value$$) {
  return this.x * $value$$.x + this.y * $value$$.y;
}, length:function $gb$vec2$$length$() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
}, normalize:function $gb$vec2$$normalize$() {
  return this.divide_scalar(this.length());
}, angle:function $gb$vec2$$angle$() {
  var $angle$$ = Math.atan2(this.y, this.x);
  0 > $angle$$ && ($angle$$ += 2 * Math.PI);
  return $angle$$;
}, distance_to:function $gb$vec2$$distance_to$($dy$$4_value$$) {
  var $dx$$ = this.x - $dy$$4_value$$.x;
  $dy$$4_value$$ = this.y - $dy$$4_value$$.y;
  return Math.sqrt($dx$$ * $dx$$ + $dy$$4_value$$ * $dy$$4_value$$);
}, lerp:function $gb$vec2$$lerp$($value$$, $alpha$$) {
  this.x += ($value$$.x - this.x) * $alpha$$;
  this.y += ($value$$.y - this.y) * $alpha$$;
  return this;
}, equals:function $gb$vec2$$equals$($value$$) {
  return $value$$.x === this.x && $value$$.y === this.y;
}, to_array:function $gb$vec2$$to_array$() {
  var $array$$ = [];
  $array$$[0] = this.x;
  $array$$[1] = this.y;
  return $array$$;
}};
gb.vec3 = function $gb$vec3$() {
  "gb.vec3" === typeof arguments[0] ? (this.m_x = arguments[0].x, this.m_y = arguments[0].y, this.m_z = arguments[0].z) : 1 === arguments.length ? (this.m_x = arguments[0], this.m_y = arguments[0], this.m_z = arguments[0]) : 3 === arguments.length ? (this.m_x = arguments[0], this.m_y = arguments[1], this.m_z = arguments[2]) : this.m_z = this.m_y = this.m_x = 0;
  Object.defineProperty(this, "x", {get:function() {
    return this.m_x;
  }, set:function($value$$) {
    this.m_x = $value$$;
  }});
  Object.defineProperty(this, "y", {get:function() {
    return this.m_y;
  }, set:function($value$$) {
    this.m_y = $value$$;
  }});
  Object.defineProperty(this, "z", {get:function() {
    return this.m_z;
  }, set:function($value$$) {
    this.m_z = $value$$;
  }});
};
gb.vec3.add = function $gb$vec3$add$($vector_01$$, $vector_02$$) {
  return new gb.vec3($vector_01$$.x + $vector_02$$.x, $vector_01$$.y + $vector_02$$.y, $vector_01$$.z + $vector_02$$.z);
};
gb.vec3.sub = function $gb$vec3$sub$($vector_01$$, $vector_02$$) {
  return new gb.vec3($vector_01$$.x - $vector_02$$.x, $vector_01$$.y - $vector_02$$.y, $vector_01$$.z - $vector_02$$.z);
};
gb.vec3.cross = function $gb$vec3$cross$($vector_01$$, $vector_02$$) {
  return new gb.vec3($vector_01$$.y * $vector_02$$.z - $vector_01$$.z * $vector_02$$.y, $vector_01$$.z * $vector_02$$.x - $vector_01$$.x * $vector_02$$.z, $vector_01$$.x * $vector_02$$.y - $vector_01$$.y * $vector_02$$.x);
};
gb.vec3.prototype = {constructor:gb.vec3, add:function $gb$vec3$$add$($value$$) {
  this.x += $value$$.x;
  this.y += $value$$.y;
  this.z += $value$$.z;
  return this;
}, add_scalar:function $gb$vec3$$add_scalar$($value$$) {
  this.x += $value$$;
  this.y += $value$$;
  this.z += $value$$;
  return this;
}, sub:function $gb$vec3$$sub$($value$$) {
  this.x -= $value$$.x;
  this.y -= $value$$.y;
  this.z -= $value$$.z;
  return this;
}, sub_scalar:function $gb$vec3$$sub_scalar$($value$$) {
  this.x -= $value$$;
  this.y -= $value$$;
  this.z -= $value$$;
  return this;
}, multiply:function $gb$vec3$$multiply$($value$$) {
  this.x *= $value$$.x;
  this.y *= $value$$.y;
  this.z *= $value$$.z;
  return this;
}, multiply_scalar:function $gb$vec3$$multiply_scalar$($value$$) {
  this.x *= $value$$;
  this.y *= $value$$;
  this.z *= $value$$;
  return this;
}, divide:function $gb$vec3$$divide$($value$$) {
  this.x /= $value$$.x;
  this.y /= $value$$.y;
  this.z /= $value$$.z;
  return this;
}, divide_scalar:function $gb$vec3$$divide_scalar$($value$$) {
  this.x /= $value$$;
  this.y /= $value$$;
  this.z /= $value$$;
  return this;
}, min:function $gb$vec3$$min$($value$$) {
  this.x = Math.min(this.x, $value$$.x);
  this.y = Math.min(this.y, $value$$.y);
  this.z = Math.min(this.z, $value$$.z);
  return this;
}, max:function $gb$vec3$$max$($value$$) {
  this.x = Math.max(this.x, $value$$.x);
  this.y = Math.max(this.y, $value$$.y);
  this.z = Math.max(this.z, $value$$.z);
  return this;
}, clamp:function $gb$vec3$$clamp$($min$$, $max$$) {
  this.x = Math.max($min$$.x, Math.min($max$$.x, this.x));
  this.y = Math.max($min$$.y, Math.min($max$$.y, this.y));
  this.z = Math.max($min$$.z, Math.min($max$$.z, this.z));
  return this;
}, dot:function $gb$vec3$$dot$($value$$) {
  return this.x * $value$$.x + this.y * $value$$.y + this.z * $value$$.z;
}, cross:function $gb$vec3$$cross$($value$$) {
  var $x$$ = this.x, $y$$ = this.y, $z$$ = this.z;
  this.x = $y$$ * $value$$.z - $z$$ * $value$$.y;
  this.y = $z$$ * $value$$.x - $x$$ * $value$$.z;
  this.z = $x$$ * $value$$.y - $y$$ * $value$$.x;
  return this;
}, length:function $gb$vec3$$length$() {
  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
}, length_sq:function $gb$vec3$$length_sq$() {
  return this.x * this.x + this.y * this.y + this.z * this.z;
}, normalize:function $gb$vec3$$normalize$() {
  return this.divide_scalar(this.length());
}, distance_to:function $gb$vec3$$distance_to$($dz_value$$) {
  var $dx$$ = this.x - $dz_value$$.x, $dy$$ = this.y - $dz_value$$.y;
  $dz_value$$ = this.z - $dz_value$$.z;
  return Math.sqrt($dx$$ * $dx$$ + $dy$$ * $dy$$ + $dz_value$$ * $dz_value$$);
}, lerp:function $gb$vec3$$lerp$($value$$, $alpha$$) {
  this.x += ($value$$.x - this.x) * $alpha$$;
  this.y += ($value$$.y - this.y) * $alpha$$;
  this.z += ($value$$.z - this.z) * $alpha$$;
  return this;
}, lerp_vectors:function $gb$vec3$$lerp_vectors$($value_01$$, $value_02$$, $alpha$$) {
  this.sub_vectors($value_02$$, $value_01$$).multiply_scalar($alpha$$).add($value_01$$);
  return this;
}, equals:function $gb$vec3$$equals$($value$$) {
  return $value$$.x === this.x && $value$$.y === this.y && $value$$.z === this.z;
}, to_array:function $gb$vec3$$to_array$() {
  var $array$$ = [];
  $array$$[0] = this.x;
  $array$$[1] = this.y;
  $array$$[2] = this.z;
  return $array$$;
}};
gb.vec4 = function $gb$vec4$() {
  "gb.vec4" === typeof arguments[0] ? (this.x = arguments[0].get_x(), this.y = arguments[0].get_y(), this.z = arguments[0].get_z(), this.w = arguments[0].get_w()) : 1 === arguments.length ? (this.x = arguments[0], this.y = arguments[0], this.z = arguments[0], this.w = arguments[0]) : 4 === arguments.length ? (this.x = arguments[0], this.y = arguments[1], this.z = arguments[2], this.w = arguments[3]) : this.w = this.z = this.y = this.x = 0;
};
gb.vec4.prototype = {constructor:gb.vec4, clone:function $gb$vec4$$clone$() {
  return new this.constructor(this.x, this.y, this.z, this.w);
}, copy:function $gb$vec4$$copy$($value$$) {
  this.x = $value$$.x;
  this.y = $value$$.y;
  this.z = $value$$.z;
  this.w = $value$$.w;
  return this;
}, set_x:function $gb$vec4$$set_x$($value$$) {
  this.x = $value$$;
  return this;
}, set_y:function $gb$vec4$$set_y$($value$$) {
  this.y = $value$$;
  return this;
}, set_z:function $gb$vec4$$set_z$($value$$) {
  this.z = $value$$;
  return this;
}, set_w:function $gb$vec4$$set_w$($value$$) {
  this.w = $value$$;
  return this;
}, get_x:function $gb$vec4$$get_x$() {
  return this.x;
}, get_y:function $gb$vec4$$get_y$() {
  return this.y;
}, get_z:function $gb$vec4$$get_z$() {
  return this.z;
}, get_w:function $gb$vec4$$get_w$() {
  return this.w;
}, add:function $gb$vec4$$add$($value$$) {
  this.x += $value$$.x;
  this.y += $value$$.y;
  this.z += $value$$.z;
  this.w += $value$$.w;
  return this;
}, add_scalar:function $gb$vec4$$add_scalar$($value$$) {
  this.x += $value$$;
  this.y += $value$$;
  this.z += $value$$;
  this.w += $value$$;
  return this;
}, add_vectors:function $gb$vec4$$add_vectors$($value_01$$, $value_02$$) {
  this.x = $value_01$$.x + $value_02$$.x;
  this.y = $value_01$$.y + $value_02$$.y;
  this.z = $value_01$$.z + $value_02$$.z;
  this.w = $value_01$$.w + $value_02$$.w;
  return this;
}, sub:function $gb$vec4$$sub$($value$$) {
  this.x -= $value$$.x;
  this.y -= $value$$.y;
  this.z -= $value$$.z;
  this.w -= $value$$.w;
  return this;
}, sub_scalar:function $gb$vec4$$sub_scalar$($value$$) {
  this.x -= $value$$;
  this.y -= $value$$;
  this.z -= $value$$;
  this.w -= $value$$;
  return this;
}, sub_vectors:function $gb$vec4$$sub_vectors$($value_01$$, $value_02$$) {
  this.x = $value_01$$.x - $value_02$$.x;
  this.y = $value_01$$.y - $value_02$$.y;
  this.z = $value_01$$.z - $value_02$$.z;
  this.w = $value_01$$.w - $value_02$$.w;
  return this;
}, multiply:function $gb$vec4$$multiply$($value$$) {
  this.x *= $value$$.x;
  this.y *= $value$$.y;
  this.z *= $value$$.z;
  this.w *= $value$$.w;
  return this;
}, multiply_scalar:function $gb$vec4$$multiply_scalar$($value$$) {
  this.x *= $value$$;
  this.y *= $value$$;
  this.z *= $value$$;
  this.w *= $value$$;
  return this;
}, divide:function $gb$vec4$$divide$($value$$) {
  this.x /= $value$$.x;
  this.y /= $value$$.y;
  this.z /= $value$$.z;
  this.w /= $value$$.w;
  return this;
}, divide_scalar:function $gb$vec4$$divide_scalar$($value$$) {
  this.x /= $value$$;
  this.y /= $value$$;
  this.z /= $value$$;
  this.w /= $value$$;
  return this;
}, min:function $gb$vec4$$min$($value$$) {
  this.x = Math.min(this.x, $value$$.x);
  this.y = Math.min(this.y, $value$$.y);
  this.z = Math.min(this.z, $value$$.z);
  this.w = Math.min(this.w, $value$$.w);
  return this;
}, max:function $gb$vec4$$max$($value$$) {
  this.x = Math.max(this.x, $value$$.x);
  this.y = Math.max(this.y, $value$$.y);
  this.z = Math.max(this.z, $value$$.z);
  this.w = Math.max(this.w, $value$$.w);
  return this;
}, clamp:function $gb$vec4$$clamp$($min$$, $max$$) {
  this.x = Math.max($min$$.x, Math.min($max$$.x, this.x));
  this.y = Math.max($min$$.y, Math.min($max$$.y, this.y));
  this.z = Math.max($min$$.z, Math.min($max$$.z, this.z));
  this.w = Math.max($min$$.w, Math.min($max$$.w, this.w));
  return this;
}, dot:function $gb$vec4$$dot$($value$$) {
  return this.x * $value$$.x + this.y * $value$$.y + this.z * $value$$.z + this.w * $value$$.w;
}, length:function $gb$vec4$$length$() {
  return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
}, normalize:function $gb$vec4$$normalize$() {
  return this.divide_scalar(this.length());
}, lerp:function $gb$vec4$$lerp$($value$$, $alpha$$) {
  this.x += ($value$$.x - this.x) * $alpha$$;
  this.y += ($value$$.y - this.y) * $alpha$$;
  this.z += ($value$$.z - this.z) * $alpha$$;
  this.w += ($value$$.w - this.w) * $alpha$$;
  return this;
}, lerp_vectors:function $gb$vec4$$lerp_vectors$($value_01$$, $value_02$$, $alpha$$) {
  this.sub_vectors($value_02$$, $value_01$$).multiply_scalar($alpha$$).add($value_01$$);
  return this;
}, equals:function $gb$vec4$$equals$($value$$) {
  return $value$$.x === this.x && $value$$.y === this.y && $value$$.z === this.z && $value$$.w === this.w;
}, to_array:function $gb$vec4$$to_array$() {
  var $array$$ = [];
  $array$$[0] = this.x;
  $array$$[1] = this.y;
  $array$$[2] = this.z;
  $array$$[3] = this.w;
  return $array$$;
}};
var g_graphics_context = null, graphics_context = function() {
  return {get_instance:function() {
    if (!g_graphics_context) {
      var $canvas$$ = document.getElementById("gl_canvas");
      try {
        g_graphics_context = $canvas$$.getContext("experimental-webgl"), g_graphics_context.viewport_width = $canvas$$.width, g_graphics_context.viewport_height = $canvas$$.height, console.log("OpenGL context created"), console.log("viewport: [ " + g_graphics_context.viewport_width + ", " + g_graphics_context.viewport_height + " ]");
      } catch ($exception$$) {
      }
      g_graphics_context || alert("could not initialise gl context");
    }
    return g_graphics_context;
  }};
}(), gl = function() {
  return graphics_context.get_instance();
}();
gb.material_cached_parameters = function $gb$material_cached_parameters$() {
  this.m_is_cull_face = !1;
  this.m_cull_face_mode = -1;
  this.m_is_blending = !1;
  this.m_blending_equation = this.m_blending_function_destination = this.m_blending_function_source = -1;
  this.m_is_stencil_test = !1;
  this.m_stencil_mask_parameter = this.m_stencil_function_parameter_2 = this.m_stencil_function_parameter_1 = this.m_stencil_function = -1;
  this.m_is_depth_mask = this.m_is_depth_test = !1;
  this.m_shader = null;
  this.m_textures = [];
  for (var $i$$ = 0;8 > $i$$;++$i$$) {
    this.m_textures[$i$$] = null;
  }
  Object.defineProperty(this, "is_cull_face", {get:function() {
    return this.m_is_cull_face;
  }, set:function($value$$) {
    this.m_is_cull_face = $value$$;
  }});
  Object.defineProperty(this, "cull_face_mode", {get:function() {
    return this.m_cull_face_mode;
  }, set:function($value$$) {
    this.m_cull_face_mode = $value$$;
  }});
  Object.defineProperty(this, "is_blending", {get:function() {
    return this.m_is_blending;
  }, set:function($value$$) {
    this.m_is_blending = $value$$;
  }});
  Object.defineProperty(this, "blending_function_source", {get:function() {
    return this.m_blending_function_source;
  }, set:function($value$$) {
    this.m_blending_function_source = $value$$;
  }});
  Object.defineProperty(this, "blending_function_destination", {get:function() {
    return this.m_blending_function_destination;
  }, set:function($value$$) {
    this.m_blending_function_destination = $value$$;
  }});
  Object.defineProperty(this, "blending_equation", {get:function() {
    return this.m_blending_equation;
  }, set:function($value$$) {
    this.m_blending_equation = $value$$;
  }});
  Object.defineProperty(this, "is_stencil_test", {get:function() {
    return this.m_is_stencil_test;
  }, set:function($value$$) {
    this.m_is_stencil_test = $value$$;
  }});
  Object.defineProperty(this, "stencil_function", {get:function() {
    return this.m_stencil_function;
  }, set:function($value$$) {
    this.m_stencil_function = $value$$;
  }});
  Object.defineProperty(this, "stencil_function_parameter_1", {get:function() {
    return this.m_stencil_function_parameter_1;
  }, set:function($value$$) {
    this.m_stencil_function_parameter_1 = $value$$;
  }});
  Object.defineProperty(this, "stencil_function_parameter_2", {get:function() {
    return this.m_stencil_function_parameter_2;
  }, set:function($value$$) {
    this.m_stencil_function_parameter_2 = $value$$;
  }});
  Object.defineProperty(this, "stencil_mask_parameter", {get:function() {
    return this.m_stencil_mask_parameter;
  }, set:function($value$$) {
    this.m_stencil_mask_parameter = $value$$;
  }});
  Object.defineProperty(this, "is_depth_test", {get:function() {
    return this.m_is_depth_test;
  }, set:function($value$$) {
    this.m_is_depth_test = $value$$;
  }});
  Object.defineProperty(this, "is_depth_mask", {get:function() {
    return this.m_is_depth_mask;
  }, set:function($value$$) {
    this.m_is_depth_mask = $value$$;
  }});
  Object.defineProperty(this, "shader", {get:function() {
    return this.m_shader;
  }, set:function($value$$) {
    this.m_shader = $value$$;
  }});
  Object.defineProperty(this, "textures", {get:function() {
    return this.m_textures;
  }, set:function($value$$) {
    this.m_textures = $value$$;
  }});
};
gb.material_cached_parameters.prototype = {constructor:gb.material_cached_parameters};
var g_cached_parameters = null;
gb.material_cached_parameters.get_cached_parameters = function $gb$material_cached_parameters$get_cached_parameters$() {
  null === g_cached_parameters && (g_cached_parameters = new gb.material_cached_parameters, g_cached_parameters.is_cull_face = !0, gl.enable(gl.CULL_FACE), g_cached_parameters.cull_face_mode = gl.BACK, gl.cullFace(gl.BACK), g_cached_parameters.is_blending = !0, gl.enable(gl.BLEND), g_cached_parameters.blending_function_source = gl.SRC_ALPHA, g_cached_parameters.blending_function_destination = gl.ONE_MINUS_SRC_ALPHA, gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA), g_cached_parameters.is_stencil_test = 
  !1, gl.disable(gl.STENCIL_TEST), g_cached_parameters.stencil_function = gl.ALWAYS, g_cached_parameters.stencil_function_parameter_1 = 0, g_cached_parameters.stencil_function_parameter_2 = 0, gl.stencilFunc(gl.ALWAYS, 0, 0), g_cached_parameters.m_stencil_mask_parameter = 0, gl.stencilMask(0), g_cached_parameters.is_depth_test = !0, gl.enable(gl.DEPTH_TEST), g_cached_parameters.is_depth_mask = !0, gl.depthMask(gl.TRUE));
  return g_cached_parameters;
};
gb.material = function $gb$material$() {
  this.m_parameters = new gb.material_cached_parameters;
  this.m_custom_shader_uniforms = [];
  this.m_guid = "";
  Object.defineProperty(this, "is_cull_face", {get:function() {
    return this.m_parameters.is_cull_face;
  }, set:function($value$$) {
    this.m_parameters.is_culling = $value$$;
  }});
  Object.defineProperty(this, "cull_face_mode", {get:function() {
    return this.m_parameters.cull_face_mode;
  }, set:function($value$$) {
    this.m_parameters.cull_face_mode = $value$$;
  }});
  Object.defineProperty(this, "is_blending", {get:function() {
    return this.m_parameters.is_blending;
  }, set:function($value$$) {
    this.m_parameters.is_blending = $value$$;
  }});
  Object.defineProperty(this, "blending_function_source", {get:function() {
    return this.m_parameters.blending_function_source;
  }, set:function($value$$) {
    this.m_parameters.blending_function_source = $value$$;
  }});
  Object.defineProperty(this, "blending_function_destination", {get:function() {
    return this.m_parameters.blending_function_destination;
  }, set:function($value$$) {
    this.m_parameters.blending_function_destination = $value$$;
  }});
  Object.defineProperty(this, "blending_equation", {get:function() {
    return this.m_parameters.blending_equation;
  }, set:function($value$$) {
    this.m_parameters.blending_equation = $value$$;
  }});
  Object.defineProperty(this, "is_stencil_test", {get:function() {
    return this.m_parameters.is_stencil_test;
  }, set:function($value$$) {
    this.m_parameters.is_stencil_test = $value$$;
  }});
  Object.defineProperty(this, "stencil_function", {get:function() {
    return this.m_parameters.stencil_function;
  }, set:function($value$$) {
    this.m_parameters.stencil_function = $value$$;
  }});
  Object.defineProperty(this, "stencil_function_parameter_1", {get:function() {
    return this.m_parameters.stencil_function_parameter_1;
  }, set:function($value$$) {
    this.m_parameters.stencil_function_parameter_1 = $value$$;
  }});
  Object.defineProperty(this, "stencil_function_parameter_2", {get:function() {
    return this.m_parameters.stencil_function_parameter_2;
  }, set:function($value$$) {
    this.m_parameters.stencil_function_parameter_2 = $value$$;
  }});
  Object.defineProperty(this, "stencil_mask_parameter", {get:function() {
    return this.m_parameters.stencil_mask_parameter;
  }, set:function($value$$) {
    this.m_parameters.stencil_mask_parameter = $value$$;
  }});
  Object.defineProperty(this, "is_depth_test", {get:function() {
    return this.m_parameters.is_depth_test;
  }, set:function($value$$) {
    this.m_parameters.is_depth_test = $value$$;
  }});
  Object.defineProperty(this, "is_depth_mask", {get:function() {
    return this.m_parameters.is_depth_mask;
  }, set:function($value$$) {
    this.m_parameters.is_depth_mask = $value$$;
  }});
  Object.defineProperty(this, "shader", {get:function() {
    return this.m_parameters.shader;
  }, set:function($value$$) {
    this.m_parameters.shader = $value$$;
  }});
  Object.defineProperty(this, "guid", {get:function() {
    return this.m_guid;
  }, set:function($value$$) {
    this.m_guid = $value$$;
  }});
};
gb.material.construct = function $gb$material$construct$($configuration$$) {
  var $material$$ = new gb.material;
  $material$$.is_cull_face = $configuration$$.is_cull_face;
  $material$$.cull_face_mode = $configuration$$.cull_face_mode;
  $material$$.is_blending = $configuration$$.is_blending;
  $material$$.blending_function_source = $configuration$$.blending_function_source;
  $material$$.blending_function_destination = $configuration$$.blending_function_destination;
  $material$$.blending_equation = $configuration$$.blending_equation;
  $material$$.is_stencil_test = $configuration$$.is_stencil_test;
  $material$$.stencil_function = $configuration$$.stencil_function;
  $material$$.stencil_function_parameter_1 = $configuration$$.stencil_function_parameter_1;
  $material$$.stencil_function_parameter_2 = $configuration$$.stencil_function_parameter_2;
  $material$$.stencil_mask_parameter = $configuration$$.stencil_mask_parameter;
  $material$$.guid = "" + $configuration$$.technique_name + $configuration$$.technique_pass + $configuration$$.shader_configuration.filename;
  return $material$$;
};
gb.material.set_shader = function $gb$material$set_shader$($material$$, $configuration$$, $resource_accessor$$) {
  $resource_accessor$$.get_shader($configuration$$.shader_configuration.filename).add_resource_loading_callback(function($resource$$) {
    $material$$.shader = $resource$$;
  });
};
gb.material.set_textures = function $gb$material$set_textures$($material$$, $configuration$$, $resource_accessor$$) {
  for (var $i$$ = 0;$i$$ < $configuration$$.textures_configurations.length;++$i$$) {
    var $texture_configuration$$ = $configuration$$.textures_configurations[$i$$];
    $resource_accessor$$.get_texture(0 !== $texture_configuration$$.filename.length ? $texture_configuration$$.filename : $texture_configuration$$.technique_name).add_resource_loading_callback(function($resource$$, $userdata$$) {
      $resource$$.wrap_mode = $userdata$$.wrap_mode;
      $resource$$.mag_filter = $userdata$$.mag_filter;
      $resource$$.min_filter = $userdata$$.min_filter;
      $material$$.set_texture($resource$$, $userdata$$.sampler_index);
    }, $texture_configuration$$);
  }
};
gb.material.prototype = {constructor:gb.material, set_texture:function $gb$material$$set_texture$($texture$$, $sampler$$) {
  this.m_parameters.textures[$sampler$$] = $texture$$;
}, bind:function $gb$material$$bind$() {
  this.m_parameters.shader.bind();
  for (var $i$$ = 0;8 > $i$$;++$i$$) {
    null !== this.m_parameters.textures[$i$$] && this.m_parameters.shader.set_texture(this.m_parameters.textures[$i$$], $i$$);
  }
  this.m_parameters.is_depth_test && this.m_parameters.is_depth_test !== gb.material_cached_parameters.get_cached_parameters.is_depth_test ? (gl.enable(gl.DEPTH_TEST), gb.material_cached_parameters.get_cached_parameters.is_depth_test = this.m_parameters.is_depth_test) : this.m_parameters.is_depth_test !== gb.material_cached_parameters.get_cached_parameters.is_depth_test && (gl.disable(gl.DEPTH_TEST), gb.material_cached_parameters.get_cached_parameters.is_depth_test = this.m_parameters.is_depth_test);
  this.m_parameters.is_depth_mask && this.m_parameters.is_depth_mask !== gb.material_cached_parameters.get_cached_parameters.is_depth_mask ? (gl.depthMask(gl.TRUE), gb.material_cached_parameters.get_cached_parameters.is_depth_mask = this.m_parameters.is_depth_mask) : this.m_parameters.is_depth_mask !== gb.material_cached_parameters.get_cached_parameters.is_depth_mask && (gl.depthMask(gl.TRUE), gb.material_cached_parameters.get_cached_parameters.is_depth_mask = this.m_parameters.is_depth_mask);
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
}, unbind:function $gb$material$$unbind$() {
  this.m_parameters.shader.unbind();
}};
gb.render_pipeline = function $gb$render_pipeline$() {
  this.m_main_render_technique = null;
  this.m_ws_render_techniques = [];
  this.m_unique_ws_render_techniques = [];
  this.m_ss_render_techniques = [];
  this.m_unique_ss_render_techniques = [];
  Object.defineProperty(this, "ws_render_techniques", {get:function() {
    return this.m_ws_render_techniques;
  }});
};
gb.render_pipeline.prototype = {constructor:gb.render_pipeline, create_main_render_technique:function $gb$render_pipeline$$create_main_render_technique$($material$$) {
  this.m_main_render_technique = new gb.render_technique_main(gl.viewport_width, gl.viewport_height, $material$$);
}, add_ws_render_technique:function $gb$render_pipeline$$add_ws_render_technique$($technique_name$$, $guid$$, $technique$$) {
  $guid$$ = "" + $guid$$ + $technique_name$$;
  "undefined" === typeof this.m_unique_ws_render_techniques[$guid$$] ? (this.m_unique_ws_render_techniques[$guid$$] = $technique$$, this.m_ws_render_techniques.push($technique$$)) : console.log("can't add same ws render technique: " + $technique_name$$);
}, remove_ws_render_technique:function $gb$render_pipeline$$remove_ws_render_technique$($technique_name$$, $technique_index$$) {
}, add_ss_render_technique:function $gb$render_pipeline$$add_ss_render_technique$($technique_name$$, $technique$$) {
  "undefined" === typeof this.m_unique_ss_render_techniques[$technique_name$$] ? (this.m_unique_ws_render_techniques[$technique_name$$] = $technique$$, this.m_ss_render_techniques.push($technique$$)) : console.log("can't add same ss render technique: " + $technique_name$$);
}, remove_ss_render_technique:function $gb$render_pipeline$$remove_ss_render_technique$($technique_name$$) {
}, on_draw_begin:function $gb$render_pipeline$$on_draw_begin$() {
}, on_draw_end:function $gb$render_pipeline$$on_draw_end$() {
  for (var $i$$ = 0;$i$$ < this.m_ss_render_techniques.length;++$i$$) {
    var $technique$$ = this.m_ss_render_techniques[$i$$];
    $technique$$.bind();
    $technique$$.draw();
    $technique$$.unbind();
  }
  this.m_main_render_technique && (this.m_main_render_technique.bind(), this.m_main_render_technique.draw(), this.m_main_render_technique.unbind());
}};
gb.render_technique_base = function $gb$render_technique_base$($width$$, $height$$, $name$$, $index$$) {
  this.m_name = $name$$;
  this.m_frame_width = $width$$;
  this.m_frame_height = $height$$;
  this.m_index = $index$$;
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
  Object.defineProperty(this, "clear_color", {set:function($value$$) {
    return this.m_clear_color = $value$$;
  }});
};
gb.render_technique_base.prototype = {constructor:gb.render_technique_base};
gb.render_technique_main = function $gb$render_technique_main$($width$$, $height$$, $material$$) {
  gb.render_technique_base.call(this, $width$$, $height$$, "render.technique.main", 0);
  this.m_material = $material$$;
  this.m_screen_quad = gb.mesh_constructor.create_screen_quad();
  this.m_render_buffer = null;
};
gb.render_technique_main.prototype = Object.create(gb.render_technique_base.prototype);
gb.render_technique_main.prototype.constructor = gb.render_technique_main;
gb.render_technique_main.prototype.bind = function $gb$render_technique_main$$bind$() {
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.m_frame_buffer);
  gl.bindRenderbuffer(gl.RENDERBUFFER, this.m_render_buffer);
  gl.viewport(0, 0, this.m_frame_width, this.m_frame_height);
  gl.disable(gl.DEPTH_TEST);
  gb.material_cached_parameters.get_cached_parameters().is_depth_test = !1;
  gl.depthMask(gl.FALSE);
  gb.material_cached_parameters.get_cached_parameters().is_depth_mask = !1;
  gl.disable(gl.STENCIL_TEST);
  gb.material_cached_parameters.get_cached_parameters().is_stencil_test = !1;
  gl.clearColor(this.m_clear_color.x, this.m_clear_color.y, this.m_clear_color.z, this.m_clear_color.w);
  gl.clear(gl.COLOR_BUFFER_BIT);
  this.m_material.shader && this.m_material.shader.get_status() === gb.resource_status.commited && (this.m_material.bind(), this.m_screen_quad.bind(this.m_material.shader.get_attributes()));
};
gb.render_technique_main.prototype.unbind = function $gb$render_technique_main$$unbind$() {
  this.m_material.shader && this.m_material.shader.get_status() === gb.resource_status.commited && (this.m_material.unbind(), this.m_screen_quad.unbind(this.m_material.shader.get_attributes()));
};
gb.render_technique_main.prototype.draw = function $gb$render_technique_main$$draw$() {
  this.m_material.shader && this.m_material.shader.get_status() === gb.resource_status.commited && this.m_screen_quad.draw();
};
gb.render_technique_ss = function $gb$render_technique_ss$($color_attachment_id_width$$, $height$$, $name$$, $material$$) {
  gb.render_technique_base.call(this, $color_attachment_id_width$$, $height$$, $name$$, 0);
  $color_attachment_id_width$$ = gl.createTexture();
  this.m_color_attachment_texture = gb.texture.construct($name$$ + ".color", $color_attachment_id_width$$, this.m_frame_width, this.m_frame_height);
  this.m_color_attachment_texture.wrap_mode = gl.CLAMP_TO_EDGE;
  this.m_color_attachment_texture.mag_filter = gl.LINEAR;
  this.m_color_attachment_texture.min_filter = gl.LINEAR;
  this.m_color_attachment_texture.bind();
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.m_frame_width, this.m_frame_height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  this.m_frame_buffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.m_frame_buffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, $color_attachment_id_width$$, 0);
  gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE && console.error("can't create framebuffer");
  this.m_material = $material$$;
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
gb.render_technique_ss.prototype.bind = function $gb$render_technique_ss$$bind$() {
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.m_frame_buffer);
  gl.viewport(0, 0, this.m_frame_width, this.m_frame_height);
  gl.disable(gl.DEPTH_TEST);
  gb.material_cached_parameters.get_cached_parameters().is_depth_test = !1;
  gl.depthMask(gl.FALSE);
  gb.material_cached_parameters.get_cached_parameters().is_depth_mask = !1;
  gl.disable(gl.STENCIL_TEST);
  gb.material_cached_parameters.get_cached_parameters().is_stencil_test = !1;
  gl.clearColor(this.m_clear_color.x, this.m_clear_color.y, this.m_clear_color.z, this.m_clear_color.w);
  gl.clear(gl.COLOR_BUFFER_BIT);
  this.m_material.shader.get_status() === gb.resource_status.commited && (this.m_material.bind(), this.m_screen_quad.bind(this.m_material.shader.get_attributes()));
};
gb.render_technique_ss.prototype.unbind = function $gb$render_technique_ss$$unbind$() {
  this.m_material.shader.get_status() === gb.resource_status.commited && (this.m_material.unbind(), this.m_screen_quad.unbind(this.m_material.shader.get_attributes()));
};
gb.render_technique_ss.prototype.draw = function $gb$render_technique_ss$$draw$() {
  this.m_material.shader.get_status() === gb.resource_status.commited && this.m_screen_quad.draw();
};
gb.render_technique_ws = function $gb$render_technique_ws$($color_attachment_id$$1_width$$, $height$$, $depth_attachment_id_name$$, $index$$, $num_passes$$) {
  gb.render_technique_base.call(this, $color_attachment_id$$1_width$$, $height$$, $depth_attachment_id_name$$, $index$$);
  this.m_num_passes = Math.max($num_passes$$, 1);
  $color_attachment_id$$1_width$$ = gl.createTexture();
  this.m_color_attachment_texture = gb.texture.construct($depth_attachment_id_name$$ + ".color", $color_attachment_id$$1_width$$, this.m_frame_width, this.m_frame_height);
  this.m_color_attachment_texture.wrap_mode = gl.CLAMP_TO_EDGE;
  this.m_color_attachment_texture.mag_filter = gl.LINEAR;
  this.m_color_attachment_texture.min_filter = gl.LINEAR;
  this.m_color_attachment_texture.bind();
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.m_frame_width, this.m_frame_height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  this.m_depth_attachment_texture = null;
  $depth_attachment_id_name$$ = gl.createRenderbuffer();
  gl.bindRenderbuffer(gl.RENDERBUFFER, $depth_attachment_id_name$$);
  gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL, this.m_frame_width, this.m_frame_height);
  this.m_frame_buffer = gl.createFramebuffer();
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.m_frame_buffer);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, $color_attachment_id$$1_width$$, 0);
  gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, $depth_attachment_id_name$$);
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
gb.render_technique_ws.prototype.bind = function $gb$render_technique_ws$$bind$() {
  gl.bindFramebuffer(gl.FRAMEBUFFER, this.m_frame_buffer);
  gl.viewport(0, 0, this.m_frame_width, this.m_frame_height);
  gl.enable(gl.DEPTH_TEST);
  gb.material_cached_parameters.get_cached_parameters().is_depth_test = !0;
  gl.depthMask(gl.TRUE);
  gb.material_cached_parameters.get_cached_parameters().is_depth_mask = !0;
  gl.enable(gl.STENCIL_TEST);
  gb.material_cached_parameters.get_cached_parameters().is_stencil_test = !0;
  gl.clearColor(this.m_clear_color.x, this.m_clear_color.y, this.m_clear_color.z, this.m_clear_color.w);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
};
gb.render_technique_ws.prototype.unbind = function $gb$render_technique_ws$$unbind$() {
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
};
gb.render_technique_ws.prototype.draw = function $gb$render_technique_ws$$draw$() {
};
gb.ibo = function $gb$ibo$($size$$, $mode$$) {
  this.m_handler = gl.createBuffer();
  this.m_allocated_size = $size$$;
  this.m_used_size = 0;
  this.m_mode = $mode$$;
  this.m_data = [];
  for (var $i$$ = 0;$i$$ < this.m_allocated_size;++$i$$) {
    this.m_data[$i$$] = 0;
  }
  Object.defineProperty(this, "allocated_size", {get:function() {
    return this.m_allocated_size;
  }});
  Object.defineProperty(this, "used_size", {get:function() {
    return this.m_used_size;
  }});
};
gb.ibo.prototype = {constructor:gb.ibo, lock:function $gb$ibo$$lock$() {
  return this.m_data;
}, unlock:function $gb$ibo$$unlock$() {
  this.m_used_size = 0 !== arguments.length && 0 < arguments[0] && arguments[0] < this.m_allocated_size ? arguments[0] : this.m_allocated_size;
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.m_handler);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.m_data), this.m_mode);
}, bind:function $gb$ibo$$bind$() {
  0 !== this.m_used_size && gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.m_handler);
}, unbind:function $gb$ibo$$unbind$() {
  0 !== this.m_used_size && gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
}};
gb.mesh = function $gb$mesh$($vbo$$, $ibo$$, $mode$$) {
  this.m_vbo = $vbo$$;
  this.m_ibo = $ibo$$;
  this.m_mode = $mode$$;
  Object.defineProperty(this, "vbo", {get:function() {
    return this.m_vbo;
  }});
  Object.defineProperty(this, "ibo", {get:function() {
    return this.m_ibo;
  }});
};
gb.mesh.prototype = {constructor:gb.mesh, bind:function $gb$mesh$$bind$($attributes$$) {
  this.m_vbo.bind($attributes$$);
  this.m_ibo.bind();
}, unbind:function $gb$mesh$$unbind$($attributes$$) {
  this.m_vbo.unbind($attributes$$);
  this.m_ibo.unbind();
}, draw:function $gb$mesh$$draw$() {
  gl.drawElements(gl.TRIANGLES, this.m_ibo.used_size, gl.UNSIGNED_SHORT, 0);
}};
gb.shader_compiler_glsl = function $gb$shader_compiler_glsl$() {
  this.m_vs_shader_header = "precision highp float;\n#if defined(__OPENGL_30__)\nlayout (location = 0) in vec2 a_position;\nlayout (location = 1) in vec2 a_texcoord;\nlayout (location = 4) in vec4 a_color;\n#else\nattribute vec2 a_position;\nattribute vec2 a_texcoord;\nattribute vec4 a_color;\n#endif\n";
  this.m_fs_shader_header = "precision highp float;\n#if defined(__OPENGL_30__)\nlayout (location = 0) out vec4 attachment_01;\n#define gl_FragColor attachment_01\n#define texture2D texture\n#endif\n";
};
gb.shader_compiler_glsl.prototype = {constructor:gb.shader_compiler_glsl, compile:function $gb$shader_compiler_glsl$$compile$($source_code$$, $shader_type$$) {
  var $handler$$ = gl.createShader($shader_type$$);
  if (!$handler$$) {
    return console.error("can't create shader"), -1;
  }
  gl.shaderSource($handler$$, $shader_type$$ === gl.VERTEX_SHADER ? (this.m_vs_shader_header + $source_code$$).trim() : (this.m_fs_shader_header + $source_code$$).trim());
  gl.compileShader($handler$$);
  var $compile_message$$ = gl.getShaderInfoLog($handler$$) || "";
  gl.getShaderParameter($handler$$, gl.COMPILE_STATUS) || console.error($compile_message$$);
  return $handler$$;
}, link:function $gb$shader_compiler_glsl$$link$($vs_handler$$, $fs_handler$$) {
  var $shader_handler$$ = gl.createProgram();
  gl.attachShader($shader_handler$$, $vs_handler$$);
  gl.attachShader($shader_handler$$, $fs_handler$$);
  gl.linkProgram($shader_handler$$);
  var $link_message$$ = gl.getProgramInfoLog($shader_handler$$) || "";
  gl.getProgramParameter($shader_handler$$, gl.LINK_STATUS) || (console.error($link_message$$), gl.detachShader($shader_handler$$, $vs_handler$$), gl.detachShader($shader_handler$$, $fs_handler$$), gl.deleteShader($vs_handler$$), gl.deleteShader($fs_handler$$), $shader_handler$$ = -1);
  return $shader_handler$$;
}};
gb.commiter_status = {undefined:0, in_progress:1, failure:2, success:3};
gb.resource_commiter = function $gb$resource_commiter$($guid$$, $resource$$) {
  this.m_guid = $guid$$;
  this.m_resource = $resource$$;
  this.m_status = gb.commiter_status.undefined;
};
gb.resource_commiter.prototype = {constructor:gb.resource_commiter, clone:function $gb$resource_commiter$$clone$() {
  return new this.constructor;
}, copy:function $gb$resource_commiter$$copy$($value$$) {
  this.m_guid = $value$$.m_guid;
  this.m_resource = $value$$.m_resource;
  this.m_status = $value$$.m_status;
  return this;
}, get_guid:function $gb$resource_commiter$$get_guid$() {
  return this.m_guid;
}, get_status:function $gb$resource_commiter$$get_status$() {
  return this.m_status;
}};
$.getScript("src/resources/operations/commiters/resource_commiter.js");
$.getScript("src/resources/operations/commiters/compilers/shader_compiler_glsl.js");
$.getScript("src/resources/transfering_data/shader_transfering_data.js");
gb.shader_commiter_glsl = function $gb$shader_commiter_glsl$($guid$$, $resource$$) {
  gb.resource_commiter.call(this, $guid$$, $resource$$);
};
gb.shader_commiter_glsl.prototype = Object.create(gb.resource_commiter.prototype);
gb.shader_commiter_glsl.prototype.constructor = gb.shader_commiter_glsl;
gb.shader_commiter_glsl.prototype.commit = function $gb$shader_commiter_glsl$$commit$($transfering_data$$) {
  this.m_status = gb.commiter_status.in_progress;
  var $shader_compiler_shader_handler$$ = new gb.shader_compiler_glsl, $status$$ = gb.commiter_status.failure, $vs_handler$$ = $shader_compiler_shader_handler$$.compile($transfering_data$$.vs_source_code, gl.VERTEX_SHADER);
  if (-1 !== $vs_handler$$) {
    var $fs_handler$$ = $shader_compiler_shader_handler$$.compile($transfering_data$$.fs_source_code, gl.FRAGMENT_SHADER);
    -1 !== $fs_handler$$ && ($shader_compiler_shader_handler$$ = $shader_compiler_shader_handler$$.link($vs_handler$$, $fs_handler$$), $transfering_data$$.shader_id = $shader_compiler_shader_handler$$, -1 !== $shader_compiler_shader_handler$$ && ($status$$ = gb.commiter_status.success));
  }
  this.m_resource.on_transfering_data_commited($transfering_data$$);
  this.m_status = $status$$;
};
$.getScript("src/resources/operations/commiters/resource_commiter.js");
$.getScript("src/resources/transfering_data/texture_transfering_data.js");
gb.texture_commiter_png = function $gb$texture_commiter_png$($guid$$, $resource$$) {
  gb.resource_commiter.call(this, $guid$$, $resource$$);
};
gb.texture_commiter_png.prototype = Object.create(gb.resource_commiter.prototype);
gb.texture_commiter_png.prototype.constructor = gb.texture_commiter_png;
gb.texture_commiter_png.prototype.commit = function $gb$texture_commiter_png$$commit$($transfering_data$$) {
  this.m_status = gb.commiter_status.in_progress;
  var $texture_id$$ = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, $texture_id$$);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, $transfering_data$$.data);
  gl.generateMipmap(gl.TEXTURE_2D);
  $transfering_data$$.texture_id = $texture_id$$;
  this.m_resource.on_transfering_data_commited($transfering_data$$);
  this.m_status = gb.commiter_status.success;
};
gb.resource_loading_operation_status = {undefined:0, in_progress:1, waiting:2, failure:3, success:4};
gb.resource_loading_operation = function $gb$resource_loading_operation$($guid$$, $resource$$) {
  this.m_guid = $guid$$;
  this.m_resource = $resource$$;
  this.m_status = gb.resource_loading_operation_status.undefined;
  this.m_commiter = this.m_serializer = this.m_transfering_data = null;
};
gb.resource_loading_operation.prototype = {constructor:gb.resource_loading_operation, get_guid:function $gb$resource_loading_operation$$get_guid$() {
  return this.m_guid;
}, get_status:function $gb$resource_loading_operation$$get_status$() {
  return this.m_status;
}};
gb.serializer_status = {undefined:0, in_progress:1, failure:2, success:3};
gb.resource_serializer = function $gb$resource_serializer$($guid$$, $resource$$) {
  this.m_guid = $guid$$;
  this.m_resource = $resource$$;
  this.m_status = gb.serializer_status.undefined;
};
gb.resource_serializer.prototype = {constructor:gb.resource_serializer, clone:function $gb$resource_serializer$$clone$() {
  return new this.constructor;
}, copy:function $gb$resource_serializer$$copy$($value$$) {
  this.m_guid = $value$$.m_guid;
  this.m_resource = $value$$.m_resource;
  this.m_status = $value$$.m_status;
  return this;
}, get_guid:function $gb$resource_serializer$$get_guid$() {
  return this.m_guid;
}, get_status:function $gb$resource_serializer$$get_status$() {
  return this.m_status;
}};
$.getScript("src/resources/operations/serializers/resource_serializer.js");
$.getScript("src/resources/transfering_data/shader_transfering_data.js");
gb.shader_serializer_glsl = function $gb$shader_serializer_glsl$($vs_filename$$, $fs_filename$$, $resource$$) {
  gb.resource_serializer.call(this, $vs_filename$$ + $fs_filename$$, $resource$$);
  this.m_vs_filename = $vs_filename$$;
  this.m_fs_filename = $fs_filename$$;
};
gb.shader_serializer_glsl.prototype = Object.create(gb.resource_serializer.prototype);
gb.shader_serializer_glsl.prototype.constructor = gb.shader_serializer_glsl;
gb.shader_serializer_glsl.prototype.serialize = function $gb$shader_serializer_glsl$$serialize$($transfering_data$$, $callback$$) {
  this.m_status = gb.serializer_status.in_progress;
  var $self$$ = this;
  $.ajax({dataType:"text", url:this.m_vs_filename, data:{}, async:!0, success:function($value$$0$$) {
    $transfering_data$$.vs_source_code = $value$$0$$;
    $.ajax({dataType:"text", url:$self$$.m_fs_filename, data:{}, async:!0, success:function($value$$) {
      $transfering_data$$.fs_source_code = $value$$;
      $self$$.m_resource.on_transfering_data_serialized($transfering_data$$);
      $self$$.m_status = 0 !== $transfering_data$$.vs_source_code.length && 0 !== $transfering_data$$.fs_source_code.length ? gb.serializer_status.success : gb.serializer_status.failure;
      $callback$$();
    }});
  }});
};
$.getScript("src/resources/operations/serializers/resource_serializer.js");
$.getScript("src/resources/transfering_data/texture_transfering_data.js");
gb.texture_serializer_png = function $gb$texture_serializer_png$($filename$$, $resource$$) {
  gb.resource_serializer.call(this, $filename$$, $resource$$);
  this.m_filename = $filename$$;
};
gb.texture_serializer_png.prototype = Object.create(gb.resource_serializer.prototype);
gb.texture_serializer_png.prototype.constructor = gb.texture_serializer_png;
gb.texture_serializer_png.prototype.serialize = function $gb$texture_serializer_png$$serialize$($transfering_data$$, $callback$$) {
  this.m_status = gb.serializer_status.in_progress;
  var $self$$ = this, $image$$ = new Image;
  $image$$.onload = function $$image$$$onload$() {
    $transfering_data$$.data = $image$$;
    $transfering_data$$.width = $image$$.width;
    $transfering_data$$.height = $image$$.height;
    $self$$.m_resource.on_transfering_data_serialized($transfering_data$$);
    $self$$.m_status = gb.serializer_status.success;
    $callback$$();
  };
  $image$$.src = this.m_filename;
};
$.getScript("src/resources/transfering_data/shader_transfering_data.js");
$.getScript("src/resources/operations/serializers/shader_serializer_glsl.js");
$.getScript("src/resources/operations/commiters/shader_commiter_glsl.js");
$.getScript("src/resources/operations/resource_loading_operation.js");
var k_vs_extension = ".vert", k_fs_extension = ".frag";
gb.shader_loading_operation = function $gb$shader_loading_operation$($guid$$, $resource$$) {
  gb.resource_loading_operation.call(this, $guid$$, $resource$$);
  this.m_transfering_data = new gb.shader_transfering_data;
};
gb.shader_loading_operation.prototype = Object.create(gb.resource_loading_operation.prototype);
gb.shader_loading_operation.prototype.constructor = gb.shader_loading_operation;
gb.shader_loading_operation.prototype.start = function $gb$shader_loading_operation$$start$($callback$$) {
  var $self$$ = this;
  this.serialize(function() {
    $self$$.m_status === gb.resource_loading_operation_status.waiting ? $self$$.commit(function() {
      $callback$$();
    }) : $callback$$();
  });
};
gb.shader_loading_operation.prototype.serialize = function $gb$shader_loading_operation$$serialize$($callback$$) {
  this.m_status = gb.resource_loading_operation_status.in_progress;
  this.m_serializer = new gb.shader_serializer_glsl(this.m_guid + k_vs_extension, this.m_guid + k_fs_extension, this.m_resource);
  var $self$$ = this;
  this.m_serializer.serialize(this.m_transfering_data, function() {
    $self$$.m_status = $self$$.m_serializer.get_status() === gb.serializer_status.success ? gb.resource_loading_operation_status.waiting : gb.resource_loading_operation_status.failure;
    $callback$$();
  });
};
gb.shader_loading_operation.prototype.commit = function $gb$shader_loading_operation$$commit$($callback$$) {
  this.m_status = gb.resource_loading_operation_status.in_progress;
  this.m_commiter = new gb.shader_commiter_glsl(this.m_guid, this.m_resource);
  this.m_commiter.commit(this.m_transfering_data);
  this.m_status = this.m_commiter.get_status() === gb.commiter_status.success ? gb.resource_loading_operation_status.success : gb.resource_loading_operation_status.failure;
  $callback$$();
};
$.getScript("src/resources/transfering_data/texture_transfering_data.js");
$.getScript("src/resources/operations/serializers/texture_serializer_png.js");
$.getScript("src/resources/operations/commiters/texture_commiter_png.js");
$.getScript("src/resources/operations/resource_loading_operation.js");
gb.texture_loading_operation = function $gb$texture_loading_operation$($guid$$, $resource$$) {
  gb.resource_loading_operation.call(this, $guid$$, $resource$$);
  this.m_transfering_data = new gb.texture_transfering_data;
};
gb.texture_loading_operation.prototype = Object.create(gb.resource_loading_operation.prototype);
gb.texture_loading_operation.prototype.constructor = gb.texture_loading_operation;
gb.texture_loading_operation.prototype.start = function $gb$texture_loading_operation$$start$($callback$$) {
  var $self$$ = this;
  this.serialize(function() {
    $self$$.m_status === gb.resource_loading_operation_status.waiting ? $self$$.commit(function() {
      $callback$$();
    }) : $callback$$();
  });
};
gb.texture_loading_operation.prototype.serialize = function $gb$texture_loading_operation$$serialize$($callback$$) {
  this.m_status = gb.resource_loading_operation_status.in_progress;
  this.m_serializer = new gb.texture_serializer_png(this.m_guid, this.m_resource);
  var $self$$ = this;
  this.m_serializer.serialize(this.m_transfering_data, function() {
    $self$$.m_status = $self$$.m_serializer.get_status() === gb.serializer_status.success ? gb.resource_loading_operation_status.waiting : gb.resource_loading_operation_status.failure;
    $callback$$();
  });
};
gb.texture_loading_operation.prototype.commit = function $gb$texture_loading_operation$$commit$($callback$$) {
  this.m_status = gb.resource_loading_operation_status.in_progress;
  this.m_commiter = new gb.texture_commiter_png(this.m_guid, this.m_resource);
  this.m_commiter.commit(this.m_transfering_data);
  this.m_status = this.m_commiter.get_status() === gb.commiter_status.success ? gb.resource_loading_operation_status.success : gb.resource_loading_operation_status.failure;
  $callback$$();
};
gb.resource_accessor = function $gb$resource_accessor$() {
  this.m_resources = [];
  this.m_operations_queue = [];
};
gb.resource_accessor.prototype = {constructor:gb.resource_accessor, add_custom_resource:function $gb$resource_accessor$$add_custom_resource$($guid$$, $resource$$) {
  this.m_resources[$guid$$] = $resource$$;
}, get_shader:function $gb$resource_accessor$$get_shader$($filename$$) {
  var $resource$$ = this.m_resources[$filename$$];
  if ("undefined" === typeof $resource$$) {
    $resource$$ = new gb.shader($filename$$);
    this.m_resources[$filename$$] = $resource$$;
    var $operation$$ = new gb.shader_loading_operation($filename$$, $resource$$), $self$$ = this;
    $operation$$.start(function() {
      $self$$.m_resources[$filename$$].on_resource_loaded($self$$.m_operations_queue[$filename$$].get_status() === gb.resource_loading_operation_status.success);
      $self$$.m_operations_queue[$filename$$] = null;
    });
    this.m_operations_queue[$filename$$] = $operation$$;
  }
  return $resource$$;
}, get_texture:function $gb$resource_accessor$$get_texture$($filename$$) {
  var $resource$$ = this.m_resources[$filename$$];
  if ("undefined" === typeof $resource$$) {
    $resource$$ = new gb.texture($filename$$);
    this.m_resources[$filename$$] = $resource$$;
    var $operation$$ = new gb.texture_loading_operation($filename$$, $resource$$), $self$$ = this;
    $operation$$.start(function() {
      $self$$.m_resources[$filename$$].on_resource_loaded($self$$.m_operations_queue[$filename$$].get_status() === gb.resource_loading_operation_status.success);
      $self$$.m_operations_queue[$filename$$] = null;
    });
    this.m_operations_queue[$filename$$] = $operation$$;
  }
  return $resource$$;
}};
$.getScript("lib/underscore/underscore-min.js");
gb.resource_type = {undefined:0, shader:1, texture:2};
gb.resource_status = {unloaded:0, loaded:1, commited:2};
gb.resource_base = function $gb$resource_base$($guid$$) {
  this.m_guid = $guid$$;
  this.m_type = gb.resource_type.undefined;
  this.m_status = gb.resource_status.unloaded;
  this.m_listeners = [];
  this.m_callbacks = [];
  this.m_userdata_container = [];
};
gb.resource_base.prototype = {constructor:gb.resource_base, get_guid:function $gb$resource_base$$get_guid$() {
  return this.m_guid;
}, get_type:function $gb$resource_base$$get_type$() {
  return this.m_type;
}, get_status:function $gb$resource_base$$get_status$() {
  return this.m_status;
}, on_transfering_data_serialized:function $gb$resource_base$$on_transfering_data_serialized$() {
}, on_transfering_data_commited:function $gb$resource_base$$on_transfering_data_commited$() {
}, on_resource_loaded:function $gb$resource_base$$on_resource_loaded$($success$$) {
  for (var $i$$ = 0;$i$$ < this.m_listeners.length;++$i$$) {
    this.m_listeners[$i$$].on_resource_loaded($success$$ ? this : null);
  }
  for ($i$$ = 0;$i$$ < this.m_callbacks.length;++$i$$) {
    (0,this.m_callbacks[$i$$])($success$$ ? this : null, this.m_userdata_container[$i$$]);
  }
  this.m_listeners = [];
  this.m_callbacks = [];
  this.m_userdata_container = [];
}, add_resource_loading_listener:function $gb$resource_base$$add_resource_loading_listener$($listener$$) {
  _.isFunction($listener$$.on_resource_loaded) ? _.contains(this.m_listeners, $listener$$) ? console.error("can't add same listener for resource loading") : this.m_listeners.push($listener$$) : console.error("resource loading listener doesn't contain on_resource_loaded method");
}, remove_resource_loading_listener:function $gb$resource_base$$remove_resource_loading_listener$($index$$51_listener$$) {
  $index$$51_listener$$ = _.indexOf(this.m_listeners, $index$$51_listener$$);
  -1 !== $index$$51_listener$$ ? this.m_listeners.splice($index$$51_listener$$, 1) : console.error("resource doesn't contain this listener");
}, add_resource_loading_callback:function $gb$resource_base$$add_resource_loading_callback$($callback$$, $userdata$$) {
  _.isFunction($callback$$) ? _.contains(this.m_callbacks, $callback$$) ? console.error("can't add same callback for resource loading") : (this.m_callbacks.push($callback$$), this.m_userdata_container.push($userdata$$)) : console.error("resource loading callback isn't function");
}, remove_resource_loading_callback:function $gb$resource_base$$remove_resource_loading_callback$($callback$$74_index$$) {
  $callback$$74_index$$ = _.indexOf(this.m_callbacks, $callback$$74_index$$);
  -1 !== $callback$$74_index$$ ? (this.m_callbacks.splice($callback$$74_index$$, 1), this.m_userdatas.splice($callback$$74_index$$, 1)) : console.error("resource doesn't contain this callback");
}};
$.getScript("src/resources/resource_base.js");
gb.uniform_type = {mat4:0, mat4_array:1, vec4:2, vec4_array:3, vec3:4, vec3_array:5, vec2:6, vec2_array:7, f32:8, f32_array:9, i32:10, i32_array:11, sampler:12};
gb.shader_sampler_type = {sampler_01:0, sampler_02:1, sampler_03:2, sampler_04:3, sampler_05:4, sampler_06:5, sampler_07:6, sampler_08:7, max:8};
gb.shader_attribute_type = {position:0, texcoord:1, color:2, max:3};
gb.shader_uniform_type = {mat_m:0, mat_p:1, mat_v:2, max:3};
gb.attribute_names = {a_position:"a_position", a_texcoord:"a_texcoord", a_color:"a_color"};
gb.uniform_names = {u_mat_m:"u_mat_m", u_mat_p:"u_mat_p", u_mat_v:"u_mat_v"};
gb.sampler_names = {sampler_01:"sampler_01", sampler_02:"sampler_02", sampler_03:"sampler_03", sampler_04:"sampler_04", sampler_05:"sampler_05", sampler_06:"sampler_06", sampler_07:"sampler_07", sampler_08:"sampler_08"};
gb.shader_uniform = function $gb$shader_uniform$($type$$) {
  this.m_type = $type$$;
};
gb.shader_uniform.prototype = {constructor:gb.shader_uniform, set_mat4:function $gb$shader_uniform$$set_mat4$($value$$) {
  this.m_mat4_value = $value$$;
}, set_mat4_array:function $gb$shader_uniform$$set_mat4_array$($value$$) {
  this.m_mat4_array = $value$$;
  this.m_array_size = $value$$.length;
}, set_vec4:function $gb$shader_uniform$$set_vec4$($value$$) {
  this.m_vec4_value = $value$$;
}, set_vec4_array:function $gb$shader_uniform$$set_vec4_array$($value$$) {
  this.m_vec4_array = $value$$;
  this.m_array_size = $value$$.length;
}, set_vec3:function $gb$shader_uniform$$set_vec3$($value$$) {
  this.m_vec3_value = $value$$;
}, set_vec3_array:function $gb$shader_uniform$$set_vec3_array$($value$$) {
  this.m_vec3_array = $value$$;
  this.m_array_size = $value$$.length;
}, set_vec2:function $gb$shader_uniform$$set_vec2$($value$$) {
  this.m_vec2_value = $value$$;
}, set_vec2_array:function $gb$shader_uniform$$set_vec2_array$($value$$) {
  this.m_vec2_array = $value$$;
  this.m_array_size = $value$$.length;
}, set_f32:function $gb$shader_uniform$$set_f32$($value$$) {
  this.m_f32_value = $value$$;
}, set_f32_array:function $gb$shader_uniform$$set_f32_array$($value$$) {
  this.m_f32_array = $value$$;
  this.m_array_size = $value$$.length;
}, set_i32:function $gb$shader_uniform$$set_i32$($value$$) {
  this.m_i32_value = $value$$;
}, set_i32_array:function $gb$shader_uniform$$set_i32_array$($value$$) {
  this.m_i32_array = $value$$;
  this.m_array_size = $value$$.length;
}, set_sampler:function $gb$shader_uniform$$set_sampler$($texture$$, $sampler$$) {
  this.m_texture = $texture$$;
  this.m_sampler_value = $sampler$$;
}, get_mat4:function $gb$shader_uniform$$get_mat4$() {
  return this.m_mat4_value;
}, get_mat4_array:function $gb$shader_uniform$$get_mat4_array$() {
  return this.m_mat4_array;
}, get_vec4:function $gb$shader_uniform$$get_vec4$() {
  return this.m_vec4_value;
}, get_vec4_array:function $gb$shader_uniform$$get_vec4_array$() {
  return this.m_vec4_array;
}, get_vec3:function $gb$shader_uniform$$get_vec3$() {
  return this.m_vec3_value;
}, get_vec3_array:function $gb$shader_uniform$$get_vec3_array$() {
  return this.m_vec3_array;
}, get_vec2:function $gb$shader_uniform$$get_vec2$() {
  return this.m_vec2_value;
}, get_vec2_array:function $gb$shader_uniform$$get_vec2_array$() {
  return this.m_vec2_array;
}, get_f32:function $gb$shader_uniform$$get_f32$($value$$) {
  return this.m_f32_value;
}, get_f32_array:function $gb$shader_uniform$$get_f32_array$() {
  return this.m_f32_array;
}, get_i32:function $gb$shader_uniform$$get_i32$() {
  return this.m_i32_value;
}, get_i32_array:function $gb$shader_uniform$$get_i32_array$() {
  return this.m_i32_array;
}, get_sampler:function $gb$shader_uniform$$get_sampler$() {
  return this.m_sampler_value;
}, get_texture:function $gb$shader_uniform$$get_texture$() {
  return this.m_texture;
}, get_array_size:function $gb$shader_uniform$$get_array_size$() {
  return this.m_array_size;
}, get_type:function $gb$shader_uniform$$get_type$() {
  return this.m_type;
}};
gb.shader = function $gb$shader$($guid$$) {
  gb.resource_base.call(this, $guid$$);
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
gb.shader.prototype.setup = function $gb$shader$$setup$() {
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
gb.shader.prototype.on_transfering_data_serialized = function $gb$shader$$on_transfering_data_serialized$($transfering_data$$) {
  switch($transfering_data$$.type) {
    case gb.resource_transfering_data_type.shader:
      this.m_status = gb.resource_status.loaded;
  }
};
gb.shader.prototype.on_transfering_data_commited = function $gb$shader$$on_transfering_data_commited$($transfering_data$$) {
  switch($transfering_data$$.type) {
    case gb.resource_transfering_data_type.shader:
      this.m_shader_id = $transfering_data$$.shader_id, this.m_status = gb.resource_status.commited, this.setup();
  }
};
gb.shader.prototype.get_attributes = function $gb$shader$$get_attributes$() {
  return this.m_attributes;
};
gb.shader.prototype.get_custom_uniform = function $gb$shader$$get_custom_uniform$($uniform$$) {
  var $handler$$ = -1;
  "undefined" === typeof this.m_custom_uniforms[$uniform$$] && ($handler$$ = gl.getUniformLocation(this.m_shader_id, $uniform$$), this.m_custom_uniforms[$uniform$$] = $handler$$);
  return this;
};
gb.shader.prototype.set_mat4 = function $gb$shader$$set_mat4$($value$$, $uniform$$) {
  this.get_status() !== gb.resource_status.commited || "undefined" !== typeof this.m_cached_uniforms[$uniform$$] && this.m_cached_uniforms[$uniform$$] === $value$$ || ("undefined" === typeof this.m_cached_uniforms[$uniform$$] && (this.m_cached_uniforms[$uniform$$] = gb.shader_uniform(gb.uniform_type.mat4)), gl.uniformMatrix4fv(this.m_uniforms[$uniform$$], gl.FALSE, new Float32Array($value$$)), this.m_cached_uniforms[$uniform$$].set_mat4($value$$));
};
gb.shader.prototype.set_custom_mat4 = function $gb$shader$$set_custom_mat4$($value$$, $uniform$$) {
  this.get_status() === gb.resource_status.commited && gl.uniformMatrix4fv(this.get_custom_uniform($uniform$$), gl.FALSE, new Float32Array($value$$));
};
gb.shader.prototype.set_vec4 = function $gb$shader$$set_vec4$($value$$, $uniform$$) {
  this.get_status() !== gb.resource_status.commited || "undefined" !== typeof this.m_cached_uniforms[$uniform$$] && this.m_cached_uniforms[$uniform$$] === $value$$ || ("undefined" === typeof this.m_cached_uniforms[$uniform$$] && (this.m_cached_uniforms[$uniform$$] = gb.shader_uniform(gb.uniform_type.vec4)), gl.uniform4fv(this.m_uniforms[$uniform$$], gl.FALSE, new Float32Array($value$$)), this.m_cached_uniforms[$uniform$$].set_vec4($value$$));
};
gb.shader.prototype.set_custom_vec4 = function $gb$shader$$set_custom_vec4$($value$$, $uniform$$) {
  this.get_status() === gb.resource_status.commited && gl.uniform4fv(this.get_custom_uniform($uniform$$), gl.FALSE, new Float32Array($value$$));
};
gb.shader.prototype.set_vec3 = function $gb$shader$$set_vec3$($value$$, $uniform$$) {
  this.get_status() !== gb.resource_status.commited || "undefined" !== typeof this.m_cached_uniforms[$uniform$$] && this.m_cached_uniforms[$uniform$$] === $value$$ || ("undefined" === typeof this.m_cached_uniforms[$uniform$$] && (this.m_cached_uniforms[$uniform$$] = gb.shader_uniform(gb.uniform_type.vec3)), gl.uniform3fv(this.m_uniforms[$uniform$$], gl.FALSE, new Float32Array($value$$)), this.m_cached_uniforms[$uniform$$].set_vec3($value$$));
};
gb.shader.prototype.set_custom_vec3 = function $gb$shader$$set_custom_vec3$($value$$, $uniform$$) {
  this.get_status() === gb.resource_status.commited && gl.uniform3fv(this.get_custom_uniform($uniform$$), gl.FALSE, new Float32Array($value$$));
};
gb.shader.prototype.set_vec2 = function $gb$shader$$set_vec2$($value$$, $uniform$$) {
  this.get_status() !== gb.resource_status.commited || "undefined" !== typeof this.m_cached_uniforms[$uniform$$] && this.m_cached_uniforms[$uniform$$] === $value$$ || ("undefined" === typeof this.m_cached_uniforms[$uniform$$] && (this.m_cached_uniforms[$uniform$$] = gb.shader_uniform(gb.uniform_type.vec2)), gl.uniform2fv(this.m_uniforms[$uniform$$], gl.FALSE, new Float32Array($value$$)), this.m_cached_uniforms[$uniform$$].set_vec2($value$$));
};
gb.shader.prototype.set_custom_vec2 = function $gb$shader$$set_custom_vec2$($value$$, $uniform$$) {
  this.get_status() === gb.resource_status.commited && gl.uniform2fv(this.get_custom_uniform($uniform$$), gl.FALSE, new Float32Array($value$$));
};
gb.shader.prototype.set_f32 = function $gb$shader$$set_f32$($value$$, $uniform$$) {
  this.get_status() !== gb.resource_status.commited || "undefined" !== typeof this.m_cached_uniforms[$uniform$$] && this.m_cached_uniforms[$uniform$$] === $value$$ || ("undefined" === typeof this.m_cached_uniforms[$uniform$$] && (this.m_cached_uniforms[$uniform$$] = gb.shader_uniform(gb.uniform_type.f32)), gl.uniform1f(this.m_uniforms[$uniform$$], gl.FALSE, $value$$), this.m_cached_uniforms[$uniform$$].set_f32($value$$));
};
gb.shader.prototype.set_custom_f32 = function $gb$shader$$set_custom_f32$($value$$, $uniform$$) {
  this.get_status() === gb.resource_status.commited && gl.uniform1f(this.get_custom_uniform($uniform$$), $value$$);
};
gb.shader.prototype.set_i32 = function $gb$shader$$set_i32$($value$$, $uniform$$) {
  this.get_status() !== gb.resource_status.commited || "undefined" !== typeof this.m_cached_uniforms[$uniform$$] && this.m_cached_uniforms[$uniform$$] === $value$$ || ("undefined" === typeof this.m_cached_uniforms[$uniform$$] && (this.m_cached_uniforms[$uniform$$] = gb.shader_uniform(gb.uniform_type.i32)), gl.uniform1i(this.m_uniforms[$uniform$$], gl.FALSE, $value$$), this.m_cached_uniforms[$uniform$$].set_i32($value$$));
};
gb.shader.prototype.set_custom_i32 = function $gb$shader$$set_custom_i32$($value$$, $uniform$$) {
  this.get_status() === gb.resource_status.commited && gl.uniform1i(this.get_custom_uniform($uniform$$), $value$$);
};
gb.shader.prototype.set_texture = function $gb$shader$$set_texture$($texture$$, $sampler$$) {
  this.get_status() === gb.resource_status.commited && $sampler$$ < gb.shader_sampler_type.max && (gl.activeTexture(gl.TEXTURE0 + $sampler$$), $texture$$.bind(), gl.uniform1i(this.m_samplers[$sampler$$], $sampler$$));
};
gb.shader.prototype.bind = function $gb$shader$$bind$() {
  this.get_status() === gb.resource_status.commited && gl.useProgram(this.m_shader_id);
};
gb.shader.prototype.unbind = function $gb$shader$$unbind$() {
  this.get_status() === gb.resource_status.commited && gl.useProgram(null);
};
$.getScript("src/resources/resource_base.js");
gb.texture = function $gb$texture$($guid$$) {
  gb.resource_base.call(this, $guid$$);
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
  Object.defineProperty(this, "wrap_mode", {set:function($value$$) {
    this.m_presseted_wrap_mode = $value$$;
  }});
  Object.defineProperty(this, "mag_filter", {set:function($value$$) {
    this.m_presetted_mag_filter = $value$$;
  }});
  Object.defineProperty(this, "min_filter", {set:function($value$$) {
    this.m_presetted_min_filter = $value$$;
  }});
};
gb.texture.prototype = Object.create(gb.resource_base.prototype);
gb.texture.prototype.constructor = gb.texture;
gb.texture.construct = function $gb$texture$construct$($guid$$14_texture$$, $texture_id$$, $width$$, $height$$) {
  $guid$$14_texture$$ = new gb.texture($guid$$14_texture$$);
  $guid$$14_texture$$.m_texture_id = $texture_id$$;
  $guid$$14_texture$$.m_width = $width$$;
  $guid$$14_texture$$.m_height = $height$$;
  $guid$$14_texture$$.m_status = gb.resource_status.commited;
  return $guid$$14_texture$$;
};
gb.texture.prototype.on_transfering_data_serialized = function $gb$texture$$on_transfering_data_serialized$($transfering_data$$) {
  switch($transfering_data$$.type) {
    case gb.resource_transfering_data_type.texture:
      this.m_status = gb.resource_status.loaded;
  }
};
gb.texture.prototype.on_transfering_data_commited = function $gb$texture$$on_transfering_data_commited$($transfering_data$$) {
  switch($transfering_data$$.type) {
    case gb.resource_transfering_data_type.texture:
      this.m_texture_id = $transfering_data$$.texture_id, this.m_width = $transfering_data$$.width, this.m_height = $transfering_data$$.height, this.m_status = gb.resource_status.commited;
  }
};
gb.texture.prototype.bind = function $gb$texture$$bind$() {
  this.get_status() === gb.resource_status.commited && (gl.bindTexture(gl.TEXTURE_2D, this.texture_id), this.m_presseted_wrap_mode !== this.m_setted_wrap_mode && (this.m_setted_wrap_mode = this.m_presseted_wrap_mode, gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, this.m_setted_wrap_mode), gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, this.m_setted_wrap_mode)), this.m_presetted_min_filter !== this.m_setted_min_filter && (this.m_setted_min_filter = this.m_presetted_min_filter, gl.texParameteri(gl.TEXTURE_2D, 
  gl.TEXTURE_MIN_FILTER, this.m_setted_min_filter)), this.m_presetted_mag_filter !== this.m_setted_mag_filter && (this.m_setted_mag_filter = this.m_presetted_mag_filter, gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, this.m_setted_mag_filter)));
};
gb.texture.prototype.unbind = function $gb$texture$$unbind$() {
  gl.bindTexture(gl.TEXTURE_2D, null);
};
gb.resource_transfering_data_type = {undefined:0, shader:1, texture:2};
gb.resource_transfering_data = function $gb$resource_transfering_data$() {
  this.m_type = gb.resource_transfering_data_type.undefined;
  Object.defineProperty(this, "type", {get:function() {
    return this.m_type;
  }});
};
gb.resource_transfering_data.prototype = {constructor:gb.resource_transfering_data};
$.getScript("src/resources/transfering_data/resource_transfering_data.js");
gb.shader_transfering_data = function $gb$shader_transfering_data$() {
  gb.resource_transfering_data.call(this);
  this.m_type = gb.resource_transfering_data_type.shader;
  this.m_fs_source_code = this.m_vs_source_code = "";
  this.m_shader_id = -1;
  Object.defineProperty(this, "vs_source_code", {get:function() {
    return this.m_vs_source_code;
  }, set:function($value$$) {
    this.m_vs_source_code = $value$$;
  }});
  Object.defineProperty(this, "fs_source_code", {get:function() {
    return this.m_fs_source_code;
  }, set:function($value$$) {
    this.m_fs_source_code = $value$$;
  }});
  Object.defineProperty(this, "shader_id", {get:function() {
    return this.m_shader_id;
  }, set:function($value$$) {
    this.m_shader_id = $value$$;
  }});
};
gb.shader_transfering_data.prototype = Object.create(gb.resource_transfering_data.prototype);
gb.shader_transfering_data.prototype.constructor = gb.shader_transfering_data;
$.getScript("src/resources/transfering_data/resource_transfering_data.js");
gb.texture_transfering_data = function $gb$texture_transfering_data$() {
  gb.resource_transfering_data.call(this);
  this.m_type = gb.resource_transfering_data_type.texture;
  this.m_height = this.m_width = 0;
  this.m_data = null;
  this.m_texture_id = -1;
  Object.defineProperty(this, "width", {get:function() {
    return this.m_width;
  }, set:function($value$$) {
    this.m_width = $value$$;
  }});
  Object.defineProperty(this, "height", {get:function() {
    return this.m_height;
  }, set:function($value$$) {
    this.m_height = $value$$;
  }});
  Object.defineProperty(this, "texture_id", {get:function() {
    return this.m_texture_id;
  }, set:function($value$$) {
    this.m_texture_id = $value$$;
  }});
  Object.defineProperty(this, "data", {get:function() {
    return this.m_data;
  }, set:function($value$$) {
    this.m_data = $value$$;
  }});
};
gb.texture_transfering_data.prototype = Object.create(gb.resource_transfering_data.prototype);
gb.texture_transfering_data.prototype.constructor = gb.texture_transfering_data;
gb.vertex_attribute = function $gb$vertex_attribute$() {
  this.m_position = new gb.vec2(0);
  this.m_texcoord = new gb.vec2(0);
  this.m_color = new gb.vec4(0);
  Object.defineProperty(this, "position", {get:function() {
    return this.m_position;
  }, set:function($value$$) {
    this.m_position = $value$$;
  }});
  Object.defineProperty(this, "texcoord", {get:function() {
    return this.m_texcoord;
  }, set:function($value$$) {
    this.m_texcoord = $value$$;
  }});
  Object.defineProperty(this, "color", {get:function() {
    return this.m_color;
  }, set:function($value$$) {
    this.m_color = $value$$;
  }});
};
gb.vertex_attribute.prototype = {constructor:gb.vertex_attribute, to_array:function $gb$vertex_attribute$$to_array$() {
  return [this.m_position.x, this.m_position.y, this.m_texcoord.x, this.m_texcoord.y, this.m_color.x, this.m_color.y, this.m_color.z, this.m_color.w];
}};
gb.vbo = function $gb$vbo$($size$$, $mode$$) {
  this.m_handler = gl.createBuffer();
  this.m_allocated_size = $size$$;
  this.m_used_size = 0;
  this.m_mode = $mode$$;
  this.m_min_bound = new gb.vec2(INT16_MAX);
  this.m_max_bound = new gb.vec2(INT16_MIN);
  this.m_data = [];
  for (var $i$$ = 0;$i$$ < this.m_allocated_size;++$i$$) {
    this.m_data[$i$$] = new gb.vertex_attribute;
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
gb.vbo.prototype = {constructor:gb.vbo, lock:function $gb$vbo$$lock$() {
  return this.m_data;
}, unlock:function $gb$vbo$$unlock$() {
  this.m_used_size = 0 !== arguments.length && 0 < arguments[0] && arguments[0] < this.m_allocated_size ? arguments[0] : this.m_allocated_size;
  gl.bindBuffer(gl.ARRAY_BUFFER, this.m_handler);
  for (var $vertices$$ = [], $i$$ = 0;$i$$ < this.m_used_size;++$i$$) {
    for (var $vertex_attribute_array_vertex_position$$ = this.m_data[$i$$].to_array(), $j$$ = 0;$j$$ < $vertex_attribute_array_vertex_position$$.length;++$j$$) {
      $vertices$$.push($vertex_attribute_array_vertex_position$$[$j$$]);
    }
    $vertex_attribute_array_vertex_position$$ = new gb.vec2($vertex_attribute_array_vertex_position$$[0], $vertex_attribute_array_vertex_position$$[1]);
    this.m_min_bound = gb.vec2.min($vertex_attribute_array_vertex_position$$, this.m_min_bound);
    this.m_max_bound = gb.vec2.max($vertex_attribute_array_vertex_position$$, this.m_max_bound);
  }
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array($vertices$$), this.m_mode);
}, bind:function $gb$vbo$$bind$($attributes$$) {
  0 !== this.m_used_size && (gl.bindBuffer(gl.ARRAY_BUFFER, this.m_handler), 0 <= $attributes$$[gb.shader_attribute_type.position] && (gl.vertexAttribPointer($attributes$$[gb.shader_attribute_type.position], 2, gl.FLOAT, !1, 32, 0), gl.enableVertexAttribArray($attributes$$[gb.shader_attribute_type.position])), 0 <= $attributes$$[gb.shader_attribute_type.texcoord] && (gl.vertexAttribPointer($attributes$$[gb.shader_attribute_type.texcoord], 2, gl.FLOAT, !1, 32, 8), gl.enableVertexAttribArray($attributes$$[gb.shader_attribute_type.texcoord])), 
  0 <= $attributes$$[gb.shader_attribute_type.color] && (gl.vertexAttribPointer($attributes$$[gb.shader_attribute_type.color], 4, gl.FLOAT, !1, 32, 16), gl.enableVertexAttribArray($attributes$$[gb.shader_attribute_type.color])));
}, unbind:function $gb$vbo$$unbind$($attributes$$) {
  0 !== this.m_used_size && (gl.bindBuffer(gl.ARRAY_BUFFER, this.m_handler), 0 <= $attributes$$[gb.shader_attribute_type.position] && gl.disableVertexAttribArray($attributes$$[gb.shader_attribute_type.position]), 0 <= $attributes$$[gb.shader_attribute_type.texcoord] && gl.disableVertexAttribArray($attributes$$[gb.shader_attribute_type.texcoord]), 0 <= $attributes$$[gb.shader_attribute_type.color] && gl.disableVertexAttribArray($attributes$$[gb.shader_attribute_type.color]), gl.bindBuffer(gl.ARRAY_BUFFER, 
  null));
}};


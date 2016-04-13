/* global oop, gb */
"use strict";

var g_input_context = null;

oop.define_class({
  namespace: "gb",
  name: "input_context",
  constants: {
    source: {
      mouse: 0,
      keyboard: 3
    },

    state: {
      pressed: 0,
      released: 1,
      moved: 2,
      dragged: 3
    }
  },

  init: function() {

    g_input_context = this;

    var canvas = document.getElementById("gl_canvas");
    canvas.onmousedown = this.on_mouse_pressed;
    canvas.onmouseup = this.on_mouse_released;
    canvas.onmousemove = this.on_mouse_moved;

    this.m_listeners = [];

    this.m_mouse_pressed = false;
    this.m_previouse_pressed_point = new gb.vec2(0.0);
  },

  release: function() {

  },

  methods: {

    on_mouse_pressed: function(event) {
      g_input_context.m_mouse_pressed = true;
      var listeners_count = g_input_context.m_listeners.length;
      for (var i = 0; i < listeners_count; ++i) {
        var listener = g_input_context.m_listeners[i];
        if (listener.on_mouse_pressed) {
          listener.on_mouse_pressed(new gb.vec2(event.offsetX, event.offsetY));
        }
      }
      g_input_context.m_previouse_pressed_point.x = event.offsetX;
      g_input_context.m_previouse_pressed_point.y = event.offsetY;
    },

    on_mouse_released: function(event) {
      g_input_context.m_mouse_pressed = false;
      var listeners_count = g_input_context.m_listeners.length;
      for (var i = 0; i < listeners_count; ++i) {
        var listener = g_input_context.m_listeners[i];
        if (listener.on_mouse_released) {
          listener.on_mouse_released(new gb.vec2(event.offsetX, event.offsetY));
        }
      }
      g_input_context.m_previouse_pressed_point.x = event.offsetX;
      g_input_context.m_previouse_pressed_point.y = event.offsetY;
    },

    on_mouse_moved: function(event) {
      var listeners_count = g_input_context.m_listeners.length;
      for (var i = 0; i < listeners_count; ++i) {
        var listener = g_input_context.m_listeners[i];
        if (!g_input_context.m_mouse_pressed && listener.on_mouse_moved) {
          listener.on_mouse_moved(new gb.vec2(event.offsetX, event.offsetY), new gb.vec2(g_input_context.m_previouse_pressed_point.x - event.offsetX,
            g_input_context.m_previouse_pressed_point.y - event.offsetY));
        } else if (g_input_context.m_mouse_pressed && listener.on_mouse_dragged) {
          listener.on_mouse_dragged(new gb.vec2(event.offsetX, event.offsetY), new gb.vec2(g_input_context.m_previouse_pressed_point.x - event.offsetX,
            g_input_context.m_previouse_pressed_point.y - event.offsetY));
        }
      }
      g_input_context.m_previouse_pressed_point.x = event.offsetX;
      g_input_context.m_previouse_pressed_point.y = event.offsetY;
    },

    add_listener: function(listener) {
      this.m_listeners.push(listener);
    },

    remove_listener: function(listener) {

    }
  },

  static_methods: {

  }
});
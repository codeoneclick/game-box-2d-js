/* global oop */
"use strict";

oop.define_class({
  namespace: "gb",
  name: "ces_systems_feeder",

  init: function() {
    this.m_systems = [];
    this.m_root = null;

    var container = document.getElementById("main_container");
    this.m_fps_meter = new FPSMeter(container, {
      position: 'absolute',
      zIndex: 10,
      left: 'auto',
      top: '0px',
      right: '0px',
      bottom: 'auto'
    });

    Object.defineProperty(this, 'root', {
      set: function(value) {
        this.m_root = value;
      }
    });
  },

  release: function() {

  },

  methods: {
    on_update: function(deltatime) {
      for (var i = 0; i < this.m_systems.length; ++i) {
        var system = this.m_systems[i];
        system.on_feed_start(deltatime);
      }
      for (var i = 0; i < this.m_systems.length; ++i) {
        var system = this.m_systems[i];
        system.on_feed(this.m_root, deltatime);
      }
      for (var i = 0; i < this.m_systems.length; ++i) {
        var system = this.m_systems[i];
        system.on_feed_end(deltatime);
      }
      this.m_fps_meter.tick();
    },

    add_system: function(system) {
      this.remove_system(system.type);
      this.m_systems.push(system);
      this.m_systems.sort(function(system_01, system_02) {
        return system_01.priority - system_02.priority;
      });
    },

    remove_system: function(type) {
      var index = this.m_systems.findIndex(function(system) {
        return system.type === type;
      });
      if (index !== -1) {
        this.m_systems.splice(index, 1);
      }
    }
  },

  static_methods: {

  }
});
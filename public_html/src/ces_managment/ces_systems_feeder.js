/* global gb */

gb.ces_systems_feeder = function() {
  this.m_systems = [];
  this.m_root = null;

  this.m_fps_meter = new FPSMeter();

  Object.defineProperty(this, 'root', {
    set: function(value) {
      this.m_root = value;
    }
  });
};

gb.ces_systems_feeder.prototype = {
  constructor: gb.ces_systems_feeder,

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
};
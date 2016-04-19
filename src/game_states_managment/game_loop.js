/* global oop, gb, console, _ */
"use strict";

oop.define_class({
    namespace: "gb",
    name: "game_loop",

    init: function() {
        this.m_listeners = [];
    },

    release: function() {

    },

    methods: {
        on_update: function() {

            var listeners_count = this.m_listeners.length;
            var listener = null;
            for (var i = 0; i < listeners_count; ++i) {
                listener = this.m_listeners[i];
                listener.on_update(0.0);
            }
        },

        add_listener: function(listener) {
            if (_.isFunction(listener.on_update)) {
                if (!_.contains(this.m_listeners, listener)) {
                    this.m_listeners.push(listener);
                } else {
                    console.error("can't add same listener for game loop");
                }
            } else {
                console.error("game loop listener doesn't contain on_update method");
            }
        },

        remove_listener: function(listener) {
            var index = _.indexOf(this.m_listeners, listener);
            if (index !== -1) {
                this.m_listeners.splice(index, 1);
            } else {
                console.error("game loop doesn't contain this listener");
            }
        }
    },

    static_methods: {

    }
});

var g_game_loop = null;

var game_loop = (function(window) {
    function on_update() {
        g_game_loop.on_update();
        g_game_loop.attach_to_runloop()(on_update);
    }

    function init() {
        g_game_loop = new gb.game_loop();

        g_game_loop.attach_to_runloop = function() {
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                function(callback) {
                    window.setTimeout(callback, 1000 / 60);
                };
        };
        return g_game_loop;
    }

    return {
        get_instance: function() {
            if (!g_game_loop) {
                g_game_loop = init();
                on_update();
            }
            return g_game_loop;
        }
    };
})(window);

var loop = (function() {
    return game_loop.get_instance();
})();
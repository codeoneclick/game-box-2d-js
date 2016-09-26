/* global oop, gb */
"use strict";

var g_ss_animation_controller = null;
var g_ss_animation_scene = null;

oop.define_class({
    namespace: "gb",
    name: "ss_animation_controller",

    init: function() {
        $("#ss-animation-tab").append($("<div id=\"ui-ss-animation-center\"/>"));
        $("#ss-animation-tab").append($("<div id=\"ui-ss-animation-left\"/>"));
        
        g_ss_animation_controller = this;

        var game_transition = new gb.game_transition("data/resources/configurations/transitions/transition.spritesheets.animation.json");
        gb.game_controller.get_instance().add_transition(game_transition);

        this.m_grid = null;
    },

    release: function() {

    },

    methods: {

        activate: function() {

            var gl_canvas = $("#gl-canvas").detach();
            $("#ui-ss-animation-center").append(gl_canvas);

            var self = this;
            gb.game_controller.get_instance().goto_transition("data/resources/configurations/transitions/transition.spritesheets.animation.json", function(scene) {
            
                g_ss_animation_scene = scene;
                var camera = new gb.camera(gl.viewport_width, gl.viewport_height);
                scene.camera = camera;
                    
                self.m_grid = scene.fabricator.create_grid("data/resources/configurations/game_objects/sprite_02.json", 32, 32, 32, 32, function() {
                    self.m_grid.color = new gb.vec4(1.0, 1.0, 0.0, 1.0);
                });
                scene.add_child(self.m_grid);
            });
        },

        deactivate: function() {
            g_ss_animation_scene.remove_child(this.m_grid);
            var geometry_component = this.m_grid.get_component(gb.ces_base_component.type.geometry);
            geometry_component.mesh.release();
        },
    },

    static_methods: {

    }
});
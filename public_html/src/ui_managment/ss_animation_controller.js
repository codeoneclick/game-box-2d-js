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

        this.m_sprites = [];
            this.m_frame_width = 32;
            this.m_frame_height = 32;
    },

    release: function() {

    },

    methods: {

        activate: function() {

            var gl_canvas = $("#gl_canvas").detach();
            $("#ui-ss-animation-center").append(gl_canvas);
            var gl_context = new gb.graphics_context();

            var game_transition = new gb.game_transition("data/resources/configurations/transitions/transition.spritesheets.animation.json");
            gb.game_controller.get_instance().add_transition(game_transition);

            gb.game_controller.get_instance().goto_transition("data/resources/configurations/transitions/transition.spritesheets.animation.json", function(scene) {
            
                g_ss_merge_scene = scene;
                var camera = new gb.camera(gl.viewport_width, gl.viewport_height);
                scene.camera = camera;
                    
                var grid_01 = scene.fabricator.create_grid("data/resources/configurations/game_objects/sprite_02.json", 32, 32, 32, 32, function() {
                    grid_01.color = new gb.vec4(1.0, 1.0, 0.0, 1.0);
                });
                scene.add_child(grid_01);
            });
        },

        deactivate: function() {

        },
    },

    static_methods: {

    }
});
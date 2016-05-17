/* global oop, gb */
"use strict";

var g_ss_play_animation_dialog_controller = null;

oop.define_class({
    namespace: "gb",
    name: "ss_play_animation_dialog_controller",
    constants: {
        html_elements: {
            play_animation_dialog: "ss-merge-animation-preview-dialog"
        }
    },
   
    init: function() {
        g_ss_play_animation_dialog_controller = this;
        this.m_transition = new gb.game_transition("data/resources/configurations/transitions/transition.spritesheets.play.animation.dialog.json");
        gb.game_controller.get_instance().add_transition(this.m_transition);
    },

    release: function() {

    },

    methods: {

        activate: function(image, frames) {
            var gl_canvas = $("#gl_canvas").detach();
            $("#" + gb.ss_play_animation_dialog_controller.html_elements.play_animation_dialog).append(gl_canvas);
            this.m_scene = null;

            var self = this;
            gb.game_controller.get_instance().goto_transition("data/resources/configurations/transitions/transition.spritesheets.play.animation.dialog.json", function(scene) {
                self.m_scene = scene;
                var camera = new gb.camera(gl.viewport_width, gl.viewport_height);
                scene.camera = camera;

                var atlas_texture = scene.fabricator.resources_accessor.get_texture("animation_atlas", image);
                atlas_texture.add_resource_loading_callback(function(resource, userdata) {
                    
                    var sprite = scene.fabricator.create_sprite("data/resources/configurations/game_objects/sprite.json", function() {
                        resource.mag_filter = gl.LINEAR;
                        resource.min_filter = gl.LINEAR;
                        resource.wrap_mode = gl.CLAMP_TO_EDGE;
                        var material_component = sprite.get_component(gb.ces_base_component.type.material);
                        material_component.set_texture(resource, 0);
                        console.log(resource);
                        console.log(frames);
                        scene.add_child(sprite);
                        sprite.size = new gb.vec2(256, 256);
                        sprite.add_animation("animation", frames);
                    });
                });
            });
        },

        deactivate: function() {
            var sprites = this.m_scene.children;
            var sprites_count = sprites.length;
            if(sprites_count !== 0) {
                for(var i = 0; i < sprites_count; ++i) {
                    var sprite = sprites[i];
                    var geometry_component = sprite.get_component(gb.ces_base_component.type.geometry);
                    geometry_component.mesh.release();
                    this.m_scene.remove_child(sprite);
                }
            }
        }
    },

    static_methods: {

    }
});
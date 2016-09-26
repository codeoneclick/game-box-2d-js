/* global oop, gb */
"use strict";

var g_ss_preview_animation_controller = null;

oop.define_class({
    namespace: "gb",
    name: "ss_preview_animation_controller",
   
    init: function() {
        g_ss_preview_animation_controller = this;
        this.m_transition = new gb.game_transition("data/resources/configurations/transitions/transition.spritesheets.play.animation.dialog.json");
        gb.game_controller.get_instance().add_transition(this.m_transition);
    },

    release: function() {

    },

    methods: {

        activate: function(images, frames) {
            var gl_canvas = $("#gl-canvas").detach();
            $("#" + gb.ss_merge_controller.html_elements.export_animation_preview_dialog).append(gl_canvas);
            this.m_scene = null;

            var self = this;
            gb.game_controller.get_instance().goto_transition("data/resources/configurations/transitions/transition.spritesheets.play.animation.dialog.json", function(scene) {
                self.m_scene = scene;
                var camera = new gb.camera(gl.viewport_width, gl.viewport_height);
                scene.camera = camera;

                var sprite = scene.fabricator.create_sprite("data/resources/configurations/game_objects/sprite.json", function() {
                    var material_component = sprite.get_component(gb.ces_base_component.type.material);
                    var images_count = images.length;
                    for(var i = 0; i < images_count; ++i) {
                        var image = images[i];
                        var texture = scene.fabricator.resources_accessor.get_texture("page_" + i + ".png", image);
                        texture.mag_filter = gl.LINEAR;
                        texture.min_filter = gl.LINEAR;
                        texture.wrap_mode = gl.CLAMP_TO_EDGE;
                        material_component.set_texture(texture, i);
                    }
                    scene.add_child(sprite);
                    sprite.size = new gb.vec2(256, 256);
                    sprite.position = new gb.vec2(gl.viewport_width * 0.5, gl.viewport_height * 0.5);
                    sprite.add_animation("animation", frames);
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
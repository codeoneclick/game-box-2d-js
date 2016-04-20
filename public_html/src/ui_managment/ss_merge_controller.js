/* global oop, gb */
"use strict";

var g_ss_merge_controller = null;
var g_ss_merge_scene = null;

oop.define_class({
    namespace: "gb",
    name: "ss_merge_controller",

    init: function() {

        $("#ss-merge-tab").append($("<div id=\"ui-ss-merge-center\"/>"));
        $("#ss-merge-tab").append($("<div id=\"ui-ss-merge-left\"/>"));
        $("#ui-ss-merge-center").append($("<canvas id=\"gl_canvas\" width=\"1024\" height=\"1024\"></canvas>"));
        $("#ui-ss-merge-left").append($("<div id=\"frame-size\">Frame Size</div>"));
        $("#frame-size").append($("<div id=\"frame-width-slider\"><input type=\"text\" id=\"frame-width-value\" readonly value=\"Width 32 px\"></div></p>"));
        $("#frame-size").append($("<div id=\"frame-height-slider\"><input type=\"text\" id=\"frame-height-value\" readonly value=\"Height 32 px\"></div></p>"));
        $("#ui-ss-merge-left").append($("<div id=\"images-container\">Images</div>"));
        $("#images-container").append($("<ul id=\"images-list\">"));
        $("#images-container").append($("</ul>"));
        $("#ui-ss-merge-left").append($("<div id=\"drop-zone\">Drop Zone</div>"));

        $("#frame-width-slider").slider({
            value:32,
            min: 32,
            max: 1024,
            step: 32,
            slide: function( event, ui ) {
                $( "#frame-width-value" ).val("Width " + ui.value + " px");
                g_ss_merge_controller.m_frame_width = ui.value;  
            }
        });

        $("#frame-height-slider").slider({
            value:32,
            min: 32,
            max: 1024,
            step: 32,
            slide: function( event, ui ) {
                $( "#frame-height-value" ).val("Height " + ui.value + " px");
                g_ss_merge_controller.m_frame_height = ui.value;   
            }
        });

        $("#images-list").sortable();
        $("#images-list").disableSelection();

        var drop_zone = document.getElementById('drop-zone');
        drop_zone.addEventListener('dragover', this.handle_drag_over, false);
        drop_zone.addEventListener('drop', this.handle_file_select, false);

        g_ss_merge_controller = this;
    },

    release: function() {

    },

    methods: {

        activate: function() {

            var gl_canvas = $("#gl_canvas").detach();
            $("#ui-ss-merge-center").append(gl_canvas);
            var gl_context = new gb.graphics_context();

            var game_transition = new gb.game_transition("data/resources/configurations/transitions/transition.spritesheets.merge.json");
            gb.game_controller.get_instance().add_transition(game_transition);

            gb.game_controller.get_instance().goto_transition("data/resources/configurations/transitions/transition.spritesheets.merge.json", function(scene) {
            
                g_ss_merge_scene = scene;
                var camera = new gb.camera(gl.viewport_width, gl.viewport_height);
                scene.camera = camera;
                    
                var grid_01 = scene.fabricator.create_grid("data/resources/configurations/game_objects/sprite_02.json", 32, 32, 32, 32, function() {
                    grid_01.color = new gb.vec4(1.0, 1.0, 0.0, 1.0);
                });
                scene.add_child(grid_01);
            });

            this.m_sprites = [];
            this.m_frame_width = 32;
            this.m_frame_height = 32;
        },

        deactivate: function() {

        },

        handle_file_select: function(event) {
                event.stopPropagation();
                event.preventDefault();

                var files = event.dataTransfer.files;
                for(var i = 0; i < files.length; ++i) {
                    var file = files[i];
                    if (!file.type.match('image.*')) {
                        continue;
                    }
                    var reader = new FileReader();
                    reader.m_filename = file.name;

                    reader.onload = (function(data) {
                        return function(data) {
                            var image = new Image();
                            image.src = data.target.result;

                            var new_texture = g_ss_merge_scene.fabricator.resources_accessor.get_texture(data.target.m_filename, image);
                            new_texture.add_resource_loading_callback(function(resource, userdata) {
                                var sprite = g_ss_merge_scene.fabricator.create_sprite("data/resources/configurations/game_objects/sprite_01.json", function() {
                                    resource.wrap_mode = gl.CLAMP_TO_EDGE;
                                    var material_component = sprite.get_component(gb.ces_base_component.type.material);
                                    material_component.set_texture(resource, 0);
                                });
                                g_ss_merge_scene.add_child(sprite);

                                var new_cell_tag = "<li class=\"ui-state-default\">" + ['<img id="images-list-cell-image" align="left" src="', data.target.result,'"/>'].join('') + "</li>";
                                $("#images-list").append($(new_cell_tag));

                                g_ss_merge_controller.m_sprites.push(sprite);
                                g_ss_merge_controller.reorder_sprites_positions();
                            });
                        };
                    })(file);
                    reader.readAsDataURL(file);
                }
        },

        handle_drag_over: function(event) {
            event.stopPropagation();
            event.preventDefault();
            event.dataTransfer.dropEffect = 'copy';
        },

        reorder_sprites_positions: function() {
            var sprites_count = this.m_sprites.length;
            var x_offset = 0;
            var y_offset = 0;
            for(var i = 0; i < sprites_count; ++i) {
                var sprite = this.m_sprites[i];
                sprite.size = new gb.vec2(this.m_frame_width, this.m_frame_height);
                sprite.position = new gb.vec2(x_offset, y_offset);
                x_offset += this.m_frame_width;
                if(x_offset >= gl.viewport_width) {
                    x_offset = 0;
                    y_offset += this.m_frame_height;
                }
                if(y_offset >= gl.viewport_height) {
                    console.error("can't insert image");
                }
            }
        }
    },

    static_methods: {

    }
});
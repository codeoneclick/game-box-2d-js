/* global oop, gb */
"use strict";

var g_ss_merge_controller = null;
var g_ss_merge_transition = null;
var g_ss_merge_scene = null;

oop.define_class({
    namespace: "gb",
    name: "ss_merge_controller",

    init: function() {

        $("#ss-merge-tab").append($("<div id=\"ui-ss-merge-center\"/>"));
        $("#ss-merge-tab").append($("<div id=\"ui-ss-merge-left\"/>"));
        $("#ui-ss-merge-center").append($("<canvas id=\"gl_canvas\" width=\"1024\" height=\"1024\"></canvas>"));
        $("#ui-ss-merge-left").append($("<div id=\"frame-size\">Frame Settings</div>"));
        $("#frame-size").append($("<div id=\"frame-width-slider\"><input type=\"text\" id=\"frame-width-value\" readonly value=\"Width 128 px\"></div></p>"));
        $("#frame-size").append($("<div id=\"frame-height-slider\"><input type=\"text\" id=\"frame-height-value\" readonly value=\"Height 128 px\"></div></p>"));
        $("#frame-size").append($("<input type=\"checkbox\" id=\"frame-settings-frame-align\"><label id=\"frame-settings-frame-align-label\" for=\"frame-settings-frame-align\">Align</label>"));
        $("#frame-size").append($("<input type=\"checkbox\" id=\"frame-settings-frame-proportional\"><label id=\"frame-settings-frame-proportional-label\" for=\"frame-settings-frame-proportional\">Proportional</label>"));      
        $("#ui-ss-merge-left").append($("<div id=\"images-container\">Frames</div>"));
        $("#images-container").append($("<ul id=\"images-list\">"));
        $("#images-container").append($("</ul>"));
        $("#ui-ss-merge-left").append($("<div id=\"drop-zone\">Drop Zone</div>"));
        $("#ui-ss-merge-left").append($("<div id=\"ss-merge-save-zone\"><button id=\"ss-merge-save-button\" type=\"button\">Generate</button></div>"));

        $("#frame-width-slider").slider({
            value: 128,
            min: 32,
            max: 1024,
            step: 32,
            slide: function( event, ui ) {
                $( "#frame-width-value" ).val("Width " + ui.value + " px");
                g_ss_merge_controller.m_frame_width = ui.value;  
            }
        });

        $("#frame-height-slider").slider({
            value: 128,
            min: 32,
            max: 1024,
            step: 32,
            slide: function( event, ui ) {
                $( "#frame-height-value" ).val("Height " + ui.value + " px");
                g_ss_merge_controller.m_frame_height = ui.value;   
            }
        });

        $("#frame-settings-frame-align").button();
        $("#frame-settings-frame-proportional").button();

        $('#frame-settings-frame-align').bind('change', function() {
            g_ss_merge_controller.m_selector.is_align_movement = $(this).is(':checked');
        });

        $('#frame-settings-frame-proportional').bind('change', function() {
            g_ss_merge_controller.m_selector.is_proportional_resizing = $(this).is(':checked');
        });

        $("#images-list").sortable();
        $("#images-list").disableSelection();

        $("#images-list").sortable({
            stop: function() {
                var tags = $('#images-list li').map(function() { 
                    return $(this).find("#image-index").text(); });
                var sprites = [];
                var tags_count = tags.length;
                var sprite = null;
                for(var i = 0; i < tags_count; ++i) {
                    sprite = g_ss_merge_controller.m_sprites.find(function(analized_sprite) {
                        return analized_sprite.tag === tags[i];
                    });
                    sprites.push(sprite);
                }
                g_ss_merge_controller.m_sprites = sprites;
                g_ss_merge_controller.reorder_sprites_positions();
            }
        });

        var drop_zone = document.getElementById('drop-zone');
        drop_zone.addEventListener('dragover', this.handle_drag_over, false);
        drop_zone.addEventListener('drop', this.handle_file_select, false);

        var self = this;
        var save_button = document.getElementById('ss-merge-save-button');
        save_button.onclick = function() {

            var sortered_sprites = self.m_sprites.sort(function(sprite_1, sprite_2) {
                return sprite_2.size.x * sprite_2.size.y - sprite_1.size.x * sprite_1.size.y;
            });
            var sprites_count = sortered_sprites.length;
            var image_width = 0;
            var image_height = 0;
            for(var i = 0; i < sprites_count; ++i) {
                var sprite = sortered_sprites[i];
                var sprite_offset_x = sprite.position.x + sprite.size.x;
                var sprite_offset_y = sprite.position.y + sprite.size.y;
                image_width = sprite_offset_x > image_width ? sprite_offset_x : image_width;
                image_height = sprite_offset_y > image_height ? sprite_offset_y : image_height;
            }
            image_width = Math.min(image_width, gl.viewport_width);
            image_height = Math.min(image_height, gl.viewport_height);

            if(image_width > 0 && image_height > 0) {
                var image = g_ss_merge_transition.get_ws_technique_result_as_image("ws.savetoimage", 0,  image_width, image_height);
                var frames = g_ss_merge_controller.create_animation_configuration(image_width, image_height);
                window.location.href = image.src.replace('image/png', 'image/octet-stream');

                var new_texture = g_ss_merge_scene.fabricator.resources_accessor.get_texture("preview_atlas", image);
                new_texture.add_resource_loading_callback(function(resource, userdata) {
                    if(!g_ss_merge_controller.m_preview_sprite) {
                        g_ss_merge_controller.m_preview_sprite = g_ss_merge_scene.fabricator.create_sprite("data/resources/configurations/game_objects/sprite.json", function() {
                            resource.mag_filter = gl.LINEAR;
                            resource.min_filter = gl.LINEAR;
                            resource.wrap_mode = gl.CLAMP_TO_EDGE;
                            var material_component = g_ss_merge_controller.m_preview_sprite.get_component(gb.ces_base_component.type.material);
                            material_component.set_texture(resource, 0);
                        });
                        g_ss_merge_scene.add_child(g_ss_merge_controller.m_preview_sprite);
                        g_ss_merge_controller.m_preview_sprite.size = new gb.vec2(256, 256);
                    } else {
                        var material_component = g_ss_merge_controller.m_preview_sprite.get_component(gb.ces_base_component.type.material);
                        material_component.set_texture(resource, 0);
                    }
                    g_ss_merge_controller.m_preview_sprite.add_animation("preview_animation", frames);
                });
            }
        };

        g_ss_merge_controller = this;

        var gl_context = new gb.graphics_context();

        g_ss_merge_transition = new gb.game_transition("data/resources/configurations/transitions/transition.spritesheets.merge.json");
        gb.game_controller.get_instance().add_transition(g_ss_merge_transition);

        this.m_sprites = [];
        this.m_frame_width = 128;
        this.m_frame_height = 128;

        this.m_grid = null;
        this.m_preview_sprite = null;

        this.m_selector = null;
        this.m_frames_container = new gb.frames_container();
    },

    release: function() {

    },

    methods: {

        activate: function() {

            var gl_canvas = $("#gl_canvas").detach();
            $("#ui-ss-merge-center").append(gl_canvas);

            var self = this;
            gb.game_controller.get_instance().goto_transition("data/resources/configurations/transitions/transition.spritesheets.merge.json", function(scene) {
                g_ss_merge_scene = scene;
                var camera = new gb.camera(gl.viewport_width, gl.viewport_height);
                scene.camera = camera;

                self.m_grid = scene.fabricator.create_grid("data/resources/configurations/game_objects/grid.json", 32, 32, 32, 32, function() {
                    self.m_grid.color = new gb.vec4(0.0, 1.0, 0.0, 1.0);
                    self.m_grid.position = new gb.vec2(0.0, -1.0);
                });
                scene.add_child(self.m_grid);

                var sprites_count = self.m_sprites.length;
                if(sprites_count !== 0) {
                    for(var i = 0; i < sprites_count; ++i) {
                        var sprite = self.m_sprites[i];
                        scene.add_child(sprite);
                    }
                }

                var editor_fabricator = new gb.editor_fabricator();
                editor_fabricator.scene_fabricator = scene.fabricator;
                self.m_selector = editor_fabricator.create_selector();
            });
        },

        deactivate: function() {
            var sprites_count = this.m_sprites.length;
            if(sprites_count !== 0) {
                for(var i = 0; i < sprites_count; ++i) {
                    var sprite = this.m_sprites[i];
                    g_ss_merge_scene.remove_child(sprite);
                }
            }
            g_ss_merge_scene.remove_child(this.m_grid);
            var geometry_component = this.m_grid.get_component(gb.ces_base_component.type.geometry);
            geometry_component.mesh.release();
        },

        handle_file_select: function(event) {
                event.stopPropagation();
                event.preventDefault();

                var files = event.dataTransfer.files;
                var files_count_unprocessed = files.length;
                var files_count_processed = 0;
                for(var i = 0; i < files_count_unprocessed; ++i) {
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
                                var sprite = g_ss_merge_scene.fabricator.create_sprite("data/resources/configurations/game_objects/sprite.json", function() {
                                    resource.mag_filter = gl.LINEAR;
                                    resource.min_filter = gl.LINEAR;
                                    resource.wrap_mode = gl.CLAMP_TO_EDGE;
                                    var material_component = sprite.get_component(gb.ces_base_component.type.material);
                                    material_component.set_texture(resource, 0);
                                    sprite.size = new gb.vec2(resource.width, resource.height);
                                    files_count_processed++;
                                    if(files_count_processed === files_count_unprocessed) {
                                        g_ss_merge_controller.reorder_sprites_positions();
                                    }
                                });

                                var sprites_count = g_ss_merge_controller.m_sprites.length;
                                var same_images_count = 0;
                                var analized_sprite = null;
                                for(var i = 0; i < sprites_count; ++i) {
                                    analized_sprite = g_ss_merge_controller.m_sprites[i];
                                    if(analized_sprite.tag.indexOf(data.target.m_filename) !== -1) {
                                        same_images_count++;
                                    }
                                }

                                var unique_tag = data.target.m_filename;
                                if(same_images_count !== 0) {
                                    unique_tag += "(" + same_images_count + ")"
                                }

                                var frame_tag = "<div id=\"image-index\">" + unique_tag + "</div>"
                                var cell_tag = "<li class=\"ui-state-default\">" + ['<img id="images-list-cell-image" align="left" src="', data.target.result,'"/>'].join('') + "<button id=\"delete-image-button\" type=\"button\">Delete</button>" + frame_tag + "</li>";
                                $("#images-list").append($(cell_tag));

                                var cells = $("#images-list").children();
                                var cell = cells[cells.length - 1];
                                var delete_button = $(cell).find("#delete-image-button")

                                $(delete_button).click(function() {
                                    var frame_tag = $(this).parent().find("#image-index").text();
                                    $(this).parent().remove();

                                    var sprite_index = -1;
                                    var sprite = null;
                                    var sprites_count = g_ss_merge_controller.m_sprites.length;
                                    for(var i = 0; i < sprites_count; ++i) {
                                        sprite = g_ss_merge_controller.m_sprites[i];
                                        if(sprite.tag === frame_tag) {
                                            sprite_index = i;
                                            break;
                                        }
                                    }
                                    g_ss_merge_controller.m_sprites.splice(sprite_index, 1);
                                    g_ss_merge_scene.remove_child(sprite);
                                    sprite.release();
                                    g_ss_merge_controller.reorder_sprites_positions();
                                });

                                sprite.is_touchable = true;
                                var touch_recognize_component = sprite.get_component(gb.ces_base_component.type.touch_recognize);
                                touch_recognize_component.add_callback(gb.input_context.state.pressed, g_ss_merge_controller.on_sprite_pressed, g_ss_merge_controller);

                                sprite.tag = unique_tag;
                                g_ss_merge_scene.add_child(sprite);
                                g_ss_merge_controller.m_sprites.push(sprite);
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
            this.set_selected_sprite(null);
            this.m_frames_container.reset();
            var sortered_sprites = this.m_sprites.sort(function(sprite_1, sprite_2) {
                return sprite_2.size.x * sprite_2.size.y - sprite_1.size.x * sprite_1.size.y;
            });
            var sprites_count = sortered_sprites.length;
            for(var i = 0; i < sprites_count; ++i) {
                var sprite = sortered_sprites[i];
                var sprite_size = sprite.size;
                var frame = this.m_frames_container.get_frame_parameters(sprite_size.x, sprite_size.y);
                if(frame) {
                    sprite.position = new gb.vec2(frame.x, frame.y);
                } else {
                    console.error("can't insert image");
                }
            }
        },

        create_animation_configuration: function(atlas_width, atlas_height) {
            var frames = [];
            var sprites_count = this.m_sprites.length;
            var sprite = null;
            var position_0 = null;
            var position_1 = null;
            for(var i = 0; i < sprites_count; ++i) {
                sprite = this.m_sprites[i];
                position_0 = sprite.position;
                position_1 = gb.vec2.add(position_0, sprite.size);
                frames.push({u_0:position_0.x / atlas_width, v_0: position_0.y / atlas_height, 
                    u_1:position_1.x / atlas_width, v_1: position_1.y / atlas_height});
            }
            return frames;
        },

        on_sprite_pressed: function(entity, state, point, userdata) {
            userdata.set_selected_sprite(entity);
        },

        set_selected_sprite: function(sprite) {

            var target_touch_recognize_component = null;
            if(this.m_selector.target) {
                var target = this.m_selector.target;
                g_ss_merge_scene.add_child(target);
                target.position = this.m_selector.position;
                target.rotation = this.m_selector.rotation;
                target_touch_recognize_component = target.get_component(gb.ces_base_component.type.touch_recognize);
                target_touch_recognize_component.add_callback(gb.input_context.state.pressed, this.on_sprite_pressed, this);
            }
            if(sprite) {
                this.m_selector.position = sprite.position;
                this.m_selector.rotation = sprite.rotation;
                this.m_selector.size = sprite.size;
                this.m_selector.target = sprite;

                target_touch_recognize_component = sprite.get_component(gb.ces_base_component.type.touch_recognize);
                target_touch_recognize_component.remove_callback(gb.input_context.state.pressed, this.on_sprite_pressed);

                this.m_selector.bounding_quad.remove_from_parent();
                g_ss_merge_scene.add_child(this.m_selector.bounding_quad);
            } else {
                this.m_selector.target = null;
            }
        }
    },

    static_methods: {

    }
});
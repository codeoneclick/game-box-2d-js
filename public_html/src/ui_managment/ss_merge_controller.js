/* global oop, gb */
"use strict";

var g_ss_merge_controller = null;
var g_ss_merge_transition = null;
var g_ss_merge_scene = null;

oop.define_class({
    namespace: "gb",
    name: "ss_merge_controller",
    constants: {
        html_elements: {
            frame_settings: "ss-merge-frame-settings",
            frame_aligment: "ss-merge-frame-settings-aligment",
            frame_aligment_freeform: "ss-merge-frame-settings-aligment-freeform",
            frame_aligment_snaptogrid: "ss-merge-frame-settings-aligment-snaptogrid",
            frame_resizing: "ss-merge-frame-settings-resizing",
            frame_resizing_freeform: "ss-merge-frame-settings-resizing-freeform",
            frame_resizing_aspectratio: "ss-merge-frame-settings-resizing-apectratio",
            frames_list: "ss-merge-frames-list",
            frames_list_cell: "ss-merge-frame-list-cell"
        }
    },

    init: function() {

        $("#ss-merge-tab").append($("<div id=\"ui-ss-merge-center\"/>"));
        $("#ss-merge-tab").append($("<div id=\"ui-ss-merge-left\"/>"));
        $("#ui-ss-merge-center").append($("<canvas style=\"width:100%; height:100%;\" id=\"gl_canvas\" width=\"1024\" height=\"1024\"></canvas>"));

        var element = "<div id=\"play-animation-dialog\" class=\"ui-dialog\" title=\"Animation\"></div>";
        $("#ui-ss-merge-center").append($(element));

        $("#play-animation-dialog").dialog({
            autoOpen: false,
            width: 512,
            height: 512,
            modal: true,
            show: {
                effect: "blind",
                duration: 300
            },
            hide: {
                effect: "blind",
                duration: 300
            },
            beforeClose: function(event, ui) {
               g_ss_merge_controller.m_play_animation_dialog_controller.deactivate();
               g_ss_merge_controller.activate();
            },
        });

        element = "<div id=" + gb.ss_merge_controller.html_elements.frame_settings + "/>";
        $("#ui-ss-merge-left").append($(element));
        element = "<p class=\"ui-widget-header\" style=\"margin:4px;\"><span class=\"ui-icon ui-icon-arrowthick-1-e\" style=\"float:left; margin:4px;\"></span>movement</p>";
        $("#" + gb.ss_merge_controller.html_elements.frame_settings).append($(element));
        element = "<div style=\"margin:4px;\" id=" + gb.ss_merge_controller.html_elements.frame_aligment + ">";
        element += "<input type=\"radio\" id=" + gb.ss_merge_controller.html_elements.frame_aligment_freeform + " name=\"" + gb.ss_merge_controller.html_elements.frame_aligment + "\" checked=\"checked\">";
        element += "<label for=" + gb.ss_merge_controller.html_elements.frame_aligment_freeform + ">free form</label>";
        element += "<input type=\"radio\" id=" + gb.ss_merge_controller.html_elements.frame_aligment_snaptogrid + " name=\"" + gb.ss_merge_controller.html_elements.frame_aligment + "\">";
        element += "<label for=" + gb.ss_merge_controller.html_elements.frame_aligment_snaptogrid + ">snap to grid</label>";
        element += "</div>";
        $("#" + gb.ss_merge_controller.html_elements.frame_settings).append($(element));

        element = "<p class=\"ui-widget-header\" style=\"margin:4px;\"><span class=\"ui-icon ui-icon-arrowthick-2-se-nw\" style=\"float:left; margin:4px;\"></span>resizing</p>";
        $("#" + gb.ss_merge_controller.html_elements.frame_settings).append($(element));
        element = "<div style=\"margin:4px;\" id=" + gb.ss_merge_controller.html_elements.frame_resizing + ">";
        element += "<input type=\"radio\" id=" + gb.ss_merge_controller.html_elements.frame_resizing_freeform +  " name=\"" + gb.ss_merge_controller.html_elements.frame_resizing + "\" checked=\"checked\">";
        element += "<label for=" + gb.ss_merge_controller.html_elements.frame_resizing_freeform + ">free form</label>";
        element += "<input type=\"radio\" id=" + gb.ss_merge_controller.html_elements.frame_resizing_aspectratio + " name=\"" + gb.ss_merge_controller.html_elements.frame_resizing + "\">";
        element += "<label for=" + gb.ss_merge_controller.html_elements.frame_resizing_aspectratio + ">aspect ratio</label>";
        element += "</div>";
        $("#" + gb.ss_merge_controller.html_elements.frame_settings).append($(element));
        
        element = "<p class=\"ui-widget-header\" style=\"margin:4px;\"><span class=\"ui-icon ui-icon-note\" style=\"float:left; margin:4px;\"></span>frames</p>";
        $("#" + gb.ss_merge_controller.html_elements.frame_settings).append($(element));
        element = "<ul style=\"list-style-type:none; height:340px; overflow:auto; margin-left:-10%;\" id=\"" + gb.ss_merge_controller.html_elements.frames_list + "\"></ul>"
        $("#" + gb.ss_merge_controller.html_elements.frame_settings).append($(element));

        $("#ui-ss-merge-left").append($("<div id=\"drop-zone\">Drop Zone</div>"));
        $("#ui-ss-merge-left").append($("<div id=\"ss-merge-save-zone\"><button id=\"ss-merge-save-button\" type=\"button\">Generate</button></div>"));


        $("#" + gb.ss_merge_controller.html_elements.frame_aligment).buttonset();
        $("#" + gb.ss_merge_controller.html_elements.frame_aligment + " input[type=radio]").change(function() {
             g_ss_merge_controller.m_selector.is_align_movement = this.id === gb.ss_merge_controller.html_elements.frame_aligment_snaptogrid;
        });
        $("#" + gb.ss_merge_controller.html_elements.frame_resizing).buttonset();
        $("#" + gb.ss_merge_controller.html_elements.frame_aligment + " input[type=radio]").change(function() {
             g_ss_merge_controller.m_selector.is_align_movement = this.id === gb.ss_merge_controller.html_elements.frame_aligment_snaptogrid;
        });

        $("#" + gb.ss_merge_controller.html_elements.frames_list).sortable();
        $("#" + gb.ss_merge_controller.html_elements.frames_list).disableSelection();

        $("#" + gb.ss_merge_controller.html_elements.frames_list).sortable({
            stop: function() {
                var tags = $("#" + gb.ss_merge_controller.html_elements.frames_list + " li").map(function() { 
                    return $(this).find("#frame-index").text(); });
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
                $("#play-animation-dialog").dialog("open");
                $('.ui-dialog :button').blur();
                g_ss_merge_controller.deactivate();
                g_ss_merge_controller.m_play_animation_dialog_controller.activate(image, frames);
                //window.location.href = image.src.replace('image/png', 'image/octet-stream');

                /*var new_texture = g_ss_merge_scene.fabricator.resources_accessor.get_texture("preview_atlas", image);
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
                });*/
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

        this.m_play_animation_dialog_controller = new gb.ss_play_animation_dialog_controller();
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
                                    sprite.size = new gb.vec2(resource.width * 0.5, resource.height * 0.5);
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
                                
                                var element = "<li class=\"ui-state-default\" style=\"height: 160px; margin: 8px; background: none;\">";
                                element += "<p align=\"center\" style=\"font-size:14px; float:left; margin:2px; margin-left:-0.25%; margin-top:-0.25%; height:24px; width:100%;\" id=\"frame-index\" class=\"ui-widget-header\" style=\"margin:4px;\"><span class=\"ui-icon ui-icon-circle-arrow-e\" style=\"float:left; margin:4px;\"></span><span id=\"delete-icon\" class=\"ui-icon ui-icon-trash\" style=\"float:right; margin:4px;\"></span>" + "   " + unique_tag + "</p>";
                                element += ['<img style=\"float:left; margin:2px; height:128px; width:128px;\" id="images-list-cell-image" align="left" src="', data.target.result,'"/>'].join(''); 
                                element += "</li>";
                                $("#" + gb.ss_merge_controller.html_elements.frames_list).append($(element));

                                var cells = $("#" + gb.ss_merge_controller.html_elements.frames_list).children();
                                var last_cell = cells[cells.length - 1];
                                var delete_icon = $(last_cell).find("#delete-icon")

                                $(delete_icon).click(function() {
                                    var frame_tag = $(this).parent().find("#frame-index").text();
                                    $(this).parent().parent().remove();

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
            var sortered_sprites = this.m_sprites.sort(function(sprite_1, sprite_2) {
                return sprite_1.tag.localeCompare(sprite_2.tag, "en", {numeric: true});
            });
            var sprites_count = sortered_sprites.length;
            var sprite = null;
            var position_0 = null;
            var position_1 = null;
            for(var i = 0; i < sprites_count; ++i) {
                sprite = sortered_sprites[i];
                console.log(sprite.tag);
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
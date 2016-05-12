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
            tab_container: "ss-merge-tab-container",
            tab_left_panel: "ss-merge-tab-left-panel",
            tab_right_panel: "ss-merge-tab-right-panel",
            import_container: "ss-merge-import-container",
            import_size_drop_down_box: "ss-merge-size-drop-down-box",
            import_drop_zone: "ss-merge-drop-zone",
            import_add_image_button: "ss-merge-add_image_button",
            frames_container: "ss-merge-frames-container",
            frames_sort_button: "ss-merge-frames-sort-button",
            frames_list: "ss-merge-frames-list",
            frames_list_cell: "ss-merge-frames-list-cell",
            editing_container: "ss-merge-editing-container",
            editing_move_resize_label: "ss-merge-editing-move-resize-label",
            editing_move_resize_radio_button: "ss-merge-editing-move-resize-radio-button",
            editing_move_resize_freeform_button: "ss-merge-editing-move-resize-freeform-button",
            editing_move_resize_snaptogrid_button: "ss-merge-editing-move-resize-snaptogrid-button",
            editing_spread_button: "ss-merge-editing-spread-button",
            export_container: "ss-merge-export-container",
            export_animation_preview_button: "ss-merge-export-animation-preview_button",
            export_save_atlas_button: "ss-merge-export-atlas-button",
            export_save_frames_button: "ss-merge-export-save-frames-button",
            animation_preview_dialog: "ss-merge-preview-dialog"
        }
    },

    init: function() {
        g_ss_merge_controller = this;
        var ui = gb.ss_merge_controller.html_elements;
        var ui_j = function(element_name) {
            return '#' + ui[element_name];
        };
        var element = null;

        $(ui_j('tab_container')).append($("<div id=" + ui.tab_left_panel + " style=\"background:black;\"/>"));
        $(ui_j('tab_container')).append($("<div id=" + ui.tab_right_panel + " style=\"background:black;\"/>"));
        $(ui_j('tab_right_panel')).append($("<canvas style=\"width:100%; height:100%;\" id=\"gl_canvas\" width=\"1024\" height=\"1024\"></canvas>"));

        element = "<div id=" + ui.import_container + "/>";
        $(ui_j('tab_left_panel')).append($(element));
        element = "<p class=\"ui-widget-header\" style=\"margin:4px;\"><span class=\"ui-icon ui-icon-arrowthick-1-e\" style=\"float:left; margin:4px;\"></span>import</p>";
        $(ui_j('import_container')).append($(element));
        element = "<p style=\"margin-left:2%;\"><label for=\"" + ui.import_size_drop_down_box + "\"> size </label><input id=" + ui.import_size_drop_down_box + " name=\"value\"></p>";
        $(ui_j('import_container')).append($(element));
        $(ui_j('import_size_drop_down_box')).spinner();
        element = "<div id=" + ui.import_drop_zone + "></div>";
        $(ui_j('import_container')).append(element);
        element = "<button id=" + ui.import_add_image_button + ">add image...</button>";
        $(ui_j('import_drop_zone')).append(element);
        $(ui_j('import_add_image_button')).button();
        element = "<label style=\"float:right; margin-top:8%; margin-right:16%\">or drop here...</label>";
        $(ui_j('import_drop_zone')).append(element);
        var drop_zone = document.getElementById(ui.import_drop_zone);
        drop_zone.addEventListener("dragover", this.handle_drag_over, false);
        drop_zone.addEventListener("drop", this.handle_file_select, false);

        element = "<div id=" + ui.frames_container + "/>";
        $(ui_j('tab_left_panel')).append($(element));
        element = "<p class=\"ui-widget-header\" style=\"margin:4px;\"><span class=\"ui-icon ui-icon-arrowthick-1-e\" style=\"float:left; margin:4px;\"></span>frames</p>";
        $(ui_j('frames_container')).append($(element));
        element = "<button id=" + ui.frames_sort_button + " style=\"margin:2%;\">sort by name</button>";
        $(ui_j('frames_container')).append(element);
        $(ui_j('frames_sort_button')).button();
        element = "<ul style=\"list-style-type:none; height:340px; overflow:auto; margin-left:-10%;\" id=\"" + ui.frames_list + "\"></ul>"
        $(ui_j('frames_container')).append($(element));
        $(ui_j('frames_list')).sortable();
        $(ui_j('frames_list')).disableSelection();

        $(ui_j('frames_list')).sortable({
            stop: function() {
                var tags = $(ui_j('frames_list') + " li").map(function() { 
                    return $(this).find("#frame-index").text(); });
                var sprites = [];
                var tags_count = tags.length;
                var sprite = null;
                for(var i = 0; i < tags_count; ++i) {
                    sprite = gb.ss_merge_controller.self().m_sprites.find(function(analized_sprite) {
                        return analized_sprite.tag === tags[i];
                    });
                    sprites.push(sprite);
                }
                gb.ss_merge_controller.self().m_sprites = sprites;
                gb.ss_merge_controller.self().reorder_sprites_positions();
            }
        });

        element = "<div id=" + ui.editing_container + "/>";
        $(ui_j('tab_left_panel')).append($(element));
        element = "<p class=\"ui-widget-header\" style=\"margin:4px;\"><span class=\"ui-icon ui-icon-arrowthick-1-e\" style=\"float:left; margin:4px;\"></span>editing</p>";
        $(ui_j('editing_container')).append($(element));
        element = "<div style=\"margin:2%;\" id=" + ui.editing_move_resize_radio_button + ">";
        element += "<input type=\"radio\" id=" + ui.editing_move_resize_freeform_button + " name=\"" + ui.editing_move_resize_radio_button + "\" checked=\"checked\">";
        element += "<label for=" + ui.editing_move_resize_freeform_button + ">free form</label>";
        element += "<input type=\"radio\" id=" + ui.editing_move_resize_snaptogrid_button + " name=\"" + ui.editing_move_resize_radio_button + "\">";
        element += "<label for=" + ui.editing_move_resize_snaptogrid_button + ">snap to grid</label>";
        element += "</div>";
        $(ui_j('editing_container')).append($(element));
        $(ui_j('editing_move_resize_radio_button')).buttonset();
        $(ui_j('editing_move_resize_radio_button') + " input[type=radio]").change(function() {
             gb.ss_merge_controller.self().m_selector.is_align_movement = this.id === ui.editing_move_resize_snaptogrid_button;
        });
        element = "<button id=" + ui.editing_spread_button + " style=\"margin:2%;\">spread</button>";
        $(ui_j('editing_container')).append(element);
        $(ui_j('editing_spread_button')).button();

        element = "<div id=" + ui.export_container + "/>";
        $(ui_j('tab_left_panel')).append($(element));
        element = "<p class=\"ui-widget-header\" style=\"margin:4px;\"><span class=\"ui-icon ui-icon-arrowthick-1-e\" style=\"float:left; margin:4px;\"></span>export</p>";
        $(ui_j('export_container')).append($(element));
        element = "<button id=" + ui.export_animation_preview_button + " style=\"margin:2%;\">preview</button><br>";
        $(ui_j('export_container')).append(element);
        $(ui_j('export_animation_preview_button')).button();
        element = "<button id=" + ui.export_save_atlas_button + " style=\"margin:2%;\">save atlas</button><br>";
        $(ui_j('export_container')).append(element);
        $(ui_j('export_save_atlas_button')).button();
        element = "<button id=" + ui.export_save_frames_button + " style=\"margin:2%;\">save frames</button>";
        $(ui_j('export_container')).append(element);
        $(ui_j('export_save_frames_button')).button();

        var element = "<div id=" + ui.animation_preview_dialog + " class=\"ui-dialog\" title=\"Animation\"></div>";
        $(ui_j('tab_right_panel')).append($(element));
        $(ui_j('animation_preview_dialog')).dialog({
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
               gb.ss_merge_controller.self().m_play_animation_dialog_controller.deactivate();
               gb.ss_merge_controller.self().activate();
            },
        });

        

        /*var self = this;
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
        };*/

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
            var ui = gb.ss_merge_controller.html_elements;
            var ui_j = function(element_name) {
                return '#' + ui[element_name];
            };
            var gl_canvas = $('#gl_canvas').detach();
            $(ui_j('tab_right_panel')).append(gl_canvas);

            gb.game_controller.get_instance().goto_transition("data/resources/configurations/transitions/transition.spritesheets.merge.json", function(scene) {
                g_ss_merge_scene = scene;
                var camera = new gb.camera(gl.viewport_width, gl.viewport_height);
                scene.camera = camera;

                gb.ss_merge_controller.self().m_grid = scene.fabricator.create_grid("data/resources/configurations/game_objects/grid.json", 32, 32, 32, 32, function() {
                    gb.ss_merge_controller.self().m_grid.color = new gb.vec4(0.0, 1.0, 0.0, 1.0);
                    gb.ss_merge_controller.self().m_grid.position = new gb.vec2(0.0, -1.0);
                });
                scene.add_child(gb.ss_merge_controller.self().m_grid);

                var sprites_count = gb.ss_merge_controller.self().m_sprites.length;
                if(sprites_count !== 0) {
                    for(var i = 0; i < sprites_count; ++i) {
                        var sprite = gb.ss_merge_controller.self().m_sprites[i];
                        scene.add_child(sprite);
                    }
                }

                var editor_fabricator = new gb.editor_fabricator();
                editor_fabricator.scene_fabricator = scene.fabricator;
                gb.ss_merge_controller.self().m_selector = editor_fabricator.create_selector();
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
                                        gb.ss_merge_controller.self().reorder_sprites_positions();
                                    }
                                });

                                var sprites_count = gb.ss_merge_controller.self().m_sprites.length;
                                var same_images_count = 0;
                                var analized_sprite = null;
                                for(var i = 0; i < sprites_count; ++i) {
                                    analized_sprite = gb.ss_merge_controller.self().m_sprites[i];
                                    if(analized_sprite.tag.indexOf(data.target.m_filename) !== -1) {
                                        same_images_count++;
                                    }
                                }

                                var unique_tag = data.target.m_filename;
                                if(same_images_count !== 0) {
                                    unique_tag += "(" + same_images_count + ")"
                                }
                                
                                var element = "<li class=\"ui-state-default\" style=\"height: 160px; margin: 8px; background: none;\">";
                                element += "<p align=\"center\" style=\"font-size:14px; float:left; margin:2px; margin-left:-0.25%; margin-top:-0.25%; height:24px; width:100%;\" id=\"frame-index\" class=\"ui-widget-header\" style=\"margin:4px;\"><span class=\"ui-icon ui-icon-circle-arrow-e\" style=\"float:left; margin:4px;\"></span><span id=\"delete-icon\" class=\"ui-icon ui-icon-trash\" style=\"float:right; margin:4px;\"></span>" + unique_tag + "</p>";
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
                                    var sprites_count = gb.ss_merge_controller.self().m_sprites.length;
                                    for(var i = 0; i < sprites_count; ++i) {
                                        sprite = gb.ss_merge_controller.self().m_sprites[i];
                                        if(sprite.tag === frame_tag) {
                                            sprite_index = i;
                                            break;
                                        }
                                    }
                                    gb.ss_merge_controller.self().m_sprites.splice(sprite_index, 1);
                                    g_ss_merge_scene.remove_child(sprite);
                                    sprite.release();
                                    gb.ss_merge_controller.self().reorder_sprites_positions();
                                });

                                sprite.is_touchable = true;
                                var touch_recognize_component = sprite.get_component(gb.ces_base_component.type.touch_recognize);
                                touch_recognize_component.add_callback(gb.input_context.state.pressed, gb.ss_merge_controller.self().on_sprite_pressed, gb.ss_merge_controller.self());

                                sprite.tag = unique_tag;
                                g_ss_merge_scene.add_child(sprite);
                                gb.ss_merge_controller.self().m_sprites.push(sprite);
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
            console.log(sortered_sprites);
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
        self: function() {
            return g_ss_merge_controller;
        }
    }
});
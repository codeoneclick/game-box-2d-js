/* global oop, gb */
"use strict";

var g_ss_merge_controller = null;
var g_ss_merge_transition = null;

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
            import_size_drop_down_box_button: "ss-merge-size-drop-down-box-button",
            import_drop_zone: "ss-merge-drop-zone",
            import_add_image_button: "ss-merge-add_image-button",
            import_add_image_input: "ss-merge-add_image-input",
            frames_container: "ss-merge-frames-container",
            frames_sort_button: "ss-merge-frames-sort-button",
            frames_table: "ss-merge-frames-table",
            frames_table_scroll: "ss-merge-frames-table_scroll",
            frames_table_cell: "ss-merge-frames-table-cell",
            frames_table_cell_delete_icon: "ss-merge-frames-table-cell-delete-icon",
            frames_table_cell_image: "ss-merge-frames-table-cell-image",
            editing_container: "ss-merge-editing-container",
            editing_page_drop_down_box: "ss-merge-editing-page-drop-down-box",
            editing_page_drop_down_box_button: "ss-merge-editing-page-drop-down-box-button",
            editing_move_resize_radio_button: "ss-merge-editing-move-resize-radio-button",
            editing_move_resize_freeform_button: "ss-merge-editing-move-resize-freeform-button",
            editing_move_resize_snaptogrid_button: "ss-merge-editing-move-resize-snaptogrid-button",
            editing_pack_algorithm_drop_down_box: "ss-merge-editing-pack-algorithm-drop-down-box",
            editing_pack_algorithm_drop_down_box_button: "ss-merge-editing-pack-algorithm-drop-down-box-button",
            editing_spread_button: "ss-merge-editing-spread-button",
            export_container: "ss-merge-export-container",
            export_filename_input: "ss-merge-export-filename-input",
            export_animation_preview_button: "ss-merge-export-animation-preview_button",
            export_save_images_button: "ss-merge-export-atlas-button",
            export_save_pages_table: "ss-merge-export-save-pages-table",
            export_save_pages_table_scroll: "ss-merge-export-save-pages-table-scroll",
            export_save_pages_table_cell: "ss-merge-export-save-pages-table-cell",
            export_save_pages_table_cell_download_button: "ss-merge-export-save-pages-table-cell-download-button",
            export_save_frames_button: "ss-merge-export-save-frames-button",
            export_save_frames_textfield: "ss-merge-export_save-frames-textfield",
            export_save_frames_download_button: "ss-merge-export_save-frames-download-button",
            export_animation_preview_dialog: "ss-merge-export-animation-preview-dialog",
            common_alert_view: "ss-merge-common-alert-view",
            common_alert_view_textfield: "ss-merge-common-alert-view-textfield",
            common_error_view: "ss-merge-common-error-view",
            common_error_view_textfield: "ss-merge-common-error-view-textfield"
        },
        default_filenames: {
            page: "page",
            configuration: "configuration"
        }
    },

    init: function() {
        g_ss_merge_controller = this;
        var ui = gb.ss_merge_controller.ui();
        var ui_j = gb.ss_merge_controller.ui_j;
        var self = gb.ss_merge_controller.self();
        var element = null;

        window.onerror = function(message, file, line, column, error) {
            var stack = error ? "\n\n" + error.stack : "";
            self.error_view.show(message + "\n(" + file + ":" + line + ")" + stack, ui, ui_j);
        };

        $(ui_j(ui.tab_container)).append($("<div id=" + ui.tab_left_panel + " style=\"background:black;\"/>"));
        $(ui_j(ui.tab_container)).append($("<div id=" + ui.tab_right_panel + " style=\"background:black;\"/>"));
        $(ui_j(ui.tab_right_panel)).append($("<canvas style=\"width:100%; height:100%;\" id=\"gl_canvas\" width=\"1024\" height=\"1024\"></canvas>"));

        this.m_import_view = new gb.ss_merge_import_view(this, ui, ui_j);
        this.m_frames_view = new gb.ss_merge_frames_view(this, ui, ui_j);
        this.m_packer_view = new gb.ss_merge_packer_view(this, ui, ui_j);
        this.m_export_view = new gb.ss_merge_export_view(this, ui, ui_j);

        $(ui_j(ui.tab_container)).tooltip({
            position: {
                my: 'left top',
                at: 'left+10 top+10',
                of: '#gl_canvas'
            }
        });
        $(ui_j(ui.tab_left_panel)).accordion({
            heightStyle: 'content'
        });
        $(ui_j(ui.tab_left_panel)).on("accordionbeforeactivate", function(event, element) {
            var index = $(element.newHeader).index('h3');
            if (index > 0 && self.m_sprites.length === 0) {
                self.alert_view.show("You need to add sprites at first!", ui, ui_j);
                return false;
            } 
            return true;
        });

        var gl_context = new gb.graphics_context();
        g_ss_merge_transition = new gb.game_transition("data/resources/configurations/transitions/transition.spritesheets.merge.json");
        gb.game_controller.get_instance().add_transition(g_ss_merge_transition);

        this.m_sprites = [];
        this.m_sprites_on_pages = [];
        this.m_current_page = 0;
        this.m_importing_images_size = 1.0;

        this.m_grid = null;

        this.m_selector = null;

        this.m_preview_animation_controller = new gb.ss_preview_animation_controller();
        this.m_alert_view = new gb.common_alert_view(ui.tab_left_panel, ui, ui_j);
        this.m_error_view = new gb.common_error_view(ui.tab_left_panel, ui, ui_j);

        this.m_merge_algorithm = new gb.max_rects_pack_algorithm();
        this.m_merge_algorithm.atlas_width = 1024;
        this.m_merge_algorithm.atlas_height = 1024;
        this.m_merge_algorithm.heuristic = gb.max_rects_pack_algorithm.heuristic.TL;

        this.m_scene = null;
        this.m_page_size = 1024;

        this.m_export_image_filename = gb.ss_merge_controller.default_filenames.page;
        this.m_export_configuration_filename = gb.ss_merge_controller.default_filenames.configuration;

        Object.defineProperty(this, 'import_view', {
            get: function() {
                return this.m_import_view;
            }
        });
        Object.defineProperty(this, 'frames_view', {
            get: function() {
                return this.m_frames_view;
            }
        });
        Object.defineProperty(this, 'export_view', {
            get: function() {
                return this.m_export_view;
            }
        });
        Object.defineProperty(this, 'preview_animation_controller', {
            get: function() {
                return this.m_preview_animation_controller;
            }
        });
        Object.defineProperty(this, 'alert_view', {
            get: function() {
                return this.m_alert_view;
            }
        });
        Object.defineProperty(this, 'error_view', {
            get: function() {
                return this.m_error_view;
            }
        });
        Object.defineProperty(this, 'importing_images_size', {
            get: function() {
                return this.m_importing_images_size;
            }
        });
        Object.defineProperty(this, 'export_image_filename', {
            get: function() {
                return this.m_export_image_filename;
            },
            set: function(value) {
                this.m_export_image_filename = value;
            }
        });
        Object.defineProperty(this, 'export_configuration_filename', {
            get: function() {
                return this.m_export_configuration_filename;
            },
            set: function(value) {
                this.m_export_configuration_filename = value;
            }
        });
        Object.defineProperty(this, 'scene', {
            get: function() {
                return this.m_scene;
            },
            set: function(value) {
                this.m_scene = value;
            }
        });
    },

    release: function() {

    },

    methods: {
        activate: function() {
            var self = gb.ss_merge_controller.self();
            var ui = gb.ss_merge_controller.html_elements;
            var ui_j = gb.ss_merge_controller.ui_j;

            var gl_canvas = $('#gl_canvas').detach();
            $(ui_j(ui.tab_right_panel)).append(gl_canvas);

            gb.game_controller.get_instance().goto_transition("data/resources/configurations/transitions/transition.spritesheets.merge.json", function(scene) {
                self.scene = scene;
                var camera = new gb.camera(gl.viewport_width, gl.viewport_height);
                scene.camera = camera;

                self.m_grid = scene.fabricator.create_grid("data/resources/configurations/game_objects/grid.json", 32, 32, 32, 32, function() {
                    self.m_grid.color = new gb.vec4(0.0, 1.0, 0.0, 1.0);
                    self.m_grid.position = new gb.vec2(0.0, -1.0);
                });
                scene.add_child(self.m_grid);

                var sprites_count = self.m_sprites.length;
                if (sprites_count !== 0) {
                    for (var i = 0; i < sprites_count; ++i) {
                        var sprite = self.m_sprites[i];
                        scene.add_child(sprite);
                    }
                }
                self.on_pack_sprites();
                var editor_fabricator = new gb.editor_fabricator();
                editor_fabricator.scene_fabricator = scene.fabricator;
                self.m_selector = editor_fabricator.create_selector();
            });
        },

        deactivate: function() {
            var sprites_count = this.m_sprites.length;
            if (sprites_count !== 0) {
                for (var i = 0; i < sprites_count; ++i) {
                    var sprite = this.m_sprites[i];
                    this.scene.remove_child(sprite);
                }
            }
            this.scene.remove_child(this.m_grid);
            var geometry_component = this.m_grid.get_component(gb.ces_base_component.type.geometry);
            geometry_component.mesh.release();
        },

        on_importing_images_size_changed: function(size) {
            this.m_importing_images_size = size;
        },

        on_move_resize_mode_changed: function(snap_to_grid) {
            self.m_selector.is_align_movement = snap_to_grid;
        },

        on_images_importing: function(images_files) {
            var self = this;
            var images_files_count_unprocessed = images_files.length;
            var images_files_count_processed = 0;
            for (var i = 0; i < images_files_count_unprocessed; ++i) {
                var image_file = images_files[i];
                if (!image_file.type.match('image.*')) {
                    continue;
                }
                var reader = new FileReader();
                reader.m_filename = image_file.name;

                reader.onload = (function(data) {
                    return function(data) {
                        var image = new Image();
                        image.src = data.target.result;
                        image.onload = function() {
                            var texture = self.scene.fabricator.resources_accessor.get_texture(data.target.m_filename, image);
                            texture.add_resource_loading_callback(function(resource, userdata) {
                                var sprite = self.scene.fabricator.create_sprite("data/resources/configurations/game_objects/sprite.json", function() {
                                    resource.mag_filter = gl.LINEAR;
                                    resource.min_filter = gl.LINEAR;
                                    resource.wrap_mode = gl.CLAMP_TO_EDGE;
                                    var material_component = sprite.get_component(gb.ces_base_component.type.material);
                                    material_component.set_texture(resource, 0);
                                    sprite.size = new gb.vec2(Math.round(resource.width * self.importing_images_size),
                                                              Math.round(resource.height * self.importing_images_size));
                                    self.on_sprite_added_to_page(sprite, 0.0);
                                    images_files_count_processed++;
                                    if (images_files_count_processed === images_files_count_unprocessed) {
                                        self.on_pack_sprites();
                                    }
                                });

                                var sprites_count = self.m_sprites.length;
                                var same_images_count = 0;
                                var analized_sprite = null;
                                for (var i = 0; i < sprites_count; ++i) {
                                    analized_sprite = self.m_sprites[i];
                                    if (analized_sprite.tag.indexOf(data.target.m_filename) !== -1) {
                                        same_images_count++;
                                    }
                                }

                                var unique_tag = data.target.m_filename;
                                if (same_images_count !== 0) {
                                    unique_tag += "(" + same_images_count + ")"
                                }
                                sprite.tag = unique_tag;
                                self.frames_view.add_frame(self, unique_tag, image, gb.ss_merge_controller.ui(), gb.ss_merge_controller.ui_j);
                                self.on_sprite_added_to_table(sprite);
                            });
                        };
                    };
                })(image_file);
                reader.readAsDataURL(image_file);
            }
        },

        on_sprite_pressed: function(entity, state, point, userdata) {
            userdata.set_selected_sprite(entity);
        },

        set_selected_sprite: function(sprite) {
            var ui = gb.ss_merge_controller.html_elements;
            var ui_j = gb.ss_merge_controller.ui_j;
            var sprite_index = this.m_sprites.indexOf(sprite);
            var sprites_count = this.m_sprites.length;
            for (var i = 0; i < sprites_count; ++i) {
                if (i === sprite_index) {
                    $(ui_j(ui.frames_table_scroll)).animate({
                        scrollTop: sprite_index * 170
                    }, 'slow', 'swing', function() {
                        $(ui_j(ui.frames_table) + ' li').eq(sprite_index).find('p').animate({
                            backgroundColor: "#f58400"
                        });
                    });
                } else {
                    $(ui_j(ui.frames_table) + ' li').eq(i).find('p').css({
                        'background': 'black'
                    });
                }
            }

            var target_touch_recognize_component = null;
            if (this.m_selector.target) {
                var target = this.m_selector.target;
                this.scene.add_child(target);
                target.position = this.m_selector.position;
                target.rotation = this.m_selector.rotation;
                target_touch_recognize_component = target.get_component(gb.ces_base_component.type.touch_recognize);
                target_touch_recognize_component.add_callback(gb.input_context.state.pressed, this.on_sprite_pressed, this);
                this.scene.add_box2d_body(target);
            }
            if (sprite) {
                this.scene.remove_box2d_body(sprite);
                this.m_selector.position = sprite.position;
                this.m_selector.rotation = sprite.rotation;
                this.m_selector.target = sprite;

                target_touch_recognize_component = sprite.get_component(gb.ces_base_component.type.touch_recognize);
                target_touch_recognize_component.remove_callback(gb.input_context.state.pressed, this.on_sprite_pressed);

                this.m_selector.bounding_quad.remove_from_parent();
                this.scene.add_child(this.m_selector.bounding_quad);
            } else {
                this.m_selector.target = null;
            }
        },

        on_sprites_reordering: function() {
            var ui = gb.ss_merge_controller.html_elements;
            var ui_j = gb.ss_merge_controller.ui_j;
            var tags = $(ui_j(ui.frames_table) + ' li').map(function() {
                return $(this).find('#ss-merge-frames-table-cell').text();
            });
            var sprites = [];
            var tags_count = tags.length;
            var sprite = null;
            for (var i = 0; i < tags_count; ++i) {
                sprite = this.m_sprites.find(function(analized_sprite) {
                    return analized_sprite.tag === tags[i];
                });
                sprites.push(sprite);
            }
            this.m_sprites = sprites;

            var sprites_count = this.m_sprites.length;
            $(ui_j(ui.frames_table)).height(sprites_count > 0 ? sprites_count == 1 ? 170 : 340 : 0);
            $(ui_j(ui.frames_sort_button)).button(sprites_count > 1 ? 'enable' : 'disable');
        },

        on_pack_sprites: function() {
            this.m_merge_algorithm.reset();
            this.m_sprites_on_pages = [];
            var sprites_count = this.m_sprites.length;
            var pages_count = 1;
            for (var i = 0; i < sprites_count; ++i) {
                var sprite = this.m_sprites[i];
                var packed_data = this.m_merge_algorithm.add_sprite(sprite);
                var position = packed_data.position;
                var page = packed_data.page;
                if(!this.m_sprites_on_pages[page]) {
                    this.m_sprites_on_pages[page] = [];
                }
                this.m_sprites_on_pages[page].push(sprite);
                position.x += sprite.size.x * sprite.pivot.x;
                position.y += sprite.size.y * sprite.pivot.y;
                sprite.position = position;
                sprite.visible = false;
                pages_count = Math.max(pages_count, page + 1);
            }

            var ui = gb.ss_merge_controller.html_elements;
            var ui_j = gb.ss_merge_controller.ui_j;

            $(ui_j(ui.editing_page_drop_down_box)).find('option').remove().end();
            for(var i = 0; i < pages_count; ++i) {
                $(ui_j(ui.editing_page_drop_down_box)).append($("<option></option>").attr("value", i).text('page ' + (i + 1))); 
            }
            this.on_page_changed(0, true);
        },

        on_sprite_added_to_table: function(sprite) {
            sprite.is_touchable = true;
            var touch_recognize_component = sprite.get_component(gb.ces_base_component.type.touch_recognize);
            touch_recognize_component.add_callback(gb.input_context.state.pressed, this.on_sprite_pressed, this);
            this.scene.add_child(sprite);
            this.m_sprites.push(sprite);

            aaa.callle(aaa);
        },

        on_sprite_removed_from_table: function(unique_tag) {
            var sprite_index = -1;
            var sprite = null;
            var sprites_count = this.m_sprites.length;
            for (var i = 0; i < sprites_count; ++i) {
                sprite = gb.ss_merge_controller.self().m_sprites[i];
                if (sprite.tag === unique_tag) {
                    sprite_index = i;
                    break;
                }
            }
            this.m_sprites.splice(sprite_index, 1);
            this.scene.remove_child(sprite);
            sprite.release();
        },

        on_sprite_added_to_page: function(entity, animated) {
            if (animated) {
                var action_component = entity.get_component(gb.ces_base_component.type.action);
                if (!action_component) {
                    entity.scale.x = 0.0;
                    entity.scale.y = 0.0;
                    entity.visible = true;
                    action_component = new gb.ces_action_component();
                    action_component.action = function(entity, deltatime) {
                        if (entity.scale.x < 1.0) {
                            entity.scale.x += 0.1;
                            entity.scale.y += 0.1;
                        } else {
                            entity.scale.x = 1.0;
                            entity.scale.y = 1.0;
                            action_component.action = null;
                            entity.remove_component(gb.ces_base_component.type.action);
                        }
                    };
                    entity.add_component(action_component);
                }
            } else {
                entity.scale.x = 1.0;
                entity.scale.y = 1.0;
                entity.visible = true;
            }
        },

        on_sprite_removed_from_page: function(entity, animated) {
            if (animated) {
                var action_component = entity.get_component(gb.ces_base_component.type.action);
                if (!action_component) {
                    entity.scale.x = 1.0;
                    entity.scale.y = 1.0;
                    action_component = new gb.ces_action_component();
                    action_component.action = function(entity, deltatime) {
                        if (entity.scale.x > 0.0) {
                            entity.scale.x -= 0.1;
                            entity.scale.y -= 0.1;
                        } else {
                            entity.scale.x = 0.0;
                            entity.scale.y = 0.0;
                            entity.visible = false;
                            action_component.action = null;
                            entity.remove_component(gb.ces_base_component.type.action);
                        }
                    };
                    entity.add_component(action_component);
                }
            } else {
                entity.scale.x = 0.0;
                entity.scale.y = 0.0;
                entity.visible = false;
            }
        },

        on_add_sprites_on_page: function(page, animated, callback) {
            if (page >= 0 && page < this.m_sprites_on_pages.length) {
                var sprites = this.m_sprites_on_pages[page];
                var sprites_count = sprites.length;
                var sprite = null;
                for (var i = 0; i < sprites_count; ++i) {
                    sprite = sprites[i];
                    this.on_sprite_added_to_page(sprite, animated);
                }
                if (callback) {
                    var update_sprites_status = function() {
                        var is_sprites_removed = true;
                        for (var i = 0; i < sprites_count; ++i) {
                            sprite = sprites[i];
                            var action_component = sprite.get_component(gb.ces_base_component.type.action);
                            if (action_component) {
                                is_sprites_removed = false;
                                break;
                            }
                        }
                        if (is_sprites_removed) {
                            setTimeout(callback, 100);
                        } else {
                            setTimeout(update_sprites_status, 100);
                        }
                    };
                    update_sprites_status();
                }
            } else if (callback) {
                callback();
            }
        },

        on_remove_sprites_from_page: function(page, animated, callback) {
            if (page >= 0 && page < this.m_sprites_on_pages.length) {
                var sprites = this.m_sprites_on_pages[page];
                var sprites_count = sprites.length;
                var sprite = null;
                for (var i = 0; i < sprites_count; ++i) {
                    sprite = sprites[i];
                    this.on_sprite_removed_from_page(sprite, animated);
                }
                if (callback) {
                    var update_sprites_status = function() {
                        var is_sprites_removed = true;
                        for (var i = 0; i < sprites_count; ++i) {
                            sprite = sprites[i];
                            var action_component = sprite.get_component(gb.ces_base_component.type.action);
                            if (action_component) {
                                is_sprites_removed = false;
                                break;
                            }
                        }
                        if (is_sprites_removed) {
                            setTimeout(callback, 100);
                        } else {
                            setTimeout(update_sprites_status, 100);
                        }
                    };
                    update_sprites_status();
                }
            } else if (callback) {
                callback();
            }
        },

        on_page_changed: function(index, animated, callback) {
            var self = gb.ss_merge_controller.self();
            this.on_remove_sprites_from_page(this.m_current_page, animated, function() {
                self.m_current_page = index;
                self.on_add_sprites_on_page(index, animated, callback);
            }); 
        },

        on_export_filename_changed: function(filename) {
            this.export_image_filename = filename;
            this.export_configuration_filename = filename;
        },

        on_export_images: function(callback) {
            var ui = gb.ss_merge_controller.html_elements;
            var ui_j = gb.ss_merge_controller.ui_j;
            this.set_selected_sprite(null);
            this.export_view.cleanup_frames(ui, ui_j);
            var pages_count = this.m_sprites_on_pages.length;
            var page = 0;
            var self = this;
            var images = [];
            var create_page_shapshot = function(page) {
                self.on_page_changed(page, true, function() {
                    var image = g_ss_merge_transition.get_ws_technique_result_as_image("ws.savetoimage", 0, self.m_page_size, self.m_page_size);
                    images.push(image);
                    self.export_view.add_frame(image, self.export_image_filename, page, ui, ui_j);
                    page++;
                    if(page < pages_count) {
                        create_page_shapshot(page);
                    } else {
                        self.on_page_changed(0, true);
                        if(callback) {
                            callback(images);
                        }
                    }
                });
            };
            create_page_shapshot(page);
        },

        on_export_configuration: function() {
            var frames = [];
            var sortered_sprites = this.m_sprites.sort(function(sprite_1, sprite_2) {
                return sprite_1.tag.localeCompare(sprite_2.tag, 'en', {
                    numeric: true
                });
            });
            var pages_count = this.m_sprites_on_pages.length;
            var sprites_count = sortered_sprites.length;
            var sprite = null;
            var position_0 = null;
            var position_1 = null;
            for (var i = 0; i < sprites_count; ++i) {
                sprite = sortered_sprites[i];
                var index = -1;
                for(var j = 0; j < pages_count; ++j) {
                    index = this.m_sprites_on_pages[j].findIndex(function(analized_sprite) {
                        return analized_sprite.tag === sprite.tag;
                    });
                    if(index !== -1) {
                        index = j;
                        break;
                    }
                }
                var position_in_atlas = new gb.vec2(sprite.position);
                position_in_atlas.x -= sprite.size.x * sprite.pivot.x;
                position_in_atlas.y -= sprite.size.y * sprite.pivot.y;
                position_0 = position_in_atlas;
                position_1 = gb.vec2.add(position_0, sprite.size);
                frames.push({
                    t_name: 'page_' + index + '.png',
                    d_name: sprite.tag,
                    u_0: position_0.x / this.m_page_size,
                    v_0: position_0.y / this.m_page_size,
                    u_1: position_1.x / this.m_page_size,
                    v_1: position_1.y / this.m_page_size
                });
            }
            var ui = gb.ss_merge_controller.html_elements;
            var ui_j = gb.ss_merge_controller.ui_j;
            this.export_view.add_frames_configuration(frames, this.export_configuration_filename, ui, ui_j);
            return frames;
        },

        on_preview_animation_open: function() {
            this.set_selected_sprite(null);
            var self = this;
            this.on_export_images(function(images) {
                var frames = self.on_export_configuration();
                self.deactivate();
                setTimeout(function() {
                    var ui = gb.ss_merge_controller.ui();
                    var ui_j = gb.ss_merge_controller.ui_j;
                    $(ui_j(ui.export_animation_preview_dialog)).dialog('open');
                    $('.ui-dialog :button').blur();
                    self.preview_animation_controller.activate(images, frames);
                }, 100);
            });
        },

        on_preview_animation_close: function() {
            this.preview_animation_controller.deactivate();
            this.activate();
        }
    },

    static_methods: {
        self: function() {
            return g_ss_merge_controller;
        },
        ui: function() {
            return gb.ss_merge_controller.html_elements;
        },
        ui_j: function(element_name) {
            return '#' + element_name;
        }
    }
});
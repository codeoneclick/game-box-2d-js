/* global oop, gb */
"use strict";

oop.define_class({
	namespace: "gb",
	name: "ss_merge_frames_view",
    constants: {
        image_preview_size: {
            width: 128,
            height: 128
        }
    },

	init: function(controller, ui, ui_j) {
		$(ui_j(ui.settings_container)).append(
            "<h3>" + 
                "<span class=\"ui-icon ui-icon-note\" style=\"float:left; margin:2px;\"></span>frames" +
            "</h3>" +
            "<div style=\"background:none; border:0px;\">" +
                "<button id=" + ui.frames_sort_button + " style=\"margin:2%; width:95%;\">sort by name</button>" +
                "<div id=" + ui.frames_table_scroll + " style=\"height:340px\" class=\"scroll\">" +
                    "<ul style=\"list-style-type:none; margin-left:-12.5%;\" id=\"" + ui.frames_table + "\"></ul>" +
                "</div>" +
            "</div>"
        );
        $('.scroll').scrollable({'autoHide': false,
                                 'transferScrolling': false,
                                 'mouseWheelMaxDelta': 0.1});
        $(ui_j(ui.frames_table)).height(0);
        $(ui_j(ui.frames_table)).sortable();
        $(ui_j(ui.frames_table)).disableSelection();
        $(ui_j(ui.frames_table)).sortable({
            stop: function() {
                controller.on_sprites_reordering();
            }
        });
        $(ui_j(ui.frames_sort_button)).button();
        $(ui_j(ui.frames_sort_button)).button('disable');
	},

	release: function() {

	},

	methods: {

        add_frame: function(controller, unique_tag, image, ui, ui_j) {
            var self = this;
            var ratio = image.width / image.height;
            var image_preview_width = gb.ss_merge_frames_view.image_preview_size.width;
            var image_preview_height = gb.ss_merge_frames_view.image_preview_size.height;
            if(image.width > image.height) {
                image_preview_height /= ratio;
            } else if(image.width < image.height) {
                image_preview_width /= ratio;
            }
            $(ui_j(ui.frames_table)).append(
                "<li class=\"ui-state-default\" id=" + unique_tag + " style=\"height: 160px; margin: 8px; background: none;\">" +
                    "<p align=\"center\" style=\"font-size:14px; float:left; margin:2px; margin-left:-0.25%; margin-top:-0.25%; height:24px; width:100%; border-color: #666;\" id=" + ui.frames_table_cell + " class=\"ui-widget-header\" style=\"margin:4px;\">" +
                        "<span class=\"ui-icon ui-icon-circle-arrow-e\" style=\"float:left; margin:4px;\"/>" +
                        "<span id=" + ui.frames_table_cell_delete_icon + " class=\"ui-icon ui-icon-trash\" style=\"float:right; margin:4px;\"/>" + unique_tag + 
                    "</p>" +
                    "<img style=\"float:left; margin:2px; height:" + image_preview_height + "px; width:" + image_preview_width + "px;\" id=" + ui.frames_table_cell_image + " align=\"left\" src=\"" + image.src + "\"/>" +
                "</li>"
            );
            var cells = $(ui_j(ui.frames_table)).children();
            var cell = cells[cells.length - 1];
            $($(cell).find("#" + ui.frames_table_cell_delete_icon)).click(function() {
                var unique_tag = $(this).parent().find("#" + ui.frames_table_cell).text();
                $(this).parent().parent().remove();
                controller.on_sprite_removed_from_table(unique_tag);
                self.on_frames_count_changed(ui, ui_j);
            });
            this.on_frames_count_changed(ui, ui_j);
        },

        on_frames_count_changed: function(ui, ui_j) {
            var cells = $(ui_j(ui.frames_table)).children();
            var cells_count = cells.length;
            $(ui_j(ui.frames_table)).height(cells_count * 170);
            $(ui_j(ui.frames_sort_button)).button(cells_count > 1 ? 'enable' : 'disable');
        }
	},

	static_methods: {
	}
});
/* global oop, gb */
"use strict";

oop.define_class({
	namespace: "gb",
	name: "ss_merge_export_view",
	extend: gb.game_object,

	init: function(controller, ui, ui_j) {
        $(ui_j(ui.tab_left_panel)).append(
            "<h3>" +
                "<span class=\"ui-icon ui-icon-note\" style=\"float:left; margin:2px;\"></span>export" +
            "</h3>" +
            "<div style=\"background:none; border:0px;\" id=" + ui.export_container + ">" +
                "<button title=\"preview animation\" id=" + ui.export_animation_preview_button + " style=\"margin:2%; width:95.5%;\">preview animation</button>" +
                "<br>" +
                "<button id=" + ui.export_save_atlas_button + " style=\"margin:2%; width:95.5%;\">create images</button>" +
                "<br>" +
                "<ul style=\"list-style-type:none; height:340px; overflow:auto; margin-left:-10%; margin-top:-0.5%;\" id=\"" + ui.export_save_pages_table + "\"/>" +
                "<button id=" + ui.export_save_frames_button + " style=\"margin:2%; margin-top:-2%; width:95.5%;\">create frames configuration</button>" +
            "</div>"
        );

        $(ui_j(ui.tab_right_panel)).append(
            "<div id=" + ui.export_animation_preview_dialog + " class=\"ui-dialog\" title=\"Animation\"></div>"
        );

        $(ui_j(ui.export_save_atlas_button)).button();
        $(ui_j(ui.export_save_atlas_button)).on('click', function() {
            controller.on_export_images();
        });
        $(ui_j(ui.export_save_pages_table)).height(0);
        $(ui_j(ui.export_save_pages_table)).sortable();
        $(ui_j(ui.export_save_pages_table)).disableSelection();
        $(ui_j(ui.export_save_frames_button)).button();

        $(ui_j(ui.export_animation_preview_button)).button();
        $(ui_j(ui.export_animation_preview_button)).on('click', function() {
            controller.on_preview_animation_open();
        });

        var self = this;
        $(ui_j(ui.export_animation_preview_dialog)).dialog({
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
            beforeClose: function() {
                controller.on_preview_animation_close();
            },
        });
	},

	release: function() {

	},

	methods: {

        add_frame: function(image, index, ui, ui_j) {
            $(ui_j(ui.export_save_pages_table)).append(
                "<li class=\"ui-state-default\" style=\"height:160px; margin:8px; background: none;\">" + 
                    "<p align=\"center\" style=\"font-size:14px; float:left; margin:4px; margin-left:-0.25%; margin-top:-0.25%; height:24px; width:100%; border-color: #666;\" class=\"ui-widget-header\">page_" + (index + 1) + ".png</p>" +
                    "<img style=\"float:left; margin:2px; height:128px; width:128px;\" align=\"left\" src=\"" + image.src + "\"/>" +
                    "<a style=\"margin-top:12%; margin-left:8%;\" id=\"" + ui.export_save_pages_table_cell_download_button + index + "\" href=\"" + image.src.replace('image/png', 'image/octet-stream') + "\"  download=\"page_" + (index + 1) + ".png\">download</a>" +
                "</li>"
            );
            $('#' + ui.export_save_pages_table_cell_download_button + index).button();
            $(ui_j(ui.export_save_pages_table)).height(170 * Math.min(index + 1, 2));
        }
	},

	static_methods: {

	}
});
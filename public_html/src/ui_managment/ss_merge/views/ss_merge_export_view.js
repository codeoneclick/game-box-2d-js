/* global oop, gb */
"use strict";

oop.define_class({
	namespace: "gb",
	name: "ss_merge_export_view",

	init: function(controller, ui, ui_j) {
        $(ui_j(ui.tab_left_panel)).append(
            "<h3>" +
                "<span class=\"ui-icon ui-icon-note\" style=\"float:left; margin:2px;\"></span>export" +
            "</h3>" +
            "<div style=\"background:none; border:0px;\" id=" + ui.export_container + ">" +
                "<input class=\"ui-widget ui-front ui-widget-content ui-corner-all\" style=\"margin:2%; width:94%;\" placeholder=\" enter filename...\" id=" + ui.export_filename_input + " type=\"text\">" +
                "<button title=\"preview animation\" id=" + ui.export_animation_preview_button + " style=\"margin:2%; width:95.5%;\">preview animation</button>" +
                "<br>" +
                "<button id=" + ui.export_save_images_button + " style=\"margin:2%; width:95.5%;\">generate images</button>" +
                "<br>" +
                "<div id=" + ui.export_save_pages_table_scroll + " style=\"height:340px\" class=\"scroll\">" +
                    "<ul style=\"list-style-type:none; margin-left:-10%; margin-top:-0.5%;\" id=\"" + ui.export_save_pages_table + "\"/>" +
                "</div>" +
                "<button id=" + ui.export_save_frames_button + " style=\"margin:2%; margin-top:-2%; width:95.5%;\">generate frames configuration</button>" +
            "</div>"
        );

        $(ui_j(ui.tab_right_panel)).append(
            "<div id=" + ui.export_animation_preview_dialog + " class=\"ui-dialog\" title=\"Animation\"></div>"
        );

        $(ui_j(ui.export_filename_input)).change(function(event) {
            $(ui_j(ui.export_save_images_button)).button(event.target.value.length != 0 ? 'enable' : 'disable');
            $(ui_j(ui.export_save_frames_button)).button(event.target.value.length != 0 ? 'enable' : 'disable');
            $(ui_j(ui.export_animation_preview_button)).button(event.target.value.length != 0 ? 'enable' : 'disable');
            if(event.target.value.length != 0) {
                controller.on_export_filename_changed(event.target.value);
            }
        });

        $(ui_j(ui.export_save_images_button)).button();
        $(ui_j(ui.export_save_images_button)).on('click', function() {
            controller.on_export_images();
        });
        $(ui_j(ui.export_save_images_button)).button('disable');

        $(ui_j(ui.export_save_pages_table_scroll)).height(0);
        $(ui_j(ui.export_save_pages_table)).sortable();
        $(ui_j(ui.export_save_pages_table)).disableSelection();
        
        $(ui_j(ui.export_save_frames_button)).button();
        $(ui_j(ui.export_save_frames_button)).on('click', function() {
            controller.on_export_configuration();
        });
        $(ui_j(ui.export_save_frames_button)).button('disable');

        $(ui_j(ui.export_animation_preview_button)).button();
        $(ui_j(ui.export_animation_preview_button)).on('click', function() {
            controller.on_preview_animation_open();
        });
        $(ui_j(ui.export_animation_preview_button)).button('disable');

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

        add_frame: function(image, filename, index, ui, ui_j) {
            $(ui_j(ui.export_save_pages_table)).append(
                "<li class=\"ui-state-default\" style=\"height:160px; margin:8px; background: none;\">" + 
                    "<p align=\"center\" style=\"font-size:14px; float:left; margin:4px; margin-left:-0.25%; margin-top:-0.25%; height:24px; width:100%; border-color: #666;\" class=\"ui-widget-header\">" + filename + (index + 1) + ".png</p>" +
                    "<img style=\"float:left; margin:2px; height:128px; width:128px;\" align=\"left\" src=\"" + image.src + "\"/>" +
                    "<a style=\"margin-top:12%; margin-left:8%;\" id=\"" + ui.export_save_pages_table_cell_download_button + index + "\" href=\"" + image.src.replace('image/png', 'image/octet-stream') + "\"  download=\"" + filename + (index + 1) + ".png\">download</a>" +
                "</li>"
            );
            $('#' + ui.export_save_pages_table_cell_download_button + index).button();
            $(ui_j(ui.export_save_pages_table_scroll)).height(170 * Math.min(index + 1, 2));
        },

        add_frames_configuration: function(configuration, filename, ui, ui_j) {
            $(ui_j(ui.export_save_frames_textfield)).remove();
            $(ui_j(ui.export_save_frames_download_button)).remove();
            var configuration_json = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(configuration));
            $(ui_j(ui.export_container)).append(
                "<div id=" + ui.export_save_frames_textfield + " class=\"ui-widget ui-front ui-widget-content ui-corner-all\" style=\"margin:2%; font-size: 1vw; height: 150px; overflow: hidden; background: gray;\">" +
                    JSON.stringify(configuration) +
                "</div>" +
                "<a style=\"margin-top:2%; margin-left:2%; width:95.5%;\" id=" + ui.export_save_frames_download_button + " href=\"data:" + configuration_json + "\" download=\"" + filename + ".json\">download frames configuration</a>"
            );
            $(ui_j(ui.export_save_frames_download_button)).button();
        },

        cleanup_frames: function(ui, ui_j) {
            var cells = $(ui_j(ui.export_save_pages_table)).children();
            var cells_count = cells.length;
            for(var i = 0; i < cells_count; ++i) {
                cells[i].remove();
            }
        }
	},

	static_methods: {

	}
});
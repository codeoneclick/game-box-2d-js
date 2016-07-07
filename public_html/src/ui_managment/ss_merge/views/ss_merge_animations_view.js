/* global oop, gb */
"use strict";

oop.define_class({
	namespace: "gb",
	name: "ss_merge_animations_view",

	init: function(controller, ui, ui_j) {
        var self = this;
		$(ui_j(ui.tab_left_panel)).append(
            "<h3>" +
                "<span class=\"ui-icon ui-icon-note\" style=\"float:left; margin:2px;\"></span>animations" + 
            "</h3>" +
            "<div style=\"background:none; border:0px;\" id=" + ui.animations_container + ">" + 
                "<div style=\"width:95%; margin:2%; margin-top:5%\">" +
                    "<select id=" + ui.animations_current_animation_drop_down_box + ">" +
                        "<option selected=\"selected\">all frames</option>" +
                    "</select>" +
                "</div>" +
                "<button id=" + ui.animations_add_animation_button + " style=\"margin:2%; width:95.5%;\">add animation</button>" +
                "<div id=" + ui.animations_table_scroll + " style=\"height:20px\" class=\"scroll\">" +
                    "<ul style=\"list-style-type:none; margin-left:-12.5%;\" id=\"" + ui.animations_table + "\"></ul>" +
                "</div>" +
            "</div>"
        );
        $(ui_j(ui.animations_current_animation_drop_down_box)).selectmenu();
        $(ui_j(ui.animations_current_animation_drop_down_box_button)).css({
            'width': '100%'
        });
        $(ui_j(ui.animations_current_animation_drop_down_box)).on("selectmenuselect", function(event, ui) { 

        });
        $(ui_j(ui.animations_add_animation_button)).button();
        $(ui_j(ui.animations_add_animation_button)).on('click', function() {
           self.add_animation(controller, ui, ui_j);
        });

        $('.scroll').scrollable({'autoHide': false,
                                 'transferScrolling': false,
                                 'mouseWheelMaxDelta': 0.1});
        $(ui_j(ui.animations_table)).height(0);
        $(ui_j(ui.animations_table)).sortable();
        $(ui_j(ui.animations_table)).disableSelection();
	},

	release: function() {

	},

	methods: {

        add_animation: function(controller, ui, ui_j) {
            var self = this;
            $(ui_j(ui.animations_table)).append(
                "<li class=\"ui-state-default\" style=\"height: 200px; margin: 8px; background: none;\">" +
                    "<p align=\"center\" style=\"font-size:14px; float:left; margin:2px; margin-left:-0.25%; margin-top:-0.25%; height:24px; width:100%; border-color: #666;\" id=" + ui.animations_table_cell + " class=\"ui-widget-header\" style=\"margin:4px;\">" +
                        "<span class=\"ui-icon ui-icon-circle-arrow-e\" style=\"float:left; margin:4px;\"/>" +
                        "<span id=" + ui.animations_table_cell_delete_icon + " class=\"ui-icon ui-icon-trash\" style=\"float:right; margin:4px;\"/>" + 
                    "</p>" +
                    "<p>" +
                        "<input class=\"ui-widget ui-front ui-widget-content ui-corner-all\" style=\"margin:2%; width:94%;\" placeholder=\" animation name...\" id=" + ui.animations_table_cell_animation_name_textfield + " type=\"text\">" +
                        "<label style=\"margin-left: 3%;\" for=\"" + ui.animations_table_cell_frames_label + "\">frames: </label>" +
                        "<input type=\"text\" id=" + ui.animations_table_cell_frames_label + " readonly style=\"background: black; margin-top: 3%; border: 0; color: #f6931f; font-weight: bold;\">" +
                    "</p>" +
                    "<div style=\"width: 88%; margin-left: 5.25%;\" id=" + ui.animations_table_cell_frames_slider + "></div>" +
                    "<a style=\"margin-top:6%; margin-left:2%; width:95.5%;\" id=" + ui.animations_table_cell_apply_button + ">apply</a>" +
                "</li>"
            );

            var cells = $(ui_j(ui.animations_table)).children();
            var cell = cells[cells.length - 1];

            $(cell).find(ui_j(ui.animations_table_cell_animation_name_textfield)).change(function(event) {
                $(this).parent().parent().find(ui_j(ui.animations_table_cell_apply_button)).button(event.target.value.length != 0 ? 'enable' : 'disable');
            });

            $(cell).find(ui_j(ui.animations_table_cell_frames_slider)).slider({
                range: true,
                min: 0,
                max: 100,
                values: [0, 100],
                slide: function(event, element) {
                    $(this).parent().find(ui_j(ui.animations_table_cell_frames_label)).val(element.values[0] + " - " + element.values[1]);
                }
            });
            $(cell).find(ui_j(ui.animations_table_cell_frames_label)).val("0 - 100");

            $(cell).find(ui_j(ui.animations_table_cell_apply_button)).button();
            $(cell).find(ui_j(ui.animations_table_cell_apply_button)).button('disable');

            $(cell).find(ui_j(ui.animations_table_cell_delete_icon)).click(function() {
                $(this).parent().parent().remove();
                self.on_animations_count_changed(ui, ui_j);
            });

            this.on_animations_count_changed(ui, ui_j);
        },

        on_animations_count_changed: function(ui, ui_j) {
            var cells = $(ui_j(ui.animations_table)).children();
            var cells_count = cells.length;
            $(ui_j(ui.animations_table)).height(cells_count * 210);
        }
	},

	static_methods: {

	}
});
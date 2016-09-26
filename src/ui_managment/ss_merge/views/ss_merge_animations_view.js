/* global oop, gb */
"use strict";

oop.define_class({
	namespace: "gb",
	name: "ss_merge_animations_view",

	init: function(controller, ui, ui_j) {
        var self = this;
		$(ui_j(ui.settings_container)).append(
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
                "<div id=" + ui.animations_table_scroll + " style=\"height:0px\" class=\"scroll\">" +
                    "<ul style=\"list-style-type:none; margin-left:-12.5%;\" id=\"" + ui.animations_table + "\"></ul>" +
                "</div>" +
            "</div>"
        );
        $(ui_j(ui.animations_current_animation_drop_down_box)).selectmenu();
        $(ui_j(ui.animations_current_animation_drop_down_box_button)).css({'width': '100%'});
        $(ui_j(ui.animations_current_animation_drop_down_box)).on("selectmenuselect", function(event, ui) { 
            controller.on_current_animation_changed(ui.item.value);
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

        this.m_animations_names_cache = [];

        Object.defineProperty(this, 'animations_names_cache', {
            get: function() {
                return this.m_animations_names_cache;
            }
        });
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
                var current_animation_name = event.target.value;
                var animations = controller.animations;
                var is_animation_with_same_name_exist = false;
                for(animation_name in animations) {
                    if(animation_name === current_animation_name) {
                        is_animation_with_same_name_exist = true;
                        break;
                    }
                }
                if(current_animation_name.length != 0 && !is_animation_with_same_name_exist)
                {
                    $(this).parent().parent().find(ui_j(ui.animations_table_cell_apply_button)).button('enable');
                }
                else
                {
                    $(this).parent().parent().find(ui_j(ui.animations_table_cell_apply_button)).button('disable');
                    controller.on_show_alert_view('Animation with same name already exist!');
                }
            });

            $(cell).find(ui_j(ui.animations_table_cell_frames_slider)).slider({
                range: true,
                min: 0,
                max: controller.frames_count,
                values: [0, controller.frames_count],
                slide: function(event, element) {
                    $(this).parent().find(ui_j(ui.animations_table_cell_frames_label)).val(element.values[0] + " - " + element.values[1]);
                }
            });
            $(cell).find(ui_j(ui.animations_table_cell_frames_label)).val("0 - " + controller.frames_count);

            $(cell).find(ui_j(ui.animations_table_cell_apply_button)).button();
            $(cell).find(ui_j(ui.animations_table_cell_apply_button)).button('disable');
            $(cell).find(ui_j(ui.animations_table_cell_apply_button)).on('click', function() {
                var cell = $(this).parent();
                var current_animation_name = $(cell).find(ui_j(ui.animations_table_cell_animation_name_textfield)).val();
                var cached_animation_name = self.animations_names_cache[$(cell).find(ui_j(ui.animations_table_cell_animation_name_textfield))];
                var frames_indices = $(cell).find(ui_j(ui.animations_table_cell_frames_slider)).slider('option', 'values');
                var animations = controller.animations;
                controller.on_apply_animation(cached_animation_name, current_animation_name, frames_indices);
                self.on_apply_animation(controller, ui, ui_j);
                self.animations_names_cache[$(cell).find(ui_j(ui.animations_table_cell_animation_name_textfield))] = current_animation_name;
            });

            $(cell).find(ui_j(ui.animations_table_cell_delete_icon)).click(function() {
                var cell = $(this).parent().parent();
                var animation_name = $(cell).find(ui_j(ui.animations_table_cell_animation_name_textfield)).val();
                cell.remove();
                var options = $(ui_j(ui.animations_current_animation_drop_down_box)).children();
                var options_count = options.length;
                var option = null;
                for(var i = 0; i < options_count; ++i) {
                    option = options[i];
                    if ($(option).text() === animation_name) {
                        $(option).remove();
                    }
                }
                $(ui_j(ui.animations_current_animation_drop_down_box)).selectmenu('refresh');
                $(ui_j(ui.animations_current_animation_drop_down_box_button)).css({'width': '100%'});
                self.on_animations_count_changed(ui, ui_j);
            });
            this.on_animations_count_changed(ui, ui_j);
        },

        on_apply_animation: function(controller, ui, ui_j) {
            $(ui_j(ui.animations_current_animation_drop_down_box)).find('option').remove().end();
            $(ui_j(ui.animations_current_animation_drop_down_box)).append($("<option></option>").text("all frames")); 
            var animations = controller.animations;
            for(animation_name in animations) {
                $(ui_j(ui.animations_current_animation_drop_down_box)).append($("<option></option>").text(animation_name)); 
            }
            $(ui_j(ui.animations_current_animation_drop_down_box)).selectmenu('refresh');
            $(ui_j(ui.animations_current_animation_drop_down_box_button)).css({'width': '100%'});
        },

        on_animations_count_changed: function(ui, ui_j) {
            var cells = $(ui_j(ui.animations_table)).children();
            var cells_count = cells.length;
            var height = cells_count * 210;
            $(ui_j(ui.animations_table)).height(height);
            $(ui_j(ui.animations_table_scroll)).css({
                'height': Math.min(430, height + cells_count * 10)
            });
        },

        on_frames_count_changed: function(controller, ui, ui_j) {
            var cells = $(ui_j(ui.animations_table)).children();
            var cells_count = cells.length;
            var cell = null;
            for(var i = 0; i < cells_count; ++i) {
                cell = cells[i];
                $(cell).find(ui_j(ui.animations_table_cell_frames_label)).val("0 - " + controller.frames_count);
                $(cell).find(ui_j(ui.animations_table_cell_frames_slider)).slider({
                    min: 0,
                    max: controller.frames_count,
                });
            }
        }
	},

	static_methods: {

	}
});
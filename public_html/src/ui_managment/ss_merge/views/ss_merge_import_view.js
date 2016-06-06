/* global oop, gb */
"use strict";

oop.define_class({
	namespace: "gb",
	name: "ss_merge_import_view",
	extend: gb.game_object,

	init: function(controller, ui, ui_j) {
		$(ui_j(ui.tab_left_panel)).append(
            "<h3>" +
                "<span class=\"ui-icon ui-icon-note\" style=\"float:left; margin:2px;\"></span>import" +
            "</h3>" + 
            "<div style=\"background:none; border:0px;\">" +
                "<div title=\"changed size of imported images\" style=\"width:95%; margin:2%;\">" +
                    "<select id=" + ui.import_size_drop_down_box + ">" +
                        "<option>image scale - 10%</option>" +
                        "<option>image scale - 20%</option>" +
                        "<option>image scale - 30%</option>" +
                        "<option>image scale - 40%</option>" +
                        "<option>image scale - 50%</option>" +
                        "<option>image scale - 60%</option>" +
                        "<option>image scale - 70%</option>" +
                        "<option>image scale - 80%</option>" +
                        "<option>image scale - 90%</option>" +
                        "<option selected=\"selected\">image scale - 100%</option>" +
                    "</select>" +
                "</div>" +
                "<div id=" + ui.import_drop_zone + ">" + 
                    "<input type=\"file\" id=" + ui.import_add_image_input + " style=\"display:none;\" multiple>" +
                    "<a style=\"width:99%;\" href=\"#\" id=" + ui.import_add_image_button + ">add images...</a>" +
                    "<label style=\"float:right; margin-top:8%; margin-right:33.5%\">or drop here...</label>" +
                "</div>" +
            "</div>"
        );
        $(ui_j(ui.import_add_image_button)).button();
        $(ui_j(ui.import_add_image_button)).on('click', function() {
            $(ui_j(ui.import_add_image_input)).trigger('click');
        });
        document.getElementById(ui.import_add_image_input).addEventListener('change', function() {
            controller.on_images_importing(this.files);
        }, false);
        document.getElementById(ui.import_drop_zone).addEventListener('dragover', function(event) {
            event.stopPropagation();
            event.preventDefault();
            event.dataTransfer.dropEffect = 'copy';
        }, false);
        document.getElementById(ui.import_drop_zone).addEventListener('drop', function(event) {
            event.stopPropagation();
            event.preventDefault();
            controller.on_images_importing(event.dataTransfer.files);
        }, false);
        $(ui_j(ui.import_size_drop_down_box)).selectmenu();
        $(ui_j(ui.import_size_drop_down_box_button)).css({
            'width': '100%'
        });
        $(ui_j(ui.import_size_drop_down_box)).on('selectmenuselect', function(event, ui) {
            controller.on_importing_images_size_changed((ui.item.index + 1) / 10.0);
        });
	},

	release: function() {

	},

	methods: {
	},

	static_methods: {

	}
});
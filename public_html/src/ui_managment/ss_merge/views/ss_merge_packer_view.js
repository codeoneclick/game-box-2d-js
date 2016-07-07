/* global oop, gb */
"use strict";

oop.define_class({
	namespace: "gb",
	name: "ss_merge_packer_view",

	init: function(controller, ui, ui_j) {
		$(ui_j(ui.tab_left_panel)).append(
            "<h3>" +
                "<span class=\"ui-icon ui-icon-note\" style=\"float:left; margin:2px;\"></span>packer" + 
            "</h3>" +
            "<div style=\"background:none; border:0px;\" id=" + ui.editing_container + ">" + 
                "<div style=\"width:95%; margin:2%; margin-top:5%\">" +
                    "<select id=" + ui.editing_page_drop_down_box + ">" +
                        "<option selected=\"selected\">page 1</option>" +
                    "</select>" +
                "</div>" +
                "<div style=\"margin:2%;\" id=" + ui.editing_move_resize_radio_button + ">" + 
                    "<input type=\"radio\" id=" + ui.editing_move_resize_freeform_button + " name=\"" + ui.editing_move_resize_radio_button + "\" checked=\"checked\">" +
                    "<label for=" + ui.editing_move_resize_freeform_button + " style=\"width:48%;\">free form</label>" +
                    "<input type=\"radio\" id=" + ui.editing_move_resize_snaptogrid_button + " name=\"" + ui.editing_move_resize_radio_button + "\">" +
                    "<label for=" + ui.editing_move_resize_snaptogrid_button + " style=\"width:52%;\">snap to grid</label>" +
                "</div>" +
                "<div title=\"packing algorithm\" style=\"width:95%; margin:2%; margin-top:5%\">" +
                    "<select id=" + ui.editing_pack_algorithm_drop_down_box + ">" +
                        "<option selected=\"selected\">heuristic - none</option>" +
                        "<option>heuristic - TL (top left fit)</option>" +
                        "<option>heuristic - BAF (best area fit)</option>" + 
                        "<option>heuristic - BSSF (best short side fit)</option>" +
                        "<option>heuristic - BLSF (best long side fit)</option>" +
                        "<option>heuristic - MINW (min width fit)</option>" +
                        "<option>heuristic - MINH (min height fit)</option>" +
                    "</select>" +
                "</div>" +
                "<button id=" + ui.editing_spread_button + " style=\"margin:2%; width:95.5%;\">spread</button>" +
            "</div>"
        );
        $(ui_j(ui.editing_pack_algorithm_drop_down_box)).selectmenu();
        $(ui_j(ui.editing_pack_algorithm_drop_down_box_button)).css({
            'width': '100%'
        });
        $(ui_j(ui.editing_spread_button)).button();
        $(ui_j(ui.editing_spread_button)).on('click', function() {
            controller.on_pack_sprites();
        });;
        $(ui_j(ui.editing_page_drop_down_box)).selectmenu();
        $(ui_j(ui.editing_page_drop_down_box_button)).css({
            'width': '100%'
        });
        $(ui_j(ui.editing_page_drop_down_box)).on("selectmenuselect", function(event, ui) { 
            controller.on_page_changed(ui.item.index, true);
        });

        $(ui_j(ui.editing_move_resize_radio_button)).buttonset();
        $(ui_j(ui.editing_move_resize_radio_button) + ' input[type=radio]').change(function() {
            controller.on_move_resize_mode_changed(this.id === ui.editing_move_resize_snaptogrid_button);
        });
	},

	release: function() {

	},

	methods: {
	},

	static_methods: {

	}
});
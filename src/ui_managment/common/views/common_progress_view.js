/* global oop, gb */
"use strict";

oop.define_class({
	namespace: "gb",
	name: "common_progress_view",

	init: function(container, ui, ui_j) {
		$(ui_j(container)).append(
            "<div id=" + ui.common_progress_view + " class=\"ui-state-error\" style=\"background:darkorange;\">" +
                "<div id=" + ui.common_progress_view_bar + " style=\"height: 30px;\"></div>" +
                "<p>" +
                    "<span class=\"ui-icon ui-icon-clock\" style=\"float: left; margin-right: .3em;\"></span>" +
                    "<div id=" + ui.common_progress_view_textfield + "></div>" +
                "</p>" +
            "</div>"
        );

        $(ui_j(ui.common_progress_view_bar)).progressbar({
            value: false
        });

        $(ui_j(ui.common_progress_view)).dialog({
            autoOpen: false,
            width: 520,
            height: 120,
            modal: false,
            show: {
                effect: "bounce",
                duration: 1000
            },
            hide: {
                effect: "clip",
                duration: 250
            }
        });
        $(ui_j(ui.common_progress_view)).siblings('div.ui-dialog-titlebar').remove();
	},

	release: function() {

	},

	methods: {

        show: function(ui, ui_j) {
            
            $(ui_j(ui.common_progress_view)).dialog('open');
        },

        hide: function(ui, ui_j) {
            $(ui_j(ui.common_progress_view_bar)).progressbar('value', false);
            $(ui_j(ui.common_progress_view)).dialog('close');
        },

        update_progress: function(message, value, ui, ui_j) {
            $(ui_j(ui.common_progress_view_textfield)).html(message);
            $(ui_j(ui.common_progress_view_bar)).progressbar('value', value);
        }
	},

	static_methods: {

	}
});
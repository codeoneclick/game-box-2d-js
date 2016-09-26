/* global oop, gb */
"use strict";

oop.define_class({
	namespace: "gb",
	name: "common_error_view",

	init: function(container, ui, ui_j) {
		$(ui_j(container)).append(
            "<div id=" + ui.common_error_view + " class=\"ui-state-error ui-corner-all\" style=\"padding: 0 .7em; background:darkorange;\">" +
                "<p>" +
                    "<span class=\"ui-icon ui-icon-alert\" style=\"float: left; margin-right: .3em;\"></span>" +
                    "<strong>Error: </strong>" +
                    "<div id=" + ui.common_error_view_textfield + " style=\"margin-top: -4%;\"></div>" +
                "</p>" +
            "</div>"
        );
        $(ui_j(ui.common_error_view)).dialog({
            autoOpen: false,
            width: 450,
            height: 450,
            modal: true,
            show: {
                effect: "bounce",
                duration: 1000
            },
            hide: {
                effect: "clip",
                duration: 250
            },
            buttons: [{
                text: "Report bug",
                click: function() {
                    location.reload();
                }
            }, {
                text: "Ok",
                click: function() {
                    location.reload();
                }
            }]
        });
        $(ui_j(ui.common_error_view)).parent().css({'background': 'black'});
        $(ui_j(ui.common_error_view)).siblings('div.ui-dialog-titlebar').remove();
	},

	release: function() {

	},

	methods: {

        show: function(message, ui, ui_j) {
            $(ui_j(ui.common_error_view_textfield)).html(message);
            $(ui_j(ui.common_error_view)).dialog('open');
        }
	},

	static_methods: {

	}
});
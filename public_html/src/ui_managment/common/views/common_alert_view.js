/* global oop, gb */
"use strict";

oop.define_class({
	namespace: "gb",
	name: "common_alert_view",

	init: function(container, ui, ui_j) {
		$(ui_j(container)).append(
            "<div id=" + ui.common_alert_view + " class=\"ui-state-error ui-corner-all\" style=\"padding: 0 .7em; background:darkorange;\">" +
                "<p>" +
                    "<span class=\"ui-icon ui-icon-alert\" style=\"float: left; margin-right: .3em;\"></span>" +
                    "<strong>Warning: </strong>" +
                    "<div id=" + ui.common_alert_view_textfield + " style=\"margin-top: -10.5%; margin-left: 30%;\"></div>" +
                "</p>" +
            "</div>"
        );
        $(ui_j(ui.common_alert_view)).dialog({
            autoOpen: false,
            width: 390,
            height: 140,
            modal: false,
            show: {
                effect: "bounce",
                duration: 1000
            },
            hide: {
                effect: "clip",
                duration: 250
            },
            open: function(event, element) {
                setTimeout(function() {
                    $(ui_j(ui.common_alert_view)).dialog('close');
                }, 2000);
            }
        });
        $(ui_j(ui.common_alert_view)).siblings('div.ui-dialog-titlebar').remove();
	},

	release: function() {

	},

	methods: {

        show: function(message, ui, ui_j) {
            $(ui_j(ui.common_alert_view_textfield)).html(message);
            $(ui_j(ui.common_alert_view)).dialog('open');
        }
	},

	static_methods: {

	}
});
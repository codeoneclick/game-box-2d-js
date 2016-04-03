/* global gb, console */

"use strict";

gb.game_controller = function() {
	this.m_current_transition = null;
	this.m_transitions = [];
	this.resource_accessor = new gb.resource_accessor();
	this.configuration_accessor = new gb.configuration_accessor();
};

gb.game_controller.prototype = {
	constructor: gb.game_controller,

	add_transition: function(transition) {
		var index = this.m_transitions.findIndex(function(analized_transition) {
			return analized_transition.guid === transition.guid;
		});
		if (index === -1) {
			this.m_transitions.push(transition);
		} else {
			console.warn("can't add same transition");
		}
	},

	remove_transition: function(transition) {
		var index = this.m_transitions.findIndex(function(analized_transition) {
			return analized_transition.guid === transition.guid;
		});
		if (index !== -1) {
			this.m_transitions.splice(index, 1);
		}
	},

	goto_transition: function(guid, callback) {
		var index = this.m_transitions.findIndex(function(analized_transition) {
			return analized_transition.guid === guid;
		});
		if (index !== -1) {
			if (this.m_current_transition) {
				this.m_current_transition.on_deactivated();
			}
			this.m_current_transition = this.m_transitions[index];
			this.m_current_transition.on_activated(this.configuration_accessor, this.resource_accessor, callback);
		}
	}
};
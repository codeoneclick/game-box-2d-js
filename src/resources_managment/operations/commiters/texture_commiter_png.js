/* global oop, gl, gb */

"use strict";

oop.define_class({
	namespace: "gb",
	name: "texture_commiter_png",
	extend: gb.resource_commiter,

	init: function() {

	},

	release: function() {

	},

	methods: {
		commit: function(data) {
			this.m_status = gb.resource_commiter.status.in_progress;

			var handler = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, handler);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, data.data);
			data.handler = handler;
			this.m_resource.on_transfering_data_commited(data);
			this.m_status = gb.resource_commiter.status.success;
		}
	},

	static_methods: {

	}
});
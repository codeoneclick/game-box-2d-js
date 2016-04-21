/* global oop, console, alert */

"use strict";

var gl = null;

oop.define_class({
    namespace: "gb",
    name: "graphics_context",

    init: function() {
        var canvas = document.getElementById("gl_canvas");
        console.log(canvas);
        var gl_context = null;
        try 
        {
            gl_context = canvas.getContext("webgl", {
                depth: false,
                antialias: true
            });
            gl_context.viewport_width = canvas.width;
            gl_context.viewport_height = canvas.height;
            console.log("OpenGL context created");
            console.log("viewport: [ " + gl_context.viewport_width + ", " + gl_context.viewport_height + " ]");
        }
        catch (exception) 
        {
            alert(exception);    
        }

        if (!gl_context) 
        {
            alert("could not initialise gl context");
        }

        gl = gl_context;
    },

    release: function() {

    },

    methods: {
        
    },
    
    static_methods: {

    }
});
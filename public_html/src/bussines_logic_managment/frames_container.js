/* global oop, gb */
"use strict";

oop.define_class({
    namespace: "gb",
    name: "frames_container",

    init: function() {
        this.reset();
    },

    release: function() {

    },

    methods: {

        get_frame_parameters: function(width, height) {
            var appropriate_chunk_index = this.m_chunks.findIndex(function(analized_chunk) {
                return analized_chunk.width >= width && analized_chunk.height >= height;
            });
            if(appropriate_chunk_index !== -1) {
                var appropriate_chunk = this.m_chunks[appropriate_chunk_index];
                var new_chunk = {x: appropriate_chunk.x, y: appropriate_chunk.y, width: width, height: height};
                var originated_chunks = [];
                originated_chunks.push({x: new_chunk.x + new_chunk.width, y: new_chunk.y, width: appropriate_chunk.width - new_chunk.width, height: new_chunk.height});
                originated_chunks.push({x: new_chunk.x, y: new_chunk.y + new_chunk.height, width: new_chunk.width, height: appropriate_chunk.height - new_chunk.height});
                originated_chunks.push({x: new_chunk.x + new_chunk.width, y: new_chunk.y + new_chunk.height, width: appropriate_chunk.width - new_chunk.width, height: appropriate_chunk.height - new_chunk.height});
                this.m_chunks.splice(appropriate_chunk_index, 1);
                this.m_chunks.push(originated_chunks[0]);
                this.m_chunks.push(originated_chunks[1]);
                this.m_chunks.push(originated_chunks[2]);
                return new_chunk;
            } else {
                console.log(this.m_chunks);
                return null;
            }
        },

        reset: function() {
            this.m_chunks = [];
            this.m_chunks.push({x: 0, y: 0, width: 1024, height: 1024});
        }
    },

    static_methods: {

    }
});
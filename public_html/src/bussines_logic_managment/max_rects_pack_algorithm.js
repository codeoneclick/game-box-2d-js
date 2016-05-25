/* global oop, gb */
"use strict";

oop.define_class({
    namespace: "gb",
    name: "max_rects_pack_algorithm",
    constants: {
        heuristic: {
            none: 0,
            TL: 1,
            BAF: 2,
            BSSF: 3,
            BLSF: 4,
            MINW: 5,
            MINH: 6
        }
    },

    init: function() {
        this.m_free_nodes = [];
        this.m_occupied_nodes = [];

        this.m_heuristic = 0;
        Object.defineProperty(this, 'heuristic', {
            get: function() {
                return this.m_heuristic;
            },
            set: function(value) {
                this.m_heuristic = value;
            }
        });

        this.m_atlas_width = 0;
        Object.defineProperty(this, 'atlas_width', {
            get: function() {
                return this.m_atlas_width;
            },
            set: function(value) {
                this.m_atlas_width = value;
            }
        });

        this.m_atlas_height = 0;
        Object.defineProperty(this, 'atlas_height', {
            get: function() {
                return this.m_atlas_height;
            },
            set: function(value) {
                this.m_atlas_height = value;
            }
        });

        this.m_is_rotation_enabled = false;
        Object.defineProperty(this, 'is_rotation_enabled', {
            get: function() {
                return this.m_is_rotation_enabled;
            },
            set: function(value) {
                this.m_is_rotation_enabled = value;
            }
        });
    },

    release: function() {

    },

    methods: {

        add_sprite: function(sprite) {

            var left_neighbor = false;
            var right_neighbor = false;
            var current_left_neighbor = false;
            var current_right_neighbor = false;

            var rotated = false;
            var best_is_rotated = false;

            var offset = 0;
            var min_offset = this.m_atlas_width * this.m_atlas_height + 1;
            var current_free_node_index = -1;
            var heuristic = gb.max_rects_pack_algorithm.heuristic;

            var free_nodes_count = this.m_free_nodes.length;
            for(var i = 0; i < free_nodes_count; ++i) {
                var free_node = this.m_free_nodes[i];
                if((free_node.z >= sprite.size.x && free_node.w >= sprite.size.y) ||
                   (free_node.z >= sprite.size.y && free_node.w >= sprite.size.x)) {

                    rotated = false;
                    offset = 0;
                    if(free_node.z >= sprite.size.y && free_node.w >= sprite.size.x &&
                       !(free_node.z >= sprite.size.x && free_node.w >= sprite.size.y)) {
                        if(!this.m_is_rotation_enabled) {
                            continue;
                        }
                        rotated = true;
                        offset += sprite.size.y;
                        console.error('implement sprite rotation');
                    }

                    switch (this.m_heuristic) {
                        case heuristic.none:
                            current_free_node_index = i;
                            i = free_nodes_count;
                            continue;
                        case heuristic.TL:
                            offset += free_node.y;
                            current_left_neighbor = false;
                            current_right_neighbor = false;
                            var occupied_nodes_count = this.m_occupied_nodes.length;
                            for (var j = 0; j < occupied_nodes_count; ++j) {
                                var occupied_node = this.m_occupied_nodes[j];
                                if (Math.abs(occupied_node.y + occupied_node.w / 2 - free_node.y - free_node.w / 2) < Math.max(occupied_node.w, free_node.w) / 2) {
                                    if (occupied_node.x + occupied_node.z === free_node.x) {
                                        offset -= 5;
                                        current_left_neighbor = true;
                                    }
                                    if (occupied_node.x === free_node.x + free_node.z) {
                                        offset -= 5;
                                        current_right_neighbor = true;
                                    }
                                }
                            }
                            if (current_left_neighbor || !current_right_neighbor) {
                                if (free_node.x + free_node.z === this.m_atlas_width) {
                                    offset -= 1;
                                    current_right_neighbor = true;
                                }
                                if (free_node.x === 0) {
                                    offset -= 1;
                                    current_left_neighbor = true;
                                }
                            }
                            break;
                        case heuristic.BAF:
                            offset += free_node.z * free_node.w;
                            break;
                        case heuristic.BSSF:
                            offset += Math.min(free_node.z - sprite.size.x, free_node.w - sprite.size.y);
                            break;
                        case heuristic.BLSF:
                            offset += Math.max(free_node.z - sprite.size.x, free_node.w - sprite.size.y);
                            break;
                        case heuristic.MINW:
                            offset += free_node.z;
                            break;
                        case heuristic.MINH:
                            offset += free_node.w;
                            break;
                    }

                    if (offset < min_offset) {
                        min_offset = offset;
                        current_free_node_index = i;
                        left_neighbor = current_left_neighbor;
                        right_neighbor = current_right_neighbor;
                        best_is_rotated = rotated;
                    }

                    if (rotated) {
                        console.error('implement sprite rotation');
                    }
                }
            }


            if(best_is_rotated) {
                console.error('implement sprite rotation');
            }
            if(current_free_node_index >= 0) {
                i = current_free_node_index;
                var free_node = this.m_free_nodes[current_free_node_index];
                var current_free_node = new gb.vec4(free_node.x, free_node.y, sprite.size.x, sprite.size.y);
                if(this.m_heuristic === heuristic.TL) {
                    if(!left_neighbor && free_node.x !== 0 && free_node.z + free_node.x === this.m_atlas_width) {
                        current_free_node.x = this.m_atlas_width - sprite.size.x;
                        current_free_node.y = free_node.y;
                        current_free_node.z = sprite.size.x;
                        current_free_node.w = sprite.size.y;
                    }
                    if(!left_neighbor && right_neighbor) {
                        current_free_node.x = free_node.x + free_node.z - sprite.size.x;
                        current_free_node.y = free_node.y;
                        current_free_node.z = sprite.size.x;
                        current_free_node.w = sprite.size.y;
                    }
                }
                this.m_occupied_nodes.push(new gb.vec4(current_free_node));
                if(free_node.z > sprite.size.x) {
                    var node = new gb.vec4();
                    node.x = free_node.x + (current_free_node.x === free_node.x ? sprite.size.x : 0);
                    node.y = free_node.y;
                    node.z = free_node.z - sprite.size.x;
                    node.w = free_node.w;
                    this.m_free_nodes.push(node);
                }
                if(free_node.w > sprite.size.y) {
                    var node = new gb.vec4();
                    node.x = free_node.x;
                    node.y = free_node.y + sprite.size.y;
                    node.z = free_node.z;
                    node.w = free_node.w - sprite.size.y;
                    this.m_free_nodes.push(node);
                }
                this.m_free_nodes.splice(i, 1);

                for (var i = 0; i < this.m_free_nodes.length; ++i) {
                    var free_node = this.m_free_nodes[i];
                    if (gb.math.rect_intersect(free_node, current_free_node)) {
                        if (current_free_node.x + current_free_node.z < free_node.x + free_node.z) {
                            var node = new gb.vec4();
                            node.x = current_free_node.x + current_free_node.z;
                            node.y = free_node.y;
                            node.z = free_node.x + free_node.z - current_free_node.x - current_free_node.z;
                            node.w = free_node.w;
                            this.m_free_nodes.push(node);
                        }
                        if (current_free_node.y + current_free_node.w < free_node.y + free_node.w) {
                            var node = new gb.vec4();
                            node.x = free_node.x;
                            node.y = current_free_node.y + current_free_node.w;
                            node.z = free_node.z;
                            node.w = free_node.y + free_node.w - current_free_node.y - current_free_node.w;
                            this.m_free_nodes.push(node);
                        }
                        if (current_free_node.x > free_node.x) {
                            var node = new gb.vec4();
                            node.x = free_node.x;
                            node.y = free_node.y;
                            node.z = current_free_node.x - free_node.x;
                            node.w = free_node.w;
                            this.m_free_nodes.push(node);
                        }
                        if (current_free_node.y > free_node.y) {
                            var node = new gb.vec4();
                            node.x = free_node.x;
                            node.y = free_node.y;
                            node.z = free_node.z;
                            node.w = current_free_node.y - free_node.y;
                            this.m_free_nodes.push(node);
                        }
                        this.m_free_nodes.splice(i, 1);
                        --i;
                    }
                }

                for(var i = 0; i < this.m_free_nodes.length; i++) {
                    for(var j = i + 1; j < this.m_free_nodes.length; j++) {
                        var free_node_i = this.m_free_nodes[i];
                        var free_node_j = this.m_free_nodes[i];
                        if(i != j && gb.math.rect_contains(free_node_i, free_node_j)) {
                            this.m_free_nodes.splice(j, 1);
                            --j;
                        }
                    }
                }
                return new gb.vec2(current_free_node.x, current_free_node.y);
            }
            console.error('can\'t calculate sprite position');
        },

        reset: function() {
            this.m_free_nodes = [];
            this.m_occupied_nodes = [];
            this.m_free_nodes.push(new gb.vec4(0, 0, this.m_atlas_width, this.m_atlas_height));
        }
    },
    static_methods: {

    }
});
/* global oop, gb */
"use strict";

var g_tag = 0;

oop.define_class({
    namespace: "gb",
    name: "ces_entity",

    init: function() {
        this.m_tag = "ces_entity" + g_tag++;

        this.m_components = [];
        for (var i = 0; i < gb.ces_base_component.type.max; ++i) {
            this.m_components[i] = null;
        }

        this.m_parent = null;
        this.m_children = [];

        this.m_visible = true;

        Object.defineProperty(this, 'tag', {
            set: function(value) {
                this.m_tag = value;
            },
            get: function() {
                return this.m_tag;
            }
        });

        Object.defineProperty(this, 'parent', {
            set: function(value) {
                this.m_parent = value;
            },
            get: function() {
                return this.m_parent;
            }
        });

        Object.defineProperty(this, 'children', {
            get: function() {
                return this.m_children;
            }
        });

        Object.defineProperty(this, 'visible', {
            set: function(value) {
                this.m_visible = value;
            },
            get: function() {
                return this.m_visible;
            }
        });

        Object.defineProperty(this, 'components', {
            get: function() {
                return this.m_components;
            }
        });
    },

    release: function() {

    },

    methods: {
        add_component: function(component) {
            this.m_components[component.type] = component;
        },

        remove_component: function(component) {
            if (component instanceof gb.ces_base_component) {
                this.m_components[component.type] = null;
            } else if (component < this.m_components.length) {
                this.m_components[component] = null;
            }
        },

        remove_components: function() {
            this.m_components = [];
            for (var i = 0; i < gb.ces_base_component.type.max; ++i) {
                this.m_components[i] = null;
            }
        },

        is_component_exist: function(component_type) {
            return this.m_components[component_type] !== null;
        },

        get_component: function(component_type) {
            return this.m_components[component_type];
        },

        add_child: function(child) {
            var index = this.m_children.findIndex(function(analized_child) {
                return analized_child.tag === child.tag;
            });
            if (index === -1) {

                if (child.parent) {
                    child.parent.remove_child(child);
                }
                child.parent = this;
                this.m_children.push(child);
                this.add_scene_component();
            }
        },

        remove_child: function(child) {
            var index = this.m_children.findIndex(function(analized_child) {
                return analized_child.tag === child.tag;
            });
            if (index !== -1) {
                this.m_children[index].remove_scene_component();
                this.m_children[index].parent = null;
                this.m_children.splice(index, 1);
            }
        },

        remove_from_parent: function() {
            if(this.parent) {
                this.parent.remove_child(this);
            }
        },

        add_scene_component: function() {
            var scene_component = this.parent ? this.parent.get_component(gb.ces_base_component.type.scene) : null;
            if (!this.is_component_exist(gb.ces_base_component.type.scene) && scene_component) {
                this.add_component(scene_component);
            }
            for (var i = 0; i < this.m_children.length; ++i) {
                this.m_children[i].add_scene_component();
            }
        },

        remove_scene_component: function() {
            for (var i = 0; i < this.m_children.length; ++i) {
                this.m_children[i].remove_scene_component();
            }
            this.remove_component(gb.ces_base_component.type.scene);
        }
    },

    static_methods: {

    }
});
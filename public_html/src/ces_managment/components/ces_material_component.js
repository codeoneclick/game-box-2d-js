/* global oop, gb */

"use strict";

oop.define_class({
    namespace: "gb",
    name: "ces_material_component",
    extend: gb.ces_base_component,

    init: function() {
        this.m_type = gb.ces_base_component.type.material;
        this.m_materials = [];
    },

    release: function() {

    },

    methods: {
        add_material: function(technique_name, technique_pass, material) {
            if (typeof this.m_materials[technique_name] === 'undefined') {
                this.m_materials[technique_name] = [];
            }
            this.m_materials[technique_name][technique_pass] = material;
        },

        remove_material: function(technique_name, technique_pass) {
            if (typeof this.m_materials[technique_name] !== 'undefined' && this.m_materials[technique_name].length > technique_pass) {
                this.m_materials[technique_name].splice(technique_pass, 1);
            }
        },

        get_material: function(technique_name, technique_pass) {
            var material = null;
            if (typeof this.m_materials[technique_name] !== 'undefined' && this.m_materials[technique_name].length > technique_pass) {
                material = this.m_materials[technique_name][technique_pass];
            }
            return material;
        },

        bind: function(technique_name, technique_pass, material) {
            var using_material = material;
            if (typeof material === 'undefined') {
                using_material = this.get_material(technique_name, technique_pass);
            }
            using_material.bind();
        },

        unbind: function(technique_name, technique_pass, material) {
            var using_material = material;
            if (typeof material === 'undefined') {
                using_material = this.get_material(technique_name, technique_pass);
            }
            using_material.unbind();
        },

        set_custom_shader_uniform: function(value, uniform, technique_name, technique_pass) {
            if (arguments.length === 4) {
                var material = this.get_material(technique_name, technique_pass);
                if (material) {
                    material.set_custom_shader_uniform(value, uniform);
                }
            } else {
                var materials_count = 0;
                for (var key in this.m_materials) {
                    materials_count = this.m_materials[key].length;
                    for (var i = 0; i < materials_count; ++i) {
                        this.m_materials[key][i].set_custom_shader_uniform(value, uniform);
                    }
                }
            }
        },

        set_texture: function(texture, sampler, technique_name, technique_pass) {
            if (arguments.length === 4) {
                var material = this.get_material(technique_name, technique_pass);
                if (material) {
                    material.set_texture(texture, sampler);
                }
            } else {
                var materials_count = 0;
                for (var key in this.m_materials) {
                    materials_count = this.m_materials[key].length;
                    for (var i = 0; i < materials_count; ++i) {
                        this.m_materials[key][i].set_texture(texture, sampler);
                    }
                }
            }
        },

        swap_texture_to_active: function(guid) {
            var materials_count = 0;
            for (var key in this.m_materials) {
                materials_count = this.m_materials[key].length;
                for (var i = 0; i < materials_count; ++i) {
                    var material = this.m_materials[key][i];
                    sampler = material.get_texture_sampler(guid);
                    if (sampler > 0) {
                        var texture_0 = material.get_texture(0);
                        var texture_to_swap = material.get_texture(sampler);
                        material.set_texture(texture_to_swap, 0);
                        material.set_texture(texture_0, sampler);
                    }
                }
            }
        },
    },

    static_methods: {

        add_material: function(entity, technique_name, technique_pass, material) {
            var material_component = entity.get_component(gb.ces_base_component.type.material);
            if (material_component) {
                material_component.add_material(technique_name, technique_pass, material);
            }
        },

        remove_material: function(entity, technique_name, technique_pass) {
            var material_component = entity.get_component(gb.ces_base_component.type.material);
            if (material_component) {
                material_component.remove_material(technique_name, technique_pass);
            }
        },

        get_material: function(entity, technique_name, technique_pass) {
            var material = null;
            var material_component = entity.get_component(gb.ces_base_component.type.material);
            if (material_component) {
                material = material_component.get_material(technique_name, technique_pass);
            }
            return material;
        }
    }
});
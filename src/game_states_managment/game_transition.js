/* global oop, gb, console, _ */
"use strict";

oop.define_class({
    namespace: "gb",
    name: "game_transition",

    init: function(guid) {
        this.m_guid = guid;
        this.m_configurations_accessor = null;
        this.m_resources_accessor = null;
        this.m_systems_feeder = new gb.ces_systems_feeder();
        this.m_input_context = null;
        this.m_scene = null;

        Object.defineProperty(this, 'guid', {
            get: function() {
                return this.m_guid;
            }
        });
    },

    release: function() {

    },

    methods: {
        on_activated: function(input_context, configurations_accessor, resources_accessor, callback) {
            this.m_input_context = input_context;
            this.m_configurations_accessor = configurations_accessor;
            this.m_resources_accessor = resources_accessor;

            var render_system = new gb.ces_render_system();
            var render_pipeline = render_system.render_pipeline;

            var self = this;
            this.m_configurations_accessor.get_transition_configuration(this.m_guid, function(transition_configuration) {

                if (transition_configuration.ws_techniques_configurations !== null) {
                    for (var i = 0; i < transition_configuration.ws_techniques_configurations.length; ++i) {
                        var ws_technique_configuration = transition_configuration.ws_techniques_configurations[i];
                        var screen_width = Math.min(gl.viewport_width, ws_technique_configuration.screen_width);
                        var screen_height = Math.min(gl.viewport_height, ws_technique_configuration.screen_height);

                        var render_technique_ws = new gb.render_technique_ws(screen_width, screen_height, ws_technique_configuration.technique_name,
                            ws_technique_configuration.index, ws_technique_configuration.num_passes);
                        var clear_color = new gb.vec4(ws_technique_configuration.clear_color_r,
                            ws_technique_configuration.clear_color_g,
                            ws_technique_configuration.clear_color_b,
                            ws_technique_configuration.clear_color_a);
                        render_technique_ws.clear_color = clear_color;
                        render_pipeline.add_ws_render_technique(ws_technique_configuration.technique_name, ws_technique_configuration.index, render_technique_ws);

                        self.m_resources_accessor.add_custom_resource(ws_technique_configuration.technique_name + ".color", render_technique_ws.color_attachment_texture);
                        self.m_resources_accessor.add_custom_resource(ws_technique_configuration.technique_name + ".depth", render_technique_ws.depth_attachment_texture);
                    }
                }

                if (transition_configuration.ss_techniques_configurations !== null) {
                    for (var i = 0; i < transition_configuration.ss_techniques_configurations.length; ++i) {
                        var ss_technique_configuration = transition_configuration.ss_techniques_configurations[i];
                        var material_configuration = ss_technique_configuration.material_configuration;
                        var material = gb.material.construct(material_configuration);
                        gb.material.set_shader(material, material_configuration, self.m_resources_accessor);
                        gb.material.set_textures(material, material_configuration, self.m_resources_accessor);

                        var screen_width = Math.min(gl.viewport_width, ss_technique_configuration.screen_width);
                        var screen_height = Math.min(gl.viewport_height, ss_technique_configuration.screen_height);

                        var render_technique_ss = new gb.render_technique_ss(screen_width, screen_height, ss_technique_configuration.technique_name, 0, material);
                        render_pipeline.add_ss_render_technique(ss_technique_configuration.technique_name, render_technique_ss);

                        self.m_resources_accessor.add_custom_resource(ss_technique_configuration.technique_name + ".color", render_technique_ss.color_attachment_texture);
                    }
                }
                var main_technique_configuration = transition_configuration.main_technique_configuration;
                var material_configuration = main_technique_configuration.material_configuration;
                var material = gb.material.construct(material_configuration);
                gb.material.set_shader(material, material_configuration, self.m_resources_accessor);
                gb.material.set_textures(material, material_configuration, self.m_resources_accessor);

                render_pipeline.create_main_render_technique(material);

                var scene_fabricator = new gb.scene_fabricator();
                scene_fabricator.configurations_accessor = self.m_configurations_accessor;
                scene_fabricator.resources_accessor = self.m_resources_accessor;

                self.m_scene = new gb.scene_graph(self);
                self.m_scene.fabricator = scene_fabricator;
                callback(self.m_scene);
                self.m_systems_feeder.root = self.m_scene;

                self.m_systems_feeder.add_system(render_system);

                var deferred_lighting_system = new gb.ces_deferred_lighting_system();
                self.m_systems_feeder.add_system(deferred_lighting_system);

                var animation_system = new gb.ces_animation_system();
                self.m_systems_feeder.add_system(animation_system);

                var touches_recognize_system = new gb.ces_touches_system();
                self.m_input_context.add_listener(touches_recognize_system);
                self.m_systems_feeder.add_system(touches_recognize_system);

                var box2d_system = new gb.ces_box2d_system();
                self.m_systems_feeder.add_system(box2d_system);

                var action_system = new gb.ces_action_system();
                self.m_systems_feeder.add_system(action_system);

                loop.add_listener(self.m_systems_feeder);
            });
        },

        on_deactivated: function() {
            var touches_recognize_system = this.m_systems_feeder.get_system(gb.ces_base_system.type.touches_recognize);
            this.m_input_context.remove_listener(touches_recognize_system);

            this.m_systems_feeder.deallock_systems();
            loop.remove_listener(this.m_systems_feeder);
        },

        get_ws_technique_result_as_image: function(technique_name, technique_index, image_width, image_height) {
            var render_system = this.m_systems_feeder.get_system(gb.ces_base_system.type.render);
            return render_system.render_pipeline.get_ws_technique_result_as_image(technique_name, technique_index, image_width, image_height);
        }
    },

    static_methods: {

    }
});
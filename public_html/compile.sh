#!/bin/bash

java -jar ../compiler/closure-compiler.jar \
--js_output_file ../public_html/src/game_box-min.js \
--js=../public_html/main/common.js \
--js=../public_html/src/math/vec2.js \
--js=../public_html/src/math/vec3.js \
--js=../public_html/src/math/vec4.js \
--js=../public_html/src/math/mat4.js \
--js=../public_html/src/math/math.js \
--js=../public_html/src/render_managment/graphics_context.js \
--js=../public_html/src/resources_managment/transfering_data/resource_transfering_data.js \
--js=../public_html/src/resources_managment/transfering_data/shader_transfering_data.js \
--js=../public_html/src/resources_managment/transfering_data/texture_transfering_data.js \
--js=../public_html/src/resources_managment/resource_base.js \
--js=../public_html/src/resources_managment/shader.js \
--js=../public_html/src/resources_managment/texture.js \
--js=../public_html/src/resources_managment/ibo.js \
--js=../public_html/src/resources_managment/vbo.js \
--js=../public_html/src/resources_managment/mesh.js \
--js=../public_html/src/resources_managment/operations/serializers/resource_serializer.js \
--js=../public_html/src/resources_managment/operations/serializers/shader_serializer_glsl.js \
--js=../public_html/src/resources_managment/operations/serializers/texture_serializer_png.js \
--js=../public_html/src/resources_managment/operations/commiters/compilers/shader_compiler_glsl.js \
--js=../public_html/src/resources_managment/operations/commiters/resource_commiter.js \
--js=../public_html/src/resources_managment/operations/commiters/shader_commiter_glsl.js \
--js=../public_html/src/resources_managment/operations/commiters/texture_commiter_png.js \
--js=../public_html/src/resources_managment/operations/resource_loading_operation.js \
--js=../public_html/src/resources_managment/operations/shader_loading_operation.js \
--js=../public_html/src/resources_managment/operations/texture_loading_operation.js \
--js=../public_html/src/resources_managment/resource_accessor.js \
--js=../public_html/src/configurations_managment/configuration_base.js \
--js=../public_html/src/configurations_managment/game_object_configuration.js \
--js=../public_html/src/configurations_managment/texture_configuration.js \
--js=../public_html/src/configurations_managment/shader_configuration.js \
--js=../public_html/src/configurations_managment/material_configuration.js \
--js=../public_html/src/configurations_managment/sprite_configuration.js \
--js=../public_html/src/configurations_managment/ws_technique_configuration.js \
--js=../public_html/src/configurations_managment/ss_technique_configuration.js \
--js=../public_html/src/configurations_managment/main_technique_configuration.js \
--js=../public_html/src/configurations_managment/transition_configuration.js \
--js=../public_html/src/configurations_managment/configuration_accessor.js \
--js=../public_html/src/geometry_managment/mesh_constructor.js \
--js=../public_html/src/render_managment/material.js \
--js=../public_html/src/render_managment/techniques/render_technique_base.js \
--js=../public_html/src/render_managment/techniques/render_technique_main.js \
--js=../public_html/src/render_managment/techniques/render_technique_ws.js \
--js=../public_html/src/render_managment/techniques/render_technique_ss.js \
--js=../public_html/src/render_managment/render_pipeline.js \
--js=../public_html/src/gesture_recognizers_managment/input_context.js \
--js=../public_html/src/ces_managment/components/ces_base_component.js \
--js=../public_html/src/ces_managment/components/ces_transformation_component.js \
--js=../public_html/src/ces_managment/components/ces_material_component.js \
--js=../public_html/src/ces_managment/components/ces_scene_component.js \
--js=../public_html/src/ces_managment/components/ces_convex_hull_component.js \
--js=../public_html/src/ces_managment/components/ces_geometry_component.js \
--js=../public_html/src/ces_managment/components/ces_geometry_freeform_component.js \
--js=../public_html/src/ces_managment/components/ces_geometry_quad_component.js \
--js=../public_html/src/ces_managment/components/ces_light_component.js \
--js=../public_html/src/ces_managment/components/ces_light_mask_component.js \
--js=../public_html/src/ces_managment/components/ces_touch_recognize_component.js \
--js=../public_html/src/ces_managment/ces_entity.js \
--js=../public_html/src/ces_managment/systems/ces_base_system.js \
--js=../public_html/src/ces_managment/systems/ces_deferred_lighting_system.js \
--js=../public_html/src/ces_managment/systems/ces_render_system.js \
--js=../public_html/src/ces_managment/systems/ces_touches_system.js \
--js=../public_html/src/ces_managment/ces_systems_feeder.js \
--js=../public_html/src/scene_graph_managment/camera.js \
--js=../public_html/src/scene_graph_managment/game_object.js \
--js=../public_html/src/scene_graph_managment/scene_graph.js \
--js=../public_html/src/scene_graph_managment/light_source.js \
--js=../public_html/src/scene_graph_managment/sprite.js \
--js=../public_html/src/scene_graph_managment/grid.js \
--js=../public_html/src/scene_graph_managment/scene_fabricator.js \
--js=../public_html/src/game_states_managment/game_loop.js \
--js=../public_html/src/game_states_managment/game_transition.js \
--js=../public_html/src/game_states_managment/game_controller.js \
--js=../public_html/src/ui_managment/ss_merge_controller.js \
--js=../public_html/src/ui_managment/ss_animation_controller.js \
--js=!../public_html/src/game_box-min.js \
--formatting=PRETTY_PRINT
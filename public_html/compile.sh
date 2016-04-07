#!/bin/bash

java -jar ../compiler/closure-compiler.jar \
--js_output_file ../public_html/src/game_box-min.js \
--js=../public_html/main/oop.js \
--js=../public_html/src/resources_managment/transfering_data/resource_transfering_data.js \
--js=../public_html/src/resources_managment/transfering_data/shader_transfering_data.js \
--js=../public_html/src/resources_managment/transfering_data/texture_transfering_data.js \
--js=../public_html/src/resources_managment/resource_base.js \
--js=../public_html/src/resources_managment/shader.js \
--js=../public_html/src/resources_managment/texture.js \
--js=../public_html/src/resources_managment/ibo.js \
--js=../public_html/src/resources_managment/vbo.js \
--js=../public_html/main/game_box.js \
--js=!../public_html/src/game_box-min.js \
--formatting=PRETTY_PRINT
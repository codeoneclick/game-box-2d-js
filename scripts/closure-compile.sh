#! /bin/bash

java -jar ../compiler/closure-compiler.jar  --js_output_file ../public_html/src/game_box-min.js --js='../public_html/main/game_box.js' --js='../public_html/src/**.js' --js='!../public_html/src/game_box-min.js'
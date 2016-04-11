"use strict";

var oop = {
    global: (function() {
        return this
    })(),

    define_class: function(class_definition) {

        try {
            if (!class_definition) {
                throw new Error('empty class definition');
            }

            var class_name = class_definition.name;
            if (!class_name || 'string' !== typeof class_name) {
                throw new Error('empty or wrong type class name');
            }

            var init_method = class_definition.init;
            if (!init_method || 'function' !== typeof init_method) {
                throw new Error('class must have init method');
            }

            var release_method = class_definition.release;
            if (!release_method || 'function' !== typeof release_method) {
                throw new Error('class must have release method');
            }

            var parent_class = class_definition.extend;
            if (parent_class && 'function' !== typeof parent_class) {
                throw new Error('parent constructor must be function');
            }

            var class_constructor = null;
            if (parent_class) {
                class_constructor = function() {
                    parent_class.apply(this, arguments);
                    class_constructor.prototype.init.apply(this, arguments);
                }

                if (parent_class === class_constructor) {
                    throw new Error('class cannot extend himself');
                }

                var transitive = new Function;
                transitive.prototype = parent_class.prototype;
                class_constructor.prototype = new transitive;
                class_constructor.prototype.constructor = class_constructor;
            } else {
                class_constructor = function() {
                    class_constructor.prototype.init.apply(this, arguments);
                }
            }

            class_constructor.prototype['init'] = init_method;
            class_constructor.prototype['release'] = release_method;

            var class_methods = class_definition.methods;
            if (class_methods) {
                for (var method_name in class_methods) {
                    if ('function' !== typeof class_methods[method_name]) {
                        throw new Error('class method must be function');
                    }
                    class_constructor.prototype[method_name] = class_methods[method_name];
                }
            }

            var class_static_methods = class_definition.static_methods;
            if (class_static_methods) {
                for (var method_name in class_static_methods) {
                    if ('function' !== typeof class_static_methods[method_name]) {
                        throw new Error('class method must be function');
                    }
                    class_constructor[method_name] = class_static_methods[method_name];
                }
            }

            var class_constants = class_definition.constants;
            if (class_constants) {
                for (var constant_name in class_constants) {
                    if ('function' === typeof class_constants[constant_name]) {
                        throw new Error('class constant cannot be function');
                    }
                    class_constructor[constant_name] = class_constants[constant_name];
                }
            }

            var namespace = oop.global;
            if(class_definition.namespace)
            {
                if(!namespace[class_definition.namespace])
                {
                    namespace[class_definition.namespace] = new Object;
                    console.warn("created new namespace: ", class_definition.namespace);
                }
                namespace = namespace[class_definition.namespace];
            }
            if(!namespace[class_name])
            {
                namespace[class_name] = class_constructor;
            }
            else
            {
                throw new Error("can't create class with same definition name");
            }
        } catch (exception) {
            console.error("class_definition -->");
            console.error(class_definition);
        } finally {
            console.warn("class defined: ", class_definition.name);
        }
    }
};
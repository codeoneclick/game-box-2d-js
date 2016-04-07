oop.define_class({
    namespace:"gb",
    name: "custom_clazz",
    extend: window.resource_base,
    init: function() {
        Object.defineProperty(this, 'custom_property', {
            get: function() {
                return null;
            }
        });
        this.m_custom_ivar = [];
    },

    release: function() {

    },

    methods: {
        custom_method_01: function(params) {
            return this.m_custom_ivar = [];
        },
        custom_method_02: function(params) {
            return this.m_custom_ivar = [];
        },
        custom_method_03: function(params) {
            return this.m_custom_ivar = [];
        }
    },

    static_methods: {
        static_custom_method_01: function(params) {
            console.log("static_custom_method_01");
        },
        static_custom_method_02: function(params) {

        },
    }
});
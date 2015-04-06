'use strict';

define(function(require) {
    var widgets = require('widgets');

    var registerWidget = function() {
        var WIDGET_NAME = 'camera-va';

        var initialize = function(index, element) {
            var $el = $(element);
            // TODO: Bind to the event to trigger the cordova plugin
        };

        var validate = function(html) {
            // TODO: Create validation

            return {
                valid: true,
                errors: []
            };
        };

        var serialize = function(element) {
            var $el = $(element);
            var values = [];
            var label;

            // TODO: get the value from the element

            return {
                serialize: true,
                label: label,
                value: values
            };
        };

        widgets.registerWidget({
            name: WIDGET_NAME,
            initialize: initialize,
            validate: validate,
            serialize: serialize
        });
    };

    registerWidget();
});

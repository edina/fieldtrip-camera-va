'use strict';

/* global cordova */

define(function(require) {
    var widgets = require('widgets');

    // If the plugin is not installed skip this widget
    if (!(cordova && cordova.plugins && cordova.plugins.cameravaplugin)) {
        console.warn('The Camera VA plugin not active');
        console.warn('Please install the cordova ie.ucd.cobweb.cordova.cameravaplugin plugin');
        return;
    }

    /*
     * Invoke the cordova plugin
     * @param elImage element where to display the image and put the data
     */
    var takePhoto = function(elImage) {
        cordova.plugins.cameravaplugin
            .photoWithVA(
                function(data) {
                    //TODO: Move the image and put the data in the element, as data?
                    console.log(data);
                },
                function(err) {
                    console.error(err);
                }
            );
    };

    var registerWidget = function() {
        var WIDGET_NAME = 'camera-va';

        var initialize = function(index, element) {
            var $el = $(element);
            var elImg = $el.append('<img />');

            $el.find('input[type=button]').on('vclick', function() {
                takePhoto(elImg);
            });
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

'use strict';

/* global cordova */

define(function(require) {
    var widgets = require('widgets');
    var records = require('records');
    var cordova = cordova;

    // If the plugin is not installed skip this widget
    if (!(cordova && cordova.plugins && cordova.plugins.cameravaplugin)) {
        console.warn('The Camera VA plugin not active');
        console.warn('Please install the cordova ie.ucd.cobweb.cordova.cameravaplugin plugin');
        return;
    }

    var cameraLOSTemplate = '<div id="annotate-image-va-<%= index %>" class="image-chooser">'+
        '<div class="ui-grid-a">'+
        '<div class="ui-block-a">'+
        '<a class="annotate-image-va-take" href="#">'+
        '<img src="css/images/images.png" alt="Take Photo"></a><p>Camera</p>'+
        '</div>'+
        '</div>'+
        '<div class="ui-grid-solo">'+
        '<div class="ui-block-a">'+
        '<fieldset data-role="controlgroup" data-type="horizontal">'+
        '<input id="radio-view-a" type="radio" name="radio-image-size" value="imageSizeNormal" <%= normalSelected%> />'+
        '<label for="radio-view-a">Normal</label>'+
        '<input id="radio-view-b" type="radio" name="radio-image-size" value="imageSizeFull" <%=fullSelected%> />'+
        '<label for="radio-view-b">Full</label>'+
        '</fieldset>'+
        '<p>Image Size</p>'+
        '</div>'+
        '</div>'+
        '</div>';

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
                    showImage(0, data);
                },
                function(err) {
                    console.error(err);
                }
            );
    };

    var showImage = function(id, url){
        var parent = $('#' + id).parent();
        $('#' + id).hide();
        parent.append('<div class="annotate-image"><img src="' +
                              url + '"</img></div>');
    };

    var registerWidget = function() {
        var WIDGET_NAME = 'camera-va';

        var initialize = function(index, element) {
            console.log("initialize camera-va");
            var $el = $(element);
            var elImg = $el.append('<img />');
            $.each($('input[capture=camera-va]'), function(index, input){
                $(input).parent().append(records.renderCameraExtras(index, cameraLOSTemplate));
            });

            //$el.find('input[type=button]').on('vclick', function() {
            //    takePhoto(elImg);
            //});
            // listen for take photo click
            $('.annotate-image-va-take').click($.proxy(function(event){
                takePhoto(elImg);
            }, this));
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

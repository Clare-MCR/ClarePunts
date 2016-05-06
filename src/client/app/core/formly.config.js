/**
 * Created by rg12 on 05/05/2016.
 */
(function () {
  'use strict';

  var core = angular.module('app.core');

  core.config(formlyConfig);

  formlyConfig.$inject = ['formlyConfigProvider'];
  /* @ngInject */
  function formlyConfig(formlyConfigProvider) {
    /*
     ngModelAttrs stuff
     */

    var ngModelAttrs = {};

    function camelize(string) {
      string = string.replace(/[\-_\s]+(.)?/g, function (match, chr) {
        return chr ? chr.toUpperCase() : '';
      });
      // Ensure 1st char is always lowercase
      return string.replace(/^([A-Z])/, function (match, chr) {
        return chr ? chr.toLowerCase() : '';
      });
    }

    ngModelAttrs = {};

    // attributes
    var attributes = [
      'date-disabled',
      'custom-class',
      'show-weeks',
      'starting-day',
      'init-date',
      'min-mode',
      'max-mode',
      'format-day',
      'format-month',
      'format-year',
      'format-day-header',
      'format-day-title',
      'format-month-title',
      'year-range',
      'shortcut-propagation',
      'datepicker-popup',
      'show-button-bar',
      'current-text',
      'clear-text',
      'close-text',
      'close-on-date-selection',
      'datepicker-append-to-body',
      'meridians',
      'readonly-input',
      'mousewheel',
      'arrowkeys'
    ];
    angular.forEach(attributes, function (attr) {
      ngModelAttrs[camelize(attr)] = {attribute: attr};
    });


    // bindings
    var bindings = [
      'datepicker-mode',
      'min-date',
      'max-date',
      'hour-step',
      'minute-step',
      'show-meridian',
      'min',
      'max',
      'readonly-input',
      'options'
    ];
    angular.forEach(bindings, function (binding) {
      ngModelAttrs[camelize(binding)] = {bound: binding};
    });

    /*
     timepicker
     */

    formlyConfigProvider.setType({
      name: 'timepicker',
      template: [
        '<span uib-dropdown auto-close="outsideClick">',
        '<a uib-dropdown-toggle>',
        '{{model[options.key]| date:"shortTime"}}',
        '</a>',
        '<ul uib-dropdown-menu>',
        '<li>',
        '<uib-timepicker ng-model="model[options.key]" cp-widget-datetimepicker-patch></uib-timepicker>',
        '</li>',
        '</ul>',
        '</span>'
      ].join(' '),
      wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError'],
      defaultOptions: {
        ngModelAttrs: ngModelAttrs,
        templateOptions: {
          datepickerOptions: {}
        }
      }
    });

    formlyConfigProvider.setType({
      name: 'daterange',
      template: [
        '<input date-range-picker class="form-control date-picker" type="text" ng-model="model[options.key]" />'
      ].join(' '),
      wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError'],
      defaultOptions: {
        ngModelAttrs: ngModelAttrs,
        templateOptions: {
          datepickerOptions: {}
        }
      }
    });


    formlyConfigProvider.setType({
      name: 'datepicker',
      templateUrl: 'app/core/formlytemplates/datepicker.html',
      wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError'],
      defaultOptions: {
        ngModelAttrs: ngModelAttrs,
        templateOptions: {
          datepickerOptions: {
            format: 'MM.dd.yyyy',
            initDate: new Date()
          }
        }
      },
      controller: ['$scope', function ($scope) {
        $scope.datepicker = {};

        $scope.datepicker.opened = false;

        $scope.datepicker.open = function ($event) {
          $scope.datepicker.opened = !$scope.datepicker.opened;
        };
      }]
    });


    formlyConfigProvider.setWrapper({
      name: 'horizontalBootstrapLabel',
      template: [
        '<label for="{{::id}}" class="col-sm-offset-1 col-sm-2 form-control-label">',
        '{{to.label}} {{to.required ? "*" : ""}}',
        '</label>',
        '<div class="col-sm-8">',
        '<formly-transclude></formly-transclude>',
        '</div>',
      ].join(' ')
    });

    formlyConfigProvider.setWrapper({
      name: 'horizontalBootstrapCheckbox',
      template: [
        '<div class="col-sm-offset-2 col-sm-8">',
        '<formly-transclude></formly-transclude>',
        '</div>'
      ].join(' ')
    });

    formlyConfigProvider.setType({
      name: 'horizontalInput',
      extends: 'input',
      wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError']
    });

    formlyConfigProvider.setType({
      name: 'horizontalTextarea',
      extends: 'textarea',
      wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError']
    });

    formlyConfigProvider.setType({
      name: 'horizontalSelect',
      extends: 'select',
      wrapper: ['horizontalBootstrapLabel', 'bootstrapHasError']
    });

    formlyConfigProvider.setType({
      name: 'horizontalCheckbox',
      extends: 'checkbox',
      wrapper: ['horizontalBootstrapCheckbox', 'bootstrapHasError']
    });

    formlyConfigProvider.setType({
      name: 'phone',
      extends: 'horizontalInput',
      defaultOptions: {
        validators: {
          mobile: {
            expression: function (viewValue, modelValue) {
              var value = modelValue || viewValue;
              var phonePattern = /^\(?(?:(?:0(?:0|11)\)?[\s-]?\(?|\+)44\)?[\s-]?\(?(?:0\)?[\s-]?\(?)?|0)(?:\d{2}\)?[\s-]?\d{4}[\s-]?\d{4}|\d{3}\)?[\s-]?\d{3}[\s-]?\d{3,4}|\d{4}\)?[\s-]?(?:\d{5}|\d{3}[\s-]?\d{3})|\d{5}\)?[\s-]?\d{4,5}|8(?:00[\s-]?11[\s-]?11|45[\s-]?46[\s-]?4\d))(?:(?:[\s-]?(?:x|ext\.?\s?|\#)\d+)?)$/;
              return phonePattern.test(value);
            }
          }
        },
        templateOptions: {
          label: 'Mobile:',
          placeholder: 'Enter a your mobile address'
        }
      }
    });


  }


})();




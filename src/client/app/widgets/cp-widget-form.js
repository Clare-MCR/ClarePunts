/**
 * Created by rg12 on 02/05/2016.
 */

/**
 * @desc sales directive that can be used anywhere across the sales app at a company named Acme
 * @example <cp-widget-form></cp-widget-form>
 */

(function () {
  'use strict';

  angular
    .module('app.widgets')
    .directive('cpWidgetForm', cpWidgetForm);

  /* @ngInject */
  function cpWidgetForm() {
    //Usage:
    //<div cp-widget-form></div>
    // Creates:
    // bootstrap wrapper around
    var directive = {
      scope: {
        labelText: '@',
        labelFor: '@'
      },
      transclude: true,
      template: '<div class="form-group form-group-sm row">' +
      '<label for="{{labelFor}}" class="col-sm-2 form-control-label">{{labelText}}</label>' +
      '<div class="controls col-sm-10" ng-transclude></div>' +
      '</div>',
      replace: true,
      restrict: 'EA'
    };
    return directive;

  }
})();


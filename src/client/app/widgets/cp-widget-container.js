/**
 * Created by rg12 on 02/05/2016.
 */

/**
 * @desc sales directive that can be used anywhere across the sales app at a company named Acme
 * @example <cp-widget-container></cp-widget-container>
 */

(function () {
  'use strict';

  angular
    .module('app.widgets')
    .directive('cpWidgetContainer', cpWidgetContainer);

  /* @ngInject */
  function cpWidgetContainer() {
    //Usage:
    //<div cp-widget-container></div>
    // Creates:
    // creates a content wrapper with label
    var directive = {
      scope: {
        labelText: '='
      },
      transclude: true,
      template: '<div><div class="contentLabel">{{labelText}}</div>' +
      '<div class="contentBox" ng-transclude></div></div>',
      replace: true,
      restrict: 'EA'
    };
    return directive;

  }
})();

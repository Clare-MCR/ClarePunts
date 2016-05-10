/**
 * Created by rg12 on 02/05/2016.
 */

/**
 * @desc Add to uib-timepicker to fix timezone issues
 * @example <uib-timepicker cp-widget-datetimepicker-patch></uib-timepicker>
 */

(function () {
  'use strict';

  angular
    .module('app.widgets')
    .directive('cpWidgetDatetimepickerPatch', cpWidgetDatetimepickerPatch);

  function cpWidgetDatetimepickerPatch() {
    return {
      restrict: 'A',
      priority: 1,
      require: 'ngModel',
      link: function (scope, element, attrs, ctrl) {
        ctrl.$formatters.push(function (value) {
          var date = new Date(value);
          date = new Date(date.getTime() + (60000 * date.getTimezoneOffset()));
          return date;
        });

        ctrl.$parsers.push(function (value) {
          var date = new Date(value.getTime() - (60000 * value.getTimezoneOffset()));
          return date;
        });
      }
    };
  }
})();

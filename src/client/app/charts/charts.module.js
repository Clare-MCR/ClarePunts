(function () {
  'use strict';

  angular
    .module('app.charts', ['app.core'])
    .value('googleChartApiConfig', {
      version: '1.1',
      optionalSettings: {
        packages: ['calendar'] //load just the package you want
      }
    });
})();

(function () {
  'use strict';

  angular
    .module('app.charts')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'myCharts',
        config: {
          url: '/mycharts',
          templateUrl: 'app/charts/myCharts.html',
          controller: 'ChartsController',
          controllerAs: 'vm',
          title: 'My Charts',
          settings: {
            nav: 7,
            content: '<i class="fa fa-area-chart"></i> My Charts'
          }
        }
      }
    ];
  }
})();

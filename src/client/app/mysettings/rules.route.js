(function () {
  'use strict';

  angular
    .module('app.mySettings')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'rules',
        config: {
          url: '/rules',
          templateUrl: 'app/mySettings/rules.html',
          controller: 'RulesController',
          controllerAs: 'vm',
          title: 'rules',
          resolve: {
            /* @ngInject */
            settingsPrepServices: settingsPrepServices
          },
          settings: {
            nav: 5,
            content: '<i class="fa fa-file-text"></i> Rules'
          }
        }
      }
    ];
  }

  /* @ngInject */
  function settingsPrepServices(SettingsServices) {
    return SettingsServices.get().$promise;
  }

})();

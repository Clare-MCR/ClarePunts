(function () {
  'use strict';

  angular
    .module('app.info')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'contact',
        config: {
          url: '/contact',
          templateUrl: 'app/info/contact.html',
          controller: 'ContactController',
          controllerAs: 'vm',
          title: 'contact',
          resolve: {
            /* @ngInject */
            settingsPrepServices: settingsPrepServices
          },
          settings: {
            nav: 6,
            content: '<i class="fa fa-envelope"></i> Contact'
          }
        }
      }
    ];
  }

  /* @ngInject */
  function settingsPrepServices(SettingsServices) {
    return SettingsServices.get({Type: 'committee'}).$promise;
  }

})();

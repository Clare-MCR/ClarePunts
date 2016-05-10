(function () {
  'use strict';

  angular
    .module('app.admin')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'adminSettings',
        config: {
          url: '/admin/settings',
          templateUrl: 'app/admin/settings/adminSettings.html',
          controller: 'AdminSettingsController',
          controllerAs: 'vm',
          title: 'Admin Settings',
          resolve: {
            /* @ngInject */
            userPrepService: userPrepService
          },
          settings: {
            nav: 5,
            content: '<i class="fa fa-lock"></i> Admin Settings',
            admin: true
          }
        }
      }
    ];
  }

  /* @ngInject */
  function userPrepService(UserServices) {
    return UserServices.get().$promise;
  }

})();

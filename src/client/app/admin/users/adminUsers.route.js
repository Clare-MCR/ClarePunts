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
        state: 'adminUsers',
        config: {
          url: '/admin/users',
          templateUrl: 'app/admin/users/adminUsers.html',
          controller: 'AdminUsersController',
          controllerAs: 'vm',
          title: 'Admin Users',
          resolve: {
            /* @ngInject */
            userPrepService: userPrepService
          },
          settings: {
            nav: 4,
            content: '<i class="fa fa-lock"></i> Admin Users',
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

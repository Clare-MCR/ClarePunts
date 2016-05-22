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
        state: 'mySettings',
        config: {
          url: '/mysettings',
          templateUrl: 'app/mySettings/mySettings.html',
          controller: 'MySettingsController',
          controllerAs: 'vm',
          title: 'My Settings',
          // resolve: {
          //   /* @ngInject */
          //   userPrepService: userPrepService
          // },
          settings: {
            nav: 3,
            content: '<i class="fa fa-gear"></i> My Settings'
          }
        }
      }
    ];
  }

  // /* @ngInject */
  // function userPrepService(UserServices) {
  //   return UserServices.get();
  // }

})();

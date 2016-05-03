(function () {
  'use strict';

  angular
    .module('app.bookings')
    .run(appRun);

  appRun.$inject = ['routerHelper'];
  /* @ngInject */
  function appRun(routerHelper) {
    routerHelper.configureStates(getStates());
  }

  function getStates() {
    return [
      {
        state: 'bookAPunt',
        config: {
          url: '/',
          templateUrl: 'app/bookings/bookAPunt.html',
          controller: 'BookAPuntController',
          controllerAs: 'vm',
          title: 'bookAPunt',
          resolve: {
            /* @ngInject */
            puntsPrepService: puntsPrepService,
            bookingsPrepService: bookingsPrepService,
            userPrepService: userPrepService
          },
          settings: {
            nav: 2,
            content: '<i class="fa fa-dashboard"></i> Book A Punt'
          }
        }
      }
    ];
  }

  /* @ngInject */
  function puntsPrepService(puntsServices) {
    return puntsServices.get().$promise;
  }

  /* @ngInject */
  function bookingsPrepService(bookingServices) {
    return bookingServices.get().$promise;
  }

  /* @ngInject */
  function userPrepService(userServices) {
    return userServices.get().$promise;
  }

})();

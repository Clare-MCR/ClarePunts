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
          url: '/book',
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
            content: '<i class="fa fa-ship"></i> Book A Punt'
          }
        }
      }
    ];
  }

  /* @ngInject */
  function puntsPrepService(PuntsServices) {
    return PuntsServices.get().$promise;
  }

  /* @ngInject */
  function bookingsPrepService(BookingServices) {
    return BookingServices.get().$promise;
  }

  /* @ngInject */
  function userPrepService(UserServices) {
    return UserServices.get().$promise;
  }

})();
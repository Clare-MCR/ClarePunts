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
          title: 'Book A Punt',
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
    return PuntsServices.query().$promise;
  }

  /* @ngInject */
  function bookingsPrepService(BookingServices) {
    return BookingServices.query().$promise;
  }

  /* @ngInject */
  function userPrepService(UserServices) {
    return UserServices.get().$promise;
  }

})();

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
        state: 'myBookings',
        config: {
          url: '/mybookings',
          templateUrl: 'app/bookings/myBookings.html',
          controller: 'MyBookingsController',
          controllerAs: 'vm',
          title: 'myBookings',
          resolve: {
            /* @ngInject */
            puntsPrepService: puntsPrepService,
            bookingsPrepService: bookingsPrepService,
            userPrepService: userPrepService
          },
          settings: {
            nav: 2,
            content: '<i class="fa fa-calendar-o"></i> My Bookings'
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

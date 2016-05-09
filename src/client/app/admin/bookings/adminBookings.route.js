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
        state: 'adminBookings',
        config: {
          url: '/admin/bookings',
          templateUrl: 'app/admin/bookings/adminBookings.html',
          controller: 'AdminBookingsController',
          controllerAs: 'vm',
          title: 'Admin bookings',
          resolve: {
            /* @ngInject */
            userPrepService: userPrepService,
            puntsPrepService: puntsPrepService,
            bookingsPrepService: bookingsPrepService
          },
          settings: {
            nav: 3,
            content: '<i class="fa fa-lock"></i> Admin bookings',
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

  /* @ngInject */
  function puntsPrepService(PuntsServices) {
    return PuntsServices.query().$promise;
  }

  /* @ngInject */
  function bookingsPrepService(BookingServices) {
    return BookingServices.query().$promise;
  }
})();

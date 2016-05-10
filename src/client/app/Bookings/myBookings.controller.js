(function () {
  'use strict';

  angular
    .module('app.bookings')
    .controller('MyBookingsController', MyBookingsController);

  MyBookingsController.$inject = ['BookingServices', 'bookingsPrepService',
    'puntsPrepService', 'userPrepService', 'logger'];

  /* @ngInject */
  function MyBookingsController(BookingServices, bookingsPrepService, puntsPrepService,
                                userPrepService, logger) {
    var vm = this;

    vm.now = new Date();
    vm.title = 'My bookings';
    vm.deleteBooking = deleteBooking;
    vm.punts = puntsPrepService;
    vm.bookings = bookingsPrepService;
    vm.user = userPrepService;
    vm.form = [];

    activate();

    function activate() {
      logger.info('Viewing My bookings');
      vm.user.bookings = hasUpcoming();
    }

    function hasUpcoming() {
      return vm.bookings.filter(function (booking) {
        var output = true;
        if (vm.user.type === 'PORTER') {
          output = new Date(booking.timeTo) >= vm.now;
        } else {
          output = new Date(booking.timeTo) >= vm.now && booking.booker === vm.user.crsid;
        }
        return output;
      });
    }

    function deleteBooking() {
      if (vm.form.length < 1) {
        logger.error('Nothing selected');
      } else {
        vm.form.forEach(
          function (id) {
            BookingServices.remove({Id: id, from: null}, function () {
              for (var i = 0; i < vm.user.bookings.length; i++) {
                if (vm.user.bookings[i].id === id) {
                  vm.user.bookings.splice(i, 1);
                  break;
                }
              }
              logger.success('Booking Deleted');
            }, function () {
              logger.error('Something went wrong deleting the booking');
            });
          });
      }
    }
  }
})();

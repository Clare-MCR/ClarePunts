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
    vm.title = 'My Bookings';
    vm.deleteBooking = deleteBooking;
    vm.punts = puntsPrepService;
    vm.bookings = bookingsPrepService;
    vm.user = userPrepService;
    vm.form = [];

    activate();

    function activate() {
      logger.info('Viewing My Bookings');
      vm.user.bookings = hasUpcoming();
    }

    function hasUpcoming() {
      return vm.bookings.filter(function (booking) {
        /*jshint camelcase: false */
        var output = true;
        if (vm.user.type === 'PORTER') {
          output = new Date(booking.time_to) >= vm.now;
        } else {
          output = new Date(booking.time_to) >= vm.now && booking.booker === vm.user.crsid;
        }
        return output;
      });
    }

    function deleteBooking() {
      if (vm.form.length < 1) {
        logger.error('Nothing selected');
      } else {
        vm.form.forEach(
          function (booking) {
            BookingServices.remove({Id: booking}, function () {
              vm.user.bookings.pop(); //@TODO fix to remove correct booking. currently only works if deleting all
              logger.success('Booking Deleted');
            }, function () {
              logger.error('Something went wrong deleting the booking');
            });
          });
      }
    }
  }
})();

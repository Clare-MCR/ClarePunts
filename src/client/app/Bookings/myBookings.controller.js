(function () {
  'use strict';

  angular
    .module('app.bookings')
    .controller('MyBookingsController', MyBookingsController);

  MyBookingsController.$inject = ['BookingServices', 'bookingsPrepService', 'modalService',
    'puntsPrepService', 'userPrepService', 'logger'];

  /* @ngInject */
  function MyBookingsController(BookingServices, bookingsPrepService, modalService, puntsPrepService,
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
        var modalOptions = {
          closeButtonText: 'Cancel',
          actionButtonText: 'Delete Booking',
          bodyText: 'Delete Booking(s): ' + vm.form.join(', '),
          headerText: 'Are you sure you want to delete this booking?'
        };

        modalService.showModal({}, modalOptions).then(function () {
          vm.form.forEach(function (booking) {
            BookingServices.remove({Id: booking, from: null, to: null}, function () {
              for (var i = 0; i < vm.user.bookings.length; i++) {
                if (vm.user.bookings[i].id === booking) {
                  vm.user.bookings.splice(i, 1);
                  break;
                }
              }
              logger.success('Booking Deleted Successfully');
            }, function () {
              logger.error('Something went wrong deleting the booking');
            });
          });
        });
      }
    }
  }
})();

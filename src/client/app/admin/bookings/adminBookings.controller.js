(function () {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminBookingsController', AdminBookingsController);

  AdminBookingsController.$inject = ['userPrepService', 'puntsPrepService', 'bookingsPrepService',
    'BookingServices', 'modalService', 'logger', '$state'];
  /* @ngInject */
  function AdminBookingsController(userPrepService, puntsPrepService, bookingsPrepService,
                                   BookingServices, modalService, logger, $state) {
    var vm = this;

    vm.deleteBooking = deleteBooking;
    vm.user = userPrepService;
    vm.punts = puntsPrepService;
    vm.bookings = bookingsPrepService;
    vm.title = $state.current.title;
    vm.form = {booking: []};
    vm.formFields = [];

    activate();

    vm.formFields = [
      {
        key: 'search',
        type: 'horizontalInput',
        templateOptions: {
          type: 'text',
          label: 'Search:',
          placeholder: 'Enter name'
        }
      },
      {
        key: 'punt',
        type: 'horizontalSelect',
        templateOptions: {
          label: 'Punt:',
          options: vm.punts
        }
      }
    ];

    function activate() {
      logger.info('Viewing ' + $state.current.title);
      vm.punts.forEach(function (punt) {
        punt.value = punt.id;
      });
      vm.punts.push({value: null, name: ''});
    }

    function deleteBooking() {
      var modalOptions = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Delete Booking',
        bodyText: 'Delete Booking(s): ' + vm.form.booking.join(', '),
        headerText: 'Are you sure you want to delete this booking?'
      };

      modalService.showModal({}, modalOptions).then(function () {
        vm.form.booking.forEach(function (booking) {
          BookingServices.remove({Id: booking, from: null, to: null}, function () {
            for (var i = 0; i < vm.bookings.length; i++) {
              if (vm.bookings[i].id === booking) {
                vm.bookings.splice(i, 1);
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
})();

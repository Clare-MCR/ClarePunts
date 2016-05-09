(function () {
  'use strict';

  angular
    .module('app.charts')
    .controller('ChartsController', ChartsController);

  ChartsController.$inject = ['$filter', 'BookingServices', 'UserServices', 'logger'];
  /* @ngInject */
  function ChartsController($filter, BookingServices, UserServices, logger) {
    var vm = this;
    vm.title = 'My Usage';
    vm.user = {};
    vm.myChartObject = {
      type: 'Calendar',
      data: {
        cols: [
          {type: 'date', id: 'Date'},
          {type: 'number', id: 'Won/Loss'}
        ],
        rows: []
      },
      options: {title: '', height: '500'}
    };

    activate();

    function activate() {
      logger.info('Viewing my Charts');
      getUser();
    }

    function getUser() {
      UserServices.get(function (data) {
        vm.user = data;
        getBookings(data.crsid);
      });
    }

    function getBookings(crsid) {
      BookingServices.query({Id: '*', from: null, to: null}, function (bookings) {
        vm.rawBookings = bookings;
        vm.myChartObject.data.rows = $filter('bookingsToCalendarChart')(bookings.filter(function (booking) {
          return booking.booker === crsid;
        }));
      });
    }

  }
})();

(function () {
  'use strict';

  angular
    .module('app.charts')
    .controller('ChartsController', ChartsController);

  ChartsController.$inject = ['$filter', 'BookingServices', 'UserServices', '$rootScope', 'logger'];
  /* @ngInject */
  function ChartsController($filter, BookingServices, UserServices, $rootScope, logger) {
    var vm = this;
    vm.title = 'My Usage';
    vm.user = {};
    vm.form = {chartType:1,group:1};
    vm.formFields = [];
    vm.rawBookings = [];
    vm.myChartObject = {
      type: 'Calendar',
      data: {
        cols: [
          {type: 'date', id: 'Date'},
          {type: 'number', id: 'Bookings'}
        ],
        rows: []
      },
      options: {title: '',
        Height: '1000px',
        width: '100%',
        calendar: { cellSize: 12 }
      }
    };

    activate();

    ////

    vm.formFields = [
      {
        key: 'chartType',
        type: 'horizontalSelect',
        templateOptions: {
          label: 'Display:',
          options: [
            {name: 'Calendar', value: 1},
            {name: 'Hourly', value: 2}
          ]
        }
      },
      {
        key: 'group',
        type: 'horizontalSelect',
        templateOptions: {
          label: 'Display:',
          options: [
            {name: 'My Usage', value: 1},
            {name: 'All Usage', value: 2},
            {name: 'MCR Usage', value: 3},
            {name: 'UCS Usage', value: 4},
            {name: 'Fellows Usage', value: 5},
            {name: 'Staff Usage', value: 6},
            {name: 'Porters Usage', value: 7}
          ]
        },
        hideExpression: function ($viewValue, $modelValue, scope) {
          return scope.model.chartType !== 1;
        },
        watcher: {
          listener: function (field, newValue) {
            if (newValue) {
              plot(newValue);
            }
          }
        }
      }
    ];

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

    function getBookings() {
      BookingServices.query({Id: '*', from: null, to: null}, function (bookings) {
        vm.rawBookings = bookings;
        plot();
      });
    }

    function plot(value) {
      plotCalendar();
    }

    function plotCalendar() {
      switch (vm.form.group) {
        case 7:
          vm.myChartObject.data.rows = $filter('bookingsToCalendarChart')(vm.rawBookings.filter(function (booking) {
            return booking.userType === 'PORTER';
          }));
          break;
        case 6:
          vm.myChartObject.data.rows = $filter('bookingsToCalendarChart')(vm.rawBookings.filter(function (booking) {
            return booking.userType === 'STAFF';
          }));
          break;
        case 5:
          vm.myChartObject.data.rows = $filter('bookingsToCalendarChart')(vm.rawBookings.filter(function (booking) {
            return booking.userType === 'FELLOW';
          }));
          break;
        case 4:
          vm.myChartObject.data.rows = $filter('bookingsToCalendarChart')(vm.rawBookings.filter(function (booking) {
            return booking.userType === 'UCS';
          }));
          break;
        case 3:
          vm.myChartObject.data.rows = $filter('bookingsToCalendarChart')(vm.rawBookings.filter(function (booking) {
            return booking.userType === 'MCR';
          }));
          break;
        case 2:
          vm.myChartObject.data.rows = $filter('bookingsToCalendarChart')(vm.rawBookings);
          break;
        case 1:
        /* falls through */
        default:
          vm.myChartObject.data.rows = $filter('bookingsToCalendarChart')(vm.rawBookings.filter(function (booking) {
            return booking.booker === vm.user.crsid;
          }));
          break;
      }
      forceChartRedraw();
    }

    function forceChartRedraw() {
      $rootScope.$emit('resizeMsg');
    }
  }
})();

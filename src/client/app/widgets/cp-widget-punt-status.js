/**
 * Created by rg12 on 02/05/2016.
 */

/**
 * @desc sales directive that can be used anywhere across the sales app at a company named Acme
 * @example <cp-widget-punt-status></cp-widget-punt-status>
 */


(function () {
  'use strict';

  angular
    .module('app.widgets')
    .directive('cpWidgetPuntStatus', cpWidgetPuntStatus)
    .filter('statusCircle', statusCircle)
    .filter('bookingSimple', bookingSimple)
    .filter('bookingTooltip', bookingTooltip);

  /* @ngInject */
  function cpWidgetPuntStatus() {
    //Usage:
    //<div cp-widget-punt-status></div>
    // Creates:
    // punt status table
    var directive = {
      scope: {
        'punts': '=',
        'bookings': '=',
        'title': '='
      },
      templateUrl: 'app/widgets/widget-punt-status.html',
      restrict: 'EA',
      controller: PuntStatus,
      controllerAs: 'vm',
      bindToController: true
    };
    return directive;

    function PuntStatus() {
      var vm = this;

      activate();

      function activate() {
        if (vm.punts !== undefined) {
          getStatus();
        }
      }

      function getStatus() {
        var now = new Date();
        var midnight = new Date().setHours(24, 0, 0, 0);
        var currentBookings = vm.bookings.filter(function (booking) {
          return new Date(booking.time_from) <= now && new Date(booking.time_to) >= now;
        });
        var nextBookings = vm.bookings.filter(function (booking) {
          return new Date(booking.time_from) >= now && new Date(booking.time_to) <= midnight;
        });

        return vm.punts.forEach(
          function (punt) {
            punt.currentStatus = '';
            punt.currentBooking = '';
            punt.nextBooking = '';


            var availableFrom = new Date(punt.available_from);
            var availableTo = new Date(punt.available_to);

            if (now > availableFrom && now < availableTo) {
              punt.currentBooking = currentBookings.filter(function (booking) {
                return booking.puntid === punt.id;
              })[0];

              punt.nextBooking = nextBookings.filter(function (booking) {
                return booking.puntid === punt.id;
              });
              punt.nextBooking = punt.nextBooking.sort(function (a, b) {
                return new Date(a.time_from) - new Date(b.time_from);
              })[0];

              if (punt.currentBooking) {
                punt.currentStatus = 'Busy';
              } else {
                punt.currentStatus = 'Available';
              }
            } else {
              punt.currentStatus = 'Inactive';
            }
            return punt;
          });
      }

    }
  }

  function statusCircle() {
    return function (input) {
      var output = '';
      switch (input) {
        case 'Inactive':
          output = 'red circle';
          break;
        case 'Available':
          output = 'green circle';
          break;
        case 'Busy':
          output = 'yellow circle';
          break;
        default:
          output = 'green circle';
      }
      return output;
    };
  }

  function bookingSimple($filter) {
    return function (input) {
      var output = '';
      if (input) {
        var from = $filter('date')(new Date(input.time_from), 'shortTime');
        var to = $filter('date')(new Date(input.time_to), 'shortTime');
        output = input.booker + ': ' + from + ' - ' + to;
      }
      return output;
    };
  }

  function bookingTooltip() {
    return function (input) {
      var output = '';
      if (input) {
        output = input.name + ' - ' + input.phone;
      }
      return output;
    };
  }

})();

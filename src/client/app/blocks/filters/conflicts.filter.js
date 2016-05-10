/**
 * Created by rg12 on 02/05/2016.
 */
(function () {
  'use strict';

  angular
    .module('blocks.filter')
    .filter('conflictBookings', conflictBookings);

  function conflictBookings() {
    /*jshint camelcase: false */
    return function (bookings, from, to) {
      from = new Date(from);
      if (!to) {
        from = new Date(from).setUTCHours(0, 0, 0, 0);
        to = new Date(from).setUTCHours(24, 0, 0, 0);
      } else {
        to = new Date(to);
      }
      bookings = bookings.filter(function (booking) {
        return new Date(booking.timeFrom) < to && new Date(booking.timeTo) > from;
      });
      return bookings;
    };
  }
})();

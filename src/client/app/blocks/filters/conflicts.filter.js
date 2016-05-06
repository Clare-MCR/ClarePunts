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
      to = new Date(to);
      from = new Date(from);
      if (from.getTime() === to.getTime()) {
        to.setHours(24, 0, 0, 0);
      }
      bookings = bookings.filter(function (booking) {
        return new Date(booking.time_from) <= to && new Date(booking.time_to) >= from;
      });
      return bookings;
    };
  }
})();

/**
 * Created by rg12 on 02/05/2016.
 */
(function () {
  'use strict';

  angular
    .module('blocks.filter')
    .filter('bookingsByPunt', bookingsByPunt);

  function bookingsByPunt() {
    return function (bookings, puntid) {
      return bookings.filter(function (booking) {
        var output = true;
        if (puntid) {
          output = booking.puntid === puntid;
        }
        return output;
      });
    };
  }
})();

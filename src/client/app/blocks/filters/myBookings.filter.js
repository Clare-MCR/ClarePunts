/**
 * Created by rg12 on 02/05/2016.
 */
(function () {
  'use strict';

  angular
    .module('blocks.filter')
    .filter('myBookings', myBookings);


  function myBookings() {
    return function (bookings, crsid, type) {
      var now = new Date();
      bookings = bookings.filter(function (booking) {
        var output = false;
        if (type === 'PORTER') {
          output = new Date(booking.time_to) >= now;
        } else {
          output = new Date(booking.time_to) >= now && booking.booker === crsid;
        }
        return output;
      });
      return bookings;
    };
  }
})();

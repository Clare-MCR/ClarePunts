/**
 * Created by rg12 on 02/05/2016.
 */
(function () {
  'use strict';

  angular
    .module('blocks.filter')
    .filter('bookingsToCalendarChart', bookingsToCalendarChart);

  function bookingsToCalendarChart() {
    return function (bookings) {
      var results = {}, rarr = [], i, date;
      for (i = 0; i < bookings.length; i++) {
        // get the date
        var dt = new Date(bookings[i].timeFrom);
        date = [dt.getFullYear(), dt.getMonth(), dt.getDate()].join('-');
        results[date] = results[date] || 0;
        results[date]++;
      }
      for (i in results) {
        if (results.hasOwnProperty(i)) {
          rarr.push({c: [{v: new Date(i)}, {v: results[i]}]});
        }
      }
      return rarr;
    };
  }
})();

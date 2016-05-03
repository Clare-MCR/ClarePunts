(function () {
  'use strict';

  angular
    .module('app.bookings')
    .controller('BookAPuntController', BookAPuntController);

  BookAPuntController.$inject = ['$scope', 'bookingServices', 'bookingsPrepService', 'puntsPrepService', 'userPrepService', 'logger'];
  /* @ngInject */
  function BookAPuntController($scope, bookingServices, bookingsPrepService, puntsPrepService, userPrepService, logger) {
    var vm = this;

    vm.maxTime = maxTime;
    vm.minTime = minTime;
    vm.updateDuration = updateDuration;
    vm.changeInDate = changeInDate;
    vm.submit = submit;
    vm.punts = puntsPrepService;
    vm.bookings = bookingsPrepService;
    vm.user = userPrepService;
    vm.userTypes = ['PORTER', 'STAFF', 'FELLOW', 'MCR', 'UCS'];
    vm.user.hasUpcoming = false;
    vm.now = new Date();
    vm.form = {
      name: vm.user.name,
      mobile: vm.user.phone,
      start: new Date().setHours(0, 0, 0, 0),
      end: new Date().setHours(0, 0, 0, 0),
      punt: '',
      booker: vm.user.crsid,
      type: vm.user.type
    };
    vm.options = {
      datepickerMode: 'day',
      minDate: new Date().setHours(0, 0, 0, 0),
      minTime: new Date().setMinutes(0, 0, 0),
      showWeeks: false,
      durationMax: vm.maxTime(),
      durationMin: vm.minTime()
    };


    activate();

    function activate() {
      vm.user.hasUpcoming = hasUpcoming();
    }

    function hasUpcoming() {
      return vm.bookings.filter(function (booking) {
          var output = false;
          if (vm.user.type === 'PORTER') {
            output = new Date(booking.time_to) >= vm.now;
          } else {
            output = new Date(booking.time_to) >= vm.now && booking.booker === vm.user.crsid;
          }
          return output;
        }).length !== 0;
    }

    function maxTime() {
      var time = new Date(vm.form.start);
      var timePlus3 = new Date(vm.form.start);
      var nightTime = new Date(vm.form.start).setHours(7, 0, 0, 0);
      var midnight = new Date(vm.form.start).setHours(24, 0, 0, 0);
      timePlus3.setHours(time.getHours() + 3);

      if (timePlus3 >= midnight) {
        return midnight;
      }
      if (time <= nightTime && timePlus3 <= nightTime) {
        return nightTime;
      }
      return timePlus3;
    }

    function minTime() {
      var time = new Date(vm.form.start);
      var nightTime = new Date(vm.form.start).setHours(7, 0, 0, 0);
      if (time < nightTime) {
        time.setHours(7, 0, 0, 0);
      } else {
        time.setMinutes(time.getMinutes() + 30);
      }
      return time;
    }

    function updateDuration() {
      vm.options.durationMax = vm.maxTime();
      vm.options.durationMin = vm.minTime();
      vm.form.end = vm.options.durationMin;
    }

    function changeInDate() {
      vm.form.start = new Date(vm.form.start).setHours(0, 0, 0, 0);
      vm.form.end = new Date(vm.form.start);
    }

    function submit() {
      $scope.$broadcast('show-errors-check-validity');
      if ($scope.bookingForm.$invalid) {
        logger.warning('Form Invalid');
      } else {
        var entry = new bookingServices;
        entry.data = {
          puntid: vm.form.punt,
          booker: vm.form.booker,
          type: vm.form.type,
          name: vm.form.name,
          mobile: vm.form.mobile,
          time_from: new Date(vm.form.start),
          time_to: new Date(vm.form.end)
        };
        entry.$save();
        logger.success('Booking Submitted');
      }


    }

  }
})();

(function () {
  'use strict';

  angular
    .module('app.bookings')
    .controller('BookAPuntController', BookAPuntController);

  BookAPuntController.$inject = ['$filter', 'BookingServices', 'bookingsPrepService',
    'puntsPrepService', 'userPrepService', 'logger', '$state'];

  /* @ngInject */
  function BookAPuntController($filter, BookingServices, bookingsPrepService,
                               puntsPrepService, userPrepService, logger, $state) {
    var vm = this;

    vm.changeInDate = changeInDate;
    vm.onSubmit = onSubmit;

    vm.title = {
      calendar: 'Choose A Date',
      form: $state.current.title,
      conflicts: 'Conflicts',
      dates: 'Term Dates'
    };
    vm.now = new Date();
    vm.dt = new Date(vm.now.getTime() - (60000 * vm.now.getTimezoneOffset()));
    vm.MichaelmasTerm = {start: '', end: ''};
    vm.LentTerm = {start: '', end: ''};
    vm.EasterTerm = {start: '', end: ''};
    vm.inTerm = true;
    vm.currentTerm = '';
    vm.punts = puntsPrepService;
    vm.bookings = bookingsPrepService;
    vm.user = userPrepService;
    vm.userTypes = [];
    vm.form = {};
    vm.formFields = [];
    vm.options = {};
    vm.canBook = true;
    vm.bookingErrorMessage = '';

    activate();

    /////////////////////////////////////////////////////////////////////

    vm.userTypes = [
      {name: 'Porter', value: 'PORTER'},
      {name: 'Staff', value: 'STAFF'},
      {name: 'Fellow', value: 'FELLOW'},
      {name: 'MCR member', value: 'MCR'},
      {name: 'UCS member', value: 'UCS'}
    ];

    vm.form = {
      name: vm.user.name,
      phone: vm.user.phone,
      timeFrom: vm.dt,
      booker: vm.user.crsid,
      type: vm.user.type
    };

    vm.options = {
      datepickerMode: 'day',
      minDate: new Date(),
      showWeeks: false
    };
    vm.options.minDate.setUTCHours(0, 0, 0, 0);

    // note, these field types will need to be
    // pre-defined. See the pre-built and custom templates
    // http://docs.angular-formly.com/v6.4.0/docs/custom-templates
    vm.formFields = [
      {
        key: 'name',
        type: 'horizontalInput',
        templateOptions: {
          type: 'text',
          label: 'Name:',
          placeholder: 'Enter name',
          required: true
        }
      },
      {
        key: 'booker',
        type: 'horizontalInput',
        templateOptions: {
          type: 'text',
          label: 'CRSID:',
          placeholder: 'Enter CRSID'
        },
        hideExpression: function () {
          return vm.user.type !== 'PORTER' && vm.user.admin !== '1';
        },
        validators: {
          crsid: {
            expression: function (viewValue, modelValue) {
              var value = modelValue || viewValue;
              return /[a-z]{2,6}[0-9]+/.test(value);
            }
          }
        },
        watcher: {
          listener: function (field, newValue) {
            if (newValue) {
              bookingAllowed();
            }
          }
        },
        expressionProperties: {
          'templateOptions.required': function () {
            return vm.user.type === 'PORTER' || vm.user.admin === '1';
          }
        }
      },
      {
        key: 'type',
        type: 'horizontalSelect',
        templateOptions: {
          label: 'User type:',
          options: vm.userTypes
        },
        hideExpression: function () {
          return vm.user.type !== 'PORTER' && vm.user.admin !== '1';
        },
        watcher: {
          listener: function (field, newValue) {
            if (newValue) {
              bookingAllowed();
            }
          }
        },
        expressionProperties: {
          'templateOptions.required': function () {
            return vm.user.type === 'PORTER' || vm.user.admin === '1';
          }
        }
      },
      {
        key: 'phone',
        type: 'phone',
        templateOptions: {
          type: 'text',
          label: 'Mobile:',
          placeholder: 'Enter mobile',
          required: true
        }
      },
      {
        key: 'puntid',
        type: 'horizontalSelect',
        templateOptions: {
          label: 'Punt:',
          options: [],
          required: true
        },
        expressionProperties: {
          'templateOptions.options': function ($viewValue, $modelValue, scope) {
            var availablePunts = $filter('puntActive')(vm.punts, scope.model.timeFrom);

            if (scope.model.timeFrom && scope.model.timeTo) {
              var usedPunts = [];
              var bookings = $filter('conflictBookings')(vm.bookings, scope.model.timeFrom, scope.model.timeTo);
              for (var i = 0; i < bookings.length; i++) {
                usedPunts.push(bookings[i].puntid);
              }
              availablePunts = availablePunts.filter(function (punt) {
                return usedPunts.indexOf(punt.id) < 0;
              });
            }
            availablePunts.forEach(function (punt) {
              punt.value = punt.id;
            });
            return availablePunts;
          }
        }

      },
      {
        key: 'timeFrom',
        type: 'horizontalSelect',
        templateOptions: {
          label: 'Start Time:',
          options: [],
          required: true
        },
        expressionProperties: {
          'templateOptions.options': function () {
            return [
              {name: '00:00am', value: new Date(vm.dt).setUTCHours(0, 0, 0, 0)},
              {name: '07:00am', value: new Date(vm.dt).setUTCHours(7, 0, 0, 0)},
              {name: '08:00am', value: new Date(vm.dt).setUTCHours(8, 0, 0, 0)},
              {name: '09:00am', value: new Date(vm.dt).setUTCHours(9, 0, 0, 0)},
              {name: '10:00am', value: new Date(vm.dt).setUTCHours(10, 0, 0, 0)},
              {name: '11:00am', value: new Date(vm.dt).setUTCHours(11, 0, 0, 0)},
              {name: '12:00pm', value: new Date(vm.dt).setUTCHours(12, 0, 0, 0)},
              {name: '01:00pm', value: new Date(vm.dt).setUTCHours(13, 0, 0, 0)},
              {name: '02:00pm', value: new Date(vm.dt).setUTCHours(14, 0, 0, 0)},
              {name: '03:00pm', value: new Date(vm.dt).setUTCHours(15, 0, 0, 0)},
              {name: '04:00pm', value: new Date(vm.dt).setUTCHours(16, 0, 0, 0)},
              {name: '05:00pm', value: new Date(vm.dt).setUTCHours(17, 0, 0, 0)},
              {name: '06:00pm', value: new Date(vm.dt).setUTCHours(18, 0, 0, 0)},
              {name: '07:00pm', value: new Date(vm.dt).setUTCHours(19, 0, 0, 0)},
              {name: '08:00pm', value: new Date(vm.dt).setUTCHours(20, 0, 0, 0)},
              {name: '09:00pm', value: new Date(vm.dt).setUTCHours(21, 0, 0, 0)},
              {name: '10:00pm', value: new Date(vm.dt).setUTCHours(22, 0, 0, 0)},
              {name: '11:00pm', value: new Date(vm.dt).setUTCHours(23, 0, 0, 0)}
            ];
          }
        }
      },
      {
        key: 'timeTo',
        type: 'horizontalSelect',
        templateOptions: {
          label: 'Duration:',
          options: [],
          required: true
        },
        expressionProperties: {
          'templateOptions.options': function ($viewValue, $modelValue, scope) {
            var startTime = new Date(scope.model.timeFrom);
            var endTime = new Date(startTime);
            var nightTime = new Date(startTime);
            var midnight = new Date(startTime);
            endTime.setUTCHours(startTime.getUTCHours() + 3);
            nightTime.setUTCHours(7, 0, 0, 0);
            midnight.setUTCHours(24, 0, 0, 0);
            if (startTime < nightTime) {
              return [{name: '7hr', value: new Date(vm.dt).setUTCHours(7, 0, 0, 0)}];
            }
            var output;
            switch (new Date(midnight - startTime).getHours()) {
              case 0:
                output = [];
                break;
              case 1:
                output = [{name: '1hr', value: midnight.setUTCHours(23, 59, 59)}];
                break;
              case 2:
                output = [
                  {name: '1hr', value: new Date(startTime).setUTCHours(23, 0, 0, 0)},
                  {name: '2hr', value: midnight.setUTCHours(23, 59, 59)}];
                break;
              case 3:
                output = [
                  {name: '1hr', value: new Date(startTime).setUTCHours(22, 0, 0, 0)},
                  {name: '2hr', value: new Date(startTime).setUTCHours(23, 0, 0, 0)},
                  {name: '3hr', value: midnight.setUTCHours(23, 59, 59)}];
                break;
              default:
                output = [
                  {name: '1hr', value: endTime.setUTCHours(startTime.getUTCHours() + 1)},
                  {name: '2hr', value: endTime.setUTCHours(startTime.getUTCHours() + 2)},
                  {name: '3hr', value: endTime.setUTCHours(startTime.getUTCHours() + 3)}
                ];
                break;
            }
            return output;
          }
        }
      }
    ];

    function activate() {
      logger.info('Viewing ' + $state.current.title);
      setTerm();
      bookingAllowed();
    }

    function userHasUpcoming(crsid) {
      return vm.bookings.filter(function (booking) {
          return new Date(booking.timeTo) >= vm.now && booking.booker === crsid;
        }).length !== 0;
    }

    function userBookingOnDay(crsid) {
      var bookings = vm.bookings.filter(function (booking) {
        var today0 = new Date(vm.dt);
        var today24 = new Date(vm.dt);
        today0.setUTCHours(0, 0, 0, 0);
        today24.setUTCHours(24, 0, 0, 0);
        return new Date(booking.timeTo) >= today0 && new Date(booking.timeFrom) < today24 && booking.booker === crsid;
      });
      if (bookings.length !== 0) {
        vm.canBook = false;
        vm.bookingErrorMessage = 'Users are restricted to 1 booking per day!';
      } else {
        vm.canBook = true;
        vm.bookingErrorMessage = '';
      }
      return vm.canBook;
    }

    function conflictBookings() {
      return $filter('conflictBookings')(vm.bookings, vm.form.timeFrom, vm.form.timeTo);
    }

    function conflictBookingsType(userType) {
      return vm.conflicts.filter(function (booking) {
        return booking.type === userType;
      });
    }

    function setTerm() {
      var year = vm.now.getFullYear();
      vm.MichaelmasTerm.start = new Date(year, 9, 1, 0, 0, 0, 0);
      vm.MichaelmasTerm.end = new Date(year, 11, 19, 0, 0, 0, 0);

      vm.LentTerm.start = new Date(year, 0, 5, 0, 0, 0, 0);
      vm.LentTerm.end = new Date(year, 2, 25, 0, 0, 0, 0);

      vm.EasterTerm.start = new Date(year, 3, 10, 0, 0, 0, 0);
      vm.EasterTerm.end = new Date(year, 5, 18, 0, 0, 0, 0);

      var michaelmas = (vm.MichaelmasTerm.start <= vm.now && vm.MichaelmasTerm.end >= vm.now);
      var lent = (vm.LentTerm.start <= vm.now && vm.LentTerm.end >= vm.now);
      var easter = (vm.EasterTerm.start <= vm.now && vm.EasterTerm.end >= vm.now);
      vm.inTerm = michaelmas || lent || easter;

      if (michaelmas) {
        vm.currentTerm = 'Michaelmas';
      } else if (lent) {
        vm.currentTerm = 'Lent';
      } else if (easter) {
        vm.currentTerm = 'Easter';
      }
    }

    function termRestrictions(crsid) {
      if (vm.inTerm) {
        var term = {};
        switch (vm.currentTerm) {
          case 'Michaelmas':
            term = vm.MichaelmasTerm;
            break;
          case 'Lent':
            term = vm.LentTerm;
            break;
          case 'Easter':
            term = vm.EasterTerm;
            break;
          default:
            term = {start: null, end: null};
        }
        return BookingServices.query({Id: '*', from: term.start, to: term.end}, function (data) {
          return data.filter(function (item) {
              return item.booker === crsid;
            }) >= 0;
        });
      }
    }

    function bookingAllowed() {
      //is user authorised
      if (!vm.user.authorised) {
        vm.bookingErrorMessage = 'You are not authorised!';
        vm.canBook = false;
        return false;
      }
      // check for bookings on day
      if (!userBookingOnDay(vm.form.booker)) {
        return false;
      }
      // Check if the user has any upcoming bookings
      // if (vm.form.type !== 'PORTER') {
      //   if (userHasUpcoming(vm.form.booker)) {
      //     vm.bookingErrorMessage = 'Users are restricted to 1 upcoming booking!';
      //     vm.canBook = false;
      //     return;
      //   }
      // }
      // check for conflicts/ 3 boat restriction
      vm.conflicts = conflictBookings();
      if (vm.conflicts.length > 0) {
        if (conflictBookingsType(vm.form.type).length >= 3) {
          vm.bookingErrorMessage = 'At most 3 punts can be concurrently booked by ' + vm.form.type + '!';
          vm.canBook = false;
          return;
        }
      }
      // check for term time restrictions (Only applicable to staff and Fellows)
      if (vm.form.type === 'STAFF' || vm.form.type === 'FELLOW') {
        if (termRestrictions(vm.form.booker)) {
          vm.bookingErrorMessage = 'Staff and Fellows are restricted to 1 booking each during term time!';
          vm.canBook = false;
          return;
        }
      }
      vm.canBook = true;
      return true;
    }

    function changeInDate() {
      vm.form.timeFrom = new Date(vm.form.timeFrom)
        .setUTCFullYear(vm.dt.getUTCFullYear(), vm.dt.getUTCMonth(), vm.dt.getUTCDate());
      userBookingOnDay(vm.form.booker);
    }

    function resetForm() {
      vm.form = {
        name: vm.user.name,
        phone: vm.user.phone,
        timeFrom: vm.dt,
        booker: vm.user.crsid,
        type: vm.user.type
      };
    }

    function onSubmit(data) {
      var puntid = data.puntid;
      bookingAllowed();
      if (!vm.canBook) {
        logger.error('Booking not allowed');
        return;
      }
      if (new Date(data.timeFrom) < vm.now) {
        logger.error('You can\'t make bookings in the past');
        return;
      }
      data.timeFrom = data.timeFrom / 1000;
      data.timeTo = data.timeTo / 1000;
      BookingServices.save({Id: null, from: null, to: null}, data, function () {
        data.timeFrom = new Date(data.timeFrom * 1000);
        data.timeTo = new Date(data.timeTo * 1000);
        data.userType = data.type;
        //@todo work out why puntid is undefined if viewed
        data.puntid = puntid;
        vm.bookings.push(data);
        resetForm();
        bookingAllowed();
        logger.success('Booking submitted successfully!', data);
      }, function (err) {
        logger.error('Something went wrong with the booking!', err);
      });
    }
  }
})();

(function () {
  'use strict';

  angular
    .module('app.bookings')
    .controller('BookAPuntController', BookAPuntController);

  BookAPuntController.$inject = ['$filter', 'BookingServices', 'bookingsPrepService',
    'puntsPrepService', 'userPrepService', 'logger'];
  /* @ngInject */
  function BookAPuntController($filter, BookingServices, bookingsPrepService,
                               puntsPrepService, userPrepService, logger) {
    var vm = this;

    vm.changeInDate = changeInDate;
    vm.onSubmit = onSubmit;

    vm.title = {
      calendar: 'Choose A Date',
      form: 'Book A Punt',
      conflicts: 'Conflicts',
      dates: 'Term Dates'
    };
    vm.now = new Date();
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
      timeFrom: new Date(),
      timeTo: new Date(),
      puntid: '',
      booker: vm.user.crsid,
      type: vm.user.type
    };
    vm.form.timeFrom.setHours(0, 0, 0, 0);
    vm.form.timeTo.setHours(7, 0, 0, 0);

    vm.options = {
      datepickerMode: 'day',
      minDate: new Date(),
      showWeeks: false
    };
    vm.options.minDate.setHours(0, 0, 0, 0);

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
          return vm.user.type !== 'PORTER';
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
            return vm.user.type === 'PORTER';
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
          return vm.user.type !== 'PORTER';
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
            return vm.user.type === 'PORTER';
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
            availablePunts.forEach(function (punt) {
              punt.value = punt.id;
            });
            return availablePunts;
          }
        }
      },
      {
        key: 'timeFrom',
        type: 'timepicker',
        templateOptions: {
          label: 'Start Time:',
          hourStep: 1,
          minuteStep: 15,
          showMeridian: true,
          min: new Date(),
          max: new Date().setHours(24, 0, 0, 0),
          readonlyInput: true
        },
        watcher: {
          listener: function (field, newValue) {
            if (newValue) {
              bookingAllowed();
            }
          }
        },
        expressionProperties: {
          'templateOptions.max': function ($viewValue, $modelValue, scope) {
            return new Date(scope.model.timeFrom).setHours(24, 0, 0, 0);
          }
        }
      },

      {
        key: 'timeTo',
        type: 'timepicker',
        templateOptions: {
          label: 'Finish Time:',
          hourStep: 1,
          minuteStep: 15,
          showMeridian: true,
          readonlyInput: true
        },
        watcher: {
          listener: function (field, newValue) {
            if (newValue) {
              bookingAllowed();
            }
          }
        },
        expressionProperties: {
          // @todo fix min max restrictions
          'templateOptions.max': function ($viewValue, $modelValue, scope) {
            var startTime = new Date(scope.model.timeFrom);
            var endtTime = new Date(scope.model.timeTo);
            var nightTime = new Date(endtTime);
            var midnight = new Date(endtTime);

            endtTime.setHours(startTime.getHours() + 3);
            nightTime.setHours(7, 0, 0, 0);
            midnight.setHours(24, 0, 0, 0);

            if (endtTime >= midnight) {
              return midnight;
            }
            if (startTime <= nightTime && endtTime <= nightTime) {
              return nightTime;
            }
            return endtTime;
          },
          'templateOptions.min': function ($viewValue, $modelValue, scope) {
            var time = new Date(scope.model.timeFrom);
            var nightTime = new Date(scope.model.timeFrom);
            nightTime.setHours(7, 0, 0, 0);
            if (time < nightTime) {
              time.setHours(7, 0, 0, 0);
            } else {
              time.setMinutes(time.getMinutes() + 30);
            }
            return time;
          }
        }
      }
    ];

    activate();

    function activate() {
      setTerm();
      bookingAllowed();
    }

    function userHasUpcoming(crsid) {
      return vm.bookings.filter(function (booking) {
          /*jshint camelcase: false */
          return new Date(booking.time_to) >= vm.now && booking.booker === crsid;
        }).length !== 0;
    }

    function conflictBookings() {
      return vm.bookings.filter(function (booking) {
        /*jshint camelcase: false */
        return new Date(booking.time_from) <= vm.form.timeTo &&
          new Date(booking.time_to) >= vm.form.timeFrom;
      });
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
      // Check if the user has any upcoming bookings
      if (vm.form.type !== 'PORTER') {
        if (userHasUpcoming(vm.form.booker)) {
          vm.bookingErrorMessage = 'Users are restricted to 1 upcoming booking';
          vm.canBook = false;
          return;
        }
      }
      // check for conflicts/ 3 boat restriction
      vm.conflicts = conflictBookings();
      if (vm.conflicts.length > 0) {
        if (conflictBookingsType(vm.form.type).length >= 3) {
          vm.bookingErrorMessage = 'At most 3 punts can be concurrently booked by ' + vm.form.type;
          vm.canBook = false;
          return;
        }
      }
      // check for term time restrictions (Only applicable to staff and Fellows)
      if (vm.form.type === 'STAFF' || vm.form.type === 'FELLOW') {
        if (termRestrictions(vm.form.booker)) {
          vm.bookingErrorMessage = 'Staff and Fellows are restricted to 1 booking each during term time';
          vm.canBook = false;
        }
      } else {
        vm.canBook = true;
      }
    }

    function changeInDate() {
      vm.form.timeFrom = new Date(vm.form.timeFrom).setHours(0, 0, 0, 0);
      vm.form.timeTo = new Date(vm.form.timeFrom).setHours(7, 0, 0, 0);
    }

    function onSubmit(data) {
      data.timeFrom = data.timeFrom.getTime() / 1000;
      data.timeTo = data.timeTo.getTime() / 1000;
      BookingServices.save({Id: null, from: null, to: null}, data, function () {
        vm.bookings.push(data);
        bookingAllowed();
        logger.success('Booking Submitted Successfully');
      }, function () {
        logger.error('Something went wrong with the Booking');
      });
    }
  }
})();

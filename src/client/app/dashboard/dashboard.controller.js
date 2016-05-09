(function () {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['bookingsPrepService', 'puntsPrepService', 'logger'];
  /* @ngInject */
  function DashboardController(bookingsPrepService, puntsPrepService, logger) {
    var vm = this;
    vm.title = 'Status Today';
    vm.punts = puntsPrepService;
    vm.bookings = bookingsPrepService;

    activate();

    function activate() {
      logger.info('Viewing Punt Status');
    }
  }
})();

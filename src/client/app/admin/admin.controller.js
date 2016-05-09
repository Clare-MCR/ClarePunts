(function () {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminController', AdminController);

  AdminController.$inject = ['routerHelper', 'userPrepService', 'logger'];
  /* @ngInject */
  function AdminController(routerHelper, userPrepService, logger) {
    var vm = this;
    vm.user = userPrepService;
    vm.title = 'Admin home';
    vm.adminRoutes = [];
    var states = routerHelper.getStates();
    vm.todo = [
      'Fix delete booking pop in my bookings',
      'Fix Calendar style to show selected date',
      'Fix restrictions for staff/fellows'
    ];
    activate();

    function activate() {
      logger.info('Activated Admin View');
      getNavRoutes();
    }

    function getNavRoutes() {
      vm.adminRoutes = states.filter(function (r) {
        return r.settings && r.settings.nav && r.settings.admin;
      }).sort(function (r1, r2) {
        return r1.settings.nav - r2.settings.nav;
      });
    }

  }
})();

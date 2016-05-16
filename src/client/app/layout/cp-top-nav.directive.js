(function () {
  'use strict';

  angular
    .module('app.layout')
    .directive('cpTopNav', cpTopNav);

  /* @ngInject */
  function cpTopNav() {
    var directive = {
      bindToController: true,
      controller: TopNavController,
      controllerAs: 'vm',
      restrict: 'EA',
      scope: {},
      templateUrl: 'app/layout/cp-top-nav.html'
    };

    TopNavController.$inject = ['$state', 'routerHelper', 'config', 'UserServices'];

    /* @ngInject */
    function TopNavController($state, routerHelper, config, UserServices) {
      var vm = this;
      vm.title = config.appTitle;
      vm.user = '';
      vm.admin = false;
      vm.navRoutes = [];
      vm.adminRoutes = [];
      var states = routerHelper.getStates();
      vm.isCurrent = isCurrent;

      activate();

      function activate() {
        getNavRoutes();
        getuser();
      }

      function getNavRoutes() {
        vm.navRoutes = states.filter(function (r) {
          return r.settings && r.settings.nav && !r.settings.admin;
        }).sort(function (r1, r2) {
          return r1.settings.nav - r2.settings.nav;
        });
        vm.adminRoutes = states.filter(function (r) {
          return r.settings && r.settings.nav && r.settings.admin;
        }).sort(function (r1, r2) {
          return r1.settings.nav - r2.settings.nav;
        });
      }

      function getuser() {
        vm.user = UserServices.get(function () {
          vm.admin = Boolean(vm.user.admin);
          console.log(vm.user);
        });
      }

      function isCurrent(route) {
        if (!route.title || !$state.current || !$state.current.title) {
          return '';
        }
        var menuName = route.title;
        return $state.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
      }
    }

    return directive;
  }
})();

/**
 * Created by rg12 on 02/05/2016.
 */
(function () {
  'use strict';

  angular
    .module('app.layout')
    .controller('TopnavController', TopnavController);

  TopnavController.$inject = ['$state', 'routerHelper', 'config'];
  /* @ngInject */
  function TopnavController($state, routerHelper, config) {
    var vm = this;
    vm.title = config.appTitle;

    var states = routerHelper.getStates();
    vm.isCurrent = isCurrent;

    activate();

    function activate() {
      getNavRoutes();
    }

    function getNavRoutes() {
      vm.navRoutes = states.filter(function (r) {
        return r.settings && r.settings.nav;
      }).sort(function (r1, r2) {
        return r1.settings.nav - r2.settings.nav;
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
})();

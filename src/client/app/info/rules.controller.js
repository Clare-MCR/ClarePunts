(function () {
  'use strict';

  angular
    .module('app.info')
    .controller('RulesController', RulesController);

  RulesController.$inject = ['settingsPrepServices', 'logger', '$state'];

  /* @ngInject */
  function RulesController(settingsPrepServices, logger, $state) {
    var vm = this;

    vm.title = $state.current.title;
    vm.rules = settingsPrepServices;

    activate();

    function activate() {
      logger.info('Viewing ' + $state.current.title);
    }
  }
})();


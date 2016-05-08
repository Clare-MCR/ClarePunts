(function () {
  'use strict';

  angular
    .module('app.info')
    .controller('RulesController', RulesController);

  RulesController.$inject = ['settingsPrepServices', 'logger'];

  /* @ngInject */
  function RulesController(settingsPrepServices, logger) {
    var vm = this;

    vm.title = 'Punt Rules';
    vm.rules = settingsPrepServices;

    activate();

    function activate() {
      logger.info('Viewing Punt Rules');
    }
  }
})();


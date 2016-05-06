(function () {
  'use strict';

  angular
    .module('app.mySettings')
    .controller('RulesController', RulesController);

  RulesController.$inject = ['settingsPrepServices'];

  /* @ngInject */
  function RulesController(settingsPrepServices) {
    var vm = this;

    vm.title = 'Punt Rules';
    vm.rules = settingsPrepServices;
    console.log(vm.rules);
  }
})();


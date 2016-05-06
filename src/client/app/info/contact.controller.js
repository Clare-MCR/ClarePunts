(function () {
  'use strict';

  angular
    .module('app.info')
    .controller('ContactController', ContactController);

  ContactController.$inject = ['settingsPrepServices'];

  /* @ngInject */
  function ContactController(settingsPrepServices) {
    var vm = this;

    vm.title = 'Punt Committee';
    vm.contact = settingsPrepServices;
  }
})();


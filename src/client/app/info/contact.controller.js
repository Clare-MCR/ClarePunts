(function () {
  'use strict';

  angular
    .module('app.info')
    .controller('ContactController', ContactController);

  ContactController.$inject = ['settingsPrepServices', 'logger'];

  /* @ngInject */
  function ContactController(settingsPrepServices, logger) {
    var vm = this;

    vm.title = 'Punt Committee';
    vm.contact = settingsPrepServices;

    activate();

    function activate() {
      logger.info('Viewing Punt Rules');
    }
  }
})();


(function () {
  'use strict';

  angular
    .module('app.info')
    .controller('ContactController', ContactController);

  ContactController.$inject = ['settingsPrepServices', 'logger', '$state'];

  /* @ngInject */
  function ContactController(settingsPrepServices, logger, $state) {
    var vm = this;

    vm.title = $state.current.title;
    vm.contact = settingsPrepServices;

    activate();

    function activate() {
      logger.info('Viewing ' + $state.current.title);
    }
  }
})();


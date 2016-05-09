(function () {
  'use strict';

  angular
    .module('app.core', [
      /* Angular Modules */
      'ngAnimate', 'ngResource', //'ngSanitize',
      /* our Stuff */
      'blocks.exception', 'blocks.logger', 'blocks.router', 'blocks.filter', 'blocks.modal',
      /* External */
      'ui.router', 'ngplus', 'ui.bootstrap', 'checklist-model', 'formly',
      'formlyBootstrap', 'daterangepicker', 'textAngular', 'googlechart'
    ]);
})();

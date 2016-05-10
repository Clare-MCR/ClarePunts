(function () {
  'use strict';

  angular
    .module('blocks.modal')
    .service('modalService', modalService);

  modalService.$inject = ['$uibModal'];

  /* @ngInject */
  function modalService($uibModal) {
    /* jshint validthis:true */
    var vm = this;
    var modalDefaults = {
      backdrop: true,
      keyboard: true,
      modalFade: true,
      templateUrl: 'app/blocks/modal/modal.html'
    };

    var modalOptions = {
      closeButtonText: 'Close',
      actionButtonText: 'OK',
      headerText: 'Proceed?',
      bodyText: 'Perform this action?'
    };

    vm.showModal = function (customModalDefaults, customModalOptions) {
      if (!customModalDefaults) {
        customModalDefaults = {};
      }
      customModalDefaults.backdrop = 'static';
      return this.show(customModalDefaults, customModalOptions);
    };

    vm.show = function (customModalDefaults, customModalOptions) {
      //Create temp objects to work with since we're in a singleton service
      var tempModalDefaults = {};
      var tempModalOptions = {};

      //Map angular-ui modal custom defaults to modal defaults defined in service
      angular.extend(tempModalDefaults, modalDefaults, customModalDefaults);

      //Map modal.html $scope custom properties to defaults defined in service
      angular.extend(tempModalOptions, modalOptions, customModalOptions);

      if (!tempModalDefaults.controller) {
        tempModalDefaults.controller = tempModalDefaultsCtrl;
      }

      tempModalDefaultsCtrl.$inject = ['$scope', '$uibModalInstance'];

      /* @ngInject */
      function tempModalDefaultsCtrl($scope, $uibModalInstance) {
        $scope.modalOptions = tempModalOptions;
        $scope.modalOptions.ok = function (result) {
          $uibModalInstance.close(result);
        };
        $scope.modalOptions.close = function (result) {
          $uibModalInstance.dismiss('cancel');
        };
      }

      return $uibModal.open(tempModalDefaults).result;
    };
  }
}());


(function () {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminSettingsController', AdminSettingsController);

  AdminSettingsController.$inject = ['userPrepService', 'modalService', 'SettingsServices', 'logger'];
  /* @ngInject */
  function AdminSettingsController(userPrepService, modalService, SettingsServices, logger) {
    var vm = this;

    vm.updateOptions = updateOptions;
    vm.user = userPrepService;
    vm.title = {rules: 'Update Punt Rules', committee: 'Update Committee Page'};
    vm.rules = SettingsServices.get();
    vm.committee = SettingsServices.get({Type: 'committee'});

    activate();

    function activate() {
      logger.info('Activated Admin Punt Rules View');
    }

    function updateOptions(option, data) {
      var modalOptions = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Update' + toTitleCase(option),
        headerText: 'Update' + toTitleCase(option),
        bodyText: 'Are you sure you want to update the ' + toTitleCase(option) + '?'
      };

      modalService.showModal({}, modalOptions).then(function () {
        SettingsServices.update({Type: option}, data, function () {
          logger.success(toTitleCase(option) + ' updated successfully');
        }, function () {
          logger.error('Something went wrong updating the ' + option);
        });
      });
    }

    function toTitleCase(str) {
      return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }
  }
})();

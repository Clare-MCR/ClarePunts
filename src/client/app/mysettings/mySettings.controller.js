(function () {
  'use strict';

  angular
    .module('app.mySettings')
    .controller('MySettingsController', MySettingsController);

  MySettingsController.$inject = ['UserServices', 'userPrepService', 'logger'];

  /* @ngInject */
  function MySettingsController(UserServices, userPrepService, logger) {
    var vm = this;
    vm.title = 'My Settings';
    vm.updateUser = updateUser;
    vm.user = userPrepService;
    vm.form = {
      name: vm.user.name,
      phone: vm.user.phone //@todo standardise phone/mobile across databases
    };

    vm.formFields = [
      {
        key: 'name',
        type: 'horizontalInput',
        templateOptions: {
          type: 'text',
          label: 'Name:',
          placeholder: 'Enter name',
          required: true
        },
        validation: {
          messages: {
            required: 'Name is Required'
          }
        }
      },
      {
        key: 'phone',
        type: 'phone',
        templateOptions: {
          type: 'text',
          label: 'Mobile',
          placeholder: 'Enter mobile',
          required: true
        }
      }
    ];

    function updateUser(data) {
      UserServices.update({Id: vm.user.crsid}, data, function () {
        logger.success('Settings Updated');
      }, function (error) {
        logger.error('Something went wrong updating your settings');
      });

    }

  }
})();

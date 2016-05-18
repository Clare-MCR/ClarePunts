(function () {
  'use strict';

  angular
    .module('app.mySettings')
    .controller('MySettingsController', MySettingsController);

  MySettingsController.$inject = ['UserServices', 'logger', '$state'];

  /* @ngInject */
  function MySettingsController(UserServices, logger, $state) {
    var vm = this;
    vm.title = $state.current.title;
    vm.updateUser = updateUser;
    vm.form = {};
    vm.user = UserServices.get(function () {
      vm.form.name = vm.user.name;
      vm.form.phone = vm.user.phone; //@todo standardise phone/mobile across databases
    });

    activate();

    function activate() {
      logger.info('Viewing My Settings');
    }

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
      data.crsid = vm.user.crsid;
      UserServices.update(data, function () {
        logger.success('Settings Updated');
      }, function () {
        logger.error('Something went wrong updating your settings');
      });

    }

  }
})();

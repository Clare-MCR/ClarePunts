(function () {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminPuntsController', AdminPuntsController);

  AdminPuntsController.$inject = ['userPrepService', 'PuntsServices', 'puntsPrepService',
    'bookingsPrepService', 'logger', 'modalService'];
  /* @ngInject */
  function AdminPuntsController(userPrepService, PuntsServices, puntsPrepService,
                                bookingsPrepService, logger, modalService) {
    var vm = this;

    vm.deletePunt = deletePunt;
    vm.onSubmit = onSubmit;
    vm.user = userPrepService;
    vm.title = {
      status: 'Status Today',
      newPunt: 'Add New Punt',
      editPunt: 'Edit Punt',
      deletePunt: 'Delete Punt'
    };
    vm.punts = puntsPrepService;
    vm.bookings = bookingsPrepService;

    vm.newPuntForm = {dateRange: {}};
    vm.editPuntForm = {dateRange: {}};
    vm.deletePuntForm = [];
    vm.newPuntFormFields = [];
    vm.editPuntFormFields = [];

    activate();

    vm.newPuntFormFields = [
      {
        key: 'name',
        type: 'horizontalInput',
        templateOptions: {
          type: 'text',
          label: 'Name:',
          placeholder: 'Enter punt name',
          required: true
        }
      },
      {
        key: 'dateRange',
        type: 'daterange',
        templateOptions: {
          label: 'Availability:',
          placeholder: 'Select when the punt is available',
          required: true
        }
      }
    ];
    vm.editPuntFormFields = [
      {
        key: 'puntid',
        type: 'horizontalSelect',
        templateOptions: {
          label: 'Punt:',
          options: [],
          required: true
        },
        expressionProperties: {
          'templateOptions.options': function () {
            vm.punts.forEach(function (punt) {
              punt.value = punt.id;
            });
            return vm.punts;
          }
        }
      },
      {
        key: 'dateRange',
        type: 'daterange',
        templateOptions: {
          label: 'Availability:',
          placeholder: 'Select when the punt is available',
          required: true
        }
      }
    ];

    function activate() {
      logger.info('Activated Admin Punts View');
    }

    function onSubmit(data) {
      data.from = new Date(data.dateRange.startDate).getTime() / 1000;
      data.to = new Date(data.dateRange.endDate).getTime() / 1000;
      if (data.name) {
        PuntsServices.save(data, function () {
          /*jshint camelcase: false */
          // data.available_from = data.from;
          // data.available_to = data.to;
          vm.punts.push(data);
          logger.success('Punt Submitted Successfully');
        }, function () {
          logger.error('Something went wrong creating the punt');
        });
      } else {
        PuntsServices.update({puntsId: data.puntid}, data, function () {
          //vm.punts.push(data); @todo update punt
          logger.success('Punt Updated Successfully');
        }, function () {
          logger.error('Something went wrong updating the punt');
        });
      }
    }

    function deletePunt() {
      logger.info('deleting punt');
      var modalOptions = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Delete Punt',
        headerText: 'Delete punt ' + vm.deletePuntForm + '?',
        bodyText: 'Are you sure you want to delete this punt?'
      };

      modalService.showModal({}, modalOptions).then(function () {
        vm.deletePuntForm.forEach(function (puntid) {

          PuntsServices.remove({puntsId: puntid}, function () {
            logger.success('Punt Deleted Successfully');
          }, function () {
            logger.error('Something went wrong deleting the punt');
          });
        });
      });

    }
  }
})();

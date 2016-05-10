(function () {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminUsersController', AdminUsersController);

  AdminUsersController.$inject = ['userPrepService', 'UserServices', 'modalService', 'logger'];
  /* @ngInject */
  function AdminUsersController(userPrepService, UserServices, modalService, logger) {
    var vm = this;

    vm.deleteUser = deleteUser;
    vm.disableUser = disableUser;
    vm.addUser = addUser;
    vm.adminUser = adminUser;
    vm.purgeUsers = purgeUsers;

    vm.user = userPrepService;
    vm.allUsers = [];
    vm.title = {
      add: 'Add Users',
      edit: 'Edit users',
      delete: 'purge users',
      view: 'View users'
    };
    vm.viewForm = {type: 'admin', user: []};
    vm.addForm = {};
    vm.deleteForm = {};
    vm.viewFormFields = [];
    vm.addFormFields = [];
    vm.deleteFormFields = [];

    activate();

    vm.viewFormFields = [
      {
        key: 'search',
        type: 'horizontalInput',
        templateOptions: {
          type: 'text',
          label: 'Search users:',
          placeholder: 'Enter name or crsid'
        }
      },
      {
        key: 'type',
        type: 'horizontalSelect',
        templateOptions: {
          label: 'User Type:',
          options: [
            {name: 'MCR', value: 'MCR'},
            {name: 'Porter', value: 'PORTER'},
            {name: 'UCS', value: 'UCS'},
            {name: 'Staff', value: 'STAFF'},
            {name: 'Fellow', value: 'FELLOW'},
            {name: 'Admin', value: 'admin'},
            {name: 'All', value: null}
          ]
        }
      }
    ];

    vm.addFormFields = [
      {
        key: 'crsid',
        type: 'horizontalTextarea',
        templateOptions: {
          type: 'text',
          required: true,
          rows: 2,
          label: 'CRSID(s):',
          placeholder: 'Enter CRSID(s) seperated by a comma'
        }
      },
      {
        key: 'type',
        type: 'horizontalSelect',
        templateOptions: {
          label: 'User Type:',
          required: true,
          options: [
            {name: 'MCR', value: 'MCR'},
            {name: 'Porter', value: 'PORTER'},
            {name: 'UCS', value: 'UCS'},
            {name: 'Staff', value: 'STAFF'},
            {name: 'Fellow', value: 'FELLOW'}
          ]
        }
      }
    ];

    vm.deleteFormFields = [
      {
        key: 'type',
        type: 'horizontalSelect',
        templateOptions: {
          label: 'Delete:',
          required: true,
          options: [
            {name: 'MCR', value: 'MCR'},
            {name: 'Porter', value: 'PORTER'},
            {name: 'UCS', value: 'UCS'},
            {name: 'Staff', value: 'STAFF'},
            {name: 'Fellow', value: 'FELLOW'},
            {name: 'All', value: null}
          ]
        }
      }
    ];

    function activate() {
      logger.info('Activated Admin View');
      getUsers();
    }

    function getUsers() {
      return UserServices.query({Id: '*'}, function (data) {
        vm.allUsers = data;
      });
    }

    function deleteUser(users) {
      vm.viewForm.user = [];
      var modalOptions = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Delete Users',
        headerText: 'Are you sure you want to delete this user?'
      };

      users.forEach(function (user) {
        modalOptions.bodyText = 'Deleting: ' + user;
        modalService.showModal({}, modalOptions).then(function () {
          UserServices.remove({Id: user}, function () {
            for (var i = 0; i < vm.allUsers.length; i++) {
              if (vm.allUsers[i].crsid === user) {
                vm.allUsers.splice(i, 1);
                break;
              }
            }
            logger.success('User deleted Successfully');
          }, function () {
            logger.error('Something went wrong deleting the user');
          });
        });

      });
    }

    function disableUser(users) {
      vm.viewForm.user = [];
      var modalOptions = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Submit',
        headerText: 'Are you sure you want to change the authorisation on this user?'
      };

      users.forEach(function (user) {
        var authorised = search(user, vm.allUsers).authorised === '0';
        modalOptions.bodyText = ['Authorise',
          user,
          ':',
          authorised
        ].join(' ');
        modalService.showModal({}, modalOptions).then(function () {
          UserServices.update({Id: user}, {authorised: authorised}, function () {
            for (var i = 0; i < vm.allUsers.length; i++) {
              if (vm.allUsers[i].crsid === user) {
                vm.allUsers[i].authorised = authorised ? '1' : '0';
                break;
              }
            }
            logger.success('User updated Successfully');
          }, function () {
            logger.error('Something went wrong updating the user');
          });
        });
      });
    }

    function addUser(users) {
      vm.addForm = [];
      var modalOptions = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Add Users',
        bodyText: [
          'Adding the following users:',
          users.crsid,
          'as',
          users.type
        ].join(' '),
        headerText: 'Are you sure you want to add these users?'
      };

      var crsidPatt = /[a-z]{2,6}[0-9]+/i;
      var userList = users.crsid.split(',');
      for (var i = 0; i < userList.length; i++) {
        userList[i] = userList[i].trim();
        if (userList[i] === '' || !crsidPatt.test(userList[i])) {
          userList.splice(i, 1);
        }
      }

      modalService.showModal({}, modalOptions).then(function () {
        UserServices.save({users: userList, type: users.type}, function () {
          userList.forEach(function (user) {
            //@todo can we get the insertids?
            vm.allUsers.push({crsid: user, type: users.type, admin: '0', authorised: '1'});
          });
          logger.success('Users Added Successfully');
        }, function () {
          logger.error('Something went wrong adding the users');
        });
      });
    }

    function adminUser(users) {
      vm.viewForm.user = [];
      var modalOptions = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Submit',
        headerText: 'Are you sure you want to change the admin status of this user?'
      };

      users.forEach(function (user) {
        var admin = search(user, vm.allUsers).admin === '0';
        modalOptions.bodyText = ['Make',
          user,
          'an admin?:',
          admin
        ].join(' ');
        modalService.showModal({}, modalOptions).then(function () {
          UserServices.update({Id: user}, {admin: admin}, function () {
            for (var i = 0; i < vm.allUsers.length; i++) {
              if (vm.allUsers[i].crsid === user) {
                vm.allUsers[i].admin = admin ? '1' : '0';
                break;
              }
            }
            logger.success('User updated Successfully');
          }, function () {
            logger.error('Something went wrong updating the user');
          });
        });
      });
    }

    function purgeUsers(type) {
      vm.deleteForm = [];
      var modalOptions = {
        closeButtonText: 'Cancel',
        actionButtonText: 'Purge Users',
        bodyText: 'Delete all ' + type + '? admins will not be deleted',
        headerText: 'Are you sure you want to delete these users?'
      };

      modalService.showModal({}, modalOptions).then(function () {
        UserServices.remove({Id: '*', Type: type}, function () {
          vm.allUsers = vm.allUsers.filter(function (user) {
            return user.type !== type || user.admin === '1';
          });
          logger.success('Users Deleted Successfully');
        }, function () {
          logger.error('Something went wrong deleting the users');
        });
      });
    }

    function search(nameKey, myArray) {
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].crsid === nameKey) {
          return myArray[i];
        }
      }
    }
  }
})();

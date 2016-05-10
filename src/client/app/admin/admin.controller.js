(function () {
  'use strict';

  angular
    .module('app.admin')
    .controller('AdminController', AdminController);

  AdminController.$inject = ['routerHelper', 'userPrepService', 'SettingsServices', 'logger'];
  /* @ngInject */
  function AdminController(routerHelper, userPrepService, SettingsServices, logger) {
    var vm = this;
    vm.user = userPrepService;
    vm.title = 'Admin home';
    vm.adminRoutes = [];
    vm.todoAdd = todoAdd;
    vm.remove = remove;
    var states = routerHelper.getStates();
    vm.todoList = [];
    vm.todoInput = '';

    activate();

    function activate() {
      logger.info('Activated Admin View');
      getNavRoutes();
      getTodo();
    }

    function getNavRoutes() {
      vm.adminRoutes = states.filter(function (r) {
        return r.settings && r.settings.nav && r.settings.admin;
      }).sort(function (r1, r2) {
        return r1.settings.nav - r2.settings.nav;
      });
    }

    function todoAdd() {
      vm.todoList.push({todoText: vm.todoInput, done: false});
      updateTodo();
      vm.todoInput = '';
    }

    function remove() {
      var oldList = vm.todoList;
      vm.todoList = [];
      angular.forEach(oldList, function (x) {
        if (!x.done) {
          vm.todoList.push(x);
        }
      });
      updateTodo();
    }

    function getTodo() {
      SettingsServices.get({Type: 'todo'}, function (data) {
        vm.todoList = JSON.parse(data.value);
        console.log(vm.todoList);
        logger.success('Todo list received successfully');
      }, function () {
        logger.error('Something went wrong getting the todo\'s');
      });
    }

    function updateTodo() {
      SettingsServices.update({Type: 'todo'}, {value: JSON.stringify(vm.todoList)}, function () {
        logger.success('Todo list updated successfully');
      }, function () {
        logger.error('Something went wrong updating the todo\'s');
      });
    }
  }
})();

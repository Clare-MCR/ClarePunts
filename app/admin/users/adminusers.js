/**
 * Created by rg12 on 28/04/2016.
 */
angular.module('puntsApp.admin.users', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/admin/users', {
            templateUrl: 'admin/users/adminuser.html',
            controller: 'AdminUsers'
        });
    }])

    .controller('AdminUsers', [function () {

    }]);
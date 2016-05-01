/**
 * Created by rg12 on 28/04/2016.
 */
angular.module('puntsApp.admin.rules', ['ngRoute', 'puntsServices', 'ngSanitize'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/admin/rules', {
            templateUrl: 'admin/rules/adminrules.html',
            controller: 'AdminRules'
        });
    }])

    .controller('AdminRules', ['$scope', '$sce', 'Rules',
        function ($scope, $sce, Rules) {
            $scope.updateRules = function () {
                Rules.update({}, {rules: $scope.rules});
            }

        }
    ]);
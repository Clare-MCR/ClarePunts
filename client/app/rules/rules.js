angular.module('puntsApp.rules', ['ngRoute', 'puntsServices', 'ngSanitize'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/rules', {
            templateUrl: 'rules/rules.html',
            controller: 'PuntsRules'
        });
    }])

    .controller('PuntsRules', ['$scope', '$sce', 'Rules',
        function ($scope, $sce, Rules) {

        }
    ]);
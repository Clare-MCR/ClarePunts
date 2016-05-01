/**
 * Created by rg12 on 01/05/2016.
 */
(function () {
    'use strict';

    var core = angular.module('puntsApp.core');

    var config = {
        version: '0.1'
    };

    core.value(config);

    core.config(configure);

    function configure($routeProvider, routehelperConfigProvider, exceptionHandlerProvider) {

        // Configure the common route provider
        routehelperConfigProvider.config.$routeProvider = $routeProvider;
        routehelperConfigProvider.config.docTitle = 'NG-Modular: ';
        var resolveAlways = {
            /* @ngInject */
            ready: function (dataservice) {
                return dataservice.ready();
            }
            // ready: ['dataservice', function (dataservice) {
            //    return dataservice.ready();
            // }]
        };
        routehelperConfigProvider.config.resolveAlways = resolveAlways;


    }
})();
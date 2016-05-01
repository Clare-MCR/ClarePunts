/**
 * Created by rg12 on 01/05/2016.
 */
(function () {
    'use strict';

    angular
        .module('PuntsApp.layout')
        .controller('Shell', Shell);

    Shell.$inject = ['$rootScope', '$timeout', 'config', 'logger'];

    function Shell($rootScope, $timeout, config, logger) {
        /*jshint validthis: true */
        var vm = this;

        vm.busyMessage = 'Please wait ...';
        vm.user = {};
        vm.version = config.version;
        $rootScope.showSplash = true;
        vm.navline = {
            title: config.appTitle,
            text: 'Created by Richard Gunning',
            link: 'http://twitter.com/rjgunning'
        };

        activate();

        function activate() {
            logger.success(config.appTitle + ' loaded!', null);
            hideSplash();
        }

        function hideSplash() {
            //Force a 1 second delay so we can see the splash.
            $timeout(function () {
                $rootScope.showSplash = false;
            }, 1000);
        }
    }
})();
/**
 * Created by rg12 on 01/05/2016.
 */

(function () {
    'use strict';

    angular.module('puntsApp.core', [
        /*
         * Angular modules
         */
        'ngAnimate', 'ngRoute',
        /*
         * Our reusable cross app code modules
         */
        'blocks.exception', 'blocks.logger', 'blocks.router',
        /*
         * 3rd Party modules
         */
        'textAngular'
    ]);

})();
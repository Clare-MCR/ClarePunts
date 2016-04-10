'use strict';

angular.module('myApp.version', [
        'puntsApp.version.interpolate-filter',
        'puntsApp.version.version-directive'
])

.value('version', '0.1');

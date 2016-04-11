'use strict';

angular.module('puntsApp.version', [
        'puntsApp.version.interpolate-filter',
        'puntsApp.version.version-directive'
])

.value('version', '0.1');

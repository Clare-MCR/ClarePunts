'use strict';

/* Filters */
var puntsFilter = angular.module('puntsFilters', []);

puntsFilter.filter('checkmark', function () {
    return function (input) {
        return input ? '\u2713' : '\u2718';
    };
});

puntsFilter.filter('puntActive', function () {
    return function (items, from, to) {
        var df = Date.parse(from);
        var dt = Date.parse(to);
        var now = Date.now();
        if (now > df && now < dt) {
            return 'Active';
        }
        return 'Inactive'
    };
});

puntsFilter.filter('puntInUse', function () {
    return function (items, from, to) {
        var df = Date.parse(from);
        var dt = Date.parse(to);
        var now = Date.now();
        if (now > df && now < dt) {
            return 'Active';
        }
        return 'Inactive'
    };
});


/*function parseDate(input) {
    var parts = input.split('-');
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

nameSpace.filter("myfilter", function () {
    return function (items, from, to) {
        var df = parseDate(from);
        var dt = parseDate(to);
        var result = [];
        for (var i = 0; i < items.length; i++) {
            var tf = new Date(items[i].date1 * 1000),
                tt = new Date(items[i].date2 * 1000);
            if (tf > df && tt < dt) {
                result.push(items[i]);
            }
        }
        return result;
    };
});

 */
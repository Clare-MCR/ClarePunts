'use strict';

/* Filters */
var puntsFilter = angular.module('puntsFilters', []);

puntsFilter.filter('checkmark', function () {
    return function (input) {
        return input ? '\u2713' : '\u2718';
    };
});

puntsFilter.filter('activeInactive', function () {
    return function (input) {
        return input ? 'Active' : 'Inactive';
    };
});

puntsFilter.filter('puntActive', function () {
    return function (items) {
        var df = new Date(items.available_from);
        var dt = new Date(items.available_to);
        var now = Date.now();
        if (now > df && now < dt) {
            return true;
        }
        return false
    };
});

puntsFilter.filter('puntBookings', function () {
    return function (items, puntid, date, restrictTime) {
        var results = [];
        var thisDate = new Date(date);
        for (var i = 0; i < items.length; i++) {
            if (items[i].puntid == puntid) {
                var df = new Date(items[i].time_from);
                var dt = new Date(items[i].time_to);
                if (thisDate.setHours(0, 0, 0, 0) >= df.setHours(0, 0, 0, 0) && thisDate.setHours(0, 0, 0, 0) <= dt.setHours(0, 0, 0, 0)) {
                    results.push(items[i]);
                }
            }
        }
        return results;

    };
});

puntsFilter.filter('puntInUse', function () {
    return function (items, puntid, active) {
        if (!active) {
            return 'Inactive';
        }
        var now = Date.now();

        for (var i = 0; i < items.length; i++) {
            if (items[i].puntid == puntid) {
                var df = Date.parse(items[i].available_from);
                var dt = Date.parse(items[i].available_to);

                if (now > df && now < dt) {
                    return 'In Use';
                }
            }
        }
        return 'Available';
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
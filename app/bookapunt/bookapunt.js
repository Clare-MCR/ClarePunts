/**
 * Created by rg12 on 28/04/2016.
 */
angular.module('puntsApp.bookapunt', ['ngRoute', 'puntsFilters'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/book', {
            templateUrl: 'bookapunt/bookapunt.html',
            controller: 'PuntsBook'
        });
    }])

    .controller('PuntsBook', ['$scope', '$filter', function ($scope, $filter) {
        $scope.user.bookings = false;
        if ($scope.user.type != 'PORTER') {
            var upcoming = $filter('myBookings')($scope.bookings, $scope.user.crsid, $scope.user.type).length;
            if (upcoming > 0) {
                $scope.user.bookings = true;
            }
        }

        $scope.form = {
            name: $scope.user.name,
            mobile: $scope.user.phone,
            start: new Date().setHours(0, 0, 0, 0),
            end: new Date().setHours(0, 0, 0, 0)
        };

        $scope.maxTime = function () {
            var time = new Date($scope.form.start);
            var timePlus3 = new Date($scope.form.start);
            var nightTime = new Date($scope.form.start).setHours(7, 0, 0, 0);
            var midnight = new Date($scope.form.start).setHours(24, 0, 0, 0);
            timePlus3.setHours(time.getHours() + 3);

            if (timePlus3 >= midnight) {
                return midnight;
            }
            if (time <= nightTime && timePlus3 <= nightTime) {
                return nightTime;
            }
            return timePlus3;
        };

        $scope.minTime = function () {
            var time = new Date($scope.form.start);
            var nightTime = new Date($scope.form.start).setHours(7, 0, 0, 0);
            if (time < nightTime) {
                time.setHours(7, 0, 0, 0);
            } else {
                time.setMinutes(time.getMinutes() + 30);
            }
            return time;
        };

        $scope.updateDuration = function () {
            $scope.options.durationMax = $scope.maxTime();
            $scope.options.durationMin = $scope.minTime();
            $scope.form.end = $scope.options.durationMin;
        };

        $scope.options = {
            datepickerMode: "day",
            minDate: new Date().setHours(0, 0, 0, 0),
            minTime: new Date().setMinutes(0, 0, 0),
            showWeeks: false,
            durationMax: $scope.maxTime(),
            durationMin: $scope.minTime()
        };

        $scope.submit = function () {
            $scope.$broadcast('show-errors-check-validity');
            if ($scope.bookingForm.$invalid) {
            }

        }

    }]);


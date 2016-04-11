'use strict';

/* jasmine specs for controllers go here */
describe('Punts controllers', function () {

    beforeEach(function () {
        jasmine.addMatchers({
            toEqualData: function (util, customEqualityTesters) {
                return {
                    compare: function (actual, expected) {
                        return {
                            pass: angular.equals(actual, expected)
                        };
                    }
                };
            }
        });
    });

    beforeEach(module('puntsApp'));
    beforeEach(module('puntsServices'));

    describe('PuntsStatus', function () {
        var scope, ctrl, $httpBackend;

        beforeEach(inject(function (_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET', 'rest/users')
                .respond(200, {
                    "crsid": "rjg70",
                    "name": "Richard Gunning",
                    "phone": "07557090952",
                    "type": "MCR",
                    "authorised": "1",
                    "admin": "0",
                    "ID": "1"
                });
            $httpBackend.when('GET', 'rest/punts')
                .respond([
                    {
                        "id": "1",
                        "name": "Silence of the Cam",
                        "available_from": "2015-11-06 00:00:00",
                        "available_to": "2015-11-14 00:00:00"
                    },
                    {
                        "id": "2",
                        "name": "MCArk",
                        "available_from": "2015-11-06 00:00:00",
                        "available_to": "2015-11-14 00:00:00"
                    },
                    {
                        "id": "3",
                        "name": "Clare De lune",
                        "available_from": "2015-11-06 00:00:00",
                        "available_to": "2015-11-14 00:00:00"
                    },
                    {
                        "id": "4",
                        "name": "clarebuoyant",
                        "available_from": "2015-11-06 00:00:00",
                        "available_to": "2015-11-14 00:00:00"
                    }
                ]);

            scope = $rootScope.$new();
            ctrl = $controller('PuntsStatus', {$scope: scope});
        }));


        it('should create 1 user fetched from REST', function () {
            expect(scope.user).toEqualData({});
            $httpBackend.flush();

            expect(scope.user).toEqualData(
                {
                    "crsid": "rjg70",
                    "name": "Richard Gunning",
                    "phone": "07557090952",
                    "type": "MCR",
                    "authorised": "1",
                    "admin": "0",
                    "ID": "1"
                });
            expect(scope.user.name).toEqualData("Richard Gunning");
            expect(scope.user.admin).toEqualData('0')
        });

        it('should create 4 punts fetched from REST', function () {
            expect(scope.punts).toEqualData([]);
            $httpBackend.flush();

            expect(scope.punts).toEqualData([
                {
                    "id": "1",
                    "name": "Silence of the Cam",
                    "available_from": "2015-11-06 00:00:00",
                    "available_to": "2015-11-14 00:00:00"
                },
                {
                    "id": "2",
                    "name": "MCArk",
                    "available_from": "2015-11-06 00:00:00",
                    "available_to": "2015-11-14 00:00:00"
                },
                {
                    "id": "3",
                    "name": "Clare De lune",
                    "available_from": "2015-11-06 00:00:00",
                    "available_to": "2015-11-14 00:00:00"
                },
                {
                    "id": "4",
                    "name": "clarebuoyant",
                    "available_from": "2015-11-06 00:00:00",
                    "available_to": "2015-11-14 00:00:00"
                }]);
        });

    });

});
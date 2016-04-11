'use strict';

describe('service', function () {

    // load modules
    beforeEach(module('puntsApp'));

    // Test service availability
    it('check the existence of Punts factory', inject(function (Punts) {
        expect(Punts).toBeDefined();
    }));

    // Test service availability
    it('check the existence of Users factory', inject(function (Users) {
        expect(Users).toBeDefined();
    }));

    // Test service availability
    it('check the existence of Users factory', inject(function (Bookings) {
        expect(Bookings).toBeDefined();
    }));
});
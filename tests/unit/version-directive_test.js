'use strict';

describe('puntsApp.version module', function () {
  beforeEach(module('puntsApp.version'));

  describe('client-version directive', function () {
    it('should print current version', function() {
      module(function($provide) {
        $provide.value('version', 'TEST_VER');
      });
      inject(function($compile, $rootScope) {
        var element = $compile('<span client-version></span>')($rootScope);
        expect(element.text()).toEqual('TEST_VER');
      });
    });
  });
});

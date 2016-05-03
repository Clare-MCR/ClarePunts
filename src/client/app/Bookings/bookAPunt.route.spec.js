/* jshint -W117, -W030 */
describe('book a punt routes', function () {
  describe('state', function () {
    var view = 'app/dashboard/bookAPunt.html';

    beforeEach(function () {
      module('app.bookings', bard.fakeToastr);
      bard.inject('$httpBackend', '$location', '$rootScope', '$state', '$templateCache');
    });

    beforeEach(function () {
      $templateCache.put(view, '');
    });

    bard.verifyNoOutstandingHttpRequests();

    it('should map state dashboard to url / ', function () {
      expect($state.href('dashboard', {})).to.equal('/');
    });

    it('should map /dashboard route to dashboard View template', function () {
      expect($state.get('dashboard').templateUrl).to.equal(view);
    });

    it('of dashboard should work with $state.go', function () {
      $state.go('dashboard');
      $rootScope.$apply();
      expect($state.is('dashboard'));
    });
  });
});

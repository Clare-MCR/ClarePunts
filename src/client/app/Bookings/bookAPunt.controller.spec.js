/* jshint -W117, -W030 */
describe('BookAPuntController', function () {
  var controller;
  var user = mockData.getMockUser();
  var punt = mockData.getMockPunts();
  var booking = mockData.getMockBookings();

  beforeEach(function () {
    bard.appModule('app.dashboard');
    bard.inject('$filter', 'BookingServices', 'bookingsPrepService',
      'puntsPrepService', 'userPrepService', 'logger');
  });

  beforeEach(function () {
    sinon.stub(BookingServices, 'query').returns($q.when(booking));
    sinon.stub(bookingsPrepService, 'get').returns($q.when(booking));
    sinon.stub(userPrepService, 'get').returns($q.when(user));
    sinon.stub(puntsPrepService, 'get').returns($q.when(punt));
    controller = $controller('BookAPuntController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Book A punt controller', function () {
    it('should be created successfully', function () {
      expect(controller).to.be.defined;
    });

    describe('after activate', function () {
      it('should have title of Dashboard', function () {
        expect(controller.title).to.equal('Dashboard');
      });

      it('should have logged "Activated"', function () {
        expect($log.info.logs).to.match(/Activated/);
      });

      it('should have at least 1 person', function () {
        expect(controller.people).to.have.length.above(0);
      });

      it('should have people count of 5', function () {
        expect(controller.people).to.have.length(7);
      });
    });
  });
});

/* jshint -W117, -W030 */
describe('DashboardController', function () {
  var controller, bookingsPrepService, puntsPrepService;
  var user = mockData.getMockUser();
  var punt = mockData.getMockPunts();
  var booking = mockData.getMockBookings();

  beforeEach(function () {
    bard.appModule('app.dashboard');
    bard.inject('$controller', '$log', '$q', '$rootScope', 'bookingsPrepService');
    // bard.mockService(puntsPrepService, {
    //   _default:    $q.when(punt)
    // });
    // bard.mockService(bookingsPrepService, {
    //   _default:    $q.when(booking)
    // });
  });

  beforeEach(function () {
    // this.bookingsPrepService = bookingsPrepService;
    // this.puntsPrepService = puntsPrepService;
    // sinon.stub(bookingsPrepService).returns($q.when(booking));
    // sinon.stub(puntsPrepService).returns($q.when(punt));
    controller = $controller('DashboardController');
    $rootScope.$apply();
  });

  bard.verifyNoOutstandingHttpRequests();

  describe('Dashboard controller', function () {
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

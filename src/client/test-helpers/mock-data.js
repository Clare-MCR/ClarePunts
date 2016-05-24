/* jshint -W079 */
var mockData = (function () {
  return {
    getMockPeople: getMockPeople,
    getMockStates: getMockStates,
    getMockUser: getMockUser,
    getMockPunts: getMockPunts,
    getMockRules: getMockRules,
    getMockCommittee: getMockCommittee,
    getMockBookings: getMockBookings
  };

  function getMockStates() {
    return [
      {
        state: 'dashboard',
        config: {
          url: '/',
          templateUrl: 'app/dashboard/dashboard.html',
          title: 'dashboard',
          settings: {
            nav: 1,
            content: '<i class="fa fa-dashboard"></i> Dashboard'
          }
        }
      }
    ];
  }

  function getMockPeople() {
    return [
      {
        crsid: 'rjg70',
        name: 'Richard is Awesome',
        phone: '07557090952',
        type: 'MCR',
        authorised: '1',
        admin: '1',
        ID: '1'
      },
      {
        crsid: 'tb405',
        name: 'T. Beeson-Jones',
        phone: '07761452919',
        type: 'MCR',
        authorised: '1',
        admin: '1',
        ID: '1141'
      },
      {
        crsid: 'gp402',
        name: 'G. Price',
        phone: '',
        type: 'PORTER',
        authorised: '1',
        admin: '0',
        ID: '1447'
      }
    ];
  }

  function getMockUser() {
    return {
      crsid: 'rjg70',
      name: 'Richard is Awesome',
      phone: '07557090952',
      type: 'MCR',
      authorised: '1',
      admin: '1',
      ID: '1'
    };
  }

  function getMockPunts() {
    /* jshint camelcase: false */
    /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */

    return [
      {
        id: '1',
        name: 'Silence of the Cam',
        available_from: '2016-05-03 00:00:00',
        available_to: '2016-06-23 23:59:59'
      },
      {
        id: '2',
        name: 'MCArk',
        available_from: '2016-04-13 00:00:00',
        available_to: '2016-05-08 00:00:00'
      },
      {
        id: '3',
        name: 'Clare De lune',
        available_from: '2016-04-22 00:00:00',
        available_to: '2016-05-06 00:00:00'
      },
      {
        id: '4',
        name: 'clarebuoyant',
        available_from: '2016-04-13 00:00:00',
        available_to: '2016-05-04 00:00:00'
      }
    ];
  }

  function getMockRules() {
    return {
      value: '<p>This is where the rules will go test.</p>'
    };
  }

  function getMockCommittee() {
    return {
      value: '<p>This is where the committee will go test.</p>'
    };
  }

  function getMockBookings() {
    /*jshint camelcase: false */
    /* jscs:disable requireCamelCaseOrUpperCaseIdentifiers */

    return [
      {
        id: '7142',
        puntid: '1',
        user_type: 'MCR',
        booker: 'rjg70',
        name: 'R. Gunning',
        phone: '07557090952',
        time_from: '2016-05-08 11:00:00',
        time_to: '2016-05-08 13:00:00'
      },
      {
        id: '714865',
        puntid: '4',
        user_type: 'MCR',
        booker: 'bu211',
        name: 'B. Umapathysarma',
        phone: '07772865777',
        time_from: '2016-06-23 11:00:00',
        time_to: '2016-06-23 13:00:00'
      },
      {
        id: '714859',
        puntid: '2',
        user_type: 'UCS',
        booker: 'hc414',
        name: 'H. Casement',
        phone: '7593712854',
        time_from: '2016-06-23 11:00:00',
        time_to: '2016-06-23 13:00:00'
      },
      {
        id: '714864',
        puntid: '1',
        user_type: 'UCS',
        booker: 'jr591',
        name: 'J. Robertson',
        phone: '07950620990',
        time_from: '2016-06-21 15:00:00',
        time_to: '2016-06-21 17:00:00'
      },
      {
        id: '714863',
        puntid: '4',
        user_type: 'UCS',
        booker: 'rja74',
        name: 'R.J. Andrews',
        phone: '07592066535',
        time_from: '2016-06-21 14:00:00',
        time_to: '2016-06-21 17:00:00'
      },
      {
        id: '714851',
        puntid: '2',
        user_type: 'MCR',
        booker: 'tb405',
        name: 'T. Beeson-Jones',
        phone: '07761452919',
        time_from: '2016-06-12 07:00:00',
        time_to: '2016-06-12 10:00:00'
      }
    ];
  }

})();

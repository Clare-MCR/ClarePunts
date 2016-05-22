(function () {
  'use strict';

  angular
    .module('app.data')
    .factory('UserServices', UserServices);

  UserServices.$inject = ['cachedResource'];

  /* @ngInject */
  function UserServices(cachedResource) {
    return cachedResource('rest/user/:Id/:Type', {Id: '@crsid'}, {});

    // var data;
    // var resource = $resource('rest/user/:Id/:Type', null, {
    //   update: {method: 'PUT', isArray: false},
    //   get: {method: 'GET', cache: true, timeout:10000}
    // });
    //
    // return {
    //   get: function (callback) {
    //     if (data) {
    //       console.log('returning cached data');
    //       return data;
    //     } else {
    //       console.log('getting data from server');
    //       return thisUser(callback);
    //     }
    //   },
    //   save: resource.save,
    //   update: function(params,user,callback) {
    //     return updateUser(params,user,callback);
    //   },
    //   delete: resource.delete,
    //   query: resource.query
    // };
    //
    // function thisUser (callback) {
    //   data = resource.get(callback).$promise.value;
    //   return data;
    // }
    //
    // function updateUser (params,user,callback) {
    //   var newData = resource.update(params,user,callback);
    //   if (newData.ID === data.ID) {
    //     console.log('Updating user');
    //     data = newData;
    //   }
    //   return data;
    // }
  }

})();

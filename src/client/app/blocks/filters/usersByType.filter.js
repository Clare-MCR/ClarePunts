/**
 * Created by rg12 on 02/05/2016.
 */
(function () {
  'use strict';

  angular
    .module('blocks.filter')
    .filter('usersByType', usersByType);

  function usersByType() {
    return function (users, type) {
      if (!type) {
        return users;
      }
      type = type.toUpperCase();
      return users.filter(function (user) {
        if (type === 'ADMIN') {
          return user.admin === '1';
        } else {
          return user.type === type;
        }
      });
    };
  }
})();

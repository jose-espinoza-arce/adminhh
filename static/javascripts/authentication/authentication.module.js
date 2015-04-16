(function () {
  'use strict';

  angular
    .module('mx.haushaus.authentication', [
      'mx.haushaus.authentication.controllers',
      'mx.haushaus.authentication.services',
      'mx.haushaus.authentication.interceptors'
    ]);

  angular
    .module('mx.haushaus.authentication.controllers', []);

  angular
    .module('mx.haushaus.authentication.services', ['ngCookies']);

  angular
    .module('mx.haushaus.authentication.interceptors', []);
})();

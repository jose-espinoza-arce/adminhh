(function () {
  'use strict';

  angular
    .module('mx.haushaus', [
      'mx.haushaus.config',  
      'mx.haushaus.routes',
      'mx.haushaus.authentication',
      'mx.haushaus.layout',
      'mx.haushaus.utils',
      'mx.haushaus.profiles',
      'mx.haushaus.posts'
    ]);

  angular
    .module('mx.haushaus.config', []);
  angular
    .module('mx.haushaus.routes', ['ngRoute', 'ui.router']);

  angular
      .module('mx.haushaus')
      .run(run);

  run.$inject = ['$http'];

/**
 * * @name run
 * * @desc Update xsrf $http headers to align with Django's defaults
 * */
  function run($http) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
  }

})();

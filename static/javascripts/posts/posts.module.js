(function () {
  'use strict';

  angular
    .module('mx.haushaus.posts', [
      'mx.haushaus.posts.controllers',
      'mx.haushaus.posts.directives',
      'mx.haushaus.posts.services'    
    ]);

  angular
    .module('mx.haushaus.posts.controllers', []);

  angular
    .module('mx.haushaus.posts.directives', ['ngDialog']);

  angular
    .module('mx.haushaus.posts.services', []);
})();

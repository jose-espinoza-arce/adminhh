/**
* Post
* @namespace mx.haushaus.posts.directives
*/
(function () {
  'use strict';

  angular
    .module('mx.haushaus.posts.directives')
    .directive('post', post);

  /**
  * @namespace Post
  */
  function post() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf mx.haushaus.posts.directives.Post
    */
    var directive = {
      restrict: 'E',
      scope: {
        post: '='
      },
      templateUrl: '/static/templates/posts/post.html'
    };

    return directive;
  }
})();

/**
 * NavbarController
 * @namespace mx.haushaus.layout.controllers
 */
(function() {
  'use strict';

  angular
    .module('mx.haushaus.layout.controllers')
    .controller('NavbarController', NavbarController);

  NavbarController.$inject = ['$scope', 'Authentication'];


  /**
   * NavbarController
   */
  function NavbarController($scope, Authentication) {
    var vm = this;

    vm.logout = logout;

    /**
     * @name logout
     * @desc Log the user out
     * @memberOf mx.haushaus.layout.controllers.NavbarController
     */
    function logout() {
      Authentication.logout();
    }
  }
})();

/**
 * LoginController
 * @namespace mx.haushaus.authentication.controllers
 */
(function () {
  'use strict';

  angular
    .module('mx.haushaus.authentication.controllers')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$location', '$scope', 'Authentication'];

  /**
   * @namespace LoginController
   */
  function LoginController($location, $scope, Authentication) {
    var vm = this;

    vm.login = login;

    /*$scope.credentials={
        email: '',
        password: ''
    };
    $scope.credentialsDefault = {
        email: '',
        password: ''
    };*/

    activate();

    /**
     * @name activate
     * @desc Actions to be performed when this controller is instantiated
     * @memberof mx.haushaus. authentication.contrololers.LoginController
     */
    function activate() {
      //if the user is authenticated thy should not be here, fuera, fuera!  
      if (Authentication.isAuthenticated()) {
        $location.url('/');
      }
    }

    /**
     * @name login
     * @desc Log the user in
     * @memberof mx.haushaus.auntehntication.controllers.LoginController
     */
    function login() {
      Authentication.login(vm.credentials.email, vm.credentials.password);
    }
  }
})();

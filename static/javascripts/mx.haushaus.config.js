(function () {
  'use strict';

  angular
    .module('mx.haushaus.config')
    .config(config);

  config.$inject = ['$locationProvider', '$httpProvider', '$interpolateProvider'];

  /**
  * @name config
  * @desc Enable HTML5 routing
  */
  function config($locationProvider, $httpProvider, $interpolateProvider) {
    $locationProvider.html5Mode(true);
    $locationProvider.hashPrefix('!');
    $httpProvider.interceptors.push('AuthInterceptor');
    //$interpolateProvider.startSymbol('<=%');
    //$interpolateProvider.endSymbol('%=>');
  }
})();

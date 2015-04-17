/**
* Profile
* @namespace mx.haushaus.profiles.services
*/
(function () {
  'use strict';

  angular
    .module('mx.haushaus.profiles.services')
    .factory('Profile', Profile);

  Profile.$inject = ['$http'];

  /**
  * @namespace Profile
  */
  function Profile($http) {
    /**
    * @name Profile
    * @desc The factory to be returned
    * @memberOf mx.haushaus.profiles.services.Profile
    */
    var Profile = {
      destroy: destroy,
      get: get,
      update: update
    };

    return Profile;

    /////////////////////

    /**
    * @name destroy
    * @desc Destroys the given profile
    * @param {Object} profile The profile to be destroyed
    * @returns {Promise}
    * @memberOf mx.haushaus.profiles.services.Profile
    */
    function destroy(profile) {
      return $http.delete('/api/v1/accounts/' + profile.id + '/');
    }


    /**
    * @name get
    * @desc Gets the profile for user with username `username`
    * @param {string} username The username of the user to fetch
    * @returns {Promise}
    * @memberOf mx.haushaus.profiles.services.Profile
    */
    function get(username) {
      return $http.get('/api/v1/accounts/' + username + '/');
    }


    /**
    * @name update
    * @desc Update the given profile
    * @param {Object} profile The profile to be updated
    * @returns {Promise}
    * @memberOf mx.haushaus.profiles.services.Profile
    */
    function update(profile) {
      console.log(profile);
      //username = window.localStorage.getItem('username');
      //console.log(username);
      return $http.put('/api/v1/accounts/' + window.localStorage.getItem('username') + '/', profile);
    }
  }
})();

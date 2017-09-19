'use strict';
angular.module('app.services')
  .factory('Users', ['$resource', '$http', function($resource, $http) {
    var resource = $resource('/api/users/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    }, {
      stripTrailingSlashes: false
    });

    resource.login = (user, cb) => {
      $http.post('/api/users/login', user).success((res) => {
        cb(null, res);
      }).error((err) => {
        cb(err);
      });
    };

    resource.session = (cb) => {
      $http.get('/api/users/session').success((res) => {
        cb(null, res);
      }).error((err) => {
        cb(err);
      });
    };
    return resource;
  }]);

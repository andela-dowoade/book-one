'use strict';
angular.module('app.services')
  .factory('Books', ['$resource', '$http', function($resource, $http) {
    var resource = $resource('/api/v1/books/:id', {
      id: '@id'
    }, {
      update: {
        method: 'PUT'
      }
    }, {
      stripTrailingSlashes: false
    });

    resource.list = (page, sort, cb) => {
      var skip = page * 10;
      $http.get('/api/v1/books?sort=' + sort + 'limit=10&skip=' + skip)
        .then((res) => {
          cb(null, res.data);
        }).catch(function(err) {
          cb(err);
        });
    };
    return resource;
  }]);
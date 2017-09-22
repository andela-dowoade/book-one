'use strict';
angular.module('app.services', []);
angular.module('app.controllers', []);

require('./services/user');
require('./services/book');
require('./services/auth');
require('./services/token-injector');

require('./controllers/controller');

angular.module('app', ['ngResource', 'ngMaterial',
    'ngRoute', 'ui.router', 'angular-loading-bar',
    'app.controllers', 'app.services'
  ])
  .controller('defaultController', function(
    $rootScope, $scope) {
    $scope.init = () => {
      console.log('App started sucessfully');
    };
  }).filter('decodeURI', function() {
    return function(data) {
      return decodeURI(data);
    };
  });

angular.module('app').config((
  $stateProvider, $httpProvider, $urlRouterProvider, $locationProvider) => {
  $httpProvider.interceptors.push('TokenInjector');
  $urlRouterProvider.otherwise('404');

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'views/home.html',
    controller: 'homeController'
  }).state('detail', {
    url: '/detail/:id',
    params : {
      id: null
    },
    templateUrl: 'views/detail.html',
    controller: 'homeController'
  })
  .state('404', {
    url: '/404',
    templateUrl: 'views/404.html',
    controller: 'defaultController'
  });

  $locationProvider.html5Mode(true);

}).run(($rootScope, $state) => {
  $state.go('home');
});
'use strict';
angular.module('app.services', []);
angular.module('app.controllers', []);

require('./services/user');
require('./services/auth');
require('./services/token-injector');

require('./controllers/controller');

angular.module('app', ['ngResource', 'ngMaterial',
    'ngRoute', 'ui.router', 'angular-loading-bar',
    'app.controllers', 'app.services'
  ])
  .controller('defaultController', function(
    $rootScope, $scope, $state, $mdSidenav) {
    $scope.init = () => {
      if (Auth.isLoggedIn()) {
        $rootScope.currentUser = Auth.getUser().data;
        $scope.name = $rootScope.currentUser.name.first +
          ' ' + $rootScope.currentUser.name.last;
      }
    };

    $scope.logout = () => {
      delete $rootScope.currentUser;
      Auth.logout();
      $state.go('home', null, {
        reload: true
      });
    };
  });

angular.module('app').config((
  $stateProvider, $httpProvider, $urlRouterProvider, $locationProvider) => {
  $httpProvider.interceptors.push('TokenInjector');
  $urlRouterProvider.otherwise('404');

  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'views/home.html',
    controller: 'defaultController'
  }).state('404', {
    url: '/404',
    templateUrl: 'views/404.html',
    controller: 'defaultController'
  });

  $locationProvider.html5Mode(true);

}).run(($rootScope, $state, Auth, Users) => {
  if (Auth.isLoggedIn()) {
    Users.session((err, user) => {
      if (user) {
        $rootScope.currentUser = Auth.getUser().data;
      } else {
        Auth.logout();
        delete $rootScope.currentUser;
        $state.go('home');
      }
    });
  } else {
    $state.go('home');
  }
});

'use strict';
angular.module('app.controllers').controller('homeController', function($rootScope,
  $scope, $stateParams, $state, $sce, Books) {
  var getHistory = () => {
    var items = [];
    var keys = Object.keys(localStorage);
    keys.forEach((key) => {
      items.push(JSON.parse(localStorage.getItem(keys[key])));
    });
    $scope.history = items;
  };

  $scope.init = () => {
    $scope.currentPage = 0;
    $scope.sortTerm = 'year';
    $scope.getPage(0);
    getHistory();
  };

  $scope.sortByPrice = () => {
    $scope.sortTerm = 'price';
    $scope.getPage(0);
  };

  $scope.sortByTitle = () => {
    $scope.sortTerm = 'title';
    $scope.getPage(0);
  };

  $scope.sortByYear = () => {
    $scope.sortTerm = 'year';
    $scope.getPage(0);
  };

  $scope.buy = (book) => {
    if (!localStorage.getItem(book.id)) {
      localStorage.setItem(book.id, JSON.stringify(book));
      $scope.history.push(book);
    }
  };

  $scope.getPage = (page) => {
    $scope.currentPage = page;
    Books.list(page, $scope.sortTerm, function(err, books) {
      $scope.nextIsEnabled = books.length > 10;
      $scope.books = books;
    });
  };
});
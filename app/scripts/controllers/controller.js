'use strict';
angular.module('app.controllers').controller('homeController', function($rootScope,
  $scope, $stateParams, $state, $sce, Books) {
  var getHistory = () => {
    var items = [];
    var keys = Object.keys(localStorage);
    keys.forEach((key) => {
      items.push(JSON.parse(localStorage.getItem(key)));
    });
    $scope.history = items;
  };

  $scope.init = () => {
    $scope.currentPage = 0;
    $scope.sortTerm = 'year';
    $scope.getPage(0);
    getHistory();
  };

  $scope.detailInit = () => {
    Books.getBook($stateParams.id, function(err, book) {
      if (!book) {
        $state.go('404');
      }
      $scope.selectedBook = book;
    });
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

  $scope.search = () => {
    $scope.getPage(0);
  };

  $scope.buy = (book) => {
    if (!localStorage.getItem(book._id)) {
      localStorage.setItem(book._id, JSON.stringify(book));
      $scope.history.push(book);
    }
  };

  $scope.view = (book) => {
    $scope.selectedBook = book;
    $state.go('detail', {id: book._id});
  };

  $scope.getPage = (page) => {
    $scope.currentPage = page;
    Books.list(page, $scope.sortTerm, $scope.searchTerm, function(err, books) {
      $scope.nextIsEnabled = books.length > 10;
      $scope.books = books;
    });
  };
});
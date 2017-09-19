'use strict';
describe('defaultController tests', () => {
  var scope;
  var state;
  var controller;

  beforeEach(() => {
    module('app');
  });

  beforeEach(inject(function($injector) {
    var $controller = $injector.get('$controller');
    scope = $injector.get('$rootScope');
    state = $injector.get('$state');

    controller = $controller('defaultController', {
      $scope: scope
    });
  }));

  it('should init the controller', () => {
    expect(true).toEqual(true);
  });
});

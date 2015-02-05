var PAGE_SIZE = 25;

var items = angular.module('items', []);

items.controller('ItemListCtrl', ['$scope', 'Item', 
  function($scope, Item) {
    $scope.items = Item.query();
  }
]);

items.controller('ItemDetailCtrl', ['$scope', 'Item', '$routeParams', 
  function($scope, Item, $routeParams) {
    $scope.item = Item.get({objectId: $routeParams.objectId});
  }
]);

function getPageOffset(pageNumber) {
  return (pageNumber-1)*PAGE_SIZE;
}
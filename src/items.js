var PAGE_SIZE = 25;

var items = angular.module('items', ['api']);

items.controller('ItemListCtrl', ['$scope', '$http', 
  function($scope, $http) {
    $scope.items = [];
    $http.get(API_ROOT + CLASSES_ROOT + ITEMS).
      success(function(data, status, headers, config) {
        $scope.items = data.results;
      });
  }
]);

items.controller('ItemDetailCtrl', ['$scope', 'Items', '$routeParams', 
  function($scope, Items, $routeParams) {
    $scope.item = Items.get({objectId: $routeParams.objectId});
  }
]);

function getPageOffset(pageNumber) {
  return (pageNumber-1)*PAGE_SIZE;
}
var PAGE_SIZE = 25;

var items = angular.module('items', []);

items.controller('ItemListCtrl', ['$scope', '$http', 
  function($scope, $http) {
    $scope.items = [];
    $http.get(API_ROOT + CLASSES_ROOT + ITEMS).
      success(function(data, status, headers, config) {
        $scope.items = data.results;
      });
  }
]);

items.controller('ItemDetailCtrl', ['$scope', '$http', '$routeParams', 
  function($scope, $http, $routeParams) {
    $scope.item = {};
    $http.get(API_ROOT + CLASSES_ROOT + ITEMS + $routeParams.itemId).
      success(function(data, status, headers, config) {
        $scope.item = data;
      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });
  }
]);

function getPageOffset(pageNumber) {
  return (pageNumber-1)*PAGE_SIZE;
}
var PAGE_SIZE = 1;

var items = angular.module('items', []);

items.controller('ItemListCtrl', ['$scope', 'Item', 'Counter', '$routeParams',
  function($scope, Item, Counter, $routeParams) {
    $scope.categories = CATEGORIES;
    $scope.currentCategory = $routeParams.category ? $routeParams.category : ALL_CATEGORIES;

    $scope.p = $routeParams.p ? parseInt($routeParams.p) : 1;
    Counter.get({objectId: CATEGORY_COUNT_IDS[$scope.currentCategory]}, function(response) {
      $scope.totalPages = Math.ceil(response.value/PAGE_SIZE);
      $scope.displayedPages = getDisplayedPages($scope.p, $scope.totalPages);
      $scope.displayPrev = $scope.p != 1;
      $scope.displayNext = $scope.p != $scope.totalPages;
    });
    
    var itemParams = {
      skip: getPageOffset($scope.p),
      limit: PAGE_SIZE
    };
    if ($scope.currentCategory !== ALL_CATEGORIES) {
      itemParams.where = {
        category: $scope.currentCategory
      };
    }
    $scope.items = Item.query(itemParams);
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

/*
  Note that pages are in the range [1, totalPages]
  @param p int Current page
  @param totalPages int
*/
function getDisplayedPages(p, totalPages) {
  result = [];
  for (var i = p-2; i <= p+2; i++) {
    if (i >= 1 && i <= totalPages) {
      result.push(i);
    }
  }
  return result;
}
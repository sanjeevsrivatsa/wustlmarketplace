var PAGE_SIZE = 5;

var items = angular.module('items', []);

items.controller('ItemListCtrl', ['$scope', 'Item', 'Counter', '$routeParams',
  function($scope, Item, Counter, $routeParams) {
    $scope.categories = CATEGORIES;
    $scope.currentCategory = $routeParams.category ? $routeParams.category : ALL_CATEGORIES;

    //$scope.p = $routeParams.p ? parseInt($routeParams.p) : 1;
    
    // Counter.get({objectId: CATEGORY_COUNT_IDS[$scope.currentCategory]}, function(response) {
    //   $scope.totalPages = Math.ceil(response.value/PAGE_SIZE);
    //   $scope.displayedPages = getDisplayedPages($scope.p, $scope.totalPages);
    //   $scope.displayPrev = $scope.p != 1;
    //   $scope.displayNext = $scope.p != $scope.totalPages;
    // });
    
    var queryParams = {
      skip: 0,
      limit: PAGE_SIZE
    };
    if ($scope.currentCategory !== ALL_CATEGORIES) {
      queryParams.where = {
        category: $scope.currentCategory
      };
    }

    Item.query(queryParams, function(response) {
      $scope.items = response.results;
    });

    var infiniteScrollHandler = function () {
      if ($(window).scrollTop() >= $(document).height() - $(window).height() - 10) {
        $scope.loadAdditionalItems();
      }
    }

    // Note this may not be the best way to do this: http://ejohn.org/blog/learning-from-twitter/
    $(window).scroll(infiniteScrollHandler);
    
    $scope.loadAdditionalItems = function() {
      queryParams.skip += PAGE_SIZE;
      Item.query(queryParams, function(response) {
        if (response.results.length == 0) {
          $scope.items.push({title: 'There are no more items to show.'});
          $(window).off('scroll', infiniteScrollHandler);
        } else {
          response.results.forEach(function(item) {
            $scope.items.push(item);
          });
        }
      });  
    };

  }
]);

items.controller('ItemDetailCtrl', ['$scope', 'Item', '$routeParams', 
  function($scope, Item, $routeParams) {
    $scope.item = Item.get({objectId: $routeParams.objectId});
  }
]);

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
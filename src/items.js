var PAGE_SIZE = 15;

var items = angular.module('items', []);

items.controller('ItemListCtrl', ['$scope', 'Item', 'Counter', '$routeParams',
  function($scope, Item, Counter, $routeParams) {
    $scope.categories = CATEGORIES;
    $scope.currentCategory = $routeParams.category ? $routeParams.category : ALL_CATEGORIES;
    $scope.searchQuery = $routeParams.q;
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
    if ($scope.searchQuery) {
      var terms = $scope.searchQuery.split(" ");
      queryParams.where = {
        words: {
          '$all': terms
        }
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

items.controller('ItemDetailCtrl', ['$rootScope', '$scope', 'Item', '$routeParams', '$location',
  function($rootScope, $scope, Item, $routeParams, $location) {
    $scope.owner = false;
    $scope.item = {};
    $scope.categories = CATEGORIES;

    Item.get({objectId: $routeParams.objectId}, function(response) {
      $scope.owner = response.sellerId === $rootScope.currentUserId;
      $scope.item.objectId = response.objectId;
      $scope.item.category = response.category;
      $scope.item.description = response.description;
      $scope.item.title = response.title;
      $scope.item.price = response.price;
    });

    $scope.update = function() {
      Item.update($scope.item, function(response) {
        $location.path('/');
      });
    }
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
var listing = angular.module('upload', []);

listing.controller('UploadCtrl', ['$scope', '$location', '$cookies', '$rootScope', 'Item',

  function($scope, $location, $cookies, $rootScope, Item) {
    $scope.listing = {};
    $scope.categories = CATEGORIES;
    $scope.upload = function() {
        if (!$rootScope.loggedIn) {
          alert('You must be logged in to post items.');
          $location.path('/');
        }
        var ACL = {};
        ACL[$rootScope.currentUserId] = {
          'read': true,
          'write': true
        };
        ACL["*"] = {
          'read': true
        };
        $scope.listing.ACL = ACL;
        $scope.listing.sellerId = $rootScope.currentUserId;
        Item.post($scope.listing, function(response) {
          console.log(response);
          $location.path('/');
        });
    };
  }

]);

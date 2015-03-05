var listing = angular.module('upload', []);

listing.controller('UploadCtrl', ['$scope', '$location', '$cookieStore', '$rootScope', 'Item',

  function($scope, $location, $cookieStore, $rootScope, Item) {
    var myDropzone = new Dropzone("#drop", { url: "/file/post"});
    $scope.categories = CATEGORIES;
    $scope.upload = function() {
        console.log($scope.listing);
        Item.post($scope.listing, function(response) {
          console.log(response);
        });
        alert("~");
    };
  }

]);

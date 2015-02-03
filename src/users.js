var users = angular.module('users', []);

users.controller('UserLoginCtrl');

users.controller('UserSignupCtrl', ['$scope', '$http',

  function($scope, $http) {
    $scope.items = [];
    $scope.master = {};
    $scope.signup = function(user) {
        $scope.master = angular.copy(user);
    };
    /*$http.get(API_ROOT + CLASSES_ROOT + ITEMS).
      success(function(data, status, headers, config) {
        $scope.items = data.results;
      });*/
    $scope.reset = function(){
      $scope.user = angular.copy($scope.master);
    }
    $scope.reset();
  }

]);

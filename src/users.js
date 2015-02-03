var users = angular.module('users', []);

users.controller('UserLoginCtrl');

users.controller('UserSignupCtrl', ['$scope', '$http',

  function($scope, $http) {
    $scope.items = [];
    $scope.master = {};
    $scope.signup = function(user) {
        $scope.master = angular.copy(user);
        $scope.master.toString();
        $http.post(API_ROOT+USERS_ROOT, {name:$scope.master.name, email:$scope.master.email, password:$scope.master.password}).
          success(function(data, status, headers, config){
            alert("SWEET");
          }),
          error(function(data, status, headers, config){
            alert("NAW");
          });
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

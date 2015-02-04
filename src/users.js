var users = angular.module('users', []);

users.controller('UserLoginCtrl', ['$scope', '$http', '$location',

  function($scope, $http, $location) {
    $scope.items = [];

    $scope.login = function(user) {
        
    };
  }

]);


users.controller('UserSignupCtrl', ['$scope', '$http', '$location',

  function($scope, $http, $location) {
    $scope.items = [];
    $scope.master = {};
    $scope.signup = function(user) {
        $scope.master = angular.copy(user);
        $scope.master.toString();
        $http.post(API_ROOT+USERS_ROOT, {first_name:$scope.master.first_name, last_name:$scope.master.last_name, display_name:$scope.master.display_name, username:$scope.master.email, email:$scope.master.email, password:$scope.master.password}).
          success(function(data, status, headers, config){
            //alert(JSON.stringify(data));
            $location.path('login');
          }).
          error(function(data, status, headers, config){
            //alert(JSON.stringify(data));
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

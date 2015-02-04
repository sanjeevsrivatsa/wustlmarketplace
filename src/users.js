var users = angular.module('users', []);

users.controller('UserLoginCtrl', ['$scope', '$http', '$location', '$cookieStore',

  function($scope, $http, $location, $cookieStore) {
    $scope.items = [];

    $scope.login = function(user) {
      var str = [];
      str.push(encodeURIComponent("username") + "=" + encodeURIComponent(user.username));
      str.push(encodeURIComponent("password") + "=" + encodeURIComponent(user.password));
      str.join("&");

      $http.get(API_ROOT+LOGIN_ROOT+str).
        success(function(data, status, headers, config){
          $cookieStore.put("sessionToken", data.sessionToken);
          alert(JSON.stringify(data));
        }).
        error(function(data, status, headers, config){
          alert(JSON.stringify(data));
        });
    };
  }

]);


users.controller('UserSignupCtrl', ['$scope', '$http', '$location', '$cookieStore',

  function($scope, $http, $location, $cookieStore) {
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

var users = angular.module('users', []);

users.controller('UserLoginCtrl', ['$scope', '$http', '$location', '$cookieStore', '$rootScope',

  function($scope, $http, $location, $cookieStore, $rootScope) {
    $scope.items = [];

    $scope.login = function(user) {
      var str = [];

      $http({
        method: 'GET',
        url: API_ROOT+LOGIN_ROOT,
        params: {
            username: user.email,
            password: user.password
          }
         }).success(function(data){
           $rootScope.sessionToken = data.sessionToken;
           $rootScope.firstName = data.firstName;
           $rootScope.lastName = data.lastName;
            $cookieStore.put("sessionToken", data.sessionToken);
            $cookieStore.put("email", data.email);
            $cookieStore.put("first_name", data.firstName);
            $cookieStore.put("last_name", data.lastName);
            //alert(JSON.stringify(data));
            $location.path('/');
        }).error(function(data){
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
        alert(user.firstName);
        $http.post(API_ROOT+USERS_ROOT, {firstName:$scope.master.firstName, lastName:$scope.master.lastName, displayName:$scope.master.displayName, username:$scope.master.email, email:$scope.master.email, password:$scope.master.password}).
          success(function(data, status, headers, config){
            $location.path('login');
          }).
          error(function(data, status, headers, config){
            //alert(JSON.stringify(data));
          });
    };

    $scope.reset = function() {
      $scope.user = angular.copy($scope.master);
    }
    $scope.reset();
  }

]);

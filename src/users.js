var users = angular.module('users', []);

users.controller('UserLoginCtrl', ['$scope', 'Login', '$location', '$cookieStore', '$rootScope', '$http',

  function($scope, Login, $location, $cookieStore, $rootScope, $http) {
    $scope.user = {};

    $scope.login = function() {
      Login.login($scope.user, function(response) {
        $http.defaults.headers.common['X-Parse-Session-Token'] = response.sessionToken;
        $rootScope.sessionToken = response.sessionToken;
        $rootScope.firstName = response.firstName;
        $rootScope.lastName = response.lastName;
        $rootScope.currentUserId = response.objectId;
        $rootScope.loggedIn = true;
        $cookieStore.put("sessionToken", response.sessionToken);
        $cookieStore.put("email", response.email);
        $cookieStore.put("firstName", response.firstName);
        $cookieStore.put("lastName", response.lastName);
        $cookieStore.put("currentUserId", response.objectId);
        $location.path('/');
      });
    };
  }

]);


users.controller('UserSignupCtrl', ['$scope', 'User', '$location', '$cookieStore',

  function($scope, User, $location, $cookieStore) {
    $scope.user = {};

    $scope.signup = function() {
        $scope.user.username = $scope.user.email;
        User.signup($scope.user, function(response) {
          console.log(response);
          $location.path('login');
        });
    };
  }

]);

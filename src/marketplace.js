var API_ROOT = 'https://api.parse.com/1/';
var USERS_ROOT = 'users/';
var CLASSES_ROOT = 'classes/';
var LOGIN_ROOT = 'login/';
var ITEMS = 'Items/';
var COUNTER = 'Counter/'

var ALL_CATEGORIES = 'all';

var CATEGORIES = [
  'all',
  'apparel',
  'appliances',
  'bikes',
  'books',
  'cars',
  'electronics',
  'furniture',
  'housing',
  'miscellaneous',
  'wanted',
  'free',
];

var CATEGORY_COUNT_IDS = {
  'all': 'uxqQiCY7Uh',
  'apparel': 'EGRYCZ1D7D',
  'appliances': 'UJQOo0cfYg',
  'bikes': 'a2y1OuLCB8',
  'books': 'S6ELlcDjUx',
  'cars': 'pciWtJaYM2',
  'electronics': '5hHcz8zgnQ',
  'furniture': 'gQew90AYUq',
  'housing': 'VtekKqwXsy',
  'miscellaneous': 'HryWB8LtW4',
  'wanted': '0fEnCxfSVL',
  'free': 'sD0xhLj3Dt',
};

var marketplaceApp = angular.module('marketplaceApp', [
  'ngRoute',
  'ngResource',
  'ngCookies',
  'items',
  'users',
  'upload',
  'api'
]);

marketplaceApp.config(['$routeProvider', '$httpProvider', '$locationProvider',
  function($routeProvider, $httpProvider, $locationProvider, $cookies) {
    $routeProvider.
    when('/login', {
      templateUrl: 'partials/user-login.html',
      controller: 'UserLoginCtrl'
    }).
    when('/signup', {
      templateUrl: 'partials/user-signup.html',
      controller: 'UserSignupCtrl'
    }).
    when('/upload', {
      templateUrl: 'partials/upload_2.html',
      controller: 'UploadCtrl'
    }).
    when('/items', {
      templateUrl: 'partials/item-list.html',
      controller: 'ItemListCtrl'
    }).
    when('/items/:objectId', {
      templateUrl: 'partials/item-detail.html',
      controller: 'ItemDetailCtrl'
    }).
    otherwise({
      redirectTo: '/items'
    });

    $httpProvider.defaults.headers.common['X-Parse-Application-Id'] = '3Q4JMkdE3vmo8SY8gvndAQwKqd1AjumAV052JhGj';
    $httpProvider.defaults.headers.common['X-Parse-REST-API-Key'] = 'vY8kyfBLYYkBkX50Gd7XntVIs1JSzXc786cZHpwP';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
  }
]);

marketplaceApp.controller('MarketplaceCtrl', ['$scope', '$rootScope', '$cookieStore', '$http', '$window', '$location',
  function($scope, $rootScope, $cookieStore, $http, $window, $location) {
    $rootScope.currentUserId = $cookieStore.get('currentUserId');
    $rootScope.firstName = $cookieStore.get('firstName');
    var sessionToken = $cookieStore.get('sessionToken');
    if (sessionToken) {
        $http.defaults.headers.common['X-Parse-Session-Token'] = sessionToken;
        $rootScope.loggedIn = true;
    }

    $rootScope.logout = function() {
      $cookieStore.remove('currentUserId');
      $cookieStore.remove('firstName');
      $cookieStore.remove('sessionToken');
      $window.location.reload();
    }

    $scope.search = function() {
      console.log($scope.searchQuery);
      $window.location.href = "#/items?q="+$scope.searchQuery;
    }
  }
]);

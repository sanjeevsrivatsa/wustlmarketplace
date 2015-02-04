var API_ROOT = 'https://api.parse.com/1/';
var USERS_ROOT = 'users/';
var CLASSES_ROOT = 'classes/';
var LOGIN_ROOT = 'login/'
var ITEMS = 'Items/'

var marketplaceApp = angular.module('marketplaceApp', [
  'ngRoute',
  'ngCookies',
  'items',
  'users'
]);

marketplaceApp.config(['$routeProvider', '$httpProvider', '$locationProvider',
  function($routeProvider, $httpProvider) {
    $routeProvider.
    when('/login', {
      templateUrl: 'partials/user-login.html',
      controller: 'UserLoginCtrl'
    }).
    when('/signup', {
      templateUrl: 'partials/user-signup.html',
      controller: 'UserSignupCtrl'
    }).
    when('/items', {
      templateUrl: 'partials/item-list.html',
      controller: 'ItemListCtrl'
    }).
    when('/items/:itemId', {
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

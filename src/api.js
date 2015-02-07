var api = angular.module('api', []);

api.factory('Item', ['$resource', function($resource) {
	return $resource(API_ROOT+CLASSES_ROOT+ITEMS+':objectId', 
		{objectId: '@objectId'},
		{
			'query': {method: 'GET'}
		});
}]);

api.factory('Login', ['$resource', function($resource) {
	return $resource(API_ROOT+LOGIN_ROOT,
		null,
		{
			'login': {method: 'GET'}
		});
}]);

api.factory('User', ['$resource', function($resource) {
	return $resource(API_ROOT+USERS_ROOT,
		null,
		{
			'signup': {method: 'POST'}
		});
}]);

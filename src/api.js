var api = angular.module('api',
	['ngResource']);

api.factory('Items', ['$resource', function($resource) {
	return $resource(API_ROOT+CLASSES_ROOT+ITEMS+':objectId', 
		{objectId: '@objectId'},
		{
			'update': {method: 'PUT'}
		});
}]);
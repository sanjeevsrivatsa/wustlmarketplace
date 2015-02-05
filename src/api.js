var api = angular.module('api', []);

api.factory('Item', ['$resource', function($resource) {
	return $resource(API_ROOT+CLASSES_ROOT+ITEMS+':objectId', 
		{objectId: '@objectId'},
		{
			'query': {method: 'GET'}
		});
}]);
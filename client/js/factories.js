angular.module('proximo.factories', ['ngResource'])
    .factory('Contact', ['$resource', function($resource) {
        return $resource('/api/contact/:id', { id: '@id' }, {});
    }])

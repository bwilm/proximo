angular.module('proximo', ['ngRoute', 'ngResource', 'proximo.controllers', 'proximo.factories', 'proximo.directives', 'proximo.services'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: views/home.html,
                controller: HomeController
            })
            .when('/about', {
                templateUrl: views/about.html,
                controller: AboutController
            })
            .when('/main', {
                templateUrl: views/main.html,
                controller: MainController
            })
            .when('/result', {
                templateUrl: views/result.html,
                controller: ResultController
            })
            .otherwise({
                redirectTo: '/'
            });

        $locationProvider.html5Mode(true);
    }])

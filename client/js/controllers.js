angular.module('proximo.controllers', ['ngResource', 'ngRoute'])
    .controller('HomeController', ['$scope', 'GeolocationService', function($scope, GeolocationService) {
        let coordinates;
        GeolocationService.setCoordinates(function() {
            coordinates = GeolocationService.getCoordinates();
            GeolocationService.getPlaces();
        });

    }])
    .controller('AboutController', [function() {

    }])
    .controller('ResultController', [function() {

    }])
    .controller('SettingsController', [function() {
        
    }])
    .controller('MainController', [function() {

    }])

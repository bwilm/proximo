angular.module('proximo.controllers', ['ngResource', 'ngRoute'])
    .controller('HomeController', ['$scope', 'GeolocationService', function($scope, GeolocationService) {
        let coordinates;
        GeolocationService.geolocatePosition(function() {
            coordinates = GeolocationService.getCoordinates();
            console.log(coordinates);
        });

    }])
    .controller('AboutController', [function() {

    }])
    .controller('ResultController', [function() {

    }])
    .controller('MainController', [function() {

    

    }])

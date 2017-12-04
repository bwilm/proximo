angular.module('proximo.controllers', ['ngResource', 'ngRoute'])
    .controller('HomeController', ['GeolocationService', function(GeolocationService) {

        GeolocationService.getPosition();


    }])
    .controller('AboutController', [function() {

    }])
    .controller('ResultController', [function() {

    }])
    .controller('MainController', [function() {

    

    }])

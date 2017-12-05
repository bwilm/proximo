angular.module('proximo.controllers', ['ngResource', 'ngRoute'])
    .controller('HomeController', ['$scope', 'GeolocationService', 'Places',function($scope, GeolocationService, Places) {
        // let coordinates;
        // GeolocationService.setCoordinates(function() {
        //     coordinates = GeolocationService.getCoordinates();
        //     GeolocationService.getPlaces();
        // });

        let here = new Places({
            address: '434 Houston St, Nashville, TN 37203',
            radius: '500',
            type: 'restaurant',
            keywords: []
        })

        here.$save(results => {
            $scope.places = results;
            console.log($scope.places);
        })

        // Places.query({ id: '434 Houston St, Nashville, TN 37203'}, results => {
        //     console.log(results);
        // });


    }])
    .controller('AboutController', [function() {

    }])
    .controller('ResultController', [function() {

    }])
    .controller('SettingsController', [function() {
        
    }])
    .controller('MainController', [function() {

    }])

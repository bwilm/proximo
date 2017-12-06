angular.module('proximo.controllers', ['ngResource', 'ngRoute'])
    .controller('HomeController', ['$scope', 'GeolocationService', 'Places',function($scope, GeolocationService, Places) {


    }])
    .controller('AboutController', [function() {

    }])
    .controller('ResultController', [function() {

    }])
    .controller('SettingsController', ['$scope', '$location', 'GeolocationService', 'PlacesService', 'Places', function($scope, $location, GeolocationService, PlacesService, Places) {

        let coords;
        GeolocationService.setCoordinates(function() {
            coords = GeolocationService.getCoordinates();
        });

        $scope.start = function() {

            PlacesService.setPlaces({
                address: $scope.here,
                lat: coords.lat,
                lng: coords.lng,
                radius: '500',
                type: 'restaurant',
                keywords: []
            })

        }

    }])
    .controller('MainController', ['$scope', 'PlacesService', 'Places', function($scope, PlacesService, Places) {

        // Places.get({ id: }, response => {
        //     $scope.imageUrl = response;
        //     console.log(response);
        // })
    }])

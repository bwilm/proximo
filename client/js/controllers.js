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
            PlacesService.setPlaces({
                address: $scope.here,
                lat: coords.lat,
                lng: coords.lng,
                radius: '500',
                type: 'restaurant',
                keywords: []
            })

        });

        // $scope.start = function() {
        //
        //     PlacesService.setPlaces({
        //         address: $scope.here,
        //         lat: coords.lat,
        //         lng: coords.lng,
        //         radius: '500',
        //         type: 'restaurant',
        //         keywords: []
        //     })
        //
        // }

    }])
    .controller('MainController', ['$scope', '$rootScope', 'PlacesService', 'Places', function($scope, $rootScope, PlacesService, Places) {

        image = $rootScope.images.shift();

        $scope.imageUrl = "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&photoreference="+image.photo_reference+"&key=AIzaSyDeIyiRGq2YiHzZWgql9gPsJEPE9qND5bo";

        $scope.nextImage = function() {
            image = $rootScope.images.shift();
            $scope.imageUrl = "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&photoreference="+image.photo_reference+"&key=AIzaSyDeIyiRGq2YiHzZWgql9gPsJEPE9qND5bo";
        }

        // function getImage() {
        //     Places.get({ id: image.photo_reference}, response => {
        //         console.log(response);
        //         $scope.getImage = response;
        //
        //     })
        // }
        //
        // getImage()

        // Places.get({ id: }, response => {
        //     $scope.imageUrl = response;
        //     console.log(response);
        // })
    }])

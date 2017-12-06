angular.module('proximo.controllers', ['ngResource', 'ngRoute'])
    .controller('HomeController', ['$scope', 'GeolocationService', 'Places',function($scope, GeolocationService, Places) {

        GeolocationService.setCoordinates(function() {
            $scope.coords = GeolocationService.getCoordinates();

        });

    }])
    .controller('AboutController', [function() {

        let myStorage = window.localStorage;

        myStorage.setItem('myObj', {
            item: '1'
        });

        console.log(myStorage.getItem(`myObj`));

    }])
    .controller('ResultController', [function() {

    }])
    .controller('SettingsController', ['$scope', '$location', 'GeolocationService', 'PlacesService', 'Places', function($scope, $location, GeolocationService, PlacesService, Places) {

        $scope.start = function() {
            let coords = GeolocationService.getCoordinates();

            PlacesService.setPlaces({
                address: $scope.here || '',
                lat: coords.lat || 0,
                lng: coords.lng || 0,
                radius: '500',
                type: 'restaurant',
                keywords: []
            })

        }

    }])
    .controller('MainController', ['$scope', '$rootScope', 'PlacesService', 'Places', function($scope, $rootScope, PlacesService, Places) {

        $scope.placeImage = $rootScope.images.shift();

        $scope.imageUrl = "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&photoreference="+$scope.placeImage.photo_reference+"&key=AIzaSyDeIyiRGq2YiHzZWgql9gPsJEPE9qND5bo";

        $scope.nextImage = function() {
            $scope.placeImage = $rootScope.images.shift();
            $scope.imageUrl = "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&photoreference="+$scope.placeImage.photo_reference+"&key=AIzaSyDeIyiRGq2YiHzZWgql9gPsJEPE9qND5bo";
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

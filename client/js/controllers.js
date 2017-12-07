angular.module('proximo.controllers', ['ngResource', 'ngRoute'])
    .controller('HomeController', ['$scope', 'GeolocationService', 'Places',function($scope, GeolocationService, Places) {

        GeolocationService.setCoordinates(function() {
            $scope.coords = GeolocationService.getCoordinates();

        });

    }])
    .controller('AboutController', [function() {

        let myStorage = window.localStorage;

        myStorage.setItem('myObj', JSON.stringify({
            item: '1'
        }));

        let getStorage = myStorage.getItem(`myObj`);
        console.log(JSON.parse(getStorage));

    }])
    .controller('ResultController', ['$scope', function($scope) {

        let myStorage = window.localStorage;
        $scope.match = JSON.parse(myStorage.getItem('proximoMatch'));
        for (let i = 0; i < $scope.match.photos.length; i++) {
            $scope.match.photos[i].photo_reference = "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&photoreference="+$scope.match.photos[i].photo_reference+"&key=AIzaSyDeIyiRGq2YiHzZWgql9gPsJEPE9qND5bo";
        }
        console.log($scope.match);



    }])
    .controller('SettingsController', ['$scope', '$http', '$location', 'GeolocationService', 'PlacesService', 'Places', function($scope, $http, $location, GeolocationService, PlacesService, Places) {

        $scope.start = function() {
            let coords = GeolocationService.getCoordinates();

            PlacesService.setPlaces({
                address: $scope.here || '',
                lat: coords.lat || 0,
                lng: coords.lng || 0,
                radius: '5000',
                type: 'restaurant',
                keywords: []
            })

        }

    }])
    .controller('MainController', ['$scope', '$rootScope', 'PlacesService', 'Places', function($scope, $rootScope, PlacesService, Places) {

        let myStorage = window.localStorage;
        let images = JSON.parse(myStorage.getItem('proximoImages'));
        let positives = [];


        $scope.nextImage = function() {
            // $scope.placeImage = $rootScope.images.shift();
            currentImage = images.shift();
            console.log(positives);

            $scope.imageUrl = "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&photoreference="+currentImage.photo_reference+"&key=AIzaSyDeIyiRGq2YiHzZWgql9gPsJEPE9qND5bo";
        }

        $scope.positive = function() {
            let index = searchArray(positives, currentImage);

            if (index === null) {
                positives.push(currentImage)
                $scope.nextImage();
            } else if (positives[index].count === 1) {
                PlacesService.match(currentImage);
            } else {
                positives[index].count += 1;
                $scope.nextImage();
            }
        }

        function searchArray(array, item) {
            if (array.length > 0) {
                for (let i = 0; i < array.length; i++) {
                    if (item.placeId === array[i].placeId) {
                        return i;
                    }
                }
                return null;
            } else {
                return null;
            }
        }

        $scope.nextImage();

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

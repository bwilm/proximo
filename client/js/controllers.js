angular.module('proximo.controllers', ['ngResource', 'ngRoute'])
    .controller('HomeController', ['$scope', 'GeolocationService', 'Places',function($scope, GeolocationService, Places) {

        GeolocationService.setCoordinates(function() {
            $scope.coords = GeolocationService.getCoordinates();

        });

    }])
    .controller('AboutController', [function() {

    }])
    .controller('ResultController', ['$scope', 'PlacesService', function($scope, PlacesService) {

        let myStorage = window.localStorage;
        $scope.match = JSON.parse(myStorage.getItem('proximoMatch'));
        for (let i = 0; i < $scope.match.photos.length; i++) {
            $scope.match.photos[i].photo_reference = "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&photoreference="+$scope.match.photos[i].photo_reference+"&key=AIzaSyDeIyiRGq2YiHzZWgql9gPsJEPE9qND5bo";
        }
        let price = ''
        for (let i = 0; i < $scope.match.price; i++) {
            price += '$';
        }
        $scope.match.price = price;
        console.log($scope.match);

        $scope.reject = function() {
            console.log('1')
            let rejects = JSON.parse(myStorage.getItem('proximoRejects'));

            if (rejects) {
                rejects.push($scope.match.place_id);
            } else {
                rejects = [$scope.match.place_id];
            }

            myStorage.setItem('proximoRejects', JSON.stringify(rejects));
            console.log('2')
            PlacesService.setPlaces();

        }



    }])
    .controller('SettingsController', ['$scope', '$http', '$location', 'GeolocationService', 'PlacesService', 'Places', function($scope, $http, $location, GeolocationService, PlacesService, Places) {

        let myStorage = window.localStorage;
        settings = JSON.parse(myStorage.getItem('proximoSettings'));


        $scope.here = settings.address || '';
        $scope.range = settings.radius || '800';

        $scope.start = function() {
            let coords = GeolocationService.getCoordinates();

            let myStorage = window.localStorage;
            myStorage.setItem('proximoSettings', JSON.stringify({
                address: $scope.here || '',
                lat: coords.lat || 0,
                lng: coords.lng || 0,
                radius: $scope.range || '500',
                type: 'restaurant',
                keywords: ['-hotel']
            }));

            PlacesService.setPlaces();

        }

    }])
    .controller('MainController', ['$scope', '$rootScope', 'PlacesService', 'Places', function($scope, $rootScope, PlacesService, Places) {

        let myStorage = window.localStorage;
        let images = JSON.parse(myStorage.getItem('proximoImages'));
        let positives = [];


        $scope.nextImage = function() {
            // $scope.placeImage = $rootScope.images.shift();
            currentImage = images.shift();

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

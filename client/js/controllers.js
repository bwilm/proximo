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

            let images = []

            for (let i = 0; i < results.places.length; i++){
                for (let j = 0; j < results.places[i].photos.length; j++) {
                    images.push({
                        placeId: results.places[i].id,
                        photo_reference: results.places[i].photos[j].photo_reference
                    })
                }
            }
            console.log(images);
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

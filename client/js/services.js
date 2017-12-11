angular.module('proximo.services', ['ngResource', 'ngRoute'])
    .service('GeolocationService', [ '$rootScope', '$location', function($rootScope, $location) {

        let coords = {};
        let places;

        return {
            setCoordinates: setCoordinates,
            getCoordinates: getCoordinates
        }

        function setCoordinates() {

            $location.url('/loadscreen');

            let myStorage = window.localStorage;
            console.log('start')

            return navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position)
                myStorage.setItem('proximoCoords', JSON.stringify({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }));
                console.log('moving to settings');
                $location.path('/settings');
                $rootScope.$apply();
            }, function(err) {
                $location.path('/settings');
                $rootScope.$apply();
            });
        };

        function getCoordinates() {
            console.log(coords);
            return coords;
        }

    }])
    .service('PlacesService', ['$rootScope', '$location', 'Places', function($rootScope, $location, Places) {

        return {
            setPlaces: setPlaces,
            getPlaces: getPlaces,
            match: match
        }

        let images = []
        let myStorage = window.localStorage;

        function setPlaces() {
            let myStorage = window.localStorage;
            let query = JSON.parse(myStorage.getItem('proximoSettings'));

            let here = new Places({
                address: query.address,
                lat: query.lat,
                lng: query.lng,
                radius: query.radius,
                type: query.type,
                keywords: query.keywords
            })

            return here.$save(results => {

                let places = results.photos
                let images = []
                let myStorage = window.localStorage;
                let rejects = JSON.parse(myStorage.getItem('proximoRejects'));

                if (rejects && places[0]) {
                    for (let i = 0; i < places.length; i++) {
                        for (let j = 0; j < rejects.length; j++) {
                            if (places[i].place_id === rejects[j]) {
                                places.splice(i, 1);
                            }
                        }
                    }
                }

                myStorage.setItem('proximoPlaces', JSON.stringify(places));

                for (let i = 0; i < places.length; i++){
                    if (places[i].photos) {
                        for (let j = 0; j < places[i].photos.length; j++) {
                            images.push({
                                placeId: places[i].place_id,
                                photo_reference: places[i].photos[j].photo_reference,
                                height: places[i].photos[j].height,
                                width: places[i].photos[j].width,
                                count: 1
                            })
                        }
                    }

                }

                images = shuffle(images);
                myStorage.setItem('proximoImages', JSON.stringify(images));
                // $rootScope.images = images;
                $location.url('/main');
                return images;

            })
        }

        function getPlaces() {
            return places;
        }

        function match(image) {
            let myStorage = window.localStorage;
            let places = JSON.parse(myStorage.getItem('proximoPlaces'));
            let index = searchArray(places, image);
            myStorage.setItem('proximoMatch', JSON.stringify(places[index]));
            $location.url('/result');
        }

        function shuffle(array) {
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }

        function searchArray(array, item) {
            if (array.length > 0) {
                for (let i = 0; i < array.length; i++) {
                    if (item.placeId === array[i].place_id) {
                        return i;
                    }
                }
                return null;
            } else {
                return null;
            }
        }


    }])

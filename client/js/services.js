angular.module('proximo.services', [])
    .service('GeolocationService', ['$http', function($http) {

        let coords = {};
        let places;

        return {
            setCoordinates: setCoordinates,
            getCoordinates: getCoordinates
        }

        function setCoordinates(callbackFunction) {
            navigator.geolocation.getCurrentPosition(function(position) {
                coords = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                callbackFunction();
            });
        };

        function getCoordinates() {
            console.log(coords);
            return coords;
        }

    }])
    .service('PlacesService', ['$rootScope', 'Places', function($rootScope, Places) {

        return {
            setPlaces: setPlaces,
            getPlaces: getPlaces
        }

        let images = []

        function setPlaces(query) {
            let here = new Places({
                address: query.address,
                lat: query.lat,
                lng: query.lng,
                radius: query.radius,
                type: query.type,
                keywords: query.keywords
            })

            return here.$save(results => {

                places = results.photos;
                console.log(results.photos);

                let images = []

                for (let i = 0; i < places.length; i++){
                    for (let j = 0; j < places[i].photos.length; j++) {
                        images.push({
                            placeId: places[i].place_id,
                            photo_reference: places[i].photos[j].photo_reference
                        })
                    }
                }

                $rootScope.images = images;
                console.log(images);
                return images;

            })
        }

        function getPlaces() {
            return places;
        }


    }])

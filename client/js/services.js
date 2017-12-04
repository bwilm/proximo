angular.module('proximo.services', [])
    .service('GeolocationService', [function() {

        let coordinates = {}

        return {
            geolocatePosition: geolocatePosition,
            getCoordinates: getCoordinates
        }

        function geolocatePosition(callback) {
            navigator.geolocation.getCurrentPosition(function(position) {
                let currentLocation = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                console.log(currentLocation);
                coordinates = currentLocation;
                callback();
            });
        };

        function getCoordinates() {
            console.log(coordinates);
            return coordinates;
        }

    }])

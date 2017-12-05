angular.module('proximo.services', [])
    .service('GeolocationService', ['$http', function($http) {

        let coordinates = {};
        let places;

        return {
            setCoordinates: setCoordinates,
            getCoordinates: getCoordinates,
            getPlaces: getPlaces
        }

        function setCoordinates(callbackFunction) {
            navigator.geolocation.getCurrentPosition(function(position) {
                coordinates = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                };
                callbackFunction();
            });
        };

        function getCoordinates() {
            console.log(coordinates);
            return coordinates;
        }

        function getPlaces() {
            $http.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${coordinates.latitude},${coordinates.longitude}&radius=500&type=restaurant&key=AIzaSyD8qQGQBpA_SsxbErRvmMxiMdxRj-VD0TY`)
                .then(function(response) {
                    places = response.data;
                    console.log(places);
                })
        }

    }])

angular.module('proximo.services', [])
    .service('GeolocationService', [function() {

        return {
            getPosition: getPosition
        }

        function getPosition() {
            navigator.geolocation.getCurrentPosition(function(position) {
                console.log(position);
            });
        }

    }])

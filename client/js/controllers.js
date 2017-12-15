angular.module('proximo.controllers', ['ngResource', 'ngRoute'])
    .controller('HomeController', ['$scope', '$location',  'GeolocationService', 'Places',function($scope, $location, GeolocationService, Places) {



        const body = document.querySelector('body');
        const html = document.querySelector('html');
        const myStorage = window.localStorage;
        let settings = JSON.parse(myStorage.getItem('proximoSettings'));

        if (settings) {
            if (settings.type === 'restaurant') {
              html.classList.remove('background--on');
              body.classList.remove('background--on');
            } else if (settings.type === 'bar' && !$('html').hasClass('background--on')) {
              html.classList.add('background--on');
              body.classList.add('background--on');
            }

          }

        $scope.start = function() {
            GeolocationService.setCoordinates();
        }

    }])
    .controller('LoadingController', [function() {

    }])
    .controller('ResultController', ['$scope', 'PlacesService', function($scope, PlacesService) {

        let myStorage = window.localStorage;
        let current = JSON.parse(myStorage.getItem('proximoCoords'));
        let today = new Date();
        let day = today.getDay();

        let convertTime = function(t) {
            let hours = t[0]+t[1];
            let minutes = t[2]+t[3];
            let output;
            if (hours == 0) {
                output = "12";
            } else if (hours <= 10) {
                output = "" + hours[1];
            } else if (hours <= 12) {
                output = "" + hours;
            } else {
                output = "" + (hours - 12);
            }

            output += ":"+minutes;
            output += (hours >= 12) ? " PM" : " AM";
            return output;
        }


        $scope.match = JSON.parse(myStorage.getItem('proximoMatch'));
        $scope.hours = "";
        $scope.hours = convertTime($scope.match.hours.periods[day].open.time) + " - " + convertTime($scope.match.hours.periods[day].close.time)

        for (let i = 0; i < $scope.match.photos.length; i++) {
            $scope.match.photos[i].photo_reference = "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&photoreference="+$scope.match.photos[i].photo_reference+"&key=AIzaSyDeIyiRGq2YiHzZWgql9gPsJEPE9qND5bo";
        }
        let price = ''
        for (let i = 0; i < $scope.match.price; i++) {
            price += '$';
        }
        $scope.match.price = price;

        if (current) {
            let midpoint = {lat: ($scope.match.lat + current.lat)/2, lng: ($scope.match.lng + current.lng)/2};

            $scope.map = `https://maps.googleapis.com/maps/api/staticmap?center=${midpoint.lat},${midpoint.lng}&size=600x600&maptype=roadmap&markers=color:pink%7Clabel:Y%7C${current.lat},${current.lng}&markers=color:purple%7Clabel:${$scope.match.name[0]}%7C${$scope.match.lat},${$scope.match.lng}&key=AIzaSyD8qQGQBpA_SsxbErRvmMxiMdxRj-VD0TY`;
        } else {
            $scope.map = `https://maps.googleapis.com/maps/api/staticmap?center=${$scope.match.lat},${$scope.match.lng}&size=600x600&maptype=roadmap&markers=color:purple%7Clabel:${$scope.match.name[0]}%7C${$scope.match.lat},${$scope.match.lng}&key=AIzaSyD8qQGQBpA_SsxbErRvmMxiMdxRj-VD0TY`;
        }


        $scope.reject = function() {
            let rejects = JSON.parse(myStorage.getItem('proximoRejects'));

            if (rejects) {
                rejects.push($scope.match.place_id);
            } else {
                rejects = [$scope.match.place_id];
            }

            myStorage.setItem('proximoRejects', JSON.stringify(rejects));
            PlacesService.setPlaces();

        }

        $scope.fbPost = function () {
            var win = window.open(`http://www.facebook.com/share.php?u=https://radiant-castle-94303.herokuapp.com/`, '_blank');

            win.focus();
        }

        $scope.gPost = function() {
            var win = window.open(`https://plus.google.com/share?url=https%3A//radiant-castle-94303.herokuapp.com/`, '_blank');

            win.focus();
        }


        $scope.tweet = function() {
            var win = window.open(`http://twitter.com/home?status=Heading%20to%20${$scope.match.name}!%20Thanks,%20@proximo!`, '_blank');

            win.focus();

        }


    }])
    .controller('SettingsController', ['$scope', '$http', '$location', 'GeolocationService', 'PlacesService', 'Places', function($scope, $http, $location, GeolocationService, PlacesService, Places) {

        $scope.$on('gmPlacesAutocomplete::placeChanged', function(){
            $scope.here = $scope.autocomplete.getPlace().name;
            $scope.$apply();
        });


        const body = document.querySelector('body');
        const html = document.querySelector('html');
        const toggleBody = document.querySelector('.toggle-body');
        const toggleBtn = document.querySelector('.toggle-btn');
        const myStorage = window.localStorage;
        let settings = JSON.parse(myStorage.getItem('proximoSettings'));
        $scope.coords = JSON.parse(myStorage.getItem('proximoCoords'));

        if (!$scope.coords) {
            $scope.coords = false;
        }

        if (settings) {
          if (settings.type === 'restaurant') {
            html.classList.remove('background--on');
            body.classList.remove('background--on');
            toggleBody.classList.remove('toggle-body--on');
            toggleBtn.classList.remove('toggle-btn--on');
            toggleBtn.classList.remove('toggle-btn--scale');
            $scope.here = settings.address || '';
            $scope.range = settings.radius || '800';

          } else if (settings.type === 'bar' && !$('html').hasClass('background--on')) {
            html.classList.add('background--on');
            body.classList.add('background--on');
            toggleBody.classList.add('toggle-body--on');
            toggleBtn.classList.add('toggle-btn--on');
            toggleBtn.classList.add('toggle-btn--scale');

            $scope.range = settings.radius || '800';

          }

        } else {
          settings = {
            type: 'restaurant'
          };
          $scope.here = '';
          $scope.range = '800';

        }

        $scope.toggleMode = function() {
            html.classList.toggle('background--on');
            body.classList.toggle('background--on');
            toggleBody.classList.toggle('toggle-body--on');
            toggleBtn.classList.toggle('toggle-btn--on');
            toggleBtn.classList.toggle('toggle-btn--scale');

            if (settings.type === 'restaurant') {
                settings.type = 'bar';
            } else if (settings.type === 'bar') {
                settings.type = 'restaurant';
            }
        }

        $scope.start = function() {


            let myStorage = window.localStorage;
            if ($scope.keywords) {
                $scope.keywords = $scope.keywords.split(' ').concat(["-hotel -fast -gas"]);
            } else {
                $scope.keywords = ["-hotel -fast"];
            }

            myStorage.setItem('proximoSettings', JSON.stringify({
                address: $scope.here || '',
                lat: $scope.coords.lat || '',
                lng: $scope.coords.lng || '',
                radius: $scope.range || '800',
                type: settings.type || 'restaurant',
                keywords: $scope.keywords
            }));

            PlacesService.setPlaces();
            $location.url('/loadscreen');

        }

        function splitString(keywordList) {
            let arrayOfKeywords = keywordList.split(' ');
        }

    }])
    .controller('MainController', ['$scope', '$rootScope', 'PlacesService', 'Places', function($scope, $rootScope, PlacesService, Places) {

        let myStorage = window.localStorage;
        let images = JSON.parse(myStorage.getItem('proximoImages'));
        let positives = [];
        $scope.settings = JSON.parse(myStorage.getItem('proximoSettings'));


        $scope.nextImage = function() {
            // $scope.placeImage = $rootScope.images.shift();
            currentImage = images.shift();

            $scope.image = {
                url: "https://maps.googleapis.com/maps/api/place/photo?maxheight=1600&photoreference="+currentImage.photo_reference+"&key=AIzaSyDeIyiRGq2YiHzZWgql9gPsJEPE9qND5bo",
                isWide: isGreater(currentImage.width, currentImage.height),
                dimension: currentImage.width/currentImage.height,
            }
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

        function isGreater(first, second) {
            if (first > second) {
                return true;
            } else {
                return false;
            }
        }

        $scope.nextImage();
    }])

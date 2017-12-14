angular.module('proximo.directives', ['ngRoute', 'proximo.controllers'])
    .directive('backImg', [function() {

        return function(scope, element, attrs) {
            var url = attrs.backImg;
            element.css({
                'background-image': 'url(' + url + ')',
                'background-size': 'cover',
                'background-repeat': 'no-repeat',
                'background-position': 'center'

            })
        };
    }])

    .directive('navBar', [function(){
      return  {

        restrict: 'E',
        templateUrl: '../views/navbar.html',

      };


    }])

    .directive('googleplace', function() {
        return {
            require: 'ngModel',
            link: function(scope, element, attrs, model) {
                var options = {
                    types: [],
                    componentRestrictions: {}
                };
                scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

                google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
                    scope.$apply(function() {
                        model.$setViewValue(element.val());
                    });
                });
            }
        };
    });

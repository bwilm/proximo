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

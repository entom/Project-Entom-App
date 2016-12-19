var entomApp = angular.module('antomApp', ['ngRoute', 'ngMaterial', 'ngAnimate']);

var _templateBase = './app/templates';

entomApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: _templateBase + '/main/index.html',
        controller: 'HomeController'
    });
    $routeProvider.otherwise({redirectTo: '/'});
}
]);
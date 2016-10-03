/* global angular */
angular.module('gccg', [
  'gccg.home',
  'gccg.services',
  'ngRoute'
])
  .config(function($routeProvider) {
    $routeProvider
      .when('/home', {
        templateUrl: 'app/home/home.html',
        controller: 'HomeController'
      })
      .otherwise({
        redirectTo: '/home'
      });
  })

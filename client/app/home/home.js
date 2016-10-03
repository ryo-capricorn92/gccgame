/* global angular */
angular.module('gccg.home', [])
  .controller('HomeController', ['Home', function ($scope, Home) {
    angular.extend($scope, Home);
  }])

angular.module('stundenplanApp', ['ngRoute', 'LocalStorageModule'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/', { templateUrl: 'start.html' })
      .when('/about', { templateUrl: 'about.html'})
      .when('/generator', {templateUrl: 'generator.html'})
      .when('/export', {templateUrl: 'export.html'})
      .otherwise({ redirectTo: '/'});



  })
  

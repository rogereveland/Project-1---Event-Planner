'use strict';
/**
 * @ngdoc overview
 * @name eventPlannerApp
 * @description
 * # eventPlannerApp
 *
 * Main module of the application.
 */

angular
  .module('eventPlannerApp', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

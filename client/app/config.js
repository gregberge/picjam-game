'use strict';

/* App Module */

var PicJam = angular.module('PicJam', [
  'ui.router',
  'appControllers'
]);

PicJam.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  // For any unmatched url, redirect to homepage
  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);
  // Now set up the states
  $stateProvider
    .state('root', {
      url: '/',
      templateUrl: '/app/templates/index.html',
      controller: 'RootCtrl'
    });
});
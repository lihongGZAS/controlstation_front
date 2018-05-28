'use strict';

/**
 * description 在线计费管控台app
 * createTime:2017-1-16
 * createBy:yugd
 */
angular
  .module('controlstationFrontApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'restangular',
    'station.router',
    'station.controller',
    'station.service'
  ]);

  angular.module('station.service',[]);

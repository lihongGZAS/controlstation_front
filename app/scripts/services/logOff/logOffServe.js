'use strict';
angular.module('station.service')
  .service('logOffService', ['$log','Restangular',function ($log,Restangular) {
    return{
      logOff:fLogOff//退出登录
    };
    //根据条件查询
    function fLogOff(){
      Restangular.one('controlstation/common/exit').get({})
      .then(function(){
      },
      function error(msg){
        $log.error(msg);
      });
    }
}]);

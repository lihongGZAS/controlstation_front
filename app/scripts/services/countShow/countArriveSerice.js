'use strict';
/**
 * description   对账文件到达情况展示service
 * createTime    2017-1-16
 * createBy      mahong
 */
angular.module('station.service')
  .service('countArriveSerice', ['$log','Restangular',function ($log,Restangular) {
    return{
      query:fQuery,//根据条件查询
    };
    //根据条件查询
    function fQuery(params,callback){
      Restangular.all('controlstation/countShow/countFileArrive/countQuery').post(params)
      .then(function(result){
        callback(result);
      },
      function error(msg){
        $log.error(msg);
      });
    }
}]);

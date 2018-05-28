'use strict';
/**
 * description   结算稽核重跑service
 * createTime    2017-2-27
 * createBy      mahong
 */
angular.module('station.service')
  .service('settleCheckRerunService', ['$log','commonQueryService','Restangular',function ($log,commonQueryService,Restangular) {
    return{
      query:fQuery,//根据条件查询
      dayRerun:fDayRerun,//日报重跑
    };

    //根据条件查询
    function fQuery(params,callback){
      Restangular.all('controlstation/businessControl/settleCheckRerun/query').post(params)
      .then(function(result){
        callback(result);
      },
      function error(msg){
        $log.error(msg);
      });
    }
    //日月报重跑
    function fDayRerun(params,callback){
      Restangular.all('controlstation/businessControl/settleCheckRerun/reportRerun').post(params)
      .then(function(result){
        callback(result);
      },
      function error(msg){
        $log.error(msg);
      });
    }
  }]);

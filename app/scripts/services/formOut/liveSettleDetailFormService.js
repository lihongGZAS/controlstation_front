'use strict';
/**
 * description   在线计费详单报表service
 * createTime    2017-3-8
 * createBy      mahong
 */
angular.module('station.service')
  .service('liveSettleDetailFormService', ['$log','Restangular','commonQueryService',function ($log,Restangular,commonQueryService) {
    return{
      query:fQuery,//根据条件查询
      exportList:fExportList//根据查询条件导出
    };
    //根据条件查询
    function fQuery(params,callback){
      Restangular.all('controlstation/formOut/liveSettleDetailForm/query').post(params)
      .then(function(result){
        callback(result);
      },
      function error(msg){
        $log.error(msg);
      });
    }
    //根据条件导出
    function fExportList(params){
      commonQueryService.httpPost('/controlstation/formOut/liveSettleDetailForm/export',params);
    }
}]);

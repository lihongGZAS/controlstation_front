'use strict';
/**
 * description   在线计费结算报表
 * createTime    2017-3-9
 * createBy      lh
 */
angular.module('station.service')
  .service('liveBalanceSettleFormService', ['$log','$timeout','Restangular','commonQueryService',
    function ($log,$timeout,Restangular,commonQueryService) {
    return{
      query:fQuery,//根据条件查询
      export:fExport,//根据选项导出汇总表
      exports:fExports//根据选项导出明细表
    };
    //根据条件查询
    function fQuery(params,callback){
      Restangular.all('controlstation/formOut/settlementReport/reportQuery').post(params)
      .then(function(result){
        callback(result);
      },
      function error(msg){
        $log.error(msg);
      });
    }
    //根据选项导出
    function fExport(params) {
      commonQueryService.httpGet('/controlstation/formOut/settlementReport/reportExport',params);
    }

    //根据选项导出
    function fExports(params,callback) {
      Restangular.one('controlstation/formOut/settlementReport/verifyExcelDetail').get(params)
      .then(function(result){
        if(result.status === true){
          commonQueryService.httpGet('/controlstation/formOut/settlementReport/reportExports',params);
        }else{
          callback();
        }
      });
    }

}]);

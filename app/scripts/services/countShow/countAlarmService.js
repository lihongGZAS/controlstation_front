'use strict';
/**
 * description   告警情况展示
 * createTime    2017-1-16
 * createBy      lh
 */
angular.module('station.service')
  .service('countAlarmSer', ['$log','commonQueryService','Restangular',function ($log,commonQueryService,Restangular) {
    return{
      query:fQuery,//根据条件查询
      exportList:fExportList//导出列表
    };

    //根据条件查询
    function fQuery(params,callback){
      Restangular.all('controlstation/countShow/fileAlarm/fileAlarmQuery').post(params)
      .then(function(result){
        callback(result);
      },
      function error(msg){
        $log.error(msg);
      });
    }

    //根据选项导出
     function fExportList(params) {
      commonQueryService.httpGet('/controlstation/countShow/fileAlarm/export',params);
    }   
  }]);

'use strict';
/**
 * description   核减文件下载service
 * createTime    2017-2-28
 * createBy      mahong
 */
angular.module('station.service')
  .service('checkFileDownloadService', ['$log','Restangular','commonQueryService',function ($log,Restangular,commonQueryService) {
    return{
      query:fQuery,//根据条件查询
      downloadQuery:fileDownload,//根据条件下载
    };
    //根据条件查询
    function fQuery(params,callback){
      Restangular.all('controlstation/businessControl/checkFileDownload/query').post(params)
      .then(function(result){
        callback(result);
      },
      function error(msg){
        $log.error(msg);
      });
    }
     //根据条件下载
    function fileDownload(params){
      commonQueryService.httpGet('/controlstation/businessControl/reconDown/download',params);
    }
}]);
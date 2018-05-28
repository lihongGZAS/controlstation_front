'use strict';
/**
 * description   对账文件下载service
 * createTime    2017-3-1
 * createBy      mahong
 */
angular.module('station.service')
  .service('reconDownService', ['$log','Restangular','commonQueryService',function ($log,Restangular,commonQueryService) {
  	return{
      query:fQuery,//根据条件查询
      accountDownload:fileDownload//
  	};

  	//根据条件查询
  	function fQuery(params,callback){
  		Restangular.all('controlstation/businessControl/reconDown/query').post(params)
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

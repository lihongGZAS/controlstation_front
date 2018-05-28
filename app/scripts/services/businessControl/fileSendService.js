'use strict';
/**
 * description   文件下发
 * createTime    2017-3-5
 * createBy      kxd
 */
angular.module('station.service')
  .service('fileSendService', ['$log','Restangular',function ($log,Restangular) {
  	return{
      query:fQuery,//根据条件查询
      audit:fAudit,//审核
      fileSend:fFileSend//文件下发
  	};

  	//根据条件查询
  	function fQuery(params,callback){
  		Restangular.all('controlstation/businessControl/fileSend/query').post(params)
      .then(function(result){
       	callback(result);
      },
      function error(msg){
        $log.error(msg);
      });
  	}
    // 根据选项进行审核
    function fAudit(params,callback){
      Restangular.all('controlstation/businessControl/fileSend/audit').post(params)
      .then(function(result){
        callback(result);
      },
      function error(msg){
        $log.error(msg);
      });
    }
    //根据选项进行下发
    function fFileSend(params,callback){
      Restangular.all('controlstation/businessControl/fileSend/sendDown').post(params)
      .then(function(result){
        callback(result);
      },
      function error(msg){
        $log.error(msg);
      });
    }
    
  }]);
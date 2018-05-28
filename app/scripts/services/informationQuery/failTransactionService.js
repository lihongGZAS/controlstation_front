'use strict';

/**
 * description   签到签退状态展示service
 * createTime    2017-1-16
 * createBy      yugd
 */
angular.module('station.service')
  .service('failTransactionService', ['$log','Restangular',function ($log,Restangular) {
  	return{
      query:fQuery,//根据条件查询
  	};

  	//根据条件查询
  	function fQuery(params,callback){
  		Restangular.all('controlstation/informationQuery/failTransaction/query').post(params)
      .then(function(result){
       	callback(result);
      },
      function error(msg){
        $log.error(msg);
      });
  	}
    
  }]);

'use strict';

/**
 * description   对账差异情况展示service
 * createTime    2017-1-18
 * createBy      mahong
 */
angular.module('station.service')
  .service('countDiffService', ['$log','Restangular',function ($log,Restangular) {
  	return{
      query:fQuery,//根据条件查询
  	};

  	//根据条件查询
  	function fQuery(params,callback){
  		Restangular.all('controlstation/countShow/countDifferent/query').post(params)
      .then(function(result){
       	callback(result);
      },
      function error(msg){
        $log.error(msg);
      });
  	}
  }]);

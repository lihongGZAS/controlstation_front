'use strict';
/**
 * description   对账文件重跑
 * createTime    2017-3-8
 * createBy      lihong
 */
angular.module('station.service')
  .service('reconRerunService', ['$log','Restangular',function ($log,Restangular) {
  	return{
      query:fQuery,//根据条件查询
      provinceRerun: fProvinceRerun,//根据选项进行省重跑
      subtractRerun: fSubtractRerun//根据选项进行核减重跑
  	};

  	//根据条件查询
  	function fQuery(params,callback){
  		Restangular.all('controlstation/businessControl/accountFileRerun/accountFileQuery').post(params)
      .then(function(result){
       	callback(result);
      },
      function error(msg){
        $log.error(msg);
      });
  	}
    
    //根据选项省重跑
    function fProvinceRerun(params, callback){
      Restangular.all('controlstation/businessControl/accountFileRerun/provinceRerun').post(params)
      .then(function(result){
        callback(result);
      },
      function error(msg){
        $log.error(msg);
      });     
    }

    //根据选项核减重跑
    function fSubtractRerun(params, callback){
      Restangular.all('controlstation/businessControl/accountFileRerun/subtractRerun').post(params)
      .then(function(result){
        callback(result);
      },
      function error(msg){
        $log.error(msg);
      });
    }
  }]);

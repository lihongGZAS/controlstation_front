 'use strict';
 
angular.module('station.service')
  .service('commonQueryService', ['$log','Restangular',function ($log,Restangular) {
  	return{
      httpPost:fHttpPost,//post请求下载
      httpGet:fHttpGet,
      queryProvince:fQueryProvince,//查询所有省份信息
      firstQueryBusinessLine:fQueryBusinessLine,//查询一级业务线信息
      secondQueryBusinessLine:sQueryBusinessLine,//查询子级业务线信息
      setQueryBackCode:queryBackCode//查询返回码
  	};

     //get请求下载
    function fHttpGet(url,params){
      var form = document.createElement('form');
      form.style = 'display:none';
      form.method = 'get';
      form.action = url;
      for(var i in params){
        var input = document.createElement('input');
        input.setAttribute('type','text');
        input.setAttribute('name',i);
        input.setAttribute('value',params[i]||'');
        form.appendChild(input);
      }
      document.body.appendChild(form);
      form.submit();
      form.parentNode.removeChild(form);  
    }

    //post请求下载
    function fHttpPost(url,params){
      var form = document.createElement('form');
      form.style = 'display:none';
      form.method = 'post';
      form.action = url;
      for(var i in params){
        var input = document.createElement('input');
        input.setAttribute('type','text');
        input.setAttribute('name',i);
        input.setAttribute('value',params[i]||'');
        form.appendChild(input);
      }
      document.body.appendChild(form);
      form.submit();
      form.parentNode.removeChild(form);
      /*$http({
          url: url,
          method: "POST",
          headers: {'Content-type': 'application/json'},
          data: params,
          responseType: 'arraybuffer'
      }).then(function (data) {
          debugger;
          var blob = new Blob([data.data], {type: "application/vnd.ms-excel"});
          var objectUrl = URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.setAttribute('style', 'display:none');
          a.setAttribute('href', objectUrl);
          a.click();
          URL.revokeObjectURL(objectUrl);
      });*/
    }

  	//查询所有省份信息
  	function fQueryProvince(callback){
  		Restangular.all('controlstation/commonQuery/province/query').post()
      .then(function(result){
       	callback(result);
      },
      function error(msg){
        $log.error(msg);
      });
  	}

    //查询一级业务线信息
    function fQueryBusinessLine(callback){
      Restangular.all('controlstation/commonQuery/firstBusinessLine/query').post()
      .then(function(result){
        callback(result);
      },
      function error(msg){
        $log.error(msg);
      });
    }
    //查询子级业务线信息
    function sQueryBusinessLine(params,callback){
      Restangular.all('controlstation/commonQuery/secondBusinessLine/query').post(params)
      .then(function(result){
        callback(result);
      },
      function error(msg){
        $log.error(msg);
      });
    }
    //查询返回码
    function queryBackCode(callback){
       Restangular.all('controlstation/commonQuery/backCode/query').post()
      .then(function(result){
        callback(result);
      },
      function error(msg){
        $log.error(msg);
      });
    }
  }]);

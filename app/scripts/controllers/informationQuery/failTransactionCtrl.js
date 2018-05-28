'use strict';

/**
 * description   失败交易查询
 * createTime    2017-1-16
 * createBy      yugd
 */
angular.module('station.controller')
  .controller('failTransactionCtrl',['$scope','commonService','commonQueryService','dateTimeService', 'failTransactionService',
  function($scope,commonService,commonQueryService,dateTimeService,failTransactionService) {
  	
  	//页面初始化
  	$scope.initPage = function(){
      //设置时间控件
      dateTimeService.setTimePicker('day',1,'dealDate');
      //初始化分页数据
      $scope.page = {
        totalCount:0,
        pageSize:10,
        currentPage:1
      };
      //初始化查询条件
  		$scope.queryParams = { 
        firstBusLineCode:'', //业务线code码
        secondBusLineCode:'',//子级业务线code码
        oriTradeSeqno:'' ,   //咪咕原订单编号
        oriTradeSession:'',  //咪咕原业交易流水号
        backCode:'',         //返回码为查询交易应答码或者是错误代码
        dealDate:dateTimeService.getNewTime('day',1),//日期格式为YYYY-MM-DD,默认值为当天日期-1天
        currentPage:1,       //当前页
        pageSize:10          //每页条数
  		};
      //查询一级业务线
      commonQueryService.firstQueryBusinessLine(function(result){
        $scope.businessLines = result.data;
      });
      //查询返回码
      commonQueryService.setQueryBackCode(function(result){
        $scope.backCodes = result.data;
      });
  		$scope.queryByCondition();//初始化查询
  	};

    //查询子集业务线
    $scope.setSecondBus = function(){
      var firstCode = $scope.queryParams.firstBusLineCode;
      if (firstCode !== '') {
          commonQueryService.secondQueryBusinessLine({firstBusLineCode:firstCode},function(result){
            $scope.secondBusinessLines = result.data;
          });
        }
    };
    
    //点击查询按钮
    $scope.queryBtn = function(){
      $scope.queryParams.currentPage = 1;
      $scope.queryByCondition();
    };

  	//根据条件查询
  	$scope.queryByCondition = function(){
  		failTransactionService.query($scope.queryParams,function(result){
        if(Array.isArray($scope.queryParams.backCode)){
          $scope.queryParams.backCode = $scope.queryParams.backCode.join();
        }
        if(Array.isArray($scope.queryParams.secondBusLineCode)){
          $scope.queryParams.secondBusLineCode = $scope.queryParams.secondBusLineCode.join();
        }
  			if('10000'===result.state){
  				$scope.resultDas = result.data.datas;
          $scope.page.totalCount = result.data.totalCount;
          $scope.page.currentPage = $scope.queryParams.currentPage;
  			}else{
  				$scope.setNoticeMsg('error',result.desc);
  			}
  		});
  	};

    //分页查询
    $scope.getNewPageData = function(pageSize,currentPage){
      $scope.queryParams.pageSize =  pageSize;
      $scope.queryParams.currentPage = currentPage;
      $scope.queryByCondition();
    };

    /**
     * [如果表格高度超出可视高度，添加滚动条，并重新设置表头内容]
     * @param {[type]} tableId [表格id]
     */
    $scope.checkTable = function(tableId){
      commonService.checkTable(tableId);
    };
    
  }]);

'use strict';

/**
 * description   签到签退状态展示
 * createTime    2017-1-16
 * createBy      yugd
 */
angular.module('station.controller')
  .controller('signInOutCtrl',['$scope','commonService','commonQueryService','dateTimeService', 'signInOutService',
   function($scope,commonService,commonQueryService,dateTimeService,signInOutService) {
  	//页面初始化
  	$scope.initPage = function(){
      //设置时间控件
      dateTimeService.setStartEnd('day',32,'startDate',1,'endDate');

      $scope.page = {   //初始化分页数据
        totalCount:0,
        pageSize:10,
        currentPage:1
      };
      //初始化查询条件
  		$scope.queryParams = { 
  			provinceCodes:'',    //单选下拉框，全国31个省，默认为全部
				signStatus:'' ,      //单选下拉框，包括签到签退，默认为全部
				startDate:dateTimeService.getNewTime('day',32),//日期控件，格式YY-MM-DD，默认为当天-1天
				endDate:dateTimeService.getNewTime('day',1),
        currentPage:1,       //当前页
			  pageSize:10          //每页条数
  		};
      //查询所有省份
      commonQueryService.queryProvince(function(result){
        $scope.provinces = result.data;
      });

  		$scope.queryByCondition();//初始化查询
  	};

    //点击查询按钮
    $scope.queryBtn = function(){
      $scope.queryParams.currentPage = 1;
      $scope.queryByCondition();
    };

  	//根据条件查询
  	$scope.queryByCondition = function(){
  		signInOutService.query($scope.queryParams,function(result){
        if(Array.isArray($scope.queryParams.provinceCodes)){
          $scope.queryParams.provinceCodes = $scope.queryParams.provinceCodes.join();
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

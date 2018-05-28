'use strict';

/**
 * description   对账差异展示情况controller
 * createTime    2017-1-16
 * createBy      mahong
 */
angular.module('station.controller')
  .controller('countDiffCtrl',['$scope','commonService','commonQueryService','dateTimeService','countDiffService','$timeout', function($scope,commonService,commonQueryService,dateTimeService,countDiffService,$timeout) {
  	
  	//页面初始化
  	$scope.initPage = function(){
      //设置时间控件
      dateTimeService.setTimePicker('day', 0,'countDiffDate');
      $scope.page = {   //初始化分页数据
        totalCount:0,
        pageSize:10,
        currentPage:1
      };
  		$scope.queryParams = { //初始化查询条件
				countDiffDate:dateTimeService.getNewTime('day',1),//日期控件，格式YY-MM-DD，默认为当天-1天
        provinceCode:'', //省公司
        outerBusinessman:'', //外部商户
        diffType:'' , //差异类型
        diffTotal:'', //差异条数
        status:'0' , //状态：已生成，已下发
				currentPage:1,       //当前页
			  pageSize:10          //每页条数
  		};
      commonQueryService.queryProvince(function(result){
        $scope.provinces = result.data;
      });
  		$scope.queryByCondition();//初始化查询
  	};
    //点击查询恢复到第一页
    $scope.queryByCondition1 = function(){
      $scope.queryParams.currentPage = 1;
      $scope.queryByCondition();
    };
  	//根据条件查询
  	$scope.queryByCondition = function(){
  		countDiffService.query($scope.queryParams,function(result){
  			if('10000'===result.state){
  				$scope.resultDas = result.data.datas;
          $scope.totalData = result.data.totalNumber;
          $scope.page.totalCount = result.data.totalCount;
          $scope.page.currentPage = $scope.queryParams.currentPage;
  			}else{
          $scope.resultDas = [];
          $scope.totalData = {};//清空总计
          $scope.page.totalCount = 0;
          $scope.page.currentPage = 1;
  				$scope.setNoticeMsg('error',result.desc);
          $timeout(function(){
            $scope.checkTable('formTable');
          },0)
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

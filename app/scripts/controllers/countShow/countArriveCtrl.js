'use strict';

/**
 * description   对账到达情况展示controller
 * createTime    2017-1-18
 * createBy      mahong
 */
 angular.module('station.controller')
 .controller('countArriveCtrl',['$scope','$compile','commonService','commonQueryService','dateTimeService','countArriveSerice', function($scope,$compile,commonService,commonQueryService,dateTimeService,countArriveSerice) {
    //页面初始化
    $scope.initPage = function(){
      //对账文件状态
      $scope.statuses = [
        {status:'0',statusName:'文件重传成功'},
        {status:'1',statusName:'文件部分到达'},
        {status:'2',statusName:'文件到达成功'},
        {status:'3',statusName:'文件到达异常'},
        {status:'4',statusName:'入库处理中'},
        {status:'5',statusName:'数据异常,入库失败'},
        {status:'6',statusName:'入库成功'},
        {status:'10',statusName:'文件暂时作废'}
      ];

      //设置时间控件
      dateTimeService.setTimePicker('day', 0,'countDate');

      $scope.page = {   //初始化分页数据
        totalCount:0,
        pageSize:10,
        currentPage:1
      };

      //初始化查询条件
      $scope.queryParams = { 
        fileType:'对账文件',//文件类型
        outerBusinessman:'',//外部商户
        provinceCode:'',   //单选下拉框，全国31个省和咪咕缴费业务平台，默认为全部
        countDate:dateTimeService.getNewTime('day',1),//日期控件，格式YY-MM-DD，默认为当天-1天
        status:'', //单选下拉框,全部、01文件部分到达、02文件新到达、03文件到达成功、04文件到达异常、05入库处理中、06数据异常、07入库失败、08入库成功,默认为（全部）
        countFileName:'',//
        currentPage:1,       //当前页
        pageSize:10         //每页条数
      };

      //初始化查询所有省份
      commonQueryService.queryProvince(function(result){
        $scope.provinces = result.data;
      });
      $scope.outerBusinessman = true;
      //初始化查询
      $scope.queryByCondition();

    };

    //点击查询恢复到第一页
    $scope.queryByCondition1 = function(){
      $scope.queryParams.currentPage = 1;
      $scope.queryByCondition();
    };
    //根据条件查询
    $scope.queryByCondition = function(){
      countArriveSerice.query($scope.queryParams,function(result){
        if('10000'===result.state){
          $scope.resultDas = result.data.datas;
          //选择核减文件点击查询把外部商户列表隐藏
          if($scope.queryParams.fileType === '核减文件'){
            $scope.outerBusinessman = false;
          }else{
            $scope.outerBusinessman = true;
          }
          $scope.page.totalCount = result.data.totalCount;
          $scope.page.currentPage = $scope.queryParams.currentPage;
        }else{
          $scope.resultDas = [];
          $scope.page.totalCount = 0;
          $scope.page.currentPage = 1;
          $scope.setNoticeMsg('error',result.desc);
        }
      });
    };

    //重置查询为默认情况
    $scope.resetByCondition = function(){
      //账期默认为日
      dateTimeService.changeTimePicker('day',0,'countDate',$compile,$scope);

      //重置询条件
      $scope.queryParams = { 
        fileType:'对账文件',//文件类型
        outerBusinessman:'',//外部商户
        provinceCode:'',   //单选下拉框，全国31个省和咪咕缴费业务平台，默认为全部
        countDate:dateTimeService.getNewTime('day',1),//日期控件，格式YY-MM-DD，默认为当天-1天
        status:'', //单选下拉框,全部、01文件部分到达、02文件新到达、03文件到达成功、04文件到达异常、05入库处理中、06数据异常、07入库失败、08入库成功,默认为（全部）
        countFileName:'',//
        currentPage:1,       //当前页
        pageSize:10         //每页条数
      };

      //重置查询让外部商户回复查询状态
      $scope.isDisabled = false;
    };
    
    //根据文件类型判断外部商户是否置空
    $scope.changeOuterBusMan = function(){
      $scope.isDisabled = false;
      if ($scope.queryParams.fileType === '核减文件') {
        $scope.isDisabled = true;
        dateTimeService.changeTimePicker('month',0,'countDate',$compile,$scope);
        $scope.queryParams.countDate = dateTimeService.getNewTime('month',1);
      }else{
        dateTimeService.changeTimePicker('day',0,'countDate',$compile,$scope);
        $scope.queryParams.countDate = dateTimeService.getNewTime('day',1);
      }
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

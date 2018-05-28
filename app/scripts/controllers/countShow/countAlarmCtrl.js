'use strict';
/**
 * description   告警情况展示
 * createTime    2017-1-16
 * createBy      lh
 */
angular.module('station.controller')
  .controller('countAlarmCtrl',['$scope','$compile','$routeParams','$filter','commonService','commonQueryService','dateTimeService','countAlarmSer',
    function($scope,$compile,$routeParams,$filter,commonService,commonQueryService,dateTimeService,countAlarmSer) {

    $scope.exportDa = {};//导出对象

    //页面初始化
    $scope.initPage = function(){
      //设置时间控件
      dateTimeService.setStartEnd('day', 30, 'choiceStartTime', 0, 'choiceEndTime');
      
      //初始化分页数据
      $scope.page = {   
        totalCount:0,
        pageSize:10,
        currentPage:1
      };

      //初始化查询条件
      $scope.queryParams = { 
        alarmStartTime:dateTimeService.getNewTime('day',30),//日期控件，格式yyyy-MM-dd，默认为当天-30天
        alarmEndTime:dateTimeService.getNewTime('day',0),//日期控件，格式yyyy-MM-dd，默认为当天-1天
        businessLine: '',//外部商户，可选项为全部、咪咕（0068）、互联网（0071）；默认值为全部；
        provinceCode: '',//省份编码Code, 可选项为全部、31个省份；默认值为全部；
        currentPage:1,       //当前页
        pageSize:10         //每页条数
      };

      // 省份查询
      commonQueryService.queryProvince(function(result){
        $scope.provinces = result.data;
      });

      $scope.queryByCondition();//初始化查询
    };

    //点击查询当前页置为首页
    $scope.queryByCondition1=function(){
      $scope.queryParams.currentPage=1;
      $scope.queryByCondition();
    };
    
    //根据条件查询
    $scope.queryByCondition = function(){
      $scope.exportArr=[];
      countAlarmSer.query($scope.queryParams,function(result){
        if('10000'===result.state){
          $scope.exportDa.alarmStartTime = $scope.queryParams.alarmStartTime;
          $scope.exportDa.alarmEndTime = $scope.queryParams.alarmEndTime;
          $scope.resultDas = result.data.datas;
          $scope.page.totalCount = result.data.totalCount;
          $scope.page.currentPage = $scope.queryParams.currentPage;
        }else{
          $scope.resultDas = [];
          $scope.exportDa = {};//清空导出数据
          $scope.page.totalCount = 0;
          $scope.page.currentPage = 1;
          $scope.setNoticeMsg('error',result.desc);
        }
      });
    };

    //全选及取消全选
    $scope.proCheckbox = function(type,checkList,num){
      var newList = commonService.checkboxClick(type,checkList,num);
      $scope.exportArr = [];
      angular.forEach(newList,function(data){
        $scope.exportArr.push(data.id);
      });
    };
    //导出
    $scope.export = function(){
      if($scope.exportArr&&$scope.exportArr.length > 0){
        $scope.exportDa.id = $scope.exportArr.join(',');
        $scope.exportDa.businessLine = $scope.queryParams.businessLine;
        $scope.exportDa.provinceCodeAry = $scope.queryParams.provinceCode.split(',');
        countAlarmSer.exportList($scope.exportDa);
      }else{
        $scope.setNoticeMsg('warn','请先勾选数据，再进行导出!');
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
      $compile(angular.element('.tableHead'))($scope);
    };
  }]);
'use strict';

/**
 * description   在线计费详单报表controller
 * createTime    2017-3-4
 * createBy      mahong
 */
angular.module('station.controller')
  .controller('liveSettleDetailFormCtrl',['$scope','$compile','commonService','commonQueryService','dateTimeService','liveSettleDetailFormService', function($scope,$compile,commonService,commonQueryService,dateTimeService,liveSettleDetailFormService) {
    //页面初始化
    $scope.initPage = function(){
      //设置时间控件
      dateTimeService.setTimePicker('day',0,'accountDate');
      $scope.queryParams = { //初始化查询条件
        accountDate: dateTimeService.getNewTime('day',1),//日期控件，格式YY-MM-DD，默认为当天-1天
        provinceCode:'',//省份编码
        outerBusinessman:'',//外部商户，默认全部，0068咪咕，0071互联网
        formType:'日详单',//报表出具
      };

      //账期日和账期月显示控制
      $scope.stateControl = {
        title:'全部在线计费日详单',
        dateType:'day',
        accountDate:($scope.queryParams.accountDate).replace(/-/g,'')//结算账期
      };

      commonQueryService.queryProvince(function(result){
        $scope.provinces = result.data;
      });
      $scope.queryByCondition();//初始化查询
    };

    //根据条件查询
    $scope.queryByCondition = function(){
      liveSettleDetailFormService.query($scope.queryParams,function(result){
        $scope.exportState = result.state;
        var busName = '全部在线计费';
        if($scope.queryParams.outerBusinessman===''){
          busName = '全部在线计费';
        }else if($scope.queryParams.outerBusinessman==='0068'){
          busName = '咪咕在线计费';
        }else if($scope.queryParams.outerBusinessman==='0071'){
          busName = '互联网在线计费';
        }
        if ($scope.queryParams.formType === '日详单') {
          $scope.stateControl.title = busName+'日详单';
          $scope.stateControl.dateType = 'day';
        }else{
          $scope.stateControl.title = busName+'月详单';
          $scope.stateControl.dateType = 'month';
        }
        $scope.stateControl.accountDate = $scope.queryParams.accountDate.replace(/-/g,'');
        if('10000'===result.state){
          $scope.monthData = result.data.datas;
          $scope.monthDetail = result.data.totalNumber;
        }else{
          $scope.monthData = [];
          $scope.monthDetail = {};
          if(angular.element('.fixedHead')){
            angular.element('.fixedHead').remove();
          }
          $scope.setNoticeMsg('error',result.desc);
        }
      });
    };
    
    //报表数据导出
    $scope.export = function(){
      if ($scope.exportState ==='10000') {
        liveSettleDetailFormService.exportList($scope.queryParams);
      }else{
        $scope.setNoticeMsg('warn','查询数据为空，无法进行导出操作!');
      }
    };
    //报表类型选择来控制日或月的账期
    $scope.changeFormType = function(){
      if('日详单'===$scope.queryParams.formType){
        dateTimeService.changeTimePicker('day',0,'accountDate',$compile,$scope);
        $scope.queryParams.accountDate = dateTimeService.getNewTime('day',1);
      }else{
        dateTimeService.changeTimePicker('month',0,'accountDate',$compile,$scope);
        $scope.queryParams.accountDate = dateTimeService.getNewTime('month',1);
      }
    };
  }]);

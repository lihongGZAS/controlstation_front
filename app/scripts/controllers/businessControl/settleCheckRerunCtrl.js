'use strict';
/**
 * description   结算稽核重跑controller
 * createTime    2017-2-26
 * createBy      mahong
 */
 angular.module('station.controller')
 .controller('settleCheckRerunCtrl',['$scope','$filter','$compile','$cookieStore','commonService','commonQueryService','dateTimeService','settleCheckRerunService',
  function($scope,$filter,$compile,$cookieStore,commonService,commonQueryService,dateTimeService,settleCheckRerunService) {
    
    //页面初始化
    $scope.initPage = function(){
      //设置时间控件
      dateTimeService.setTimePicker('day',0,'settleDate');
      //初始化查询
      $scope.queryParams = { //初始化查询条件
        provinceCode: '',    //单选下拉框，全国31个省，默认为全部
        businessLine:'' ,     //外部商户
        settleDate:dateTimeService.getNewTime('day',1),//日期控件，格式YY-MM-DD，默认为当天-1天
        dateType:'DAY',//日期选择类型
      };
      //账期日和账期月显示控制
      $scope.stateControl = {
        title:'全部在线计费日详单',
        dateType:'DAY',
        dateName:'结算账期日:',//名称
        settleDate:$scope.queryParams.settleDate,//结算账期
      };
      //查询所有省份
      commonQueryService.queryProvince(function(result){
        $scope.provinces = result.data;
      });
      //初始化查询
      $scope.queryByCondition();
    };

    //改变日期选择类型
    $scope.changeDateType = function(){
      if('DAY'===$scope.queryParams.dateType){
        dateTimeService.changeTimePicker('day',0,'settleDate',$compile,$scope);
        $scope.queryParams.settleDate = dateTimeService.getNewTime('day',1);
      }else{
        dateTimeService.changeTimePicker('month',0,'settleDate',$compile,$scope);
        $scope.queryParams.settleDate = dateTimeService.getNewTime('month',1);
      }
    };

    //根据条件查询
    $scope.queryByCondition = function(){
      var myTest = $cookieStore.get('reconRerunSet');

      if(myTest){
        myTest.dateType = 'DAY';
        $scope.queryParams = myTest;
        settleCheckRerunService.query($scope.queryParams,function(result){
          var busName = '全部';
          if($scope.queryParams.businessLine===''){
            busName = '全部在线计费';
          }else if($scope.queryParams.businessLine==='0068'){
            busName = '咪咕在线计费';
          }else if($scope.queryParams.businessLine==='0071'){
            busName = '互联网在线计费';
          }
          if ($scope.queryParams.dateType === 'DAY') {
            $scope.stateControl.title = busName+'日详单';
            $scope.stateControl.dateType = 'DAY';
            $scope.stateControl.dateName = '结算账期日:';
            $scope.dayModel = '日';
            $scope.runMonthState = false;
            $scope.runDayState = true;
          }else{
            $scope.stateControl.title = busName+'月详单';
            $scope.stateControl.dateType = 'MONTH';
            $scope.stateControl.dateName = '结算账期月:';
            $scope.monthModel = '月';
            $scope.runMonthState = true;
            $scope.runDayState = false;
          }
          $scope.stateControl.settleDate = $scope.queryParams.settleDate;
          if('10000'===result.state){
            $scope.arrDatas = result.data.datas;
            $scope.arrTotlaDatas = result.data.totalNumber;
            $scope.dayByCondition();
          }else{
            if(angular.element('.fixedHead')){
              angular.element('.fixedHead').remove();
            }
            $scope.arrDatas = [];
            $scope.arrTotlaDatas = {};
            // $scope.setNoticeMsg('error',result.desc);
            $scope.dayByCondition();
          }
        });
      }else{
        settleCheckRerunService.query($scope.queryParams,function(result){
          var busName = '全部';
          if($scope.queryParams.businessLine===''){
            busName = '全部在线计费';
          }else if($scope.queryParams.businessLine==='0068'){
            busName = '咪咕在线计费';
          }else if($scope.queryParams.businessLine==='0071'){
            busName = '互联网在线计费';
          }
          if ($scope.queryParams.dateType === 'DAY') {
            $scope.stateControl.title = busName+'日详单';
            $scope.stateControl.dateType = 'DAY';
            $scope.stateControl.dateName = '结算账期日:';
            $scope.dayModel = '日';
            $scope.runMonthState = false;
            $scope.runDayState = true;
          }else{
            $scope.stateControl.title = busName+'月详单';
            $scope.stateControl.dateType = 'MONTH';
            $scope.stateControl.dateName = '结算账期月:';
            $scope.monthModel = '月';
            $scope.runMonthState = true;
            $scope.runDayState = false;
          }
          $scope.stateControl.settleDate = $scope.queryParams.settleDate;
          if('10000'===result.state){
            $scope.arrDatas = result.data.datas;
            $scope.arrTotlaDatas = result.data.totalNumber;
          }else{
            if(angular.element('.fixedHead')){
              angular.element('.fixedHead').remove();
            }
            $scope.arrDatas = [];
            $scope.arrTotlaDatas = {};
            $scope.setNoticeMsg('error',result.desc);
          }
        });
      }
      $cookieStore.remove('reconRerunSet');
    };
    
    //根据条件进行日报月报重跑
    $scope.dayByCondition = function(){
      angular.element("#fileRun").modal("show");
      var rerunDatas = [];
      if($scope.queryParams.businessLine=='0071'){
        if ($scope.queryParams.dateType === 'DAY') {
          rerunDatas.push({
            businessLine:$scope.queryParams.businessLine,
            settleDate:$scope.queryParams.settleDate.split("-").join(''),
            processId:'Proc_Settle_Day_HlwZXJF'
          });
        }else{
          rerunDatas.push({
            businessLine:$scope.queryParams.businessLine,
            settleDate:$scope.queryParams.settleDate.split("-").join(''),
            processId:'Proc_Settle_Month_HlwZXJF'
            });
          }
        }else if($scope.queryParams.businessLine=='0068'){
          if ($scope.queryParams.dateType === 'DAY') {
            rerunDatas.push({
            businessLine:$scope.queryParams.businessLine,
            settleDate:$scope.queryParams.settleDate.split("-").join(''),
            processId:'Proc_Settle_Day_MiguZXJF'
            });
          }else{
            rerunDatas.push({
            businessLine:$scope.queryParams.businessLine,
            settleDate:$scope.queryParams.settleDate.split("-").join(''),
            processId:'Proc_Settle_Month_MiguZXJF'
            });
          } 
      }else{
        if ($scope.queryParams.dateType === 'DAY') {
           rerunDatas.push({
              businessLine:'0071',
              settleDate:$scope.queryParams.settleDate.split("-").join(''),
              processId:'Proc_Settle_Day_HlwZXJF'
              },{
             businessLine:'0068',
               settleDate:$scope.queryParams.settleDate.split("-").join(''),
               processId:'Proc_Settle_Day_MiguZXJF'
              });
          }else{
            rerunDatas.push({
              businessLine:'0071',
              settleDate:$scope.queryParams.settleDate.split("-").join(''),
              processId:'Proc_Settle_Month_HlwZXJF'
              },{
             businessLine:'0068',
                 settleDate:$scope.queryParams.settleDate.split("-").join(''),
               processId:'Proc_Settle_Month_MiguZXJF'
              });
          }
        }
      $scope.returnDatas = rerunDatas;
      // 结算稽核重跑的日，月报重跑
      $scope.submitRunFile = function(){
        angular.element("#fileRun").modal("hide");

        settleCheckRerunService.dayRerun($scope.returnDatas,function(result){
          if (result.state==='SUCCESS') {
            $scope.setNoticeMsg('success','重跑成功');
          }else if(result.state==='FAILED'){
            $scope.setNoticeMsg('warn','重跑失败');
          }else if(result.state==='ERROR'){
            $scope.setNoticeMsg('error','重跑报错');
            $scope.setNoticeMsg('success',result.desc);
          }else if(result.state==='FAILED'){
            $scope.setNoticeMsg('warn',result.desc);
          }else if(result.state==='ERROR'){
            $scope.setNoticeMsg('error',result.desc);
          }else if(result.state==='NOSETTLE'){
            $scope.setNoticeMsg('error',result.desc);
          }
        });
      };
      
    };

    $scope.checkTable = function(tableId){
      commonService.checkTable(tableId);
      $compile(angular.element('.tableHead'))($scope);
    };
  }]);
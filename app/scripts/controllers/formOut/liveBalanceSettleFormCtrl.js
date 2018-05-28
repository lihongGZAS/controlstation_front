'use strict';
/**
 * description   在线计费结算报表
 * createTime    2017-3-9
 * createBy      lh
 */
 
angular.module('station.controller')
  .controller('liveBalanceSettleFormCtrl',['$scope','commonService','commonQueryService','dateTimeService','liveBalanceSettleFormService', function($scope,commonService,commonQueryService,dateTimeService,liveBalanceSettleFormService) {
    //页面初始化
    $scope.initPage = function(){
      //设置时间控件
      dateTimeService.setTimePicker('month', 0, 'settleDate');

      // 省份查询
      commonQueryService.queryProvince(function(result){
        $scope.provinces = result.data;
      });

      //初始化查询条件
      $scope.queryParams = { 
        provinceCode: '',    //省份，默认为全部
        businessLine:'0068' , //外部商户，默认为咪咕。
        settleDate:dateTimeService.getNewTime('month',1,'settleDate'),//日期控件，格式YY-MM，默认为当月-1月
      };

      $scope.showTable = {
        title:'中国移动信息费分成业务结算单咪咕一级话费计费平台（在线）',
        monthDate:$scope.getMonthValue($scope.queryParams.settleDate),
        businessLine:$scope.queryParams.businessLine
      };

      $scope.queryByCondition();//初始化查询
    };
    
    //根据条件查询 
    $scope.queryByCondition = function(){
      liveBalanceSettleFormService.query($scope.queryParams,function(result){
        //如果选择单一省份，则导出汇总表按钮置灰
        if($scope.queryParams.provinceCode.split(',').length === 1 && $scope.queryParams.provinceCode !== ''){
          $scope.isOnlyProvince = true;
        }else{
          $scope.isOnlyProvince = false;
        }
        $scope.showTable.monthDate = $scope.getMonthValue($scope.queryParams.settleDate);
        $scope.showTable.businessLine = $scope.queryParams.businessLine;
        if('0068'===$scope.queryParams.businessLine){
          $scope.showTable.title = '中国移动信息费分成业务结算单咪咕一级话费计费平台（在线）';
          $scope.statementCode = 'D280';
        }else{
          $scope.showTable.title = '中国移动信息费分成业务结算单中移互联网全业务计费平台（在线）';
          $scope.statementCode = '';
        }
        if('10000'===result.state){
          $scope.provinceDatas = result.data.provinceDatas;
          $scope.totalDatas = result.data.totalDatas;
          $scope.miguDatas = result.data.miguDatas;
          $scope.resultDataNull = true;//返回的数据不为空
        }else{
          if(angular.element('.fixedHead')){
            angular.element('.fixedHead').remove();
          }
          $scope.provinceDatas = [];
          $scope.totalDatas = [];
          $scope.miguDatas = [];
          $scope.resultDataNull = false;//返回的数据为空时
          $scope.setNoticeMsg('error',result.desc);
        }
      });
    };

    //将日期格式'2017-02'转换为'2'样式
    $scope.getMonthValue = function(input){
      var resultString = '';
      if((input+'').substring(5,6)==='0'){
        resultString=(input+'').substring(6);
      }else{
        resultString=(input+'').substring(5);
      }
      return resultString;
    };
    
    //根据条件导出汇总表
    $scope.export = function(){
      if($scope.resultDataNull){
        var monthReport = {
          settleDate:$scope.queryParams.settleDate,
          businessLine:$scope.queryParams.businessLine,
          provinceCode:$scope.queryParams.provinceCode
        };
        liveBalanceSettleFormService.export(monthReport);
      }else{
        $scope.setNoticeMsg('warn','查询数据为空，无法进行导出操作!');
      }
    };

    //根据条件导出明细表
    $scope.exports = function(){
      var monthReports = {
        settleDate:$scope.queryParams.settleDate,
        businessLine:$scope.queryParams.businessLine,
        provinceCode:$scope.queryParams.provinceCode
      };
      liveBalanceSettleFormService.exports(monthReports,function(){
        $scope.setNoticeMsg('warn','查询明细表数据为空，无法进行导出操作!');
      });
    };

  }]);

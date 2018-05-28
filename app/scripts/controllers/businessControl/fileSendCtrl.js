'use strict';
/**
 * description   文件下发
 * createTime    2017-3-5
 * createBy      kxd
 */
angular.module('station.controller')
  .controller('fileSendCtrl',['$scope','$filter','$compile','$timeout','commonService','commonQueryService','dateTimeService','fileSendService',
    function($scope,$filter,$compile,$timeout,commonService,commonQueryService,dateTimeService,fileSendService) {


    //页面初始化
    $scope.initPage = function(){
      //设置时间控件
      dateTimeService.setTimePicker('day',0,'signDate');
      //初始化分页数据
      $scope.page = {   
        totalCount:0,
        pageSize:10,
        currentPage:1
      };
      //初始化查询条件
      $scope.queryParams = { 
        dateType:'day',//账期类型
        settleDate:dateTimeService.getNewTime('day',1),//账期支持对近12个月文件下发情况进行查询
        businessLine:'',//外部商户（全部/咪咕/互联网）
        provinceCode:'',//全国31个省/全部（默认）
        fileType:'301',//文件类型(差异文件/核减明细)
        fileStatus:'1',// 状态类型（默认为核心下发到审核目录成功）
        fileName:'',//文件名称
        currentPage:1,//当前页
        pageSize:10//每页条数
      };
      $scope.audit=false;
      $scope.sendDown=true;
      
      // 省份查询
      commonQueryService.queryProvince(function(result){
        $scope.provinces = result.data;
      });

      $scope.queryByCondition();//初始化查询
    };
  
    //账期类型选择
     $scope.dateTypeChange = function(){
      if($scope.queryParams.dateType === "day"){
        dateTimeService.changeTimePicker('day',0,'signDate',$compile,$scope);
        $scope.queryParams.settleDate = dateTimeService.getNewTime('day',1); 
        $scope.queryParams.fileType='301';
      }else if($scope.queryParams.dateType === "month"){
        dateTimeService.changeTimePicker('month',0,'signDate',$compile,$scope);
        $scope.queryParams.settleDate = dateTimeService.getNewTime('month',1);
        $scope.queryParams.fileType='302';
      }
    };
    //点击查询的时候的函数
    $scope.queryByCondition1 = function(){
      $scope.queryParams.currentPage=1;
      $scope.queryByCondition();//初始化查询
    };
    //根据条件查询
    $scope.queryByCondition = function(){
      $scope.fileArr= [];//只能放到此处
      fileSendService.query($scope.queryParams,function(result){
        //按钮状态，下发成功3，下发异常4，审核成功5
        if($scope.queryParams.fileStatus==="1"){
          $scope.audit=false;
          $scope.sendDown=true;
        }else if($scope.queryParams.fileStatus==="3"){
          $scope.audit=true;
          $scope.sendDown=true;
        }else{
          $scope.audit=true;
          $scope.sendDown=false;
        }
        if('10000'===result.state){
          $scope.resultDas = result.data.datas;
          $scope.page.totalCount = result.data.totalCount;
          $scope.page.currentPage = $scope.queryParams.currentPage;
          //文件过期的判断
          $scope.grey=result.data.isExpire;
        }else{
          $scope.resultDas = [];
          $scope.page.totalCount = 0;
          $scope.page.currentPage = 1;
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
    
    //全选以及取消全选
    $scope.proCheckbox = function(type,checkList,num){
      var newList = commonService.checkboxClick(type,checkList,num);
      var sendData = [];
      angular.forEach(newList,function(data){
        sendData.push({
          fileName:data.fileName,
          filePath:data.filePath,
          updateTime:data.updateTime
        });
      }); 
      $scope.fileArr = sendData;
    };

    //点击审核
    $scope.auditAction= function(){
      if($scope.fileArr&&$scope.fileArr.length>0){
        fileSendService.audit($scope.fileArr,function(result){
          if('SUCCESS'===result.success){
            $scope.setNoticeMsg('success',result.description);
          }else{ 
            // 审核失败文件信息
            var desc = (result.description).split('fileName=')[1];
            if(desc){
              $scope.files=desc.split(',');
            }else{
              $scope.files = [];
            }
            angular.element("#abnormalModal").modal("show");
          }
          $timeout(function(){
            $scope.queryByCondition1();
          },2000);
        });
      }else{
          $scope.setNoticeMsg('warn','请先勾选数据，再进行审核操作');
      }
    };
    //点击下发
    $scope.sendAction= function(){
      if($scope.fileArr&&$scope.fileArr.length>0){
        if (window.confirm($scope.fileArr.length+"个文件确认进行下发？")){
          fileSendService.fileSend($scope.fileArr,function(result){
            if('SUCCESS'===result.success){  
              $scope.setNoticeMsg('success',result.description);
              
            }else{ 
              // 下发失败文件信息 
              var desc = (result.description).split('fileName=')[1];
              if(desc){
                $scope.files=desc.split(',');
              }else{
                $scope.files = [];
              } 
              angular.element("#abnormalModal").modal("show"); 
            }
            $timeout(function(){
              $scope.queryByCondition1();
            },2000);
          });
        }
      }else{
        $scope.setNoticeMsg('warn','请先勾选数据，再进行下发操作');
      }
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
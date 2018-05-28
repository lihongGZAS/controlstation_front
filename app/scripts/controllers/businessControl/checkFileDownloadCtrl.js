'use strict';

/**
 * description   核减文件下载controller
 * createTime    2017-2-26
 * createBy      mahong
 */
angular.module('station.controller')
  .controller('checkFileDownloadCtrl',['$scope','$compile','commonService','commonQueryService','dateTimeService','checkFileDownloadService', function($scope,$compile,commonService,commonQueryService,dateTimeService,checkFileDownloadService) {
    $scope.dataArray = {};//核减下载数据对象
    //页面初始化
    $scope.initPage = function(){
      //设置时间控件
     dateTimeService.setTimePicker('month', 0,'accountDate');
      $scope.page = {   //初始化分页数据
        totalCount:0,
        pageSize:10,
        currentPage:1
      };
      $scope.queryParams = { //初始化查询条件
        accountDate:dateTimeService.getNewTime('month',1),//日期控件，格式YY-MM-DD，默认为当天-1天
        provinceCode:'', //省份查询,下拉31个省
        outerBusinessman:'' ,//外部商户 ,默认为全部,0068咪咕,0071互联网
        fileType:'上发文件' ,     //文件类型,0上发文件,1差异文件,2错误文件
        currentPage:1,      //当前页
        pageSize:10          //每页条数
      };
      commonQueryService.queryProvince(function(result){
        $scope.provinces = result.data;
      });
      $scope.queryByCondition();//初始化查询
    };
    //点击查询恢复到第一页并清空文件名数组
    $scope.queryByCondition1 = function(){
      $scope.queryParams.currentPage = 1;
      $scope.queryByCondition();
    };
    //根据条件查询
    $scope.queryByCondition = function(){
      $scope.fileNameArry = [];
      checkFileDownloadService.query($scope.queryParams,function(result){
        if('10000'===result.state){
          $scope.resultDas = result.data.datas;
          $scope.page.totalCount = result.data.totalCount;
          $scope.page.currentPage = $scope.queryParams.currentPage;
        }else{
          $scope.resultDas = [];
          $scope.dataArray = {};//清空数据
          $scope.page.totalCount = 0;
          $scope.page.currentPage = 1;
          $scope.setNoticeMsg('error',result.desc);
        }
      });
    };
     //全选及取消全选
    $scope.proCheckbox = function(type,checkList,num){
      var newList = commonService.checkboxClick(type,checkList,num);
      var nameArr = [];
      angular.forEach(newList,function(data){
        if(data.fileStatus){
          this.push(data.fileName);
        }
      },nameArr);
      $scope.fileNameArry = nameArr;
    };
    //按文件名下载
    $scope.downloadByCondition = function(){
      if ($scope.fileNameArry&&$scope.fileNameArry.length>0) {
        angular.element("#checkDownloadFile").modal("show");
        $scope.numberFile = $scope.fileNameArry.length;
         $scope.submitCheckFile = function(){
          $scope.dataArray.fileNameArry = $scope.fileNameArry.join(',');
          if ($scope.queryParams.fileType ==='上发文件') {
            $scope.dataArray.fileType = '1';
          }else if($scope.queryParams.fileType ==='错误文件'){
            $scope.dataArray.fileType = '2';
          }else{
            $scope.dataArray.fileType = '3';
          }
          $scope.dataArray.outerBusinessman = $scope.queryParams.outerBusinessman;
          $scope.dataArray.type = "HJ";
          checkFileDownloadService.downloadQuery($scope.dataArray);
          angular.element("#checkDownloadFile").modal("hide");
        };
      }else{
        $scope.setNoticeMsg('warn','请先勾选数据，再进行下载!');
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

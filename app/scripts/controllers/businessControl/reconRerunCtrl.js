'use strict';
/**
 * description   对账文件重跑
 * createTime    2017-3-8
 * createBy      lihong
 */
angular.module('station.controller')
  .controller('reconRerunCtrl',['$scope','$compile','$state','$filter','$window','$cookieStore','commonService','commonQueryService','dateTimeService','reconRerunService', function($scope,$compile,$state,$filter,$window,$cookieStore,commonService,commonQueryService,dateTimeService,reconRerunService) {

  	//页面初始化
  	$scope.initPage = function(){
      $scope.runBtn = false;//省重跑、核减重跑按钮置灰标志
      $scope.rerunBool = false; //省重跑确认
      $scope.flag = true; //省重跑取消按钮
      //设置时间控件 
      dateTimeService.setTimePicker('day', 0, 'settleDate');
      $scope.page = {   //初始化分页数据
        totalCount:0,
        pageSize:10,
        currentPage:1
      };
      //初始化查询条件
  		$scope.queryParams = { 
        dateType: 'day',   //默认账期为日账单
  			settleDate:dateTimeService.getNewTime('day',1,'settleDate'),//日期控件，格式YY-MM-DD，默认为当天-1天
				provinceCode:'' , //省份编码Code, 可选项为全部、31个省份；默认值为全部；
        businessLine:'',  //外部商户，可选项为全部、咪咕（0068）、互联网（0071）；默认值为全部；
				currentPage:1,    //当前页
			  pageSize:10       //每页条数
  		};

      // 省份查询
       commonQueryService.queryProvince(function(result){
         $scope.provinces = result.data;
       });

  		$scope.queryByCondition();//初始化查询
  	};

  	//点击查询时当前页置为首页
    $scope.queryByCondition1=function(){
      $scope.queryParams.currentPage=1;
      $scope.rerunDa=[];
      $scope.queryByCondition();  
    };
    //根据条件查询
  	$scope.queryByCondition = function(){
  		reconRerunService.query($scope.queryParams,function(result){
        if($scope.queryParams.dateType === "day"){
          $scope.runBtn = false;
        }else{
          $scope.runBtn = true;
        }
  			if('10000'===result.state){
          // 对返回数据的到达状态进行判断和字段的添加
          for(var i=0;i<result.data.datas.length;i++){
            if(result.data.datas[i].fileStatus==='文件重传成功' || result.data.datas[i].fileStatus==='文件到达成功' ||  result.data.datas[i].fileStatus==='入库成功'){
              result.data.datas[i].rerunState=1;
            }else{
              result.data.datas[i].rerunState=0;
            }
          }
          
          $scope.resultDas = result.data.datas;
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

    //全选及取消全选
    $scope.proCheckbox = function(type,checkList,num){
      var newList = commonService.checkboxClick(type,checkList,num);
      var rerunDa = [];//暂时存放省重跑勾选数据
      angular.forEach(newList,function(data){
        if(data.rerunState ){
            rerunDa.push({
              settleDate:data.settleDate,
              businessLine:data.businessLine,
              provinceCode:data.provinceCode,
              fileType:data.fileType,
              fileName:data.proFileName,
              processId:data.processId
            });
        } 
      });
      $scope.rerunDa = rerunDa;
    }; 
    

    //选择账单类型
    $scope.changeDateType = function(){
      if($scope.queryParams.dateType === "day"){
        dateTimeService.changeTimePicker('day', 0, 'settleDate', $compile, $scope);
        $scope.queryParams.settleDate = dateTimeService.getNewTime('day',1);
      }else if($scope.queryParams.dateType === "month"){
        dateTimeService.changeTimePicker('month', 0, 'settleDate', $compile, $scope);
        $scope.queryParams.settleDate = dateTimeService.getNewTime('month',1); 
      }
    };
    
   //省重跑
    $scope.provinceRerun = function(){
      if($scope.rerunDa&&$scope.rerunDa.length > 0){
          angular.element("#myModal").modal("show");
          angular.element(".modal-body h3").html("是否进行省重跑？");        
      }else{
        $scope.setNoticeMsg('warn','请先勾选数据，再进行重跑操作!');
      }
    };
    
    //省重跑确认
    $scope.submitRerun = function(){
      if($scope.flag){
        $scope.rerunBool = !$scope.rerunBool;
        if($scope.rerunBool){
          reconRerunService.provinceRerun($scope.rerunDa,function(result){
            if(result.result === 'SUCCESS'){
              angular.element("#myModal").modal("show"); 
              angular.element(".modal-body h3").html("省重跑成功，是否进行日结算？");
              $cookieStore.put('reconRerunSet', $scope.queryParams);
            }else{
              angular.element(".modal-body h3").html("省重跑失败");
              $scope.rerunBool = false;
              $scope.flag = false;
            }
          });
        }else{
          angular.element("#myModal").modal("hide");
          setTimeout(function(){
            $state.go("main.settleCheckRerun"); 
          },600);
        }
      }else{
        angular.element("#myModal").modal("hide");
        $scope.flag = true;
      } 
    };

    //重跑取消
    $scope.cancelRerun = function(){
      $cookieStore.remove('reconRerunSet');
      if($scope.rerunBool && $scope.flag){
        $scope.rerunBool = false;
      }
      else if(!$scope.rerunBool && !$scope.flag){
        $scope.flag = true;
      }
    };

    //点x取消重跑
    $scope.cancelRun = function(){
      $cookieStore.remove('reconRerunSet');
      if(!$scope.flag){
        $scope.flag = true;
      }else{
        $scope.rerunBool = false;
      }
    };

    //核减重跑
    $scope.subtractRerun=function(){
      if($scope.rerunDa&&$scope.rerunDa.length > 0){
        angular.element("#subtractRerun").modal("show");
        angular.element("#subtractRerun h3").html("是否进行核减重跑？");
       
      }else{
        $scope.setNoticeMsg('warn','请先勾选数据，再进行重跑操作!');
      }  
    };
    $scope.commitSubtractRerun=function(){
      angular.element("#subtractRerun").modal("hide");
       reconRerunService.subtractRerun($scope.rerunDa,function(result){
          if(result.result === "SUCCESS"){
            $scope.setNoticeMsg('success','核减重跑成功');
          }else{
            $scope.setNoticeMsg('error','核减重跑失败');
          }
        });
     };
    $scope.cancelSubRerun=function(){
      $scope.queryByCondition();
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

'use strict';
/**
 * [description]  省份多选框
 * [createTime]   2017-2-21
 * [createBy]     yugd
 */
angular.module('controlstationFrontApp').directive('multiSelect',['commonService',function(commonService) {
  return {
    restrict: 'EA',
    require:'ngModel',
    scope:{
      ngModel:'=',
      listDatas:'=',
      ngClass:'@',
      name:'@',
      code:'@'
    },
    templateUrl:'views/common/multiSelect.html',
    link: function(scope,ele,attr,ctrl){
      scope.ngClass = scope.ngClass||'multiSelect';
      scope.proList = false;//默认隐藏
      scope.listNames = '全部';//默认显示全部
      scope.dropDownPro = function(e){
        scope.proList = !scope.proList;
        e.stopPropagation();
      };
      //点击省份以外的部分，隐藏省份选项
      angular.element('body').click(function(){
        scope.$apply(function() {  
          if(scope.proList){
            scope.proList = false;
          }
        });
      });
      //选择省份，阻止事件冒泡
      scope.showDown = function(e){
        e.stopPropagation();
      };
      
      //当页面存在重置按钮时，点击重置清空传递参数的时候，触发监听清空input框数据
      scope.$watch('ngModel',function(newVal){
        if(scope.listDatas&&newVal===''&&scope.listNames!=='全部'){
          scope.listDatas.marquee = true;
          scope.proCheckbox('list',scope.listDatas);
        }
      });
      //单选、全选/反选
      scope.proCheckbox = function(type,checkList,num){
        var newList = commonService.checkboxClick(type,checkList,num);
        scope.listNames = '全部';
        ctrl.$setViewValue('');
        if(undefined===newList){
          return;
        }
        var listNames = '';
        var listCodes = '';
        if(newList.length===scope.listDatas.length||newList.length===0){
          return;
        }
        for(var i=0;i<newList.length;i++){
          if(i===0){
            listNames = newList[i][scope.name];
            listCodes = newList[i][scope.code];
          }else{
            listNames += ',' + newList[i][scope.name];
            listCodes += ',' + newList[i][scope.code];
          }
        }
        scope.listNames = listNames;
        ctrl.$setViewValue(listCodes);
      };
    }
  };
}]);

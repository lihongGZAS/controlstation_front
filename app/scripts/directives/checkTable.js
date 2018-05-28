'use strict';
/**
 * [description]  监听列表页面是否遍历完成
 * 如果后期影响性能，就直接在查询之后加定时器进行检查，没有必要用direcitve
 * [createTime]   2017-1-20
 * [createBy]     yugd
 */
angular.module('controlstationFrontApp')
.directive('checkTable',['$timeout',function($timeout) {
  return {
    restrict: 'A',
    link: function(scope,element,attr){
      if(scope.$last === true){
        //这里必须加上timeout定时器，不然页面渲染完成，但是没有设置数据，公共方法无法获取最后的th宽度
      	$timeout(function() {
          scope.$eval(attr.checkTable);
        });
      }
    }
  };
}])
.directive('checkTableHead',['$timeout',function($timeout) {
  return {
    restrict: 'A',
    link: function(scope,ele,attr){
      function setHeadHtml(divId){
        var jqueryA = angular.element;
        //如果已经设置了表头，则先删除。
        if(jqueryA('.fixedHead')){
          jqueryA('.fixedHead').remove();
        }
        //设置table宽度，提高列表兼容性
        if(attr.tableWidth){
          jqueryA('#'+divId+'>div:eq(0) table').css('width',attr.tableWidth);
        }
        //设置table最大高度
        var tableHeight = jqueryA('#'+divId)[0].scrollHeight;//获取table高度
        var tableTop = jqueryA('#'+divId).offset().top;//获取table距离顶部的高度
        var bodyHeight = jqueryA(window).height();//页面可视高度
        var maxTableH = bodyHeight - tableTop-10;
        if(tableHeight<maxTableH){
          maxTableH = tableHeight+20;//加上横向滚动条高度
        }
        jqueryA('#'+divId).css('max-height',maxTableH+'px');

        //设置表头代码
        var trArr = jqueryA('#'+divId+' table thead tr');
        var headTh = '';
        var thArr = jqueryA(trArr[0]).find('th');
        if(trArr.length>1){
          for(var i=0;i<trArr.length;i++){
            if(i===trArr.length-1){
              thArr = jqueryA(trArr[i]).find('th');
            }else{
              headTh += '<tr>'+trArr[i].innerHTML+'</tr>';
            }
          }
        }
        var theadHtml = '<div class="fixedHead"><div><table><thead>'+headTh+'<tr>';
        for(var j=0;j<thArr.length;j++){
          var thText = thArr[j].innerHTML;
          var thWidth = thArr[j].offsetWidth;//获取td宽度包括边框宽度
          theadHtml += '<th style="width:'+thWidth+'px">'+thText+'</th>';
        }
        theadHtml += '</tr></thead></table></div></div>';
        jqueryA('#'+divId).prepend(theadHtml);
        //如果页面滚动条已经滚动了，则改变表头位置；防止相同条件下，上下滚动后，再次点击查询，表头消失bug
        var divScrollTop = jqueryA('#'+divId).scrollTop();
        if(divScrollTop!==0){
          jqueryA('.fixedHead').css('top',divScrollTop);
        }
        //设置头部table总宽度,宽度要和body部分table宽度一致
        if(attr.tableWidth){
          jqueryA('#'+divId+'>div:eq(0) table').css('width',attr.tableWidth);
        }
        //拉动滚动条，头部随着一起滚动
        jqueryA('#'+divId).scroll(function(){
          var scrollTop=this.scrollTop;//滚动条事件之前文档滚动高度
          jqueryA('.fixedHead').css('top',scrollTop);
        });
      }
      if(scope.$last === true){
        //这里必须加上timeout定时器，不然页面渲染完成，但是没有设置数据，公共方法无法获取最后的th宽度
        $timeout(function() {
          setHeadHtml(attr.checkTableHead);
        });
      }
    }
  };
}]);

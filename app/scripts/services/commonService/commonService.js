'use strict';

angular.module('station.service')
  .service('commonService', function () {
  	return{
      checkTable:fCheckTable,//检查表格是否超出页面
      checkboxClick:fCheckboxClick//点击多选框
  	};

  	/**
     * @description    检查表格是否超出页面，超出则重置表格
     * @param  参数tableId [type:string] [description:表格id] 
     * @createTime    2017-1-20
     * @createBy      yugd
     */
  	function fCheckTable(tableId){
  		var jqueryA = angular.element;
      if(jqueryA('.tableHead')){
        jqueryA('.tableHead').remove();
      }
      var tableHeight = jqueryA('#'+tableId+'>table')[0].offsetHeight;//获取table高度
      var tableTop = jqueryA('#'+tableId).offset().top;//获取table距离顶部的高度
      var bodyHeight = jqueryA(window).height();//页面可视高度
      var maxTableH = bodyHeight - tableTop-51-10;
      if(tableHeight<maxTableH){
        jqueryA('#'+tableId).css('max-height',tableHeight+'px');
      }else{
        jqueryA('#'+tableId).css('max-height',maxTableH+'px');
      }
      var thArr = jqueryA('#'+tableId+' table thead tr:eq(0) th');
      var theadHtml = '<div class="tableHead"><div>'+
        '<table class="table table-striped table-hover table-bordered">'+
        '<thead><tr>';
      for(var i=0;i<thArr.length;i++){
        var thText = thArr[i].innerHTML;
        var thWidth = thArr[i].offsetWidth;//获取td宽度包括边框宽度
        theadHtml += '<th style="width:'+thWidth+'px">'+thText+'</th>';
      }
      if(tableHeight<maxTableH){
        theadHtml += '</tr></thead></table></div></div>';
      }else{
        theadHtml += '<th style="width:16px"></th></tr></thead></table></div></div>';
      }
      jqueryA('#'+tableId+'').before(theadHtml);
  	}

    /**
     * @Description 多选框全选/反选/单选
     * @author yugd
     * @CreateDate 2015/09/14
     * @param  reType:返回类型（list:集合;void:false）
               checkList:多选列表对象
               num:单选项在列表中的下标
     * @return list or void(集合对象或者false)
     **/
    function fCheckboxClick(reType,checkList,num){
      //当没有数据的时候，不做多选处理，否则会因为marquee出现一条空数据
      if(undefined===checkList){
        return;
      }
      var checkBool;//复选框状态
      var newList = [];//返回集合
      if(undefined===num){//全选/反选
        checkBool = !checkList.marquee;
        checkList.marquee = checkBool; //全选框状态修改
        for (var i in checkList) {
          //如果i是全选框的状态，则当条数据去掉
          if('marquee'===i){
            break;
          }
          checkList[i].checkbox = checkBool; //多选框状态修改
          newList.push(checkList[i]);//获取所有勾选数据数组
        }
        //如果全选框不为true则返回空数组
        if(false===checkBool){
          newList = [];
        }
      }else{//单选
        checkList[num].checkbox = !checkList[num].checkbox; //当前多选框状态修改
        checkBool = true;
        for (var o in checkList) {
          //如果i是全选框的状态，则当条数据去掉
          if('marquee'===o){
            break;
          }
          //一旦存在多选框状态不为true，则全选框的状态应为false
          if (true!== checkList[o].checkbox) {
            checkBool = false;
          }
          //获取所有勾选数据数组
          if(true===checkList[o].checkbox){
            newList.push(checkList[o]);
          }
        }
        checkList.marquee = checkBool; //全选框赋值
      }
      //返回对象
      if('list'===reType){
        return newList;
      }else if('void'===reType){
        return false;
      }
    }
  });

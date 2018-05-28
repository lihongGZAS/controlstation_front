/**
 * @description 时间选择器
 * @author yugd
 * @createDate 2017/01/19
 */
'use strict';
angular.module('station.service')
	.service('dateTimeService', function() {
		var jqueryA = angular.element;
		return {
			getNewTime:fGetNewTime,//获取时间
			getPickerSet:fGetPickerSet,//获取时间控件格式
			setStartEnd:fSetStartEnd,//设置开始结束时间时间插件
			setTimePicker:fSetTimePicker,//设置单个时间选择器
			changeTimePicker:fChangeTimePicker,//改变时间插件时间类型
			clearStartDate:fClearStartDate,//根据name清理设置的最小开始时间
			clearEndDate:fClearEndDate//根据name清理设置的最大结束时间
		};

		/**
		 * @description 获取当前时间
		 * myDate.getYear();        //获取当前年份(2位)
		 * myDate.getFullYear();    //获取完整的年份(4位,1970-????)
		 * myDate.getMonth();       //获取当前月份(0-11,0代表1月)
		 * myDate.getDate();        //获取当前日(1-31)
		 * myDate.getDay();         //获取当前星期X(0-6,0代表星期天)
		 * myDate.getTime();        //获取当前时间(从1970.1.1开始的毫秒数)
		 * myDate.getHours();       //获取当前小时数(0-23)
		 * myDate.getMinutes();     //获取当前分钟数(0-59)
		 * myDate.getSeconds();     //获取当前秒数(0-59)
		 * myDate.getMilliseconds();    //获取当前毫秒数(0-999)
		 * myDate.toLocaleDateString();     //获取当前日期
		 * var mytime=myDate.toLocaleTimeString();     //获取当前时间
		 * myDate.toLocaleString( );        //获取日期与时间
		 */
		function fGetNewTime(type,num){
			var nowTime = new Date();
			if('day'===type&&num){
				nowTime.setDate(nowTime.getDate()-num);
			}else if('hour'===type&&num){
				nowTime.setHours(nowTime.getHours()-num);
			}else if('minute'===type&&num){
				nowTime.setMinutes(nowTime.getMinutes()-num);
			}else if('month'===type&&num){
				nowTime.setMonth(nowTime.getMonth()-num,1);
			}
			var year = nowTime.getFullYear(); //获取完整的年份(4位,1970-????)
			var month = nowTime.getMonth() + 1; //获取当前月份(0-11,0代表1月)
			var day = nowTime.getDate(); //获取当前日(1-31)
			var hour = nowTime.getHours(); //获取当前小时数(0-23)
			var min = nowTime.getMinutes();//获取分钟
			if(month<10){
				month = '0'+month;
			}
			if(day<10){
				day = '0'+day;
			}
			var newDate = year + '-' + month + '-' + day + ' ' + hour + ':00';
			if(type==='minute'){
				newDate = year + '-' + month + '-' + day + ' ' + hour +':'+ min;
			}else if(type==='day'){
				newDate = year + '-' + month + '-' + day;
			}else if(type==='month'){//时间控件存在bug，这里的月份必须比当前的大2个月
				newDate = year + '-' + month;
			}
			return newDate; 
		}

		/**
		 * @description 根据时间类型，判断时间选择器样式
		 * @param  type:时间选择器类型[默认为‘hour’:取到小时，‘day’：天，‘month’：月]
		 * @param  num:提前的天数/小时/分钟
		 * @return pickerSet：已经设置好的选择器样式
		 */
		function fGetPickerSet(type,num){//初始化页面day,1
			//默认为选择小时设置
			var pickerSet = {
				format: 'yyyy-mm-dd hh:00',//日期格式化
				weekStart: 1,   //默认为0从星期天开始，1从星期一开始
				autoclose: true,  //选完时间后关闭时间控件
				startView: 1,  //0小时视图，1日视图，2月视图，3年视图，4十年视图
				minView: 1,  //日期时间选择器所能够提供的最精确的时间选择视图
				forceParse: false,//当选择器关闭的时候，是否强制解析输入框中的值
				startDate:'2015-01-01',
				initialDate:fGetNewTime(type,num+1),
				endDate:fGetNewTime(type,num),
				language: 'zh-CN'//默认为中文
			};
			if(type==='minute'){
				pickerSet.format = 'yyyy-mm-dd hh:ii';
				pickerSet.minuteStep = 1;
				pickerSet.startView = 0;
				pickerSet.minView = 0;
			}
			if(type==='day'){
				pickerSet.format = 'yyyy-mm-dd';
				pickerSet.startView = 2;
				pickerSet.minView = 2;
			}else if(type==='month'){
				pickerSet.format = 'yyyy-mm';
				pickerSet.startView = 3;
				pickerSet.minView = 3;
			}
			return pickerSet;
		}

		/**
		 * @description 设置时间选择器样式,并绑定change监听事件，
		 * 							开始时间始终只能选择小于结束时间的时间段，
		 * 							结束时间始终只能选择大于开始时间的时间段。
		 * @param  {[timeType]}时间类型
		 * @param  {[num]}提前天数/月份
		 * @param  {[startName]}开始时间输入框name
		 * @param  {[endName]}结束时间输入框name
		 */
		function fSetStartEnd(timeType,startNum,startName,endNum,endName){
			var startPickerSet = {
				format: 'yyyy-mm-dd',//日期格式化
				weekStart: 1,   //默认为0从星期天开始，1从星期一开始
				autoclose: true,  //选完时间后关闭时间控件
				startView: 2,  //0小时视图，1日视图，2月视图，3年视图，4十年视图
				minView: 2,  //日期时间选择器所能够提供的最精确的时间选择视图
				forceParse: false,//当选择器关闭的时候，是否强制解析输入框中的值
				startDate:'2015-01-01',
				initialDate:fGetNewTime(timeType,startNum),
				endDate:fGetNewTime(timeType,endNum),
				language: 'zh-CN'//默认为中文
			};
			var endPickerSet = {
				format: 'yyyy-mm-dd',//日期格式化
				weekStart: 1,   //默认为0从星期天开始，1从星期一开始
				autoclose: true,  //选完时间后关闭时间控件
				startView: 2,  //0小时视图，1日视图，2月视图，3年视图，4十年视图
				minView: 2,  //日期时间选择器所能够提供的最精确的时间选择视图
				forceParse: false,//当选择器关闭的时候，是否强制解析输入框中的值
				startDate:fGetNewTime(timeType,startNum),
				initialDate:fGetNewTime(timeType,endNum),
				endDate:fGetNewTime(timeType,endNum),
				language: 'zh-CN'//默认为中文
			};
			jqueryA('input[name="'+startName+'"]').datetimepicker('remove');
			jqueryA('input[name="'+endName+'"]').datetimepicker('remove');
      //当选择了开始时间，则设置结束时间的最小开始时间为，当前选择的开始时间
			jqueryA('input[name="'+startName+'"]').datetimepicker(startPickerSet).on("change",function(){
      	jqueryA('input[name="'+endName+'"]').datetimepicker("setStartDate",jqueryA('input[name="'+startName+'"]').val());
      });
    	//当选择了结束时间，则设置开始时间的最大结束时间为，当前选择的结束时间。
      jqueryA('input[name="'+endName+'"]').datetimepicker(endPickerSet).on("change", function () {
        jqueryA('input[name="'+startName+'"]').datetimepicker("setEndDate", jqueryA('input[name="'+endName+'"]').val());
      });
		}

		/**
		 * [fSetTimePikcer 绑定单个时间插件]
		 * @param  {[type]} name     [input框name]
		 * @param  {[type]} timeType [时间类型]
		 * @param  {[type]} num      [提前天数]
		 * @return {[type]}          [null]
		 */
		function fSetTimePicker(timeType,num,name){
			var pickerSet = fGetPickerSet(timeType,num);
			jqueryA('input[name="'+name+'"]').datetimepicker(pickerSet);
		}

		/**
		 * [fChangeTimePicker 改变时间插件时间类型]
		 * @param  {[type]} timeType [时间类型]
		 * @param  {[type]} num      [间隔时间差]
		 * @param  {[type]} name     [input框名称]
		 * @param  {[type]} $compile [description]
		 * @param  {[type]} $scope   [description]
		 * @return {[type]}          [description]
		 */
		function fChangeTimePicker(timeType,num,name,$compile,$scope){
			var pickerSet = fGetPickerSet(timeType,num);
			var inpHtml = jqueryA('input[name="'+name+'"]').prop("outerHTML");
      var inpParent = jqueryA('input[name="'+name+'"]').parent();
      jqueryA('input[name="'+name+'"]').remove();
      inpParent.append($compile(inpHtml)($scope));
			jqueryA('input[name="'+name+'"]').datetimepicker(pickerSet);
		}

		/**
		 * @description 根据name清理设置的最小开始时间
		 * @param  {[dateName]}结束时间输入框name
		 */
		function fClearStartDate(dateName){
			angular.element('input[name="'+dateName+'"]').datetimepicker("setStartDate",-Infinity);
		}

		/**
		 * @description 根据name清理设置的最大结束时间
		 * @param  {[dateName]}开始时间输入框name
		 */
		function fClearEndDate(dateName){
			angular.element('input[name="'+dateName+'"]').datetimepicker("setEndDate",Infinity);
		}
	});
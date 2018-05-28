'use strict';

(function(){
	window.config = {
		'layOutUrl':'http://www.baidu.com',
		'mainMenu':[
			{
				name:'对账展示',
				state:'countShow',
				child:[
					{name:'对账文件到达情况',state:'main.countArriveShow'},
					{name:'对账告警情况',state:'main.countAlarmShow'},
					{name:'对账差异情况',state:'main.countDiffShow'}
				]
			},{
				name:'业务控制',
				state:'businessControl',
				child:[
					{name:'对账文件下载',state:'main.reconDown'},
					{name:'对账文件重跑',state:'main.reconRerun'},
					{name:'核减文件下载',state:'main.checkFileDownload'},
					{name:'结算稽核重跑',state:'main.settleCheckRerun'},
					{name:'文件下发',state:'main.fileSend'}
				]
			},{
				name:'报表出具',
				state:'formOut',
				child:[
					{name:'在线计费详单报表',state:'main.liveSettleDetailForm'},
					{name:'在线计费结算报表',state:'main.liveBalanceSettleForm'}
				]
			},{
				name:'数据展示功能',
				state:'dataShow',
				child:[
					{name:'签到签退状态展示',state:'main.signInOut'}
				]
			}
		]
	};
})();
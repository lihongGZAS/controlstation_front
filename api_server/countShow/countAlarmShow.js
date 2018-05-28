'use strict';

exports.request = function(app){
	app.post('/controlstation/countShow/fileAlarm/fileAlarmQuery', function(req, res) {
		var signInOutDas = getSignInOutDa();
	  res.send(signInOutDas);
	});
	app.get('/controlstation/countShow/fileAlarm/export', function(req, res) {
		var exportDa = getExportDa();
	  res.send(exportDa);
	});
	function getSignInOutDa(){
		var provinces = ['广东','广西','湖北','湖南','河南','河北','四川','山东','山西','浙江',
		'四川','山东','山西','浙江','四川','山东','山西','浙江','四川','山东','山西','浙江'];
		var alarmData = [];
		for(var i=0,j=provinces.length;i<j;i++){
			alarmData.push({
				id: i+1, //id也是序号
				alarmTime: new Date(),//告警发生时间
				alarmContent: '操作错误，请更正',//告警内容：具体告警信息描述
				alarmLevels: 'ERROR', //告警级别：包含内容为ERROR、WARING，1:ERROR/0:WARING
				system: '文件前置',//系统名称
				businessLine: '0068',//外部商户,可选项为全部、咪咕（0068）、互联网（0071）；默认值为全部；
				provinceName: provinces[i],//省份编码Code对应的省份名,默认为全部
				ip: '192.168.1.124',//主机IP地址
				hostName: '测试主机名'//主机名称
			});
		}
		var nowData = {
			state:'10000',
			desc:'查询成功',
			data:{
				totalCount:82,
				datas:alarmData
			}
		};
		return nowData;
	}
	function getExportDa(){
		var provinces = ['广东','广西','湖北','湖南','河南','河北','四川','山东','山西','浙江',
		'四川','山东','山西','浙江','四川','山东','山西','浙江','四川','山东','山西','浙江'];
		var alarmData = [];
		for(var i=0,j=provinces.length;i<j;i++){
			alarmData.push({
				id: i+1, //id
				alarmTime: '2017-2-23',//告警发生时间
				alarmContent: '操作错误，请更正',//告警内容：具体告警信息描述
				alarmLevels: 'ERROR', //告警级别：包含内容为ERROR、WARING，1:ERROR/0:WARING
				system: '文件前置',//系统名称
				businessLine: '咪咕',//外部商户,可选项为全部、咪咕（0068）、互联网（0071）；默认值为全部；
				provinceName: provinces[i],//省份编码Code对应的省份名,默认为全部
				ip: '192.168.1.124',//主机IP地址
				hostName: '测试主机名'//主机名称
			});
		}
		var nowData = {
			state:'10000',
			desc:'查询成功',
			data:{
				totalCount:82,
				datas:alarmData
			}
		};
		return nowData;
	}
};




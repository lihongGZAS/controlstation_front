'use strict';

exports.request = function(app){
	app.post('/controlstation/businessControl/fileSend/query', function(req, res) {
		var signInOutDas = {
			state:'10000',      //10000表示成功，10003表示错误
			desc:'', //错误描述
			data:{
				totalCount:20, //返回总条数
			    datas:[{
			      id:1,
			      dateType:   'string',//日期选择类型
			      settleDate:  'string',//账期
			      fileType:     '差异文件',//文件类型
			      businessLine: 'string',//外部商户
			      provinceCode:    'string',//省份
			      fileName:  'string',//文件名称
			      fileStatus:    'string',// 状态类型   
			      filePath:'d://dasd/dads',//文件路径
      			updateTime:'20170203'//更新时间
			    },{
			      id:2,
			      dateType:   'string',//日期选择类型
			      settleDate:  'string',//账期
			      fileType:     '错误文件',//文件类型
			      businessLine: 'string',//外部商户
			      provinceCode:    'string',//省份
			      fileName:  'string',//文件名称
			      fileStatus:    'string',// 状态类型  
			      filePath:'d://dasd/dads',//文件路径
      			updateTime:'20170203'//更新时间
			    },{
			      id:3,
			      dateType:   'string',//日期选择类型
			      settleDate:  'string',//账期
			      fileType:     '全量文件',//文件类型
			      businessLine: 'string',//外部商户
			      provinceCode:    'string',//省份
			      fileName:  'string',//文件名称
			      fileStatus:    'string',// 状态类型 
			      filePath:'d://dasd/dads',//文件路径
      			updateTime:'20170203'//更新时间 
			    }]
			} 
		};
	  res.send(signInOutDas);
	});

	app.post('/controlstation/businessControl/fileSend/audit', function(req, res) {
		var signInOutDas = {
			result:'FAILED',      //10000表示成功，10003表示错误
			description:'审核失败 fileName=testName' //错误描述
			 
		};
	  res.send(signInOutDas);
	});
		app.post('/controlstation/businessControl/fileSend/sendDown', function(req, res) {
		var signInOutDas = {
			result:'FAILED',      //10000表示成功，10003表示错误
			description:'下发失败 fileName=testName' //错误描述
			 
		};
	  res.send(signInOutDas);
	});
	// app.post('/controlstation/businessControl/fileConfig', function(req, res) {
	// 	var signInOutDas = getSignInOutDa();
	//   res.send(signInOutDas);
	// });
	// function getSignInOutDa(){
	// 	var provinces = ['广东','广西','湖北','湖南','河南','河北','四川','山东','山西','浙江',
	// 	'四川','山东','山西','浙江','四川','山东','山西','浙江','四川','山东','山西','浙江'];
	// 	var alarmData = [];
	// 	for(var i=0,j=provinces.length;i<j;i++){
	// 		alarmData.push({
	// 			id: i+1000, //文件对应id
	// 			provinces: provinces[i], //省公司名称
	// 			fileType: Math.ceil(Math.random()*10), //文件类型
	// 			accessChannel:'咪咕业务平台', //接入渠道
	// 			status:'已生成', //状态
	// 			paymentDays: new Date(),//账期
	// 			sendModle:'自动下发', //文件下发模式
	// 			accFileName:Math.ceil(Math.random()*100)//文件名
	// 		});
	// 	}
	// 	var nowData = {
	// 		state:'10000',
	// 		desc:'查询成功',
	// 		data:{
	// 			totalCount:82,
	// 			datas:alarmData
	// 		}
	// 	};
	// 	return nowData;
	// }
};

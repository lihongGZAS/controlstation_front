'use strict';

exports.request = function(app){

	//查询所有省份
	app.post('/controlstation/commonQuery/province/query', function(req, res) {
		var provinces = getProvincesData();
	  res.send(provinces);
	});

	//查询一级业务线
	app.post('/controlstation/commonQuery/firstBusinessLine/query', function(req, res) {
		var firstbusinessLines = getFirstBusinessLineData();
	  res.send(firstbusinessLines);
	});
	//查询子级业务线
	app.post('/controlstation/commonQuery/secondBusinessLine/query', function(req, res) {
		var secondbusinessLines = getSecondBusinessLineData();
	  res.send(secondbusinessLines);
	});
	//查询返回码
	app.post('/controlstation/commonQuery/backCode/query', function(req, res) {
		var BackCodeData = getBackCode();
	  res.send(BackCodeData);
	});
	//获取所有省份
	function getProvincesData(){
		var provinces = ['北京','上海','天津','重庆','内蒙古','新疆','宁夏','广西','西藏' ,
		'黑龙江','吉林','辽宁','河北','河南','山东','山西','湖南',
		'湖北','安徽','江苏','浙江','福建','江西','广东','海南',
		'贵州','云南','四川','陕西','青海','甘肃'];
		var arrDas = [];
		for(var i=0,j=provinces.length;i<j;i++){
			arrDas.push({
				provinceCode: i>10?'0'+i:'00'+i, //省公司编码
				provinceName: provinces[i]
			});
		}
		var nowData = {
			state:'10000',
			desc:'查询成功',
			data:arrDas
		};
		return nowData;
	}

	//获取一级业务线
	function getFirstBusinessLineData(){
		var firstBusinessLines = ['咪咕一级话费计费平台','互联网业务平台','咪咕音乐','咪咕视频','咪咕数媒','咪咕互娱'];
		var arrDas = [];
		for(var i=0,j=firstBusinessLines.length;i<j;i++){
			arrDas.push({
				businessLineCode:'2'+i>10?i:'0'+i, //业务线code码
				businessLineName:firstBusinessLines[i], //业务线名称
			});
		}
		var nowData = {
			state:'10000',
			desc:'查询成功',
			data:arrDas
		};
		return nowData;
	}
	//获取子级业务线
	function getSecondBusinessLineData(){
		var secondBusinessLines = ['咪咕一级话费计费平台','互联网业务平台','咪咕音乐','咪咕视频','咪咕数媒','咪咕互娱'];
		var arrDas = [];
		for(var i=0,j=secondBusinessLines.length;i<j;i++){
			arrDas.push({
				businessLineCode:'2'+i>10?i:'0'+i, //业务线code码
				businessLineName:secondBusinessLines[i], //业务线名称
			});
		}
		var nowData = {
			state:'10000',
			desc:'查询成功',
			data:arrDas
		};
		return nowData;
	}

	//获取返回码
	function getBackCode(){
		var backCodes =["2001","2002","3241","2001","2002","3241","2001","2002","3241"];
		var arrDas = [];
		for(var i=0,j=backCodes.length;i<j;i++){
			arrDas.push({
				backCodeStatus:'2'+i>10?i:'0'+i, //业务线code码
				backCode:backCodes[i], //业务线名称
			});
		}
		var nowData = {
			state:'10000',
			desc:'查询成功',
			data:arrDas
		};
		return nowData;
	}
};




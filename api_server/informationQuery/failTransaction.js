'use strict';

exports.request = function(app){
	app.post('/controlstation/informationQuery/failTransaction/query', function(req, res) {
		var failTransDas = getfailTransDa();
	  res.send(failTransDas);
	});
	function getfailTransDa(){
		var json = [
		{'oriTradeSeqno':'201411248572938579','oriTradeSession':'012060','businessLineName':'咪咕文化','dealDate':'2016-4-27','backCode':'010A00','backCodeDes':'交易失败'},
		{'oriTradeSeqno':'1248572938579','oriTradeSession':'2342060','businessLineName':'咪咕数媒','dealDate':'2016-4-27','backCode':'010A00','backCodeDes':'交易失败'},
		{'oriTradeSeqno':'2579','oriTradeSession':'012320','businessLineName':'咪咕哈哈','dealDate':'2016-4-27','backCode':'010A00','backCodeDes':'交易失败'},
		];
		var nowData = {
				state:'10000',
				desc:'查询成功',
				data:{
					totalCount:82,
					datas:json
				}
			};
			return nowData;
	}
};

// function getSignInOutDa(){
// 	var businessLine = ['全部','咪咕文化','咪咕动漫','咪咕音乐','咪咕视讯','咪咕数媒','咪咕互娱'];
// 	var failDas = [];
// 	for(var i=0,j=provinces.length;i<j;i++){
// 		failDas.push({
// 			businessLine:businessLine[i],
// 			oriTradeSeqno:Math.ceil(Math.random()*10000),
// 			oriTradeSession:Math.ceil(Math.random()*100),
// 			backCode:Math.ceil(Math.random()*100),
// 			dealDate:new Date(),
// 			backCodeDes:"交易失败",
// 			// provinceName:provinces[i],
// 			// provinceCode:Math.ceil(Math.random()*100),
// 			// contractStatus:Math.round(Math.random()*1),
// 			// updateTime:new Date(),
// 			// qureyTime:new Date()
// 		});
// 	}
	// return failDas;
// };




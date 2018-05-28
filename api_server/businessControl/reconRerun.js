'use strict';

exports.request = function(app){
	//条件查询
	app.post('/controlstation/businessControl/accountFileRerun/accountFileQuery', function(req, res) {
		var reconRerunData = getReconRerunData();
	  res.send(reconRerunData);
	});
	//省重跑
	app.post('/controlstation/businessControl/accountFileRerun/provinceRerun', function(req, res) {
		var rerunData = getRerunData();
	  res.send(rerunData);
	});
	//核减重跑
	app.post('/controlstation/businessControl/accountFileRerun/subtractRerun', function(req, res) {
		var subtractRerunDa = subtractRerun();
	  res.send(subtractRerunDa);
	});

	function getReconRerunData(){
		var provinces = ['广东','广西','湖北','湖南','河南','河北','四川','山东','山西','浙江',
		'四川','山东','山西','浙江','四川','山东','山西','浙江','四川','山东','山西','浙江'];
		var alarmData = [];
		for(var i=0,j=provinces.length;i<j;i++){
			alarmData.push({
				settleDate: new Date(),			//账期
				provinceName: provinces[i],	//省份名
				businessLine: '咪咕',				//外部商户名称
				proFileName: 'FD'+'测试文件名'+i,//省测文件名称
				stateDesc: '未完成',				//对账状态
				fileStatus: '文件到达成功',	//文件到达状态
				fileType: '到达文件',				//文件类型
				processId: 9527+i,					//流程id
				provinceCode: 200+i         //省码
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

	function getRerunData(){
		var rerunDa = {
			result: 'success',
			description: '文件不存在'
		};
		return rerunDa;
	}

	function subtractRerun(){
		var subDa = {
			result: 'success',
			description: '重跑失败'
		};
		return subDa;
	}
};




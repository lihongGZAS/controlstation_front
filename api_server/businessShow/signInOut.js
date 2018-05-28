'use strict';

exports.request = function(app){
	app.post('/controlstation/businessShow/signInOut/query', function(req, res) {
		var signInOutDas = getSignInOutDa();
	  res.send(signInOutDas);
	});

	function getSignInOutDa(){
		var provinces = ['广东','广西','湖北','湖南','河南','河北','四川','山东','山西','浙江',
		'四川','山东','山西','浙江','四川','山东','山西','浙江','四川','山东','山西','浙江'];
		var signDas = [];
		for(var i=0,j=provinces.length;i<j;i++){
			signDas.push({
				provinceName: provinces[i], //省公司名称
				provinceCode: Math.ceil(Math.random()*100), //省公司编码
				signStatus: Math.round(Math.random()*1), //签约状态
				signDate: new Date()//更新时间
			});
		}
		var nowData = {
			state:'10000',
			desc:'查询成功',
			data:{
				totalCount:82,
				datas:signDas
			}
		};
		return nowData;
	}
};




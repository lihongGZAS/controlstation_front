'use strict';

exports.request = function(app){
  //结算日数据
  function getDayOfSettleData(){
    var provinces = ['云南','广东','广西','湖北','湖南','河南','河北','四川','山东','山西','浙江',
    '四川','山东','山西','浙江','四川','山东','山西','浙江','四川','山东','山西','浙江'];
    var alarmData = [];
    for(var i=0,j=provinces.length;i<j;i++){
      alarmData.push({
        provinceName:provinces[i],//省公司
        currentPeriod:'往来段',//往来段
        spCode: '0324',//业务平台企业代码
        chargeNumber:100,//扣费交易总笔数
        chargeAmount:200000,//扣费交易总金额
        refundNumber:200,//退款交易总笔数
        refundAmount:430220,//退款交易总金额
        settlementAmount:210980,//结算金额
        settlementAmount85:29012,//结算金额*85%
        settlementAmount15:1334//结算金额*15%
      });
    }
    var nowData = {
      state:'10000',
      desc:'查询失败',
      data:{
        totalNumber:{
         chargeNumberTotal:200, //扣费交易总笔数(合计)
         chargeAmountTotal:3000,//扣费交易总金额(合计)
         refundNumberTotal:4786, //退款交易总笔数(合计)
         refundAmountTotal:2345, //退款交易总金额(合计)
         settlementAmountTotal:7789, //结算金额(合计)
         settlementAmount85Total:9065, //结算金额*85%(合计)
         settlementAmount15Total:1234 //结算金额*15%(合计)
        },
        datas:alarmData
      }
    };
    return nowData;
  }
  //结算月数据
  function getMonthOfSettleData(){
    var provinces = ['云南','广东','广西','湖北','湖南','河南','河北','四川','山东','山西','浙江',
    '四川','山东','山西','浙江','四川','山东','山西','浙江','四川','山东','山西','浙江'];
    var alarmData = [];
    for(var i=0,j=provinces.length;i<j;i++){
      alarmData.push({
        provinceName:provinces[i],//省公司
        currentPeriod:'往来段',//往来段
        spCode: '0324',//业务平台企业代码
        chargeNumber:100,//扣费交易总笔数
        chargeAmount:200000,//扣费交易总金额
        refundNumber:200,//退款交易总笔数
        refundAmount:430220,//退款交易总金额
        subtractionNumber:1203, //核减交易总笔数
        subtractionAmount:12456, //核减交易总金额
        settlementAmount:12345,//结算金额
        settlementAmount85:29012,//结算金额*85%
        settlementAmount15:1334//结算金额*15%
      });
    }
    var nowData = {
      state:'10000',
      desc:'查询失败',
      data:{
        totalNumber:{
         chargeNumberTotal:  123, //扣费交易总笔数(合计)
         chargeAmountTotal: 456,//扣费交易总金额(合计)
         refundNumberTotal: 666, //退款交易总笔数(合计)
         refundAmountTotal: 546, //退款交易总金额(合计)
         subtractionNumberTotal: 23456, //核减交易总笔数(合计)
         subtractionAmountTotal: 1200, //核减交易总金额(合计)
         settlementAmountTotal: 890, //结算金额(合计)
         settlementAmount85Total: 1260, //结算金额*85%(合计)
         settlementAmount15Total: 8900 //结算金额*15%(合计)
        },
        datas:alarmData
      }
    };
    return nowData;
  }
	app.post('/controlstation/businessControl/settleCheckRerun/query', function(req,res) {
		if (req.body.dateType === 'DAY') {
			var dayOfSettleData = getDayOfSettleData();
	  	res.send(dayOfSettleData);
		}else{
			var monthOfSettleData = getMonthOfSettleData();
	  	res.send(monthOfSettleData);
		}
	});
  app.post('/controlstation/businessControl/settleCheckRerun/reportRerun', function(req,res) {
    console.log(req.body);
    res.send(
        {
          result:"SUCCESS",
          description:"重跑成功"
        },
        {
          result:"DEFAULT",
          description:"重跑失败"
        },
        {
          result:"ERROR",
          description:"重跑错误"
        }
      );
    });
	// app.post('/controlstation/businessControl/settleCheckRerun/monthRerun', function(req,res) {
 //    var monthOfSettleData = getMonthOfSettleData();
 //    res.send(monthOfSettleData);
 //  });
};
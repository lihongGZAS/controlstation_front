'use strict';
exports.request = function(app){
  //获取日详单模拟数据
  function getDayData(){
    var json = [{provinceName:"江西",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"江西",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"江西",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"江西",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"江西",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"江西",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"江西",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"江西",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"江西",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"江西",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"江西",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"江西",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"重庆",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"贵州",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"云南",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003}
    ];

    var nowData = {
      state:'10000',
      desc:'查询失败',
      data:{
        totalNumber:{
            chargeNumberTotal:200,//扣费交易总笔数(合计)
            changeAmountTotal:230,//扣费交易总金额(合计)
            refundNumberTotal:345,//退款交易总笔数(合计)
            refundAmountTotal:777,//退款交易总金额(合计)
            settlementAmountTotal:456,//结算金额(合计)
            settlementAmount85Total:789,//结算金额*85%(合计)
            settlementAmount15Total:900//结算金额*15%(合计)
        },
        datas:json
      }
    };
    return nowData;
  }
  
  //月详单模拟数据
  function getMonthData(){
   var json = [{provinceName:"江西",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,subtractionNumber:2930,subtractionAmount:293045,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"江西",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,subtractionNumber:2930,subtractionAmount:293045,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"江西",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,subtractionNumber:2930,subtractionAmount:293045,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"江西",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,subtractionNumber:2930,subtractionAmount:293045,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"江西",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,subtractionNumber:2930,subtractionAmount:293045,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"江西",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,subtractionNumber:2930,subtractionAmount:293045,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"江西",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,subtractionNumber:2930,subtractionAmount:293045,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"江西",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,subtractionNumber:2930,subtractionAmount:293045,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"江西",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,subtractionNumber:2930,subtractionAmount:293045,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"江西",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,subtractionNumber:2930,subtractionAmount:293045,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"江西",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,subtractionNumber:2930,subtractionAmount:293045,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"江西",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,subtractionNumber:2930,subtractionAmount:293045,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"重庆",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,subtractionNumber:2930,subtractionAmount:293045,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"贵州",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,subtractionNumber:2930,subtractionAmount:293045,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003},
    {provinceName:"云南",currentPeriod:"往来段",spCode:"2102",chargeNumber:300,changeAmount:40003,refundNumber:450,refundAmount:37569,subtractionNumber:2930,subtractionAmount:293045,settlementAmount:99845,settlementAmount85:123421,settlementAmount15:2003}
    ];
    var nowData = {
      state:'10000',
      desc:'查询失败',
      data:{
        totalNumber:{
          chargeNumberTotal:3200,//扣费交易总笔数(合计)
          changeAmountTotal:3500,//扣费交易总金额(合计)
          refundNumberTotal:6789,//退款交易总笔数(合计)
          refundAmountTotal:9000,//退款交易总金额(合计)
          settlementAmountTotal:1245,//结算金额(合计)
          settlementAmount85Total:6547,//结算金额*85%(合计)
          settlementAmount15Total:8900,//结算金额*15%(合计)
        },
        datas:json
      }
    };
    return nowData;
  }
  //发送请求数据
  app.post('/controlstation/formOut/liveSettleDetailForm/query', function(req, res) {
    if (req.body.formType === '日详单') {
      var dayData = getDayData();
      res.send(dayData);
    }else{
      var monthData = getMonthData();
      res.send(monthData);
    }
  });
  //发送导出数据
  app.post('/controlstation/formOut/liveSettleDetailForm/export', function(req, res) {
    if (req.body.formType === '日详单') {
      var dayData = getDayData();
      res.send(dayData);
    }else{
      var monthData = getMonthData();
      res.send(monthData);
    }
  });
  
};
'use strict';

exports.request = function(app){

    app.post('/controlstation/countShow/countDifferent/query', function(req, res) {
        var countDiffData = getCountDiffData();
      res.send(countDiffData);
    });

    function getCountDiffData(){
        var json = [
        {countDiffDate:"2017-1-1",status:"已生成",province:"广东",outerBusinessman:"咪咕",diffType:"F113",diffTotal:"10",diffSum:"20"},
        {countDiffDate:"2017-1-1",status:"已生成",province:"广东",outerBusinessman:"咪咕",diffType:"F113",diffTotal:"10",diffSum:"20"},
        {countDiffDate:"2017-1-1",status:"已生成",province:"广东",outerBusinessman:"咪咕",diffType:"F114",diffTotal:"10",diffSum:"20"},
        {countDiffDate:"2017-1-1",status:"已生成",province:"广东",outerBusinessman:"咪咕",diffType:"F113",diffTotal:"10",diffSum:"20"},
        {countDiffDate:"2017-1-1",status:"已生成",province:"广东",outerBusinessman:"咪咕",diffType:"F115",diffTotal:"10",diffSum:"20"},
        {countDiffDate:"2017-1-1",status:"已生成",province:"广东",outerBusinessman:"咪咕",diffType:"F115",diffTotal:"10",diffSum:"20"},
        {countDiffDate:"2017-1-1",status:"已生成",province:"广东",outerBusinessman:"咪咕",diffType:"F114",diffTotal:"10",diffSum:"20"},
        {countDiffDate:"2017-1-1",status:"已生成",province:"广东",outerBusinessman:"咪咕",diffType:"F113",diffTotal:"10",diffSum:"20"},
        {countDiffDate:"2017-1-1",status:"已生成",province:"广东",outerBusinessman:"咪咕",diffType:"F113",diffTotal:"10",diffSum:"20"},
        {countDiffDate:"2017-1-1",status:"已生成",province:"广东",outerBusinessman:"咪咕",diffType:"F113",diffTotal:"10",diffSum:"20"},
        {countDiffDate:"2017-1-1",status:"已生成",province:"广东",outerBusinessman:"咪咕",diffType:"F113",diffTotal:"10",diffSum:"20"},
        {countDiffDate:"2017-1-1",status:"已生成",province:"广东",outerBusinessman:"咪咕",diffType:"F113",diffTotal:"10",diffSum:"20"},
        {countDiffDate:"2017-1-1",status:"已生成",province:"广东",outerBusinessman:"咪咕",diffType:"F113",diffTotal:"10",diffSum:"20"},
        {countDiffDate:"2017-1-1",status:"已生成",province:"广东",outerBusinessman:"咪咕",diffType:"F113",diffTotal:"10",diffSum:"20"},
        {countDiffDate:"2017-1-1",status:"已生成",province:"广东",outerBusinessman:"咪咕",diffType:"F113",diffTotal:"10",diffSum:"20"},
        ];
        var nowData = {
          state:'10000',
          desc:'查询失败',          
          data:{
            totalCount:82,                   
            totalNumber:{
              totalSum:12312,//当前页面差异条数总数
              totalAmount:345634//当前页面差异金额总数
            },
            datas:json
          },
        };
        return nowData;
    }
};
'use strict';

exports.request = function(app){
  function getReconDownData(){
    var json = [
      {reconDownDate:'2017-1-1',fileType:"上发文件",outerBusinessman:"咪咕",provinceCode:"江苏",accFileName:"MGZXJFMXYYYYMMDDNNN.PPP.CMCC",fileStatus:true},
      {reconDownDate:'2017-1-1',fileType:"上发文件",outerBusinessman:"咪咕",provinceCode:"福建",accFileName:"MGZXJFMXYYYYMMDDNNN.PPP.CMCC",fileStatus:true},
      {reconDownDate:'2017-1-1',fileType:"错误文件",outerBusinessman:"咪咕",provinceCode:"江苏",accFileName:"MGZXJFMXYYYYMMDDNNN.PPP.CMCC",fileStatus:false},
      {reconDownDate:'2017-1-1',fileType:"错误文件",outerBusinessman:"咪咕",provinceCode:"江苏",accFileName:"MGZXJFMXYYYYMMDDNNN.PPP.CMCC",fileStatus:true},
      {reconDownDate:'2017-1-1',fileType:"错误文件",outerBusinessman:"咪咕",provinceCode:"福建",accFileName:"MGZXJFMXYYYYMMDDNNN.PPP.CMCC",fileStatus:false},
      {reconDownDate:'2017-1-1',fileType:"差异文件",outerBusinessman:"互联网",provinceCode:"福建",accFileName:"MGZXJFMXYYYYMMDDNNN.PPP.CMCC",fileStatus:true},
      {reconDownDate:'2017-1-1',fileType:"差异文件",outerBusinessman:"互联网",provinceCode:"江苏",accFileName:"MGZXJFMXYYYYMMDDNNN.PPP.CMCC",fileStatus:false},
      {reconDownDate:'2017-1-1',fileType:"差异文件",outerBusinessman:"互联网",provinceCode:"江苏",accFileName:"MGZXJFMXYYYYMMDDNNN.PPP.CMCC",fileStatus:true},
      {reconDownDate:'2017-1-1',fileType:"差异文件",outerBusinessman:"咪咕",provinceCode:"江苏",accFileName:"MGZXJFMXYYYYMMDDNNN.PPP.CMCC",fileStatus:false},
      {reconDownDate:'2017-1-1',fileType:"差异文件",outerBusinessman:"咪咕",provinceCode:"江苏",accFileName:"MGZXJFMXYYYYMMDDNNN.PPP.CMCC",fileStatus:true},
      {reconDownDate:'2017-1-1',fileType:"上发文件",outerBusinessman:"咪咕",provinceCode:"江苏",accFileName:"MGZXJFMXYYYYMMDDNNN.PPP.CMCC",fileStatus:false},
    ];
       
    var nowData = {
      state:'10000',
      desc:'查询失败',
      data:{
        totalCount:82,
        datas:json
      }
    };
    return nowData;
  }
  function accountDownload(){
    var json = {fileNameArry:"MGZXJFMXYYYYMMDDNNN.PPP.CMCC"};
    var nowData = {
      state:'10000',
      desc:'查询失败',
      data:{
        totalCount:82,
        datas:json
      }
    };
    return nowData;
}
	app.post('/controlstation/businessControl/reconDown/query', function(req, res) {
		var reconDownData = getReconDownData();
	  res.send(reconDownData);
	});
  app.get('/controlstation/businessControl/reconDown/download', function(req, res) {
    console.log(req.body);
    var accountDownloadData = accountDownload();
    res.send(accountDownloadData);
  });
};


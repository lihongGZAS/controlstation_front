'use strict';
exports.request = function(app){
  function getCheckFileData(){
    var json = [
    {order:1,accountDate:"2017-2-24",fileType:"上发文件",outerBusinessman:"咪咕平台",provinceCode:"台湾省",fileName:"MGZXJFMXYYYYMMDDNNN.PPP.CMCC",fileStatus:true},
    {order:2,accountDate:"2017-2-24",fileType:"差异文件",outerBusinessman:"咪咕平台",provinceCode:"台湾省",fileName:"MGZXJFMXYYYYMMDDNNN.PPP.CMCC",fileStatus:true},
    {order:3,accountDate:"2017-2-24",fileType:"错误文件",outerBusinessman:"咪咕平台",provinceCode:"台湾省",fileName:"MGZXJFMXYYYYMMDDNNN.PPP.CMCC",fileStatus:false},
    {order:4,accountDate:"2017-2-24",fileType:"上发文件",outerBusinessman:"咪咕平台",provinceCode:"台湾省",fileName:"MGZXJFMXYYYYMMDDNNN.PPP.CMCC",fileStatus:true},
    {order:5,accountDate:"2017-2-24",fileType:"差异文件",outerBusinessman:"咪咕平台",provinceCode:"台湾省",fileName:"MGZXJFMXYYYYMMDDNNN.PPP.CMCC",fileStatus:false},
    {order:6,accountDate:"2017-2-24",fileType:"错误文件",outerBusinessman:"咪咕平台",provinceCode:"台湾省",fileName:"MGZXJFMXYYYYMMDDNNN.PPP.CMCC",fileStatus:true},
    {order:7,accountDate:"2017-2-24",fileType:"上发文件",outerBusinessman:"咪咕平台",provinceCode:"台湾省",fileName:"MGZXJFMXYYYYMMDDNNN.PPP.CMCC",fileStatus:false},
    {order:8,accountDate:"2017-2-24",fileType:"错误文件",outerBusinessman:"咪咕平台",provinceCode:"台湾省",fileName:"MGZXJFMXYYYYMMDDNNN.PPP.CMCC",fileStatus:false},
    {order:9,accountDate:"2017-2-24",fileType:"错误文件",outerBusinessman:"咪咕平台",provinceCode:"台湾省",fileName:"MGZXJFMXYYYYMMDDNNN.PPP.CMCC",fileStatus:false},
    {order:10,accountDate:"2017-2-24",fileType:"错误文件",outerBusinessman:"咪咕平台",provinceCode:"台湾省",fileName:"MGZXJFMXYYYYMMDDNNN.PPP.CMCC",fileStatus:true},
    {order:11,accountDate:"2017-2-24",fileType:"错误文件",outerBusinessman:"咪咕平台",provinceCode:"台湾省",fileName:"MGZXJFMXYYYYMMDDNNN.PPP.CMCC",fileStatus:true},
    {order:12,accountDate:"2017-2-24",fileType:"上发文件",outerBusinessman:"咪咕平台",provinceCode:"台湾省",fileName:"MGZXJFMXYYYYMMDDNNN.PPP.CMCC",fileStatus:true},
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
  function getCheckFileDownloadData(){
    var json = [
    {order:1,accountDate:"2017-2-24",fileType:"上发文件",outerBusinessman:"咪咕平台",provinceCode:"台湾省",fileName:"上发文件"},
    {order:2,accountDate:"2017-2-24",fileType:"上发文件",outerBusinessman:"咪咕平台",provinceCode:"台湾省",fileName:"上发文件"},
    {order:3,accountDate:"2017-2-24",fileType:"上发文件",outerBusinessman:"咪咕平台",provinceCode:"台湾省",fileName:"上发文件"},
    {order:4,accountDate:"2017-2-24",fileType:"上发文件",outerBusinessman:"咪咕平台",provinceCode:"台湾省",fileName:"上发文件"},
    {order:5,accountDate:"2017-2-24",fileType:"上发文件",outerBusinessman:"咪咕平台",provinceCode:"台湾省",fileName:"上发文件"},
    {order:6,accountDate:"2017-2-24",fileType:"上发文件",outerBusinessman:"咪咕平台",provinceCode:"台湾省",fileName:"上发文件"},
    {order:7,accountDate:"2017-2-24",fileType:"上发文件",outerBusinessman:"咪咕平台",provinceCode:"台湾省",fileName:"上发文件"},
    {order:8,accountDate:"2017-2-24",fileType:"上发文件",outerBusinessman:"咪咕平台",provinceCode:"台湾省",fileName:"上发文件"},
    {order:9,accountDate:"2017-2-24",fileType:"上发文件",outerBusinessman:"咪咕平台",provinceCode:"台湾省",fileName:"上发文件"},
    {order:10,accountDate:"2017-2-24",fileType:"上发文件",outerBusinessman:"咪咕平台",provinceCode:"台湾省",fileName:"上发文件"},
    {order:11,accountDate:"2017-2-24",fileType:"上发文件",outerBusinessman:"咪咕平台",provinceCode:"台湾省",fileName:"上发文件"},
    {order:12,accountDate:"2017-2-24",fileType:"上发文件",outerBusinessman:"咪咕平台",provinceCode:"台湾省",fileName:"上发文件"},
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
  app.post('/controlstation/businessControl/checkFileDownload/query', function(req, res) {
      var checkFileData = getCheckFileData();
    res.send(checkFileData);
  });
  app.get('/controlstation/businessControl/checkFileDownload/download', function(req, res) {
      var checkFileDownloadDs = getCheckFileDownloadData();
    res.send(checkFileDownloadDs);
  });
  
};
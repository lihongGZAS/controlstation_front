'use strict';

exports.request = function(app){
  function getCountArriveData(){
    var json = [
    {number:"1",countDate:"2015-12-12",fileType:"对账文件",outerBusinessman:"咪咕平台",provinceName:"广州",status:"文件新到达",countFileName:"mail.txt"},
    {number:"2",countDate:"2015-12-12",fileType:"核减文件",outerBusinessman:"咪咕平台",provinceName:"上海",status:"文件新到达",countFileName:"mail.txt"},
    {number:"3",countDate:"2015-12-12",fileType:"对账文件",outerBusinessman:"咪咕平台",provinceName:"深圳",status:"文件部分到达",countFileName:"mail.txt"},
    {number:"4",countDate:"2015-12-12",fileType:"核减文件",outerBusinessman:"咪咕平台",provinceName:"南宁",status:"文件部分到达",countFileName:"mail.txt"},
    {number:"5",countDate:"2015-12-12",fileType:"核减文件",outerBusinessman:"咪咕平台",provinceName:"北京",status:"文件部分到达",countFileName:"mail.txt"},
    {number:"6",countDate:"2015-12-12",fileType:"核减文件",outerBusinessman:"咪咕平台",provinceName:"广州",status:"文件部分到达",countFileName:"mail.txt"},
    {number:"7",countDate:"2015-12-12",fileType:"核减文件",outerBusinessman:"咪咕平台",provinceName:"上海",status:"文件部分到达",countFileName:"mail.txt"},
    {number:"8",countDate:"2015-12-12",fileType:"上发文件",outerBusinessman:"咪咕平台",provinceName:"深圳",status:"文件部分到达",countFileName:"mail.txt"},
    {number:"9",countDate:"2015-12-12",fileType:"上发文件",outerBusinessman:"咪咕平台",provinceName:"南宁",status:"文件部分到达",countFileName:"mail.txt"},
    {number:"10",countDate:"2015-12-12",fileType:"上发文件",outerBusinessman:"咪咕平台",provinceName:"北京",status:"文件部分到达",countFileName:"mail.txt"},
    {number:"11",countDate:"2015-12-12",fileType:"上发文件",outerBusinessman:"咪咕平台",provinceName:"上海",status:"文件部分到达",countFileName:"mail.txt"},
    {number:"12",countDate:"2015-12-12",fileType:"上发文件",outerBusinessman:"咪咕平台",provinceName:"深圳",status:"文件部分到达",countFileName:"mail.txt"},
    {number:"13",countDate:"2015-12-12",fileType:"上发文件",outerBusinessman:"咪咕平台",provinceName:"南宁",status:"文件部分到达",countFileName:"mail.txt"},
    {number:"14",countDate:"2015-12-12",fileType:"上发文件",outerBusinessman:"咪咕平台",provinceName:"北京",status:"文件部分到达",countFileName:"mail.txt"}];

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
  app.post('/controlstation/countShow/countFileArrive/countQuery', function(req, res) {
    var countArriveData = getCountArriveData();
    res.send(countArriveData);
  });
};
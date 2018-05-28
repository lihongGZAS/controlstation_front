'use strict';
exports.request = function(app){
  app.post('/controlstation/formOut/settlementReport/reportQuery', function(req, res) {
    var request = req.body;
    var formQueryData = getFormQueryData(request.businessLine);
    res.send(formQueryData);
  });
  app.get('/controlstation/formOut/settlementReport/reportExport', function(req, res){
    var exportsDate = getExportDa();
    res.send(exportsDate);
  });

  function getFormQueryData(businessLine){
    var provinces = ['广东','广西','湖北','湖南','河南','河北','四川','山东','山西','浙江',
    '四川','山东','山西','浙江','四川','山东','山西','浙江','四川','山东','山西','浙江'];
    var provinceDatas = [];
    var spNames1 = ['咪咕音乐','咪咕数媒','咪咕互娱','咪咕视讯','咪咕动漫'];
    var spNames2 = ['互联网','139邮箱','和飞信','和留言','和彩云','和通讯录'];
    var miguDatas = [];

    var totalNumbers = ['应收合计','应付合计','合计'];
    var totalDatas = [];
    if('0068'===businessLine){
      for(var i=0;i<provinces.length;i++){
        provinceDatas.push({
          settleDate: '2017-03',
          provinceName: provinces[i],//省份编码Code对应的省份名,默认为全部
          currentPeriod:'0035'+i,//往来段
          out_miguMusic_noTax: 100+i,
          out_miguMusic_Tax: 130+i,
          in_miguMusic_noTax: 140+i,
          in_miguMusic_Tax: 150+i,
          out_miguMedia_noTax: 200+i,
          out_miguMedia_Tax: 230+i,
          in_miguMedia_noTax: 240+i,
          in_miguMedia_Tax: 250+i,
          out_miguVideo_noTax: 300+i,
          out_miguVideo_Tax: 330+i,
          in_miguVideo_noTax: 340+i,
          in_miguVideo_Tax: 350+i,
          out_miguEntertainment_noTax: 400+i,
          out_miguEntertainment_Tax: 430+i,
          in_miguEntertainment_noTax: 440+i,
          in_miguEntertainment_Tax: 450+i,
          out_miguCartoon_noTax: 500+i,
          out_miguCartoon_Tax: 530+i,
          in_miguCartoon_noTax: 540+i,
          in_miguCartoon_Tax: 550+i,
          out_miguBusiness_noTax: 600+i,
          out_miguBusiness_Tax: 630+i,
          in_miguBusiness_noTax: 640+i,
          in_miguBusiness_Tax: 650+i,
          settlementAmount:66343+i*12//结算额：含税金额
        });
      }
      for(var m=0;m<spNames1.length;m++){
        miguDatas.push({
          m_id: m, //序号
          spName: spNames1[m], //业务线合称（包括咪咕业务线即：咪咕音乐，咪咕数媒，咪咕互娱（包括咪咕互娱，咪咕业务），咪咕视讯，咪咕动漫。互联网业务线即：互联网，139邮箱，和飞信，和留言，和彩云，和通讯录）。
          m_currentPeriod: '87347', //往来段

          m_in_miguMusic_noTax: (Math.random()*10000).toFixed(2), //不含税金额.B3  （咪咕音乐__应结入）
          m_in_miguMusic_Tax: (Math.random()*10000).toFixed(2), //税额.B4 （咪咕音乐__应结入）
          m_in_miguMedia_noTax: (Math.random()*10000).toFixed(2), //不含税金额.C3  （咪咕数媒__应结入）
          m_in_miguMedia_Tax: (Math.random()*10000).toFixed(2), //税额.C4 （咪咕数媒__应结入）
          m_in_miguVideo_noTax: (Math.random()*10000).toFixed(2), //不含税金额.D3  （咪咕视讯__应结入）
          m_in_miguVideo_Tax: (Math.random()*10000).toFixed(2), //税额.D4 （咪咕视讯__应结入）
          m_in_miguEntertainment_noTax: (Math.random()*10000).toFixed(2), //不含税金额.E3  （咪咕互娱__应结入）
          m_in_miguEntertainment_Tax: (Math.random()*10000).toFixed(2), //税额.E4 （咪咕互娱__应结入）
          m_in_miguCartoon_noTax: (Math.random()*10000).toFixed(2), //不含税金额.F3  （咪咕动漫__应结入）
          m_in_miguCartoon_Tax: (Math.random()*10000).toFixed(2), //税额.F4 （咪咕动漫__应结入）
          m_in_miguBusiness_noTax: (Math.random()*10000).toFixed(2), //不含税金额.G3  （咪咕业务__应结入）
          m_in_miguBusiness_Tax: (Math.random()*10000).toFixed(2), //税额.G4 （咪咕业务__应结入）
          m_settlementAmount: (Math.random()*10000).toFixed(2) //结算额
        });
      }
      for(var a=0;a<totalNumbers.length;a++){
        totalDatas.push({
          totalNumber:totalNumbers[a], //总计（内容：应收合计，应付合计，合计）
          t_out_miguMusic_noTax: totalNumbers[a]==='应付合计'?(Math.random()*10000).toFixed(2):'', //不含税金额.B1  （咪咕音乐__应结出）
          t_out_miguMusic_Tax: totalNumbers[a]==='应付合计'?(Math.random()*10000).toFixed(2):'', //税额.B2 （咪咕音乐__应结出）
          t_in_miguMusic_noTax: totalNumbers[a]==='应收合计'?(Math.random()*10000).toFixed(2):'', //不含税金额.B3  （咪咕音乐__应结入）
          t_in_miguMusic_Tax: totalNumbers[a]==='应收合计'?(Math.random()*10000).toFixed(2):'', //税额.B4 （咪咕音乐__应结入）

          t_out_miguMedia_noTax: totalNumbers[a]==='应付合计'?(Math.random()*10000).toFixed(2):'', //不含税金额.C1  （咪咕__应结出）
          t_out_miguMedia_Tax: totalNumbers[a]==='应付合计'?(Math.random()*10000).toFixed(2):'', //税额.C2 （咪咕线__应结出）
          t_in_miguMedia_noTax: totalNumbers[a]==='应收合计'?(Math.random()*10000).toFixed(2):'', //不含税金额.C3  （咪咕线__应结入）
          t_in_miguMedia_Tax: totalNumbers[a]==='应收合计'?(Math.random()*10000).toFixed(2):'', //税额.C4 （咪咕线__应结入）

          t_out_miguVideo_noTax: totalNumbers[a]==='应付合计'?(Math.random()*10000).toFixed(2):'', //不含税金额.D1  （咪咕线__应结出）
          t_out_miguVideo_Tax: totalNumbers[a]==='应付合计'?(Math.random()*10000).toFixed(2):'', //税额.D2 （咪咕线__应结出）
          t_in_miguVideo_noTax: totalNumbers[a]==='应收合计'?(Math.random()*10000).toFixed(2):'', //不含税金额.D3  （咪咕线__应结入）
          t_in_miguVideo_Tax: totalNumbers[a]==='应收合计'?(Math.random()*10000).toFixed(2):'', //税额.D4 （咪咕线__应结入）

          t_out_miguEntertainment_noTax: totalNumbers[a]==='应付合计'?(Math.random()*10000).toFixed(2):'', //不含税金额.E1  （咪咕线__应结出）
          t_out_miguEntertainment_Tax: totalNumbers[a]==='应付合计'?(Math.random()*10000).toFixed(2):'', //税额.E2 （咪咕线__应结出）
          t_in_miguEntertainment_noTax: totalNumbers[a]==='应收合计'?(Math.random()*10000).toFixed(2):'', //不含税金额.E3  （咪咕线__应结入）
          t_in_miguEntertainment_Tax: totalNumbers[a]==='应收合计'?(Math.random()*10000).toFixed(2):'', //税额.E4 （咪咕线__应结入）

          t_out_miguCartoon_noTax: totalNumbers[a]==='应付合计'?(Math.random()*10000).toFixed(2):'', //不含税金额.F1  （咪咕线__应结出）
          t_out_miguCartoon_Tax: totalNumbers[a]==='应付合计'?(Math.random()*10000).toFixed(2):'', //税额.F2 （咪咕线__应结出）
          t_in_miguCartoon_noTax: totalNumbers[a]==='应收合计'?(Math.random()*10000).toFixed(2):'', //不含税金额.F3  （咪咕线__应结入）
          t_in_miguCartoon_Tax: totalNumbers[a]==='应收合计'?(Math.random()*10000).toFixed(2):'', //税额.F4 （咪咕线__应结入）

          t_out_miguBusiness_noTax: totalNumbers[a]==='应付合计'?(Math.random()*10000).toFixed(2):'', //不含税金额.G1  （咪咕线__应结出）
          t_out_miguBusiness_Tax: totalNumbers[a]==='应付合计'?(Math.random()*10000).toFixed(2):'', //税额.G2 （咪咕线__应结出）
          t_in_miguBusiness_noTax: totalNumbers[a]==='应收合计'?(Math.random()*10000).toFixed(2):'', //不含税金额.G3  （咪咕线__应结入）
          t_in_miguBusiness_Tax: totalNumbers[a]==='应收合计'?(Math.random()*10000).toFixed(2):'', //税额.G4 （咪咕线__应结入）
          t_settlementAmount: (Math.random()*10000).toFixed(2) //结算额：含税金额
        });
      }
    }else{
      for(var j=0;j<provinces.length;j++){
        provinceDatas.push({
          settleDate: '2017-03',
          provinceName: provinces[j],//省份编码Code对应的省份名,默认为全部
          currentPeriod:'0035'+j,//往来段
          out_hlw_noTax:Math.ceil(Math.random()*1000), //不含税金额.B1  （互联网__应结出）
          out_hlw_Tax: Math.ceil(Math.random()*1000), //税额.B2 （互联网__应结出）
          in_hlw_noTax: Math.ceil(Math.random()*1000), //不含税金额.B3  （互联网__应结入）
          in_hlw_Tax: Math.ceil(Math.random()*1000), //税额.B4 （互联网__应结入）

          out_heCloud_noTax: Math.ceil(Math.random()*1000), //不含税金额.C1  （和彩云__应结出）
          out_heCloud_Tax: Math.ceil(Math.random()*1000), //税额.C2 （和彩云__应结出）
          in_heCloud_noTax: Math.ceil(Math.random()*1000), //不含税金额.C3  （和彩云__应结入）
          in_heCloud_Tax: Math.ceil(Math.random()*1000), //税额.C4 （和彩云__应结入）

          out_139Email_noTax: Math.ceil(Math.random()*1000), //不含税金额.D1  （139邮箱__应结出）
          out_139Email_Tax: Math.ceil(Math.random()*1000), //税额.D2 （139邮箱__应结出）
          in_139Email_noTax: Math.ceil(Math.random()*1000), //不含税金额.D3  （139邮箱__应结入）
          in_139Email_Tax: Math.ceil(Math.random()*1000), //税额.D4 （139邮箱__应结入）

          out_heMessage_noTax: Math.ceil(Math.random()*1000), //不含税金额.E1  （和留言__应结出）
          out_heMessage_Tax: Math.ceil(Math.random()*1000), //税额.E2 （和留言__应结出）
          in_heMessage_noTax: Math.ceil(Math.random()*1000), //不含税金额.E3  （和留言__应结入）
          in_heMessage_Tax: Math.ceil(Math.random()*1000), //税额.E4 （和留言__应结入）

          out_heFetion_noTax: Math.ceil(Math.random()*1000), //不含税金额.F1  （和飞信__应结出）
          out_heFetion_Tax: Math.ceil(Math.random()*1000), //税额.F2 （和飞信__应结出）
          in_heFetion_noTax: Math.ceil(Math.random()*1000), //不含税金额.F3  （和飞信__应结入）
          in_heFetion_Tax: Math.ceil(Math.random()*1000), //税额.F4 （和飞信__应结入）

          out_heContacts_noTax: Math.ceil(Math.random()*1000), //不含税金额.G1  （和通讯录__应结出）
          out_heContacts_Tax: Math.ceil(Math.random()*1000), //税额.G2 （和通讯录__应结出）
          in_heContacts_noTax: Math.ceil(Math.random()*1000), //不含税金额.G3  （和通讯录__应结入）
          in_heContacts_Tax: Math.ceil(Math.random()*1000), //税额.G4 （和通讯录__应结入）

          settlementAmount:66343+j*12//结算额：含税金额
        });
      }
      for(var n=0;n<spNames2.length;n++){
        miguDatas.push({
          m_id: n, //序号
          spName: spNames2[n], //业务线合称（包括咪咕业务线即：咪咕音乐，咪咕数媒，咪咕互娱（包括咪咕互娱，咪咕业务），咪咕视讯，咪咕动漫。互联网业务线即：互联网，139邮箱，和飞信，和留言，和彩云，和通讯录）。
          m_currentPeriod: '87347', //往来段
          h_in_hlw_noTax: (Math.random()*10000).toFixed(2), //不含税金额.B3  （互联网业务线__应结入）
          h_in_hlw_Tax: (Math.random()*10000).toFixed(2), //税额.B4 （互联网业务线__应结入）
          h_in_heCloud_noTax: (Math.random()*10000).toFixed(2), //不含税金额.C3  （互联网业务线__应结入）
          h_in_heCloud_Tax: (Math.random()*10000).toFixed(2), //税额.C4 （互联网业务线__应结入）
          h_in_139Email_noTax: (Math.random()*10000).toFixed(2), //不含税金额.D3  （互联网业务线__应结入）
          h_in_139Email_Tax: (Math.random()*10000).toFixed(2), //税额.D4 （互联网业务线__应结入）
          h_in_heMessage_noTax: (Math.random()*10000).toFixed(2), //不含税金额.E3  （互联网业务线__应结入）
          h_in_heMessage_Tax: (Math.random()*10000).toFixed(2), //税额.E4 （互联网业务线__应结入）
          h_in_heFetion_noTax: (Math.random()*10000).toFixed(2), //不含税金额.F3  （互联网业务线__应结入）
          h_in_heFetion_Tax: (Math.random()*10000).toFixed(2), //税额.F4 （互联网业务线__应结入）
          h_in_heContacts_noTax: (Math.random()*10000).toFixed(2), //不含税金额.G3  （互联网业务线__应结入）
          h_in_heContacts_Tax: (Math.random()*10000).toFixed(2), //税额.G4 （互联网业务线__应结入）
          m_settlementAmount: (Math.random()*10000).toFixed(2) //结算额
        });
      }
      for(var b=0;b<totalNumbers.length;b++){
        totalDatas.push({
          totalNumber:totalNumbers[b], //总计（内容：应收合计，应付合计，合计）
          t_out_hlw_noTax: totalNumbers[b]==='应付合计'?(Math.random()*10000).toFixed(2):'', //不含税金额.B1  （互联网线__应结出）
          t_out_hlw_Tax: totalNumbers[b]==='应付合计'?(Math.random()*10000).toFixed(2):'', //税额.B2 （互联网线__应结出）
          t_in_hlw_noTax: totalNumbers[b]==='应收合计'?(Math.random()*10000).toFixed(2):'', //不含税金额.B3  （互联网线__应结入）
          t_in_hlw_Tax: totalNumbers[b]==='应收合计'?(Math.random()*10000).toFixed(2):'', //税额.B4 （互联网线__应结入） 

          t_out_heCloud_noTax: totalNumbers[b]==='应付合计'?(Math.random()*10000).toFixed(2):'', //不含税金额.C1  （互联网线__应结出）
          t_out_heCloud_Tax: totalNumbers[b]==='应付合计'?(Math.random()*10000).toFixed(2):'', //税额.C2 （互联网线__应结出）
          t_in_heCloud_noTax: totalNumbers[b]==='应收合计'?(Math.random()*10000).toFixed(2):'', //不含税金额.C3  （互联网线__应结入）
          t_in_heCloud_Tax: totalNumbers[b]==='应收合计'?(Math.random()*10000).toFixed(2):'', //税额.C4 （互联网线__应结入） 

          t_out_139Email_noTax: totalNumbers[b]==='应付合计'?(Math.random()*10000).toFixed(2):'', //不含税金额.D1  （互联网线__应结出）
          t_out_139Email_Tax: totalNumbers[b]==='应付合计'?(Math.random()*10000).toFixed(2):'', //税额.D2 （互联网线__应结出）
          t_in_139Email_noTax: totalNumbers[b]==='应收合计'?(Math.random()*10000).toFixed(2):'', //不含税金额.D3  （互联网线__应结入）
          t_in_139Email_Tax: totalNumbers[b]==='应收合计'?(Math.random()*10000).toFixed(2):'', //税额.D4 （互联网线__应结入）

          t_out_heMessage_noTax: totalNumbers[b]==='应付合计'?(Math.random()*10000).toFixed(2):'', //不含税金额.E1  （互联网线__应结出）
          t_out_heMessage_Tax: totalNumbers[b]==='应付合计'?(Math.random()*10000).toFixed(2):'', //税额.E2 （互联网线__应结出）
          t_in_heMessage_noTax: totalNumbers[b]==='应收合计'?(Math.random()*10000).toFixed(2):'', //不含税金额.E3  （互联网线__应结入）
          t_in_heMessage_Tax: totalNumbers[b]==='应收合计'?(Math.random()*10000).toFixed(2):'', //税额.E4 （互联网线__应结入）

          t_out_heFetion_noTax: totalNumbers[b]==='应付合计'?(Math.random()*10000).toFixed(2):'', //不含税金额.F1  （互联网线__应结出）
          t_out_heFetion_Tax: totalNumbers[b]==='应付合计'?(Math.random()*10000).toFixed(2):'', //税额.F2 （互联网线__应结出）
          t_in_heFetion_noTax: totalNumbers[b]==='应收合计'?(Math.random()*10000).toFixed(2):'', //不含税金额.F3  （互联网线__应结入）
          t_in_heFetion_Tax: totalNumbers[b]==='应收合计'?(Math.random()*10000).toFixed(2):'', //税额.F4 （互联网线__应结入）

          t_out_heContacts_noTax: totalNumbers[b]==='应付合计'?(Math.random()*10000).toFixed(2):'', //不含税金额.G1  （互联网线__应结出）
          t_out_heContacts_Tax: totalNumbers[b]==='应付合计'?(Math.random()*10000).toFixed(2):'', //税额.G2 （互联网线__应结出）
          t_in_heContacts_noTax: totalNumbers[b]==='应收合计'?(Math.random()*10000).toFixed(2):'', //不含税金额.G3  （互联网线__应结入）
          t_in_heContacts_Tax: totalNumbers[b]==='应收合计'?(Math.random()*10000).toFixed(2):'', //税额.G4 （互联网线__应结入）

          t_settlementAmount: (Math.random()*10000).toFixed(2) //结算额：含税金额
        });
      }
    }
    var nowData = {
      state:'10000',
      desc:'查询成功',
      data:{
        provinceDatas: provinceDatas,
        miguDatas: miguDatas,
        totalDatas: totalDatas
      }
    };
    return nowData;
  }
  function getExportDa(){
    var nowData = {
        state:'10000',
        desc:'查询成功',
        data:{
            settleDate : 2,
            bussinessLine: '' 
        }   
    };
    return nowData;
  }
};
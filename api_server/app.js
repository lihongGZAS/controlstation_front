'use strict';
var express = require('express');
var logger = require('morgan');//在控制台中，显示req请求的信息。
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();
var http = require('http').createServer(app);
app.set('port', 19000);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

http.listen(app.get('port'), function() {
  console.log('监听端口：'+app.get('port'));
});

//签到签退
var signInOut = require('./businessShow/signInOut');
signInOut.request(app);
//失败交易查询
var failTransaction = require('./informationQuery/failTransaction');
failTransaction.request(app);
//公共查询接口
var commonQuery = require('./commonQuery/commonQuery');
commonQuery.request(app);

var countDiffShow = require('./countShow/countDiffShow');
countDiffShow.request(app);

var failTransaction = require('./informationQuery/failTransaction');
failTransaction.request(app);

var countAlarmShow = require('./countShow/countAlarmShow');
countAlarmShow.request(app);

var countArriveShow = require('./countShow/countArriveShow');
countArriveShow.request(app);

var liveSettleDetailForm = require('./formOut/liveSettleDetailForm');
liveSettleDetailForm.request(app);

var liveBalanceSettleForm = require('./formOut/liveBalanceSettleForm');
liveBalanceSettleForm.request(app);

var settleCheckRerun = require('./businessControl/settleCheckRerun');
settleCheckRerun.request(app);

var checkFileDOwnload = require('./businessControl/checkFileDOwnload');
checkFileDOwnload.request(app);

var fileSend = require('./businessControl/fileSend');
fileSend.request(app);

var reconDown = require('./businessControl/reconDown');
reconDown.request(app);

var reconRerun = require('./businessControl/reconRerun');
reconRerun.request(app);
var logOff = require('./logOff/logOff');
logOff.request(app);





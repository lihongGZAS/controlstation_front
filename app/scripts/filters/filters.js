/**
 * @Description 格式化原子属性类型
 * @author yugd
 * @CreateDate 2017/2/7 15:04
 **/
'use strict';
angular.module('controlstationFrontApp')
	//原子属性配置类型过滤器
	.filter('diffTypeFilter', function() {
		return function(data) {
			if (undefined === data || '' === data || null === data) {
				return;
			}
			switch (data) {
				case 'F113':
					return '统一支付系统外部商户日明细记录比省多的记录';
				case 'F114':
					return '统一支付系统外部商户日明细记录比省少的记录';
				case 'F115':
					return '对不平的外部商户业务日明细记录';	
				default:
					return '统一支付系统外部商户日明细记录比省多的记录';
			}
		};
	})
	//原子属性配置类型过滤器
	.filter('countAlarmFilter', function() {
		return function(data) {
			if (undefined === data || '' === data || null === data) {
				return;
			}
			var len = data.length;
			var realLength = 0;
			var newDa = '';
			for (var i = 0; i < len; i++) {
        var charCode = data.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128){
        	realLength += 1;
        }else {
        	realLength += 2;
        }
        newDa+=data.charAt(i);
        if(realLength>30){
        	newDa+='...';
        	break;
        }
      }
      return newDa;
		};
	});
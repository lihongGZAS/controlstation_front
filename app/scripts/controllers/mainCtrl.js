'use strict';

/**
 * description   主方法
 * createTime    2017-1-16
 * createBy      yugd
 */
angular.module('station.controller',[])
  .controller('mainCtrl',['$scope','$timeout','$compile','logOffService', function($scope,$timeout,$compile,logOffService) {
  	// 退出登录
    $scope.logOff=function(){
      if(window.confirm("确认退出登录？")===true){
        var userAgent = navigator.userAgent;
        if (userAgent.indexOf("Firefox") !== -1 || userAgent.indexOf("Chrome") !== -1) {
          window.location.href = "about:blank";
        } else {
          window.close();
        }
        logOffService.logOff();
      }   
    };
  	var _ang = angular.element;

    //初始化菜单
    $scope.menuInit = function(){
      setMenu();
    };
    //生成菜单代码
    function setMenu(){
      var mainMenu = window.config.mainMenu;
      var menuHtml = '<ul>';
      for(var i=0;i<mainMenu.length;i++){
        menuHtml += '<li ng-class="{mainMenuActive:mainMenu===\''+mainMenu[i].state+'\'}" name="'+mainMenu[i].state+'" ng-click="toggleMenu(\''+mainMenu[i].state+'\')"><span>'+mainMenu[i].name+'</span><i class="glyphicon glyphicon-chevron-down"></i></li>';
        if(mainMenu[i].child){
          menuHtml += '<ul ng-show="openMenu.'+mainMenu[i].state+'">';
          var childMenuLen = mainMenu[i].child.length;
          for(var j=0;j<childMenuLen;j++){
            var childState = mainMenu[i].child[j].state.split('.')[1];
            menuHtml +='<li><a ng-class="{childMenuActive:childMenu==\''+childState+'\'}" ui-sref="'+mainMenu[i].child[j].state+'">'+mainMenu[i].child[j].name+'</a></li>';
          }
          menuHtml += '</ul>';
        }
      }
      menuHtml+='</ul>';
      _ang('.proMenu').append($compile(menuHtml)($scope));
    }
    

    //初始化隐藏所有子菜单
    function initOpenMenu(){
      $scope.openMenu = {
        /*'businessShow':false,
        'informationQuery':false,*/
        'countShow':false,
        'businessControl':false,
        'formOut':false
      };
    }

  	//监听路由，绑定菜单栏样式
    $scope.$on('$stateChangeSuccess',function(evt, toState) {
    	var arrUrl = toState.url.split('/');
			$scope.mainMenu = arrUrl[1];
			$scope.childMenu = arrUrl[2];
      initOpenMenu();
      $scope.toggleMenu($scope.mainMenu);
    });

  	//点击展开收缩菜单
  	$scope.toggleMenu = function(toState){
  		var mainLi = _ang('li[name="'+toState+'"]').find('i');
      if($scope.openMenu[toState]===true){
        $scope.openMenu[toState] = false;
        mainLi.removeClass('glyphicon-chevron-up');
        mainLi.addClass('glyphicon-chevron-down');
      }else{
        $scope.openMenu[toState] = true;
        mainLi.removeClass('glyphicon-chevron-down');
        mainLi.addClass('glyphicon-chevron-up');
      }
  	};
    
    $scope.setNoticeMsg = function (type,tips) {
      $scope.noticeClass = 'alert alert-success';
      if('warn'===type){
        $scope.noticeClass = 'alert alert-warning';
      }else if('error'===type){
        $scope.noticeClass = 'alert alert-danger';
      }
      $scope.noticeMsg = tips;
      //先清除定时器
      if (noticeMsgTimer) {
        $timeout.cancel(noticeMsgTimer);
      }
      var noticeMsgTimer = $timeout(function () {
        $scope.noticeMsg = '';
      }, 2000);
    };
    
  }]);

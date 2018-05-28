'use strict';
angular.module('controlstationFrontApp').directive('paging', function() {
  return {
    restrict: 'E', //元素名称：<page></page>
    scope: {
      totalCount: '=', //总记录条数
      pageSize: '=', // 每页多少条
      currentPage: '=', // 当前页
      selectSize: '&', //展示页码数量
      goPage: '&', //跳转到哪一页
      firstText: '@', //首页
      lastText: '@', //尾页
      prevText: '@', //上一页
      nextText: '@' //下一页
    },
    templateUrl: 'views/common/paging.html',
    replace: true,
    controller: function($scope, $attrs, $parse) {
      var _this = this;
      $scope.pageSizeList = [10, 20, 50, 100, 200]; //设置下拉框中的数值

      //点击页码触发查询
      $scope.setCurrentPage = function(pageNum) {
        var totalPage = Math.ceil($scope.totalCount / $scope.pageSize); //总页数
        $scope.totalPage = totalPage;
        if (isNaN(pageNum) || totalPage === 0||$scope.currentPage===pageNum) {
          return;
        } else {
          if (pageNum <= 0 || pageNum > totalPage) {
            $scope.pageno = $scope.currentPage;
            return;
          } else {
            $scope.goPage({
              'currentPage': pageNum,
              'pageSize': $scope.pageSize
            });
            if ($scope.pageno !== pageNum) {
              $scope.pageno = pageNum;
            }
          }
        }
      };

      //切换每页条数触发查询
      $scope.changePageSize = function(){
        $scope.totalPage = Math.ceil($scope.totalCount / $scope.pageSize); //总页数
        if ($scope.totalPage === 0) {
          return;
        } else {
          $scope.goPage({
            'currentPage': 1,
            'pageSize': $scope.pageSize
          });
        }
      };

      //监控总条数，然后调整展示页码
      $scope.$watch('totalCount', function() {
        $scope.totalPage = Math.ceil($scope.totalCount / $scope.pageSize); //总页数
        if ($scope.totalPage === undefined || isNaN($scope.totalPage)) {
          $scope.totalPage = 1;
        }
        _this.setBtn($scope.totalPage,$scope.currentPage);
      });

      //监控每页显示条数，然后调整展示页码
      $scope.$watch('pageSize', function() {
        $scope.totalPage = Math.ceil($scope.totalCount / $scope.pageSize); //总页数
        _this.setBtn($scope.totalPage,1);
      });

      //监控当前页，然后调整展示页码
      $scope.$watch('currentPage', function() {
        $scope.pageno = $scope.currentPage;
        $scope.totalPage = Math.ceil($scope.totalCount / $scope.pageSize); //总页数
        _this.setBtn($scope.totalPage, $scope.currentPage);
      });

      //监控跳转的页数只能为数字
      $scope.$watch('pageno', function() {
        var re = /[^\d]/g;
        if ($scope.pageno === '' || re.test($scope.pageno) || $scope.pageno <= 0) {
          $scope.pageno = '';
        }
      });
    },

    link: function(scope, element, attrs, ctrl) {
      ctrl.setBtn = function(totalPage,currentPage){
        var btnArr = [];
        if (totalPage <= 6) { //最多显示6个按钮
          for (var i = 1; i <= totalPage; i++) {
            btnArr.push(i);
          }
        } else {
          if (currentPage < 4) {
            btnArr.push(1, 2, 3, 4, '...', totalPage);
          } else if (currentPage >= 4 && currentPage < totalPage - 2) {
            btnArr.push(1, '...', currentPage - 1, currentPage, currentPage+1, '...', totalPage);
          } else {
            btnArr.push(1, '...', totalPage-3, totalPage-2, totalPage-1, totalPage);
          }
        }
        scope.pageList = btnArr;
      };
    }
  };
});
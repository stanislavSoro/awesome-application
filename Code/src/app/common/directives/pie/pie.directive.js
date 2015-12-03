//directive for the pie chart
(function(angular) {
  'use strict';

  angular
    .module('crossoverApp.commonDirectives')
    .directive('pie', pie);

  pie.$inject = [];

  function pie() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/common/directives/pie/pie.tpl.html',
      link: link,
      controller: PieCtrl,
      controllerAs: 'vm'
    };

    return directive;

    function link(scope, element, attrs) {
      
    }
  }

  PieCtrl.$inject = [];

  function PieCtrl() {
    var vm = this;
  }

})(angular);

(function(angular) {
  'use strict';
  angular
    .module('crossoverApp')
    .config(routeConfig);

  routeConfig.$inject = [
    '$stateProvider'
  ];

  function routeConfig(
    $stateProvider
  ) {
    $stateProvider
      .state('tasks', {
        url: '/',
        templateUrl: 'app/tasks/tasks.tpl.html',
        controller: 'TasksCtrl',
        controllerAs: 'vm'
      });
  }
})(angular);

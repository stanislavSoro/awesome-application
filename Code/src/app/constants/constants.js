(function(angular) {
  'use strict';

  angular
    .module('crossoverApp')
    .constant('constants', {
      taskState: {
        failed: '0',
        succeeded: '1',
        pending: '2',
        running: '3'
      }
    });
})(angular);

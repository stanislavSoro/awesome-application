/******************************************************************************************

Tasks List Service

******************************************************************************************/
(function(angular) {
  'use strict';

  angular
    .module('crossoverApp.commonServices')
    .service('tasksService', tasksService);

  tasksService.$inject = [
    '$rootScope',
    '$q',
    '$timeout',
    'constants'
  ];

  function tasksService(
    $rootScope,
    $q,
    $timeout,
    constants
  ) {
    var CONST_EVENT = 'new-data-task-';

    var api = {
      getTasks: getTasks,
      getTaskState: getTaskState,
      getTaskStateClass: getTaskStateClass,
      getIconByState: getIconByState,
      getTitleByState: getTitleByState,

      subscribeOnNewData: subscribeOnNewData,
      triggerNewDataTask: triggerNewDataTask,
      getSubscribers: getSubscribers
    },
    arrayOfSubscribersForNewData = [];

    return api;
    ////////////////////////


    //return a list of subscribers for new data. This is for server mock
    function getSubscribers() {
      return arrayOfSubscribersForNewData;
    }

    //This is for server mock
    function subscribeOnNewData(task, scope, callback) {
      arrayOfSubscribersForNewData.push(task);
      $rootScope.$on(CONST_EVENT + task.id, callback);
    }

    //This is for server mock
    function triggerNewDataTask(id, data) {
      $rootScope.$emit(CONST_EVENT + id, data);
    }
    //Returns task state
    function getTaskState(task) {
      var keys = [
          'build',
          'unitTest',
          'functionalTest'
        ],
        i,
        state;

      for (i = 0; i < keys.length; i++) {
        if (task[keys[i]].status === constants.taskState.pending) return constants.taskState.pending;
        if (task[keys[i]].status === constants.taskState.running) return constants.taskState.running;
        if (task[keys[i]].status === constants.taskState.failed) return constants.taskState.failed;
      }

      return constants.taskState.succeeded;
    }
    //Returns icon by task state
    function getIconByState(state) {
      var icons = {};
      icons[constants.taskState.pending] = 'pending';
      icons[constants.taskState.running] = 'running';
      icons[constants.taskState.failed] = 'failed';
      icons[constants.taskState.succeeded] = 'succeeded';

      return icons[state];
    }
    //Returns class by task state
    function getTaskStateClass(state) {
      if (!angular.isDefined(state)) return 'inactive-state';
      var states = {};
      states[constants.taskState.pending] = 'pending-state';
      states[constants.taskState.running] = 'running-state';
      states[constants.taskState.failed] = 'failed-state';
      states[constants.taskState.succeeded] = 'success-state';

      return states[state];
    }
    //Returns title by task state
    function getTitleByState(state) {
      var states = {};
      states[constants.taskState.pending] = 'TASK_STATE.PENDING';
      states[constants.taskState.running] = 'TASK_STATE.RUNNING';
      states[constants.taskState.failed] = 'TASK_STATE.FAILED';
      states[constants.taskState.succeeded] = 'TASK_STATE.PASSED';

      return states[state];
    }
    //Returns the list of tasks
    function getTasks() {
      var deferred = $q.defer();

      $timeout(function() {
        deferred.resolve({
          data: [{
            id: 432464,
            owner: 'JTuck',
            date: '2014-04-17T09:42:00',
            build: {
              status: constants.taskState.pending
            },
            buildTime: '2014-04-17T19:42:00'
          }, {
            id: 432463,
            owner: 'Dora',
            date: '2014-04-17T07:40:00',
            build: {
              status: constants.taskState.running,
              progress: 80
            },
            buildTime: '2014-04-17T19:42:00'
          }, {
            id: 432462,
            owner: 'Samy',
            date: '2014-04-17T06:42:00',
            build: {
              status: constants.taskState.succeeded,
              progress: 100
            },
            buildTime: '2014-04-17T19:42:00',
            unitTest: {
              status: constants.taskState.succeeded,
              progress: 100,
              result: 98
            },
            functionalTest: {
              status: constants.taskState.succeeded,
              result: 84
            }
          }, {
            id: 432461,
            owner: 'JTuck',
            date: '2014-04-17T04:28:00',
            build: {
              status: constants.taskState.failed
            },
            buildTime: '2014-04-17T19:42:00'
          }, {
            id: 432460,
            owner: 'Samy',
            date: '2014-04-17T03:14:00',
            build: {
              status: constants.taskState.succeeded,
              progress: 100
            },
            buildTime: '2014-04-17T19:42:00',
            unitTest: {
              status: constants.taskState.succeeded,
              progress: 100,
              result: 88
            },
            functionalTest: {
              status: constants.taskState.succeeded,
              result: 77
            }
          }, {
            id: 432459,
            owner: 'Dora',
            date: '2014-04-17T01:14:00',
            build: {
              status: constants.taskState.succeeded,
              progress: 100
            },
            buildTime: '2014-04-17T19:42:00',
            unitTest: {
              status: constants.taskState.failed
            }
          }]
        });
      }, 10);

      return deferred.promise;
    }
  }

})(angular);

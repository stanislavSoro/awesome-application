/******************************************************************************************

Tasks List Directive

******************************************************************************************/
(function(angular) {
  'use strict';

  angular
    .module('crossoverApp.commonDirectives')
    .directive('tasksList', tasksList);

  tasksList.$inject = [];

  function tasksList() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/common/directives/tasks-list/tasks-list.tpl.html',
      link: link,
      controller: TasksListCtrl,
      controllerAs: 'vm'
    };

    return directive;

    function link(scope, element, attrs) {}
  }

  TasksListCtrl.$inject = [
    '$interval',
    '$scope',
    'tasksService'
  ];

  function TasksListCtrl(
    $interval,
    $scope,
    tasksService
  ) {
    var vm = this,
      activeTask;

    vm.tasksList = [];

    //use small functions to get some basic data
    vm.getTaskStateClass = tasksService.getTaskStateClass;
    vm.getIconByState = tasksService.getIconByState;
    vm.getTitleByState = tasksService.getTitleByState;
    vm.showTaskInformation = showTaskInformation;
    //init of the getting the data
    activate();

    function activate() {
      tasksService
        .getTasks()
        .then(getTasksHandler);
    }

    function showTaskInformation(task) {
      if (activeTask) activeTask.showInformation = false;
      if (activeTask == task) {
        activeTask = undefined;
        return;
      }
      activeTask = task;
      activeTask.showInformation = true;
    }

    /***************************************/
    //This part is 'mock' of server job to test all functionality
    /***************************************/

    var buildInterval,
      unitTestInterval,
      functionalTestInterval;

    vm.buildTask = buildTask;
    vm.failTask = failTask;
    vm.doUnitTest = doUnitTest;
    vm.failUnitTest = failUnitTest;
    vm.passFunctionalTest = passFunctionalTest;
    vm.failFunctionalTest = failFunctionalTest;

    function getTasksHandler(response) {
      var data = response.data,
        i;

      for (i = 0; i < data.length; i++) {
        data[i].state = tasksService.getTaskState(data[i]);
        checkOnWaitingData(data[i]);
      }

      vm.waitingRequests = tasksService.getSubscribers();
      vm.tasksList = data;
    }

    function eventHandler(task) {
      return function(event, data) {
        for (var key in data) {
          task[key] = data[key];
        }


      };
    }

    function checkOnWaitingData(task) {
      if (task.state == 2 || task.state == 3) {
        tasksService.subscribeOnNewData(task, $scope, eventHandler(task));
      }
    }

    function buildTask(task) {
      var id = task.id;

      var progress = task.build.progress || 0;

      buildInterval = $interval(function() {
        if (progress == 100) {
          tasksService.triggerNewDataTask(id, {
            state: 2,
            build: {
              status: 1,
              progress: progress
            },
            unitTest: {
              status: 2
            }
          });
          $interval.cancel(buildInterval);
          return;
        }

        tasksService.triggerNewDataTask(id, {
          state: 3,
          build: {
            status: 3,
            progress: progress
          }
        });

        progress++;
      }, 100);
    }

    function failTask(unit) {
      $interval.cancel(buildInterval);
      var id = unit.id;
      tasksService.triggerNewDataTask(id, {
        state: '0',
        build: {
          status: '0'
        }
      });
    }

    function doUnitTest(task) {
      var id = task.id,
        progress = task.unitTest.progress || 0;

      unitTestInterval = $interval(function() {
        if (progress == 100) {
          tasksService.triggerNewDataTask(id, {
            state: 2,
            unitTest: {
              status: 1,
              progress: progress
            },
            functionalTest: {
              status: 2
            }
          });
          $interval.cancel(unitTestInterval);
          return;
        }

        tasksService.triggerNewDataTask(id, {
          state: 3,
          unitTest: {
            status: 3,
            progress: progress
          }
        });

        progress++;
      }, 100);
    }

    function failUnitTest(unit) {
      $interval.cancel(unitTestInterval);
      var id = unit.id;
      tasksService.triggerNewDataTask(id, {
        state: '0',
        unitTest: {
          status: '0'
        }
      });
    }

    function passFunctionalTest(task) {
      var id = task.id,
        progress = task.unitTest.progress || 0;

      functionalTestInterval = $interval(function() {
        if (progress == 100) {
          tasksService.triggerNewDataTask(id, {
            state: 1,
            functionalTest: {
              status: 1,
              progress: progress
            }
          });
          $interval.cancel(functionalTestInterval);
          return;
        }

        tasksService.triggerNewDataTask(id, {
          state: 3,
          functionalTest: {
            status: 3,
            progress: progress
          }
        });

        progress++;
      }, 50);
    }

    function failFunctionalTest(task) {
      var id = task.id;
      $interval.cancel(functionalTestInterval);
      tasksService.triggerNewDataTask(id, {
        state: '0',
        functionalTest: {
          status: '0'
        }
      });
    }
  }


})(angular);

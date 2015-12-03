(function() {
  'use strict';

  angular
    .module('crossoverApp')
    .config(appConfig);

  appConfig.$inject = [
    '$stateProvider',
    '$locationProvider',
    '$translateProvider'
  ];

  function appConfig(
    $stateProvider,
    $locationProvider,
    $translateProvider
  ) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    $translateProvider.useStaticFilesLoader({
      prefix: '/assets/i18n/',
      suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
    $translateProvider.useLocalStorage();
    $translateProvider.useSanitizeValueStrategy(null);
  }
})();

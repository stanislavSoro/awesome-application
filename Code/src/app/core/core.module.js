(function(angular){
	'use strict';

	angular
		.module('crossoverApp.core', [
			'ngCookies',
			'ui.router',
			'LocalStorageModule',
			'pascalprecht.translate',
      'templates-main',
      'ngAnimate',

      'crossoverApp.commonDirectives',
      'crossoverApp.commonServices'
		]);
})(angular);
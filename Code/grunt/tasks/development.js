module.exports = function(grunt) {
  'use strict';

  grunt.registerTask('dev-build', function(projectName) {
    grunt.task.run(
      'clean',
      'copy:development',
      'jade:development',
      'injector',
      'html2js',
      'compass:development'
    );
  });

  grunt.registerTask('development', function(projectName) {
    grunt.task.run(
      'clean',
      'copy:development',
      'jade:development',
      'injector',
      'html2js',
      'sass:development',
      'connect',
      'open:build',
      'watch'
    );
  });
};

module.exports = function(grunt) {
  'use strict';

  grunt.registerTask('prod', function(projectName) {
    grunt.task.run(
      'jshint',
      'clean',
      'copy:production',
      'jade:production',
      'less:production',
      'html2js',
      'bower_concat',
      'concat',
      'replace',
      //'clean:temp',
      'compress',
      'json_generator:clean'
      //    'uglify',
      //     'json-minify',
    );
  });

  grunt.registerTask('prod-local', function(projectName) {
    grunt.task.run(
      'prod',
      'connect',
      'open:build',
      'watch'
    );
  });
};

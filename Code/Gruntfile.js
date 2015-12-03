module.exports = function(grunt) {
  'use strict';

  var CSS_FILE = '.css',
    JS_FILE = '.js',
    NOT_FOUND = -1;

  var uuid = require('node-uuid'),
    sourceDir = 'src';

  var destDir = 'dist';
  var liveReloadPort = 35729;
  var uniqueId = uuid.v4();
  var path = require('path');

  var jadeFiles = [{
      cwd: sourceDir,
      src: 'index.jade',
      dest: destDir,
      expand: true,
      flatten: true,
      ext: '.html'
    }],
    defaultCopyFiles = [{
      expand: true,
      cwd: sourceDir,
      src: ['assets/images/**'],
      dest: destDir
    }, {
      expand: true,
      cwd: sourceDir,
      src: ['assets/i18n/**'],
      dest: destDir
    }, {
      expand: true,
      cwd: sourceDir,
      flatten: true,
      src: [
        'assets/vendors/font-awesome/fonts/*',
      ],
      dest: destDir + '/fonts'
    }],
    developmentCopyFiles = defaultCopyFiles.concat({
      expand: true,
      cwd: sourceDir,
      src: [
        'app/**/*.js',
        'assets/vendors/**/*.*'
      ],
      dest: destDir
    });


  require('load-grunt-config')(grunt, {
    configPath: path.join(process.cwd(), 'grunt/config'),
    jitGrunt: {
      customTasksDir: 'grunt/tasks'
    },
    data: {
      foo: 'bar', // accessible with '<%= foo %>',
      jadeFiles: jadeFiles,
      destDir: destDir,
      defaultCopyFiles: defaultCopyFiles,
      developmentCopyFiles: developmentCopyFiles,
      uniqueId: uniqueId,
      liveReloadPort: liveReloadPort
    }
  });
};

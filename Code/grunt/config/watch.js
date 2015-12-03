// grunt/config/watch.js

module.exports = {
  css: {
    files: 'src/assets/stylesheets/**/*.scss',
    tasks: ['compass:development'],
    options: {
      livereload: '<%= liveReloadPort %>'
    }
  },
  index: {
    files: 'src/index.jade',
    tasks: ['jade:development', 'injector'],
    options: {
      livereload: '<%= liveReloadPort %>'
    }
  },
  tpl: {
    files: ['src/app/**/*.jade'],
    tasks: ['html2js'],
    options: {
      livereload: '<%= liveReloadPort %>'
    }
  },
  js: {
    files: 'src/app/**/*.js',
    tasks: ['copy', 'injector'],
    options: {
      livereload: '<%= liveReloadPort %>'
    }
  },
  static: {
    files: ['src/assets/**/images/**', 'src/assets/**/fonts/**', 'src/assets/**/i18n/**'],
    tasks: ['copy', 'injector'],
    options: {
      livereload: '<%= liveReloadPort %>'
    }
  }
};

module.exports = {
  main: {
    options: {
      rename: function(moduleName) {
        return moduleName.replace('.jade', '.html');
      }
    },
    src: 'src/app/**/*.jade',
    dest: '<%= destDir %>' + '/tmp/templates.js'
  }
};

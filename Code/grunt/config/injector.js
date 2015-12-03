// grunt/config/injector.js

module.exports = {
  options: {
    template: 'dist/index.html',
    ignorePath: ['src', 'source']
  },
  localDependencies: {
    options: {
      transform: function(filepath, index) {
        return ('<script type="text/javascript" src="' + filepath + '?' + '<%= uniqueId %>' + '"></script>');
      }
    },
    files: {
      'dist/index.html': [
        'src/app/**/*.module.js',
        'src/app/**/*.js'
      ]
    }
  },
  bowerWithPrefix: {
    options: {
      bowerPrefix: 'bower:'
    },
    files: {
      'dist/index.html': ['bower.json']
    }
  }
};

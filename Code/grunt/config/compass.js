module.exports = {
  development: {
    options: {
      sassDir: 'src/assets/stylesheets',
      cssDir: 'dist/stylesheets',
      environment: 'development'
    }
  },
  production: {
    options: {
      compress: true,
      require: 'susy'
    }
  }
};

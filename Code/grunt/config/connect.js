module.exports = {
  test: {
    options: {
      port: 9000,
      base: 'dist/',
      middleware: function(connect, options, middlewares) {
        var modRewrite = require('connect-modrewrite');

        // enable Angular's HTML5 mode
        middlewares.unshift(modRewrite(['!\\.html|\\.js|\\.gif|\\.svg|\\.css|\\.png|\\.otf(.*)|\\.woff(.*)|\\.woff2(.*)|\\.ttf(.*)$ /index.html [L]']));

        return middlewares;
      }
    }
  }
};

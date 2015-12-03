module.exports = {
  development: {
    options: {
      pretty: true,
      data: {
        uniqueId: '<%= uniqueId %>',
        liveReloadPort: '<%= liveReloadPort %>',
        isDevMode: true
      }
    },
    files: '<%= jadeFiles %>'
  },
  production: {
    options: {
      pretty: false,
      data: {
        uniqueId: '<%= uniqueId %>'
      }
    },
    files: '<%= jadeFiles %>'
  }
};

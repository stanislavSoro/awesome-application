module.exports = {
  development: {
    // Takes every file that ends with .scss from the scss 
    // directory and compile them into the css directory. 
    // Also changes the extension from .scss into .css. 
    // Note: file name that begins with _ are ignored automatically
    files: [{
      expand: true,
      cwd: 'src/assets/stylesheets',
      src: ['*.scss', '_*.scss'],
      dest: 'dist/stylesheets',
      ext: '.css'
    }]
  },
  options: {
    sourceMap: true,
    expand: true,
    outputStyle: 'nested',
    imagePath: "../",
    require: ['susy', 'bourbon']
  }
};

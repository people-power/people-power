'use strict';
module.exports = {
  css: {
    files: ['./browser/sass/*.scss', './browser/css/main.css'],
    tasks: ['sass', 'cssmin'],
    options: {
      livereload: true,
    }
  },
  scripts: {
    files: ['js/*.js'],
    tasks: ['jshint']
  }
}
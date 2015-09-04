'use strict';
module.exports = {  
  cssmin: {
    files: {
      './browser/css/build.min.css':[ './browser/css/vendor/reset.css',
                                      './browser/css/vendor/normalize.css', 
                                      './browser/css/vendor/grid.css', 
                                      './browser/css/vendor/skeleton.css', 
                                      './browser/css/main.css' ]
    }
  }
}  
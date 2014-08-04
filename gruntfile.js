
module.exports = function(grunt) {

  'use strict';
 

  // Load Grunt tasks automatically ---------------------------------

  require('load-grunt-tasks')(grunt, { scope: 'devDependencies' });


  grunt.initConfig({

    // Tasks Configurations -----------------------------------------

    //Lint ------------------------------------------

    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },

      all: {
        src: [ 'gruntfile.js', 'app/js/**/*.js' ] 
      }

    }, 

    // Minify js ------------------------------------

    uglify: {
        
      all: { 
        options: {
          beautify: true,
          mangle: false,
          compress: false

        },
        files: {
          'dist/js/script.min.js' : ['app/js/**/*.js']
        } 
      }
    }, 

    // Styling --------------------------------------

    compass: {

      dev: {
        options:{
          config: 'config.rb',
          force: true
        }

      }
    }, 

    // Watch ----------------------------------------

    watch: {
      scripts: {
        files: [ 'gruntfile.js', 'app/js/**/*.js' ] ,
        tasks: ['newer:jshint:all','newer:uglify:all']
      }, 

      sass: {
        files: 'app/sass/**/*.scss',
        tasks: ['compass:dev']
      }, 

      livereload: {
        options: { livereload: true },
        files: [ '*.html' , 'dist/css/**/*.css', 'dist/js/script.min.js', 'dist/img/**']
      } 

    } 
    
  }); 


  // Define tasks...
  grunt.registerTask('default', 'watch'); // default grunt command


}; 


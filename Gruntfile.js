module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      build: {
        src: 'styles/main.css',
        dest: 'styles/main.min.css'
      }
    },

    concat: {
      options: {
         separator: '\n/*next file*/\n\n'  //this will be put between conc. files
      },
      dist: {
        src: ['scripts/jsonparser.js', 'scripts/carousel.js'],
        dest: 'scripts/main.js'
      }
    },

    uglify: {
      build: {
        files: {
          'scripts/main.min.js': ['scripts/main.js']
        }
      }
    },

    sass: {
      dev: { // use during development
        options: {
          style: 'expanded'
        },
        files: {
          // destination     // source file
          "styles/main.css": "styles/main.scss"
        }
      }
    }
    //,
    //watch: {
    //  sass: {
    //    files: "**/*.scss",
    //    tasks: ['sass']  
    //  }
    // }
  });

  // Load the sass plugin to convert scss to css
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['sass', 'concat']);
};
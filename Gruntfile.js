/*
 * grunt-css-image
 * https://github.com/lexich/grunt-css-image
 *
 * Copyright (c) 2013 Efremov ALexey (lexich)
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    css_image: {
      custom_options: {
        options: {
          prefix:"custom-",
          root: "http://example.com",
          separator:"--",
        },
        files:[{
          cwd:"test/fixtures/images/",
          src: "**/*.{png,jpg,gif,jpeg}",
          dest: "tmp/_custom.css"
        }]
      },
      null_options:{
        files:[{
          cwd:"test/fixtures/nullimages/",
          src: "**/*.{png,jpg,gif,jpeg}",
          dest: "tmp/_nullimages.css"
        }]
      },
      retina_options: {
        options: {
          css: false,
          scss: true,
          retina: true,
          prefix:"custom-",
          separator: ""
        },
        files:[{
          cwd:"test/fixtures/images/",
          src: "**/*.{png,jpg,gif,jpeg}",
          dest: "tmp/_retina.scss"
        }]
      },
      full_options: {
        options: {
          css: true,
          scss: true,
          retina: true,
          squeeze: 2,
          prefix:"custom-",
          separator: "-"
        },
        files:[{
          cwd:"test/fixtures/images/",
          src: "**/*.{png,jpg,gif,jpeg}",
          dest: "tmp/_full.scss"
        }]
      }

    },

    // Unit tests.
    mochaTest: {
      test: {
      	reporter: "spec"
      },
      src: ['test/*_spec.coffee'],
    },
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha-test');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', [
    'clean',
    'css_image',
    'mochaTest']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};

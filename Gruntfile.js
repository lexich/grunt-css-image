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
        '<%= nodeunit.tests %>',
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
          images_path: "http://example.com",
          sep:"",
          css_options:{
            z_index:0,
            display:"block",
            text_indent:"-5000px",
            background_color:"red",
            background_position:"0px 0px",
          },
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
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', [
    'clean', 
    'css_image:custom_options',
    'css_image:null_options', 
    'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};

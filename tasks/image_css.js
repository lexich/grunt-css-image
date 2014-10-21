/*
 * grunt-css-image
 * https://github.com/lexich/grunt-css-image
 *
 * Copyright (c) 2013 Efremov ALexey (lexich)
 * Licensed under the MIT license.
*/
"use strict";
var imagesize = require("imagesize"),
    fs = require("fs"),
    libpath = require("path"),
    _ = require("lodash"),
    cssimage = require("css-image");

module.exports = function(grunt){
  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks
  grunt.registerMultiTask("css_image", "Plugin to generate css file wto bind all images from folder", function(){
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({ css: true, scss: false, retina: false,
      squeeze: 1, root: "", separator: "_", prefix: "img_" });
    var info = [];
    var done = this.async();
    var counts = grunt.util._.reduce(this.files, function(memo, item){
        return memo + grunt.util._.size(item.src);
    }, 0);

    var default_dest = this.files[0] ? this.files[0].dest : null;

    var complete = grunt.util._.after(counts, function(err, opts){
      if(!opts){ opts = {}; }
      var dest = opts.dest || default_dest;
      var info = _.sortBy(opts.info, function(item){ return item.file; });

      var txt = "/* This file is generated */\n";
      txt += cssimage(info, options);
      grunt.file.write(dest, txt);
      grunt.log.writeln("File \"" + dest + "\" created.");
      done();
    });

    this.files.forEach( function(f){
      f.src.forEach( function(itempath){
        var src = libpath.join(f.cwd, itempath);
        fs.readFile(src, function(err, data){
          var parser = imagesize.Parser();
          var retStatus = parser.parse(data);
          if(imagesize.Parser.DONE === retStatus){
            var result = parser.getResult();
            result.file = itempath;
            info.push(result);
          }
          complete(null, {info: info, dest: f.dest });
        });
      });
    });
  });
};

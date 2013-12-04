/*
 * grunt-css-image
 * https://github.com/lexich/grunt-css-image
 *
 * Copyright (c) 2013 Efremov ALexey (lexich)
 * Licensed under the MIT license.
 */

'use strict';

var imagesize = require("imagesize");
var fs = require("fs");
var path = require("path");

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('css_image', 'Plugin to generate css file wto bind all images from folder', function() {
    var _ = grunt.util._

    var getName = function(item){
      return item.filename.replace(/\.(png|jpg|jpeg|gif)/,"");
    };

    var getCssClass = function(prefix, width, height, images_path, folder, name, ext){
      return "." +
      prefix + name + "{\n" +
      "  background: transparent url(\"" + images_path + "/" + folder + "/" + name  + ext + "\") 0 0 no-repeat ;\n" +
      "  width: "+  width + "px;\n" +
      "  height: " + height + "px;\n" +
      "  text-indent: -5000px;\n" +
      "  display: block;\n" +
      "  z-index: 0;\n}\n\n";
    }

    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      prefix:"img_",
      images_path:"../images"
    });

    var parser = imagesize.Parser();
    var info = [];
    var done = this.async();
    var counts = grunt.util._.reduce(this.files, function(memo,item){
      return memo + grunt.util._.size(item.src);
    },0);
    var complete = grunt.util._.after(counts,function(err,opts){
      var info = opts.info;
      var dest = opts.dest;
      var txt = "/* This file is generated */\n";
      info.forEach(function(item){
        var name = getName(item);
        txt += getCssClass(options.prefix, item.width, item.height, options.images_path, item.folder, getName(item), item.ext)
      });
      grunt.file.write(dest, txt);
      grunt.log.writeln('File "' + dest + '" created.');
      done();
    });
    this.files.forEach(function(f){
      f.src.forEach(function(itempath){
        var src = path.join(f.cwd, itempath);
        fs.readFile(src, function(err,data){
          var retStatus = parser.parse(data);
          if(imagesize.Parser.DONE == retStatus){
            var result = parser.getResult();
            result.filename = path.basename(src);
            result.ext = path.extname(src);
            result.folder = path.dirname(itempath);

            info.push(result);
          }
          complete(null, {info:info,dest:f.dest});
        })
      });
    });
  });
};

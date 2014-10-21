#
# * grunt-css-image
# * https://github.com/lexich/grunt-css-image
# *
# * Copyright (c) 2013 Efremov ALexey (lexich)
# * Licensed under the MIT license.
#
"use strict"
imagesize = require("imagesize")
fs = require("fs")
libpath = require("path")
_ = require "lodash"
cssimage = require "css-image"
module.exports = (grunt) ->

  # Please see the Grunt documentation for more information regarding task
  # creation: http://gruntjs.com/creating-tasks
  grunt.registerMultiTask "css_image", "Plugin to generate css file wto bind all images from folder", ->
    # Merge task-specific and/or target-specific options with these defaults.
    options = @options(
      css: true
      scss: false
      retina: false
      squeeze: 1
      root: ""
      separator: "_"
      prefix: "img_"
    )
    info = []
    done = @async()
    counts = grunt.util._.reduce(@files, (memo, item) ->
        memo + grunt.util._.size(item.src)
    , 0)
    default_dest = @files[0]?.dest

    complete = grunt.util._.after(counts, (err, opts = {}) ->
      dest = opts.dest or default_dest
      info = _.sortBy opts.info, (item)-> item.file

      txt = "/* This file is generated */\n"
      txt += cssimage info, options
      grunt.file.write dest, txt
      grunt.log.writeln "File \"" + dest + "\" created."
      done()
    )
    @files.forEach (f) ->
      f.src.forEach (itempath) ->
        src = libpath.join(f.cwd, itempath)
        fs.readFile src, (err, data) ->
          parser = imagesize.Parser()
          retStatus = parser.parse(data)
          if imagesize.Parser.DONE is retStatus
            result = parser.getResult()
            result.file = itempath
            info.push result
          complete null,
            info: info
            dest: f.dest

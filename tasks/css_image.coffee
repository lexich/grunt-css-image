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
path = require("path")
module.exports = (grunt) ->
  
  # Please see the Grunt documentation for more information regarding task
  # creation: http://gruntjs.com/creating-tasks
  grunt.registerMultiTask "css_image", "Plugin to generate css file wto bind all images from folder", ->
    _ = grunt.util._
    getName = (item) ->
      item.filename.replace /\.(png|jpg|jpeg|gif)/, ""

    getCssClass = (options) ->
      {prefix, width, height, images_path, folder, name, ext, css_options} = options
      className = name.replace(".", "")
      folderName = folder.replace("/", "_").replace(".","")
      txt = "";
      css_options = {} unless css_options?
      z_index = if css_options.z_index? then "\n  z-index: #{css_options.z_index};" else ""
      display = if css_options.display? then "\n  display: #{css_options.display};" else ""
      text_indent = if css_options.text_indent? then "\n  text-indent: #{css_options.text_indent};" else ""

      background_color = if css_options.background_color? then "#{css_options.background_color}" else "transparent"
      background_position = if css_options.background_position? then "#{css_options.background_position}" else "0 0"
      path = "#{images_path}/#{folder}/#{name}#{ext}".replace(/\/.\//g,"\/")
      css_class_name = "#{prefix}#{folderName}_#{className}"
      background = "background: #{background_color} url(\"#{path}\") #{background_position} no-repeat;"
      """\n.#{css_class_name}{
        #{background}
        width: #{width}px;
        height: #{height}px; #{z_index} #{text_indent} #{display}
      }"""

    
    # Merge task-specific and/or target-specific options with these defaults.
    options = @options(
      prefix: "img_"
      images_path: "../images"
      css_options:{}
    )
    info = []
    done = @async()
    counts = grunt.util._.reduce(@files, (memo, item) -> 
        memo + grunt.util._.size(item.src)
    , 0)
    complete = grunt.util._.after(counts, (err, opts) ->
      dest = opts.dest
      info = _.sortBy opts.info, (item)->
        item.filename

      txt = "/* This file is generated */\n"
      info.forEach (item) ->     
        folder = item.folder   
        txt += getCssClass
          prefix:options.prefix
          width:item.width
          height:item.height
          images_path:options.images_path
          folder:folder
          name:getName(item)
          ext:item.ext
          css_options:options.css_options

      grunt.file.write dest, txt
      grunt.log.writeln "File \"" + dest + "\" created."
      done()
    )
    @files.forEach (f) ->
      f.src.forEach (itempath) ->
        src = path.join(f.cwd, itempath)
        fs.readFile src, (err, data) ->
          parser = imagesize.Parser()
          retStatus = parser.parse(data)
          if imagesize.Parser.DONE is retStatus
            result = parser.getResult()
            result.filename = path.basename(src)
            result.ext = path.extname(src)
            result.folder = path.dirname(itempath)
            info.push result
          complete null,
            info: info
            dest: f.dest

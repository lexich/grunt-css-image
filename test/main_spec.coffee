should = require "should"
grunt = require "grunt"
libpath = require "path"

describe "test grunt-css-image", ->
  custom = grunt.file.read libpath.join(
    __dirname, "expected", "_custom.css"
  )
  full = grunt.file.read libpath.join(
    __dirname, "expected", "_full.scss"
  )
  nullimages = grunt.file.read libpath.join(
    __dirname, "expected", "_nullimages.css"
  )
  retina = grunt.file.read libpath.join(
    __dirname, "expected", "_retina.scss"
  )

  it "check custom", ->
    custom.should.be.eql grunt.file.read('tmp/_custom.css')

  it "check full", ->
    full.should.be.eql grunt.file.read('tmp/_full.scss')

  it "check nullimages", ->
    nullimages.should.be.eql grunt.file.read('tmp/_nullimages.css')

  it "check retina", ->
    retina.should.be.eql grunt.file.read('tmp/_retina.scss')

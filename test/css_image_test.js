'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.css_image = {
  setUp: function(done) {
    // setup here if necessary
    this.actual = grunt.file.read('tmp/_custom.css');    
    done();
  },
  check_classnames:function(test){
    var actual = this.actual;
    test.ok(actual.indexOf(".custom-2") > 0);
    test.ok(actual.indexOf(".custom-cat20090508_025_amazing") > 0);
    test.ok(actual.indexOf(".custom-7151") > 0);
    test.ok(actual.indexOf(".custom-thumbkoshki3912") > 0);
    test.done();
  },
  check_styles: function(test) {        
    var actual = this.actual;
    test.ok(actual.indexOf("background") > 0);
    test.ok(actual.indexOf("background: red") > 0);
    test.ok(actual.indexOf("width:") > 0);
    test.ok(actual.indexOf("height:") > 0);
    test.ok(actual.indexOf("z-index: 0;") > 0);
    test.ok(actual.indexOf("text-indent: -5000px;") > 0);
    test.ok(actual.indexOf("display: block;") > 0);
    test.ok(actual.indexOf("http://example.com/") > 0);
    test.ok(actual.indexOf('background: red url("http://example.com/2.png") 0px 0px no-repeat;') > 0);
    test.done();
  },
  check_nullconfig:function(test){
    var nullimages = grunt.file.read("tmp/_nullimages.css");
    test.equal(nullimages,"/* This file is generated */\n","file isn't null or bad formed");
    test.done();
  }
};

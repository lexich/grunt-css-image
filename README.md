# grunt-css-image

> Plugin to generate css file wto bind all images from folder

[![Build Status](https://travis-ci.org/lexich/grunt-css-image.svg?branch=master)](https://travis-ci.org/lexich/grunt-css-image)
[![NPM version](https://badge.fury.io/js/grunt-css-image.svg)](http://badge.fury.io/js/grunt-css-image)

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-css-image --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-css-image');
```

## The "css_image" task

### Overview
In your project's Gruntfile, add a section named `css_image` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  css_image: {
    dist:{
      files:[{
        cwd:"app/images/"
        src: "**/*.{png,jpg,gif,jpeg}"
        dest: "app/styles/_img.css"
      }]
      options:{
        css: true, 
        scss: false, 
        retina: false,
        squeeze: 1, 
        root: "", 
        separator: "_", 
        prefix: "img_"
      }
    }
  },
});
```

### Options
grunt-css-image is grunt plugin and use [css-image](https://github.com/lexich/css-image) module functionality. Full description of option's configuration read [css-image](https://github.com/lexich/css-image#options)

###Default options:
- css: true
- scss: false
- retina: false,
- squeeze: 1
- root: ""
- separator: "_"
- prefix: "img_"

### Usage Examples

#### Default Options
In this example task search all images from "app/images/" according mask "**/*.{png,jpg,gif,jpeg}" and write css file in "app/styles/img.css"
with css prefix "_img" and path to image folder "../images"

```js
grunt.initConfig({
  css_image: {
    dist:{
      files:[{
        cwd:"app/images/"
        src: "**/*.{png,jpg,gif,jpeg}"
        dest: "app/styles/img.css"
      }],
      options: {}
    }
  },
});
```
#### Sample resulting css
```css
/* This file is generated */
.img_cat{
  width: 400px;
  height: 300px;
  background-image: url(cat.png);
  background-size: 400px 300px;
}
```

#### Custom Options: generate scss

```js
grunt.initConfig({
  css_image: {
    dist:{
      files:[{
        cwd:"app/images/"
        src: "**/*.{png,jpg,gif,jpeg}"
        dest: "app/styles/img.css"
      }],
      options: {
        css: false,
        scss: true
      }
    }
  },
});
```
#### Sample resulting scss
```scss
/* This file is generated */
@mixin img_cat(){
  width: 400px;
  height: 300px;
  background-image: url(cat.png);
  background-size: 400px 300px;
}
img_cat__width: 400px;
img_cat__height: 300px;
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.3.0 - migrate to [css-image](https://github.com/lexich/css-image) module
0.2.6 - implementation self functionality

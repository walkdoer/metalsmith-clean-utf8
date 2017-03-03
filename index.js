var extname = require('path').extname;
var debug = require('debug')('clean-utf8');

/**
 * Expose `plugin`.
 */

module.exports = plugin;

/**
 * Metalsmith plugin to clean utf8
 *
 * @return {Function}
 */

function plugin(options){
  options = options || {};

  return function(files, metalsmith, done){
    Object.keys(files).forEach(function(file){
      debug('checking file: %s', file);
      console.log(file);
      if (!markdown(file)) return;
      var data = files[file];
      var str = data.contents.toString();
      str = str.replace(/[\x00-\x09\x0B-\x0C\x0E-\x1F\x7F-\x9F]/ug, '');
      data.contents = new Buffer(str);
      
      done();
    });
  };
}

/**
 * Check if a `file` is markdown.
 *
 * @param {String} file
 * @return {Boolean}
 */

function markdown(file){
  return /\.md|\.markdown/.test(extname(file));
}
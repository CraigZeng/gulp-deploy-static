module.exports = function(options) {
  var through = require('through2');
  var gutil = require('gulp-util');
  var deploy = require('./lib/deploy.js');

  return through.obj(function(file, enc, callback) {
    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-deploy-static', 'Streams are not supported!'));
      callback();
    }
    else if (file.isNull())
      callback(null, file); // Do nothing if no contents
    else {
      try {
        var content = deploy(file, options, callback);
        file.contents = new Buffer(content);
        this.push(file);
        callback(null, file);
      } catch(e) {
        this.emit('error', e);
        callback();
      }
    }
  });
};

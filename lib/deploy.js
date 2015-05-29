var path = require('path');

module.exports = exports = function (file, options) {

    var jsReg = /<\s*script\s+.*?src\s*=\s*("|')([^"']+?)\1.*?><\s*\/\s*script\s*>/gi;
    var cssReg = /<\s*link\s+.*?href\s*=\s*("|')([^"']+)\1.*?>/gi;
    var imgReg = /<\s*img\s+.*?src\s*=\s*("|')([^"']+?)\1.*?\/>/gi;

    var hrefReg = /href=("|')([^"']*)\1/g;
    var srcReg = /src=("|')([^"']*)\1/g;

    var content = new String(file.contents).toString();

    if (path.extname(file.path) == '.html') {
        if (options.all || options.css) {
            content = content.replace(cssReg, function (str) {
                return str.replace(hrefReg, function(href, sp, path, index) {
                    return 'href="' + (options.all ? options.all(path) : options.css(path)) + '"';
                });
            });
        }
        if (options.all || options.js) {
            content = content.replace(jsReg, function (str) {
                return str.replace(srcReg, function(src, sp, path, index) {
                    return 'src="' + (options.all ? options.all(path) : options.js(path)) + '"';
                });
            });
        }
        if (options.img) {
            content = content.replace(imgReg, function (str) {
                return str.replace(srcReg, function(src, sp, path, index) {
                    return 'src="' + options.img(path) + '"';
                });
            });
        }
    }

    return content;
}
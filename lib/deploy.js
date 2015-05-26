var path = require('path');

module.exports = exports = function (file, options) {

    var jsReg = /<\s*script\s+.*?src\s*=\s*("|')([^"']+?)\1.*?><\s*\/\s*script\s*>/gi;
    var cssReg = /<\s*link\s+.*?href\s*=\s*("|')([^"']+)\1.*?>/gi;

    var hrefReg = /href="([^"]*)"/g;
    var srcReg = /src="([^"]*)"/g;

    var content = new String(file.contents);

    if (path.extname(file.path) == '.html') {
        if (options.all || options.css) {
            content = content.replace(cssReg, function (str, start) {
                return str.replace(hrefReg, function(href, path, index) {
                    return 'href="' + (options.all ? options.all(path) : options.css(path)) + '"';
                });
            });
        }
        if (options.all || options.js) {
            content = content.replace(jsReg, function (str, start) {
                return str.replace(srcReg, function(src, path, index) {
                    return 'src="' + (options.all ? options.all(path) : options.js(path)) + '"';
                });
            });
        }
    }

    return content;
}
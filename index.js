var _ = require('underscore');

module.exports = function() {
	var loaderUtils = require('loader-utils');
	var path = require('path');
	var fs = require('fs');
	var includeRegex = /<!--include\s+([\/\w\.]*?[\w]+\.[\w]+)-->/g;
	var templateSettings = {
		evaluate    : /\{\{#([\s\S]+?)\}\}/g,
		escape      : /\{\{([^#^=][\s\S]+?)\}\}/g,
		interpolate : /\{\{=([\s\S]+?)\}\}/g,
	};

	var readFile = function(filepath, root) {
		var self = readFile;
		self.buffer = self.buffer || {};

		if (filepath in self.buffer)
			return self.buffer[filepath];

		var content = readContent(fs.readFileSync(path.join(root, filepath), 'utf8'), root);
		self.buffer[filepath] = content;
		return self.buffer[filepath];
	};

	var readContent = function(content, root) {
		var matches = includeRegex.exec(content);

		while (matches != null) {
			var file = loaderUtils.urlToRequest(matches[1]);
			var rawContent = readFile(path.basename(file), path.join(root, path.dirname(file)));
			content = content.replace(matches[0], rawContent);
			matches = includeRegex.exec(content);
		}

		return content;
	};

	return function(content) {
		this.cacheable && this.cacheable();
		var callback = this.async();
		content = readContent(content, this.context);
		var fn = _.template(content, templateSettings);
		callback(null, "module.exports = " + fn.source + ";");
	};
}();

module.exports._ = _;

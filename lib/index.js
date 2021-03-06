console.warn('WARNING This is a pre-production version. Breaking changes may occur');

exports = module.exports = brokerage;

const assert = require('assert');
var methods = require('./methods');

function brokerage(providerName, token) {
	return require('./providers/' + providerName)(token);

	// TODO: do I really need method mapping? Pros: enforces the provider interface (which I could do with a provider builder module). Cons: less robust
	// Leave it disabled for now, determine if needed later

	/*this.provider = require('./providers/' + providerName)(token);
	addMethods(this.provider, brokerage.prototype, methods);

	// TODO only need to have top level methods, unless this is becoming an object-oriented module. Eventually decide if I should simply below code or not
	function addMethods(from, to, methods, path) {
		if (!path) path = '';
		methods.forEach(function (method) {
			if (typeof method == 'string') {
				assert(typeof from[method] !== 'undefined', 'Failed to map ' + path + ((!path == '') ? '.' : '') + method + ' method of ' + providerName);
				to[method] = from[method];
			} else if (typeof method == 'object') {
				assert(typeof from[method.root] !== 'undefined', 'Failed to map ' + path + ((!path == '') ? '.' : '') + method.root + ' method of ' + providerName);
				to[method.root] = {};
				addMethods(from[method.root], to[method.root], method.children, path + ((!path == '') ? '.' : '') + method.root);
			}
		});
	}*/
};
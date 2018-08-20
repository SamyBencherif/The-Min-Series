const path = require('path');

module.exports = {
	entry: './js/manager.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'entry.bundle.js'
	}
};
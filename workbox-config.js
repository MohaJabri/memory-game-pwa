module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{png,json,js}'
	],
	swDest: 'public/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};
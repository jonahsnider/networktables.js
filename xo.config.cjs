const base = require('@jonahsnider/xo-config');

const config = {...base};

config.overrides.push({
	files: 'src/text/messages/params/*.ts',
	rules: {
		'unicorn/prevent-abbreviations': [
			'error',
			{
				allowList: {
					Params: true,
				},
			},
		],
	},
});

module.exports = config;

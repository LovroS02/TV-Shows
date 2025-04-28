module.exports = {
	async redirects() {
		return [
			// Basic redirect
			{
				source: '/',
				destination: '/all-shows',
				permanent: false,
			},
		];
	},
};

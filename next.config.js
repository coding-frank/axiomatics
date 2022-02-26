const nextConfig = {
	webpack5: true,
	distDir: "build",
	reactStrictMode: true,
	disableStaticImages: false,
	useFileSystemPublicRoutes: true,

	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve.fallback.fs = false;
			config.resolve.fallback.dns = false;
			config.resolve.fallback.net = false;
			config.resolve.fallback.tls = false;
		}
		return config;
	}
};

const globalConfig = {
	serverRuntimeConfig: {
		PROJECT_ROOT: __dirname
	}
};

module.exports = {
	...globalConfig,
	...nextConfig
};

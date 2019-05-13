module.exports = {
  pluginOptions: {
    i18n: {
      locale: 'de',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },
	runtimeCompiler: true,
	publicPath: process.env.VUE_APP_PUBLIC_PATH || "/",
	css: {
		sourceMap: true,
	},
};

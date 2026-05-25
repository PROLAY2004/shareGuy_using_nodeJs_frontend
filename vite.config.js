export default {
  build: {
    outDir: "../dist",
  },
 server: {
    host: "0.0.0.0",
    port: process.env.PORT || 8080,
    allowedHosts: ["shareguy.azurewebsites.net"],
  },

  preview: {
    host: "0.0.0.0",
    port: process.env.PORT || 8080,
    allowedHosts: ["shareguy.azurewebsites.net"],
  },
  // Optional: Silence Sass deprecation warnings. See note below.
  css: {
    preprocessorOptions: {
      scss: {
        silenceDeprecations: [
          "import",
          "mixed-decls",
          "color-functions",
          "global-builtin",
        ],
      },
    },
  },
};

const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@types": path.resolve(__dirname, "typescript"),
        "@apis": path.resolve(__dirname, "src/apis"),
      },
    },
  },
  devServer: {
    port: 9999,
    open: true,
    disableHostCheck: true,
    proxy: {
      '^/dj_api': {
        target: 'http://127.0.0.1:8930',
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: {
          '^/dj_api': ''
        }
      },
      '^/files': {
        target: 'http://127.0.0.1:8930',
        changeOrigin: true,
        logLevel: 'debug',
      },
    },
  },
  pluginOptions: {
    // Apollo-related options
    apollo: {
      // Enable automatic mocking
      enableMocks: true,
      // Enable Apollo Engine
      enableEngine: true,
      // Enable ESLint for `.gql` files
      lintGQL: true,

      /* Other options (with default values) */

      // Base folder for the server source files
      serverFolder: './apollo-server',
      // Cross-Origin options
      cors: '*',
      // Requests timeout (ms)
      timeout: 120000,
      // Integrated apollo engine
      integratedEngine: true,
      // For enable typescript server files
      // if you don't have @vue/cli-plugin-typescript
      typescript: true,
      // Apollo server options (will be merged with the included default options)
      serverOptions: {
        // ...
      },
    },
  }
};
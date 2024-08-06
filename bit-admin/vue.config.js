const { defineConfig } = require('@vue/cli-service')
const path = require("path");

module.exports = defineConfig({
  lintOnSave: false,
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      symlinks: false,
      alias: {
        // Make sure *our* version of ag-grid & vue is always loaded.
        // This is needed for `yarn link / npm link` to work and prevent duplicate versions of these libs
        // being loaded
        '@ag-grid-community/core$': path.resolve(__dirname, 'node_modules/@ag-grid-community/core'),
        vue$: path.resolve(__dirname, 'node_modules/vue/dist/vue.esm-bundler.js')
      }
    },
    performance: {
      hints: false
    }
  },
  chainWebpack: config => {
    config.module
        .rule('vue')
        .use('vue-loader')
        .loader('vue-loader')
        .tap(options => {
          options.compilerOptions = {
            ...(options.compilerOptions || {}),
          };
          return options;
        });
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            // Less variables you want to override
            'primary-color': '#8c004f',
            'link-color': '#da00ad',
            // Add your other overrides here
          },
          javascriptEnabled: true,
        },
      },
    },
  },
})

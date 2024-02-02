const { defineConfig } = require('@vue/cli-service')
const PUBLIC_PATH = '/views'
module.exports = defineConfig({
  publicPath: PUBLIC_PATH,
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000'
      }
    }
  }
})

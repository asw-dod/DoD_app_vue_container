module.exports = {
  publicPath: '',
  outputDir: 'dist',

  devServer: {
    disableHostCheck: true
  },

  pwa: {
    name: 'DoD announcement',
    msTileColor: '#FFFFFF',
    manifestOptions: {
      background_color: '#FFFFFF'
    }
  }
}

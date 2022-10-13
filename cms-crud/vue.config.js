
module.exports = {
    publicPath: process.env.NODE_ENV === 'development' ? '/' : '/material/v2/',
    configureWebpack: {
      module: {
        rules: [{
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        }]
      }
    },
}
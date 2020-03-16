module.exports = {
  configureWebpack: {
    resolve: {
      alias: {//别名
        'assets': '@/assets',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
        'utils': '@/utils',
      }
    }
  }
}


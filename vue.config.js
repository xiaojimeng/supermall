module.exports = {
  configureWebpack: {
    reslove: {
      alias: { //别名
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'veiws': '@/veiws',
      }
    }
  }
}
module.exports = {
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true
  },

  css: {
    sourceMap: true,
  },

  transpileDependencies: ["vuetify"],
};

module.exports = {
  productionSourceMap: false,
  devServer: {
    public: "https://localhost",
    port: 3001
  },

  css: {
    sourceMap: true,
  },

  transpileDependencies: ["vuetify"],
};

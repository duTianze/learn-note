module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
    },
  },
  lintOnSave: false,
  devServer: {
    proxy: "http://localhost:5000",
  },
};

module.exports = {
  pages: {
    index: {
      entry: "src/main.js",
    },
  },
  lintOnSave: false,
  // 开启代理服务器（方式一）
  // devServer: {
  //     proxy:'http://localhost:5000'
  // }

  //开启代理服务器（方式二）
  devServer: {
    proxy: {
      "/api1": {
        target: "http://localhost:5000",
        pathRewrite: { "^/api1": "" },
        // ws: true, //用于支持websocket,默认值为true
        // changeOrigin: true //用于控制请求头中的host值,默认值为true
      },
      "/api2": {
        target: "http://localhost:5001",
        pathRewrite: { "^/api2": "" },
      },
    },
  },
};

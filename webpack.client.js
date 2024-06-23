const path = require("path");
const webpack = require("webpack");

const hotMiddlewareScript = `webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true`;

module.exports = {
  mode: process.env.NODE_ENV === "production" ? "production" : "development",

  entry: [hotMiddlewareScript, "./src/index.tsx"],

  output: {
    //__dirname :현재 파일의 절대경로
    // 번들 파일의 출력 경로를 명확하고 일관되게 지정하기 위함
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    //정적 자산을 효율적으로 관리하고 제공
    publicPath: "/", // 배포될때 웹 어플리케이션의 루트 경로에서 번들파일 참조
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ["babel-loader", "ts-loader"],
      },
    ],
  },

  resolve: {
    extensions: [".js", "jsx", ".ts", ".tsx"],
  },

  plugins: [new webpack.HotModuleReplacementPlugin()],
};

const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // css를 js와 분리
const path = require("path"); // 파일까지의 경로
// console.log(path.resolve(__dirname, "assets", "js")); // 파일까지의 경로 + 나머지 경로
// console.log(__dirname);
module.exports = {
  entry: {
    main: "./src/client/js/main.js",
    VideoPlayer: "./src/client/js/videoPlayer.js"
  }, // 작업할 파일
  mode: "development", // 개발중인지 완성 단계인지
  watch: true, // npm run assets가 계속 실행됨
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css"
    })
  ],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"), // 저장할 곳 (절대 경로)
    clean: true // build 하기 전에 폴더를 정리
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]]
          }
        }
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
        // 역순으로 입력한다. webpack은 역순으로 시작하기 때문
        // sass-loader: scss를 css로 변환한다.
        // css-loader: @import, url()을 해석해준다.
        // style-loader: css를 브라우저에 보이게 한다.
      }
    ]
  }
};
// rules는 각각의 파일 종류에 따라 어떤 전환을 할 건지 결정하는 것이다.
// 즉 babel-loder를 통해 test 파일들을 변경하는 것이다.

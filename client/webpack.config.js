const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // 개발모드, development or production
  mode: 'development',

  // entry를 기준으로 연관된 모든 파일들을 번들링
  entry: './src/index',

  // 번들링 될 파일 확장자 등록
  resolve: {
    extensions: ['.js', '.jsx'],
  },

  // 바벨과 같은 로더 등록
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: ['/node_modules/'],
      },
      {
        test: /\.p?css$/, //css 파일을 선택하는 정규표현식
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'postcss-loader' }, // postcss 적용하기
        ],
      },
    ],
  },

  // 빌드 설정
  output: {
    path: path.resolve(__dirname, 'build'), // 빌드되는 파일들이 만들어지는 위치, __dirname: 현재 디렉토리
    filename: 'bundle.js', // 번들파일 이름
    publicPath: '/',
  },

  // webpack 서버 설정
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
    historyApiFallback: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      // index.html에 output에서 만들어진 bundle.js를 적용하여, deploy에 새로운 html 파일 생성
      template: `./public/index.html`,
    }),
  ],
};

const HtmlWebpackPlugin = require('html-webpack-plugin'),
      path = require('path');

module.exports = {
    mode: 'development', //不指定 默认为生产环境
    entry: __dirname + "/src/main",//已多次提及的唯一入口文件
    output: {  //输出配置
      path: path.resolve(__dirname, 'dist'),
      filename: "static/js/bundle.min.[hash].js"
    },
    devServer: {
        port: 3000, //端口号
        progress: true, //显示打包编译的进度
        contentBase: __dirname + "/src",//本地服务器所加载的页面所在的目录
        // open: true, //编译自动打开浏览器
        // historyApiFallback: true,//不跳转
        // inline: true//实时刷新
    },
    plugins: [
        new HtmlWebpackPlugin({
          //指定要编译的模板文件 不指定模板会按照默认模板生成一个html页面
          template: __dirname + '/src/index.html',
          //输出的文件名
          filename: 'index.html',
          minify: {
            collapseWhitespace: true,
            removeComments: true,
            removeAttributeQuotes: true,
            removeEmptyAttributes: true,
            //等等....
          }
        }),
    ],
    module: {
      
    }
}
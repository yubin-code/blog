// 引入webpack
var webpack = require("webpack");
var glob = require("glob");

function getEntry (){
  var entry = {};
  glob.sync(__dirname + "/js/**/*.js").forEach(function (name){
    // 匹配出文件名
    var n = name.match(/([^/]+?)\.js/);
    entry[n[1]] = n["input"];
  });
  return entry;
}

// 导出模块
module.exports = {
  context: __dirname, // 解析从哪里开始  __dirname 表示当前模块的所在完整路径
  entry: getEntry(),   // 表示需要解析的文件入口
  output: {
    path:__dirname + "/public/javascripts",    // 最后导出文件的路径
    filename: "[name].min.js",         // 导出文件名字
    sourceMapFilename: "[name].map"
  },
  module: {
    loaders: [  //预处理规则
      {
        test:/\.js$/,   //正则
        loader: "babel-loader",  //预处理
        exclude: /node_modules/, //忽略的预处理
        query: {
          presets: ["es2015"]    //使用方式
        }
      }
    ]
  }
}
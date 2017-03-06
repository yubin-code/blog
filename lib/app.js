import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from'cookie-parser';
import bodyParser from 'body-parser';
import { getcof } from "./extend/files"
import route from  './routes/route';

var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

route(app);

// 合成菜单到全局
Object.assign(app.locals, getcof("config.yml"));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;



// .
// ├── design                  前端工作环境
// │   ├── webpack.config.js   对webpack 的配置
// │   ├── fonts               存放字体
// │   ├── images              存放需要图片
// │   ├── js                  存放js文件
// │   │   └── index.js
// │   └── sass                sass文件
// │       ├── frname          框架
// │       │   ├── core        框架核心
// │       │   └── into.scss   框架入口
// │       └── pro             其他sass代码
// │			└── index.scss
// ├── lib                     我们express js文件全部存放在这里
// │   ├── bin
// │   │   └── www.js          框架启动文件
// │   ├── routes              路由文件
// │   │   ├── index.js
// │   │   └── users.js
// │   └── app.js              项目工程文件
// ├── dist                    express 编译出来的文件 结构与lib一模一样
// ├── node_modules            安装的第三方模块都存在这里
// ├── public                  资源文件，当我们前端资源编译完成以后都存在这里
// │   ├── images              存放图片
// │   ├── javascripts         存放js
// │   └── stylesheets         存放css
// └── views                   视图文件
//     ├── error.jade
//     ├── index.jade
//     └── layout.jade
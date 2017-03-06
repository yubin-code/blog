// gulp 核心4个api
// src 读取你需要操作的文件
// dest 写入文件
// task 定义任务
// watch 用检测文件的变化

var gulp = require("gulp");
var $ = require("gulp-load-plugins")();
var webpackConfig = require("./design/webpack.config.js");


var globs = {
    js: "design/js/**/*.js",
    pro: "design/sass/pro/**/*.scss",
    into: "design/sass/frame/into.scss",
    intotwo:"design/sass/frame/**/*.scss"
}

gulp.task("webpack", function (){
    return gulp.src(globs.js)
    .pipe($.webpack(webpackConfig))
    .pipe(gulp.dest("public/javascripts"));
});

gulp.task ("css",function (){
  return gulp.src(globs.pro)
  .pipe($.sass())
  .pipe($.concat("index.css"))
  .pipe($.minifyCss())
  .pipe(gulp.dest("public/stylesheets"))
});


// npm install gulp-concat --save-dev 合并css
// npm install webpack -g 安装到全局
gulp.task ("into",function (){
  return gulp.src(globs.into)
  .pipe($.sass())
  .pipe($.concat("style.css"))
  .pipe($.minifyCss())
  .pipe(gulp.dest("public/stylesheets"))
});

gulp.task("js", ["webpack"], function (){
    return gulp.src("public/javascripts/**/*.js")
    .pipe($.uglify())
    .pipe(gulp.dest("public/javascripts"))
});

gulp.task("build", ["css", "into", "js"])

gulp.task("watch",["build"],function (){
    gulp.watch(globs.pro, ["css"]);
    gulp.watch(globs.js, ["js"]);
    gulp.watch(globs.intotwo, ["into"]);
});

gulp.task ("default",function (){
  gulp.start("watch");
});


// design
// ├── js
// │	└── index.js	
// ├── sass
// │   ├── frame
// │   │   ├── core
// │   │   └── into.scss
// │   └── pro
// │		└── index.scss
// ├── images
// └── fonts
var fs = require("fs");

var file = "config.yml"

fs.readFile(file, function (err, data){
  if (err){
    return console.log(err);
  }

  console.log("异步读取：" + data.toString());
})


var data = fs.readFileSync(file);

console.log("同步读取：" + data.toString());

console.log("程序执行完毕。");


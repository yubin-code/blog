import fs from "fs"
import path from "path"
import yml from "js-yaml"
import glob from "glob"
import marked from "marked"
import highlight from "highlight"
import iconv from "iconv-lite";
import { getDateSmall, getTime } from "./dates"
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,      
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
  highlight:function (code){
    return highlight.Highlight(code);
  }
});

// https://www.npmjs.com/package/marked
const root = process.cwd() + '/';


const isFile = file => fs.existsSync(path.join(root, file));
const getFileTime = file =>  new Date(getMdInfo(file).mtime).getTime();

const getfile = name => {
  if (!isFile(name)){
    return false;
  }
  return fs.readFileSync(path.join(root, name),"utf-8")
};

// 读取配置文件
const getcof = name => yml.safeLoad(getfile(name));

const gethtml = (md, len) => {
  // 读取文件
  md = getfile(md);

  if (!md){
    return '空文档!'
  }

  if (Number.isInteger(len)){
    let mdlen = md.split("\n").slice(0,len);
    md = mdlen.join("\n");
  }

  marked(md, function (err, content){
    if (err) throw err;
    md = content;
  });

  return md;
}

// 创建html文件
const createfile = (htmlPath, content) => {
  let p = htmlPath.split("/");
  let name = p.pop(); // 获取文件名
  let paths = p.join("/");
  if (!isFile(paths)){
    mkdir(paths);
  }

  let str = iconv.encode(content, "utf-8");
  
  fs.writeFile(path.join(root, htmlPath), str, {flag: "w", encoding: "utf-8", mode:"0666"});
}

const mkdir = file => {
  if (!isFile(file)){
    var pathmp = "";
    file.split("/").forEach(function (dirname){
      pathmp = path.join(pathmp, dirname);
      if (!isFile(pathmp)){
        if (!fs.mkdirSync(path.join(root, pathmp),{ encoding: "utf-8", mode:"0666" })){
          return false;
        }
      }
    });
  }
}
// 获取所有的md文件
const getmd = file => {
  let files = [];
  let article = file.split("/");
  glob.sync(path.join(root, file)).forEach(function (name){
    // 匹配出文件名 和类别
    let n = name.match(/([^/]+?)\/([^/]+?)\.md/);
    let category = article[0] == n[1] ? '' : n[1];
    let v = {
      title: n[2],
      category: category,
      path: n["input"]
    }
    files.push(v)
  });
  return files;
}

// 获取单个文件的详细信息
const getMdInfo = file => {
  return fs.statSync(file, function (er, state){
    return state;
  });
}

// 获取列表文件的详细信息
const getMdInfoList = file => {
  let  md = getmd(file);
  for (let k in md){
    let mdinfo = getMdInfo(md[k].path);
    md[k].time = getTime(mdinfo.birthtime);
    md[k].sort = getDateSmall(mdinfo.birthtime);
  }
  md.sort((a, b) =>  b.sort - a.sort);
  return md;
}

module.exports = {
  getcof,
  getMdInfoList,
  getMdInfo,
  gethtml,
  isFile,
  getFileTime,
  getfile,
  createfile
}

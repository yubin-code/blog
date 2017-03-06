import path from "path";
import { gethtml, getMdInfo, createfile, getcof, isFile, getFileTime, getfile } from "./files";
import { getTime } from "./dates"
const root = process.cwd() + '/';


// 判断是否缓存
const isCacheHhtml = (html, md, view) => {
  if (isFile(html) && (getFileTime(html) > getFileTime(md)) && (getFileTime(html) > getFileTime(view))){
    return true;
  }
  return false;
}

// 对render重新封装
const render = (res, param, html, md, view) => {
  let m = gethtml(md);
  let c = getcof("config.yml");
  
  if (c.iscache && isCacheHhtml(html, md, view)){
    console.log("调用了缓存");
    res.send(getfile(html));
    return false;
  }

  let time = getTime(getMdInfo(md).birthtime);
  // 拼装数据
  let data = {
    title: param.title,
    html: m,
    time
  }

  res.render(path.join(root, view), data, function (err, content){
    if (err) return false;
    c.iscache && setCache(html, content);
    res.send(content);
  });
}

const ArticleRender = (req, res, name) => {
  let param    = req.params;
  let category = param.category || '';
  let title    = param.title || '';

  // 获取html的路径
  // /html/article/类别/标题
  let html = path.join("html", name, category, title+".html");
  // 获取 md
  let md   = path.join(name, category, title+".md");
  // 获取视图文件路径
  let view = path.join("views", name+".ejs");
  
  // 渲染页面
  render(res, param, html, md, view);
}


// 生成html
const setCache = (htmlPath, content) => {
  console.log("开始缓存");
  createfile(htmlPath, content);
}

module.exports = {
  ArticleRender
}
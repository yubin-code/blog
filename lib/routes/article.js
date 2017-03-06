import express from "express";
import { getMdInfoList } from "../extend/files";
import { ArticleRender } from "../extend/view";
import { pages } from "../extend/page";
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let mdlist = pages(getMdInfoList("article/**/*.md"),req.params.p);
  res.render('index', { title: '余斌博客', mdlist, category:''});
});

router.get('/article/:p?', function(req, res, next) {
  let mdlist = pages(getMdInfoList("article/**/*.md"),req.params.p);
  res.render('index', { title: '余斌博客', mdlist, category:''});
});

router.get('/article/:category?/:title/article', function(req, res, next) {
  let param = req.params;
  ArticleRender(req, res, "article");
  // res.render('article', { title: param.title});
});

// <%  %>   运行js代码
// <%=  %>  解析变量
// <%-  %>  不转义html

module.exports = router;

// gulp
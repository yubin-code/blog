import express from "express";
var router = express.Router();
import { getMdInfoList } from "../extend/files";
import { pages } from "../extend/page";

router.get('/:category/:p?', function(req, res) {
  let category = req.params.category;
  let p = req.params.p;
  let mdlist = pages(getMdInfoList("article/"+category+"/*.md"),req.params.p);
  res.render('index', { title: '文章类别', mdlist, category });
});



module.exports = router;
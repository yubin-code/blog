import express from "express";
var router = express.Router();

router.get('/', function(req, res) {
  res.render('author', { title: '关于我' });
});



module.exports = router;
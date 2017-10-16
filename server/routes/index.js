var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'zhanghao' });
});
router.get('/zhanghao', function(req, res, next) {
    res.json({'name':'zhanghao'});
});


module.exports = router;

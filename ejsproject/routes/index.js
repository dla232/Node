var express = require('express');
var router = express.Router();

var login_msg = "";

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Node 로그인' , name : "Rapid_임관혁" , message : "For Live Web Developer"});
});

module.exports = router;
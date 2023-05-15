var express = require('express');
var router = express.Router();
var sha256 = require('sha256');
var sql = require('mssql');
var config = {
    user: 'node_user',
    password: '*********',
    server: '10.10.53.166',
    database: 'node_db',
	port:1433,
	stream: true,   
    options: {  
        encrypt: true    
    } 
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('write',{title:"회원가입 페이지" , name:"Rapid_임관혁"});
});
router.post('/',function(req,res,next){
	var creator_id = req.body.creator_id;
    var name = req.body.name;
    var passwd = sha256(req.body.passwd);
	sql.close();
	sql.connect(config,function(err){
		//req.stream = true;
		if(err != null){
			console.log("디비 접근 에러다");
			console.log(err);
		}else{
			var req = new sql.Request();  
			console.log("디비 Connection 완료")
		}
		var sql_join_insert = "insert into node_db.dbo.join_info( user_id , user_password, user_name) values('"+creator_id+"','"+passwd+"','"+name+"')";
		console.log(sql_join_insert);
		req.query(sql_join_insert, function (err, recordset) {
			//console.log(recordset);
			if(err){
				console.log(err);
			}
			console.log("쿼리문 실행 완료");
			res.redirect("/users");
		});
	});
});
module.exports = router;

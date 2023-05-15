var express = require('express');
var router = express.Router();
var sha256 = require('sha256');
var sql = require('mssql');
var config = {
    user: 'node_user',
    password: '**********',
    server: '***********',
    database: 'node_db',
	port:1433,
	stream: true,   
    options: {  
        encrypt: true    
    } 
}
var er_msg = "";
/* GET users listing. */
router.post('/',function(req,res,next){
	var login_id = req.body.user_id;
    var login_password = req.body.user_password;
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
		var sql_join_insert = "select * from node_db.dbo.join_info where user_id = '"+login_id+"'";
		console.log(sql_join_insert);
		req.query(sql_join_insert, function (err, recordset) {
			//console.log(recordset);
			if(err){
				console.log(err);
			}
			console.log("쿼리문 실행 완료");
            var id_chk = recordset.recordset;
            
            console.log(recordset.recordset);
            console.log(login_id);
            if(id_chk != ""){ //ID 있는지 확인 여부
                var login_id = recordset.recordset[0].user_id;
                var user_password = recordset.recordset[0].user_password;
                console.log("아이디 있음");
                if(user_password == sha256(login_password)){ //비밀번호 체크
                    console.log("비번 같음");
                    res.redirect("/users");
                }else{
                    er_msg = "비밀번호가 틀렸습니다.";
                    console.log("비번 틀림");
                    return;
                    res.send(er_msg);
                }
                /*로그인 성공 , 실패 여부 메시지 출*/
                if(er_msg == ""){
                    
                }else{
                    
                }
            }else{
                console.log("아이디 없음");
            }
			//res.redirect("/users");
		});
	});
});
module.exports = router;

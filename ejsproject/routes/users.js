var express = require('express');
var router = express.Router();
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
/*var data2;
sql.connect(config, function (err) {
	console.log("DB 접속 정보" + config.server);
    // ... error checks 
    // Query 
    var request = new sql.Request(); 
    request.query('select * from notice_board.dbo.login_info', function (err, recordset,columns) {
        // ... error checks 
		console.log(recordset);
        console.log(err);
    });
    // Stored Procedure 
	
	var data="<html><head><title>mssql test</title></head>"    
	data+="<h1>TEST</h1>"    
	data+="<table border=\"1\">"      
	data+="<tr><th>IP</th><th>CURDATE</th></tr>"  
	request.on('row', function(row) {  
	  data += "<tr>"    
	  data += "<td>"+row.user_id +"</td>"    
	  data += "<td>"+row.user_name+"</td>";    
	  data += "</tr>"    
		  data2 = row.user_name;
	});  
	request.on('done', function(returnValue) {  
	  data+="</table></html>"   
	  response.send(data);  
	  
	});  
	

});
*/
var data = [];
router.get('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    
    var url = req.url;
    url = url.split("=");
    var qr = "";
    if(url[1] == undefined){
        qr = "select * from node_db.dbo.join_info order by date DESC";
    }else{
        qr = "select * from node_db.dbo.join_info where user_id like '%"+url[1]+"%' order by date DESC";
    }
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
		req.query(qr, function (err, recordset) {
			//console.log(recordset);
			if(err){
				console.log(err);
			}
			console.log("쿼리문 실행 완료");
			console.log("rows : " + recordset.rowsAffected);
			console.log(recordset.recordset);
			var now_date = new Date().getFullYear() + "/" + (new Date().getMonth()+1) + "/" + new Date().getDate();
			res.render('user', { title: 'Node 회원 리스트' , name : "Rapid_임관혁" , row : recordset.recordset, data2 : now_date});
			//res.send(recordset);
		});
		/*req.on('row', function(row) {  
			data = row;
			//console.log(data);
			console.log("================================");
			
		});
		req.on('done', function(returnValue) {  
			
		}); */
		
		
		
	});
	/*new sql.ConnectionPool(config).connect().then(pool => {
		  return pool.request().query("");
		  }).then(result => {
			let rows = result.recordset;
			res.setHeader('Access-Control-Allow-Origin', '*');
			res.status(200).json(rows);
			sql.close();
		  }).catch(err => {
			  console.log("aaa");
			res.status(500).send({ message: "${err}"})
			sql.close();
		  });*/
/* GET home page. */

});

module.exports = router;
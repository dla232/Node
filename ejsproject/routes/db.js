module.exports ={
	db : function(){
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
		router.get('/', function(req, res, next) {
			sql.close();
			sql.connect(config,function(err){
				var request = new sql.Request();  
				req.stream = true;
				if(err != null){
					console.log("디비 접근 에러다");
					console.log(err);
				}else{
					console.log("디비 Connection 완료")
				}
				/*var request = new sql.Request(); 
				request.query('select * from notice_board.dbo.login_info', function (err, recordset,columns) {
					//console.log(recordset);
					if(err){
						console.log(err);
					}else{
						console.log("쿼리문 실행 완료");
						//console.log(recordset);
						
					}
				});
				var data ="a";
				console.log(data);
				request.on('row', function(row) {  
					data += "<br/>" + row.user_id;
					data += "<br/>" + row.user_name;
					
				});
				request.on('done', function(returnValue) {  
					res.render('index', { title: 'Node 메소드 구성' , name : "임관혁" , data : "aaa"});
					
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
	}
};
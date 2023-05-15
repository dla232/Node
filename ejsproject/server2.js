var express = require("express");  
var sql = require('mssql');
var config = {
    user: 'nodeuser',
    password: '*******',
    server: '**********',
    database: 'notice_board',
	port:1433,
	stream: true,   
    options: {  
        encrypt: true    
    } 
}
  
var app = express();  
  
app.get("/",function(request,response){  
	sql.close();
	sql.connect(config, function(err) {  
		var request = new sql.Request();  
		request.stream = true;    
		request.query('select * from notice_board.dbo.login_info'); 
		var data="<html><head><title>mssql test</title></head>"    
		data+="<h1>TEST</h1>"    
		data+="<table border=\"1\">"      
		data+="<tr><th>IP</th><th>CURDATE</th></tr>"    
		request.on('row', function(row) {  
		  data += "<tr>"    
		  data += "<td>"+row.user_id +"</td>"    
		  data += "<td>"+row.user_name+"</td>";    
		  data += "</tr>"    
		});  
		request.on('done', function(returnValue) {  
		  data+="</table></html>"   
		  response.send(data);  
		});  
    });  
});  
app.listen(3000);

console.log("우선 구동은 함");
var app = require("express")();
var url = require("url"); 
//루트에 대한 get 요청에 응답
app.get("/", function(req, res){
 console.log("get:index.html");
 //최초 루트 get 요청에 대해, 서버에 존재하는 chatClient.html 파일 전송
 res.sendFile("index.html", {root: __dirname});
 //res.send('Hello, Heroku!');
});

//기타 웹 리소스 요청에 응답
var gl_ip;
app.use(function(req, res){
 var fileName = url.parse(req.url).pathname.replace("/","");
 res.sendFile(fileName, {root: __dirname});
 console.log("use:", fileName); 

 var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
 gl_ip = ip;
	  //console.log("ip:", ip); 
});

//http 서버 생성
var server = require('http').createServer(app);

//로컬 작업시 server.listen(2000);
server.listen(process.env.PORT); //Heroku 사용시
console.log("listening at http://127.0.0.1:3000...");

//클로저를 사용해, private한 유니크 id를 만든다
/*var uniqueID = (function(){
 var id = 0;
 return function(){ return id++; };
})();*/
var clientID = 0;
var users;
//서버 소켓 생성
var socket = require('socket.io').listen(server);
//소켓 Connection 이벤트 함수
socket.sockets.on('connection', function(client){
  //클라이언트 고유값 생성 
  
  
  //서버 receive 이벤트 함수(클라이언트에서 호출 할 이벤트)    
  client.on('serverReceiver', function(value,value2){
    //클라이언트 이베트 호출     
	
	socket.sockets.emit('clientReceiver', {clientID: clientID, message: value , name: value2 });  
  });
  client.on("newUser",function(name){
	 clientID = clientID + 1;
	 users = name;
	 socket.sockets.emit('clientConnection', {clientID: clientID, message: "접속하셨습니다." , name: users });  
	 console.log("//////////////////////////////////////////////");
	 console.log("//////////////////////////////////////////////");
	 console.log("//////////////////////////////////////////////");
	 console.log("//////////////////////////////////////////////");
	 console.log("//////////////////////////////////////////////");
	 console.log('Connection: '+ clientID);
	 console.log("접속 ip:"+ gl_ip);
	 console.log("//////////////////////////////////////////////");
	 console.log("//////////////////////////////////////////////");
	 console.log("//////////////////////////////////////////////");
	 console.log("//////////////////////////////////////////////");
  });
  client.on('disconnect', function() {
	  clientID = clientID - 1;
	  socket.sockets.emit('clientDisconnection', {clientID: clientID, message: "나가셨습니다." , name: users });  
	  console.log("//////////////////////////////////////////////");
	  console.log("//////////////////////////////////////////////");
	  console.log("//////////////////////////////////////////////");
	  console.log("//////////////////////////////////////////////");
	  console.log("//////////////////////////////////////////////"); 
	  console.log("이름"+users);
	  console.log('접속종료 ip: '+ gl_ip);
	  console.log("//////////////////////////////////////////////");
	  console.log("//////////////////////////////////////////////");
	  console.log("//////////////////////////////////////////////");
	  console.log("//////////////////////////////////////////////");
	  console.log("//////////////////////////////////////////////");
  });







});

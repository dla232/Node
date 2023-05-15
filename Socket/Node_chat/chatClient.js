var socket = io.connect('http://jobjobs.herokuapp.com');
var gl_name;
socket.on("connect",function(data){
  var name = prompt('반갑습니다!', '')
  /* 이름이 빈칸인 경우 */
  if(!name) {
    name = '익명'
  }
    gl_name = name;
    document.getElementById('user_name').value = name;
	socket.emit('newUser', name);
});
window.onload = function(){ 
 //클라이언트 소켓 생성
 
 //DOM 참조

 var div = document.getElementById('message');
 var txt = document.getElementById('txtChat');
 var name = document.getElementById('user_name');
	if(socket != null && socket != undefined){
		var welcome = document.createElement('li');
		welcome.innerHTML = '소켓 통신 테스트';
		document.getElementById('message').appendChild(welcome);
	}



 //텍스트 박스에 포커스 주기 
 txt.focus();
 
 //텍스트 박스에 이벤트 바인딩
 txt.onkeydown = sendMessage.bind(this); 
 function sendMessage(event){     
  if(event.keyCode == 13){
   //메세지 입력 여부 체크   
   var message = event.target.value;
   var name_val = name.value;
   if(message){
     //소켓서버 함수 호출  
	 if(!name_val){
		alert("이름을 입력하세요");
		name.focus();
	 }else{
		socket.emit('serverReceiver', message , name_val);
	 }
     //텍스트박스 초기화
     txt.value = '';
   }
  }
 };
 //클라이언트 receive 이벤트 함수(서버에서 호출할 이벤트)
 socket.on('clientReceiver', function(data){  
   //console.log('서버에서 전송:', data);   
   //채팅창에 메세지 출력하기
    var total_user = data.clientID;
    var name = document.getElementById("user_name").value;
	var message = '['+ data.name + '님의 말' + '] ' + data.message;
	var li = document.createElement("li");
	li.innerHTML += message + '\r\n';
	div.appendChild(li);
    //채팅창 스크롤바 내리기  
    div.scrollTop = div.scrollHeight;   
   
 });

 //clientConnection 
 socket.on('clientConnection', function(data){  
   //console.log('서버에서 전송:', data);   
   //채팅창에 메세지 출력하기
    var total_user = data.clientID;
    var name = data.name;
	var message = '['+ data.name + '사용자가' + '] ' + data.message + '접속자 : '+total_user;
	var li = document.createElement("li");
	li.className = 'b';
	li.innerHTML += message + '\r\n';
	div.appendChild(li);
    //채팅창 스크롤바 내리기  
    div.scrollTop = div.scrollHeight;   
 });


 socket.on('clientDisconnection', function(data){  
   //console.log('서버에서 전송:', data);   
   //채팅창에 메세지 출력하기
    var total_user = data.clientID;
    var name = data.name;
	var message = '['+ data.name + '사용자가' + '] ' + data.message + '접속자 : '+total_user;
	var li = document.createElement("li");
	li.className = 'c';
	li.innerHTML += message + '\r\n';
	div.appendChild(li);
    //채팅창 스크롤바 내리기  
    div.scrollTop = div.scrollHeight;   
 });



};
function test(){
	var message = document.getElementById('txtChat').value;
	var name_val = document.getElementById('user_name').value;
	if(message){
	 //소켓서버 함수 호출  
	 if(!name_val){
		alert("이름을 입력하세요");
		document.getElementById('user_name').focus();
	 }else{
		socket.emit('serverReceiver', message , name_val);
	 }
	 //텍스트박스 초기화
	 document.getElementById('txtChat').value = '';
	}
}
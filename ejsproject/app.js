var express = require('express');
var http = require("http");
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose   = require("mongoose");

//실제 연결될 경로의 파일 네이밍 확장자는 자동으로 ejs 처리
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// DB setting
/*mongoose.connect(process.env.MONGO_DB, { useMongoClient: true }); // 1
var db = mongoose.connection;
db.once("open", function(){
 console.log("DB connected");
});
db.on("error", function(err){
 console.log("DB ERROR : ", err);
});*/


// view engine setup
app.set("port",process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 도메인 관련 보여줄 주소 가상 주소
app.use('/', index);
app.use('/users', users);

// 404 에러 노출
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 유저 에러시 
app.use(function(err, req, res, next) {
  // 오로지 개발자만 CMD 로직만
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // 에러페이지 이동
  res.status(err.status || 500);
  res.render('error');
});
app.get('/',function(request,response){
	response.render('index',{
		title : 'index',
		name : '임관혁'
	});
	//DB OPEN 작업
	/*db.collection('users').findOne({},function(err,doc){
       if(err) throw err;
       res.send(doc);
   });*/
});

// 서버 구성 시작
http.createServer(app).listen(app.get("port"),function(){
	console.log("정상 서버 접근 포트번호" + app.get("port"));
});
//app 을 모듈화 처리
module.exports = app;

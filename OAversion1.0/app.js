var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var role=require("./routes/role");
var news=require("./routes/news");
var category=require("./routes/category");
var duty=require("./routes/duty");
var logger=require("./routes/logger");
var leave=require("./routes/leave");
var department=require("./routes/department");
var operation=require("./routes/operation");
var bulletin=require("./routes/bulletin");
//var conference=require("./routes/conference");

var app = express();
//跨域访问设置
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
//模板引擎配置
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use("/role",role);
app.use("/news",news);
app.use("/category",category);
app.use("/duty",duty);
app.use("/logger",logger);
app.use("/leave",leave);
app.use("/department",department);
app.use("/operation",operation);
app.use("/bulletin",bulletin);
//app.use("/conference",conference);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

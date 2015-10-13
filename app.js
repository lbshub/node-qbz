var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
// var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// -----------------------------------------------------------
var session = require('express-session');
var SessionStore = require('express-mysql-session'); 
var ejs = require('ejs'); //定义模板为.html格式

// -----------------------------------------------------------
var config = require('./config'); //配置 
var log = require('./lib/log'); //日志 

// -----------------------------------------------------------
// var routes = require('./routes/index');
// var users = require('./routes/users');
var routes = require('./routes/routes'); //路由

// ====================================================

var app = express();

// -----------------------------------------------------------
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.engine('html', ejs.__express); //or app.engine('html', ejs.renderFile);
app.set('view engine', 'html');


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// -----------------------------------------------------------
// app.use(logger('dev'));
log(app);  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// -----------------------------------------------------------
var options = {
    host: config.db_host,
    port: config.db_port,
    user: config.db_user,
    password: config.db_password,
    database: config.db_database/*,
    schema: {
        tableName: 'user_session',
        columnNames: {
            session_id: 'custom_session_id',
            expires: 'custom_expires_column_name',
            data: 'custom_data_column_name'
        }
    }*/
};
var sessionStore = new SessionStore(options);
app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret recommand 128 bytes random string', // 128字节的 secret
    store: sessionStore, // 会话保存到mysql
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 10} // 会话失效时间 10分钟
}));

// -----------------------------------------------------------
// app.use('/', routes);
// app.use('/users', users);
routes(app);

// 404
app.use(function(req, res) {
    // var err = new Error('Not Found');
    // err.status = 404;
    res.render('error', {
        index: true,
        title: '页面不存在',
        message: '您访问的页面不存在。',
        user: req.session.user
    });
});

// development error handler
// will print stacktrace
/*
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
*/

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

app.listen(config.port, function() {
    console.log('服务已经启动，监听端口是：' + config.port);
});

module.exports = app;
// var async = require('async');
// var db = require('../lib/db');

// ----------------------------------------------------------

var index = require('./index'); // 处理首页
var login = require('./user').login; // 处理登录
var reg = require('./user').reg; // 处理注册
var sms = require('./user').sms; // 处理发送验证码
var forget = require('./user').forget; // 处理忘记密码

// ---------------------------------------------------------- 

module.exports = function(app) {
	app.get('/', index);
	
	// ----------------------------------------------------------
	app.get('/login', login.get);
	app.post('/login', login.post);

	// ----------------------------------------------------------
	app.get('/forget', forget.get);
	app.post('/pwdCheck', forget.check);
	app.post('/pwdSave', forget.save);

	// ----------------------------------------------------------
	app.get('/register', reg.get);
	app.post('/register', reg.post);

	// ----------------------------------------------------------
	app.post('/smsreg', sms.reg);
	app.post('/smsforget', sms.forget);

	// ----------------------------------------------------------
	app.get('/logout', function(req, res) {
		req.session.user = null;
		res.redirect('/'); // 登出成功后跳转到主页
	});

	// ----------------------------------------------------------
}
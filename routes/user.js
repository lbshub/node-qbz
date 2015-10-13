// var async = require('async');
// var db = require('../lib/db');

// ----------------------------------------------------------
var User = require('../models/User');
var SMS = require('../models/SMS');

// ----------------------------------------------------------
var crypto = require('crypto');

// ----------------------------------------------------------
var user = {};
var login = {};
var reg = {};
var sms = {};
var forget = {};

// ----------------------------------------------------------
login.get = function(req, res) {
	res.render('login', {
		index: false,
		title: '登录',
		user: req.session.user
	});
}

login.post = function(req, res) {
	var md5 = crypto.createHash('md5');
	var name = req.body.username,
		password = md5.update(req.body.password).digest('hex'); //生成密码的 md5 值
	var json = {
		result: false,
		code: 0,
		message: ''
	};
	User.getOne(name, function(results) {
		if (!!results.length) {
			var user = results[0];
			if (password !== user.password) {
				json.result = false;
				json.code = 3;
				json.message = '密码错误';
			} else {
				json.result = true;
				json.code = 1;
				json.message = '登录成功';
				req.session.user = user;
			}
		} else {
			json.result = false;
			json.code = 2;
			json.message = '用户不存在';
		}
		res.json(json);
	});
}

// ----------------------------------------------------------
reg.get = function(req, res) {
	res.render('register', {
		index: false,
		title: '注册',
		user: req.session.user
	});
}

reg.post = function(req, res) {
	var md5 = crypto.createHash('md5');
	var ip = req.ip.slice(req.ip.lastIndexOf(':') + 1);
	var userInfo = {
		phone: req.body.phone,
		phoneCode: req.body.phoneCode,
		password: md5.update(req.body.password).digest('hex'),
		inviteID: req.body.inviteID,
		ip: ip,
		time: Date.now()
	}
	var json = {
		result: false,
		code: 0,
		message: ''
	};
	// {result: true, code: 4, message: '注册成功'}
	// {result: false, code: 0, message: '手机验证码不正确'}
	// {result: false, code: 1, message: '手机验证码超时'}
	// 0 验证码错误
	// 1 验证码超时
	// 2 此手机号码没有请求发送验证码
	// 3 插入失败
	// 4 插入成功

	// -----------------------------------------------
	// 没有做每一项数据的检查 
	// -----------------------------------------------

	var oneUser = new User(userInfo);
	oneUser.save(function(result) {
		switch (parseInt(result)) {
			case 0:
				json.result = false;
				json.code = 0;
				json.message = '手机验证码错误';
				break;
			case 1:
				json.result = false;
				json.code = 1;
				json.message = '手机验证码超时';
				break;
			case 2:
				json.result = false;
				json.code = 2;
				json.message = '此手机号码没有请求发送验证码';
				break;
			case 3:
				json.result = false;
				json.code = 3;
				json.message = '注册失败';
				break;
			case 4:
				json.result = true;
				json.code = 4;
				json.message = '注册成功';
				req.session.user = user;
				break;
			case 5:
				json.result = false;
				json.code = 5;
				json.message = '这个手机号码已经注册过了';
				break;
		}
		res.json(json);
	});
}

// ----------------------------------------------------------
sms.reg = function(req, res) {
	var phone = req.body.phone;
	var code = SMS.random(6);
	var content = '您的验证码是：' + code + ' 【钱帮主】';
	var ip = req.ip.slice(req.ip.lastIndexOf(':') + 1);
	var json = {
		result: false,
		code: 0,
		message: ''
	};
	// {result: true, code: 1, message: '发送成功'}
	// {result: false, code: 2, message: '发送失败'}
	// {result: false, code: 3, message: '你刚请求发送了一次,请稍后再试'}
	// {result: false, code: 4, message: '这个手机号码已经注册'}
	var info = {
		phone: phone,
		content: content,
		ip: ip,
		reg: true 
	}
	SMS.send(info, function(result) {
		switch (parseInt(result)) {
			case 0:
				json.result = false;
				json.code = 2;
				json.message = '发送失败';
				break;
			case 2:
				json.result = false;
				json.code = 4;
				json.message = '这个手机号码已经注册过了';
				break;
			default:
				json.result = true;
				json.code = 1;
				json.message = '发送成功';
		}
		res.json(json);
	});
}

sms.forget = function(req, res) {
	var phone = req.body.phone;
	var code = SMS.random(6);
	var content = '您在进行找回密码操作，您的验证码是：' + code + ' 【钱帮主】';
	var ip = req.ip.slice(req.ip.lastIndexOf(':') + 1);
	var json = {
		result: false,
		code: 0,
		message: ''
	};
	// {result: true, code: 1, message: '发送成功'}
	// {result: false, code: 2, message: '发送失败'}
	// {result: false, code: 3, message: '这个手机号码不存在'}
	User.getOne(phone, function(results) {
		if (!!results.length) {
			var user = results[0];
			var info = {
				userid: user.user_id,
				phone: phone,
				content: content,
				ip: ip,
				type: 'smsforget'
			}
			SMS.send(info, function(result) {
				switch (parseInt(result)) {
					case 0:
						json.result = false;
						json.code = 2;
						json.message = '发送失败';
						break;
					case 1:
						json.result = true;
						json.code = 1;
						json.message = '发送成功';
						break;
				}
				res.json(json);
			});
		} else {
			json.result = false;
			json.code = 3;
			json.message = '这个手机号码不存在';
			res.json(json);
		}
	});
}

// ----------------------------------------------------------
forget.get = function(req, res) {
	res.render('forget', {
		index: false,
		title: '找回密码',
		user: req.session.user
	});
}

forget.check = function(req, res) {
	var json = {
		result: false,
		code: 0,
		message: ''
	};
	var info = {
		phone: req.body.phone,
		phoneCode: req.body.phoneCode,
		type: 'smsforget',
		ip: req.ip.slice(req.ip.lastIndexOf(':') + 1) //用ip来区分设备
	};
	SMS.getOne(info, function(results) {
		if (!!results.length) {
			var result = results[0];
			if (info.phoneCode !== result.code) {
				json.result = false;
				json.code = 0;
				json.message = '验证码错误';
			} else {
				if (Date.now() - result.addtime > 600000) {
					json.result = false;
					json.code = 3;
					json.message = '手机验证码超时';
					return res.json(json);
				}
				json.result = true;
				json.code = 1;
				json.message = '验证码正确';
			}
		} else {
			json.result = false;
			json.code = 2;
			json.message = '验证码不存在，请点击发送';
		}
		res.json(json);
	});
}

forget.save = function(req, res) {
	var md5 = crypto.createHash('md5');
	var json = {
		result: false,
		code: 0,
		message: ''
	};
	var info = {
		name: req.body.phone,
		password: md5.update(req.body.password).digest('hex')
	};
	User.update(info, function(result) {
		switch (result) {
			case 1:
				json.result = true;
				json.code = 1;
				json.message = '修改成功';
				break;
			case 2:
				json.result = false;
				json.code = 2;
				json.message = '修改失败';
				break;
			case 0:
				json.result = false;
				json.code = 0;
				json.message = '修改失败';
				break;
		}
		res.json(json);
	});
}

// ----------------------------------------------------------
user.login = login;
user.reg = reg;
user.sms = sms;
user.forget = forget;

module.exports = user;
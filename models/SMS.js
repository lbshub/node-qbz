var db = require('../lib/db');
var async = require('async');
var request = require('request');
var crypto = require('crypto');

var SMS = {};

// 发送验证码
SMS.send = function(info, cb) {
	var phone = info.phone;
	var content = info.content;
	var ip = info.ip || '';
	var userid = info.userid || '0';
	var type = info.type || 'smscode';
	var reg = !!info.reg; // 是不是发送注册验证码 如果为false则不查询号码是否存在
	// 0 发送失败
	// 1 发送成功
	// 2 号码已经存在 
	async.waterfall([
		function(next) {
			if(!reg) return next();
			var sql_phone = 'select * from tuanshang_users_info where phone=' + db.escape(phone);
			db.query(sql_phone, function(err, results) {
				if (err) return cb(0);
				if (!!results.length) return cb(2);
				next();
			});
		},
		function(next) {
			var md5 = crypto.createHash('md5');
			var SN = 'SDK-BBX-010-21389';
			var pwd = md5.update(SN + '_-0__6-4').digest('hex').toUpperCase();
			var url = 'http://sdk2.entinfo.cn:8061/mdsmssend.ashx?sn=' + SN + '&pwd=' + pwd + '&mobile=' + phone + '&content=' + content + '&ext=&stime=&rrid=&msgfmt=';
			request(encodeURI(url), function(err, res) {
				if (err) return cb(0);
				if (parseInt(res.body) < 0) return cb(0);
				var code = res.body;
				next(code, url);
			});
		}
	], function(code, url) {
		var smslog = {
			user_id: userid,
			type: type,
			phone: phone,
			status: 1,
			contents: content,
			send_return: code,
			send_status: 0,
			send_time: Date.now(),
			send_url: url,
			code: content.replace(/[^0-9]/gi, ''),
			addtime: Date.now(),
			addip: ip
		};
		db.query('insert into tuanshang_approve_smslog set ?', smslog, function(err, result) {
			if (!!result) {
				cb(1);
			} else {
				cb(0);
			}
		});
	});
};

// 获取验证码
SMS.getOne = function(info, cb) { // info.phone info.type info.ip
	// console.log(info)
	var sql = 'select * from tuanshang_approve_smslog where phone=' + db.escape(info.phone) + ' and type='+ db.escape(info.type) +' order by addtime desc limit 1';
	db.query(sql, function(err, results) {
		// console.log(results)
		if (err || !results.length) return cb([]);
		cb(results);
	});
}

SMS.random = function(n) {
	var s = '',
		i = 0,
		n = parseInt(n) || 6;
	for (; i < n; i++) s += Math.floor(Math.random() * 10);
	return s;
};

module.exports = SMS;
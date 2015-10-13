var db = require('../lib/db');
var async = require('async');

function User(user) {
	this.phone = user.phone;
	this.phoneCode = user.phoneCode;
	this.password = user.password;
	this.inviteID = user.inviteID;
	this.ip = user.ip;
	this.time = user.time;
}

// 获取指定用户名的用户 
User.getOne = function(name, cb) {
	// console.log('==================== '+ db.escape(name) +' =======================');
	var sql = 'select * from tuanshang_users where username=' + db.escape(name);
	db.query(sql, function(err, results) {
		if (err || !results.length) return cb([]);
		cb(results);
	});
}

// 更新密码
User.update = function(info, cb) { // info.name info.password
	// console.log(info)
	User.getOne(info.name, function(results) {
		if (!!results.length) {
			var user = results[0];
			if (user.password == info.password) {
				return cb(2);
			}
			var sql = 'update tuanshang_users set ? where user_id=' + user.user_id;
			db.query(sql, {
				password: info.password
			}, function(err, result) {
				if (!!result && !!result.changedRows) {        
					// console.log('更新成功');        
					cb(result.changedRows);    
				} else {        
					cb(0);    
				}
			});
		}
	});
}

// 保存一个新用户
User.prototype.save = function(cb) {
	var code = this.phoneCode,
		phone = this.phone,
		password = this.password,
		inviteID = this.inviteID,
		ip = this.ip,
		time = this.time; // 时间

	// 5 手机已经存在
	// 0 验证码错误
	// 1 验证码超时
	// 2 此手机号码没有请求发送验证码
	// 3 插入失败
	// 4 插入成功

	async.waterfall([
		function(next) {
			db.query('select * from tuanshang_users_info where phone=' + db.escape(phone), function(err, results) {
				if (!!results.length) return cb(5);
				next();
			});
		},
		function(next) {
			db.query('select * from tuanshang_approve_smslog where phone=' + db.escape(phone) + ' order by addtime desc limit 1', function(err, results) {
				// console.log(results)
				if (err) throw err;
				if (!results.length) return cb(2);
				if (results[0].code !== code) return cb(0);
				if (Date.now() - results[0].addtime > 600000) return cb(1);
				next();
			});
		},
		function(next) {
			var userInfo = {
				username: phone,
				password: password,
				tuijian_userid: inviteID,
				paypassword: password,
				reg_ip: ip,
				reg_time: Date.now()
			};
			db.query('insert into tuanshang_users set ?', userInfo, function(err, result) {
				if (!result) return cb(3);
				// if(!!result && result.insertId){}
				next(result);
			});
		}
	], function(result) {
		var info = {
			user_id: result.insertId,
			phone: phone,
			phone_status: 1
		};
		db.query('insert into tuanshang_users_info set ?', info, function(err, result) {
			if (!result) return cb(3);
			cb(4); //成功
		});
	});
};

module.exports = User;
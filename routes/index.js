module.exports = function(req, res) {
	res.render('index', {
		index: true,
		title: '主页',
		user: req.session.user
	});
}
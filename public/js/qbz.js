/**
 * LBS Tips mobile
 * Date: 2014-11-15
 * ===============================================
 * 1.引入JS CSS
 * 2.直接调用: 
 * Tips.alert(content,callback/可选) 
 * Tips.confirm(content,callback(boolean)) 
 * Tips.open(title,content,callback/可选)
 * Tips.time(content,time) time秒后自动关闭(默认2秒) 没有按钮显示
 * ==================================
 * 宽高自适应 title标题 content内容(默认文本居中 可带html标签自定义样式)
 * ===============================================
**/
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}(';(4(){J.3={o:4(){I a=s.1B(\'u\')[0],1i=\'<f 9="1f">							<1c 9="1b">\\y\\v\\z\\A</1c>							<a O="B:;" 9="1a"></a>						</f>						<f 9="18"></f>						<f 9="16">							<a O="B:;" 9="1j">取消</a>							<a O="B:;" 9="14">确定</a>						</f>\';3.7=s.13(\'f\');3.7.9=\'1o\';3.6=s.13(\'f\');3.6.9=\'1E\';3.6.L=1i;a.12(3.7);a.12(3.6);3.1q=3.$(\'1f\');3.1A=3.$(\'16\');3.11=3.$(\'1b\');3.P=3.$(\'1a\');3.Q=3.$(\'18\');3.e=3.$(\'14\');3.j=3.$(\'1j\')},$:4(a){1r s.1x(a)},D:4(){I d=s,p=d.1G,u=d.u;3.Z=p.1k;3.Y=p.V||u.V;3.U=p.1u;3.H=p.1z},R:4(){3.7.5.1C=1D.1O(3.Z,3.H)+\'w\'},M:4(){3.6.5.T=\'1m\';I a=3.Q.1n;h(a<15)a=15;h(a>S)a=S;3.6.5.T=a+\'w\';3.6.5.1s=(3.U-3.6.1t)/2+\'w\';3.6.5.1v=3.Y+(3.H-3.6.1w)/2+\'w\'},k:4(a){3.11.L=a},m:4(a){3.Q.L=a},t:4(){3.D();3.R();3.7.5.8=\'W\';3.6.5.8=\'W\';3.M();3.X()},i:4(){3.7.5.8=\'q\';3.6.5.8=\'q\';3.10();h(!!3.x){1l(3.x);3.x=l}},r:4(n,a){1p(n){G 0:3.e.5.8=\'q\';3.j.5.8=\'q\';F;G 1:3.e.5.8=\'\';3.j.5.8=\'q\';3.e.17();3.E(4(){a&&a()});F;G 2:3.e.5.8=\'\';3.j.5.8=\'\';3.e.17();3.E(4(){a&&a()});3.19(4(){a&&a()});F}},E:4(a){3.e.g=4(){3.i();3.C=1y;a&&a()}},19:4(a){3.j.g=4(){3.i();3.C=N;a&&a()}},X:4(){3.P.g=3.i;3.7.g=3.i;3.1d(J,\'1e\',3.K)},10:4(){3.P.g=l;3.7.g=l;3.e.g=l;3.j.g=l;3.1g(J,\'1e\',3.K)},K:4(){1h(4(){3.D();3.R();3.M()},1F)},1d:4(a,b,c){a.1I(b,c,N)},1g:4(a,b,c){a.1J(b,c,N)},1K:4(a,b){h(!3.7)3.o();3.k(\'\\y\\v\\z\\A\');3.m(a);3.t();3.r(1,4(){b&&b()})},1L:4(a,b){h(!3.7)3.o();3.k(\'\\y\\v\\z\\A\');3.m(a);3.t();3.r(2,4(){b&&b(3.C)})},1M:4(a,b,c){h(!3.7)3.o();3.k(a);3.m(b);3.t();3.r(1,4(){c&&c()})},1N:4(a,b){h(!3.7)3.o();3.k(\'\\y\\v\\z\\A\');3.m(a);3.t();3.r(0);b=b||2;3.x=1h(4(){3.i()},b*1H)}}}());',62,113,'|||Tips|function|style|Box|BG|display|id|||||define|div|onclick|if|_hide|cancel|_setTitle|null|_setContent||_create|doc|none|_setBtn|document|_show|body|u99a8|px|timer|u6e29|u63d0|u793a|javascript|Bool|_getSize|_OK|break|case|wH|var|window|_resize|innerHTML|_setBox|false|href|close|content|_setBG|300|width|wW|scrollTop|block|_bind|sY|pH|_unbind|title|appendChild|createElement|tips_define|260|tips_foot|focus|tips_content|_NOT|tips_close|tips_title|h2|_on|resize|tips_head|_off|setTimeout|html|tips_cancel|scrollHeight|clearTimeout|auto|scrollWidth|tips_mask|switch|head|return|left|offsetWidth|clientWidth|top|offsetHeight|getElementById|true|clientHeight|foot|getElementsByTagName|height|Math|tips_box|200|documentElement|1000|addEventListener|removeEventListener|alert|confirm|open|time|max'.split('|'),0,{}))


//侧边菜单
;(function(){
	$(function(){
		var $nav = $('#nav'), $head = $('#head'), $body = $('#body'), $menu = $('#menu'), $layer = $('#layer');
		$head.addClass('close');
		$body.addClass('close');
		$menu.addClass('close');
		$nav.on('touchend click',function(e){
			 e.preventDefault();
			 $layer.show();
			 $head.removeClass('close').addClass('open');
			 $body.removeClass('close').addClass('open');
			 $menu.removeClass('close').addClass('open');
		});
		$layer.on('touchmove touchend click',function(e){
			 e.stopPropagation();
			 e.preventDefault();
			 $layer.hide();
			 $head.removeClass('open').addClass('close');
			 $body.removeClass('open').addClass('close');
			 $menu.removeClass('open').addClass('close');
		});
	});
}());

//倒计时 id为剩余时间的容器(毫秒) fn为倒计时完成的回调
function getTimeLeft(id,fn){
	var o = document.getElementById(id), leftTimeHtml = o.innerHTML, date = {}, leftTime = 0;
	if(isNaN(leftTimeHtml)) return false;
	leftTime = parseInt(leftTimeHtml);
	if(leftTime <= 0){ fn && fn(o); return false;} 
	leftTime /= 1000;
	function setDigi(num){
		var str = num.toString();
		if(str.length < 2) str = '0'+ str;
		return str;
	}
	function getDate(leftTime){
		date.days = parseInt(leftTime / 24 / 3600);
		date.hours = parseInt((leftTime / 3600) % 24);
		date.minutes = parseInt((leftTime / 60) % 60);
		date.seconds = parseInt(leftTime % 60);
		o.innerHTML = setDigi(date.days) +'天'+ setDigi(date.hours) +'时'+ setDigi(date.minutes) +'分'+ setDigi(date.seconds) +'秒';
	}
	getDate(leftTime);
	(function(){
		leftTime--;
		getDate(leftTime);
		if(leftTime <= 0){ fn && fn(o); return false;} 
		setTimeout(arguments.callee,1000);
	}());
}

//提示等待蒙版
;(function(){
	$(function(){
		window.MB = {
			create: function(){
				MB.div = $('<div id="MB"></div>').appendTo('body');
			},
			open: function(){
				if(!MB.div) MB.create();
				MB.div.fadeIn(200);
			},
			close: function(){
				MB.div.fadeOut(200);
			}
		};
	});
}());
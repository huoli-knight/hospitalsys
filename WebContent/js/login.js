$(function(){
	
	$("body").keyup(function(event){
		 if(event.keyCode ==13){
		    $("#btlogin").trigger("click");
		 }
	});
	
	var errorNumber = 0;
	
	if ($.cookie('username')) {
		$("#user_name").val($.cookie('username'));
	}
	if ($.cookie('password')) {
		$("#password").val($.cookie('password'));
	}
	
	$("#btlogin").click(function(){
			var username = $("#user_name").val();
			var password = $("#password").val();
			if ($.cookie('errorState') != null) {
				var presentDate = new Date();
				if ($.cookie('recordDate') == null) {
					$("#errorMessages").html("登录出错！已重置！请重新登录！");
					errorNumber = 0;
					if ($.cookie('errorState') != null) {
						$.cookie('errorState',null,{expires : -1});
					}
					return;
				}
				var recordDate = new Date($.cookie('recordDate'));
				var time = presentDate.getTime() - recordDate.getTime();
				time = (5 * 60 * 1000) - time;
				var second = Math.floor((time / 1000) % 60);
				var minute = Math.floor((time / (60 * 1000)) % 60);
				if (time >= 0) {
					$("#errorMessages").html("错误登录已满5次！封锁时间还剩");
					if (minute >= 1) {
						$("#errorMessages").append(minute + "分");
					}
					$("#errorMessages").append(second + "秒！");
					return;
				}
				$.cookie('recordDate',null,{expires : -1});
				$.cookie('errorState',null,{expires : -1});
				errorNumber = 0;
			}
			if (username == "") {
				$("#errorMessages").html("请输入用户名！");
				return;
			}
			if (password == "") {
				$("#errorMessages").html("请输入密码！");
				return;
			}
			$.ajax({
				type:"post",
				url:"user/login",
				async:false,
				datatype:"json",
				data:{
					username:username,
					password:password
				},
				success:function(data){
					if (data != -1) {
						$.cookie('username', username, {expires:2,path:"/"});
						if ($("#rememberPassword").is(':checked')) {
							$.cookie('password', password, {expires:2});
						} else {
							if ($.cookie('password')) {
								$.cookie('password',null,{expires : -1});
							}
						}
						$(location).attr('href', 'index.html');	
						return;
					}
					errorNumber = errorNumber + 1;
					if (errorNumber >= 5) {
						$("#errorMessages").html("错误登录已满5次！请五分钟之后再登录！");
						var recordDate = new Date();
						$.cookie('recordDate', recordDate, {expires:2});
						$.cookie('errorState', 1, {expires:2});
						return;
					}
					$("#errorMessages").html("用户名或密码错误！！！");
				}
			})
		});
})

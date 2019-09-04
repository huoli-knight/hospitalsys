$(function() {

	$.ajax({
			type : "get",
			url : "template/getdata",
			dataType : "json",
			async : false,
			success : function(data) {
				$("#datanumber").html(data.length);
				var scope,recordtype;
				//var time = new Date();
				for (var i = 0; i < data.length; i++) {
					var time = new Date(data[i].creationtime);
					if(data[i].scope==1)
						scope = "个人";
					else if(data[i].scope==2)
						scope = "科室";
					else
						scope = "全院";
					if(data[i].recordtype==1)
						recordtype = "检查";
					else if(data[i].recordtype==2)
						recordtype = "检验";
					else
						recordtype = "处置";
					
					//alert(data[i].ID + "ID");
					$("#sysData").append(
							"<tr class=\"text-c\">"
							+"<td  name=\"inf\" id=\""+data[i].id+"\">"
							+ data[i].name
							+ "</td>" + "<td>"
							+ time.toLocaleString()
							+"</td>"+ "<td>"
							+ scope
							+ "</td>" + "<td>"
							+ recordtype
							+ "</td>" + "</tr>");
				}
				
				$("[name='inf']").click(function(){
					$("#noPopUp").css("display","none");
					$("#popUp2").css("display","block");
					//var id = dianji(id);
					
					
					//var id = e.target.id;
					var id=$(this).attr("id");
					//alert(id);
					$("[name='x']").remove();
					var x = 0;
					for(var i=0;i<data.length;i++){
						if(data[i].id<id)
							x++;
					}
					var _time = new Date(data[x].creationtime);
				    var   year=_time.getFullYear();
				    var   month=_time.getMonth()+1;
				    var   date=_time.getDate();
				    var   hour=_time.getHours();
				    var   minute=_time.getMinutes();
				    var   second=_time.getSeconds();
					//alert("2");
					
					$("#p1").append("<input type=\"text\" name=\"x\" class=\"Sname\" value=\""+data[x].name+"\">");
					$("#p4").append("<input type=\"text\" name=\"x\" disabled  value=\""+year+"/"+month+"/"+date+"/   "+hour+":"+minute+":"+second+"\" >");
					$("#p2").append("<input type=\"text\" name=\"x\" class=\"Sscope\" value=\""+data[x].scope+"\">");
					$("#p3").append("<input type=\"text\" name=\"x\" class=\"Srecordtype\" value=\""+data[x].recordtype+"\">");
					
					$.ajax({
						type:"post",
						url:"template/getRelation",
						dataType:"json",
						async:false,
						data:{
							checktempid:id
						},
						beforeSend:function(){
							$("#addTips").html("正在保存，请稍后...");
						//	$("#save").attr({ disabled: "disabled" });
						},
						success:function(data) {
							$("#sysData2").empty();
							$("#datanumber2").html(data.length);
							for(var i=0;i<data.length;i++){
								$("#sysData2").append(
										"<tr class=\"text-c\">"
										+"<td>"
										+ data[i].itemcode
										+ "</td>" + "<td>"
										+ data[i].itemname
										+"</td>"+ "<td>"
										+ data[i].format
										+ "</td>" + "<td>"
										+ data[i].position
										+ "</td>" + "<td>"
										//+"<input type=\"button\" value=\"删除3\" onclick=\"delete3();\" class=\"delete2\" id=\""+data[i].id+"\">"
										+ "<input type=\"button\" value=\"删除\" class=\"delete2\" id=\""+data[i].id+"\">"
										+ "</td>" + "</tr>");
							}

						},
						complete:function(XMLHttpRequest, textStatus) {
							//window.location.reload();
						}
					})
				$("#submit2").click(function(){
					var checktempid = id;
					var checkprojid = $(".code").val();
					var  position= $(".position").val();
					if (checkprojid == ""|| position == "") {
						alert("输入为空！请输入！");
						return;
					}
					$.ajax({
						type:"post",
						url:"template/addProj",
						dataType:"json",
						async:false,
						data:{
							checktempid:checktempid,
							checkprojid:checkprojid,
							position:position
						},
						beforeSend:function(){
							$("#addTips").html("正在添加，请稍后...");
							//$("#submit").attr({ disabled: "disabled" });
						},
						success:function(data) {
							if(data.result == "1") {
								alert("添加成功");
								//$("#addTips").html("");
								$("#popUp3").css("display","none");
							}
							else if (data[0].result == "0") {
								$("#addTips").html("类别名称不存在！！！");
							}
							else if (data[0].result == 0) {
								$("#addTips").html("添！请重试！");
							}
							else {
								$("#addTips").html("4添！请重试！");
							}
						},
						complete:function(XMLHttpRequest, textStatus) {
							$.ajax({
								type:"post",
								url:"template/getRelation",
								dataType:"json",
								async:false,
								data:{
									checktempid:id
								},
								beforeSend:function(){
									$("#addTips").html("正在保存，请稍后...");
								//	$("#save").attr({ disabled: "disabled" });
								},
								success:function(data) {
										$("#sysData2").empty();
										$("#datanumber2").html(data.length);
										for(var i=0;i<data.length;i++){
											$("#sysData2").append(
													"<tr class=\"text-c\">"
													+"<td>"
													+ data[i].itemcode
													+ "</td>" + "<td>"
													+ data[i].itemname
													+"</td>"+ "<td>"
													+ data[i].format
													+ "</td>" + "<td>"
													+ data[i].position
													+ "</td>" + "<td>"
													+ "<input type=\"button\" value=\"删除\" class=\"delete2\" id=\""+data[i].id+"\">"
													//+"<button onclick=\"Delete()\" id=\""+data[i].id+"\">复制文本</button>"
													+ "</td>" + "</tr>");
										}

								},
								complete:function(XMLHttpRequest, textStatus) {
									//window.location.reload();
								}
							})
						}
					})
				});

				$("#save").click(function(){
						//alert(id);
						var name = $(".Sname").val();
						//var creationtime = $(".creationtime").val();
						var scope = $(".Sscope").val();
						var recordtype = $(".Srecordtype").val();
						//var id = e.target.id;
						if (name == ""|| scope == ""|| recordtype == "" ) {
							$("#addTips").html("输入为空！请输入！");
							return;
						}
				  $.ajax({
					type:"post",
					url:"template/saveTemplate",
					dataType:"json",
					async:false,
					data:{
						id:id,
						name:name,
						scope:scope,
						recordtype:recordtype
					},
					beforeSend:function(){
						$("#addTips").html("正在保存，请稍后...");
					//	$("#save").attr({ disabled: "disabled" });
					},
					success:function(data) {
						if(data.result == "1") {
							$("#tips").html("保存成功！");
							$("#addTips").html("");
							$("#popUp2").css("display","none");
						}
						else if (data[0].result == "0") {
							$("#addTips").html("类别名称不存在！！！");
						}
						else if (data[0].result == 0) {
							$("#addTips").html("添！请重试！");
						}
						else {
							$("#addTips").html("4！请重试！");
						}
					},
					complete:function(XMLHttpRequest, textStatus) {
						alert("保存成功");
						window.location.reload();
					}
				})
			});
				
				$("#delete").click(function() {
					
					$.ajax({
						type:"post",
						url:"template/delete",
						dataType:"json",
						async:true,
						data: {
							id:id
						},
						beforeSend: function(){
							$("#tips").html("正在处理，请稍后...");
							//$("#delete").attr({ disabled: "disabled" });
						},
						success:function(data) {
							if (data.result==1) {
								alert("删除成功");
							} else {
								$("#tips").html("删除失败！数据可能已被修改！请刷新重试！");
							}				
						},
						error:function(data) {
							$("#tips").html("连接出错！删除失败！请刷新重试！");
						},
						complete:function(XMLHttpRequest, textStatus) {
							window.location.reload();
						}
					})
				});

				
				$("#sysData2").on('click','.delete2',function() {
					//alert("!");
					var id2=$(this).attr("id");	
					//alert(id2);
					$.ajax({
						type:"post",
						url:"template/delete2",
						dataType:"json",
						async:true,
						data: {
							id:id2
						},
						beforeSend: function(){
							$("#tips").html("正在处理，请稍后...");
							//$("#delete").attr({ disabled: "disabled" });
						},
						success:function(data) {
							if (data.result==1) {
								alert("删除成功");
							} else {
								$("#tips").html("删除失败！数据可能已被修改！请刷新重试！");
							}				
						},
						error:function(data) {
							$("#tips").html("连接出错！删除失败！请刷新重试！");
						},
						complete:function(XMLHttpRequest, textStatus) {
							$.ajax({
								type:"post",
								url:"template/getRelation",
								dataType:"json",
								async:false,
								data:{
									checktempid:id
								},
								beforeSend:function(){
									$("#addTips").html("正在保存，请稍后...");
								//	$("#save").attr({ disabled: "disabled" });
								},
								success:function(data) {
									$("#sysData2").empty();
									$("#datanumber2").html(data.length);
									for(var i=0;i<data.length;i++){
										$("#sysData2").append(
												"<tr class=\"text-c\">"
												+"<td>"
												+ data[i].itemcode
												+ "</td>" + "<td>"
												+ data[i].itemname
												+"</td>"+ "<td>"
												+ data[i].format
												+ "</td>" + "<td>"
												+ data[i].position
												+ "</td>" + "<td>"
												+ "<input type=\"button\" value=\"删除\" class=\"delete2\" id=\""+data[i].id+"\">"
												+ "</td>" + "</tr>");
									}

								},
								complete:function(XMLHttpRequest, textStatus) {
									//window.location.reload();
								}
							})
						}
					})
				});
				

			
		})
			
	},
				
  });

	
	
	$("#searchbutton").click(function() {
		var scope = $("#scope").val() + "";
		var recordtype = $("#recordtype").val();
		var name = $("#name").val();
		if (name == ""&&scope=="0"&&recordtype==0) {
			window.location.reload();
			//$("#tips").html("&nbsp;提示：输入为空!!");
			return;
		}
		$("#tips").html("");
		$.ajax({
			type : "post",
			url : "template/searchTemplateData",		
			dataType : "json",
			async : false,
			data: {
				scope:scope,
				recordtype:recordtype,
				name:name
			},
			success : function(data) {
				$("#datanumber").html(data.length);
				$("#sysData").html("");
				//var time = new Date();
				var scope,recordtype;
				for (var i = 0; i < data.length; i++) {
					var time = new Date(data[i].creationtime);
					if(data[i].scope==1)
						scope = "个人";
					else if(data[i].scope==2)
						scope = "科室";
					else
						scope = "全院";
					if(data[i].recordtype==1)
						recordtype = "检查";
					else if(data[i].recordtype==2)
						recordtype = "检验";
					else
						recordtype = "处置";
					
					$("#sysData").append(
							"<tr class=\"text-c\">"
							+"<td id=\""+data[i].id+"\" name=\"inf\">"
							+ data[i].name
							+ "</td>" + "<td>"
							+ time.toLocaleString()+ "</td>"
							+ "<td>"
							+ scope
							+ "</td>" + "<td>"
							+ recordtype
							+ "</td>" + "</tr>");
				}
				$("[name='inf']").click(function(e){
					$("#noPopUp").css("display","none");
					$("#popUp2").css("display","block");
					$("[name='x']").remove();
					var id = e.target.id;
					var x = 0;
					for(var i=0;i<data.length;i++){
						if(data[i].id<id)
							x++;
					}	
					var _time = new Date(data[x].creationtime);
				    var   year=_time.getFullYear();
				    var   month=_time.getMonth()+1;
				    var   date=_time.getDate();
				    var   hour=_time.getHours();
				    var   minute=_time.getMinutes();
				    var   second=_time.getSeconds();
					//alert("2");
					
					$("#p1").append("<input type=\"text\" name=\"x\" class=\"Sname\" value=\""+data[x].name+"\" >");
					$("#p4").append("<input type=\"text\" name=\"x\" disabled  value=\""+year+"/"+month+"/"+date+"/   "+hour+":"+minute+":"+second+"\" >");
					$("#p2").append("<input type=\"text\" name=\"x\" class=\"Sscope\" value=\""+data[x].scope+"\">");
					$("#p3").append("<input type=\"text\" name=\"x\" class=\"Srecordtype\" value=\""+data[x].recordtype+"\">");
					
					$.ajax({
						type:"post",
						url:"template/getRelation",
						dataType:"json",
						async:false,
						data:{
							checktempid:id
						},
						beforeSend:function(){
							$("#addTips").html("正在保存，请稍后...");
						//	$("#save").attr({ disabled: "disabled" });
						},
						success:function(data) {
							$("#sysData2").empty();
							$("#datanumber2").html(data.length);
							for(var i=0;i<data.length;i++){
								$("#sysData2").append(
										"<tr class=\"text-c\">"
										+"<td>"
										+ data[i].itemcode
										+ "</td>" + "<td>"
										+ data[i].itemname
										+"</td>"+ "<td>"
										+ data[i].format
										+ "</td>" + "<td>"
										+ data[i].position
										+ "</td>" + "<td>"
										+ "<input type=\"button\" value=\"删除\" class=\"delete2\" id=\""+data[i].id+"\">"
										+ "</td>" + "</tr>");
							}

						},
						complete:function(XMLHttpRequest, textStatus) {
							//window.location.reload();
						}
					})
				$("#submit2").click(function(){
					var checktempid = id;
					var checkprojid = $(".code").val();
					var  position= $(".position").val();
					if (checkprojid == ""|| position == "") {
						alert("输入为空！请输入！");
						return;
					}
					$.ajax({
						type:"post",
						url:"template/addProj",
						dataType:"json",
						async:false,
						data:{
							checktempid:checktempid,
							checkprojid:checkprojid,
							position:position
						},
						beforeSend:function(){
							$("#addTips").html("正在添加，请稍后...");
							//$("#submit").attr({ disabled: "disabled" });
						},
						success:function(data) {
							if(data.result == "1") {
								alert("添加成功");
								//$("#addTips").html("");
								$("#popUp3").css("display","none");
							}
							else if (data[0].result == "0") {
								$("#addTips").html("类别名称不存在！！！");
							}
							else if (data[0].result == 0) {
								$("#addTips").html("添！请重试！");
							}
							else {
								$("#addTips").html("4添！请重试！");
							}
						},
						complete:function(XMLHttpRequest, textStatus) {
							$.ajax({
								type:"post",
								url:"template/getRelation",
								dataType:"json",
								async:false,
								data:{
									checktempid:id
								},
								beforeSend:function(){
									$("#addTips").html("正在保存，请稍后...");
								//	$("#save").attr({ disabled: "disabled" });
								},
								success:function(data) {
									$("#sysData2").empty();
									$("#datanumber2").html(data.length);
									for(var i=0;i<data.length;i++){
										$("#sysData2").append(
												"<tr class=\"text-c\">"
												+"<td>"
												+ data[i].itemcode
												+ "</td>" + "<td>"
												+ data[i].itemname
												+"</td>"+ "<td>"
												+ data[i].format
												+ "</td>" + "<td>"
												+ data[i].position
												+ "</td>" + "<td>"
												+ "<input type=\"button\" value=\"删除\" class=\"delete2\" id=\""+data[i].id+"\">"
												+ "</td>" + "</tr>");
									}

								},
								complete:function(XMLHttpRequest, textStatus) {
									//window.location.reload();
								}
							})
						}
					})
				});
					
					$("#save").click(function(){
						
						var name = $(".Sname").val();
						//var creationtime = $(".creationtime").val();
						var scope = $(".Sscope").val();
						var recordtype = $(".Srecordtype").val();
						//var id = e.target.id;
						if (name == ""|| scope == ""|| recordtype == "" ) {
							$("#addTips").html("输入为空！请输入！");
							return;
						}
						$.ajax({
							type:"post",
							url:"template/saveTemplate",
							dataType:"json",
							async:false,
							data:{
								id:id,
								name:name,
								scope:scope,
								recordtype:recordtype
							},
							beforeSend:function(){
								$("#addTips").html("正在保存，请稍后...");
								$("#save").attr({ disabled: "disabled" });
							},
							success:function(data) {
								if(data.result == "1") {
									$("#tips").html("保存成功！");
									$("#addTips").html("");
									$("#popUp2").css("display","none");
								}
								else if (data[0].result == "0") {
									$("#addTips").html("类别名称不存在！！！");
								}
								else if (data[0].result == 0) {
									$("#addTips").html("添！请重试！");
								}
								else {
									$("#addTips").html("4！请重试！");
								}
							},
							complete:function(XMLHttpRequest, textStatus) {
								window.location.reload();
							}
						})
					});
				$("#delete").click(function() {
						
						$.ajax({
							type:"post",
							url:"template/delete",
							dataType:"json",
							async:true,
							data: {
								id:id
							},
							beforeSend: function(){
								$("#tips").html("正在处理，请稍后...");
								//$("#delete").attr({ disabled: "disabled" });
							},
							success:function(data) {
								if (data.result==1) {
									alert("删除成功");
								} else {
									$("#tips").html("删除失败！数据可能已被修改！请刷新重试！");
								}				
							},
							error:function(data) {
								$("#tips").html("连接出错！删除失败！请刷新重试！");
							},
							complete:function(XMLHttpRequest, textStatus) {
								window.location.reload();
							}
						})
					});
					
		
				
				$("#sysData2").on('click','.delete2',function() {
					//alert("!");
					var id2=$(this).attr("id");	
					//alert(id2);
					$.ajax({
						type:"post",
						url:"template/delete2",
						dataType:"json",
						async:true,
						data: {
							id:id2
						},
						beforeSend: function(){
							$("#tips").html("正在处理，请稍后...");
							//$("#delete").attr({ disabled: "disabled" });
						},
						success:function(data) {
							if (data.result==1) {
								alert("删除成功");
							} else {
								$("#tips").html("删除失败！数据可能已被修改！请刷新重试！");
							}				
						},
						error:function(data) {
							$("#tips").html("连接出错！删除失败！请刷新重试！");
						},
						complete:function(XMLHttpRequest, textStatus) {
							$.ajax({
								type:"post",
								url:"template/getRelation",
								dataType:"json",
								async:false,
								data:{
									checktempid:id
								},
								beforeSend:function(){
									$("#addTips").html("正在保存，请稍后...");
								//	$("#save").attr({ disabled: "disabled" });
								},
								success:function(data) {
									$("#sysData2").empty();
									$("#datanumber2").html(data.length);
									for(var i=0;i<data.length;i++){
										$("#sysData2").append(
												"<tr class=\"text-c\">"
												+"<td>"
												+ data[i].itemcode
												+ "</td>" + "<td>"
												+ data[i].itemname
												+"</td>"+ "<td>"
												+ data[i].format
												+ "</td>" + "<td>"
												+ data[i].position
												+ "</td>" + "<td>"
												+ "<input type=\"button\" value=\"删除\" class=\"delete2\" id=\""+data[i].id+"\">"
												+ "</td>" + "</tr>");
									}

								},
								complete:function(XMLHttpRequest, textStatus) {
									//window.location.reload();
								}
							})
						}
					})
				});
					
				})
			}
		})
	});
	
	
	$("#addition").click(function() {
		$("#popUp").css("display","block");	
		$("#noPopUp").css("display","none");
	});
	$("#addition2").click(function() {
		$("#popUp3").css("display","block");	
		//$("#noPopUp").css("display","none");
	});
	

	//$("#addTips").html("添！！");
	$("#submit").click(function(){
		
		var name = $(".name").val();
		//var creationtime = $(".creationtime").val();
		var scope = $(".scope").val();
		var recordtype = $(".recordtype").val();
		if (name == ""|| scope == ""|| recordtype == "" ) {
			$("#addTips").html("输入为空！请输入！");
			return;
		}
		$.ajax({
			type:"post",
			url:"template/addTemplate",
			dataType:"json",
			async:false,
			data:{
				name:name,
				scope:scope,
				recordtype:recordtype
			},
			beforeSend:function(){
				$("#addTips").html("正在添加，请稍后...");
				$("#submit").attr({ disabled: "disabled" });
			},
			success:function(data) {
				if(data.result == "1") {
					alert("添加成功");
					$("#addTips").html("");
					$("#popUp").css("display","none");
				}
				else if (data[0].result == "0") {
					$("#addTips").html("类别名称不存在！！！");
				}
				else if (data[0].result == 0) {
					$("#addTips").html("添！请重试！");
				}
				else {
					$("#addTips").html("4添！请重试！");
				}
			},
			complete:function(XMLHttpRequest, textStatus) {
				window.location.reload();
			}
		})
	});
	
	
	
	$("#cancel").click(function(){

		$("#popUp").css("display","none");
		window.location.reload();
	});
	
	$("#cancel2").click(function(){

		$("[name='x']").remove();
		window.location.reload();
		$("#popUp2").css("display","none");
	});
	
	$("#cancel3").click(function(){

		$("#popUp3").css("display","none");
	});

	
	
	function judgeNull(state) {
		if (state == null) {
			return "false";
		}
		if (state == "") {
			alert("输入为空！");
			return "false";
		}
		return "ture";
	}
	

	
})


	

	 

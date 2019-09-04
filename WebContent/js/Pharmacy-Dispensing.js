//发药查找
$(function(){
	
  $("#lookup").click(function(){ 
	  var CaseNumber=$('#code').val();
	  $("#J_tab_fam  tr:not(:first)").html("");  
	 
	  if(CaseNumber==""){
		  layer.msg("请输入病历号");   
		  return;}
	  $.ajax({
		  type:"get",
		  url:"PDgetdata?casenumber="+CaseNumber,
		  dataType:"json",
		  async:false,
		  success:function(data){         
			$("#number").html(data.length);    
			var state = "";
			var youWant = "";
			var time = new Date();
			for(var i=0;i<data.length;i++){
				
				time = new Date(data[i].registtime);
				time.toLocaleString();
				
				var d = new Date(time);  
				youWant=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();  
				
				if (data[i].state == "3") {
					state = "未发药";
				}
				else if(data[i].state == "4"){
					state = "已发药";
				}  
				
				
				$("#sysData").append("<tr class=\"text-c\">"+
				"<td><input type=\"checkbox\" value=\"" +data[i].id  + "\" name='myname'></td>"+
				"<td>" + data[i].casenumber + "</td>"+
				"<td>" + data[i].realname + "</td>" +
				"<td class=\"text-l\">" + youWant + "</td>" +
				"<td>" + data[i].name + "</td>" +
				"<td>" + data[i].drugsformat + "</td>" +
				"<td>" + data[i].manufacturer + "</td>" +
				"<td>" + data[i].drugsunit + "</td>" +    
				"<td>" + data[i].amount + "</td>" +
				"<td id=\"state\">" + state + "</td>" +
				"</tr>");
			
			}
		  }    
		});     
	 
  });
  
  
$("#screen").click(function(){
	  
	  var CaseNumber=$('#code').val();
	  if(CaseNumber==""){
		  layer.msg("病历号不为空");
		  return;}
	  var min=$("#logmin").val();
	  var max=$("#logmax").val();
	  if(min==""){
		  layer.msg("日期范围不为空");    
		  return;}
	  if(max==""){
		  layer.msg("日期范围不为空");
		  return;}
	  $.ajax({
		  type:"get",
		  url:"PDgetdataAndDate?casenumber="+CaseNumber+"&min="+min+"&max="+max,
		  dataType:"json",
		  async:false,
		  success:function(data){
			$("#number").html(data.length);
			var state = "";
			var youWant = "";
			var time = new Date();
			$("#sysData").html("");   
			for(var i=0;i<data.length;i++){
				
				time = new Date(data[i].registtime);
				time.toLocaleString();
				
				var d = new Date(time);  
				youWant=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();  
				
				if (data[i].state == "3") {
					state = "未发药";
					$("#sysData").append("<tr class=\"text-c\">"+
							"<td><input type=\"checkbox\" value="+data[i].id+" name='myname'></td>"+
							"<td>" + data[i].casenumber + "</td>"+
							"<td>" + data[i].realname + "</td>" +
							"<td class=\"text-l\">" + youWant + "</td>" +
							"<td>" + data[i].name + "</td>" +
							"<td>" + data[i].drugsformat + "</td>" +
							"<td>" + data[i].manufacturer + "</td>" +
							"<td>" + data[i].drugsunit + "</td>" +
							"<td>" + data[i].amount + "</td>" +
							"<td id=\"state\">" + state + "</td>" +
							"<td class=\"f-14 td-manage\">" + "<font color='red'>未发药，无法退药</font>" +
							"</td>" +"</tr>");
				}    
				else {    
					state = "已发药";
					$("#sysData").append("<tr class=\"text-c\">"+
							"<td><input type=\"checkbox\" value="+data[i].id+" name='myname'></td>"+
							"<td>" + data[i].casenumber + "</td>"+
							"<td>" + data[i].realname + "</td>" +
							"<td class=\"text-l\">" + youWant + "</td>" +
							"<td>" + data[i].name + "</td>" +
							"<td>" + data[i].drugsformat + "</td>" +
							"<td>" + data[i].manufacturer + "</td>" +
							"<td>" + data[i].drugsunit + "</td>" +
							"<td>" + data[i].amount + "</td>" +
							"<td id=\"state\">" + state + "</td>" +
							"<td class=\"f-14 td-manage\">" + "<button id=\"distribute\" class=\"btn btn-success\" type=\"submit\"> 退药</button>" +
							"</td>" +"</tr>");
				}        
				
			}
		},
		error:function(data){
			$("#amount").html(6);
		}
	  })  
	  
	  
	
  });
  
  $("#distribute").click(function(){
	  
	  var obj = document.getElementsByName("myname");//返回勾选的指定名称的集合
      var str="";
      var check_arr = [];
      for (var i = 0; i < obj.length; i++) {
          if (obj[i].checked){
             str=str+obj[i].value+",";
             check_arr.push(obj[i].value);
          }
      }
      if(check_arr.length==0){  
    	  layer.msg("请选中要发药的");  
    	  return;
      } 
//      if(data[i].state == "4"){
//		  layer.msg("已经发过药了！");
//		  return;
//	  }
      $.ajax({
		  type:"get",
		  url:"toY?number="+$("#code")+"&ids="+str,
		  dataType:"text",
		  async:false,      
		  success:function(data){    
			  
			 
			  layer.alert("发药成功");  
			  $("#sysData").html("");
			  var CaseNumber=$('#code').val();
			  $("#J_tab_fam  tr:not(:first)").html("");  
			  if(CaseNumber==""){return;}
			  $.ajax({
				  type:"get",
				  url:"PDgetdata?casenumber="+CaseNumber,
				  dataType:"json",
				  async:false,
				  success:function(data){    
					$("#number").html(data.length);    
					var state = "";
					var youWant = "";
					var time = new Date();
					for(var i=0;i<data.length;i++){
						
						time = new Date(data[i].registtime);
						time.toLocaleString();
						
						var d = new Date(time);  
						youWant=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();  
						
						if (data[i].state == "3") {
							state = "未发药";
						}
						else if(data[i].state == "4"){
							state = "已发药";
						}  
						
						
						$("#sysData").append("<tr class=\"text-c\">"+
						"<td><input type=\"checkbox\" value=\"" +data[i].id  + "\" name='myname'></td>"+
						"<td>" + data[i].casenumber + "</td>"+
						"<td>" + data[i].realname + "</td>" +
						"<td class=\"text-l\">" + youWant + "</td>" +
						"<td>" + data[i].name + "</td>" +
						"<td>" + data[i].drugsformat + "</td>" +
						"<td>" + data[i].manufacturer + "</td>" +
						"<td>" + data[i].drugsunit + "</td>" +    
						"<td>" + data[i].amount + "</td>" +
						"<td id=\"state\">" + state + "</td>" +
						"</tr>");
					
					}
				  }    
				});         
		  }
      })
	  
  });
  
  
  
//发药操作
//$("#distribute").click(function(){
//	  
//	  var selectAll = document.getElementsByName("selectData");  
//	  var selectData = {};
//	  var key = "key";
//	  var i = 0;
//	  var state = key + i;
//	  
//	  for (data in selectAll) {
//			if (selectAll[data].checked) {
//				selectData[state] = selectAll[data].value;
//				i++;
//				state = key + i;
//			}
//		}
//		selectData["number"] = i;
//		if (selectData.length == 1) {
//			$("#tips").html("请选择数据！");
//			return;
//		}
//		if (!confirm("发药！")) {
//			return;
//		}
//		if ($("#selectAll").prop("checked")) {
//			if (!confirm("全部发药！")) {
//				return;
//			}
//		}
//		$.ajax({
//			type:"post",
//			url:"Drugs",
//			dataType:"json",
//			async:true,
//			data: selectData,
////			beforeSend: function(){
////				$("#tips").html("正在处理，请稍后...");
////				$("#delete").attr({ disabled: "disabled" });
////			},
//			success:function(data) {
//				if (data.result) {
//					$("#tips").html("发药成功！");
//				} else {
//					$("#tips").html("发药失败！");
//				}				
//			},
////			error:function(data) {
////				$("#tips").html("连接出错！发药失败！请刷新重试！");
////			},
////			complete:function(XMLHttpRequest, textStatus) {
////				$("#distribute").removeAttr("disabled");
////			}
//		})
//	 
//	  
//});
  


 
  $("#search").click(function(){ 
	  var CaseNumber=$('#Anamnesis').val();
	  $("#form1  tr:not(:first)").html("");  
	  if(CaseNumber==""){return;}
	  $.ajax({
		  type:"get",
		  url:"PDgetdata?casenumber="+CaseNumber,
		  dataType:"json",
		  async:false,
		  success:function(data){
			$("#number").html(data.length);
			var state = "";
			var youWant = "";
			var time = new Date();
			for(var i=0;i<data.length;i++){
				
				time = new Date(data[i].registtime);
				time.toLocaleString();
				
				var d = new Date(time);  
				youWant=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();  
				
				if (data[i].state == "3") {
					state = "未发药";
				}
				else if(data[i].state == "4"){     
					state = "已发药";
				}
				$("#Data1").append("<tr class=\"text-c\">"+
				"<td><input type=\"checkbox\" value="+data[i].id+" name='myname'></td>"+
				"<td>" + data[i].casenumber + "</td>"+
				"<td>" + data[i].realname + "</td>" +
				"<td class=\"text-l\">" + youWant + "</td>" +
				"<td>" + data[i].name + "</td>" +
				"<td>" + data[i].drugsformat + "</td>" +
				"<td>" + data[i].manufacturer + "</td>" +
				"<td>" + data[i].drugsunit + "</td>" +
				"<td>" + data[i].amount + "</td>" +
				"<td id=\"state\">" + state + "</td>" +
				"<td class=\"f-14 td-manage\">" + "<button id=\"distribute\" class=\"btn btn-success\" type=\"submit\"> 退药</button>" +
				"</td>" +"</tr>");
			}
		},
		error:function(data){
			$("#amount").html(6);
		}
	  })  
  });
        

  
});
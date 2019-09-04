$(function(){
	$("#search").click(function(){ 
		  var CaseNumber=$('#Anamnesis').val();
		  $("#form1  tr:not(:first)").html("");  
		  if(CaseNumber==""){return;}
		  $.ajax({
			  type:"get",
			  url:"PRgetdata?casenumber="+CaseNumber,
			  dataType:"json",
			  async:false,
			  success:function(data){
				$("#amount").html(data.length);
				var state = "";
				var youWant = "";
				var time = new Date();
				for(var i=0;i<data.length;i++){
					
					time = new Date(data[i].registtime);
					time.toLocaleString();
					
					var d = new Date(time);  
					youWant=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();  
					
//					if (data[i].state == "5") {
//						state = "已退药";
//					}
//					else if(data[i].state == "4"){     
//						state = "已发药";
//					}
//					$("#Data1").append("<tr class=\"text-c\">"+
//					"<td><input type=\"checkbox\" value="+data[i].id+" name='myname'></td>"+
//					"<td>" + data[i].casenumber + "</td>"+
//					"<td>" + data[i].realname + "</td>" +
//					"<td class=\"text-l\">" + youWant + "</td>" +
//					"<td>" + data[i].name + "</td>" +
//					"<td>" + data[i].drugsformat + "</td>" +
//					"<td>" + data[i].manufacturer + "</td>" +
//					"<td>" + data[i].drugsunit + "</td>" +
//					"<td>" + data[i].amount + "</td>" +
//					"<td id=\"state\">" + state + "</td>" +
//					"<td class=\"f-14 td-manage\">" + "<button id=\"distribute\" class=\"btn btn-success\" type=\"submit\"> 退药</button>" +
//					"</td>" +"</tr>");
					
					if (data[i].state == "5") {
						state = "已退药";
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
								"<td class=\"f-14 td-manage\">" + "<font color='red'>已退药成功</font>" +
								"</td>" +"</tr>");
					}    
					else {    
						state = "已发药";
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
								"<td class=\"f-14 td-manage\">" + "<font color='red'>可退药</font>" +
								"</td>" +"</tr>");
					}        
					
				}
			},
			error:function(data){
				$("#amount").html(6);
			}
		  })  
	  });
	
	//test
	  $("#return").click(function(){
		  
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
	    	  layer.msg("请选中要退药的");  
	    	  return;
	      } 
//	      if(data[i].state == "4"){
//			  layer.msg("已经发过药了！");
//			  return;
//		  }
	      $.ajax({
			  type:"get",
			  url:"returndrugs?number="+$("#Anamnesis")+"&ids="+str,
			  dataType:"text",
			  async:false,      
			  success:function(data){    
				  
				 
				  layer.alert("退药成功");  
				  $("#Data1").html("");
				  var CaseNumber=$('#Anamnesis').val();
				  $("#form1  tr:not(:first)").html("");  
				  if(CaseNumber==""){return;}
				  
				  var drugsdata = new Array();  //先声明一维
					for(var k=0;k<i;k++){    //一维长度为i,i为变量，可以根据实际情况改变
					 
						drugsdata[k]=new Array();  //声明二维，每一个一维数组里面的一个元素都是一个数组；
					 
					for(var j=0;j<p;j++){   //一维数组里面每个元素数组可以包含的数量p，p也是一个变量；
					 
						drugsdata[k][j]="";    //这里将变量初始化，我这边统一初始化为空，后面在用所需的值覆盖里面的值
					 }
					}
					
					
				  $.ajax({
					  type:"get",
					  url:"PRgetdata?casenumber="+CaseNumber,
					  dataType:"json",
					  async:false,
					  success:function(data){    
						$("#amount").html(data.length);    
						var state = "";
						var youWant = "";
						var time = new Date();
						for(var i=0;i<data.length;i++){
							
							time = new Date(data[i].registtime);
							time.toLocaleString();
							
							var d = new Date(time);  
							youWant=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();  
							
							if (data[i].state == "5") {
								state = "已退药";
							}
							else if(data[i].state == "4"){
								state = "已发药";
							}  
							

							
							
							
							
							if (data[i].state == "5") {
								state = "已退药";
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
										"<td class=\"f-14 td-manage\">" + "<font color='red'>已退药成功</font>" +
										"</td>" +"</tr>");
							}    
							else {    
								state = "已发药";
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
										"<td class=\"f-14 td-manage\">" + "<font color='red'>可退药</font>" +
										"</td>" +"</tr>");
							}        
						
						}
					  }    
					});         
			  }
	      })
		  
	  });
	  
	
	
	$("#screen").click(function(){
		  
		  var CaseNumber=$('#Anamnesis').val();
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
			  url:"PRgetdataAndDate?casenumber="+CaseNumber+"&min="+min+"&max="+max,
			  dataType:"json",
			  async:false,
			  success:function(data){
				$("#amount").html(data.length);
				var state = "";
				var youWant = "";
				var time = new Date();
				$("#Data1").html("");   
				for(var i=0;i<data.length;i++){
					
					time = new Date(data[i].registtime);
					time.toLocaleString();
					
					var d = new Date(time);  
					youWant=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();  
					
					if (data[i].state == "5") {
						state = "已退药";
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
								"<td class=\"f-14 td-manage\">" + "<font color='red'>已退药成功</font>" +
								"</td>" +"</tr>");
					}    
					else {    
						state = "已发药";
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
								"<td class=\"f-14 td-manage\">"+ "<font color='red'>可退药</font>" +
								"</td>" +"</tr>");
					}        
					
				}
			},
			error:function(data){
				$("#amount").html(6);
			}
		  })  
		  
		  
		
	  });
	  
	        
})
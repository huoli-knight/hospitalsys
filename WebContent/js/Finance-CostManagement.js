$(function(){
	
	  $.ajax({
		  type:"get",
		  url:"FCMgetalldata",
		  dataType:"json",
		  async:false,
		  success:function(data){
			$("#number").html(data.length);
			for(var i=0;i<data.length;i++){
				$("#sysData").append("<tr class=\"text-c\">"+
				"<td><input type=\"checkbox\" value=\"\" name=\"\"></td>"+
				"<td>" + data[i].id + "</td>"+
				"<td>" + data[i].expcode + "</td>" +
				"<td class=\"text-l\">" + data[i].expname + "</td>" +
				"<td>" + data[i].delmark + "</td>" +"</tr>");
			}
		},
		error:function(data){
			$("#number").html(2);
		}
	  }) 
	
  $("#querysubjects").click(function(){
	  
	  var Expcode=$('#expcode').val();
	  $("#subjectstable  tr:not(:first)").html("");  
	  if(Expcode==""){return;}
	  $.ajax({
		  type:"get",
		  url:"FCMgetdata?expcode="+Expcode,
		  dataType:"json",
		  async:false,
		  success:function(data){
			$("#number").html(data.length);
			for(var i=0;i<data.length;i++){
				$("#sysData").append("<tr class=\"text-c\">"+
				"<td><input type=\"checkbox\" value=\"\" name=\"\"></td>"+
				"<td>" + data[i].id + "</td>"+
				"<td>" + data[i].expcode + "</td>" +
				"<td class=\"text-l\">" + data[i].expname + "</td>" +
				"<td>" + data[i].delmark + "</td>" +"</tr>");
			}
		},
		error:function(data){
			$("#number").html(2);
		}
	  })  
  });
	  
	  $("#add").click(function(){
		  var DID=$('#DID').val();
		  var Dcode=$('#Dcode').val();
		  var Dname=$('#Dname').val();
		  
		  if(DID==""){alert('ID不能为空');}
		  else if(Dcode==""){alert('费用科目编码不能为空');}
		  else if(Dname==""){alert('费用科目名称不能为空');}
		  
		  $.ajax({
			  type:"post",
			  url:"addDepartment",
			  dataType:"text",
			  async:false,
			  data:{
				  id:DID,
				  expcode:Dcode,
				  expname:Dname,
				},   
			  success:function(data){
				  layer.msg("添加科目成功"); 
				
			},
			error:function(data){
				alert("添加科目失败");
			}
		  })  
		  
		  
	  });
	  
	  
  
});
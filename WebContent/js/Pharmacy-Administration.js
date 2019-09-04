$(function(){
	
	window.onload = function(){
		page = new Page(30,'J_tab_fam','sysData'); };
	
	  $.ajax({
		  type:"get",
		  url:"PAgetalldata",
		  dataType:"json",
		  async:false,
		  success:function(data){
			$("#number").html(data.length);
			for(var i=0;i<data.length;i++){
				$("#sysData").append("<tr class=\"text-c\">"+
				"<td><input type=\"checkbox\" value="+ data[i].id +" name='myname'></td>"+
				"<td>" + data[i].drugscode + "</td>"+
				"<td>" + data[i].drugsname + "</td>" +
				"<td class=\"text-l\">" + data[i].drugsformat + "</td>" +
				"<td>" + data[i].drugsunit + "</td>" +
				"<td>" + data[i].drugsprice + "</td>" +
				"<td>" + data[i].constantname + "</td>" +
				"<td>" + data[i].drugsdosageid + "</td>" +"</tr>");
			}
		},
		error:function(data){
			$("#number").html(2);
		}
	  }) 
	
  $("#lookup").click(function(){
	  
	  var Mnemoniccode=$('#code').val();
	  $("#J_tab_fam  tr:not(:first)").html("");  
	  if(Mnemoniccode==""){return;}
	  $.ajax({
		  type:"get",
		  url:"PAgetdata?mnemoniccode="+Mnemoniccode,
		  dataType:"json",
		  async:false,
		  success:function(data){
			$("#number").html(data.length);
			for(var i=0;i<data.length;i++){
				$("#sysData").append("<tr class=\"text-c\">"+   
				"<td><input type=\"checkbox\" value="+ data[i].id +" name='myname'></td>"+
				"<td>" + data[i].drugscode + "</td>"+
				"<td>" + data[i].drugsname + "</td>" +
				"<td class=\"text-l\">" + data[i].drugsformat + "</td>" +
				"<td>" + data[i].drugsunit + "</td>" +
				"<td>" + data[i].drugsprice + "</td>" +
				"<td>" + data[i].constantname + "</td>" +
				"<td>" + data[i].drugsdosageid + "</td>" +"</tr>");
			}
		},
		error:function(data){
			$("#number").html(2);   
		}
	  })  
  });
  
  $("#deletebutton").click(function(){
	  
  });
  

  
  $("#add").click(function(){
	  var DrugCoding=$('#DrugCoding').val();
	  var Nameofdrug=$('#Nameofdrug').val();
	  var DrugSpecification=$('#DrugSpecification').val();
	  var Packagingunit=$('#Packagingunit').val();
	  var Manufacturer=$('#Manufacturer').val();
	  var Pdf=$('#P-d-f').val();
	  var Drugtypes=$('#Drugtypes').val();
	  var Dup=$('#D-u-p').val();
	  var Pmc=$('#P-m-c').val();
	  
	  if(DrugCoding==""){alert('药品编码不能为空');}
	  else if(Nameofdrug==""){alert('药品名称不能为空');}
	  else if(Dup==""){alert('药品单价不能为空');}
	  
	  $.ajax({
		  type:"post",
		  url:"add",
		  dataType:"text",
		  async:false,
		  data:{
			  drugscode:DrugCoding,
			  drugsname:Nameofdrug,
			  drugsformat:DrugSpecification,
			  drugsunit:Packagingunit,
			  manufacturer:Manufacturer,
			  drugsdosageid:Pdf,
			  drugstypeid:Drugtypes,  
			  drugsprice:Dup,
			  mnemoniccode:Pmc
			},   
		  success:function(data){
			  layer.msg("添加药品成功"); 
			/*$("#number").html(data.length);
			for(var i=0;i<data.length;i++){
				$("#sysData").append("<tr class=\"text-c\">"+
				"<td><input type=\"checkbox\" value=\"\" name=\"\"></td>"+
				"<td>" + data[i].drugscode + "</td>"+
				"<td>" + data[i].drugsname + "</td>" +
				"<td class=\"text-l\">" + data[i].drugsformat + "</td>" +
				"<td>" + data[i].drugsunit + "</td>" +
				"<td>" + data[i].drugsprice + "</td>" +
				"<td>" + data[i].constantname + "</td>" +
				"<td>" + data[i].drugsdosageid + "</td>" +
				"<td>" + "<button class=\"btn3\" data-title=\"编辑\" data-href=\"article-add.html\" href=\"javascript:;\">编辑</button>" +
				"<button class=\"btn4\" data-title=\"删除\" data-href=\"article-add.html\" href=\"javascript:;\"> 删除</button>" +
				"</td>" +"</tr>");
			}*/  
		},
		error:function(data){
			alert("添加药品失败");
		}
	  })  
	  
	  
  });
  
  
  
  /**
   * 删除js
   */
  $("#deletebutton").click(function(){   
	  
	  var obj = document.getElementsByName("myname");
      var str="";
      var check_arr = [];
      for (var i = 0; i < obj.length; i++) {
          if (obj[i].checked){
             str=str+obj[i].value+",";
             check_arr.push(obj[i].value);
          }
      }
      if(check_arr.length==0){  
    	  layer.msg("请选中要删除的");
    	  return;
      } 
      
      
      layer.confirm('确定删除选中的药品?', {
    	  title: false,
    	  btn: ['确定','取消'] 
    	  }, function(ind){
    		  $.ajax({
    			  type:"post",    
    			  url:"delete",   
    			  dataType:"text",
    			  async:false,   
    			  data:{
    				  deleteArrayStr:str 
    				},
    			  success:function(data){
    				  layer.alert("删除药品成功"); 
    				  var Mnemoniccode=$('#code').val();
    				  $("#J_tab_fam  tr:not(:first)").html("");  
    				  if(Mnemoniccode==""){return;}
    				  $.ajax({
    					  type:"get",
    					  url:"PAgetdata?mnemoniccode="+Mnemoniccode,
    					  dataType:"json",
    					  async:false,
    					  success:function(data){
    						$("#number").html(data.length);
    						for(var i=0;i<data.length;i++){
    							$("#sysData").append("<tr class=\"text-c\">"+   
    							"<td><input type=\"checkbox\" value="+ data[i].id +" name=\'myname\'></td>"+
    							"<td>" + data[i].drugscode + "</td>"+
    							"<td>" + data[i].drugsname + "</td>" +
    							"<td class=\"text-l\">" + data[i].drugsformat + "</td>" +
    							"<td>" + data[i].drugsunit + "</td>" +
    							"<td>" + data[i].drugsprice + "</td>" +
    							"<td>" + data[i].constantname + "</td>" +
    							"<td>" + data[i].drugsdosageid + "</td>" +"</tr>");
    						}
    					},
    					error:function(data){
    						$("#number").html(2);   
    					}
    				  })      
    			  },
    				error:function(data){
    					layer.alert("删除药品失败");
    				}
    	      });   
    			    
    	  layer.close(ind);
    	
    	  }, function(inds){
    	  layer.close(inds);
    	  });
      
      
      
      
  })
  /***
   * 编辑js
   */
  $("#editbut").click(function(){
	  var obj = document.getElementsByName("myname");
      var check_arr = [];
      for (var i = 0; i < obj.length; i++) {
          if (obj[i].checked)
              check_arr.push(obj[i].value);
      }
         
      if(check_arr.length==0){  
    	  layer.msg("请选择一个要编辑的");
      }else if(check_arr.length==1){
    	  window.localStorage.setItem("id", check_arr[0]);
    	  window.location.href="PA-EditDrugs.html"; 
      }else{
    	  layer.msg("编辑每次请选中一个，切勿选中多个");
      }
  })
});
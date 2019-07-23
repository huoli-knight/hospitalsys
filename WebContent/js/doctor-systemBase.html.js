$(function(){
	alert(parent.document.getElementById('tree_id').value);
	var tabBar = "#tabCon0";
	
	$("#tabBar0").click(function(){
		$(tabBar).css("display","none");
		$("#tabCon0").css("display","block");
		tabBar = "#tabCon0";
	});
  
	$("#tabBar1").click(function(){
		$(tabBar).css("display","none");
		$("#tabCon1").css("display","block");
		tabBar = "#tabCon1";
	});
	
	$("#tabBar2").click(function(){
		$(tabBar).css("display","none");
		$("#tabCon2").css("display","block");
		tabBar = "#tabCon2";
	});
	
	$("#tabBar3").click(function(){
		$(tabBar).css("display","none");
		$("#tabCon3").css("display","block");
		tabBar = "#tabCon3";
	});
	
	$("#tabBar4").click(function(){
		$(tabBar).css("display","none");
		$("#tabCon4").css("display","block");
		tabBar = "#tabCon4";
	});
	
	$("#tabBar5").click(function(){
		$(tabBar).css("display","none");
		$("#tabCon5").css("display","block");
		tabBar = "#tabCon5";
	});
	
	$("#tabBar6").click(function(){
		$(tabBar).css("display","none");
		$("#tabCon6").css("display","block");
		tabBar = "#tabCon6";
	});
	
	$("#tabBar7").click(function(){
		$(tabBar).css("display","none");
		$("#tabCon7").css("display","block");
		tabBar = "#tabCon7";
	});
	
	var patientName = 1;
	$.ajax({
		type:"post",
		url:"/",
		async:false,
		dataType:"json",
		data:{
			
		},
		success:function(data){
			
		}
	});
	
	
	var treeObj = $("#treeDemo", window.parent.document);//$.fn.zTree.getZTreeObj($("#treeDemo", window.parent.document));
	//在提交表单之前将选中的checkbox收集
	var nodes = treeObj.getCheckedNodes(true);
	//创建一个数组用来存放选中叶子结点代表的数据
	var array = new Array();
	//遍历所有选中的叶子节点
	for(var i=0;i<nodes.length;i++){
	        //push()把一个元素添加到数组的尾部 
	        array.push(nodes[i].id);
	    }
	//join()方法将数组中的所有元素转换成字符串，然后连接起来，这刚好和String的split()方法是一个相反的操作。
	var functionIds = array.join(",");

	
	var test = $.query.get('id');
	$("#test1").append(test);
})

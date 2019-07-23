$(function(){
	var q_treeNode;
	var setting = {
			view: {
				dblClickExpand: false,
				showLine: false,
				selectedMulti: false
			},
			data: {
				simpleData: {
					enable:true,
					idKey: "id",
					pIdKey: "pId",
					rootPId: ""
				}
			},
			callback: {
				beforeClick: function(treeId, treeNode) {
					var zTree = $.fn.zTree.getZTreeObj("tree");
					console.log(treeNode);
					q_treeNode = treeNode;
					$("#tree_id").val(treeNode.id);
					if (treeNode.isParent) {
						zTree.expandNode(treeNode);
						return false;
					} else {
						demoIframe.attr("src",treeNode.file + ".html?id=1");
						return true;
					}
				}
			}
		};
	
	var zNodes =[];
	zNodes[0] =	{ id:1, pId:0, name:"一级分类", open:true};
	zNodes[1] =	{ id:11, pId:1, name:"未诊患者", open:true};

	$.ajax({
		type:"post",
		url:"doctor/getSeekingDoctor",
		async:false,
		dataType:"json",
		success:function(data){
			var id;
			var i = 0;
			for (; i < data.length; i++) {
				if (data[i].id < 10)
				id0 = 110 + data[i].id;
				else if (data[i].id < 100)
					id0 = 1100 + data[i].id;
				else
					id0 = 11000 + data[i].id;
				zNodes[i + 2] = {id:id0, pId:11, name:data[i].realname, file:"doctor-systemBase"};
			}
			zNodes[i + 2] = { id:12, pId:1, name:"已诊患者"};
			i++;
			$.ajax({
				type:"post",
				url:"doctor/getNoSeekingDoctor",
				async:false,
				dataType:"json",
				success:function(data){
					$("#test0").html("test4");
					for (var k = 0; k < data.length; k++) {
						if (data[k].id < 10)
							id0 = 110 + data[k].id;
							else if (data[k].id < 100)
								id0 = 1100 + data[k].id;
							else
								id0 = 11000 + data[k].id;
						zNodes[i + 2] = {id:id0, pId:12, name:data[k].realname, file:"doctor-systemBase"};
						i++;
					}
					var t = $("#treeDemo");
					t = $.fn.zTree.init(t, setting, zNodes);
					demoIframe = $("#testIframe");
					//demoIframe.on("load", loadReady);
					var zTree = $.fn.zTree.getZTreeObj("tree");
					//zTree.selectNode(zTree.getNodeByParam("id",'11'));
				}
			})
		}
	});
				
		var code;
				
		function showCode(str) {
			if (!code) code = $("#code");
			code.empty();
			code.append("<li>"+str+"</li>");
		}


				
})
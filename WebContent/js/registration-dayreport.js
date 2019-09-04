$(function(){
	//日结起始时间，默认为上次结束时间
	$.ajax({
		type:"get",
		url:"registergetdailymin",
		dataType:"json",
		async:false,
		success:function(data) {
			var time=new Date();
			var starttime=new String();
			time=new Date(data);
			starttime=time.toLocaleString();
			$("#logmin").val(starttime);
			var endtime=new Date();
			var end=new String();
			end=endtime.toLocaleString();
			$("#logmax").val(end);
		}
	})
	
	
	//搜索
	var mintime,maxtime;
	$("#search").click(function () {
		$("#checklist").empty();
		var mintime = $("#logmin").val();
		var maxtime = $("#logmax").val();
		$.ajax({
		type:"post",
		url:"registergetreport",
		dataType:"json",
		async:false,
		data: {
			mintime:mintime,
			maxtime:maxtime,
		},
		success:function(data) {
			var time=new Date();
			var creationtime=new String();
			
			var state=new String();
			for(var i = 0; i < data.length; i++)
			{
				time= new Date(data[i].creationtime);
				creationtime=time.toLocaleString();
				if(data[i].dailystate==0)
					state="未日结";
				else
					state="已日结";
				if(data[i].state==1)
					$("#checklist").append("<tr class=\"text-c\">" +
					"<td>" + data[i].invoicenum + "</td>" +
					"<td>" + data[i].money + "</td>" +
					"<td>" + creationtime + "</td>" +
					"<td>" + "正常" + "</td>" +
					"<td>" + state + "</td>" +
					"</tr>");
				else if(data[i].state==2)
					$("#checklist").append("<tr class=\"text-c\">" +
					"<td>" + data[i].invoicenum + "</td>" +
					"<td>" + data[i].money + "</td>" +
					"<td>" + creationtime + "</td>" +
					"<td>" + "已作废" + "</td>" +
					"<td>" + state + "</td>" +
					"</tr>");
				else if(data[i].state==3)
					$("#checklist").append("<tr class=\"text-c\">" +
					"<td>" + data[i].invoicenum + "</td>" +
					"<td>" + data[i].money + "</td>" +
					"<td>" + creationtime + "</td>" +
					"<td>" + "未打印" + "</td>" +
					"<td>" + state + "</td>" +
					"</tr>");
				else if(data[i].state==4)
					$("#checklist").append("<tr class=\"text-c\">" +
					"<td>" + data[i].invoicenum + "</td>" +
					"<td>" + data[i].money + "</td>" +
					"<td>" + creationtime + "</td>" +
					"<td>" + "已打印" + "</td>" +
					"<td>" + state + "</td>" +
					"</tr>");
				else if(data[i].state==5)
					$("#checklist").append("<tr class=\"text-c\">" +
					"<td>" + data[i].invoicenum + "</td>" +
					"<td>" + data[i].money + "</td>" +
					"<td>" + creationtime + "</td>" +
					"<td>" + "已重打" + "</td>" +
					"<td>" + state + "</td>" +
					"</tr>");
				else if(data[i].state==6)
					$("#checklist").append("<tr class=\"text-c\">" +
					"<td>" + data[i].invoicenum + "</td>" +
					"<td>" + data[i].money + "</td>" +
					"<td>" + creationtime + "</td>" +
					"<td>" + "已补打" + "</td>" +
					"<td>" + state + "</td>" +
					"</tr>");
				else if(data[i].state==7)
					$("#checklist").append("<tr class=\"text-c\">" +
					"<td>" + data[i].invoicenum + "</td>" +
					"<td>" + data[i].money + "</td>" +
					"<td>" + creationtime + "</td>" +
					"<td>" + "冲红" + "</td>" +
					"<td>" + state + "</td>" +
					"</tr>");
			}
			
		}
	})
	
	
	})
	
	
	//结算报账
	$("#account").click(function () {
		if($("#FID").val()!="")
		{
		if (confirm("确认结算？")) { 
		$.ajax({
			type:"POST",
			url:"registercloseaccount",
			dataType:"json",
			async:false,
			data: {
				maxtime:maxtime,
			},
			success:function(data) {
				if(data>=1)
					{
					//在日结表中填入日结信息
					var registid=10;
					alert(registid);
					$.ajax({
						type:"POST",
						url:"registinsertdailywork",
						dataType:"json",
						async:false,
						data: {
							registid:registid,
						},
						success:function(data) {
							if(data>=1)
								alert("日结成功！");
							else
								alert("日结信息更新成功，未填入日结表！");
						}
					})
					}
				else
					alert("无日结信息更新！");
			}
		})
		}
		else
			alert("取消结算成功！");
		
		//刷新日结信息
		$("#checklist").empty();
		$.ajax({
			type:"post",
			url:"registergetreport",
			dataType:"json",
			async:false,
			data: {
				mintime:mintime,
				maxtime:maxtime,
			},
			success:function(data) {
				var time=new Date();
				var creationtime=new String();
				
				var state=new String();
				for(var i = 0; i < data.length; i++)
				{
					time= new Date(data[i].creationtime);
					creationtime=time.toLocaleString();
					if(data[i].dailystate==0)
						state="未日结";
					else
						state="已日结";
					if(data[i].state==1)
						$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" + data[i].invoicenum + "</td>" +
						"<td>" + data[i].money + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "正常" + "</td>" +
						"<td>" + state + "</td>" +
						"</tr>");
					else if(data[i].state==2)
						$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" + data[i].invoicenum + "</td>" +
						"<td>" + data[i].money + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "已作废" + "</td>" +
						"<td>" + state + "</td>" +
						"</tr>");
					else if(data[i].state==3)
						$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" + data[i].invoicenum + "</td>" +
						"<td>" + data[i].money + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "未打印" + "</td>" +
						"<td>" + state + "</td>" +
						"</tr>");
					else if(data[i].state==4)
						$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" + data[i].invoicenum + "</td>" +
						"<td>" + data[i].money + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "已打印" + "</td>" +
						"<td>" + state + "</td>" +
						"</tr>");
					else if(data[i].state==5)
						$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" + data[i].invoicenum + "</td>" +
						"<td>" + data[i].money + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "已重打" + "</td>" +
						"<td>" + state + "</td>" +
						"</tr>");
					else if(data[i].state==6)
						$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" + data[i].invoicenum + "</td>" +
						"<td>" + data[i].money + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "已补打" + "</td>" +
						"<td>" + state + "</td>" +
						"</tr>");
					else if(data[i].state==7)
						$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" + data[i].invoicenum + "</td>" +
						"<td>" + data[i].money + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "冲红" + "</td>" +
						"<td>" + state + "</td>" +
						"</tr>");
				}
				
			}
		})
		
		}
		else
			alert("请输入收费员ID！");
	})//结算报账按钮结束
	
})
$(function(){
	
	//发票信息要用register.ID
	var registID;
	//挂号费
	var registmoney;
	
	var casenumber;
	var Pname;
	
	//查询信息
	$("#quiry-2").click(function () {
		var pid = $("#Pcasenumber").val();	
		
		$.ajax({
			type:"POST",
			url:"registergetdata",
			dataType:"json",
			async:false,
			data: {
				pid:pid,
			},
			success:function(data) {
				$("#Pname").val(data[0].realname);
				$("#Page").val(data[0].age+data[0].agetype);
				if(data[0].gender==71)
					$("#Pgender").val("男");
				if(data[0].gender==72)
					$("#Pgender").val("女");
				$("#PIDnumber").val(data[0].idnumber);
				$("#Phomeaddress").val(data[0].homeaddress);
				$("#PIncasenumber").html(data[0].casenumber);
				$("#PInname").html(data[0].realname);
				$("#PInIDnumber").html(data[0].idnumber);
				
				var time=new Date(data[0].visitdate);
				$("#PIndate").html(time.toLocaleString());
				
				$("#PInnoon").html(data[0].noon);
				$("#PIncontantdept").html(data[0].deptname);
				if(data[0].visitstate==1)
					$("#PIncontantstate").html("已挂号");
				if(data[0].visitstate==2)
					$("#PIncontantstate").html("医生接诊");
				if(data[0].visitstate==3)
					$("#PIncontantstate").html("看诊结束");
				if(data[0].visitstate==4)
					$("#PIncontantstate").html("已退号");
				
				registID=data[0].id;
				casenumber=data[0].casenumber;
				Pname=data[0].realname;
			}
		})

		
		//已有发票信息---invoicecontroller
		$("#checklist").empty();
		$.ajax({
			type:"POST",
			url:"registergetinvoiceinformation",
			dataType:"json",
			async:false,
			data: {
				pid:registID,
			},
			success:function(data) {
				//alert(data.length);
				var time=new Date();
				var creationtime=new String();
				for(var i = 0; i < data.length; i++)
				{
					time= new Date(data[i].creationtime);
					creationtime=time.toLocaleString();
					if(data[i].state==1)
						$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].invoicenum + "</td>" +
						"<td>" + data[i].money + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "正常" + "</td>" +
						"</tr>");
					else if(data[i].state==2)
						$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].invoicenum + "</td>" +
						"<td>" + data[i].money + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "已作废" + "</td>" +
						"</tr>");
					else if(data[i].state==3)
						$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].invoicenum + "</td>" +
						"<td>" + data[i].money + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "未打印" + "</td>" +
						"</tr>");
					else if(data[i].state==4)
						$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].invoicenum + "</td>" +
						"<td>" + data[i].money + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "已打印" + "</td>" +
						"</tr>");
					else if(data[i].state==5)
						$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].invoicenum + "</td>" +
						"<td>" + data[i].money + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "已重打" + "</td>" +
						"</tr>");
					else if(data[i].state==6)
						$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].invoicenum + "</td>" +
						"<td>" + data[i].money + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "已补打" + "</td>" +
						"</tr>");
					else if(data[i].state==7)
						$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].invoicenum + "</td>" +
						"<td>" + data[i].money + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "冲红" + "</td>" +
						"</tr>");
				}
				registmoney=data[0].money;
			}
		})
		
    });
	
	//退号
	$("#withdrawal").click(function () {
		if (confirm("确认退号？")) {
			var pid = $("#Pcasenumber").val();
			$.ajax({
				type:"POST",
				url:"registerdeletedata",
				dataType:"json",
				async:false,
				data: {
					pid:pid,
				},
				success:function(data) {
					if(data==1)
						{
						alert("退号成功！");
						//添加发票信息
						var money=0-registmoney;
						var userid=301;
						var feetype=new String();
						 feetype="其它";
						//alert("money"+money+feetype);
						//在发票表中填入发票信息，退号
						$.ajax({
							type:"POST",
							url:"registinsertgetidinvoice",
							dataType:"json",
							async:false,
							data: {
								money:money,
								userid:userid,
								feetype:feetype,
								registid:registID,
							},
							success:function(data) {
								if(data==1)
									alert("冲红发票生成成功，未打印！");
								else
									alert("生成发票失败！");
							}
						})
						}
					else
						alert("退号失败！请确认患者挂号状态为可退号状态！");
				}
			})
			
			
			
			
			//已有发票信息---invoicecontroller
			$("#checklist").empty();
			$.ajax({
				type:"POST",
				url:"registergetinvoiceinformation",
				dataType:"json",
				async:false,
				data: {
					pid:registID,
				},
				success:function(data) {
					//alert(data.length);
					var time=new Date();
					var creationtime=new String();
					for(var i = 0; i < data.length; i++)
					{
						time= new Date(data[i].creationtime);
						creationtime=time.toLocaleString();
						if(data[i].state==1)
							$("#checklist").append("<tr class=\"text-c\">" +
							"<td>" +casenumber+ "</td>" +
							"<td class=\"text-l\">" + Pname + "</td>" +
							"<td>" + data[i].invoicenum + "</td>" +
							"<td>" + data[i].money + "</td>" +
							"<td>" + creationtime + "</td>" +
							"<td>" + "正常" + "</td>" +
							"</tr>");
						else if(data[i].state==2)
							$("#checklist").append("<tr class=\"text-c\">" +
							"<td>" +casenumber+ "</td>" +
							"<td class=\"text-l\">" + Pname + "</td>" +
							"<td>" + data[i].invoicenum + "</td>" +
							"<td>" + data[i].money + "</td>" +
							"<td>" + creationtime + "</td>" +
							"<td>" + "已作废" + "</td>" +
							"</tr>");
						else if(data[i].state==3)
							$("#checklist").append("<tr class=\"text-c\">" +
							"<td>" +casenumber+ "</td>" +
							"<td class=\"text-l\">" + Pname + "</td>" +
							"<td>" + data[i].invoicenum + "</td>" +
							"<td>" + data[i].money + "</td>" +
							"<td>" + creationtime + "</td>" +
							"<td>" + "未打印" + "</td>" +
							"</tr>");
						else if(data[i].state==4)
							$("#checklist").append("<tr class=\"text-c\">" +
							"<td>" +casenumber+ "</td>" +
							"<td class=\"text-l\">" + Pname + "</td>" +
							"<td>" + data[i].invoicenum + "</td>" +
							"<td>" + data[i].money + "</td>" +
							"<td>" + creationtime + "</td>" +
							"<td>" + "已打印" + "</td>" +
							"</tr>");
						else if(data[i].state==5)
							$("#checklist").append("<tr class=\"text-c\">" +
							"<td>" +casenumber+ "</td>" +
							"<td class=\"text-l\">" + Pname + "</td>" +
							"<td>" + data[i].invoicenum + "</td>" +
							"<td>" + data[i].money + "</td>" +
							"<td>" + creationtime + "</td>" +
							"<td>" + "已重打" + "</td>" +
							"</tr>");
						else if(data[i].state==6)
							$("#checklist").append("<tr class=\"text-c\">" +
							"<td>" +casenumber+ "</td>" +
							"<td class=\"text-l\">" + Pname + "</td>" +
							"<td>" + data[i].invoicenum + "</td>" +
							"<td>" + data[i].money + "</td>" +
							"<td>" + creationtime + "</td>" +
							"<td>" + "已补打" + "</td>" +
							"</tr>");
						else if(data[i].state==7)
							$("#checklist").append("<tr class=\"text-c\">" +
							"<td>" +casenumber+ "</td>" +
							"<td class=\"text-l\">" + Pname + "</td>" +
							"<td>" + data[i].invoicenum + "</td>" +
							"<td>" + data[i].money + "</td>" +
							"<td>" + creationtime + "</td>" +
							"<td>" + "冲红" + "</td>" +
							"</tr>");
					}
				}
			})
			
        }  
        else {  
            alert("取消退号成功");  
        }  
	})
	
	//打印发票按钮，修改对应发票状态为已补打
	$("#confirmprint").click(function () {
		if (confirm("确认打印？")) { 
			var pid = $("#Pcasenumber").val();
			$.ajax({
				type:"POST",
				url:"registerimmediatelyprint",
				dataType:"json",
				async:false,
				data: {
					pid:pid,
				},
				success:function(data) {
					if(data>=1)
						alert("打印成功！");
					else
						alert("打印失败！请核查发票清单，确认存在可补打发票！");
				}
			})
			
			//已有发票信息---invoicecontroller
			$("#checklist").empty();
			$.ajax({
				type:"POST",
				url:"registergetinvoiceinformation",
				dataType:"json",
				async:false,
				data: {
					pid:registID,
				},
				success:function(data) {
					//alert(data.length);
					var time=new Date();
					var creationtime=new String();
					for(var i = 0; i < data.length; i++)
					{
						time= new Date(data[i].creationtime);
						creationtime=time.toLocaleString();
						if(data[i].state==1)
							$("#checklist").append("<tr class=\"text-c\">" +
							"<td>" +casenumber+ "</td>" +
							"<td class=\"text-l\">" + Pname + "</td>" +
							"<td>" + data[i].invoicenum + "</td>" +
							"<td>" + data[i].money + "</td>" +
							"<td>" + creationtime + "</td>" +
							"<td>" + "正常" + "</td>" +
							"</tr>");
						else if(data[i].state==2)
							$("#checklist").append("<tr class=\"text-c\">" +
							"<td>" +casenumber+ "</td>" +
							"<td class=\"text-l\">" + Pname + "</td>" +
							"<td>" + data[i].invoicenum + "</td>" +
							"<td>" + data[i].money + "</td>" +
							"<td>" + creationtime + "</td>" +
							"<td>" + "已作废" + "</td>" +
							"</tr>");
						else if(data[i].state==3)
							$("#checklist").append("<tr class=\"text-c\">" +
							"<td>" +casenumber+ "</td>" +
							"<td class=\"text-l\">" + Pname + "</td>" +
							"<td>" + data[i].invoicenum + "</td>" +
							"<td>" + data[i].money + "</td>" +
							"<td>" + creationtime + "</td>" +
							"<td>" + "未打印" + "</td>" +
							"</tr>");
						else if(data[i].state==4)
							$("#checklist").append("<tr class=\"text-c\">" +
							"<td>" +casenumber+ "</td>" +
							"<td class=\"text-l\">" + Pname + "</td>" +
							"<td>" + data[i].invoicenum + "</td>" +
							"<td>" + data[i].money + "</td>" +
							"<td>" + creationtime + "</td>" +
							"<td>" + "已打印" + "</td>" +
							"</tr>");
						else if(data[i].state==5)
							$("#checklist").append("<tr class=\"text-c\">" +
							"<td>" +casenumber+ "</td>" +
							"<td class=\"text-l\">" + Pname + "</td>" +
							"<td>" + data[i].invoicenum + "</td>" +
							"<td>" + data[i].money + "</td>" +
							"<td>" + creationtime + "</td>" +
							"<td>" + "已重打" + "</td>" +
							"</tr>");
						else if(data[i].state==6)
							$("#checklist").append("<tr class=\"text-c\">" +
							"<td>" +casenumber+ "</td>" +
							"<td class=\"text-l\">" + Pname + "</td>" +
							"<td>" + data[i].invoicenum + "</td>" +
							"<td>" + data[i].money + "</td>" +
							"<td>" + creationtime + "</td>" +
							"<td>" + "已补打" + "</td>" +
							"</tr>");
						else if(data[i].state==7)
							$("#checklist").append("<tr class=\"text-c\">" +
							"<td>" +casenumber+ "</td>" +
							"<td class=\"text-l\">" + Pname + "</td>" +
							"<td>" + data[i].invoicenum + "</td>" +
							"<td>" + data[i].money + "</td>" +
							"<td>" + creationtime + "</td>" +
							"<td>" + "冲红" + "</td>" +
							"</tr>");
					}
				}
			})
        }  
        else {  
            alert("取消补打成功");  
        }  
	})
		
		
})
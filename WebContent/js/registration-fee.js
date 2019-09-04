$(function(){
	//计算总金额(收费、退费)
	var total=0;//收费金额计算
	var refundtotal=0;//退费金额计算
	var registID;
	var casenumber;
	var Pname;
	
	//获取收费方式
	$.ajax({
		type:"get",
		url:"registergetfeetypename",
		dataType:"json",
		async:false,
		success:function(data) {
			for(var i = 0; i < data.length; i++)
				$("#feetype").append("<option>" +
						data[i].constantname+ "</option>");
		}
	})
	
	//查询信息
	//收费、退费、费用查询
	$("#quiry-3").click(function () {
		$("#checklist").empty();
		total=0;
		refundtotal=0;
		var pid = $("#Pcasenumber").val();
		
		
		//查患者基本信息
		$.ajax({
			type:"POST",
			url:"registergetfeeinformation",
			dataType:"json",
			async:false,
			data: {
				pid:pid,
			},
			success:function(data) {
				$("#Pname").val(data.realname);
				$("#Page").val(data.age+data.agetype);
				if(data.gender==71)
					$("#Pgender").val("男");
				if(data.gender==72)
					$("#Pgender").val("女");
				$("#PIDnumber").val(data.idnumber);
				$("#Phomeaddress").val(data.homeaddress);
				
				registID=data.id;
				casenumber=data.casenumber;
				Pname=data.realname;
			}
		})
		
		
		
		//查检查/检验/处置feeMapper
		$.ajax({
			type:"POST",
			url:"registergetfeecheck",
			dataType:"json",
			async:false,
			data: {
				pid:registID,
			},
			success:function(data) {
				var time=new Date();
				var creationtime=new String();
				for(var i = 0; i < data.length; i++)
				{
					time=new Date(data[i].creationtime);
					creationtime=time.toLocaleString();
					if(data[i].state==1)
						$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].itemname + "</td>" +
						"<td>" + data[i].price + "</td>" +
						"<td>" + data[i].num + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "暂存" + "</td>" +
						"</tr>");
					else if(data[i].state==2)
						{$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].itemname + "</td>" +
						"<td>" + data[i].price + "</td>" +
						"<td>" + data[i].num + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "已开立" + "</td>" +
						"</tr>");
						
						total=total+data[i].price*data[i].num;
						}
					else if(data[i].state==3)
						{$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].itemname + "</td>" +
						"<td>" + data[i].price + "</td>" +
						"<td>" + data[i].num + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "已交费" + "</td>" +
						"</tr>");
						
						refundtotal=refundtotal-data[i].price*data[i].num;
						}
					else if(data[i].state==4)
						$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].itemname + "</td>" +
						"<td>" + data[i].price + "</td>" +
						"<td>" + data[i].num + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "已登记" + "</td>" +
						"</tr>");
					else if(data[i].state==5)
						$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].itemname + "</td>" +
						"<td>" + data[i].price + "</td>" +
						"<td>" + data[i].num + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "执行完" + "</td>" +
						"</tr>");
					else if(data[i].state==6)
						$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].itemname + "</td>" +
						"<td>" + data[i].price + "</td>" +
						"<td>" + data[i].num + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "已退费" + "</td>" +
						"</tr>");
					else if(data[i].state==0)
						$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].itemname + "</td>" +
						"<td>" + data[i].price + "</td>" +
						"<td>" + data[i].num + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "已作废" + "</td>" +
						"</tr>");
					
					
				}
				
			}
		})
		
		//查药品收费清单
		$.ajax({
			type:"POST",
			url:"registergetfeedrugs",
			dataType:"json",
			async:false,
			data: {
				pid:registID,
			},
			success:function(data) {
				var time=new Date();
				var creationtime=new String();
				for(var i = 0; i < data.length; i++)
				{
					time=new Date(data[i].prescriptiontime);
					prescriptiontime=time.toLocaleString();
					if(data[i].state==1)
						$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].drugsname + "</td>" +
						"<td>" + data[i].drugsprice + "</td>" +
						"<td>" + data[i].amount + "</td>" +
						"<td>" + prescriptiontime + "</td>" +
						"<td>" + "暂存" + "</td>" +
						"</tr>");
					else if(data[i].state==2)
						{$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].drugsname + "</td>" +
						"<td>" + data[i].drugsprice + "</td>" +
						"<td>" + data[i].amount + "</td>" +
						"<td>" + prescriptiontime + "</td>" +
						"<td>" + "已开立" + "</td>" +
						"</tr>");
						
						total=total+data[i].drugsprice*data[i].amount;
						}
					else if(data[i].state==3)
						{$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].drugsname + "</td>" +
						"<td>" + data[i].drugsprice + "</td>" +
						"<td>" + data[i].amount + "</td>" +
						"<td>" + prescriptiontime + "</td>" +
						"<td>" + "已交费" + "</td>" +
						"</tr>");
						
						refundtotal=refundtotal-data[i].drugsprice*data[i].amount;
						}
					else if(data[i].state==4)
						$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].drugsname + "</td>" +
						"<td>" + data[i].drugsprice + "</td>" +
						"<td>" + data[i].amount + "</td>" +
						"<td>" + prescriptiontime + "</td>" +
						"<td>" + "已登记" + "</td>" +
						"</tr>");
					else if(data[i].state==5)
						$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].drugsname + "</td>" +
						"<td>" + data[i].drugsprice + "</td>" +
						"<td>" + data[i].amount + "</td>" +
						"<td>" + prescriptiontime + "</td>" +
						"<td>" + "执行完" + "</td>" +
						"</tr>");
					else if(data[i].state==6)
						$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].drugsname + "</td>" +
						"<td>" + data[i].drugsprice + "</td>" +
						"<td>" + data[i].amount + "</td>" +
						"<td>" + prescriptiontime + "</td>" +
						"<td>" + "已退费" + "</td>" +
						"</tr>");
					else if(data[i].state==0)
						$("#checklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].drugsname + "</td>" +
						"<td>" + data[i].drugsprice + "</td>" +
						"<td>" + data[i].amount + "</td>" +
						"<td>" + prescriptiontime + "</td>" +
						"<td>" + "已作废" + "</td>" +
						"</tr>");
					
					
				}
				
				total=total.toFixed(0);
				refundtotal=refundtotal.toFixed(0);
				//alert(total);
				$("#amount").val(total);
			}
		})
		
    });
	
	//收费按钮，修改对应项目状态为已收费，并添加发票信息
	$("#feesettlement").click(function () {
		if (confirm("确认收费？")) { 
			var pid = $("#Pcasenumber").val();
			$.ajax({
				type:"POST",
				url:"registerfee",
				dataType:"json",
				async:false,
				data: {
					pid:pid,
				},
				success:function(data) {
					if(data>=1)
						{
						alert("收费成功！");
						//在发票表中填入发票信息（检查、药品收费）---withdrawalcontroller
						var userid=301;
						var feetype=$("#feetype option:selected").text();
						$.ajax({
						  	type:"POST",
							url:"registinsertgetidinvoice",
							dataType:"json",
							async:false,
							data: {
								money:total,
								userid:userid,
								feetype:feetype,
								registid:registID,
							},
							success:function(data) {
								if(data==1)
									{
									alert("发票生成成功，未打印！");
									$("#hideinvoice").css('display','block');
									
									//查已有发票信息
									$("#invoicechecklist").empty();
									$.ajax({
										type:"POST",
										url:"registergetinvoiceinformation",
										dataType:"json",
										async:false,
										data: {
											pid:registID,
										},
										success:function(data) {
											var time=new Date();
											var creationtime=new String();
											for(var i = 0; i < data.length; i++)
											{
												time= new Date(data[i].creationtime);
												creationtime=time.toLocaleString();
												if(data[i].state==1)
													$("#invoicechecklist").append("<tr class=\"text-c\">" +
													"<td>" +casenumber+ "</td>" +
													"<td class=\"text-l\">" + Pname + "</td>" +
													"<td>" + data[i].invoicenum + "</td>" +
													"<td>" + data[i].money + "</td>" +
													"<td>" + creationtime + "</td>" +
													"<td>" + "正常" + "</td>" +
													"</tr>");
												else if(data[i].state==2)
													$("#invoicechecklist").append("<tr class=\"text-c\">" +
													"<td>" +casenumber+ "</td>" +
													"<td class=\"text-l\">" + Pname + "</td>" +
													"<td>" + data[i].invoicenum + "</td>" +
													"<td>" + data[i].money + "</td>" +
													"<td>" + creationtime + "</td>" +
													"<td>" + "已作废" + "</td>" +
													"</tr>");
												else if(data[i].state==3)
													$("#invoicechecklist").append("<tr class=\"text-c\">" +
													"<td>" +casenumber+ "</td>" +
													"<td class=\"text-l\">" + Pname + "</td>" +
													"<td>" + data[i].invoicenum + "</td>" +
													"<td>" + data[i].money + "</td>" +
													"<td>" + creationtime + "</td>" +
													"<td>" + "未打印" + "</td>" +
													"</tr>");
												else if(data[i].state==4)
													$("#invoicechecklist").append("<tr class=\"text-c\">" +
													"<td>" +casenumber+ "</td>" +
													"<td class=\"text-l\">" + Pname + "</td>" +
													"<td>" + data[i].invoicenum + "</td>" +
													"<td>" + data[i].money + "</td>" +
													"<td>" + creationtime + "</td>" +
													"<td>" + "已打印" + "</td>" +
													"</tr>");
												else if(data[i].state==5)
													$("#invoicechecklist").append("<tr class=\"text-c\">" +
													"<td>" +casenumber+ "</td>" +
													"<td class=\"text-l\">" + Pname + "</td>" +
													"<td>" + data[i].invoicenum + "</td>" +
													"<td>" + data[i].money + "</td>" +
													"<td>" + creationtime + "</td>" +
													"<td>" + "已重打" + "</td>" +
													"</tr>");
												else if(data[i].state==6)
													$("#invoicechecklist").append("<tr class=\"text-c\">" +
													"<td>" +casenumber+ "</td>" +
													"<td class=\"text-l\">" + Pname + "</td>" +
													"<td>" + data[i].invoicenum + "</td>" +
													"<td>" + data[i].money + "</td>" +
													"<td>" + creationtime + "</td>" +
													"<td>" + "已补打" + "</td>" +
													"</tr>");
												else if(data[i].state==7)
													$("#invoicechecklist").append("<tr class=\"text-c\">" +
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
								else
									alert("生成发票失败！");
							}
						})
						
						}
					else
						alert("收费失败！请核查收费清单，确认存在可收费项目！");
				}
			})
			
			
			
        }  
        else {  
            alert("取消收费成功");  
        }  
	})
	
	//退费
	$("#refundsettlement").click(function () {
		if (confirm("确认退费？")) { 
			var pid = $("#Pcasenumber").val();
			$.ajax({
				type:"POST",
				url:"registerrefund",
				dataType:"json",
				async:false,
				data: {
					pid:pid,
				},
				success:function(data) {
					if(data>=1)
						{
						alert("退费"+refundtotal+"元成功！");
						//在发票表中填入发票信息（检查、药品退费
						var userid=301;
						var feetype="其它";
						$.ajax({
							type:"POST",
							url:"registinsertgetidinvoicered",
							dataType:"json",
							async:false,
							data: {
								money:refundtotal,
								userid:userid,
								feetype:feetype,
								registid:registID,
							},
							success:function(data) {
								if(data==1)
									{
									alert("冲红发票生成成功！");
									}
								else
									alert("生成发票失败！");
							}
						})
						}
					else
						alert("退费失败！请核查退费清单，确认存在可退费项目！");
				}
			})
        }  
        else {  
            alert("取消退费成功");  
        }  
	})
	
		//打印按钮，修改对应发票状态为已打印
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
			
			
		//查已有发票信息
		$("#invoicechecklist").empty();
		$.ajax({
			type:"POST",
			url:"registergetinvoiceinformation",
			dataType:"json",
			async:false,
			data: {
				pid:registID,
			},
			success:function(data) {
				var time=new Date();
				var creationtime=new String();
				for(var i = 0; i < data.length; i++)
				{
					time= new Date(data[i].creationtime);
					creationtime=time.toLocaleString();
					if(data[i].state==1)
						$("#invoicechecklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].invoicenum + "</td>" +
						"<td>" + data[i].money + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "正常" + "</td>" +
						"</tr>");
					else if(data[i].state==2)
						$("#invoicechecklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].invoicenum + "</td>" +
						"<td>" + data[i].money + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "已作废" + "</td>" +
						"</tr>");
					else if(data[i].state==3)
						$("#invoicechecklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].invoicenum + "</td>" +
						"<td>" + data[i].money + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "未打印" + "</td>" +
						"</tr>");
					else if(data[i].state==4)
						$("#invoicechecklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].invoicenum + "</td>" +
						"<td>" + data[i].money + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "已打印" + "</td>" +
						"</tr>");
					else if(data[i].state==5)
						$("#invoicechecklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].invoicenum + "</td>" +
						"<td>" + data[i].money + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "已重打" + "</td>" +
						"</tr>");
					else if(data[i].state==6)
						$("#invoicechecklist").append("<tr class=\"text-c\">" +
						"<td>" +casenumber+ "</td>" +
						"<td class=\"text-l\">" + Pname + "</td>" +
						"<td>" + data[i].invoicenum + "</td>" +
						"<td>" + data[i].money + "</td>" +
						"<td>" + creationtime + "</td>" +
						"<td>" + "已补打" + "</td>" +
						"</tr>");
					else if(data[i].state==7)
						$("#invoicechecklist").append("<tr class=\"text-c\">" +
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
            alert("取消打印成功");  
        }  
	})
	
})
$(function(){
	var registID;
	var casenumber;
	var Pname;
	//查询信息
	//收费、退费、费用查询
	$("#quiry-5").click(function () {
		var pid = $("#Pcasenumber").val();
		
		
		//查患者基本信息，在FeeController
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
		
		
		
		//查已有发票信息
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
		
    });
	
	//补打按钮，修改对应发票状态为已补打
	$("#confirmprint").click(function () {
		if (confirm("确认补打？")) { 
			var pid = $("#Pcasenumber").val();
			$.ajax({
				type:"POST",
				url:"registerprint",
				dataType:"json",
				async:false,
				data: {
					pid:pid,
				},
				success:function(data) {
					if(data>=1)
						alert("补打成功！");
					else
						alert("补打失败！请核查发票清单，确认存在可补打发票！");
				}
			})
			
			
			//查已有发票信息
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
						alert("退费成功！");
					else
						alert("退费失败！请核查退费清单，确认存在可退费项目！");
				}
			})
        }  
        else {  
            alert("取消退费成功");  
        }  
	})
	
})
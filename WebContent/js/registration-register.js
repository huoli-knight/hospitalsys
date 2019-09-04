$(function(){
	Date.prototype.pattern=function(fmt) {           
	    var o = {           
	    "M+" : this.getMonth()+1, //月份           
	    "d+" : this.getDate(), //日           
	    "h+" : this.getHours()%12 == 0 ? 12 : this.getHours()%12, //小时           
	    "H+" : this.getHours(), //小时           
	    "m+" : this.getMinutes(), //分           
	    "s+" : this.getSeconds(), //秒           
	    "q+" : Math.floor((this.getMonth()+3)/3), //季度           
	    "S" : this.getMilliseconds() //毫秒           
	    };           
	    var week = {           
	    "0" : "/u65e5",           
	    "1" : "/u4e00",           
	    "2" : "/u4e8c",           
	    "3" : "/u4e09",           
	    "4" : "/u56db",           
	    "5" : "/u4e94",           
	    "6" : "/u516d"          
	    };           
	    if(/(y+)/.test(fmt)){           
	        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));           
	    }           
	    if(/(E+)/.test(fmt)){           
	        fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[this.getDay()+""]);           
	    }           
	    for(var k in o){           
	        if(new RegExp("("+ k +")").test(fmt)){           
	            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));           
	        }           
	    }           
	    return fmt;           
	}         
	     
	var now=new Date();
	now=new Date();
	var nowtime=new String;
	nowtime=now.toLocaleString();
	$("#realDate").append(nowtime);
	
	//挂号显示的今日日期，年月日
	var Vvisitdate=new String();
	Vvisitdate=new Date().toDateString();
	var visitdate = new Date(Vvisitdate);
	visitdate=visitdate.pattern("yyyy-MM-dd"); 
	//alert(visitdate);
	
	//专家号限号
	var limitnumber;
	$.ajax({
		type:"POST",
		url:"registergetlimit",
		dataType:"json",
		async:false,
		data: {
			visitdate:visitdate,
		},
		success:function(data) {
			$("#limit").html("("+data.length+"/10)");
			limitnumber=data.length;
		}
		
	})
	  
	
	
	//获取挂号科室
	$.ajax({
		type:"get",
		url:"registergetdeptname",
		dataType:"json",
		async:false,
		success:function(data) {
			for(var i = 0; i < data.length; i++)
				$("#registdept").append("<option>" +
						data[i].deptname+ "</option>");
		}
	})
	
	//获取挂号医生
	$.ajax({
		type:"get",
		url:"registergetdoctorname",
		dataType:"json",
		async:false,
		success:function(data) {
			for(var i = 0; i < data.length; i++)
				$("#doctorname").append("<option>" +
						data[i].realname+ "</option>");
		}
	})
	
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
	
	//获取发票号
	$("#quiryinvoice").click(function () {
	$.ajax({
		type:"get",
		url:"registergetinvoice",
		dataType:"json",
		async:false,
		success:function(data) {
			$("#invoicenumber").val(data);
		}
	})
	
	})
	
	//获取病历号
	$("#refreshcase").click(function () {
	$.ajax({
		type:"get",
		url:"registergetcasenumber",
		dataType:"json",
		async:false,
		success:function(data) {
			$("#casenumber").val(data);
		}
	})
	})
	
	//确认挂号信息，计算应收金额
	$("#confirminformation").click(function () {
		if($("#invoicenumber").val()!=""&&$("#casenumber").val()!=""&&$("#Pname").val()!=""&&$("#logmax").val()!=""&&$("#Page").val()!=""&&$("#feetype").val()!="")
		{
			if($("#registerlevel option:selected").text()=="专家号"&&limitnumber==1)
				alert("今日限号专家号已满！请挂普通号！");
			else
			{
			if (confirm("确认后信息将不可修改！")) {  
		    //查挂号费
				var level = $("#registerlevel option:selected").text();
				$.ajax({
					type:"POST",
					url:"registergetfee",
					dataType:"json",
					async:false,
					data: {
						registlevel:level,
						},
			        success:function(data) {
				   if($("#isneedbook option:selected").text()=="是")
					$("#amount").val(data+1);
				   else
					$("#amount").val(data);
				   }
						})
		           //确认后挂号信息不能再修改
		           $('input').attr("readonly","readonly");
		           $('select').attr("disabled","disabled");
		           }
			}
			}
		else
			alert("请确认信息完整！*为必填项！");
	})
	
	//查发票时查出来的registID
	var registID;
	var casenumber;
	var Pname;
	//提交挂号信息，并收费，添加收费发票单
	$("#confirmregist").click(function () {
		//alert($("#invoicenumber").val());
		if($("#invoicenumber").val()!=""&&$("#casenumber").val()!=""&&$("#Pname").val()!=""&&$("#logmax").val()!=""&&$("#Page").val()!=""&&$("#amount").val()!=""&&$("#feetype").val()!="")
		{
		//获取挂号信息
		casenumber = $("#casenumber").val();
		var invoicenumber = $("#invoicenumber").val();
		var realname = $("#Pname").val();
		Pname=realname;
		var gender;
		if($("#Pgender option:selected").text()=="男")
			gender=71;
		if($("#Pgender option:selected").text()=="女")
			gender=72;
		var idnumber = $("#PIDnumber").val();
		
		var age = $("#Page").val();
		var agetype = $("#Pagetype option:selected").text();
		var homeaddress = $("#Phome").val();
		
		var noon = new String();
		if(Date()>12)
			noon="下午";
		else
			noon="上午";
		
		var registleid;
		if($("#registerlevel option:selected").text()=="专家号")
			registleid=1;
		else
			registleid=2;
		
		var settleid;
		if($("#paytype option:selected").text()=="自费")
			settleid=1;
		else
			settleid=2;
		
		var isbook;
		if($("#isneedbook option:selected").text()=="是")
			isbook=1;
		else
			isbook=0;
		var registerid =301;
		var visitstate =1;
		
		var deptname=$("#registdept option:selected").text();
		var username=$("#doctorname option:selected").text();
		var birthdate = $("#logmax").val();
		
		
		
		//------------------------------------------------
		//发票信息
		var Iinvoicenum=$("#invoicenumber").val();
		var Imoney=$("#amount").val();
		var Iuserid=301;
		//缴费方式
		var Ifeetype=$("#feetype option:selected").text();
		
		if (confirm("确认挂号？")) {  
			var birthdate = new Date(birthdate);
			
			birthdate=birthdate.pattern("yyyy-MM-dd"); 
			
			//alert(birthdate+"????"+visitdate);
			//将挂号信息存入数据库
			$.ajax({
				type:"POST",
				url:"regist",
				dataType:"json",
				async:false,
				data: {
					//挂号科室
					deptname:deptname,
					//挂号医生
					username:username,
					//string时间
					Rvisitdate:visitdate,
					Rbirthdate:birthdate,
					
					//register类
					casenumber:casenumber,
					realname:realname,
					gender:gender,
					idnumber:idnumber,
					
					age:age,
					agetype:agetype,
					homeaddress:homeaddress,
					
					noon:noon,
					//deptid:deptid,
					//userid:userid,
					registleid:registleid,
					settleid:settleid,
					isbook:isbook,
					//registtime:registtime,controller设置为当前时间
					registerid:registerid,
					//visitstate:visitstate,
					//birthdate:birthdate,
				},
				success:function(data) {
					if(data==1)
						{
						
						alert("挂号成功！");
						
						//在发票表中填入发票信息（挂号收费）
						$.ajax({
							type:"POST",
							url:"registinsertinvoice",
							dataType:"json",
							async:false,
							data: {
								invoicenum:Iinvoicenum,
								money:Imoney,
								userid:Iuserid,
								feetype:Ifeetype,
							},
							success:function(data) {
								if(data==1)
									{
									alert("发票生成成功，未打印！");
									$("#hideinvoice").css('display','block');
									
									//查挂号（最新）发票信息
									$("#checklist").empty();
									$.ajax({
										type:"get",
										url:"registergetregistinvoice",
										dataType:"json",
										async:false,
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
													"<td class=\"text-l\">" + realname + "</td>" +
													"<td>" + data[i].invoicenum + "</td>" +
													"<td>" + data[i].money + "</td>" +
													"<td>" + creationtime + "</td>" +
													"<td>" + "正常" + "</td>" +
													"</tr>");
												else if(data[i].state==2)
													$("#checklist").append("<tr class=\"text-c\">" +
													"<td>" +casenumber+ "</td>" +
													"<td class=\"text-l\">" + realname + "</td>" +
													"<td>" + data[i].invoicenum + "</td>" +
													"<td>" + data[i].money + "</td>" +
													"<td>" + creationtime + "</td>" +
													"<td>" + "已作废" + "</td>" +
													"</tr>");
												else if(data[i].state==3)
													$("#checklist").append("<tr class=\"text-c\">" +
													"<td>" +casenumber+ "</td>" +
													"<td class=\"text-l\">" + realname + "</td>" +
													"<td>" + data[i].invoicenum + "</td>" +
													"<td>" + data[i].money + "</td>" +
													"<td>" + creationtime + "</td>" +
													"<td>" + "未打印" + "</td>" +
													"</tr>");
												else if(data[i].state==4)
													$("#checklist").append("<tr class=\"text-c\">" +
													"<td>" +casenumber+ "</td>" +
													"<td class=\"text-l\">" + realname + "</td>" +
													"<td>" + data[i].invoicenum + "</td>" +
													"<td>" + data[i].money + "</td>" +
													"<td>" + creationtime + "</td>" +
													"<td>" + "已打印" + "</td>" +
													"</tr>");
												else if(data[i].state==5)
													$("#checklist").append("<tr class=\"text-c\">" +
													"<td>" +casenumber+ "</td>" +
													"<td class=\"text-l\">" + realname + "</td>" +
													"<td>" + data[i].invoicenum + "</td>" +
													"<td>" + data[i].money + "</td>" +
													"<td>" + creationtime + "</td>" +
													"<td>" + "已重打" + "</td>" +
													"</tr>");
												else if(data[i].state==6)
													$("#checklist").append("<tr class=\"text-c\">" +
													"<td>" +casenumber+ "</td>" +
													"<td class=\"text-l\">" + realname + "</td>" +
													"<td>" + data[i].invoicenum + "</td>" +
													"<td>" + data[i].money + "</td>" +
													"<td>" + creationtime + "</td>" +
													"<td>" + "已补打" + "</td>" +
													"</tr>");
												else if(data[i].state==7)
													$("#checklist").append("<tr class=\"text-c\">" +
													"<td>" +casenumber+ "</td>" +
													"<td class=\"text-l\">" + realname + "</td>" +
													"<td>" + data[i].invoicenum + "</td>" +
													"<td>" + data[i].money + "</td>" +
													"<td>" + creationtime + "</td>" +
													"<td>" + "冲红" + "</td>" +
													"</tr>");
											}
											registID=data[0].registid;
										}
									})
									}
								else
									alert("生成发票失败！");
							}
						})
						
						}
					else
						alert("挂号失败！请重试！");
				}
			})
			
			
        }  
		else
			alert("取消挂号成功");
	}
	else
		alert("请先提交挂号信息！");
	})//挂号按钮结束
	
	
	//打印按钮，修改对应发票状态为已打印
	$("#confirmprint").click(function () {
		if (confirm("确认打印？")) { 
			var pid = $("#casenumber").val();
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
})

//计算年龄
function calage(obj){
	
}
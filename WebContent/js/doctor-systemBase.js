$(function(){
	
	$("#cleanUp").click(function(){
		$("#readme").val("");
		$("#present").val("");
		$("#presenttreat").val("");
		$("#history").val("");
		$("#allergy").val("");
		$("#physique").val("");
		$("#proposal").val("");
		$("#careful").val("");
	});
	
	var tabCon = "#tabCon0";

	$("#tabBar0").click(function(){
		$(tabCon).css("display","none");
		$("#tabCon0").css("display","block");
		tabCon = "#tabCon0";
	});
  
	$("#tabBar1").click(function(){
		$(tabCon).css("display","none");
		$("#tabCon1").css("display","block");
		tabCon = "#tabCon1";
	});
	
	$("#tabBar2").click(function(){
		$(tabCon).css("display","none");
		$("#tabCon2").css("display","block");
		tabCon = "#tabCon2";
	});
	
	$("#tabBar3").click(function(){
		$(tabCon).css("display","none");
		$("#tabCon3").css("display","block");
		tabCon = "#tabCon3";
	});
	
	$("#tabBar4").click(function(){
		$(tabCon).css("display","none");
		$("#tabCon4").css("display","block");
		tabCon = "#tabCon4";
	});
	
	$("#tabBar5").click(function(){
		$(tabCon).css("display","none");
		$("#tabCon5").css("display","block");
		tabCon = "#tabCon5";
	});
	
	$("#tabBar6").click(function(){
		$(tabCon).css("display","none");
		$("#tabCon6").css("display","block");
		tabCon = "#tabCon6";
	});
	
	$("#tabBar7").click(function(){
		$(tabCon).css("display","none");
		$("#tabCon7").css("display","block");
		tabCon = "#tabCon7";
	});
	
	$("#diagnosisButton1").click(function(){
		$("#addicd").css("visibility","visible");
	});
	
	$("#close").click(function(){
		$("#sumbut0").val("");
		$("#addicd").css("visibility","hidden");
	})
	
	//registId
//	var parent=window.dialogArguments;
	var patientName = parent.document.getElementById("tree_id").value;
	
	if (patientName.length >= 3) {
		if (patientName[1] == "2") {
			patientName=patientName.substring(2, patientName.length);
		}
		if (patientName[1] == "1") {
			$("#buttonTemporaryStorage").css("display","none");
			patientName=patientName.substring(2, patientName.length);
			$.ajax({
				type:"post",
				url:"doctorBase/getMedicalRecordData",
				async:false,
				dataType:"json",
				data:{
					patientName:patientName
				},
				success:function(data){
					$("#readme").val(data.readme);
					$("#present").val(data.present);
					$("#presentTreat").val(data.presenttreat);
					$("#history").val(data.history);
					$("#allergy").val(data.allergy);
					$("#physique").val(data.physique);
					$("#proposal").val(data.proposal);
					$("#careful").val(data.careful);
				},
			});
			$.ajax({
				type:"post",
				url:"doctorBase/getDiseaseMedical",
				async:false,
				dataType:"json",
				data:{
					patientName:patientName
				},
				success:function(data){
					for(var i=0; i < data.length; i++) {
						$("#sysData").append(
												"<tr class=\"text-c titletype\">" +
												"<td><input type=\"checkbox\" name=\"sign\" id=\"select" + i + "\"  value=\"" + data[i].diseaseicd + "\"></td>" +
												"<td class=\"titletype\" id=\"icd" +  i + "\">" + data[i].diseaseicd + "</td>" +
												"<td class=\"titletype\" id=\"name" + i + "\">" + data[i].diseasename + "</td>" +
												"<td class=\"titletype\" id=\"time" + data[i].id + "\" name=\"\"></td></tr>");
					}
					$.ajax({
						type:"post",
						url:"doctorBase/getMedicalTime",
						async:false,
						dataType:"json",
						data:{
							patientName:patientName
						},
						success:function(data0){
							var time = new Date();
							var key1 = "#time";
							var key = "";
							for (var i=0; i< data0.length; i++)  {
								key = key1 + data0[i].diseaseid;
								time = new Date(data0[i].getsiskdate);
								$(key).html(time.toLocaleString());
							}
						}
					});
				},
			});
			$.ajax({
				type:"post",
				url:"doctorBase/getDiagnosisType",
				async:false,
				dataType:"json",
				data:{
					patientName:patientName
				},
				success:function(data){
					if (data.result0 == "1") {
						$("#radioICD0").attr("checked","checked");
					}
					if (data.result0 == "2") {
						$("#radioICD1").attr("checked","checked");
					}
					if (data.result1 == "2") {
						$("#radioICD0").attr("disabled","disabled");
						$("#radioICD1").attr("disabled","disabled");
						$("#addicd").css("visibility","hidden");
						$("#selectAll").attr("disabled","disabled");
						$(".diagnosisButton").attr("disabled","disabled");
					}
				}
			})
		}
	};
	
	$("#determineButton").click(function(){
		var time = new Date();
		var icd = $("#sumbut0").val();
		var radioICD = "";
		var item = $(":radio:checked");
		var len = item.length;
		if (len > 0) {
			radioICD = $(":radio:checked").val();
		} else {
			alert("请选择诊断类型！");
			return;
		}
		$.ajax({
			type:"post",
			url:"doctorBase/insertICDData",
			async:false,
			dataType:"json",
			data:{
				patientName:patientName,
				icd:icd,
				radioICD:radioICD,
				time:time
			},
			success:function(data){
				if (data.result0 == "1") {
					alert("添加成功！");
					return;
				}
				if (data.result0 == "0") {
					alert("ICD不存在！");
				} else {
					alert("错误！请刷新重试！");
				}
			}
		})
		
	});
	
	$("#diagnosisButton0").click(function(){
		var selectAll = document.getElementsByName("sign");
		var selectData = {};
		var key = "key";
		var i = 0;
		var state = key + i;
		for (data in selectAll) {
			if (selectAll[data].checked) {
				selectData[state] = selectAll[data].value;
				i++;
				state = key + i;
			}
		}
		selectData["number"] = i;
		selectData["patientName"] = patientName;
		if (selectData.number == 0) {
			alert("请选择数据！");
			return;
		}
		if (!confirm("删除数据！")) {
			return;
		}
		$.ajax({
			type:"post",
			url:"doctorBase/deleteICD",
			dataType:"json",
			async:true,
			data: selectData,
			beforeSend: function(){
				$("#diagnosisButton0").attr({ disabled: "disabled" });
			},
			success:function(data) {
				if (data.result0) {
					alert("删除成功！");
				} else {
					alert("删除失败！数据可能已被修改！请刷新重试！");
				}				
			},
			error:function(data) {
				alert("连接出错！删除失败！请刷新重试！");
			},
			complete:function(XMLHttpRequest, textStatus) {
				$("#diagnosisButton0").removeAttr("disabled");
			}
		})
	});
	
	$("#buttonTemporaryStorage").click(function(){
		saveIndexData("1");
	});
	
	$("#buttonSave").click(function(){
		saveIndexData("2");
	});
	
	function saveIndexData(data0) {
		var readme = $("#readme").val();
		var present= $("#present").val();
		var presenttreat= $("#presentTreat").val();
		var history= $("#history").val();
		var allergy= $("#allergy").val();
		var physique= $("#physique").val();
		var proposal= $("#proposal").val();
		var careful= $("#careful").val();
		var icd = $("#sumbut0").val();
		var radioICD = "";
		var item = $(":radio:checked");
		var len = item.length;
		if (len > 0) {
			radioICD = $(":radio:checked").val();
		} else {
			alert("请选择诊断类型！");
			return;
		}
		$.ajax({
			type:"post",
			url:"doctorBase/saveIndexData",
			dataType:"json",
			async:true,
			data: {
				radioICD:radioICD,
				patientName:patientName,
				data0:data0,
				readme:readme,
				present:present,
				presenttreat:presenttreat,
				history:history,
				allergy:allergy,
				physique:physique,
				proposal:proposal,
				careful:careful,
			},
			success:function(data) {
				if (data.result0) {
					alert("成功！");
				} else {
					alert("失败！请刷新重试！");
				}				
			}
		})
	}
	
})

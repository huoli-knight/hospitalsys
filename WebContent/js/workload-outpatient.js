$(function() {
	
	for (var i = 0; i < 9; i++) {
		$("tr.department").append("<td width=\"100\" class=\"fee" + i + "\">0</td>");
	}
	
	$("#search").click(function(){
		var startTime = $dp.$('logmin').value;
		var endTime = $dp.$('logmax').value;
		if (startTime == "" || endTime == "") {
			alert("请选择时间段！");
		}
		$.ajax({
			type:"post",
			url:"outPatient/getFeeData",
			async:false,
			datatype:"json",
			data:{
				startTime:startTime,
				endTime:endTime
			},
			success:function(resultData){
				var data = JSON.parse(resultData);
				var key0 = "department";
				var key = "";
				var number0 = "number";
				var number = "";
				var fee0 = "#department";
				var fee = "";
				var m = 6;
				for(var i = 18; i >= 11; i--, m--) {
					if (i == 13) {
						m++;
						continue;
					}
					key = key0 + i;
					for (var j = 0; j < 9; j++) {
						number = number0 + j;
						fee = fee0 + m + " .fee" + j;
						$(fee).html(data[key][number]);		
					}
				}
				for(var i = 0; i < 9; i++) {
					fee = fee0 + "7" + " .fee" + i;
					number = number0 + i;
					$(fee).html(data["sum"][number]);	
				}
				for (var i = 0; i < 9; i++) {
					var container = "container" + i;
					var titlePie = ".titlePie:eq(" + i + ")";
					var tiltle = $(titlePie).html();
					var number = "number" + i;
					Highcharts.chart(container, {
					    chart: {
					        type: 'pie',
					        options3d: {
					            enabled: true,
					            alpha: 45,
					            beta: 0
					        }
					    },
					    title: {
					        text: tiltle + '分布'
					    },
					    tooltip: {
					        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
					    },
					    plotOptions: {
					        pie: {
					            allowPointSelect: true,
					            cursor: 'pointer',
					            depth: 35,
					            dataLabels: {
					                enabled: true,
					                format: '{point.name}'
					            }
					        }
					    },
					    series: [{
					        type: 'pie',
					        name: tiltle,
					        data: [
					            ['内科', 100 * parseFloat(data["department11"][number]) / parseFloat(data["sum"][number])],
					            ['外科', 100 * parseFloat(data["department12"][number]) / parseFloat(data["sum"][number])],
					            ['儿科', 100 * parseFloat(data["department14"][number]) / parseFloat(data["sum"][number])],
					            ['传染病科', 100 * parseFloat(data["department15"][number]) / parseFloat(data["sum"][number])],
					            ['妇产科', 100 * parseFloat(data["department16"][number]) / parseFloat(data["sum"][number])],
					            ['男科', 100 * parseFloat(data["department17"][number]) / parseFloat(data["sum"][number])],
					            ['其他科室', 100 * parseFloat(data["department18"][number]) / parseFloat(data["sum"][number])]
					        ]
					    }]
					});
				}
			}
		})
	})
});

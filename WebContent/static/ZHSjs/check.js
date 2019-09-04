var r_id                        //被选中患者id
var c_id                        //被选中项目id
var RecordType_flag = 0;        //项目类型标志位
var u_flag = true;              //是否需要获取医院员工信息标志位
var re_list = new Array();      //患者列表
var ch_list = new Array();      //项目列表
var file_list = [];


//按钮状态控制方法
function setdisabled(id, disabled_state) {
    var btn = document.getElementById(id);
    btn.disabled = disabled_state;
}

//收起结果录入面板方法
function rh() {
    var obj = document.getElementById("checkresult");
    obj.setAttribute("class", "card-body collapse");
    setdisabled("rc_btn", true);
    setdisabled("re_btn", true);
}

// function result_flag_change(resultflag) {
//     var v = document.getElementById("checkresult");
//     if (resultflag) {
//         v.setAttribute("class", "card-body collapse show")
//     } else {
//         v.setAttribute("class", "card-body collapse")
//     }
// }

//时间戳正确显示方法
function timestampToTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    Y = date.getFullYear() + '/';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '/';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y + M + D;
}


//患者查找方法
function p_search(recordType) {
    RecordType_flag = recordType;
    rh();
    setdisabled("e_btn", true);
    setdisabled("c_btn", true);
    document.getElementById("p_list1").innerHTML = "";
    document.getElementById("p_list2").innerHTML = "";
    document.getElementById("p_detail").innerHTML = "";
    document.getElementById("i_detail").innerHTML = "";
    var search_flag = true;
    var ch = document.getElementsByName("searchMethod");
    if (ch[0].checked) {
        search_flag = true;
    } else {
        search_flag = false;
    }
    var form = document.getElementById("formtest");
    var f_data = new FormData(form).get("p_info").replace(/\s+/g, "");
    if (f_data.length == 0) {
        alert("患者信息不能为空！")
    } else {
        var str = "";
        if (search_flag) {
            if (isNaN(Number(f_data))) {
                alert("病历号应为数字!");
                return;
            } else {
                str = str + "getRegisterByCasenumber?CaseNumber=" + f_data;
            }
        } else {
            str = str + "getRegisterByName?Name=" + f_data;
        }
        $.ajax({
            type: "get",
            url: str,
            dataType: "json",
            success: function (data) {
                console.log(data);
                re_list = data;
                document.getElementById("p_list1").innerHTML = "";
                document.getElementById("p_list2").innerHTML = "";
                for (var i = 0; i < data.length; i++) {
                    if (i < data.length / 2) {
                        var newTr = p_list1.insertRow();
                    } else {
                        var newTr = p_list2.insertRow();
                    }
                    var newTd0 = newTr.insertCell();
                    var newTd1 = newTr.insertCell();
                    var newTd2 = newTr.insertCell();
                    newTd0.innerHTML =
                        "<td>" +
                        "<div class=\"custom-control custom-radio\">" +
                        "<input id=\"user" + i + "\"name=\"showdetail\" type=\"radio\"" +
                        "class=\"custom-control-input\" onclick=\"showdetail(" + i + ")\">" +
                        "<label class=\"custom-control-label\" for=\"user" + i + "\"></label>" +
                        "</div>" +
                        "</td>"
                    newTd1.innerHTML = data[i].caseNumber;
                    newTd2.innerHTML = data[i].realName;
                }
                // alert("success");
            },
            error: function (data) {
                alert("error");
            }
        });
    }
}

//显示患者详细信息方法
function showdetail(choice) {
    r_id = re_list[choice].id;
    document.getElementById("p_detail").innerHTML = "";
    var newTr = p_detail.insertRow();
    var newTd0 = newTr.insertCell();
    var newTd1 = newTr.insertCell();
    var newTd2 = newTr.insertCell();
    var newTd3 = newTr.insertCell();
    var newTd4 = newTr.insertCell();
    var newTd5 = newTr.insertCell();
    var newTd6 = newTr.insertCell();
    var newTd7 = newTr.insertCell();
    var newTd8 = newTr.insertCell();
    var newTd9 = newTr.insertCell();
    newTd0.innerHTML = re_list[choice].caseNumber;
    newTd1.innerHTML = re_list[choice].realName;
    newTd2.innerHTML = re_list[choice].constantName;
    newTd3.innerHTML = re_list[choice].idnumber;
    newTd4.innerHTML = timestampToTime(re_list[choice].birthDate);
    newTd5.innerHTML = re_list[choice].age + re_list[choice].ageType;
    newTd6.innerHTML = re_list[choice].homeAddress;
    newTd7.innerHTML = timestampToTime(re_list[choice].visitDate);
    newTd8.innerHTML = re_list[choice].noon;
    newTd9.innerHTML = timestampToTime(re_list[choice].registTime);
    showitem(r_id, 0);
    setdisabled("e_btn", false);
    setdisabled("c_btn", true);
    rh();
}

//显示患者包含项目信息方法
function showitem(Rid, value) {
    console.log(RecordType_flag);
    $.ajax({
        async: false,
        type: "post",
        url: "getCheckApplyByRid",
        data: { "Rid": Rid, "State": value, "RecordType": RecordType_flag },
        dataType: "json",
        success: function (data) {
            ch_list = data;
            console.log(data);
            document.getElementById("i_detail").innerHTML = "";
            for (i = 0; i < data.length; i++) {
                var newTr = i_detail.insertRow();
                var newTd0 = newTr.insertCell();
                var newTd1 = newTr.insertCell();
                var newTd2 = newTr.insertCell();
                var newTd3 = newTr.insertCell();
                var newTd4 = newTr.insertCell();
                var newTd5 = newTr.insertCell();
                var newTd6 = newTr.insertCell();
                var newTd7 = newTr.insertCell();
                var newTd8 = newTr.insertCell();
                newTd0.innerHTML = "<td>" +
                    "<div class=\"custom-control custom-radio\">" +
                    "<input id=\"item" + i + "\"name=\"itemexecute\" type=\"radio\"" +
                    "class=\"custom-control-input\" onclick=\"result(" + i + ")\" disabled>" +
                    "<label class=\"custom-control-label\" for=\"item" + i + "\"></label>" +
                    "</div>" +
                    "</td>";
                newTd1.innerHTML = data[i].itemID;
                newTd2.innerHTML = data[i].name;
                newTd3.innerHTML = data[i].isUrgent;
                newTd4.innerHTML = data[i].objective;
                newTd5.innerHTML = data[i].position;
                newTd6.innerHTML = data[i].num;
                newTd7.innerHTML = timestampToTime(data[i].creationTime);
                newTd8.innerHTML = data[i].state;
            }
            // alert("success");
        },
        error: function (data) {
            alert("error");
        }
    });
}

//确认执行更新状态（3-4）方法
function updateState(old_State, new_State) {
    var update_flag = false;
    $.ajax({
        async: false,
        type: "post",
        url: "updateStateByRid",
        data: { "Rid": r_id, "old_State": old_State, "new_State": new_State },
        dataType: "json",
        success: function (data) {
            update_flag = true;
            // alert("exe_success");
        },
        error: function () {
            alert("update_error");
        }
    })
    return update_flag;
}

//确认执行回显方法
function execute() {
    if (updateState(3, 4)) {
        showitem(r_id, 3);
        var rad = document.getElementsByName("itemexecute");
        for (i = 0; i < rad.length; i++) {
            rad[i].disabled = false;
        }
        setdisabled("e_btn", true);
        setdisabled("c_btn", false);
        // alert("exe_success");
    } else {
        alert("exe_error");
    }
}

//取消执行回显方法
function cancel() {
    if (updateState(4, 3)) {
        showitem(r_id, 0);
        var rad = document.getElementsByName("itemexecute");
        for (i = 0; i < rad.length; i++) {
            rad[i].checked = false;
            rad[i].disabled = true;
        }
        setdisabled("e_btn", false);
        setdisabled("c_btn", true);
        rh();
        // alert("can_success");
    } else {
        alert("can_error");
    }
}

//查询医院职员信息
function result(choice) {
    c_id = choice;
    setdisabled("re_btn", false);
    if (u_flag) {
        $.ajax({
            type: "get",
            url: "getUser",
            dataType: "json",
            success: function (data) {
                u_flag = false;
                console.log(data);
                var check_obj = document.getElementById("check_oper");
                for (var i = 0; i < data.length; i++) {
                    check_obj.options[i] = new Option(data[i].realName, data[i].id);
                }
                var result_obj = document.getElementById("result_oper");
                for (var i = 0; i < data.length; i++) {
                    result_obj.options[i] = new Option(data[i].realName, data[i].id);
                }
                // alert("res_success");
            },
            error: function () {
                alert("res_error");
            }
        })
    }
}

//结果录入，面板控制方法
function re() {
    var obj = document.getElementById("checkresult");
    obj.setAttribute("class", "card-body show");
    setdisabled("re_btn", true);
    setdisabled("rc_btn", false);
}

//取消录入，面板控制方法
function rc() {
    var obj = document.getElementById("checkresult");
    obj.setAttribute("class", "card-body collapse");
    setdisabled("rc_btn", true);
    setdisabled("re_btn", false);
}

//结果录入方法
function record() {
    var obj = document.getElementById("checkapply_id");
    obj.setAttribute("value", ch_list[c_id].id);
    var fo = document.getElementById("res_form");
    var formdata = new FormData(fo);
    console.log(file_list.length);
    for (var i = 0; i < file_list.length; i++) {
        formdata.append("resimg", file_list[i]);
    }
    for (var pair of formdata.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
    }
    $.ajax({
        async: false,
        contentType: false,
        processData: false,
        type: "post",
        url: "updateResult",
        data: formdata,
        dataType: "json",
        success: function (data) {
            alert("rec_success");
        },
        error: function () {
            alert("rec_error");
        }
    })
}

$(function () {
    $("#input_file").change(function () {
        var datafile = this.files[0];
        file_list.push(datafile);
    });
});
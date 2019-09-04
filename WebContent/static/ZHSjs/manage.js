var c_flag = [false, false, false];
var fmed_list = new Array();
var f_id;
var file_formdata = new FormData();

$.ajax({
    type: "get",
    url: "getDepartment",
    dataType: "json",
    success: function (data) {
        // console.log(data);
        var obj = document.getElementsByName("DeptID");
        for (i = 0; i < obj.length; i++) {
            for (j = 0; j < data.length; j++) {
                obj[i].options[j] = new Option(data[j].deptName, data[j].id);
            }
        }
        // alert("res_success");
    },
    error: function () {
        alert("res_error");
    }
})

$.ajax({
    type: "get",
    url: "getExpenseClass",
    dataType: "json",
    success: function (data) {
        // console.log(data);
        var obj = document.getElementsByName("ExpClassID");
        for (i = 0; i < obj.length; i++) {
            for (j = 0; j < data.length; j++) {
                obj[i].options[j] = new Option(data[j].expName, data[j].id);
            }
        }
        // alert("res_success");
    },
    error: function () {
        alert("res_error");
    }
})

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

function setdisabled(id, disabled_state) {
    var btn = document.getElementById(id);
    btn.disabled = disabled_state;
}

function myfunc1(id1, id2, k) {
    var checkbox = document.getElementById(id1);
    var input = document.getElementById(id2);
    if (checkbox.checked) {
        input.disabled = false;
        c_flag[k] = true;
    } else {
        input.disabled = "true";
        c_flag[k] = false;
    }
    if (c_flag[0] || c_flag[1] || c_flag[2]) {
        setdisabled("sea_btn", false);
    } else {
        setdisabled("sea_btn", true);
    }
}

function createFmeditem() {
    var obj = document.getElementById("fmeditem_cdate");
    obj.setAttribute("value", new Date());
    var obj = document.getElementById("fmeditem_ldate");
    obj.setAttribute("value", new Date());

    var fo = document.getElementById("create_Fmeditem");
    var formdata = new FormData(fo);

    // for (pairs of formdata.entries()) {
    //     console.log(pairs[0] + "," + pairs[1])
    // }

    create_flag = true;
    if (formdata.get("ItemCode").replace(/\s+/g, "").length == 0) {
        alert("项目编码不能为空!")
        create_flag = false;
    }
    if (formdata.get("ItemName").replace(/\s+/g, "").length == 0) {
        alert("项目名称不能为空!")
        create_flag = false;
    }
    if (formdata.get("Price").replace(/\s+/g, "").length == 0) {
        alert("项目单价不能为空!")
        create_flag = false;
    }
    if (create_flag) {
        $.ajax({
            async: false,
            contentType: false,
            processData: false,
            type: "post",
            url: "addFemditem",
            data: formdata,
            dataType: "json",
            success: function (data) {
                alert("create_success");
            },
            error: function () {
                alert("create_error");
            }
        })
    }
}

function updateFmeditem(r_url) {
    update_flag = false;
    var obj = document.getElementById("fmeditem_id");
    obj.setAttribute("value", fmed_list[f_id].id);
    var obj = document.getElementById("fmeditem_cdate");
    obj.setAttribute("value", timestampToTime(fmed_list[f_id].creationDate));
    var obj = document.getElementById("fmeditem_ldate");
    obj.setAttribute("value", new Date());

    var fo = document.getElementById("update_Fmeditem");
    var formdata = new FormData(fo);

    // for (pairs of formdata.entries()) {
    //     console.log(pairs[0] + "," + pairs[1])
    // }

    $.ajax({
        async: false,
        contentType: false,
        processData: false,
        type: "post",
        url: r_url,
        data: formdata,
        dataType: "json",
        success: function (data) {
            alert("update_success");
            update_flag = true;
            searchFmeditem();
        },
        error: function () {
            alert("update_error");
        }
    })
    return update_flag;
}

function searchFmeditem() {
    var fo = document.getElementById("searchMethod");
    var formdata = new FormData(fo);

    // for (pairs of formdata.entries()) {
    //     console.log(pairs[0] + "," + pairs[1])
    // }

    $.ajax({
        async: false,
        contentType: false,
        processData: false,
        type: "post",
        url: "getFemditem",
        data: formdata,
        dataType: "json",
        success: function (data) {
            // alert("search_success");
            console.log(data);
            fmed_list = data;
            document.getElementById("Fmeditem_list").innerHTML = "";
            for (i = 0; i < data.length; i++) {
                var newTr = Fmeditem_list.insertRow();
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
                var newTd10 = newTr.insertCell();
                var newTd11 = newTr.insertCell();
                newTd0.innerHTML = "<td>" +
                    "<div class=\"custom-control custom-radio\">" +
                    "<input id=\"Fmeditem" + i + "\"name=\"Fmedop\" type=\"radio\"" +
                    "class=\"custom-control-input\" onclick=\"opreat(" + i + ")\">" +
                    "<label class=\"custom-control-label\" for=\"Fmeditem" + i + "\"></label>" +
                    "</div>" +
                    "</td>";
                newTd1.innerHTML = data[i].id;
                newTd2.innerHTML = data[i].itemCode;
                newTd3.innerHTML = data[i].itemName;
                newTd4.innerHTML = data[i].format;
                newTd5.innerHTML = data[i].price;
                newTd6.innerHTML = data[i].expName;
                newTd7.innerHTML = data[i].deptName;
                newTd8.innerHTML = data[i].mnemonicCode;
                newTd9.innerHTML = timestampToTime(data[i].creationDate);
                newTd10.innerHTML = timestampToTime(data[i].lastUpdateDate);
                newTd11.innerHTML = data[i].recordType;
            }
            setdisabled("cha_btn", true);
            setdisabled("del_btn", true);
        },
        error: function () {
            alert("search_error");
        }
    })
}

function opreat(choice) {
    f_id = choice;
    setdisabled("cha_btn", false);
    setdisabled("del_btn", false);
    var obj1 = document.getElementById("itemCode");
    obj1.setAttribute("value", fmed_list[choice].itemCode);
    var obj2 = document.getElementById("itemName");
    obj2.setAttribute("value", fmed_list[choice].itemName);
    var obj3 = document.getElementById("format");
    obj3.setAttribute("value", fmed_list[choice].format);
    var obj4 = document.getElementById("price");
    obj4.setAttribute("value", fmed_list[choice].price);
    var obj5 = document.getElementById("mnemonicCode");
    obj5.setAttribute("value", fmed_list[choice].mnemonicCode);
    var obj6 = document.getElementById("recordType");
    for (i = 0; i < obj6.length; i++) {
        if (obj6.options[i].value == fmed_list[choice].recordType) {
            // console.log(obj6.options[i].value + ',' + obj6.options[i].text);
            obj6.options[i].selected = true;
            break;
        }
    }
    var obj7 = document.getElementById("expClassID");
    for (i = 0; i < obj7.length; i++) {
        if (obj7.options[i].value == fmed_list[choice].expClassID) {
            // console.log(obj7.options[i].value + ',' + obj7.options[i].text);
            obj7.options[i].selected = true;
            break;
        }
    }
    var obj8 = document.getElementById("deptID");
    for (i = 0; i < obj8.length; i++) {
        if (obj8.options[i].value == fmed_list[choice].deptID) {
            // console.log(obj8.options[i].value + ',' + obj8.options[i].text);
            obj8.options[i].selected = true;
            break;
        }
    }
}

function change() {
    var obj1 = document.getElementById("create");
    obj1.hidden = true;
    var obj2 = document.getElementById("update");
    obj2.hidden = false;
    setdisabled("sea_btn", true);
    setdisabled("can_btn", false);
}

function reset() {
    var obj1 = document.getElementById("create");
    obj1.hidden = false;
    var obj2 = document.getElementById("update");
    obj2.hidden = true;
    setdisabled("sea_btn", false);
    setdisabled("cha_btn", false);
    setdisabled("can_btn", true);
    setdisabled("del_btn", false);
}

function setchangeurl() {
    var str = "updateFmeditem";
    if (updateFmeditem(str)) {
        var obj1 = document.getElementById("create");
        obj1.hidden = false;
        var obj2 = document.getElementById("update");
        obj2.hidden = true;
        setdisabled("sea_btn", false);
    }

}

function setdeleteurl() {
    var str = "deleteFmeditem";
    updateFmeditem(str);
}

function dataexport() {
    var obj = document.getElementById("path");
    var path = obj.value;
    $.ajax({
        async: false,
        type: "post",
        url: "dataexport",
        data: { "Path": path },
        dataType: "json",
        success: function (data) {
            alert("export_success");
        },
        error: function () {
            alert("export_error");
        }
    })
}

function dataimport() {
    $.ajax({
        async: false,
        contentType: false,
        processData: false,
        type: "post",
        url: "dataimport",
        data: file_formdata,
        dataType: "json",
        success: function (data) {
            alert("import_success");
        },
        error: function () {
            alert("import_error");
        }
    })
}

$(function () {
    $("#datafile").change(function () {
        var datafile = this.files[0];
        console.log(datafile);
        file_formdata.append("datafile", datafile);
        console.log(file_formdata.get("datafile"));
        setdisabled("imp_btn", false);
    });
});
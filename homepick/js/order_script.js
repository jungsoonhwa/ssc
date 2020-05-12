var add_cnt = 1;
var filter = "win16|win32|win64|mac|macintel"; // PC, Mobile 구분

function numberCheck(obj) {
    obj.value = obj.value.replace(/[^0-9]/g, '');
}

function showTime(select) {
    var orderDate = $("select[name='pick_date']").val();

    var sender_addr_zonecode = $("input[name='sender_addr_zonecode']").val();
    if (orderDate != "" && sender_addr_zonecode != "") {
        document.getElementById("time_select").innerHTML = "";
        $.ajax({
            type: 'GET',
            data: {
                orderDate: orderDate,
                sender_addr_zonecode: sender_addr_zonecode
            },
            url: '/ajax/getOrderTime',
            success: function(result) {
                // console.log(result);
                // if(result.status.trim() != 'error') {
                document.getElementById("visit_date").style.display = '';
                document.getElementById("time_select").innerHTML = result;
                // } else {
                // 	bootbox.alert(result.message);
                // 	return false;
                // }
            },
            error: function(xhr, status, errors) {
                console.log(xhr);
                console.log(status);
                console.log(errors);
            }
        });
    } else {
        if (select == '1') {
            bootbox.alert('방문이 필요한 주소와 방문일을 정확히 확인해 주세요.');
        }
    }
}

function setAddress(order, type, name, tel, zipcode, bname, addr1, addr2, pickup_type) {
    //alert('11111');
    if (type == 'SND') {

        $.ajax({
            type: 'get',
            url: "/order/getRegionArea",
            data: {
                post_code: zipcode
            },
            success: function(result) {
                if (zipcode != '') {
                    $('#pick_date').html(result.pick_date);
                }
                if (result.status.trim() == 'error') {
                    bootbox.alert('방문 가능 지역이 아닙니다.');
                    document.getElementById('veil').style.display = 'none';
                    document.body.style.overflow = "auto";
                    document.getElementById('sender_addr_zonecode').value = '';
                    document.getElementById('sender_addr1').value = '';
                    document.getElementById('sender_addr2').value = '';
                    document.getElementById('pickup_type').value = '';
                    document.getElementById('pick_date_message_m').innerHTML = result.message;
                    $("#visit_date").css('display', 'none');
                    closeAddress();
                    return false;
                } else if (result.pickup_type.trim() == 'D' || result.pickup_type.trim() == 'C') { //2020-02-19 'C' 수정
                    bootbox.alert(result.message);
                    document.getElementById('sender_addr_zonecode').value = zipcode; //5자리 새우편번호 사용
                    document.getElementById('sender_addr1').value = addr1;
                    document.getElementById('sender_bname').value = bname;
                    document.getElementById('sender_name').value = name;
                    document.getElementById('sender_mobile').value = tel;
                    document.getElementById('pickup_type').value = result.pickup_type;
                    document.getElementById('veil').style.display = 'none';
                    document.getElementById('sender_addr2').value = addr2;
                    document.getElementById('sender_addr2').focus();
                    document.getElementById('pick_date_message_m').innerHTML = result.message;
                    $("#visit_date").css('display', '');
                    showTime();
                    closeAddress();
                    return true;
                } else if (result.pickup_type.trim() == 'I') { //2020-02-19 'C' 위로 이동
                    bootbox.alert(result.message);
                    document.getElementById('veil').style.display = 'none';
                    document.body.style.overflow = "auto";
                    document.getElementById('sender_addr_zonecode').value = '';
                    document.getElementById('sender_addr1').value = '';
                    document.getElementById('sender_addr2').value = '';
                    document.getElementById('pickup_type').value = '';
                    document.getElementById('pick_date_message_m').innerHTML = result.message;
                    $("#visit_date").css('display', 'none');
                    closeAddress();
                    return false;
                } else if (result.pickup_type.trim() == 'H') {
                    bootbox.alert(result.message);
                    document.getElementById('sender_addr_zonecode').value = zipcode; //5자리 새우편번호 사용
                    document.getElementById('sender_addr1').value = addr1;
                    document.getElementById('sender_bname').value = bname;
                    document.getElementById('sender_name').value = name;
                    document.getElementById('sender_mobile').value = tel;
                    document.getElementById('pickup_type').value = result.pickup_type;
                    document.getElementById('veil').style.display = 'none';
                    document.getElementById('sender_addr2').focus();
                    document.getElementById('pick_date_message_m').innerHTML = result.message;
                    $("#visit_date").css('display', '');
                    showTime();
                    closeAddress();
                    return true;
                } else if (result.pickup_type.trim() == 'S') {
                    bootbox.alert(result.message);
                    document.getElementById('sender_addr_zonecode').value = zipcode; //5자리 새우편번호 사용
                    document.getElementById('sender_addr1').value = fullAddr;
                    document.getElementById('sender_bname').value = bname;
                    document.getElementById('sender_name').value = name;
                    document.getElementById('sender_mobile').value = tel;
                    document.getElementById('pickup_type').value = result.pickup_type;
                    document.getElementById('veil').style.display = 'none';
                    document.getElementById('sender_addr2').focus();
                    document.getElementById('pick_date_message_m').innerHTML = result.message;
                    $("#visit_date").css('display', '');
                    showTime();
                    closeAddress();
                    return true;
                } else {
                    $("input[name='office_code']").val(result.office_code);
                    document.getElementById('sender_addr_zonecode').value = zipcode; //5자리 새우편번호 사용
                    document.getElementById('sender_addr1').value = addr1;
                    document.getElementById('sender_bname').value = bname;
                    document.getElementById('sender_name').value = name;
                    document.getElementById('sender_mobile').value = tel;
                    <!-- document.getElementById('pickup_type').value = result.pickup_type; -->
                    document.getElementById('veil').style.display = 'none';
                    document.getElementById('sender_addr2').value = addr2;
                    document.getElementById('sender_addr2').focus();
                    document.getElementById('pick_date_message_m').innerHTML = result.message;
                    $("#visit_date").css('display', '');
                    showTime();
                    closeAddress();
                    return true;
                }
            }
        });

    } else if (type == 'RCV') {

        // var order_list = 2 * (order + 1) - 1;
        $("input[name='receiver_name[]']").eq(order).val(name);
        $("input[name='receiver_mobile[]']").eq(order).val(tel);
        $("input[name='receiver_addr_zonecode[]']").eq(order).val(zipcode);
        $("input[name='receiver_bname[]']").eq(order).val(bname);
        //$("input[name='receiver_addr1[]']").eq(order).val(addr1);
        document.getElementById('receiver_addr1').value = addr1;
        $("input[name='receiver_addr2[]']").eq(order).val(addr2);
        closeAddress();
        return;
    } else if (type == 'L') {
        var btn_object = document.getElementsByClassName('recent_list')[order];
        btn_object.parentNode.parentNode.parentNode.getElementsByClassName('receiver_name_hidden')[0].value = name;
        btn_object.parentNode.parentNode.parentNode.getElementsByClassName('receiver_mobile_hidden')[0].value = tel;
        btn_object.parentNode.parentNode.parentNode.getElementsByClassName('receiver_addr_zonecode_hidden')[0].value = zipcode;
        btn_object.parentNode.parentNode.parentNode.getElementsByClassName('receiver_bname_hidden')[0].value = bname;
        btn_object.parentNode.parentNode.parentNode.getElementsByClassName('receiver_addr1_hidden')[0].value = addr1;
        btn_object.parentNode.parentNode.parentNode.getElementsByClassName('receiver_addr2_hidden')[0].value = addr2;

        btn_object.parentNode.parentNode.parentNode.getElementsByTagName('p')[0].innerHTML = '<strong>' + name + '</strong>';
        btn_object.parentNode.parentNode.parentNode.getElementsByTagName('p')[1].innerHTML = '[' + zipcode + '] ' + addr1 + ' ' + addr2;
        btn_object.parentNode.parentNode.parentNode.getElementsByTagName('p')[2].innerHTML = tel;

        var btn_layer = btn_object.parentNode.parentNode.getElementsByClassName('recent_left')[0].getElementsByTagName('button');

        for (var i = 0; i < btn_layer.length; i++) {
            btn_layer[i].classList.remove('on');
        }

        closeAddress();
        return;
    }
}

function closeAddress() {
    $("#veil").css('display', 'none');
    $("#address_pop").css('display', 'none');
}

function show_items(obj) {
    var order_area = obj.parentNode.getElementsByTagName('div')[0];

    if (order_area.style.display == '' || order_area.style.display == 'block') {
        obj.classList.add('active');
        //$(order_area).hide('slow');
        $(order_area).slideUp();
    } else if (order_area.style.display == 'none') {
        obj.classList.remove('active');
        //$(order_area).show('slow');;
        $(order_area).slideDown();
    }
}

function showDeliveryDisable() {
    document.getElementById('veil').style.display = 'block';
    document.getElementById('pre_pop2').style.display = 'block';
}

function hideDeliveryDisable() {
    document.getElementById('veil').style.display = 'none';
    document.getElementById('pre_pop2').style.display = 'none';
}

function showBoxTypeCode() {
    document.getElementById('veil').style.display = 'block';
    document.getElementById('pre_pop3').style.display = 'block';
}

function hideBoxTypeCode() {
    document.getElementById('veil').style.display = 'none';
    document.getElementById('pre_pop3').style.display = 'none';
}

function showCategoryCode() {
    document.getElementById('veil').style.display = 'block';
    document.getElementById('pre_pop4').style.display = 'block';
}

function hideCategoryCode() {
    document.getElementById('veil').style.display = 'none';
    document.getElementById('pre_pop4').style.display = 'none';
}

function showPackingDisable(category_code) {
    if (category_code != '') {
        $.ajax({
            type: 'GET',
            url: '/ajax/getPackingImage',
            data: {
                category_code: category_code
            },
            success: function(result) {
                if (navigator.platform) {
                    // PC
                    if (filter.indexOf(navigator.platform.toLowerCase()) > 0) {
                        document.getElementById('packing').src = '/images/packing/pc_' + result;
                    } else { // Mobile
                        document.getElementById('packing').style.width = '80%';
                        document.getElementById('packing').src = '/images/packing/' + result;
                    }
                }

                document.getElementById('veil').style.display = 'block';
                document.getElementById('pre_pop5').style.display = 'block';
            }
        });

    }
}

function hidePackingDisable() {

    document.getElementById('veil').style.display = 'none';
    document.getElementById('pre_pop5').style.display = 'none';
}

function tab_change(obj, tab_id) {
    var tab_area = obj.parentNode;

    var tab_obj0 = tab_area.getElementsByClassName('receiver_tab')[0].getElementsByClassName('disable_input');
    var tab_obj1 = tab_area.getElementsByClassName('receiver_tab')[1].getElementsByClassName('disable_input');

    if (tab_id == 0) {
        tab_area.getElementsByTagName('input')[0].checked = true;
        tab_area.getElementsByTagName('input')[1].checked = false;
        for (var i = 0; i < tab_obj0.length; i++) {
            tab_obj0[i].disabled = false;
            tab_obj0[i].setAttribute('name', tab_obj0[i].name.replace('temp', ''));
        }
        for (var j = 0; j < tab_obj1.length; j++) {
            tab_obj1[j].disabled = true;
            tab_obj1[j].setAttribute('name', tab_obj1[j].name.replace('temp', ''));
            tab_obj1[j].setAttribute('name', 'temp' + tab_obj1[j].name);
        }
    } else if (tab_id == 1) {
        tab_area.getElementsByTagName('input')[1].checked = true;
        tab_area.getElementsByTagName('input')[0].checked = false;
        for (var i = 0; i < tab_obj0.length; i++) {
            tab_obj0[i].disabled = true;
            tab_obj0[i].setAttribute('name', tab_obj0[i].name.replace('temp', ''));
            tab_obj0[i].setAttribute('name', 'temp' + tab_obj0[i].name);
        }
        for (var j = 0; j < tab_obj1.length; j++) {
            tab_obj1[j].disabled = false;
            tab_obj1[j].setAttribute('name', tab_obj1[j].name.replace('temp', ''));
        }
    }
}

function add_item() {
    if (add_cnt >= 9) {
        bootbox.alert('할인혜택이 제공되는 대량 등록을 이용해 주세요');
        return false;
    }

    $.ajax({
        type: 'get',
        url: '/ajax/addOrder',
        data: {
            list_num: add_cnt
        },
        success: function(result) {
            $("#receiver_form").append(result);
            var list_view = document.getElementById('receiver_form').getElementsByClassName('list_num');
            for (var i = 0; i < list_view.length; i++) {
                list_view[i].innerHTML = i + 2;
            }
        }
    });

    add_cnt++;

    console.log(add_cnt);
}

function list_del(obj) {
    document.getElementById('receiver_form').removeChild(obj.parentNode.parentNode);
    var list_view = document.getElementById('receiver_form').getElementsByClassName('list_num');
    for (var i = 0; i < list_view.length; i++) {
        list_view[i].innerHTML = i + 2;
    }

    add_cnt--;
}

function now_setdel(obj) {
    var setBtns = obj.parentNode.getElementsByTagName('button');
    var inputObject = obj.parentNode.parentNode.parentNode.parentNode;
    var hiddenInput = inputObject.getElementsByTagName('input');
    var textArea = inputObject.getElementsByTagName('p');

    var classes = "";

    for (var h = 0; h < setBtns.length; h++) {
        classes = setBtns[h].classList;

        if (classes.length > 1) {
            for (var i = 0; i < setBtns.length; i++) {
                setBtns[i].classList.remove('on');
            }

            for (var j = 0; j < hiddenInput.length; j++) {
                hiddenInput[j].value = '';
            }

            for (var k = 0; k < textArea.length; k++) {
                textArea[k].innerHTML = '';
            }
        }
    }
}
var ws, name,client_list={};
function connect() {
    // 创建websocket
    //判断当前浏览器是否支持WebSocket
    if ('WebSocket' in window) {
        ws = new WebSocket("ws://127.0.0.1:8088/WebSocket/23/Lebron");
    }
    else {
        alert('当前浏览器 Not support websocket');
    }
    // 当socket连接打开时，输入用户名
    ws.onopen = function(){
        var login_data = '{"type":"login"}';
        console.log("websocket握手成功，发送登录数据:"+login_data);
        ws.send(login_data);
    };
    // 当有消息时根据消息类型显示不同信息
    ws.onmessage = onmessage; 
    ws.onclose = function() {
      console.log("连接关闭，定时重连");
      connect();
    };
    ws.onerror = function() {
        console.log("出现错误");
    };
}
// 服务端发来消息时
function onmessage(e)
{
    console.log(e.data);
    var data = eval("("+e.data+")");
    switch(data['type']){
        // 服务端ping客户端
        case 'ping':
            ws.send('{"type":"pong"}');
            break;
        case 'robotnet':
            $("#robot_net").empty().append(data['state']=="RO"?"离线"+data['time']:"在线"+data['time']);
            break;
        case 'robot':
            $state=data['control']=="Send Success"?alert("发送成功！"):($state=data['control']=="System Outline"?alert("系统离线！"):alert())
            break;
        case 'pvsystem':
            $("#system-net-state").empty().append(data['state']=='out'?"离线":"在线");
            break;
        case 'robotstate':
            $("#robot_net,#robot_run,#sweap_record,#robot_wrong,#robot_period").empty();
            $("#robot_net").append(data['robotnet']=='unkown'?"--":(data['robotnet']=='RO'?"离线"+data['time']:"在线"+data['time']));
            $("#robot_run").append(data['runstate']=='unkown'?"--":
                        (data['runstate']=='0'?"休眠":
                            (data['runstate']=='1'?"停止":
                                (data['runstate']=='2'?"正转":
                                    (data['runstate']=='4'?"反转":"自动往返")))));
            $("#sweap_record").append(data['lastweap']=='unkown'?"--":data['lastweap']+"天前");
            $("#robot_wrong").append(data['error']=='unkown'?"--":
                        (data['error']=='1'?"电池电量不足":
                            (data['error']=='2'?"温度异常":
                                (data['error']=='3'?"堵转不灵":
                                    (data['error']=='4'?"超过设定时间未工作":"正常")))));
            $("#robot_period").append(data['period']=='unkown'?"--":data['period']+"天");
            break;
        case 'login':
            $("#system-net-state").empty().append(data['system']=='on'?"在线":"离线");
            alert('siouoiuoi');
            break;
        case 'sensor_data':
            flush_sensor_data(data['data']);
            updatebar(data['data']);
            break;
        case 'test':
            break;
    }
}

// 提交对话
function onSubmit() {
  var input = document.getElementById("textarea");
  var to_client_id = $("#client_list option:selected").attr("value");
  var to_client_name = $("#client_list option:selected").text();
  ws.send('{"type":"say","to_client_id":"'+to_client_id+'","to_client_name":"'+to_client_name+'","content":"'+input.value.replace(/"/g, '\\"').replace(/\n/g,'\\n').replace(/\r/g, '\\r')+'"}');
  input.value = "";
  input.focus();
}
//update sensor data
function flush_sensor_data($data){
    $("#updatetime").empty().append($data[0]);
    $("#temp").empty().append($data[1]);
    $("#hum").empty().append($data[2]);
    $("#pmten").empty().append($data[5]);
    $("#pvtemp").empty().append($data[6]);
    $("#radiation").empty().append($data[7]);
    $("#volt").empty().append($data[8]);
    $("#current1").empty().append($data[9]);
    $("#current2").empty().append($data[10]);
    $("#current3").empty().append($data[11]);
    $("#current4").empty().append($data[12]);
}
function updatebar($Data)
{
    config2.data.datasets.forEach(function(dataset,index) { dataset.data.splice(0,4);})
    config2.data.datasets.forEach(function(dataset,index) { dataset.data.push($Data[8]*$Data[9]);})
    config2.data.datasets.forEach(function(dataset,index) { dataset.data.push($Data[8]*$Data[10]);})
    config2.data.datasets.forEach(function(dataset,index) { dataset.data.push($Data[8]*$Data[11]);})
    config2.data.datasets.forEach(function(dataset,index) { dataset.data.push($Data[8]*$Data[12]);})
    barfig.update();
}
// 发言
function say(from_client_id, from_client_name, content, time){
    $("#dialog").append('<div class="speech_item"><img src="http://lorempixel.com/38/38/?'+from_client_id+'" class="user_icon" /> '+from_client_name+' <br> '+time+'<div style="clear:both;"></div><p class="triangle-isosceles top">'+content+'</p> </div>');
}

$(function(){
    select_client_id = 'all';
    $("#client_list").change(function(){
          select_client_id = $("#client_list option:selected").attr("value");
    });
});

//$('button#f')

function Send_to_robot($robot_act)
{
   if(confirm("确定发送控制命令？"))
   {
    var robot_ctr_msg = '{"type":"robot","robotcmd":"'+$robot_act+'"}';
     ws.send(robot_ctr_msg);
   }
  
}

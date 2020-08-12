var selecteddata;
var starttime;
var endtime;
var dbdata;
window.onload = function() 
{ 
    connect();
    draw();
    getdatafromDB(); 
   
};

var getdatafromDB = function(){ 
    
    var date=new Date();
    endtime='begin';
    starttime='begin';
    $.ajax({  
        type:"post",  
        url: "lastdata",
        data: {},
        dataType:"json", 
        error: function(){    
             alert('Error loading XML document');    
         },    
        success:function(msg){
            console.info(msg);
            dbdata=msg; 
            bar(dbdata);
            insertvcdata(dbdata);
            updatewebdata(dbdata[dbdata.length-1]);
            mychart.update(); 
            barfig.update(); 
        }  
    }); 
    
}; 
function updatewebdata(data)
{
    
    $("#updatetime").append(data.date);
    $("#temp").append(data.tempreature);
    $("#hum").append(data['humidity']);
    $("#pmten").append(data['pm10']);
    $("#pvtemp").append(data['pvtempreature']);
    $("#radiation").append(data['radiation']);
    $("#volt").append(data['vlot']);
    $("#current1").append(data['current1']);
    $("#current2").append(data['current2']);
    $("#current3").append(data['current3']);
    $("#current4").append(data['current4']);
}
var colorNames = Object.keys(window.chartColors);
function bar(Data)  
{
    var len=selecteddata.length;
    config.data.labels.splice(0,config.data.labels.length);
    config.data.datasets.splice(0,config.data.datasets.length);
    if(Data.length==null || Data.length == 0)  
    return; 
    var f=Data.length-120;
    if(f<0)f=0;
    for(var i=f;i<Data.length;i++){
        config.data.labels.push(Data[i].date);
    } 
    for(var j=0;j<len;j++)
    {
        var colorName = colorNames[config.data.datasets.length % colorNames.length];
        var newColor = window.chartColors[colorName];
        var newDataset = {
            label: selecteddata[j],
            backgroundColor: newColor,
            borderColor: newColor,
            borderWidth: '2',
            data: [],
            fill: false,
            pointRadius:1,
        };
        for(var i=f;i<Data.length;i++)  
        {
            newDataset.data.push(Data[i][selecteddata[j]]);
        } 
        config.data.datasets.push(newDataset); 
       
    }   
}
function insertvcdata(Data)
{ 
    var i=Data.length-1;
    config2.data.datasets.forEach(function(dataset,index) { dataset.data.push(Data[i].vlot*Data[i].current1);})
    config2.data.datasets.forEach(function(dataset,index) { dataset.data.push(Data[i].vlot*Data[i].current2);})
    config2.data.datasets.forEach(function(dataset,index) { dataset.data.push(Data[i].vlot*Data[i].current3);})
    config2.data.datasets.forEach(function(dataset,index) { dataset.data.push(Data[i].vlot*Data[i].current4);})
    
}
function draw(){
    var ctx = document.getElementById("canvas").getContext("2d");
    mychart =new  Chart(ctx, config);
    var ctx2 = document.getElementById("canvas2").getContext("2d");
    barfig= new Chart(ctx2, config2);
}   
var config = {
    type: 'line',
    data: {
        labels: [],
        datasets: []
    
    },
    options: {
        responsive: true,
        title:{
            display:true,
            text:'温度变化曲线'
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'T/℃'
                }
            }]
        }
    }
};
var config2 = {
    type: 'bar',
    data: {
        labels: ["清扫组件功率", "清扫组件功率", "对照1", "对照2"],
        datasets: [
            {
            label: "功率",
            backgroundColor: window.chartColors.blue,
            borderColor: window.chartColors.blue,
            
            data: [],
            fill: true,
        },]
    },
    options: {
        responsive: true,
        legend:{
            display:false,
            
        },
        title:{
            display:false,
            
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: '组件'
                },
                ticks: {
                    fontColor: "#dde6e9", // this here
                  },
                gridLines:{
                    gridColor: "#dde6e9",
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: '功率/W',
                    fontColor: "#dde6e9", 
                },
                ticks: {
                    fontColor: "#dde6e9", // this here 
                  },
            }],
            
        },
       
       
    }
};

$(document).ready(function(){
    $.fn.datetimepicker.defaults = {
    language:'zh-CN',
    format: "yyyy-mm-dd hh:ii:ss",
    autoclose: true,
    todayBtn: true,
    };
    $('.form_datetime').datetimepicker().on('changeDate',function(e)
    {
      starttime=$('input#start').val();
      endtime=$('input#end').val();
      $.ajax({
      type: "post",
      dataType: "json",
      url: "findbydateblock",
      data: {'starttime':starttime,'endtime':endtime},
      success: function(msg) {
        console.info(msg);
        dbdata=msg; 
        bar(dbdata);
        mychart.update(); 
      },
      error:function(){
          alert("FAIL");}
      });
    }); 
    $('.selectpicker').selectpicker('val', ['pm10']);
    selecteddata=$('.selectpicker').val()
    $('.selectpicker').on('hidden.bs.select',function(e){
        selecteddata=$('.selectpicker').val()   
                bar(dbdata);  
                mychart.update();     
      });  
  });



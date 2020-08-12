 window.onload=function()  
{  
     getdatafromDB();  
}  
  
var getdatafromDB = function(){  
    $.ajax({  
        url: "index.php",  
        type: "POST",  
        dataType:"json",  
         error: function(){    
             alert('Error loading XML document');    
         },    
        success:function(data){  
            console.info(data);  
             bar(data);  
        }  
    });  
}  
function bar(Data)  
{  
    if(Data.length==null || Data.length == 0)  
        return;  
    var barData={};  
    barData.labels=[];  
    barData.datasets=[];  
    var temData={};  
    temData.data=[];  
    temData.fillColor= "rgba(151,187,205,0.5)";  
    temData.strokeColor = "rgba(151,187,205,0.8)";  
    temData.highlightFill="rgba(151,187,205,0.75)",  
    temData.highlightStroke= "rgba(151,187,205,1)";  
      
    for(var i=0;i<Data.length;i++)  
    {  
        barData.labels.push(Data[i].date);  
        temData.data.push(Data[i].tempreature);  
    }  
    barData.datasets.push(temData); //封装一个规定格式的barData。  
    console.info(barData);  
    /     /// 动画效果  
    var options = {             
        scaleOverlay: false,  
        scaleOverride: false,  
        scaleSteps: null,  
        scaleStepWidth: null,  
        scaleStartValue: null,    
        scaleLineColor: "rgba(0,0,0,.1)",    
        scaleLineWidth: 1,     
        scaleShowLabels: true,  
        scaleLabel: "<%=value%>",  
        scaleFontFamily: "'Arial'",     
        scaleFontSize: 12,  
        scaleFontStyle: "normal",     
        scaleFontColor: "#666",  
        scaleShowGridLines: true,  
        scaleGridLineColor: "rgba(0,0,0,.05)",  
        scaleGridLineWidth: 1,  
        bezierCurve: true,  
        pointDot: true,  
        pointDotRadius: 3,  
        pointDotStrokeWidth: 1,  
        datasetStroke: true,  
        datasetStrokeWidth: 2,  
        datasetFill: true,  
        animation: true,  
        animationSteps: 60,  
        animationEasing: "easeOutQuart",                
        onAnimationComplete: null  
    }  
    var ctx  = document.getElementById("myChart").getContext('2d');  
    myChart = new Chart(ctx).Bar(barData,options, { //重点在这里  
        responsive : true  
    });  
}  